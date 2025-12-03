# 🚀 GitHub'a Push Etme

## Şimdi Yapmanız Gerekenler:

### Terminal'de şu komutu çalıştırın:

```bash
cd "/home/mindsight/To-Do App"
git push -u origin main
```

### İstendiğinde:

1. **Username:** `Emrekalkn1` yazın ve Enter
2. **Password:** Oluşturduğunuz **Personal Access Token**'ı yapıştırın (şifre değil!)
   - Token'ı kopyalayıp yapıştırın
   - Terminal'de şifre görünmez, bu normal

### Başarılı olursa:

```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
To https://github.com/Emrekalkn1/to-do.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Proje GitHub'a push edildi!**

---

## Sonraki Adım: Vercel Deploy

1. **Vercel'e git:** https://vercel.com
2. **GitHub ile giriş yap**
3. **New Project**
4. **GitHub'dan `to-do` repository'sini seç**
5. **Deploy!**

---

## Sorun Olursa:

### "Permission denied"
- Token'ı doğru kopyaladığınızdan emin olun
- Username'i doğru yazdığınızdan emin

### "Repository not found"
- GitHub'da repository oluşturuldu mu kontrol edin
- Repository adı: `Emrekalkn1/to-do`

