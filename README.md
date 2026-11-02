# 📋 Task Management REST API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![JWT](https://img.shields.io/badge/JWT-Secure_Auth-black.svg?logo=jsonwebtokens)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/)
[![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Kurumsal seviyede **Clean Architecture**, **JWT Authentication** ve **Task CRUD** operasyonlarını içeren modern, güvenli ve test edilebilir bir RESTful Backend servisidir.

NestJS modüler yapısı, Prisma ORM veri erişim katmanı ve otomatik Swagger/OpenAPI dokümantasyonu ile geliştirilmiştir.

---

## 🌟 Temel Özellikler

- 🔐 **Kimlik Doğrulama & Yetkilendirme (Auth):**
  - Güvenli parola hashleme (`bcrypt`).
  - JSON Web Token (JWT) tabanlı stateless oturum yönetimi.
  - `Passport-JWT` stratejisi ve `@UseGuards(AuthGuard('jwt'))` ile korunan endpoint'ler.
- 📝 **Görev Yönetimi (Task CRUD):**
  - Kullanıcıya özel görev oluşturma, listeleme, güncelleme ve silme.
  - Bir kullanıcının yalnızca kendi görevlerini yönetebilmesini sağlayan veri izolasyonu.
- 🛡️ **Validasyon & Veri Doğrulama:**
  - `class-validator` ve `class-transformer` ile Global Validation Pipe desteği.
  - Tip güvenli Request DTO (Data Transfer Object) kontrolleri.
- 📖 **Otomatik API Dokümantasyonu (Swagger):**
  - `/api` adresinde etkileşimli Swagger UI.
  - Bearer Token kilitleme desteğiyle test edilebilir dokümantasyon.
- 🗄️ **Prisma ORM & Veritabanı:**
  - Deklaratif şema yönetimi (`schema.prisma`).
  - Hızlı prototipleme ve test için SQLite (PostgreSQL / MySQL'e tek satırda geçilebilir).
- 🧪 **Unit Testleri:**
  - Controller ve Service katmanları için Jest test dosyaları (`*.spec.ts`).

---

## 🏗️ Veritabanı Şeması (ER Modeli)

```mermaid
erDiagram
    User ||--o{ Task : "owns"
    User {
        int id PK
        string email UK
        string password
        datetime createdAt
    }
    Task {
        int id PK
        string title
        string description
        string status
        int userId FK
        datetime createdAt
        datetime updatedAt
    }
```

---

## 📡 API Endpoint Referansı

### Kimlik Doğrulama (Auth)
| Metot | Endpoint | Açıklama | Kimlik Doğrulama |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Yeni kullanıcı kaydı oluşturur | Herkese Açık |
| `POST` | `/auth/login` | Giriş yapar ve JWT Token döner | Herkese Açık |

### Görev Yönetimi (Tasks)
| Metot | Endpoint | Açıklama | Kimlik Doğrulama |
| :--- | :--- | :--- | :--- |
| `POST` | `/task` | Yeni bir görev oluşturur | 🔒 Bearer Token |
| `GET` | `/tasks` | Giriş yapmış kullanıcının görevlerini listeler | 🔒 Bearer Token |
| `GET` | `/tasks/:id` | Belirli bir görevin detayını getirir | 🔒 Bearer Token |
| `PUT` | `/tasks/:id` | Görevi günceller (başlık, açıklama, durum) | 🔒 Bearer Token |
| `DELETE` | `/tasks/:id` | Görevi siler | 🔒 Bearer Token |

---

## 🚀 Kurulum ve Çalıştırma

### 1. Gereksinimler
* Node.js (v18 veya üzeri)
* npm veya yarn / pnpm

### 2. Kurulum
```bash
# Repoyu klonlayın
git clone https://github.com/siladgn/task-api.git
cd task-api

# Bağımlılıkları yükleyin
npm install
```

### 3. Ortam Değişkenleri
`.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```

### 4. Veritabanını Hazırlama
Prisma şemasını veritabanına senkronize edin ve istemciyi oluşturun:
```bash
npx prisma db push
npx prisma generate
```

### 5. Sunucuyu Başlatma
```bash
# Geliştirici modunda çalıştırma (Hot reload)
npm run start:dev

# Prodüksiyon derlemesi
npm run build
npm run start:prod
```
Sunucu varsayılan olarak `http://localhost:3000` portunda çalışacaktır.

### 6. Swagger Dokümantasyonu
Tarayıcınızdan aşağıdaki adresi açarak tüm API'yi canlı olarak deneyebilirsiniz:
👉 **`http://localhost:3000/api`**

---

## 🧪 Testlerin Çalıştırılması

```bash
# Birim (Unit) testleri çalıştırma
npm run test

# Test coverage raporu alma
npm run test:cov
```

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) kapsamında açık kaynak olarak sunulmuştur.
