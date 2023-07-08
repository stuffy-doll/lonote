'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Notes';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        notebookId: 1,
        title: 'My demo note',
        content: 'Let\'s get this bread.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Notes'
    return queryInterface.bulkDelete(options);
  }
};
