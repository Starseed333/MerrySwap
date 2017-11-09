console.log('inside postSwap.js');


var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var postSwap = sequelize.define('postSwap', {

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }
  }); 
    
      postSwap.associate = function(models) {

        var Products = this.sequelize.define('Products', {}),
          Users = this.sequelize.define('Users', {}),
          postSwap = this.sequelize.define('postSwap', {});

        postSwap.belongsToMany(Users, {through: 'SwapUser'});
        Users.belongsToMany(postSwap, {through: 'SwapUser'});

        postSwap.belongsToMany(Products, {through: 'SwapProduct'});
        Products.belongsToMany(postSwap, {through: 'SwapProduct'});

      }
  return postSwap;
};
