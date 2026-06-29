import * as cheerio from 'cheerio';
import type { Element } from 'domhandler';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/content/questions');
const MANIFEST_PATH = path.join(ROOT, 'scripts/import-manifest.json');

const SOURCES = {
	frontend: 'https://dou.ua/lenta/articles/front-end-developer-interview-questions/',
	nodejs: 'https://dou.ua/lenta/articles/interview-node-js/',
} as const;

type Topic = keyof typeof SOURCES;
type Grade = 'junior' | 'middle' | 'senior' | 'middle-senior';

interface ParsedQuestion {
	id: string;
	title: string;
	topic: Topic;
	grade: Grade;
	category: string;
	order: number;
	condition?: string;
}

interface Manifest {
	entries: Record<string, { file: string; title: string }>;
}

const PLACEHOLDER_MARKER = '_Відповідь готується._';
const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');
const PLACEHOLDER_BODY = `## Відповідь

${PLACEHOLDER_MARKER}

## Приклад

\`\`\`js
// TODO
\`\`\`

## Юз кейси

- TODO
`;

const CYRILLIC: Record<string, string> = {
	а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye', ж: 'zh', з: 'z',
	и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
	р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
	щ: 'shch', ь: '', ю: 'yu', я: 'ya', "'": '', '’': '', '«': '', '»': '', '—': '-',
};

function slugify(text: string): string {
	const lower = text.toLowerCase().split('').map((c) => CYRILLIC[c] ?? c).join('');
	return lower
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 45)
		.replace(/-$/, '') || 'q';
}

function gradeDifficulty(grade: Grade): 'easy' | 'medium' | 'hard' {
	if (grade === 'junior') return 'easy';
	if (grade === 'middle') return 'medium';
	return 'hard';
}

function parseGrade(text: string, topic: Topic): Grade | null {
	const t = text.toLowerCase();
	if (topic === 'frontend') {
		if (t.includes('junior')) return 'junior';
		if (t.includes('middle')) return 'middle';
		if (t.includes('senior')) return 'senior';
		return null;
	}
		if (t.includes('middle/senior') || t.includes('middle-senior') || t.includes('middlesenior')) {
		return 'middle-senior';
	}
	if (t.includes('junior')) return 'junior';
	if (/\bmiddle\b/.test(t)) return 'middle';
	if (t.includes('senior')) return 'senior';
	return null;
}

function isStopSection(text: string): boolean {
	const t = text.toLowerCase();
	return (
		t.includes('коментар') ||
		t.includes('radimo') ||
		t.includes('радимо') ||
		t.includes('співбесіда з big data') ||
		t.includes('product manager')
	);
}

