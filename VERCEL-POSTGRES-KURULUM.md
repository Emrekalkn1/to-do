# 🐘 Vercel PostgreSQL Kurulumu

## Adım 1: Vercel Postgres Oluştur

1. **Vercel Dashboard** → Projenize gidin
2. **Storage** sekmesine tıklayın
3. **Create Database** → **Postgres** seçin
4. **Database Name:** `todo-db` (veya istediğiniz isim)
5. **Region:** Size en yakın region'ı seçin
6. **Create** butonuna tıklayın

## Adım 2: Connection String'i Al

1. Oluşturduğunuz database'e tıklayın
2. **.env.local** sekmesine gidin
3. **DATABASE_URL** değerini kopyalayın
   - Şuna benzer: `postgres://user:password@host:5432/database?sslmode=require`

## Adım 3: Environment Variable Ekle

1. **Vercel Dashboard** → Projeniz → **Settings** → **Environment Variables**
2. **Add New:**
   - **Name:** `DATABASE_URL`
   - **Value:** Kopyaladığınız connection string
   - **Environment:** Production, Preview, Development (hepsini seçin)
3. **Save**

## Adım 4: Migration Çalıştır

### Yerel olarak (önce):

```bash
# .env dosyasına DATABASE_URL ekleyin
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Migration oluştur
npx prisma migrate dev --name init

# Veya mevcut schema'yı push et
npx prisma db push
```

### Vercel'de (otomatik):

Vercel build sırasında otomatik migration çalıştırmak için `package.json`'a ekleyin:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

## Adım 5: GitHub'a Push

```bash
git push origin main
```

Vercel otomatik deploy edecek ve PostgreSQL kullanacak! ✅

---

## Alternatif: Supabase (Ücretsiz)

1. **Supabase.com** → Sign up
2. **New Project** oluştur
3. **Settings** → **Database** → **Connection string** kopyala
4. Vercel Environment Variables'a ekle

---

## Not

- SQLite yerel geliştirme için kullanılabilir
- Production'da PostgreSQL kullanın
- `.env` dosyasında farklı DATABASE_URL'ler kullanabilirsiniz

