---
title: "Що таке система контролю версій і навіщо її використовують?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 166
difficulty: easy
---

## Відповідь

VCS (Git) зберігає історію змін коду, дозволяє працювати в команді через гілки, відкочувати помилки, review через pull requests. Без VCS — хаос при паралельній роботі.

## Приклад

```bash
git log --oneline -5
git diff HEAD~1
```

## Юз кейси

- Відкат зламаного деплою до попереднього коміту
- Feature branch для ізоляції нової фічі

## Документація

- [Git — Pro Git](https://git-scm.com/book/en/v2)
