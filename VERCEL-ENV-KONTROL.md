# ⚠️ Vercel DATABASE_URL Kontrolü

## Sorun
Build sırasında `DATABASE_URL` bulunamıyor. Environment variable muhtemelen yanlış environment'a eklenmiş.

## Çözüm: Environment Variable Kontrolü

### 1. Vercel Dashboard'da Kontrol

1. **Vercel Dashboard** → Projenize gidin
2. **Settings** → **Environment Variables** sekmesine gidin
3. `DATABASE_URL` variable'ını bulun

### 2. Environment Seçimi (ÖNEMLİ!)

`DATABASE_URL` variable'ının yanında şu seçenekler olmalı:
- ✅ **Production** (seçili olmalı)
- ✅ **Preview** (seçili olmalı)
- ✅ **Development** (seçili olmalı)

**Eğer sadece Development seçiliyse, Production ve Preview'ı da seçin!**

### 3. Variable'ı Düzenle

1. `DATABASE_URL` variable'ına tıklayın
2. **Environment** kısmında:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
   (Hepsini seçin!)
3. **Save**

### 4. Yeni Variable Ekleme (Eğer Yoksa)

1. **Add New** butonuna tıklayın
2. **Name:** `DATABASE_URL`
3. **Value:** 
   ```
   postgres://postgres.zsikfuznhpnghiimkloo:1J50K8P4fvCOHBCh@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
   ```
4. **Environment:** 
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. **Save**

---

## Önemli Notlar

### Environment Seçimi Neden Önemli?

- **Production:** Canlı site için kullanılır
- **Preview:** Pull request'ler için kullanılır
- **Development:** Yerel geliştirme için kullanılır

Build sırasında **Production** environment kullanılır, bu yüzden Production'da olmalı!

---

## Kontrol Listesi

- [ ] `DATABASE_URL` variable'ı var mı?
- [ ] **Production** environment seçili mi?
- [ ] **Preview** environment seçili mi?
- [ ] Connection string doğru mu?
- [ ] Variable kaydedildi mi?

---

## Sonraki Adım

Environment variable'ı düzelttikten sonra:

1. **Vercel Dashboard** → **Deployments**
2. En son deployment'ı bulun
3. **Redeploy** butonuna tıklayın

Veya yeni bir commit push edin:
```bash
git commit --allow-empty -m "Trigger redeploy after env fix"
git push origin main
```

---

## Alternatif: Vercel CLI ile Kontrol

```bash
vercel env ls
```

Tüm environment variable'ları gösterir.

```bash
vercel env add DATABASE_URL production
```

Production environment'a ekler.

---

## Sorun Devam Ederse

1. Variable'ı silin
2. Tekrar ekleyin (tüm environment'ları seçerek)
3. Redeploy yapın

Build artık başarılı olmalı! ✅

