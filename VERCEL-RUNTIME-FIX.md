# 🔧 Vercel Runtime Internal Server Error Çözümü

## Sorun

Build başarılı ama runtime'da (çalışırken) internal server error alıyorsunuz.

---

## Olası Nedenler

### 1. Prisma Connection Pooling Sorunu

Vercel serverless ortamında Prisma connection pooling sorunu olabilir.

### 2. Connection String Formatı

Supabase connection string'i pooler kullanıyor, bu bazen sorun çıkarabilir.

### 3. Veritabanı Bağlantısı

Supabase'e bağlanamıyor olabilir.

---

## Çözüm 1: Connection String Kontrolü

### Vercel Environment Variables:

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. `DATABASE_URL` variable'ını kontrol edin
3. Format şöyle olmalı:

```
postgresql://postgres.zsikfuznhpnghiimkloo:1J50K8P4fvCOHBCh@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Önemli:** 
- `postgresql://` ile başlamalı (bazen `postgres://` olabilir)
- `?sslmode=require` olmalı
- Port `6543` (pooler) veya `5432` (direct) olabilir

---

## Çözüm 2: Direct Connection String Kullanın

Pooler bazen sorun çıkarabilir. Direct connection string deneyin:

1. **Supabase Dashboard** → **Settings** → **Database**
2. **Connection string** → **URI** seçeneğini seçin
3. **Direct connection** (5432 port) kullanın
4. Connection string'i kopyalayın
5. **Vercel** → **Environment Variables** → `DATABASE_URL` güncelleyin
6. **Redeploy** yapın

---

## Çözüm 3: Prisma Client Edge Kullanın

Vercel serverless için Prisma Edge Client kullanabilirsiniz:

### lib/db.ts dosyasını güncelleyin:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

## Çözüm 4: Vercel Logları Kontrol

1. **Vercel Dashboard** → **Deployments**
2. En son deployment'a tıklayın
3. **Logs** sekmesine gidin
4. **Runtime Logs** bölümüne bakın
5. Hata mesajını okuyun

**Hangi hata görünüyor?** Paylaşın, ona göre çözüm bulalım.

---

## Hızlı Test

### Supabase Bağlantı Testi:

1. **Supabase Dashboard** → **SQL Editor**
2. Şu sorguyu çalıştırın:

```sql
SELECT * FROM "User" LIMIT 1;
```

- ✅ **Başarılı:** Tablolar çalışıyor
- ❌ **Hata:** Tablo yok veya bağlantı sorunu

---

## En Olası Sorun

**Connection string formatı veya pooler sorunu.**

**Çözüm:** Direct connection string kullanın (5432 port).

---

## Adım Adım

1. **Supabase** → **Settings** → **Database** → **Connection string** → **Direct connection** (5432)
2. Connection string'i kopyala
3. **Vercel** → **Environment Variables** → `DATABASE_URL` güncelle
4. **Redeploy** yap
5. Test et

---

**Vercel runtime loglarında hangi hata görünüyor?** Paylaşın! 🔍

