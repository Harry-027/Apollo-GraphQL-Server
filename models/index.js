import Sequelize from 'sequelize';

const sequelize = new Sequelize('test_graphql', 'test_user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {
  User: sequelize.import('./user'),
  Board: sequelize.import('./board'),
  Suggestion: sequelize.import('./suggestion')
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
