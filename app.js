const express = require('express');
const app = express();

const nunjucks = require('nunjucks');
nunjucks.configure('views');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const db = require('./db').db;
const Question = require('./db').Question;

app.get('/', (req, res) => res.redirect('/questions'));

app.get('/questions', (req, res, next) => {
  const options = {};
  if (req.query.importance) {
    options.where = { importance: +req.query.importance };
  }
  Question.findAll(options)
  .then(questions => res.render('index', { questions }))
  .catch(next);
});

app.get('/new-question', (req, res) => res.render('new-question'));

app.post('/questions', (req, res, next) => {
  Question.create(req.body)
  .then(res.redirect('/'))
  .catch(next);
});

db.sync().then(() => app.listen(3000, () => console.log('server awaiting requests on port 3000')));