function cleanText(text: string): string {
	return text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseNumberedParagraph(html: string): string[] {
	const parts = html.split(/<br\s*\/?>/i);
	const questions: string[] = [];
	for (const part of parts) {
		const text = cleanText(cheerio.load(part).text());
		const match = text.match(/^\d+\.\s*(.+)/);
		if (match?.[1]) questions.push(match[1].trim());
	}
	return questions;
}

function extractLiQuestion($: cheerio.CheerioAPI, el: Element): { title: string; condition?: string } {
	const $li = $(el);
	const $clone = $li.clone();
	$clone.find('pre').remove();
	let title = cleanText($clone.text());
	title = title.replace(/^\d+\.\s*/, '');

	const pres = $li.find('pre');
	let condition: string | undefined;
	if (pres.length) {
		const codes = pres
			.toArray()
			.map((p) => cleanText($(p).text()))
			.filter(Boolean);
		if (codes.length) condition = codes.join('\n\n');
	}

	return { title, condition };
}

function getArticleRoot($: cheerio.CheerioAPI): cheerio.Cheerio<any> {
	return $('article').first();
}

function parseFrontend($: cheerio.CheerioAPI): ParsedQuestion[] {
	const article = getArticleRoot($);
	const results: ParsedQuestion[] = [];
	let grade: Grade | null = null;
	let category = 'Загальне';
	let order = 0;

	article.find('h2, h3, ol').each((_, el) => {
		const tag = el.tagName?.toLowerCase();
		if (!tag) return;

		if (tag === 'h2') {
			const text = cleanText($(el).text());
			if (isStopSection(text)) {
				grade = null;
				return false;
			}
			const g = parseGrade(text, 'frontend');
			if (g) {
				grade = g;
				order = 0;
			}
			return;
		}

		if (!grade) return;
		const g = grade;

		if (tag === 'h3') {
			category = cleanText($(el).text());
			return;
		}

		if (tag === 'ol') {
			$(el)
				.children('li')
				.each((__, li) => {
					const { title, condition } = extractLiQuestion($, li);
					if (!title || title.length < 5) return;
					order += 1;
					const id = `frontend:${g}:${category}:${order}:${title.slice(0, 40)}`;
					results.push({ id, title, topic: 'frontend', grade: g, category, order, condition });
				});
		}
	});

	return results;
}

function parseNodejs($: cheerio.CheerioAPI): ParsedQuestion[] {
	const article = getArticleRoot($);
	const results: ParsedQuestion[] = [];
	let grade: Grade | null = null;
	let category = 'Загальне';
	let order = 0;

	article.find('h2, h3, ol, p').each((_, el) => {
		const tag = el.tagName?.toLowerCase();
		if (!tag) return;

		if (tag === 'h2') {
			const text = cleanText($(el).text());
			if (isStopSection(text)) {
				grade = null;
				return false;
			}
			const g = parseGrade(text, 'nodejs');
			if (g) {
				grade = g;
				order = 0;
			}
			return;
		}

		if (!grade) return;
		const g = grade;

		if (tag === 'h3') {
			category = cleanText($(el).text());
			return;
		}

		if (tag === 'p') {
			const html = $(el).html() ?? '';
			if (!/<span[^>]*>\s*\d+\.\s*<\/span>/i.test(html) && !/^\s*\d+\./.test(cleanText($(el).text()))) {
				return;
			}
			const titles = parseNumberedParagraph(html);
			for (const title of titles) {
				if (!title || title.length < 5) continue;
				order += 1;
				const id = `nodejs:${g}:${category}:${order}:${title.slice(0, 40)}`;
				results.push({ id, title, topic: 'nodejs', grade: g, category, order });
			}
		}

		if (tag === 'ol') {
			$(el)
				.children('li')
				.each((__, li) => {
					const { title, condition } = extractLiQuestion($, li);
					if (!title || title.length < 5) return;
					order += 1;
					const id = `nodejs:${g}:${category}:${order}:${title.slice(0, 40)}`;
					results.push({ id, title, topic: 'nodejs', grade: g, category, order, condition });
				});
		}
	});

	return results;
}

function buildBody(q: ParsedQuestion, existingBody?: string): string {
	if (existingBody && !existingBody.includes(PLACEHOLDER_MARKER) && !existingBody.includes('// TODO')) {
		let body = existingBody;
		if (q.condition && !body.includes('## Умова')) {
			body = `## Умова\n\n\`\`\`\n${q.condition}\n\`\`\`\n\n${body}`;
		}
		return body;
	}

	let body = PLACEHOLDER_BODY;
	if (q.condition) {
		body = `## Умова\n\n\`\`\`\n${q.condition}\n\`\`\`\n\n${body}`;
	}
	return body;
}

function buildFrontmatter(q: ParsedQuestion, preservedDifficulty?: string): string {
	const lines = [
		'---',
		`title: ${JSON.stringify(q.title)}`,
		`topic: ${q.topic}`,
		`grade: ${q.grade}`,
		`category: ${JSON.stringify(q.category)}`,
		`order: ${q.order}`,
		`difficulty: ${preservedDifficulty ?? gradeDifficulty(q.grade)}`,
		'---',
	];
	return lines.join('\n');
}

function filePathFor(q: ParsedQuestion): string {
	const slug = slugify(q.title);
	const file = `${String(q.order).padStart(3, '0')}-${slug}.md`;
	return path.join(OUT_DIR, q.topic, q.grade, file);
}

interface PreservedContent {
	body: string;
	difficulty?: 'easy' | 'medium' | 'hard';
}

async function loadPreserved(): Promise<Map<string, PreservedContent>> {
	const map = new Map<string, PreservedContent>();
	try {
		const files = await readdir(OUT_DIR, { recursive: true });
		for (const f of files) {
			if (typeof f !== 'string' || !f.endsWith('.md')) continue;
			const full = path.join(OUT_DIR, f);
			const raw = await readFile(full, 'utf-8');
			const titleMatch = raw.match(/^title:\s*(.+)$/m);
			if (!titleMatch) continue;
			const title = JSON.parse(titleMatch[1].trim());
			const body = raw.replace(/^---[\s\S]*?---\n?/, '');
			const diffMatch = raw.match(/^difficulty:\s*(easy|medium|hard)\s*$/m);
			const difficulty = diffMatch?.[1] as PreservedContent['difficulty'];
			if (!body.includes(PLACEHOLDER_MARKER)) {
				map.set(title, { body, difficulty });
			} else if (difficulty) {
				map.set(title, { body, difficulty });
			}
		}
	} catch {
		// empty dir
	}
	return map;
}

async function loadManifest(): Promise<Manifest> {
	try {
		return JSON.parse(await readFile(MANIFEST_PATH, 'utf-8')) as Manifest;
	} catch {
		return { entries: {} };
	}
}

async function fetchAndParse(topic: Topic): Promise<ParsedQuestion[]> {
	const res = await fetch(SOURCES[topic]);
	if (!res.ok) throw new Error(`Failed to fetch ${SOURCES[topic]}: ${res.status}`);
	const html = await res.text();
	const $ = cheerio.load(html);
	return topic === 'frontend' ? parseFrontend($) : parseNodejs($);
}

async function main() {
	if (!force && !dryRun) {
		console.error(
			'Refusing to run: this script wipes src/content/questions/ and re-imports from DOU.\n' +
				'  --dry-run   fetch and count only, no writes\n' +
				'  --force     destructive re-import (preserves non-placeholder answer bodies)',
		);
		process.exit(1);
	}

	console.log('Loading preserved content...');
	const preserved = await loadPreserved();

	const all: ParsedQuestion[] = [];
	for (const topic of ['frontend', 'nodejs'] as const) {
		console.log(`Fetching ${topic}...`);
		const parsed = await fetchAndParse(topic);
		console.log(`  ${parsed.length} questions`);
		all.push(...parsed);
	}

	const byGrade = all.reduce(
		(acc, q) => {
			const key = `${q.topic}/${q.grade}`;
			acc[key] = (acc[key] ?? 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	if (dryRun) {
		console.log('[dry-run] Would write', all.length, 'questions. By grade:', byGrade);
		console.log('[dry-run] Preserved entries:', preserved.size);
		return;
	}

	// Clear output except we'll rewrite all
	await rm(OUT_DIR, { recursive: true, force: true });
	await mkdir(OUT_DIR, { recursive: true });

	const newManifest: Manifest = { entries: {} };
	let written = 0;

	for (const q of all) {
		const rel = path.relative(OUT_DIR, filePathFor(q));
		const hashId = createHash('md5').update(q.id).digest('hex').slice(0, 8);
		const manifestKey = `${q.topic}:${q.grade}:${hashId}`;

		const existing = preserved.get(q.title);
		const body = buildBody(q, existing?.body);
		const content = `${buildFrontmatter(q, existing?.difficulty)}\n\n${body.trim()}\n`;

		const outPath = path.join(OUT_DIR, rel);
		await mkdir(path.dirname(outPath), { recursive: true });
		await writeFile(outPath, content, 'utf-8');

		newManifest.entries[manifestKey] = { file: rel.replace(/\\/g, '/'), title: q.title };
		written += 1;
	}

	await writeFile(MANIFEST_PATH, JSON.stringify(newManifest, null, 2), 'utf-8');
	console.log(`Done: ${written} questions written to ${OUT_DIR}`);
	console.log('By grade:', byGrade);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
