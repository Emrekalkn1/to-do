# 🚀 Supabase Tabloları Oluşturma (2 Dakika)

## Internal Server Error Çözümü

Tablolar oluşturulmadığı için hata alıyorsunuz. Hızlı çözüm:

---

## Adım 1: Supabase SQL Editor'e Gidin

1. **Supabase Dashboard** → Projenize gidin
2. Sol menüden **SQL Editor** sekmesine tıklayın
3. **New query** butonuna tıklayın

---

## Adım 2: SQL'i Çalıştırın

Aşağıdaki SQL'i kopyalayıp SQL Editor'e yapıştırın:

```sql
-- User table
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

-- Board table
CREATE TABLE IF NOT EXISTS "Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Board_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Group table
CREATE TABLE IF NOT EXISTS "Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "boardId" TEXT NOT NULL,
    CONSTRAINT "Group_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Task table
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

-- Subtask table
CREATE TABLE IF NOT EXISTS "Subtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "taskId" TEXT NOT NULL,
    CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Comment table
CREATE TABLE IF NOT EXISTS "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Indexes
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
2. Şu tablolar görünüyor mu kontrol edin:
   - ✅ User
   - ✅ Board
   - ✅ Group
   - ✅ Task
   - ✅ Subtask
   - ✅ Comment

---

## Adım 4: Vercel'de Test

1. **Vercel Dashboard** → Projenizin URL'sine gidin
2. Uygulama çalışıyor mu kontrol edin
3. **Register** sayfasından yeni kullanıcı oluşturun

---

## Sorun Devam Ederse

### Vercel Logları Kontrol:
1. **Vercel Dashboard** → **Deployments**
2. En son deployment'a tıklayın
3. **Logs** sekmesine gidin
4. Hata mesajını kontrol edin

### Supabase Bağlantı Kontrolü:
1. **Supabase Dashboard** → **Settings** → **Database**
2. Connection string'in doğru olduğundan emin olun
3. Vercel'deki `DATABASE_URL` ile aynı mı kontrol edin

---

## Hızlı Test

SQL çalıştırdıktan sonra:
- ✅ Tablolar oluşturuldu
- ✅ Vercel'de uygulama çalışmalı
- ✅ Internal server error çözülmeli

**SQL'i çalıştırdınız mı?** Sonucu paylaşın! 🚀

