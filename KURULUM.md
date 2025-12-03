# Projeyi Çalıştırma Rehberi

## 1. Node.js ve npm Kurulumu

Eğer Node.js ve npm yüklü değilse, önce bunları kurmanız gerekiyor:

```bash
# Node.js ve npm'i kurmak için:
sudo apt update
sudo apt install nodejs npm

# Kurulumu doğrulamak için:
node --version
npm --version
```

**Alternatif:** Node.js'in en güncel versiyonunu kurmak için [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) kullanabilirsiniz.

## 2. Bağımlılıkları Yükleme

Proje dizininde bağımlılıkları yükleyin:

```bash
cd "/home/mindsight/To-Do App"
npm install
```

## 3. Veritabanını Hazırlama

Prisma veritabanını oluşturmak ve migrate etmek için:

```bash
# Prisma Client'ı oluştur
npx prisma generate

# Veritabanını oluştur ve migrate et
npx prisma migrate dev
# veya
npx prisma db push
```

## 4. Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 5. Diğer Komutlar

- **Production build:** `npm run build`
- **Production sunucu:** `npm start` (önce `npm run build` çalıştırılmalı)
- **Lint kontrolü:** `npm run lint`

## Sorun Giderme

- Eğer `prisma` komutları çalışmıyorsa, `npx` ile çalıştırın: `npx prisma generate`
- Veritabanı dosyası `prisma/dev.db` konumunda oluşturulacaktır
- Port 3000 kullanımda ise, Next.js otomatik olarak 3001, 3002 gibi bir port seçecektir



