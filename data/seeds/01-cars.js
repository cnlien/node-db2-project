
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
