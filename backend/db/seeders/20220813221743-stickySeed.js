'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Stickies';
    return queryInterface.bulkInsert(options, [
      {
        notebookId: 1,
        content: 'Nothing here...',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Stickies';
    return queryInterface.bulkDelete(options);
  }
};
