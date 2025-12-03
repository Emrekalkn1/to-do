# ⚠️ ÖNEMLİ: Supabase'de Tablolar Oluşturulmalı!

## Sorun

Register'da da internal server error alıyorsunuz çünkü **Supabase'de tablolar oluşturulmamış!**

Register endpoint'i veritabanına yazmaya çalışıyor ama **User tablosu yok**, bu yüzden hata veriyor.

---

## ✅ ÇÖZÜM: Supabase SQL Editor'de Tabloları Oluşturun

### Adım 1: Supabase SQL Editor

1. **Supabase Dashboard** → Projenize gidin
2. Sol menüden **SQL Editor** sekmesine tıklayın
3. **New query** butonuna tıklayın

### Adım 2: SQL'i Çalıştırın

**Aşağıdaki SQL'in TAMAMINI** kopyalayıp SQL Editor'e yapıştırın:

```sql
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "Group_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Todo',
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,
    "ownerId" TEXT,
    CONSTRAINT "Task_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Subtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "taskId" TEXT NOT NULL,
    CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Board_ownerId_idx" ON "Board"("ownerId");
CREATE INDEX IF NOT EXISTS "Group_boardId_idx" ON "Group"("boardId");
CREATE INDEX IF NOT EXISTS "Task_groupId_idx" ON "Task"("groupId");
CREATE INDEX IF NOT EXISTS "Task_ownerId_idx" ON "Task"("ownerId");
CREATE INDEX IF NOT EXISTS "Subtask_taskId_idx" ON "Subtask"("taskId");
CREATE INDEX IF NOT EXISTS "Comment_taskId_idx" ON "Comment"("taskId");
CREATE INDEX IF NOT EXISTS "Comment_userId_idx" ON "Comment"("userId");
```

4. **Run** butonuna tıklayın (veya Ctrl+Enter)
5. ✅ **Success!** mesajını görmelisiniz

---

## Adım 3: Kontrol

1. **Supabase Dashboard** → **Table Editor** sekmesine gidin
2. Şu tablolar görünüyor mu?
   - ✅ **User** (EN ÖNEMLİSİ!)
   - ✅ Board
   - ✅ Group
   - ✅ Task
   - ✅ Subtask
   - ✅ Comment

---

## Adım 4: Test

1. **Vercel'deki sitenize** gidin
2. **Register** sayfasına gidin: `/register`
3. Yeni hesap oluşturun:
   - Email: `admin@admin.com`
   - Şifre: `admin123`
   - İsim: `Admin User`
4. ✅ **Başarılı olmalı!**

---

## ⚠️ ÖNEMLİ

**Tablolar olmadan uygulama çalışmaz!**

- Register → User tablosuna yazmaya çalışır → Tablo yok → Error
- Login → User tablosundan okumaya çalışır → Tablo yok → Error
- Her şey → Tablolar gerekli!

**SQL'i çalıştırmadan devam edemezsiniz!**

---

## Hızlı Kontrol

**Supabase → Table Editor → User tablosu var mı?**

- ✅ **Varsa:** Başka bir sorun var, Vercel loglarını kontrol edin
- ❌ **Yoksa:** Yukarıdaki SQL'i çalıştırın!

---

**SQL'i çalıştırdınız mı?** Sonucu paylaşın! 🚀

