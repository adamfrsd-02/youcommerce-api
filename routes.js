const express = require('express'),
    router = express.Router(),
    userController = require('./controllers/userController'),
    checkToken = require('./middleware/checkToken')

router.get('/', (_, res) => res.status(200).json({
    'message': 'welcome back'
}))

router.post('/user/register', userController.register);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: Login user
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: logged in
 */
router.post('/user/login', userController.login);



router.post('/user/otp', checkToken, userController.verifyOtp );
router.get('/user/profile', checkToken, userController.getProfile);

router.put('/user/update', checkToken, userController.updateProfile);

module.exports = router;
