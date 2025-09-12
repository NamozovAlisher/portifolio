# 🚀 Alisher Namozovning Portfoliyo Saytini Internetga Joylash

## Umumiy Ma'lumot
Ushbu qo'llanma sizning full-stack portfoliyo saytingizni internetga joylashga yordam beradi:
- **Frontend**: Netlify (bepul hosting)
- **Backend**: Render (bepul tarif mavjud)

## Kerakli Hisoblar
1. GitHub hisobi
2. Netlify hisobi (bepul [netlify.com](https://netlify.com) saytida)
3. Render hisobi (bepul [render.com](https://render.com) saytida)
4. Telegram Bot Token (ixtiyoriy lekin tavsiya etiladi)

## 1-qadam: Backendni Tayyorlash

### 1.1 Backend Muhit O'zgaruvchilari
`backend/.env` faylini quyidagicha yangilang:

```
# Muhit Konfiguratsiyasi
NODE_ENV=production
PORT=5000

# JWT Konfiguratsiyasi
JWT_SECRET=sizning_xavfsiz_jwt_kalitingiz
JWT_EXPIRES_IN=7d

# Telegram Bot Konfiguratsiyasi (ixtiyoriy)
# Bot tokeningizni Telegramdagi @BotFather'dan oling
# TELEGRAM_BOT_TOKEN=sizning_telegram_bot_tokeningiz

# Xabarlar yuboriladigan Telegram chat ID
# TELEGRAM_CHAT_ID=sizning_telegram_chat_idingiz

# Ixtiyoriy: Bot foydalanuvchi nomi (@ belgisiz)
# TELEGRAM_BOT_USERNAME=bot_nomi
```

### 1.2 CORS Konfiguratsiyasini Yangilash
`backend/server.js` faylida CORS konfiguratsiyasini yangilang:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://sizning-netlify-domeningiz.netlify.app'],
  credentials: true
}));
```

(Siz frontendni Netlify'ga joylagandan keyin haqiqiy domen bilan almashtirasiz)

## 2-qadam: Backendni Render'ga Joylash

### 2.1 Render Hisobini Yaratish
1. [render.com](https://render.com) saytiga kiring va ro'yxatdan o'ting
2. GitHub hisobingizni ulang

### 2.2 Web Servis Yaratish
1. "New+" → "Web Service" tugmasini bosing
2. Portfoliyo repositoriyani ulang
3. Sozlamalarni belgilang:
   - **Name**: alisher-portfolio-backend (yoki boshqa nom)
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Muhit O'zgaruvchilarini qo'shing:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `JWT_SECRET` = `sizning_xavfsiz_jwt_kalitingiz`
   - `TELEGRAM_BOT_TOKEN` = `telegram_bot_tokeningiz` (agar foydalansangiz)
   - `TELEGRAM_CHAT_ID` = `telegram_chat_idingiz` (agar foydalansangiz)
5. "Create Web Service" tugmasini bosing
6. Joylash tugaguncha kuting (5-10 daqiqa)
7. Backend URL manzilingizni eslab qoling (masalan, `https://alisher-portfolio-backend.onrender.com`)

## 3-qadam: Frontendni Tayyorlash

### 3.1 Frontend Muhit O'zgaruvchilari
`frontend/.env` faylini yangilang:

```
# Backend API URL - Render backend URL manzilingiz bilan almashtiring
VITE_API_URL=https://sizning-backend-url.onrender.com/api

# Telegram Konfiguratsiyasi
VITE_TELEGRAM_BOT_USERNAME=sizning_bot_nomi
```

### 3.2 Portfoliyo Ma'lumotlarini Yangilash
Shaxsiy ma'lumotlaringizni yangilang:
- `frontend/src/components/About.jsx`
- `frontend/src/components/Hero.jsx`
- `README.md`

## 4-qadam: Frontendni Netlify'ga Joylash

### 4.1 Netlify CLI Yordamida (Tavsiya etiladi)

1. Netlify CLI ni global o'rnating:
```bash
npm install -g netlify-cli
```

2. Netlify'ga kiring:
```bash
netlify login
```

3. Loyihangizning ildiz katalogiga o'ting va joylang:
```bash
netlify deploy --prod
```

4. So'ralganda quyidagilarni kiriting:
   - Publish directory: `frontend/dist`
   - Build command: `npm run build`

### 4.2 Netlify Konsoli Orqali

1. [netlify.com](https://netlify.com) saytiga kiring va tizimga kiring
2. "New site from Git" tugmasini bosing
3. GitHub repositoriyani ulang
4. Joylash sozlamalarini belgilang:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Muhit O'zgaruvchilarini qo'shing:
   - `VITE_API_URL` = `https://sizning-backend-url.onrender.com/api`
   - `VITE_TELEGRAM_BOT_USERNAME` = `sizning_bot_nomi`
6. Saytni joylang

## 5-qadam: Yakuniy Sozlash

### 5.1 Backend CORS ni Yangilash
Netlify saytingiz joylangandan so'ng, backenddagi CORS konfiguratsiyasini yangilang:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sizning-netlify-domeningiz.netlify.app',
    'https://sizning-maxsus-domeningiz.com'  // Agar maxsus domen ishlatsangiz
  ],
  credentials: true
}));
```

So'ng backendni Render'da qayta joylang.

## 6-qadam: Sinovdan O'tkazish

1. Netlify URL manzilingizga kiring
2. Barcha funksiyalarni sinab ko'ring:
   - Bo'limlar orasida navigatsiya
   - Kontakt formasi
   - Autentifikatsiya (kirish/ro'yxatdan o'tish)
   - Loyihalar galereyasi
   - Telegram integratsiyasi (agar sozlangan bo'lsa)

## Tabriklaymiz! 🎉

Portfoliyo saytingiz endi internetda! Netlify URL manzilingizni do'stlaringiz, oila a'zolaringiz va kelajakdagi ish beruvchilaringiz bilan baham ko'ring.

Eslatma:
- Ilovalaringizni muntazam yangilab turing
- Har qanday muammolar uchun kuzatib boring
- Portfoliyoingizga yangi loyihalar qo'shishda davom eting