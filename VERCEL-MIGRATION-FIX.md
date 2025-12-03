# 🔧 Vercel Migration Sorunu Çözümü

## Sorun: Internal Server Error

DATABASE_URL eklendi ama hala hata alıyorsunuz. Muhtemelen **migration'lar çalışmamış**.

## Çözüm: Migration'ları Çalıştırma

### Yöntem 1: Supabase Dashboard'dan (Hızlı)

1. **Supabase Dashboard** → Projenize gidin
2. **SQL Editor** sekmesine gidin
3. **New query** oluşturun
4. Aşağıdaki SQL'i çalıştırın (Prisma schema'dan):

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
    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Group table
CREATE TABLE IF NOT EXISTS "Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "boardId" TEXT NOT NULL,
    FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Subtask table
CREATE TABLE IF NOT EXISTS "Subtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "taskId" TEXT NOT NULL,
    FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Comment table
CREATE TABLE IF NOT EXISTS "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
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

5. **Run** butonuna tıklayın
6. ✅ Tablolar oluşturuldu!

### Yöntem 2: Prisma Migrate (Yerel)

Yerel bilgisayarınızda:

```bash
cd "/home/mindsight/To-Do App"

# .env dosyası oluştur
echo 'DATABASE_URL="postgres://postgres.zsikfuznhpnghiimkloo:1J50K8P4fvCOHBCh@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"' > .env

# Migration oluştur
npx prisma migrate dev --name init

# Veya direkt push
npx prisma db push
```

Sonra GitHub'a push edin.

### Yöntem 3: Vercel Build Hook (Otomatik)

Vercel build sırasında migration çalışması için `package.json` zaten doğru. Ama migration dosyaları yoksa çalışmaz.

---

## Hızlı Çözüm: Supabase SQL Editor

**En hızlı yol:** Yukarıdaki SQL'i Supabase SQL Editor'de çalıştırın. 2 dakika sürer!

---

## Kontrol

1. **Supabase Dashboard** → **Table Editor**
2. Tablolar görünüyor mu kontrol edin:
   - User
   - Board
   - Group
   - Task
   - Subtask
   - Comment

---

## Sonraki Adım

Tablolar oluşturulduktan sonra:
1. Vercel'de **Redeploy** yapın
2. Veya yeni commit push edin

Internal server error çözülecek! ✅

