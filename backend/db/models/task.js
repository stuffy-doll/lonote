'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    tasklistId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    isComplete: DataTypes.BOOLEAN
  }, {});
  Task.associate = function (models) {
    Task.belongsTo(models.TaskList, { foreignKey: 'tasklistId' });
  };
  return Task;
};
