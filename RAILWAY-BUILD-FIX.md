# 🔧 Railway Build Hatası Çözümü

## ❌ Sorun

```
ERROR: failed to build: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
```

**Neden:** Build sırasında `prisma db push` çalışıyor ama build ortamında veritabanı dosyası oluşturulamıyor.

---

## ✅ Çözüm

### 1. Build Script Düzeltildi

`package.json` dosyasında build script'inden `prisma db push` kaldırıldı:

**Önce:**
```json
{
  "build": "prisma generate && prisma db push && next build"
}
```

**Sonra:**
```json
{
  "build": "prisma generate && next build"
}
```

**Neden?**
- Build sadece kod derlemeli
- Veritabanı işlemleri runtime'da olmalı
- SQLite dosyası ilk kullanımda otomatik oluşturulur

---

### 2. Railway Environment Variables

Railway'da şu environment variable'lar olmalı:

**Variable 1:**
- **Key:** `DATABASE_URL`
- **Value:** `file:./prisma/dev.db`

**Variable 2:**
- **Key:** `JWT_SECRET`
- **Value:** `your-super-secret-jwt-key-here`

---

### 3. Railway.json Eklendi

Railway için özel build ayarları eklendi (`railway.json`).

---

## 🚀 Deploy Adımları

### 1. Değişiklikleri Commit ve Push Edin

```bash
cd "/home/mindsight/To-Do App"
git add package.json railway.json
git commit -m "Fix Railway build: Remove prisma db push from build script"
git push
```

### 2. Railway'da Redeploy

1. **Railway Dashboard** → Projenize tıklayın
2. **Deployments** sekmesine gidin
3. **Redeploy** butonuna tıklayın
4. Veya yeni commit otomatik deploy tetikleyecek

---

## 📋 Kontrol Listesi

- [ ] `package.json` build script düzeltildi
- [ ] `railway.json` eklendi
- [ ] Değişiklikler commit edildi
- [ ] Push yapıldı
- [ ] Railway'da `DATABASE_URL` environment variable var
- [ ] Railway'da `JWT_SECRET` environment variable var
- [ ] Redeploy yapıldı
- [ ] Build başarılı

---

## 🔍 Sorun Giderme

### Build Hala Başarısız

**Kontrol edin:**
1. Railway Dashboard → **Variables** → `DATABASE_URL` var mı?
2. Railway Dashboard → **Deployments** → **Logs** → Hata mesajını okuyun
3. `prisma generate` başarılı mı?

### Database Hatası

**Sorun:** "Unable to open the database file"

**Çözüm:**
1. Railway'da `DATABASE_URL="file:./prisma/dev.db"` olduğundan emin olun
2. `prisma` klasörünün oluşturulduğundan emin olun
3. İlk request'te SQLite dosyası otomatik oluşturulur

---

## 💡 Notlar

- **Build sırasında:** Sadece kod derlenir, veritabanı işlemi yapılmaz
- **Runtime'da:** İlk request'te SQLite dosyası otomatik oluşturulur
- **Prisma Client:** Build sırasında generate edilir (gerekli)

---

**Değişiklikleri push edip Railway'da redeploy yapın!** 🚀

