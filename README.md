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



So, a little bit of magic ... and ...

There you are:flushed:! You're database set up is finished. That was amazing:heart_eyes:!
