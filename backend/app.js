require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { handleError } = require('./middlewares/error-handling');
const { routes } = require('./routes');
const { PORT, MONGO_URL } = require('./config/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors);

app.use(express.json());

app.use(helmet());

mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT);
