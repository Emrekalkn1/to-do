# 🔐 Unauthorized Hatası Çözümü

## Sorun

"Unauthorized" hatası alıyorsunuz. Bu genellikle şu nedenlerden olur:
1. ❌ Henüz giriş yapılmamış (token yok)
2. ❌ Token geçersiz veya süresi dolmuş
3. ❌ Veritabanında kullanıcı yok

---

## Çözüm: Yeni Kullanıcı Oluşturun

### Adım 1: Register Sayfasına Gidin

1. Vercel'deki sitenize gidin
2. URL'nin sonuna `/register` ekleyin:
   ```
   https://yourdomain.vercel.app/register
   ```
   Veya login sayfasından "Kayıt Olun" linkine tıklayın

### Adım 2: Yeni Hesap Oluşturun

Formu doldurun:
- **Ad Soyad:** `Admin User` (veya istediğiniz isim)
- **E-posta:** `admin@admin.com` (veya istediğiniz email)
- **Şifre:** `admin123` (veya istediğiniz şifre)

**Kayıt Ol** butonuna tıklayın.

### Adım 3: İlk Kullanıcı Otomatik Admin Olur

Kodda ilk kullanıcı otomatik olarak **ADMIN** rolü alır:
```typescript
const userCount = await db.user.count()
const role = userCount === 0 ? 'ADMIN' : 'USER'
```

---

## Alternatif: Login Yapın

Eğer zaten hesabınız varsa:

1. **Login** sayfasına gidin: `/login`
2. **Email** ve **Şifre** ile giriş yapın
3. Başarılı olursa otomatik olarak dashboard'a yönlendirilirsiniz

---

## Sorun Devam Ederse

### 1. Supabase'de Tablolar Var mı?

1. **Supabase Dashboard** → **Table Editor**
2. **User** tablosu görünüyor mu?
3. Yoksa SQL Editor'de tabloları oluşturun

### 2. Vercel Logları Kontrol

1. **Vercel Dashboard** → **Deployments** → **Logs**
2. Hangi hata görünüyor?

### 3. Cookie Sorunu

Tarayıcıda:
1. **Developer Tools** açın (F12)
2. **Application** → **Cookies**
3. `token` cookie'si var mı kontrol edin
4. Yoksa register/login yapın

---

## Hızlı Test

1. `/register` sayfasına gidin
2. Yeni hesap oluşturun
3. Otomatik olarak giriş yapılır
4. Dashboard'a yönlendirilirsiniz

---

## Önemli Notlar

- **Email formatı:** `ornek@email.com` (kullanıcı adı değil!)
- **İlk kullanıcı:** Otomatik ADMIN olur
- **Token:** Login sonrası cookie'de saklanır
- **Unauthorized:** Token yoksa veya geçersizse görünür

---

**Register sayfasından yeni hesap oluşturun, sorun çözülecek!** ✅

