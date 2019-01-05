
export default (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
      name: DataTypes.STRING
    });
  
    Board.associate = (models) => {
      // 1 to many
      Board.hasMany(models.Suggestion, {
        foreignKey: 'boardId'
      });
    }
    return Board;
  };