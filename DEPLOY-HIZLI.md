# 🚀 Hızlı Deployment Rehberi

## Kendi Sunucunuzda Deploy (VPS/Linux Hosting)

### 1️⃣ Sunucuya Dosyaları Yükleyin

**FTP/SFTP ile:**
- Tüm proje dosyalarını sunucuya yükleyin
- `.env.example` dosyasını `.env` olarak kopyalayın

**Git ile:**
```bash
git clone <repo-url>
cd "To-Do App"
```

### 2️⃣ Environment Variables Ayarlayın

```bash
cp .env.example .env
nano .env
```

**ÖNEMLİ:** `JWT_SECRET` değerini mutlaka değiştirin! (en az 32 karakter)

```env
JWT_SECRET=çok-güvenli-bir-şifre-buraya-yazın-en-az-32-karakter-uzunluğunda
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=production
```

### 3️⃣ Deployment Script'ini Çalıştırın

```bash
chmod +x deploy.sh
./deploy.sh
```

Veya manuel:

```bash
# Bağımlılıkları yükle
npm install --production

# Prisma Client oluştur
npx prisma generate
npx prisma migrate deploy

# Build
npm run build
```

### 4️⃣ PM2 ile Başlatın (Önerilen)

```bash
# PM2 kurulumu
npm install -g pm2

# Uygulamayı başlat
pm2 start ecosystem.config.js

# Otomatik başlatma ayarla
pm2 startup
pm2 save

# Durum kontrol
pm2 status
pm2 logs todo-app
```

### 5️⃣ Nginx Ayarlayın (Domain için)

```bash
# Nginx config dosyası oluştur
sudo nano /etc/nginx/sites-available/todo-app
```

`nginx.conf.example` dosyasındaki içeriği kopyalayın ve domain'inizi yazın.

```bash
# Symlink oluştur
sudo ln -s /etc/nginx/sites-available/todo-app /etc/nginx/sites-enabled/

# Test ve restart
sudo nginx -t
sudo systemctl restart nginx
```

### 6️⃣ SSL Sertifikası (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ⚡ Tek Komutla Deploy

```bash
./deploy.sh && pm2 start ecosystem.config.js && pm2 save
```

---

## 📋 Kontrol Listesi

- [ ] `.env` dosyası oluşturuldu
- [ ] `JWT_SECRET` değiştirildi
- [ ] `npm install --production` çalıştırıldı
- [ ] `npx prisma generate` çalıştırıldı
- [ ] `npm run build` başarılı
- [ ] PM2 ile başlatıldı
- [ ] Nginx yapılandırıldı
- [ ] SSL sertifikası kuruldu
- [ ] Domain çalışıyor

---

## 🔧 Sorun Giderme

### Port 3000 kullanımda
```bash
# Farklı port kullan
PORT=3001 pm2 start ecosystem.config.js
```

### PM2 logları
```bash
pm2 logs todo-app --lines 50
```

### Nginx test
```bash
sudo nginx -t
sudo systemctl status nginx
```

### Uygulama durumu
```bash
pm2 status
pm2 restart todo-app
```

---

## 🌐 Domain Ayarları

DNS kayıtlarınızda:
- **A Record:** `@` → Sunucu IP adresi
- **A Record:** `www` → Sunucu IP adresi

---

## 📞 Yardım

Sorun yaşarsanız:
1. `pm2 logs todo-app` - Logları kontrol edin
2. `npm run build` - Build test edin
3. `.env` dosyasını kontrol edin


