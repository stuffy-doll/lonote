'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      {
        userId: 1,
        notebookId: 1,
        title: 'DEMO TIME',
        content: 'Let\'s get this bread.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        notebookId: 1,
        title: 'Demo note',
        content: 'Hey everybody, it\'s me, a demo note.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
