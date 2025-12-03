# 🌐 Mevcut Hosting ve Domain ile Deployment

## Hosting Türünü Belirleme

Hosting sağlayıcınızın kontrol panelinde (cPanel, Plesk, vb.) şunları kontrol edin:

### ✅ Node.js Destekli Hosting (VPS/Cloud/Managed Node.js)
- **Kullanılabilir:** Doğrudan deploy edebilirsiniz
- **Özellikler:** SSH erişimi, Node.js runtime, npm

### ❌ Shared Hosting (Sadece PHP/Static)
- **Kullanılamaz:** Node.js çalıştıramaz
- **Çözüm:** Vercel/Railway gibi platform kullanıp domain'i yönlendirin

---

## Senaryo 1: Node.js Destekli Hosting (Önerilen Yol)

### Adım 1: Hosting Kontrol Paneline Giriş

1. **SSH Erişimi Kontrolü:**
   - cPanel → Terminal veya SSH Access
   - Veya hosting sağlayıcınızdan SSH bilgilerini alın

2. **Node.js Versiyonu:**
```bash
node --version  # 18+ olmalı
npm --version
```

### Adım 2: Dosyaları Yükleme

**Yöntem A: FTP/SFTP ile**
1. FileZilla veya WinSCP ile bağlanın
2. Tüm proje dosyalarını `public_html` veya belirtilen dizine yükleyin
3. `.env.example` dosyasını `.env` olarak kopyalayın

**Yöntem B: Git ile (SSH varsa)**
```bash
cd ~/public_html  # veya hosting'inizin belirttiği dizin
git clone <repo-url> todo-app
cd todo-app
```

### Adım 3: Environment Variables

```bash
cp .env.example .env
nano .env
```

`.env` dosyasını düzenleyin:
```env
JWT_SECRET=çok-güvenli-bir-şifre-en-az-32-karakter
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=production
```

### Adım 4: Deployment

```bash
# Bağımlılıkları yükle
npm install --production

# Prisma
npx prisma generate
npx prisma migrate deploy

# Build
npm run build
```

### Adım 5: Process Manager (PM2 veya Alternatif)

**PM2 Kurulumu:**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

**Veya hosting'inizin önerdiği yöntem:**
- Bazı hosting'ler kendi process manager'larını kullanır
- cPanel'de "Node.js Selector" veya benzeri özellik olabilir

### Adım 6: Domain Ayarları

Hosting kontrol panelinizde:
1. **Domain Yönetimi** → Domain'inizi seçin
2. **Document Root** → Proje dizininizi ayarlayın
3. **Port Ayarları** → 3000 portunu açın (gerekirse)

**Nginx/Apache Reverse Proxy:**
Hosting'iniz otomatik yapılandırıyor olabilir. Değilse `.htaccess` veya Nginx config gerekebilir.

---

## Senaryo 2: Shared Hosting (Node.js Yok)

Bu durumda iki seçenek var:

### Seçenek A: Vercel + Domain Yönlendirme (Önerilen)

1. **Vercel'e Deploy:**
```bash
npm i -g vercel
vercel login
vercel
```

2. **Domain Yönlendirme:**
   - Vercel Dashboard → Project → Settings → Domains
   - Domain'inizi ekleyin
   - DNS kayıtlarını güncelleyin:
     - **CNAME:** `www` → `cname.vercel-dns.com`
     - **A Record:** `@` → Vercel'in verdiği IP

3. **Hosting'inizde:**
   - Domain'i Vercel'e yönlendirin
   - Veya subdomain kullanın (api.yourdomain.com)

### Seçenek B: Railway/Render + Domain

1. Railway.app veya Render.com'a deploy
2. Domain'i yönlendir
3. DNS ayarlarını yap

---

## Senaryo 3: cPanel ile Node.js (Bazı Hosting'lerde)

### cPanel Node.js Selector Kullanımı:

1. **cPanel → Node.js Selector**
2. **Create Application:**
   - Node.js Version: 18+ seçin
   - Application Root: Proje dizini
   - Application URL: Domain'iniz
   - Application Startup File: `server.js` veya `npm start`

3. **Environment Variables:**
   - `.env` dosyasını oluşturun
   - JWT_SECRET ve diğer değerleri ekleyin

4. **NPM Install:**
```bash
npm install --production
npx prisma generate
npm run build
```

5. **Start Application** butonuna tıklayın

---

## Hosting Sağlayıcıya Özel Notlar

### 🟢 cPanel Hosting
- Node.js Selector eklentisi olabilir
- Terminal/SSH erişimi kontrol edin
- Port 3000 yerine hosting'inizin verdiği portu kullanın

### 🟢 Plesk Hosting
- Node.js modülü kurulu olabilir
- Application → Node.js
- Environment variables Plesk panelinden ayarlanabilir

### 🟢 DigitalOcean/Linode/Vultr (VPS)
- Tam kontrol var
- Yukarıdaki "Senaryo 1" adımlarını takip edin
- Nginx reverse proxy kurun

### 🟢 AWS/Google Cloud/Azure
- Platform'a özel deployment yöntemleri var
- Elastic Beanstalk, App Engine, App Service kullanılabilir

---

## Hızlı Kontrol Listesi

1. **Hosting Türü:**
   - [ ] Node.js destekliyor mu?
   - [ ] SSH erişimi var mı?
   - [ ] Terminal/Command Line erişimi var mı?

2. **Gereksinimler:**
   - [ ] Node.js 18+ kurulu
   - [ ] npm kurulu
   - [ ] Port 3000 (veya başka port) açık

3. **Deployment:**
   - [ ] Dosyalar yüklendi
   - [ ] `.env` dosyası oluşturuldu
   - [ ] `JWT_SECRET` değiştirildi
   - [ ] `npm install` çalıştı
   - [ ] `npm run build` başarılı
   - [ ] Uygulama çalışıyor

4. **Domain:**
   - [ ] Domain hosting'e bağlı
   - [ ] DNS kayıtları doğru
   - [ ] SSL sertifikası kurulu (Let's Encrypt)

---

## Sorun Giderme

### "Node.js bulunamadı"
- Hosting sağlayıcınızla iletişime geçin
- Node.js Selector eklentisi kurun (cPanel)
- VPS'e geçmeyi düşünün

### "Port 3000 kullanımda"
- Hosting'inizin verdiği portu kullanın
- `.env` dosyasına `PORT=3001` ekleyin

### "Permission denied"
```bash
chmod +x deploy.sh
chmod -R 755 .
```

### Domain çalışmıyor
- DNS propagation bekleyin (24-48 saat)
- DNS kayıtlarını kontrol edin
- Hosting'inizin domain yönetim panelini kontrol edin

---

## Destek

Hosting sağlayıcınızın:
- **Dokümantasyonunu** kontrol edin
- **Destek ekibiyle** iletişime geçin
- **Node.js desteği** olup olmadığını sorun


