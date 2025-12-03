# 🚀 Turbohost cPanel ile Deployment Rehberi

## Adım 1: Node.js Desteğini Kontrol Edin

### cPanel'de Kontrol:

1. **cPanel'e giriş yapın** (genellikle: `yourdomain.com/cpanel`)

2. **"Software" veya "Yazılım"** bölümüne bakın:
   - **"Node.js Selector"** veya **"Node.js Versiyonları"** var mı?
   - Varsa → ✅ Node.js destekleniyor!
   - Yoksa → ⚠️ Alternatif çözüm gerekli

3. **"Terminal" veya "SSH Access"** kontrol edin:
   - Varsa → SSH ile bağlanabilirsiniz
   - Yoksa → FTP/SFTP kullanacağız

---

## Senaryo A: Node.js Selector VARSA ✅

### 1. Node.js Uygulaması Oluşturun

1. **cPanel → Node.js Selector** (veya Node.js Versiyonları)
2. **"Create Application"** veya **"Uygulama Oluştur"** tıklayın
3. Şu bilgileri girin:
   - **Node.js Version:** 18.x veya 20.x (en yüksek versiyon)
   - **Application Root:** `/home/kullaniciadi/public_html/todo-app` (veya istediğiniz dizin)
   - **Application URL:** `yourdomain.com` veya `todo.yourdomain.com`
   - **Application Startup File:** `server.js` veya boş bırakın (npm start kullanacağız)

### 2. Dosyaları Yükleyin

**FTP/SFTP ile (FileZilla/WinSCP):**
1. FileZilla ile hosting'e bağlanın
2. `public_html` veya Node.js uygulamasının root dizinine gidin
3. Tüm proje dosyalarını yükleyin:
   - `app/` klasörü
   - `components/` klasörü
   - `lib/` klasörü
   - `prisma/` klasörü
   - `public/` klasörü
   - `package.json`
   - `next.config.ts`
   - `tsconfig.json`
   - `middleware.ts`
   - Diğer tüm dosyalar

**ÖNEMLİ:** `.env` dosyasını manuel oluşturun (aşağıda)

### 3. Environment Variables (.env dosyası)

**cPanel → File Manager:**
1. Uygulama dizinine gidin
2. **"New File"** → `.env` oluşturun
3. İçine şunu yazın:

```env
JWT_SECRET=çok-güvenli-bir-şifre-buraya-yazın-en-az-32-karakter-uzunluğunda-123456789
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=production
PORT=3000
```

**ÖNEMLİ:** `JWT_SECRET` değerini mutlaka değiştirin!

### 4. Terminal/SSH ile Bağlanın

**cPanel → Terminal** veya SSH bilgilerinizle:

```bash
# Uygulama dizinine gidin
cd ~/public_html/todo-app  # veya uygulamanızın dizini

# Bağımlılıkları yükle
npm install --production

# Prisma Client oluştur
npx prisma generate

# Veritabanı migration
npx prisma migrate deploy

# Production build
npm run build
```

### 5. Package.json'u Güncelleyin

cPanel Node.js Selector bazen özel script'ler bekler. `package.json`'a ekleyin:

```json
{
  "scripts": {
    "start": "next start",
    "dev": "next dev",
    "build": "next build"
  }
}
```

### 6. Uygulamayı Başlatın

**cPanel → Node.js Selector:**
1. Uygulamanızı bulun
2. **"Start App"** veya **"Başlat"** tıklayın
3. Logları kontrol edin

---

## Senaryo B: Node.js Selector YOKSA ⚠️

### Seçenek 1: Vercel + Domain Yönlendirme (Önerilen)

1. **Vercel'e Deploy:**
```bash
# Yerel bilgisayarınızda
npm i -g vercel
vercel login
vercel
```

2. **Domain Yönlendirme:**
   - Vercel Dashboard → Project → Settings → Domains
   - Domain'inizi ekleyin: `yourdomain.com`
   - DNS kayıtlarını güncelleyin:
     - **Turbohost cPanel → Zone Editor:**
       - **CNAME:** `www` → `cname.vercel-dns.com`
       - **A Record:** `@` → Vercel'in verdiği IP (76.76.21.21 gibi)

