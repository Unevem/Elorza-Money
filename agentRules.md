Tech Stack
Runtime: Node.js 24 (LTS).

Framework: Next.js (App Router) + TypeScript.

Styling: Tailwind CSS (Mobile-first, high contrast, large targets).

Backend/Auth: Supabase (PostgreSQL + Supabase Auth).

Security: Cloudflare Turnstile (Captcha) on Login.

Deployment: Vercel (PWA enabled).

Coding Standards (STRICT)
Clean Code: Use meaningful names, early returns, and Single Responsibility Principle.

File Limit: MAX 200 LINES per file.

Exceeded? Create a directory for the component/feature and split into sub-files (e.g., components/Form/index.tsx, components/Form/Header.tsx, components/Form/utils.ts).

Logic: Use Server Actions for DB mutations.

Roles & UX
User (Parents 50+): - Instant access (Persisted Session).

Large buttons, simple inputs (numeric keypad by default).

Features: Add expense, suggest category, request edit, view 30-day history.

Admin (You):

Desktop-optimized dashboard.

Features: CRUD Categories (Map specific to global flags), Approve/Reject transactions, Analytics (Tremor library).

Data Model Keys
Transactions: id, value, date, user_id, category_id, description, status (pending/approved/rejected), is_edited.

Categories: id, specific_name, global_name.

Status: New entries = pending. Admins must approve.

Workflow
Read this guide before every task.

Confirm understanding of the 200-line limit.

Prioritize "Add to Home Screen" (PWA) readiness.