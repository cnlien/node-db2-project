## Setting Migrations
1. 
    ```
    knex init
    ```
    This creates a knexfile.js. This file includes 3 different configured object.
    - `Development`
    - `Staging`
    - `Production`.
    
    In this project we deleted the `Staging` and `Production` objects from the file since we're only working in the `Development` environment.
    
    Inside of the object we have the `client` key which is the driver we'll be using. Depending on what DBMS the driver might be different. We'll be using `sqlite3` library.

    The `connectiong` object in the file will point to the database inside of the file system that we're using. 

2. Add in `useNullAsDefault: true` to the `knexfile.js` config file.

3. Create a migration using the command line
    ```
    knex migrate:make [name-of-migration]
    ```
    ```
    knex migrate:make create-users-table
    ```
    This creates a directory called `migrations` and creates a file inside with a timestamp appended to the front. This is how knex keeps track of which migrations occur and when. This should _**not**_ be edited.

    We can customize where these files are created if we want to in side of the `knexfile.js` config file.

4. Inside of the migrations folder there are to functions. `exports.up` and `exports.down`.

    - `exports.up`: The change we want to make to our schema
        - create a table in the function that takes 2 arguments, the Table Name and a callback function that defines which columns and restraints.
        ```js
        return knex.schema.createTable('cars', tbl => {
            tbl.increments();
            tbl.number('VIN').notNullable()
            tbl.number('Year', 4).notNullable()
            tbl.text('Make', 128).notNullable()
            tbl.text('Model', 128).notNullable()
            tbl.number('Mileage', 7).notNullable()
            tbl.text('transmissionType')
            tbl.text('titleStatus').notNullable()
        });
        ```

    - `exports.down`: Undo the changes. This is essential to "drop" the table if we need to undo the changes for some reason. 
        - 
        ```js
        return knex.schema.dropTableIfExists('cars')
        ```

5. Create the database by using knex to run the latest migration.
    ```
    knex migrate:latest
    ```

6. If we ever decide that we want to undo the change to the database you can run:
    ```
    knex migrate:rollback
    ```



exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        {
          VIN: '123456AGJKIPG34U90JKHJKL',
          year: 2020,
          make: 'Ford',
          model: 'F150',
          mileage: 30456,
          transmissionType: '4 Wheel Drive',
          titleStatus: 'Clean' 
        },
      ]);
    });
};
