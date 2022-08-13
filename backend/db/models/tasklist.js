'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define('TaskList', {
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  TaskList.associate = function (models) {
    TaskList.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
    TaskList.hasMany(models.Task, { foreignKey: 'tasklistId', as: 'tasks' });
  };
  return TaskList;
};
