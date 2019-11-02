'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mycs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      lecture: {
        type: Sequelize.STRING
      },
      professor: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      start_time: {
        type: Sequelize.INTEGER
      },
      end_time: {
        type: Sequelize.INTEGER
      },
      dayofweek: {
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mycs');
  }
};