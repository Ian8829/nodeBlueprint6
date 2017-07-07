'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        // associations can be defined here
        User.hasMany(models.band);
      }
    }
  });
  return User;
};