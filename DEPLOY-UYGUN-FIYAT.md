# 💰 Uygun Fiyatlı Deployment Seçenekleri

## 🏆 Önerilen: Railway.app (En Kolay)

### ✅ Avantajlar:
- **Ücretsiz plan:** $5 kredi/ay (küçük projeler için yeterli)
- **SQLite destekler** (mevcut kodunuz çalışır)
- **Çok kolay kurulum** (GitHub bağlantısı)
- **Otomatik SSL**
- **Güvenilir** (çok popüler)
- **Domain bağlama ücretsiz**

### 💵 Fiyat:
- **Hobby Plan:** $5/ay (500 saat ücretsiz)
- **Pro Plan:** $20/ay (daha fazla kaynak)

### 🚀 Kurulum (5 dakika):

1. **Railway.app** → Sign up (GitHub ile)
2. **New Project** → **Deploy from GitHub repo**
3. Repository seçin: `Emrekalkn1/to-do`
4. **Environment Variables** ekleyin:
   - `JWT_SECRET`: Güvenli bir değer
   - `DATABASE_URL`: `file:./prisma/dev.db` (SQLite için)
   - `NODE_ENV`: `production`
5. **Deploy** butonuna tıklayın
6. **Settings** → **Generate Domain** (ücretsiz domain)
7. **Custom Domain** ekleyin (kendi domain'iniz)

✅ **Tamamlandı!** Projeniz çalışıyor.

---

## 🥈 Alternatif 1: Render.com (Ücretsiz Plan)

### ✅ Avantajlar:
- **Ücretsiz plan var** (Web Service)
- **SQLite destekler**
- **Otomatik SSL**
- **Güvenilir**

### 💵 Fiyat:
- **Free Plan:** Ücretsiz (uyku modu olabilir)
- **Starter:** $7/ay (uyku modu yok)

### 🚀 Kurulum:

1. **Render.com** → Sign up
2. **New** → **Web Service**
3. GitHub repo bağla
4. **Environment Variables** ekle
5. **Deploy**

---

## 🥉 Alternatif 2: Supabase + Vercel (Ücretsiz)

### ✅ Avantajlar:
- **Tamamen ücretsiz** (küçük projeler için)
- **PostgreSQL** (daha güçlü)
- **Çok güvenilir**

### 💵 Fiyat:
- **Free Plan:** Ücretsiz (500MB database, 2GB bandwidth)

### 🚀 Kurulum:

1. **Supabase.com** → Sign up
2. **New Project** oluştur
3. **Settings** → **Database** → Connection string kopyala
4. **Vercel** → Environment Variables → `DATABASE_URL` ekle
5. Prisma schema PostgreSQL'e geç (zaten yaptık)
6. Deploy

---

## 📊 Karşılaştırma

| Platform | Fiyat | SQLite | Kolaylık | Güvenilirlik |
|----------|-------|--------|----------|--------------|
| **Railway** | $5/ay | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Render** | Ücretsiz/$7 | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Supabase+Vercel** | Ücretsiz | ❌ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 Önerim: Railway.app

**Neden Railway?**
- SQLite kullanabilirsiniz (kod değişikliği yok)
- Çok kolay kurulum
- Uygun fiyat ($5/ay)
- Güvenilir ve popüler
- Domain bağlama kolay

---

## Railway Kurulum Adımları (Detaylı)

### 1. Railway'a Kaydol
- https://railway.app
- GitHub ile giriş yap

### 2. Proje Oluştur
- **New Project** → **Deploy from GitHub repo**
- `Emrekalkn1/to-do` repository'sini seç

### 3. Environment Variables
Railway Dashboard → Variables sekmesi:
```
JWT_SECRET=çok-güvenli-bir-şifre-en-az-32-karakter
DATABASE_URL=file:./prisma/dev.db
NODE_ENV=production
```

### 4. Build Settings
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### 5. Domain Ayarları
- **Settings** → **Generate Domain** (ücretsiz)
- Veya **Custom Domain** ekleyin

### 6. Deploy
- Otomatik deploy başlar
- Logları takip edin

✅ **Hazır!** Projeniz çalışıyor.

---

## Sorun Giderme

### Railway'de SQLite hatası
- `DATABASE_URL=file:./prisma/dev.db` kullanın
- Railway dosya sistemi yazılabilir

### Domain çalışmıyor
- DNS ayarlarını kontrol edin
- Railway'in verdiği DNS kayıtlarını kullanın

---

## Sonuç

**Railway.app** en iyi seçenek:
- ✅ Uygun fiyat ($5/ay)
- ✅ SQLite destekler
- ✅ Kolay kurulum
- ✅ Güvenilir
- ✅ Domain bağlama kolay

Hemen başlayabilirsiniz! 🚀