3. **SSL:** Vercel otomatik SSL sağlar

### Seçenek 2: Railway.app

1. Railway.app'e kaydolun
2. GitHub'a projeyi push edin
3. Railway'de "New Project" → GitHub repo seçin
4. Environment variables ekleyin
5. Domain'i bağlayın

---

## Senaryo C: SSH Erişimi Varsa (Terminal)

### 1. SSH ile Bağlanın

```bash
ssh kullaniciadi@yourdomain.com
# veya
ssh kullaniciadi@sunucu-ip
```

### 2. Proje Dizinine Gidin

```bash
cd ~/public_html
# veya hosting'inizin belirttiği dizin
```

### 3. Dosyaları Yükleyin

**Git ile:**
```bash
git clone <repo-url> todo-app
cd todo-app
```

**FTP ile yüklediyseniz:**
```bash
cd ~/public_html/todo-app
```

### 4. Deployment Script'ini Çalıştırın

```bash
chmod +x deploy.sh
./deploy.sh
```

### 5. PM2 ile Başlatın

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

---

## Turbohost Özel Notlar

### Port Ayarları
- Turbohost genellikle port 3000 kullanır
- Farklı port gerekiyorsa `.env` dosyasında `PORT=XXXX` belirtin

### Database
- SQLite kullanıyorsunuz (dosya tabanlı)
- `prisma/dev.db` dosyası yazılabilir olmalı
- Gerekirse `chmod 666 prisma/dev.db` yapın

### SSL Sertifikası
- Turbohost genellikle Let's Encrypt SSL sağlar
- cPanel → SSL/TLS → Let's Encrypt ile kurun

### Domain Ayarları
- cPanel → Domains → Domain'inizi seçin
- Document Root'u uygulama dizinine ayarlayın

---

## Adım Adım Kontrol Listesi

### Ön Hazırlık:
- [ ] cPanel'e giriş yaptım
- [ ] Node.js Selector var mı kontrol ettim
- [ ] SSH/Terminal erişimi var mı kontrol ettim

### Dosya Yükleme:
- [ ] Tüm proje dosyalarını FTP ile yükledim
- [ ] `.env` dosyası oluşturdum
- [ ] `JWT_SECRET` değerini değiştirdim

### Deployment:
- [ ] `npm install --production` çalıştırdım
- [ ] `npx prisma generate` çalıştırdım
- [ ] `npm run build` başarılı oldu
- [ ] Node.js uygulamasını başlattım

### Domain:
- [ ] Domain hosting'e bağlı
- [ ] DNS kayıtları doğru
- [ ] SSL sertifikası kurulu

---

## Sorun Giderme

### "Node.js Selector bulunamadı"
- Turbohost destek ekibiyle iletişime geçin
- Node.js desteği olan pakete geçiş yapın
- Veya Vercel/Railway kullanın

### "npm install hatası"
```bash
# Node.js versiyonunu kontrol et
node --version

# npm cache temizle
npm cache clean --force

# Tekrar dene
npm install --production
```

### "Permission denied"
```bash
chmod -R 755 .
chmod 666 prisma/dev.db
```

### "Port kullanımda"
- `.env` dosyasında farklı port belirtin
- Hosting'inizin verdiği portu kullanın

### Domain çalışmıyor
- DNS propagation bekleyin (24-48 saat)
- cPanel → Zone Editor'de DNS kayıtlarını kontrol edin

---

## Destek

1. **Turbohost Destek:** https://turbohost.com/destek
2. **cPanel Dokümantasyon:** https://docs.cpanel.net
3. **Loglar:** cPanel → Node.js Selector → Logs

---

## Hızlı Başlangıç (Node.js Selector Varsa)

1. cPanel → Node.js Selector → Create Application
2. FTP ile dosyaları yükle
3. `.env` dosyası oluştur
4. Terminal'de: `npm install && npx prisma generate && npm run build`
5. Node.js Selector'da "Start App"
6. Domain'i bağla
