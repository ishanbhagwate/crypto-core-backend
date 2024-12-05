# 🚀 CryptoCore Backend

Welcome to the **CryptoCore Backend**! This Node.js and Express.js API powers the **CryptoCore** app by providing real-time cryptocurrency data, user authentication with JWT, and secure database interactions.

---

## 📦 **Features**

### 🔐 **Authentication & Authorization**
- **JWT-based authentication** for secure user login and registration.
- Middleware to protect routes and manage user sessions.

### 📊 **Real-time Market Data**
- Fetches real-time cryptocurrency prices, market trends, and stats from public APIs.
- Efficient data caching to optimize performance.

### 📰 **Crypto News API**
- Aggregates news articles from various trusted crypto sources.
- Filters and sorts news based on relevance.

### 🛠️ **User Management**
- User registration and login functionality.
- Profile management and watchlist support.

---

## 🛠️ **Technologies Used**
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building RESTful APIs.
- **JWT**: JSON Web Tokens for secure authentication.
- **PostgreSQL**: Database for structured data management.
- **Prisma**: ORM for database interactions.
- **Zod**: Schema validation for API requests and responses.

---

## 📂 **Project Structure**

```
crypto-core-backend/
│
├── src/
│   ├── config/             # Config files
│   ├── controllers/        # Route logic (auth, crypto data, news)
│   ├── cron/               # Cron jobs
│   ├── models/             # Database models (Prisma schema)
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth and error-handling middleware
│   ├── validations/        # Helper functions (validation, formatting)
│   └── app.js              # Server entry point
│
├── .env                    # Environment variables
├── prisma/                 # Prisma schema
├── package.json            # Project dependencies
├── tsconfig.json           # Typescript config
└── README.md               # You're here!
```

---

## 🚀 **Getting Started**

### Prerequisites
- **Node.js**: [Install Node.js](https://nodejs.org/)
- **PostgreSQL**: [Install PostgreSQL](https://www.postgresql.org/download/)
- **Prisma CLI**: [Install Prisma](https://www.prisma.io/docs/getting-started)

### Setup Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ishanbhagwate/crypto-core-backend.git
   cd crypto-core-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```bash
     DATABASE_URL=your_postgres_url
     JWT_SECRET=your_jwt_secret
     API_KEY=your_crypto_api_key
     ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

---

## 🛠️ **Contributing**

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 **Contact**

For any questions or feedback:
- **Email**: [ishanbhagwate29@gmail.com](mailto:ishanbhagwate29@gmail.com)
- **LinkedIn**: [Ishan Bhagwate](https://www.linkedin.com/in/ishanbhagwate/)

---

### 🌟 **Show your support!**
If you like this project, don't forget to give it a ⭐️!

---
