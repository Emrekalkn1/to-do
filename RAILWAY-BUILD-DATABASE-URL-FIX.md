# 🔧 Railway Build DATABASE_URL Hatası Çözümü

## ❌ Sorun

```
Error: Prisma schema validation - (get-config wasm)
Error code: P1012

error: Environment variable not found: DATABASE_URL.
```

**Neden:** Build sırasında `prisma generate` çalışırken `DATABASE_URL` environment variable'ı bulunamıyor.

---

## ✅ Çözüm

### 1. Dockerfile'a DATABASE_URL Eklendi

Build sırasında `DATABASE_URL` environment variable'ı eklendi:

```dockerfile
# Generate Prisma Client
# Set dummy DATABASE_URL for build (Prisma needs it for validation)
ENV DATABASE_URL="file:./prisma/dev.db"
RUN npx prisma generate
```

**Neden?**
- Prisma schema validation için `DATABASE_URL` gerekiyor
- Build sırasında gerçek veritabanı kullanılmaz, sadece validation için
- Runtime'da Railway'dan gelen gerçek `DATABASE_URL` kullanılacak

---

### 2. Package.json Build Script Kontrolü

`package.json` build script'inde `prisma db push` **olmamalı**:

**Doğru:**
```json
{
  "build": "prisma generate && next build"
}
```

**Yanlış:**
```json
{
  "build": "prisma generate && prisma db push && next build"
}
```

---

## 🚀 Deploy Adımları

### 1. Değişiklikleri Commit ve Push Edin

```bash
cd "/home/mindsight/To-Do App"
git add Dockerfile
git commit -m "Fix Railway build: Add DATABASE_URL to Dockerfile for Prisma validation"
git push
```

### 2. Railway'da Redeploy

1. **Railway Dashboard** → Projenize tıklayın
2. **Deployments** sekmesine gidin
3. **Redeploy** butonuna tıklayın
4. Veya yeni commit otomatik deploy tetikleyecek

---

## 📋 Kontrol Listesi

- [ ] Dockerfile'da `DATABASE_URL` environment variable eklendi
- [ ] `package.json` build script'inde `prisma db push` yok
- [ ] Değişiklikler commit edildi
- [ ] Push yapıldı
- [ ] Railway'da `DATABASE_URL` environment variable var (runtime için)
- [ ] Railway'da `JWT_SECRET` environment variable var
- [ ] Redeploy yapıldı
- [ ] Build başarılı

---

## 🔍 Sorun Giderme

### Build Hala Başarısız

**Kontrol edin:**
1. Railway Dashboard → **Deployments** → **Logs** → Hata mesajını okuyun
2. `prisma generate` başarılı mı?
3. `DATABASE_URL` Dockerfile'da var mı?

### Prisma db push Hatası

**Sorun:** Loglarda hala `prisma db push` görünüyor

**Çözüm:**
1. `package.json` build script'ini kontrol edin
2. Railway cache'ini temizleyin (Settings → Clear Build Cache)
3. Redeploy yapın

---

## 💡 Notlar

- **Build sırasında:** `DATABASE_URL` sadece Prisma validation için kullanılır
- **Runtime'da:** Railway'dan gelen gerçek `DATABASE_URL` kullanılır
- **Prisma db push:** Build script'inde olmamalı, runtime'da gerekirse çalıştırılabilir

---

**Değişiklikleri push edip Railway'da redeploy yapın!** 🚀

