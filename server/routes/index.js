const express = require('express');
const router = express.Router();

// Controllers
const UserController = require('../controllers/UserController');
const CarController = require('../controllers/CarController');
const FormController = require('../controllers/FormController');

// Middleware
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');
const adminOnlyMiddleware = require('../middlewares/adminOnly');

// API
const upload = require('../helpers/upload');

// Public routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/google', UserController.googleLogin);

// Protected routes can be added here
router.use(authentication)

// Cars lists and details
router.get('/cars', CarController.listCars);
router.get('/cars/:id/insights', CarController.insightsCars);
router.get('/cars/:id', CarController.getCarDetails);

// User profile
router.get('/profile', UserController.profile);
router.put('/profile', UserController.updateProfile);
router.patch('/profile/image-profile', upload.single('imageProfile'), UserController.updateImageProfile);
router.get('/my-forms', FormController.listUserForms);

// Forms
router.post('/forms/create', FormController.createForm);

// Untuk admin
router.get('/my-forms', FormController.listForms);

router.use(errorHandler)


module.exports = router;