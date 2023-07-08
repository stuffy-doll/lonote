'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'TaskLists';
    return queryInterface.bulkInsert('TaskLists', [
      {
        userId: 1,
        notebookId: 1,
        name: 'Notey\'s List',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'TaskLists';
    return queryInterface.bulkDelete(options);
  }
};
