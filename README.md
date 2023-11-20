## Movies APIs Nest JS

Created using Nest JS, MySql & Prisma

## Features

Login, Signup or Change Password
Categories list (from seed data like Action, Horror, Comedy, and animated)
Movies list with category (create movies from seed data)
Update User Profile (name, address, image, DOB, categories (1 or many))
Users give ratings to movies (From 1 to 5)
List Recommended movies (against the login user)

## Features

- Login, Signup or Change Password
- Categories list (from seed data like Action, Horror, Comedy, and animated)
- Movies list with category (create movies from seed data)
- Update User Profile (name, address, image, DOB, categories (1 or many))
- Users give ratings to movies (From 1 to 5)
- List Recommended movies (against the login user)

## Run Locally

After cloning your project open it in vs code and run the
following Commands

#### Install required dependencies

```bash
  yarn install
```

#### Start a mysql database with docker

###### (if you have local mysql, then just create a database named movieProject and update DATABASE_URL in .env )

```bash
  docker-compose up -d
```

#### generate Prisma client

```bash
  npx prisma generate
```

#### migrate

```bash
  npx prisma migrate dev --name init
```

#### seed database

```bash
  npx prisma db seed
```

#### start server

```bash
  yarn start
```

#### Server will be started at

```bash
 http://localhost:3000
```

Here's a link to my Postman collection:

[Postman Collection](./NestJSDemo.postman_collection.json)
