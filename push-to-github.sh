#!/bin/bash

# GitHub'a Push Scripti
echo "📤 GitHub'a push ediliyor..."

cd "$(dirname "$0")"

# Remote kontrolü
if ! git remote get-url origin &> /dev/null; then
    echo "❌ Remote origin bulunamadı!"
    echo "🔗 Remote ekleniyor..."
    git remote add origin https://github.com/Emrekalkn1/to-do.git
fi

# Branch kontrolü
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "🔄 Branch main'e değiştiriliyor..."
    git branch -M main
fi

# Commit kontrolü
if [ -z "$(git log --oneline -1 2>/dev/null)" ]; then
    echo "📝 İlk commit yapılıyor..."
    git commit -m "Initial commit: To-Do App with Next.js, Prisma, and authentication" || {
        echo "⚠️  Commit yapılamadı. Dosyalar zaten commit edilmiş olabilir."
    }
fi

echo "🚀 GitHub'a push ediliyor..."
echo "⚠️  GitHub authentication gerekebilir!"
echo "   - Username: GitHub kullanıcı adınız"
echo "   - Password: Personal Access Token (şifre değil!)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Başarılı! Proje GitHub'a push edildi."
    echo "🌐 Repository: https://github.com/Emrekalkn1/to-do"
    echo ""
    echo "📋 Sonraki adımlar:"
    echo "   1. Vercel'e git: https://vercel.com"
    echo "   2. New Project → GitHub repo seç"
    echo "   3. Environment variables ekle (JWT_SECRET)"
    echo "   4. Deploy et!"
else
    echo ""
    echo "❌ Push başarısız!"
    echo ""
    echo "🔐 GitHub Authentication:"
    echo "   1. GitHub → Settings → Developer settings"
    echo "   2. Personal access tokens → Tokens (classic)"
    echo "   3. Generate new token → 'repo' scope seç"
    echo "   4. Token'ı kopyala ve şifre yerine kullan"
    echo ""
    echo "Veya SSH key kullanabilirsiniz."
fi

