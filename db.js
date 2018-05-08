const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/studyguide', { logging: false });

const Question = db.define('question', {
  text: Sequelize.STRING,
  answer: Sequelize.TEXT,
  importance: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  }
});

module.exports = {
  db,
  Question
};
