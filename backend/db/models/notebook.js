'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  }, {});
  Notebook.associate = function (models) {
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId', as: 'notes' });
  };
  return Notebook;
};
