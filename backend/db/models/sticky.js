'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sticky = sequelize.define('Sticky', {
    notebookId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Sticky.associate = function (models) {
    Sticky.belongsTo(models.Notebook, { foreignKey: 'notebookId' })
  };
  return Sticky;
};
