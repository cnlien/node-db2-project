
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.integer('VIN').notNullable()
      tbl.integer('Year', 4).notNullable()
      tbl.text('Make', 128).notNullable()
      tbl.text('Model', 128).notNullable()
      tbl.integer('Mileage', 7).notNullable()
      tbl.text('transmissionType')
      tbl.text('titleStatus').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
