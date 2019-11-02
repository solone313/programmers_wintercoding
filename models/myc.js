'use strict';
module.exports = (sequelize, DataTypes) => {
  const myc = sequelize.define('myc', {
    code: DataTypes.STRING,
    lecture: DataTypes.STRING,
    professor: DataTypes.STRING,
    location: DataTypes.STRING,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER,
    dayofweek: DataTypes.STRING
  }, {
    timestamps: false
  });
  myc.associate = function(models) {
    // associations can be defined here
  };
  return myc;
};