# Notex — AI-Powered Learning Platform

🇺🇦 **Українська платформа для навчання з ШІ**

Завантаж свою лекцію, підручник або конспект — отримай структурований матеріал, картки, тести та особистого репетитора.

## 🚀 Стек технологій

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **UI Animations:** Framer Motion
- **File Parsing:** mammoth.js (DOCX), pdf-parse (PDF)
- **LLM:** Gemini API (後で)

## 📋 MVP Features

- ✅ User registration & login (email)
- ✅ File upload (PDF, DOCX, text)
- ✅ Landing page with features
- ✅ Dashboard (UI ready, backend coming soon)
- 🔄 Summary generation (Week 2)
- 🔄 Flashcards generation (Week 3)
- 🔄 Quiz generation (Week 3)
- 🔄 AI Tutoring chat (Week 3)
- 🔄 PDF export (Week 4)

## 🛠️ Встановлення

### Вимоги
- Node.js 18+
- npm або yarn
- Supabase account (free tier ok)

### Локально

```bash
# Клонування репо
git clone https://github.com/geiykodima-design/notex.git
cd notex

# Встановлення залежностей
npm install

# Налаштування .env.local
cp .env.local.example .env.local
# Впиши Supabase URL і ключі

# Запуск dev сервера
npm run dev
```

Відкрий [http://localhost:3000](http://localhost:3000)

## 🌐 Розгортання на Vercel

1. Push на GitHub
2. Відкрий [vercel.com](https://vercel.com)
3. Імпортуй repo
4. Додай env variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
5. Deploy! 🎉

## 📱 Тестування на планшеті

Якщо сайт запущений на Vercel:
```
https://notex-geiykodima-design.vercel.app
```

Якщо локально (на одній мережі):
```bash
# Отримай IP твого ноута
ifconfig | grep "inet "

# Використай у браузері планшета
http://<your-ip>:3000
```

## 📚 План розробки (4 тижні)

**Тиждень 1:** ✅ Каркас, Auth, File Upload
**Тиждень 2:** Summary Generation + UI
**Тиждень 3:** Flashcards + Quiz + Tutoring
**Тиждень 4:** Export, Design polish, Launch

## 🔑 Змінні оточення

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (後で)
GEMINI_API_KEY=... (後で)
```

## 🎨 Колірна схема (White Theme)

- **Primary:** Blue-500 → Cyan-500 gradient
- **Background:** White / Slate-50
- **Text:** Neutral-900
- **Accents:** Soft pastels (no neon)

## 🤝 Контрибuting

Поки MVP — тільки особистий проект. Після запуску буде відкрито для фідбеку.

## 📄 License

MIT
