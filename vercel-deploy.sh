#!/bin/bash

# Vercel Deployment Script
echo "🚀 Vercel'e deploy için hazırlanıyor..."

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI kuruluyor..."
    npm install -g vercel
fi

# Check .env file
if [ ! -f .env ]; then
    echo "⚠️  .env dosyası bulunamadı!"
    echo "📝 .env.example dosyasını kopyalayıp düzenleyin:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    echo ""
    echo "ÖNEMLİ: JWT_SECRET değerini mutlaka değiştirin!"
    read -p "Devam etmek istiyor musunuz? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "🔐 Vercel'e giriş yapın..."
vercel login

echo "📤 Deploy başlatılıyor..."
vercel

echo ""
echo "✅ Deploy tamamlandı!"
echo ""
echo "🌐 Domain bağlamak için:"
echo "   1. Vercel Dashboard → Project → Settings → Domains"
echo "   2. Domain'inizi ekleyin"
echo "   3. DNS kayıtlarını güncelleyin"
echo ""
echo "📊 Production deploy için:"
echo "   vercel --prod"

