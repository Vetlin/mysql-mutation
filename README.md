# Mysql-Mutation

Hi!

It is **[Mysql-Mutation](https://www.npmjs.com/package/@vetlin/mysql-mutation)** !!!

Amazing npm module, to keep your database clean and tidy, and also help you and your colleagues interact flexibly and effectively

How to use it? Oooh, it is very simple :blush:

1. Go to your project folder and run `npm i @vetlin/mysql-mutation`.

2. Create a new file in your project, wherever you want

3. Write a little bit of code there
    ```javascript
    const Mutation = require('@vetlin/mysql-mutation');

    const m = new Mutation({options...});

    m.run();
    ```
4. Then you should create new npm script, something like this
    ```javascript
    ...
    "scripts": {
      "sql-mutation": "node {path to file with mutation}" // for example "node scripts/mutation/index.js"
    },
    ...
    ```
5. And the last step! You're almost there! Run `npm run sql-mutation` in your console
    Also, if you want to refresh your db (delete and create again) - run `npm run sql-mutation --clear=true`



So, a little bit of magic ... and ...

There you are:flushed:! You're database set up is finished. That was amazing:heart_eyes:!

## Options...
And know some options description

1. Connection params
    ```javascript
    let options = {
       user: 'root', // username to access your db
       password: '123456', // password to access your db
       host: 'localhost', // your db host
       name: 'app' // name of the database
    }
    ```

2. Tables
    To describe tables in your db, you should add new key in your options object - `tables`. Not at all obvious...
    ```javascript
       ...
       tables: {

       }
       ...
    ```
    
    Then you should path your tables in this object, more precisely the names of your tables
    ```javascript
       ...
       tables: {
           users: {},
           books: {},
           // and so on...
       }
       ...
    ```

3. Table description
    In your table object you can pass several options.
         - rows
         - engine
         - charset
    It will look something like this
    ```javascript
       ...
       users: {
           rows: {},
           engine: 'InnoDB', // or something else
           charset: 'utf8', // same
       }
       ...
    ```
    What is really cool, is what my module will set default values for you. So, if you use the 'InnoDB' as engine and 'utf8' as an charset, you can omit these parameters, they are substituted by default.

    Rows describing is very simple, you should pass the name of the row as key, and as key value pass the configuration. Something like this..
    ```javascript
       ...
       rows: {
           id: {},
           email: {},
           date: {},
       }
       ...
    ```

    To describe row, there is some options
        - type. Can be 'int', 'varchar' or 'timestamp'
        - length. Max length of the row
        - default. Default value
        - primary_key. If you want this row to be primary key, set this option as true
        - auto_increment. If you want this row to be auto increment - set this
    
    Some example
    ```javascript
       ...
       rows: {
            id: {type: 'int', length: 11, primary_key: true, auto_increment: 'id'},
            name: {type: 'varchar', length: 256},
            email: {type: 'varchar', length: 256},
            date: {type: 'timestamp', length: '', default: 'CURRENT_TIMESTAMP'},
       }
       ...
    ```

4. Autofill
    It is another super very cool feature of my module. You can pass data, and it will add this data to the table
    I think some example will be enougth
    ```javascript
        ...
        host: 'localhost',
        tables: {},
        autofill: {
            ...
            users: [
                {name: 'John Doe', email: 'john.doe@gmail.com'},
                {name: 'Jane Doe', email: 'jane.doe@gmail.com'},
            ],
            ...
        }
        ...
    ```

P.S. See, I know that my module is very week for now. But I will improve it, day after day.

Respectfully `Vetlin`