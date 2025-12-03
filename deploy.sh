#!/bin/bash

# Production Deployment Script
echo "🚀 Production deployment başlatılıyor..."

# Environment check
if [ ! -f .env ]; then
    echo "⚠️  .env dosyası bulunamadı!"
    echo "📝 .env.example dosyasını kopyalayıp düzenleyin:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    exit 1
fi

# Check JWT_SECRET
if grep -q "your-super-secret-jwt-key" .env || grep -q "super-secret-key" .env; then
    echo "⚠️  UYARI: JWT_SECRET değerini değiştirmelisiniz!"
    echo "   .env dosyasını açıp JWT_SECRET değerini güvenli bir değerle değiştirin"
    read -p "Devam etmek istiyor musunuz? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Bağımlılıklar yükleniyor..."
npm ci --production

echo "🔧 Prisma Client oluşturuluyor..."
npx prisma generate

echo "📊 Veritabanı migration..."
npx prisma migrate deploy

echo "🏗️  Production build oluşturuluyor..."
npm run build

echo "✅ Build tamamlandı!"
echo ""
echo "🚀 Sunucuyu başlatmak için:"
echo "   npm start"
echo ""
echo "📊 PM2 ile başlatmak için:"
echo "   pm2 start npm --name 'todo-app' -- start"
echo "   pm2 startup"
echo "   pm2 save"


