'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Notebooks'
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'notey\s Default Notebook',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Notebooks'
    return queryInterface.bulkDelete(options);
  }
};
