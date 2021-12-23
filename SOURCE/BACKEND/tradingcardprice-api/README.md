# Tradingcard REST API

```javascript
PRODUCTION=false
PORT=3000
JWT_SECRET="YOUR-JTW-SECRET"
DB_PORT=27017
DB_DOMAIN="localhost"
DB_TABLE="tradingcardprice"
DB_USER="username"
DB_PASSWORD="password"
EBAY_CLIENTID="YOUR-EBAY-CLIENT-ID" // Your ebay client ID
EBAY_MODE="PRODUCTION" // SANDBOX or PRODUCTION
```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Format

Run `npm run format` to format the code with [Prettier](https://www.npmjs.com/package/prettier).
