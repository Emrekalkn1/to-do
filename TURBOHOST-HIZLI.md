# ⚡ Turbohost Hızlı Deployment

## 5 Dakikada Deploy

### 1️⃣ cPanel'de Node.js Kontrolü

cPanel → **"Software"** → **"Node.js Selector"** var mı?
- ✅ **VARSA** → Aşağıdaki adımları takip edin
- ❌ **YOKSA** → Vercel kullanın (en altta)

---

## Node.js Selector Varsa:

### Adım 1: Uygulama Oluştur (2 dk)

1. cPanel → **Node.js Selector** → **Create Application**
2. Ayarlar:
   - **Node.js Version:** 20.x (en yüksek)
   - **Application Root:** `/home/kullaniciadi/public_html/todo-app`
   - **Application URL:** `yourdomain.com`
   - **Startup File:** Boş bırak

### Adım 2: Dosyaları Yükle (3 dk)

**FileZilla ile:**
1. FTP bilgilerinizle bağlanın
2. `public_html/todo-app` dizinine gidin
3. Tüm dosyaları yükleyin

### Adım 3: .env Dosyası (1 dk)

cPanel → **File Manager:**
1. `todo-app` dizinine gidin
2. **New File** → `.env`
3. İçine yazın:

```env
JWT_SECRET=buraya-cok-guvenli-bir-sifre-yazin-en-az-32-karakter-123456789
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=production
```

### Adım 4: Terminal'de Komutlar (2 dk)

cPanel → **Terminal** veya SSH:

```bash
cd ~/public_html/todo-app
npm install --production
npx prisma generate
npm run build
```

### Adım 5: Başlat (1 dk)

cPanel → **Node.js Selector:**
- Uygulamanızı bulun
- **Start App** tıklayın

✅ **Tamamlandı!** `yourdomain.com` adresinden erişin.

---

## Node.js Selector Yoksa:

### Vercel Kullanın (5 dk)

1. **Vercel'e kaydol:** https://vercel.com
2. **Projeyi GitHub'a push edin**
3. **Vercel'de:**
   - New Project → GitHub repo seçin
   - Environment Variables:
     - `JWT_SECRET`: Güvenli bir değer
   - Deploy

4. **Domain Bağlama:**
   - Vercel → Project → Settings → Domains
   - `yourdomain.com` ekleyin
   - DNS kayıtlarını güncelleyin:
     - Turbohost cPanel → Zone Editor:
       - **A Record:** `@` → `76.76.21.21`
       - **CNAME:** `www` → `cname.vercel-dns.com`

✅ **Tamamlandı!** Domain'iniz Vercel üzerinden çalışacak.

---

## Sorun mu var?

- **Node.js Selector yok:** Turbohost destek ekibiyle iletişime geçin
- **Hata alıyorum:** `TURBOHOST-DEPLOY.md` dosyasındaki "Sorun Giderme" bölümüne bakın
- **Domain çalışmıyor:** DNS propagation bekleyin (24 saat)


