# ⚡ Railway.app Hızlı Kurulum (5 Dakika)

## Adım 1: Railway'a Kaydol
1. https://railway.app → **Start a New Project**
2. **GitHub ile giriş yap**

## Adım 2: Proje Deploy Et
1. **Deploy from GitHub repo**
2. `Emrekalkn1/to-do` repository'sini seç
3. **Deploy** butonuna tıklayın

## Adım 3: Environment Variables
Railway Dashboard → **Variables** sekmesi → **New Variable**:

```
JWT_SECRET = çok-güvenli-bir-şifre-en-az-32-karakter-uzunluğunda
DATABASE_URL = file:./prisma/dev.db
NODE_ENV = production
```

## Adım 4: Domain Ayarla
1. **Settings** → **Generate Domain** (ücretsiz railway.app domain)
2. Veya **Custom Domain** → Kendi domain'inizi ekleyin

## Adım 5: Deploy Tamamlandı! ✅

Projeniz çalışıyor! Railway otomatik olarak:
- ✅ Build eder
- ✅ Deploy eder
- ✅ SSL sertifikası verir

---

## Fiyat
- **Hobby Plan:** $5/ay (500 saat ücretsiz)
- İlk ay genellikle ücretsiz kredi verir

---

## Domain Bağlama (Turbohost)

1. Railway → Settings → Custom Domain
2. Domain'inizi ekleyin: `yourdomain.com`
3. DNS kayıtlarını güncelleyin:
   - **CNAME:** `www` → Railway'in verdiği CNAME
   - **A Record:** `@` → Railway'in verdiği IP

---

## Sorun mu var?

- **Build hatası:** Logları kontrol edin
- **Database hatası:** `DATABASE_URL` kontrol edin
- **Domain çalışmıyor:** DNS propagation bekleyin (24 saat)

---

**Railway en kolay ve uygun fiyatlı seçenek!** 🚀

