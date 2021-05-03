const experess = require('express');
const router = experess.Router();
const userController = require('../controllers/userController');

router.get('/', userController.view);
router.post('/', userController.find);

router.get('/adduser', userController.adduser);
router.post('/adduser', userController.createUser);

router.get('/addbot', userController.addbot);
router.post('/addbot', userController.createBot);

router.get('/edituser/:id', userController.edituser);
router.post('/edituser/:id', userController.updateuser);

router.get('/editbot/:id', userController.editbot);
router.post('/editbot/:id', userController.updatebot);

router.get('/viewuser/:id', userController.viewuser);
router.get('/viewbot/:id', userController.viewbot);

module.exports = router;