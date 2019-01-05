
export default (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING
  });

  return User;
};