'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
    return queryInterface.bulkDelete('TaskLists', null, {});
  }
};
