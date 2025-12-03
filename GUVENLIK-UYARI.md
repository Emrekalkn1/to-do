# ⚠️ GÜVENLİK UYARISI

## Token Paylaşıldı!

GitHub Personal Access Token'ınız paylaşıldı. **Güvenlik için:**

### 1. Token'ı İptal Edin (ÖNEMLİ!)

1. **GitHub → Settings → Developer settings → Personal access tokens**
2. Token'ınızı bulun (`To-Do App` veya yazdığınız isim)
3. **Revoke** (İptal) butonuna tıklayın

### 2. Yeni Token Oluşturun

1. **Generate new token (classic)**
2. Yeni token oluşturun
3. **Bu sefer token'ı kimseyle paylaşmayın!**

### 3. Remote URL'i Güvenli Hale Getirdim

Token remote URL'den kaldırıldı. Artık güvenli.

---

## Gelecekte Token Kullanımı

### Yöntem 1: Git Credential Helper (Önerilen)

```bash
git config --global credential.helper store
git push -u origin main
# İlk seferde username ve token sorar, sonra hatırlar
```

### Yöntem 2: SSH Key (En Güvenli)

SSH key kullanın, token'a gerek kalmaz.

---

## Token Sızdırılırsa Ne Olur?

- Başkaları repository'nize erişebilir
- Kod değiştirebilir
- Repository'yi silebilir

**Bu yüzden token'ı mutlaka iptal edin!**

