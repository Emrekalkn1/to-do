# ❌ 403 Hatası Çözümü

## Sorun: Permission denied (403)

Bu hata genellikle şu nedenlerden olur:
1. Token yanlış kullanılmış
2. Token'da yeterli izin yok
3. Username yanlış

---

## Çözüm 1: Token'ı Doğru Kullanma

### Önemli:
- **Password kısmına şifrenizi DEĞİL, Token'ı yapıştırın!**
- Token'ı tam olarak kopyalayın (başında/sonunda boşluk olmamalı)

### Tekrar Deneyin:

```bash
cd "/home/mindsight/To-Do App"
git push -u origin main
```

**İstendiğinde:**
- **Username:** `Emrekalkn1` (email değil, GitHub kullanıcı adı!)
- **Password:** Token'ı yapıştırın

---

## Çözüm 2: Token'ı Kontrol Edin

1. GitHub → Settings → Developer settings → Personal access tokens
2. Token'ınızı bulun
3. **Scopes** kısmında `repo` seçili mi kontrol edin
4. Token'ı yeniden kopyalayın

---

## Çözüm 3: Username Düzeltme

Username olarak **email değil, GitHub kullanıcı adınızı** kullanın:

```bash
git push -u origin main
```

**Username:** `Emrekalkn1` (email değil!)

---

## Çözüm 4: Remote URL'i Güncelleme

Token'ı URL'e ekleyebilirsiniz:

```bash
# Önce mevcut remote'u kaldır
git remote remove origin

# Token ile remote ekle (TOKEN_YERINE token'ınızı yazın)
git remote add origin https://TOKEN_YERINE@github.com/Emrekalkn1/to-do.git

# Push et
git push -u origin main
```

**Not:** Bu yöntem güvenli değil, token görünür olur. Sadece test için.

---

## Çözüm 5: SSH Kullanma (Önerilen)

Token yerine SSH key kullanabilirsiniz:

### SSH Key Oluşturma:

```bash
ssh-keygen -t ed25519 -C "emre.kalkn@gmail.com"
# Enter'a basın (şifre istemezseniz)
```

### Public Key'i GitHub'a Ekleme:

1. Public key'i görüntüleyin:
```bash
cat ~/.ssh/id_ed25519.pub
```

2. GitHub → Settings → SSH and GPG keys → New SSH key
3. Key'i yapıştırın

### Remote'u SSH olarak değiştirme:

```bash
git remote set-url origin git@github.com:Emrekalkn1/to-do.git
git push -u origin main
```

---

## Hızlı Test

Token'ınızı test etmek için:

```bash
curl -H "Authorization: token TOKEN_YERINE" https://api.github.com/user
```

Başarılı olursa kullanıcı bilgilerinizi gösterir.

---

## En Kolay Çözüm

1. **Username'i düzelt:** `Emrekalkn1` (email değil)
2. **Token'ı tam kopyala** (başında/sonunda boşluk yok)
3. **Password kısmına token'ı yapıştır**

Tekrar deneyin:
```bash
git push -u origin main
```

