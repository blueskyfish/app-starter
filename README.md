
![Blueskyfish - App Starter](docs/assets/logo/128x128.png)

# Blueskyfish - App Starter

> An application starter kit with <https://angular.io> and <https://docs.nestjs.com>.
>
> The project is managed with the <https://nx.dev>


## Require

| Tool                         | Version | Note                          |
|------------------------------|---------|-------------------------------|
| [nodejs](https://nodejs.org) | >= v16  | Use the LTS version of nodejs |

> An IDE editor like [VS Code](https://code.visualstudio.com/) or [Webstorm](https://www.jetbrains.com/webstorm/)


## Setup

* Clone the git repository from `https://github.com/blueskyfish/app-starter.git`
* Change into the project directory
* Install the node modules with `npm ci` or `npm i`

```shell
$ git clone https://github.com/blueskyfish/app-starter.git
$ cd app-starter
$ npm ci
```

### Adjust To-do-Liste

The project contains some **TODO**s for adjust the settings or labels

### Global Environment

The applications need some global environments on the developer machine:

**Crypto Settings**

* `APP_CRYPTO_PUBLIC_KEY`
* `APP_CRYPTO_PRIVATE_KEY`
* `APP_CRYPTO_DIGEST_SECRET`



## Configuration

| Name                  | Type     | Required         | Description                                                                                  |
|-----------------------|----------|------------------|----------------------------------------------------------------------------------------------|
| `http.host`           | string   | no (`localhost`) | The hostname for listening the http incomes                                                  |
| `http.port`           | number   | no (`19050`)     | The host port for listening the http incomes                                                 |
| `db.host`             | string   | no (`localhost`) | The hostname of the database server                                                          |
| `db.port`             | number   | no (`3306`)      | The port of the database server                                                              |
| `db.user`             | string   | yes              | User to access database.                                                                     |
| `db.database`         | string   | yes              | Default database to use when establishing the connection.                                    |
| `db.password`         | string   | yes              | The database user password                                                                   |
| `db.connectTimeout`   | number   | no (`10000`)     | Sets the connection timeout in milliseconds. Default `10000` (10 sec).                       |
| `db.acquireTimeout`   | number   | no (`10000`)     | Sets the connection timeout in milliseconds. Default `10000` (10 sec).                       |
| `db.debug`            | boolean  | no (`false`)     | This will print all incoming and outgoing packets on stdout. Default: `false`.               |
| `db.tables`           | TableMap | yes              | The table map between the generic table name and the real name                               |
| `crypto.publicKey`    | string   | yes              | The public key for the en- or decryption                                                     |
| `crypto.privateKey`   | string   | yes              | The private key for the en- or decryption                                                    |
| `crypto.digestSecret` | string   | yes              | The salt for the hashing an string                                                           |
| `auth.timeout`        | number   | no (`0`)         | The auth timeout before **renewal** the auth token (`0` not check renewal, > 0 is the hours. |
| `system.aboutPath`    | string   | yes              | The filename of the about json object.                                                       |
| `queue.host`          | string   | no (`127.0.0.1`) | The hostname of the redis server                                                             |
| `queue.port`          | number   | no (`6379`)      | The host port of the redis server                                                            |
|                       |          |                  |                                                                                              |


## Database

### SQL Statements

The sql statements are generic of the table name. The names are defines in the config file (*Database Section*).


```sql
SELECT *
FROM table(users)
WHERE email = {email}
```

* The real table name is looked up from the config of database (`table(users)` is found as **'`users`'**).
* The `{email}` is replaced as object attribute

```yaml
# Database Section
db:
  # ...
  tables:
    users: '`users`'
    userSecrets: '`user_secrets`'
    userPermissions: '`user_permissions`'
```


## Design and Layout

The frontend applications use the bootstrap css framework. The styles is defined in the directory `design`.

### Style include to Frontend

The angular frontend only needs to include in the whole styles and layout declarations of the **SCSS**.

**styles.scss**

```scss
@import '../design/styles';
```

> Note: The webstorm IDE include scss files and directory from the project `node_modules`. The directory `design` is in the project root folder.


## Licence

```
Copyright 2022 Blueskyfish

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Notes / Copyrights

* Icon from <a href="https://www.flaticon.com/de/kostenlose-icons/denke-mal-kreativ" title="denke mal kreativ Icons">Denke mal kreativ Icons erstellt von pojok d - Flaticon</a>

