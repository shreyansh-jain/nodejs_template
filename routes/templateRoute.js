const express = require("express");
const router = express.Router();
const controller = require('../controllers/templateController');
const validateToken = require('../middleware/validateUser').validateToken;
const logoutToken = require('../middleware/logoutUser').logoutToken;

// Validator: Express
const { body } = require('express-validator');

router.route('/').get(validateToken, controller.list);

router.route('/:id').get(validateToken, controller.view);

router.route('/:id').put(validateToken, controller.update);

router.route('/').post(validateToken, controller.create);

router.route('/:id').delete(validateToken, controller.delete);

// Delete a Product
// router.route('/test').post(validateToken, [
//     // username must be an email
//     body('username').isEmail(),
//     // password must be at least 5 chars long
//     body('password').isLength({ min: 5 })
//   ], controller.update_product_categories);

module.exports = router;
