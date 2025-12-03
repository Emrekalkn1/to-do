#!/bin/bash

# To-Do App Başlatma Scripti
cd "$(dirname "$0")"

echo "🚀 To-Do App başlatılıyor..."
echo "📁 Dizin: $(pwd)"

# Node.js kontrolü
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı! Lütfen Node.js kurun."
    exit 1
fi

# npm kontrolü
if ! command -v npm &> /dev/null; then
    echo "❌ npm bulunamadı! Lütfen npm kurun."
    exit 1
fi

# Bağımlılıkları kontrol et
if [ ! -d "node_modules" ]; then
    echo "📦 Bağımlılıklar yükleniyor..."
    npm install
fi

# Prisma Client kontrolü
if [ ! -d "node_modules/.prisma" ]; then
    echo "🔧 Prisma Client oluşturuluyor..."
    npx prisma generate
fi

# Sunucuyu başlat
echo "✅ Sunucu başlatılıyor..."
echo "🌐 Tarayıcıda http://localhost:3000 adresini açın"
echo "⏹️  Durdurmak için Ctrl+C kullanın"
echo ""

npm run dev


