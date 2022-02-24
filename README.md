# Login-System

## Initial Configuration
With NPM, execute: npm install in 3 folders: In the server folder ("LoginSystem/LoginSystem"), in the front folder ("LoginSystem/login-system-front").

After this, set a .env file on the /server folder. It must have the following attributes:
```env
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
HASH_DRIVER=bcrypt
```
The rest is customizable:
```env
CACHE_VIEWS=
APP_KEY=
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=s
```
## Starting the System
First, migrate the databases using Adonis, then run the server:
```shell
cd {yourPath}/LoginSystem
adonis migration:run
adonis serve --dev
```
Then run the client side of the application:
```shell
cd {yourPath}/login-system-front
npm start
```
The system is ready to use.
