# PWD 2-5

Source Code

## Social API

```bash

cd social-api
npm i

cp .env.example .env

npx prisma migrate dev --name "init"
npx prisma generate

npm run fresh
```
