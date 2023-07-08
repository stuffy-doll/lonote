'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Tasks'
    return queryInterface.bulkInsert(options, [
      {
        tasklistId: 1,
        title: 'Render this!',
        content: 'Celebrate when rendered!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Tasks'
    return queryInterface.bulkDelete(options);
  }
};
