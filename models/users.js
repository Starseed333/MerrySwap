console.log('inside users.js');



module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
      
    }
  }); 
   
      Users.associate = function(models) {
        // associations defined here
      }
  return Users;
};
