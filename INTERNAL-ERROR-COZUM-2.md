# 🔧 Internal Server Error Çözümü - Adım Adım

## ⚠️ Sorun

Vercel'de runtime'da (çalışırken) internal server error alıyorsunuz.

---

## ✅ Kontrol Listesi

### 1. Vercel Logları Kontrol

**En önemli adım!** Hangi hata görünüyor?

1. **Vercel Dashboard** → **Deployments**
2. En son deployment'a tıklayın
3. **Logs** sekmesine gidin
4. **Runtime Logs** bölümüne bakın
5. **Hata mesajını kopyalayın ve paylaşın**

**Örnek hatalar:**
- `Can't reach database server`
- `Table "User" does not exist`
- `Connection timeout`
- `Invalid connection string`

---

### 2. DATABASE_URL Kontrolü

**Vercel Environment Variables:**

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. `DATABASE_URL` var mı kontrol edin
3. Format şöyle olmalı:

```
postgresql://postgres.zsikfuznhpnghiimkloo:1J50K8P4fvCOHBCh@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Önemli:**
- ✅ `postgresql://` ile başlamalı
- ✅ `?sslmode=require` olmalı
- ✅ Port `6543` (pooler) veya `5432` (direct)

---

### 3. Supabase Tablolar Kontrol

**Supabase SQL Editor'de kontrol:**

1. **Supabase Dashboard** → **SQL Editor**
2. Şu sorguyu çalıştırın:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Beklenen tablolar:**
- ✅ `User`
- ✅ `Board`
- ✅ `Group`
- ✅ `Task`
- ✅ `Subtask`
- ✅ `Comment`

**Eğer tablolar yoksa:**
- `supabase-init.sql` dosyasını Supabase SQL Editor'de çalıştırın

---

### 4. Connection String Formatı

**Supabase'den doğru connection string alın:**

1. **Supabase Dashboard** → **Settings** → **Database**
2. **Connection string** → **URI** seçin
3. **Transaction mode** (pooler) veya **Session mode** (direct) seçin
4. Connection string'i kopyalayın
5. **Vercel** → **Environment Variables** → `DATABASE_URL` güncelleyin
6. **Redeploy** yapın

---

### 5. Direct Connection Deneyin

Pooler bazen sorun çıkarabilir. Direct connection deneyin:

1. **Supabase** → **Settings** → **Database**
2. **Connection string** → **URI** → **Session mode** (direct, port 5432)
3. Connection string'i kopyala
4. **Vercel** → `DATABASE_URL` güncelle
5. **Redeploy**

---

### 6. Prisma Client Kontrol

**Local'de test edin:**

```bash
cd "/home/mindsight/To-Do App"
npx prisma db pull
npx prisma generate
```

Hata var mı kontrol edin.

---

## 🚀 Hızlı Çözüm

### Adım 1: Vercel Logları

**Vercel Dashboard** → **Deployments** → **Logs** → **Runtime Logs**

**Hangi hata görünüyor?** Paylaşın!

### Adım 2: Connection String

**Supabase** → **Settings** → **Database** → **Connection string** → **URI** → **Session mode** (direct)

Connection string'i kopyalayın ve Vercel'e ekleyin.

### Adım 3: Redeploy

**Vercel Dashboard** → **Deployments** → **Redeploy**

---

## 📋 En Olası Sorunlar

1. **Tablolar oluşturulmamış** → `supabase-init.sql` çalıştırın
2. **Connection string yanlış** → Direct connection (5432) kullanın
3. **DATABASE_URL eksik** → Vercel Environment Variables'a ekleyin
4. **Connection timeout** → Supabase connection pooler kullanın (6543)

---

## 🔍 Debug İçin

**Vercel'de test endpoint oluşturun:**

`app/api/test-db/route.ts` dosyası oluşturun:

```typescript
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    try {
        const count = await db.user.count()
        return NextResponse.json({ 
            success: true, 
            userCount: count,
            dbUrl: process.env.DATABASE_URL ? 'Set' : 'Missing'
        })
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
```

**Test:**
- `https://your-app.vercel.app/api/test-db`
- Sonucu paylaşın!

---

**Vercel runtime loglarında hangi hata görünüyor?** 🔍

