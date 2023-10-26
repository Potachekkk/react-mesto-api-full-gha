const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFound = require('../errors/notFound');
const NotOwner = require('../errors/notOwner');
const BadRequest = require('../errors/badRequest');

const { OK_STATUS, OK_CREATED_STATUS } = require('../config/config');

module.exports.getCards = (_, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(OK_STATUS).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CREATED_STATUS).send(card))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(e);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(ownerId)) {
        throw new NotOwner('Невозможно удалить чужую карточку');
      } else {
        return Card.deleteOne(card)
          .then(() => {
            res.status(OK_STATUS).send(card);
          })
          .catch(next);
      }
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные о карточке'));
      } else {
        next(e);
      }
    });
};

const updateCard = (req, res, next, method) => {
  const { params: { cardId } } = req;
  Card.findByIdAndUpdate(cardId, { [method]: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFound('Нет карточки по заданному id'))
    .then((card) => {
      res.send(card);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные о карточке'));
      } else {
        next(e);
      }
    });
};

module.exports.likeCard = (req, res, next) => updateCard(req, res, next, '$addToSet');

module.exports.dislikeCard = (req, res, next) => updateCard(req, res, next, '$pull');
