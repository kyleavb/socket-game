'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if(pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  user.prototype.validPassword = function(passwordTyped){
    return bcrypt.compareSync(passwordTyped, this.password)
  };

  user.prototype.toJSON = function(){
    var userData = this.get();
    delete userData.password;
    return userData
  };

  return user;
};