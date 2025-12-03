# 🔧 Internal Server Error - Adım Adım Çözüm

## Sorun Tespiti

Internal server error genellikle şu nedenlerden olur:
1. ❌ Supabase'de tablolar oluşturulmamış
2. ❌ Veritabanı bağlantısı çalışmıyor
3. ❌ Migration'lar çalışmamış

---

## Adım 1: Vercel Loglarını Kontrol Edin

1. **Vercel Dashboard** → Projenize gidin
2. **Deployments** sekmesine tıklayın
3. En son deployment'a tıklayın
4. **Logs** sekmesine gidin
5. Hata mesajını okuyun

**Hangi hata görünüyor?** Paylaşın, ona göre çözüm bulalım.

---

## Adım 2: Supabase Tablolarını Kontrol Edin

### Supabase'de Tablolar Var mı?

1. **Supabase Dashboard** → Projenize gidin
2. Sol menüden **Table Editor** sekmesine tıklayın
3. Şu tablolar görünüyor mu?
   - ✅ User
   - ✅ Board
   - ✅ Group
   - ✅ Task
   - ✅ Subtask
   - ✅ Comment

### Eğer Tablolar Yoksa:

**SQL Editor'de şu SQL'i çalıştırın:**

1. **SQL Editor** sekmesine gidin
2. **New query** oluşturun
3. Aşağıdaki SQL'i yapıştırın (tamamını):

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

4. **Run** butonuna tıklayın
5. ✅ **Success!** mesajını görmelisiniz

---

## Adım 3: Vercel Environment Variables Kontrolü

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Şu variable'lar var mı kontrol edin:
   - ✅ `DATABASE_URL` - Supabase connection string
   - ✅ `JWT_SECRET` - Güvenli bir değer
3. Her ikisinin de **Production, Preview, Development** environment'larında olduğundan emin olun

---

## Adım 4: Test

1. **Vercel'deki sitenize** gidin
2. **Register** sayfasına gidin
3. Yeni kullanıcı oluşturun:
   - Email: `test@test.com`
   - Şifre: `test123`
   - İsim: `Test User`
4. Başarılı olursa → ✅ Tablolar çalışıyor!
5. Hata alırsanız → Vercel loglarını kontrol edin

---

## Hızlı Kontrol Listesi

- [ ] Supabase'de tablolar oluşturuldu mu? (Table Editor'de kontrol)
- [ ] Vercel'de `DATABASE_URL` variable'ı var mı?
- [ ] `DATABASE_URL` Production environment'ında mı?
- [ ] Vercel loglarında hangi hata var?
- [ ] Supabase connection string doğru mu?

---

## En Olası Sorun

**Tablolar oluşturulmamış!** 

Supabase SQL Editor'de yukarıdaki SQL'i çalıştırın. Bu en yaygın sorundur.

---

## Yardım

**Vercel loglarında hangi hata görünüyor?** Paylaşın, ona göre çözüm bulalım.

**Supabase'de tablolar var mı?** Table Editor'de kontrol edin.

