
export default (sequelize, DataTypes) => {
    const Suggestion = sequelize.define('Suggestion', {
      text: DataTypes.STRING
    });
  
    Suggestion.associate = (models) => {
      // 1 to many
      Suggestion.hasMany(models.Suggestion, {
        foreignKey: 'boardId'
      });
    }
    return Suggestion;
  };