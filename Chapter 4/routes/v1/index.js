const router = require('express').Router();

const userController = require('../../controllers/v1/userController');
router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);

const accountController = require('../../controllers/v1/accountController');
router.post('/account', accountController.createAccount);
router.get('/accounts', accountController.getAccounts);
router.get('/account/:id', accountController.getAccount);

const transactionController = require('../../controllers/v1/transactionController');
router.post('/transaction', transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/transaction/:id', transactionController.getTransaction);

module.exports = router;