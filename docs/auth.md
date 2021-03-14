# Authentication

SoloBeer API is secured with a Bearer Token.

- The token is a [jsonwebtoken](https://jwt.io/).
- Users are stored in the Client table.
- The user's password is saved using the SHA512 hash function and with the addition of a salt, defined only for this user, with 100 000 iterations. All of this is done with the pbkdf2Sync function of the NodeJS [Crypto library](https://nodejs.org/api/crypto.html)
- Pseudo must be unique.

Function that generates the user's salt and hashed password

```js
const salt = crypto.randomBytes(32);
const hash = crypto.pbkdf2Sync(password, salt, 100000, 128, 'sha512');
```

## Get Token

The POST method from the login route will handle the authentication process. Send the pseudo and the password in the body of your request. If your user is valid and exists in the database, the token is returned in the response.
If there is a problem, an error will be returned. (See [login route](/routes/#login-user))

## Use Token

To access secured routes, the Bearer token must be set in the Authorization header.
