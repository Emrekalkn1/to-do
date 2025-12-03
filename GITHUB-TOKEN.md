# 🔐 GitHub Personal Access Token Oluşturma

## Yöntem 1: Doğrudan Link (En Kolay)

Bu linke tıklayın:
**https://github.com/settings/tokens**

Veya:
**https://github.com/settings/tokens/new**

---

## Yöntem 2: Manuel Yol

### GitHub'ın Yeni Arayüzünde:

1. **GitHub'a giriş yapın**
2. Sağ üst köşedeki **profil fotoğrafınıza** tıklayın
3. **Settings** (Ayarlar) seçin
4. Sol menüden en alta kaydırın
5. **Developer settings** görünmüyorsa:
   - **Settings** sayfasında arama kutusuna **"token"** yazın
   - Veya **"developer"** yazın
   - **"Personal access tokens"** seçeneğini bulun

### Eski Arayüzde:

1. **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**

---

## Yöntem 3: Hızlı Erişim

Tarayıcınızda şu adresi açın:
```
https://github.com/settings/tokens/new
```

---

## Token Oluşturma Adımları

1. **Note (İsim):** `To-Do App Deployment` (istediğiniz bir isim)

2. **Expiration (Süre):**
   - **30 days** (30 gün)
   - **90 days** (90 gün)
   - **No expiration** (süresiz) - **Dikkatli kullanın!**

3. **Select scopes (İzinler):**
   - ✅ **`repo`** - Tüm repository işlemleri için gerekli
     - Bu seçildiğinde alt seçenekler otomatik seçilir

4. **Generate token** butonuna tıklayın

5. **Token'ı kopyalayın!** 
   - ⚠️ **Bir daha gösterilmeyecek!**
   - Not defterine kaydedin

---

## Token ile Push Etme

### Komut satırında:

```bash
cd "/home/mindsight/To-Do App"
git push -u origin main
```

**İstendiğinde:**
- **Username:** `Emrekalkn1`
- **Password:** Oluşturduğunuz **Personal Access Token** (şifre değil!)

---

## Alternatif: SSH Key Kullanma

Token yerine SSH key de kullanabilirsiniz:

### SSH Key Oluşturma:

```bash
ssh-keygen -t ed25519 -C "emrekalkn1@github.com"
```

### Public Key'i GitHub'a Ekleme:

1. **GitHub → Settings → SSH and GPG keys**
2. **New SSH key**
3. Public key'i yapıştırın: `~/.ssh/id_ed25519.pub`

### Remote'u SSH olarak değiştirme:

```bash
git remote set-url origin git@github.com:Emrekalkn1/to-do.git
git push -u origin main
```

---

## Sorun Giderme

### "Developer settings bulamıyorum"
- Doğrudan link kullanın: https://github.com/settings/tokens
- Settings sayfasında arama kutusuna "token" yazın

### "Permission denied" hatası
- Token'ı doğru kopyaladığınızdan emin olun
- `repo` scope'unun seçili olduğundan emin olun

### "Repository not found"
- Repository'nin GitHub'da oluşturulduğundan emin olun
- Repository adını kontrol edin: `Emrekalkn1/to-do`

---

## Güvenlik Notları

⚠️ **Token'ı asla paylaşmayın!**
⚠️ **GitHub'a commit etmeyin!**
⚠️ **Sadece kendi bilgisayarınızda kullanın!**

Token sızdırılırsa:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Token'ı bulun ve **Revoke** (İptal) edin
3. Yeni token oluşturun

