# User Authentication App

Bu proje, React.js frontend ve Node.js (Express) backend ile geliştirilmiş bir kullanıcı kimlik doğrulama (authentication) uygulamasıdır. Kullanıcılar giriş yapabilir, kayıt olabilir ve oturum açma bilgileri JWT ile korunur.

---

## Özellikler

- Kayıt Ol / Giriş Yap
- JWT tabanlı oturum yönetimi
- MongoDB veritabanı bağlantısı
- Bcrypt ile parola şifreleme
- Private Route koruması

---

## Kurulum

### 1. Ana klasöre gel:

```bash
git clone https://github.com/kullaniciAdi/proje-adi.git
cd proje-adi
```

---

## Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend Vite ile yapılandırılmıştır. Çalışma adresi genellikle:  
http://localhost:5173

---

## Backend Kurulumu

```bash
cd backend
npm install
```

### .env dosyası oluştur:

`backend` klasörüne aşağıdaki içeriğe sahip `.env` dosyasını oluştur:

```env
PORT=5000
MONGO_URI=mongodb+srv://<kullanici>:<sifre>@cluster.mongodb.net/<veritabani>?retryWrites=true&w=majority
JWT_SECRET=seninGizliAnahtarın
```

> `MONGO_URI` ve `JWT_SECRET` bilgilerini kendi ortamına göre doldur.

### Sunucuyu başlat:

```bash
npm run dev
```

Başarılı çalıştığında:

```bash
server is running on [PORT DEĞERİN]
Database bağlantısı tamamlandı
```

---

## API Endpointleri

| Yöntem | URL                 | Açıklama          |
|--------|---------------------|-------------------|
| POST   | /api/auth/register  | Kullanıcı kaydı   |
| POST   | /api/auth/login     | Kullanıcı girişi  |
| POST   | /api/auth/logout    | Kullanıcı Çıkışı  |
| GET    | /api/auth/checkauth | Token kontrolü    |

---

## Kullanılan Teknolojiler

- React.js
- Vite
- Tailwind CSS
- Zustand
- Axios
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js

---

## Geliştirme

Proje hem frontend hem backend klasörlerinde geliştirme ortamı olarak yapılandırılmıştır.  
Değişiklikleri yaparken her klasörde bağımsız olarak çalışabilirsin.

