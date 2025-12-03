#!/bin/bash

# To-Do App Durdurma Scripti
echo "🛑 To-Do App sunucusu durduruluyor..."

# Next.js dev sunucusunu bul ve durdur
pkill -f "next dev"

if [ $? -eq 0 ]; then
    echo "✅ Sunucu durduruldu"
else
    echo "ℹ️  Çalışan sunucu bulunamadı"
fi


