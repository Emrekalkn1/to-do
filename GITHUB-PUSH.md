# 📤 GitHub'a Push ve Vercel Deploy Rehberi

## Adım 1: Git Repository Oluşturma

### Terminal'de şu komutları çalıştırın:

```bash
cd "/home/mindsight/To-Do App"

# Git repo başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: To-Do App"

# GitHub remote ekle
git remote add origin https://github.com/Emrekalkn1/to-do.git

# Branch adını main yap (GitHub'ın varsayılanı)
git branch -M main

# GitHub'a push et
git push -u origin main
```

**Not:** GitHub'da authentication gerekebilir. Personal Access Token kullanmanız gerekebilir.

---

## Adım 2: GitHub Authentication

### Personal Access Token Oluşturma:

1. **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **Generate new token (classic)**
3. **Scopes:** `repo` seçin
4. **Generate token**
5. Token'ı kopyalayın (bir daha gösterilmeyecek!)

### Push sırasında kullanın:

```bash
# Username: GitHub kullanıcı adınız
# Password: Personal Access Token (şifre değil!)
git push -u origin main
```

---

## Adım 3: Vercel ile Deploy (Önerilen)

### Vercel'e Deploy:

1. **Vercel'e kaydol:** https://vercel.com (GitHub ile giriş yap)

2. **New Project:**
   - GitHub'dan `to-do` repository'sini seçin
   - Framework Preset: **Next.js**
   - Root Directory: `./` (varsayılan)

3. **Environment Variables ekleyin:**
   - `JWT_SECRET`: Güvenli bir değer (en az 32 karakter)
   - `DATABASE_URL`: `file:./prisma/dev.db` (SQLite için)
   - `NODE_ENV`: `production`

4. **Deploy** butonuna tıklayın

5. **Domain Bağlama:**
   - Project → Settings → Domains
   - Domain'inizi ekleyin: `yourdomain.com`
   - DNS kayıtlarını güncelleyin

---

## Adım 4: Turbohost Domain'i Vercel'e Yönlendirme

### DNS Ayarları (Turbohost cPanel):

1. **cPanel → Zone Editor** (veya DNS Zone Editor)
2. **Domain'inizi seçin**
3. Şu kayıtları ekleyin/düzenleyin:

**A Record:**
- **Name:** `@` (veya boş)
- **TTL:** 3600
- **Type:** A
- **Address:** `76.76.21.21` (Vercel'in IP'si - değişebilir, Vercel'den kontrol edin)

**CNAME Record:**
- **Name:** `www`
- **TTL:** 3600
- **Type:** CNAME
- **CNAME:** `cname.vercel-dns.com`

**Veya Vercel'in verdiği DNS kayıtlarını kullanın:**
- Vercel Dashboard → Project → Settings → Domains
- Domain'inizin yanında DNS kayıtları gösterilir

---

## Alternatif: Railway.app

1. **Railway.app'e kaydol:** https://railway.app
2. **New Project → Deploy from GitHub repo**
3. Repository seçin
4. Environment variables ekleyin
5. Domain'i bağlayın

---

## Hızlı Komutlar

### Git Push (İlk kez):
```bash
cd "/home/mindsight/To-Do App"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Emrekalkn1/to-do.git
git branch -M main
git push -u origin main
```

### Sonraki güncellemeler:
```bash
git add .
git commit -m "Update: açıklama"
git push
```

---

## Önemli Notlar

### ⚠️ SQLite Vercel'de Çalışmaz!

Vercel serverless olduğu için SQLite (dosya tabanlı) çalışmaz. İki seçenek:

**Seçenek 1: PostgreSQL (Önerilen)**
- Vercel Postgres (ücretsiz plan var)
- veya Railway Postgres
- veya Supabase (ücretsiz)

**Seçenek 2: Railway/Render Kullan**
- Bu platformlar SQLite destekler
- Dosya sistemi erişimi var

### PostgreSQL'e Geçiş:

1. **Prisma Schema güncelle:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. **Vercel Postgres ekle:**
   - Vercel Dashboard → Storage → Create Database → Postgres
   - Connection string'i kopyala

3. **Environment Variable:**
   - `DATABASE_URL`: PostgreSQL connection string

4. **Migration:**
```bash
npx prisma migrate deploy
```

---

## Sorun Giderme

### "Permission denied" (Git push)
- Personal Access Token kullandığınızdan emin olun
- SSH key kullanabilirsiniz

### "Repository not found"
- Repository adını kontrol edin
- GitHub'da repository oluşturuldu mu kontrol edin

### Vercel build hatası
- Environment variables kontrol edin
- `npm run build` yerel olarak çalışıyor mu test edin

---

## Sonraki Adımlar

1. ✅ Git repo oluştur
2. ✅ GitHub'a push et
3. ✅ Vercel'e deploy et
4. ✅ Domain'i bağla
5. ✅ PostgreSQL'e geç (SQLite yerine)

