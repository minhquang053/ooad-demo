const express = require('express');
const {
  httpGetAllUsers,
  httpGetUserById,
  httpAddNewUser,
  httpDeleteUserById,
  httpEditUser,
} = require('./users.controller');

const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUserById);
usersRouter.post('/', httpAddNewUser);
usersRouter.patch('/:id', httpEditUser);
usersRouter.delete('/:id', httpDeleteUserById);

module.exports = usersRouter;
