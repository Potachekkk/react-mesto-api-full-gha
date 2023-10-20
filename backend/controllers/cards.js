const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFound = require('../errors/notFound');
const NotOwner = require('../errors/notOwner');
const BadRequest = require('../errors/badRequest');

const { OK_STATUS, OK_CREATED_STATUS } = require('../config/config');

module.exports.getCards = (_, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK_STATUS).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(OK_CREATED_STATUS).send({ data: card }))
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
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card.owner.equals(ownerId)) {
        throw new NotOwner('Невозможно удалить чужую карточку');
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.status(OK_STATUS).send({ data: card });
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

const updateCard = (req, res, next, newData) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      newData,
      { $addToSet: { likes: req.user._id } },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.status(OK_STATUS).send({ data: card });
      throw new NotFound('Данные по указанному id не найдены');
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные о карточке'));
      } else {
        next(e);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const addLike = { $addToSet: { likes: req.user._id } };
  return updateCard(req, res, next, { addLike });
};

module.exports.dislikeCard = (req, res, next) => {
  const removeLike = { $pull: { likes: req.user._id } };
  return updateCard(req, res, next, { removeLike });
};
