# 📋 Hosting Bilgisi Toplama

Deployment için aşağıdaki bilgilere ihtiyacımız var:

## Hosting Sağlayıcınız Hakkında

1. **Hosting Türü:**
   - [ ] Shared Hosting (cPanel, Plesk)
   - [ ] VPS (Virtual Private Server)
   - [ ] Cloud Hosting (AWS, Google Cloud, Azure)
   - [ ] Managed Hosting (WordPress, vb.)

2. **Kontrol Paneli:**
   - [ ] cPanel
   - [ ] Plesk
   - [ ] Custom Panel
   - [ ] SSH/Terminal erişimi

3. **Node.js Desteği:**
   - [ ] Evet, Node.js kurulu
   - [ ] Hayır, sadece PHP/Static
   - [ ] Bilmiyorum

4. **SSH Erişimi:**
   - [ ] Var
   - [ ] Yok
   - [ ] Bilmiyorum

## Kontrol Etmeniz Gerekenler

### cPanel'de:
1. **Software** → **Node.js Selector** var mı?
2. **Advanced** → **Terminal** veya **SSH Access** var mı?
3. **Files** → **File Manager** ile dosya yükleyebiliyor musunuz?

### Hosting Sağlayıcınızla İletişim:
Şu soruları sorun:
- "Node.js uygulaması çalıştırabilir miyim?"
- "SSH erişimim var mı?"
- "Hangi portları kullanabilirim?"
- "Process manager (PM2) kurabilir miyim?"

## Hızlı Test

Hosting'inize SSH ile bağlanıp şunu çalıştırın:

```bash
node --version
npm --version
```

Eğer sonuç alırsanız → **Node.js destekliyor, deploy edebilirsiniz!**
Eğer "command not found" alırsanız → **Node.js yok, alternatif çözüm gerekli**


