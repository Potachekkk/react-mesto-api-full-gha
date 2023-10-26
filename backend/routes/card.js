const cardRouter = require('express').Router();
const { validateCreateCard, validateId } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateId, deleteCard);
cardRouter.put('/:cardId/likes', validateId, likeCard);
cardRouter.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = { cardRouter };
