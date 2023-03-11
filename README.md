To run you will need the .env.yaml.


.env.yaml example: 
``` 
module.exports = {
  DATABASE: {
    host: 'databasehost',
    user: 'databaseuser',
    password: 'databasepassword',
    database: 'databasename'
  },
  GOOGLE: {
    clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    redirectUrl: 'http://127.0.0.1:3000/auth',
  },
  APP:{
    secret: 'secretworld'
  }
};
```
