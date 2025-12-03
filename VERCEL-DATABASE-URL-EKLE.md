# 🔧 Vercel'de DATABASE_URL Ekleme

## Sorun
```
Error: Environment variable not found: DATABASE_URL
```

## Çözüm: Vercel'de Environment Variable Ekleme

### Yöntem 1: Vercel Dashboard'dan (Önerilen)

1. **Vercel Dashboard** → Projenize gidin
2. **Settings** → **Environment Variables** sekmesine gidin
3. **Add New** butonuna tıklayın

#### Supabase Connection String'i Al:

**Eğer Vercel'den Supabase seçtiyseniz:**
1. Vercel Dashboard → **Storage** sekmesine gidin
2. Supabase database'inize tıklayın
3. **.env.local** veya **Connection string** sekmesine gidin
4. `DATABASE_URL` değerini kopyalayın

**Veya Supabase Dashboard'dan:**
1. https://supabase.com → Projenize gidin
2. **Settings** → **Database**
3. **Connection string** → **URI** seçeneğini seçin
4. Connection string'i kopyalayın:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. `[YOUR-PASSWORD]` yerine Supabase şifrenizi yazın

#### Vercel'e Ekle:

- **Name:** `DATABASE_URL`
- **Value:** Kopyaladığınız connection string
- **Environment:** 
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
- **Save**

### Yöntem 2: Vercel CLI ile

```bash
vercel env add DATABASE_URL
# Connection string'i yapıştırın
```

---

## Kontrol

1. **Settings** → **Environment Variables**
2. `DATABASE_URL` listede görünüyor mu kontrol edin
3. Değer doğru mu kontrol edin

---

## Sonraki Adım

Environment variable eklendikten sonra:

1. **Vercel Dashboard** → **Deployments**
2. En son deployment'ı bulun
3. **Redeploy** butonuna tıklayın
   - Veya yeni bir commit push edin

Build artık başarılı olmalı! ✅

---

## Örnek DATABASE_URL Formatı

```
postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres?sslmode=require
```

**Önemli:**
- `your-password` yerine gerçek şifrenizi yazın
- `xxxxx` Supabase proje ID'nizdir
- `?sslmode=require` SSL için gereklidir

---

## Sorun Giderme

### "Still getting error"
- Environment variable'ın **Production, Preview, Development** hepsinde olduğundan emin olun
- Connection string'in doğru kopyalandığından emin olun
- Redeploy yapın

### "Connection refused"
- Supabase projenizin aktif olduğundan emin olun
- Şifrenin doğru olduğundan emin olun
- Supabase dashboard'da database'in oluşturulduğunu kontrol edin

