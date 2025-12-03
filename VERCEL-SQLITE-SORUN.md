# ❌ Vercel'de Internal Server Error - SQLite Sorunu

## Sorun

Vercel **serverless** bir platformdur ve **SQLite çalışmaz** çünkü:
- Dosya sistemi **read-only** (salt okunur)
- Her request farklı bir serverless function'da çalışır
- SQLite dosya tabanlı bir veritabanıdır ve yazma gerektirir

## Çözüm: PostgreSQL'e Geçiş

Vercel'de çalışması için PostgreSQL kullanmalıyız.

### Seçenek 1: Vercel Postgres (Önerilen - Ücretsiz)

1. **Vercel Dashboard → Storage → Create Database → Postgres**
2. **Database oluştur**
3. **Connection string'i kopyala**

### Seçenek 2: Railway Postgres (Alternatif)

1. Railway.app'e kaydol
2. New → Database → Postgres
3. Connection string'i al

### Seçenek 3: Supabase (Ücretsiz)

1. Supabase.com'a kaydol
2. New Project
3. Connection string'i al

---

## PostgreSQL'e Geçiş Adımları

### 1. Prisma Schema'yı Güncelle

`prisma/schema.prisma` dosyasını düzenle:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Environment Variable Ekle

Vercel Dashboard → Project → Settings → Environment Variables:
- **Name:** `DATABASE_URL`
- **Value:** PostgreSQL connection string (Vercel Postgres'ten alın)

### 3. Migration

```bash
npx prisma migrate dev --name init
```

Veya production için:
```bash
npx prisma migrate deploy
```

---

## Hızlı Çözüm: Vercel Postgres

1. Vercel Dashboard → Storage → Create Database → Postgres
2. Database adı: `todo-db`
3. Region seçin
4. Create
5. Connection string'i kopyala
6. Environment Variables → `DATABASE_URL` ekle
7. Prisma schema'yı güncelle
8. GitHub'a push et (Vercel otomatik deploy eder)

---

## Alternatif: Railway/Render Kullan

SQLite kullanmaya devam etmek istiyorsanız:
- **Railway.app** kullanın (SQLite destekler)
- **Render.com** kullanın (SQLite destekler)

Bu platformlar dosya sistemi erişimi sağlar.

