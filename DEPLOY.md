# 🚀 Deployment Rehberi

## Ön Hazırlık

### 1. Environment Variables (.env dosyası oluşturun)

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve `JWT_SECRET` değerini güvenli bir değerle değiştirin:

```env
JWT_SECRET=çok-güvenli-bir-şifre-buraya-yazın-en-az-32-karakter
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=production
```

### 2. Production Build Testi (Yerel)

```bash
npm run build
npm start
```

---

## Deployment Seçenekleri

### Seçenek 1: Vercel (Önerilen - En Kolay) ⭐

**Avantajlar:**
- Next.js için optimize edilmiş
- Otomatik SSL sertifikası
- Ücretsiz plan mevcut
- Kolay domain bağlama

**Adımlar:**

1. **Vercel hesabı oluşturun:** https://vercel.com

2. **Vercel CLI ile deploy:**
```bash
npm i -g vercel
vercel login
vercel
```

3. **Veya GitHub/GitLab ile:**
   - Projeyi GitHub'a push edin
   - Vercel'e giriş yapın
   - "New Project" → Repository seçin
   - Environment Variables ekleyin:
     - `JWT_SECRET`: Güvenli bir değer
   - Deploy edin

4. **Domain bağlama:**
   - Vercel Dashboard → Project → Settings → Domains
   - Domain'inizi ekleyin
   - DNS kayıtlarını güncelleyin

**Not:** SQLite Vercel'de çalışmaz. PostgreSQL veya MySQL kullanmanız gerekir.

---

### Seçenek 2: Kendi Sunucunuz (VPS/Linux Hosting)

#### Gereksinimler:
- Node.js 20+ yüklü
- npm veya yarn
- PM2 (process manager - önerilen)

#### Adımlar:

1. **Sunucuya bağlanın:**
```bash
ssh kullanici@sunucu-ip
```

2. **Projeyi yükleyin:**
```bash
# Git ile
git clone https://github.com/kullanici/proje.git
cd proje

# Veya FTP/SFTP ile dosyaları yükleyin
```

3. **Bağımlılıkları yükleyin:**
```bash
npm install --production
```

4. **Environment variables oluşturun:**
```bash
nano .env
# JWT_SECRET ve diğer değerleri ekleyin
```

5. **Prisma Client oluşturun:**
```bash
npx prisma generate
npx prisma migrate deploy
```

6. **Production build:**
```bash
npm run build
```

7. **PM2 ile çalıştırın (Önerilen):**
```bash
# PM2 kurulumu
npm install -g pm2

# Uygulamayı başlat
pm2 start npm --name "todo-app" -- start

# Otomatik başlatma
pm2 startup
pm2 save
```

8. **Nginx Reverse Proxy (Önerilen):**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **SSL Sertifikası (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Seçenek 3: Docker ile

1. **Dockerfile oluşturun** (zaten var)

2. **Build ve çalıştır:**
```bash
docker build -t todo-app .
docker run -p 3000:3000 --env-file .env todo-app
```

3. **Docker Compose (Önerilen):**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    volumes:
      - ./prisma:/app/prisma
```

---

## Önemli Notlar

### ⚠️ Güvenlik

1. **JWT_SECRET mutlaka değiştirin!**
2. `.env` dosyasını asla Git'e commit etmeyin
3. Production'da güçlü şifreler kullanın
4. HTTPS kullanın (SSL sertifikası)

### 📊 Veritabanı

**SQLite Production için önerilmez!** 

Alternatifler:
- **PostgreSQL** (önerilen)
- **MySQL/MariaDB**
- **MongoDB**

PostgreSQL'e geçiş için:
1. `prisma/schema.prisma` dosyasında:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. `.env` dosyasına:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/todoapp"
```

3. Migration:
```bash
npx prisma migrate deploy
```

### 🔧 Production Optimizasyonları

1. **Next.js Config:**
```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone', // Docker için
  compress: true,
  poweredByHeader: false,
}
```

2. **PM2 Ecosystem:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'todo-app',
    script: 'npm',
    args: 'start',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

---

## Hızlı Başlangıç (VPS)

```bash
# 1. Projeyi klonla/yükle
git clone <repo-url>
cd "To-Do App"

# 2. Bağımlılıkları yükle
npm install --production

# 3. Environment variables
cp .env.example .env
nano .env  # JWT_SECRET değiştir

# 4. Prisma
npx prisma generate
npx prisma migrate deploy

# 5. Build
npm run build

# 6. PM2 ile başlat
pm2 start npm --name "todo-app" -- start
pm2 startup
pm2 save

# 7. Nginx ayarla (yukarıdaki config)
# 8. SSL kur (Let's Encrypt)
```

---

## Sorun Giderme

### Port 3000 kullanımda
```bash
# Farklı port kullan
PORT=3001 npm start
```

### Prisma hatası
```bash
npx prisma generate
npx prisma migrate deploy
```

### Memory hatası
```bash
# Node.js memory limit artır
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## Destek

Sorun yaşarsanız:
1. Logları kontrol edin: `pm2 logs todo-app`
2. Build test edin: `npm run build`
3. Environment variables kontrol edin


