# 🔧 Railway Nixpacks "next: not found" Hatası Çözümü

## ❌ Sorun

```
sh: next: not found
```

**Neden:** Railway Nixpacks kullanıyor, Dockerfile değil. Nixpacks standalone output gerektirmez, normal Next.js build yeterli.

---

## ✅ Çözüm

### 1. next.config.ts Düzeltildi

`output: 'standalone'` kaldırıldı çünkü Railway Nixpacks için gerekli değil:

```typescript
const nextConfig = {
  // Railway Nixpacks için standalone output gerekmez
  // output: 'standalone',  // Railway Nixpacks için kapalı
  // ... diğer ayarlar
}
```

### 2. railway.json Kontrolü

`railway.json` dosyası Nixpacks kullanımını belirtiyor:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

---

## 🚀 Deploy Adımları

### 1. Değişiklikleri Commit ve Push Edin

```bash
cd "/home/mindsight/To-Do App"
git add next.config.ts
git commit -m "Fix Railway: Remove standalone output for Nixpacks"
git push
```

### 2. Railway'da Redeploy

1. **Railway Dashboard** → Projenize tıklayın
2. **Deployments** sekmesine gidin
3. **Redeploy** butonuna tıklayın
4. Veya yeni commit otomatik deploy tetikleyecek

---

## 📋 Kontrol Listesi

- [ ] `next.config.ts`'de `output: 'standalone'` kaldırıldı
- [ ] `railway.json` doğru ayarlanmış
- [ ] `package.json` build script doğru (`npm run build`)
- [ ] `package.json` start script doğru (`npm start`)
- [ ] Değişiklikler commit edildi
- [ ] Push yapıldı
- [ ] Railway'da redeploy yapıldı
- [ ] Site çalışıyor

---

## 🔍 Sorun Giderme

### Hala "next: not found" Hatası

**Kontrol edin:**
1. Railway Dashboard → **Deployments** → **Logs** → Build başarılı mı?
2. `package.json` start script doğru mu? (`npm start`)
3. Next.js düzgün build edilmiş mi?

### Build Hatası

**Sorun:** Build sırasında hata var

**Çözüm:**
1. Railway Dashboard → **Deployments** → **Logs** → Build loglarını kontrol edin
2. `prisma generate` başarılı mı?
3. `npm run build` başarılı mı?

---

## 💡 Notlar

- **Railway Nixpacks:** Dockerfile yerine Nixpacks kullanır
- **Standalone output:** Nixpacks için gerekli değil
- **Normal build:** `npm run build` ve `npm start` yeterli

---

**Değişiklikleri push edip Railway'da redeploy yapın!** 🚀

