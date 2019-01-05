
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING
  });

  User.associate = (models) => {
    // 1 to many
    User.hasMany(models.Board, {
      foreignKey: 'owner'
    });
    // 1 to many
    User.hasMany(models.Suggestion, {
      foreignKey: 'creatorId'
    });
  }
  return User;
};