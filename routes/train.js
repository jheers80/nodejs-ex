var express = require('express');
var router = express.Router();

//Require Controller modules
var user_controller = require('../controllers/userController');
var location_controller = require('../controllers/locationController');
var storeStatus_controller = require('../controllers/storeStatusController');
var train_controller = require('../controllers/trainController');
var jobrole_controller = require('../controllers/jobroleController');
var training_instance_controller = require('../controllers/traininginstanceController');
var training_data_controller = require('../controllers/trainingdataController');

//Verify Tokens Module
var VerifyToken = require('../controllers/verifyToken');

//User Routes
//Get Training Home Page
router.get('/', train_controller.index)

//Get route for user login
router.get('/login', user_controller.user_login_get);

router.post('/login', user_controller.user_login_post);

router.get('/logout',user_controller.user_logout);

//GET request for creating a user, NOTE: Must come before routes to display USER using id
router.get('/user/create', user_controller.user_create_get);

//POST Request for create a user
router.post('/user/create', user_controller.user_create_post);

//GET request for deleting a user
router.get('/user/:id/delete', user_controller.user_delete_get);

//POST request for deleting a user
router.post('/user/:id/delete', user_controller.user_delete_post);

//GET request for updating a user
router.get('/user/:id/update', user_controller.user_update_get);

//POST request for updating a user
router.post('/user/:id/update', user_controller.user_update_post);

//Get request for one user
router.get('/user/:id', user_controller.user_detail);



//get request for list of all users
router.get('/users', user_controller.user_list);

//Location Routes
//GET Location Create NOTE: Must come before routes to display locaiton using id
router.get('/location/create', location_controller.location_create_get);

//POST request create user
router.post('/location/create', location_controller.location_create_post);

//GET Request to delete location
router.post('/location/:id/delete', location_controller.location_delete_get);

//Post request to delete location
router.get('/location/:id/delete', location_controller.location_delete_post);

//GET request to update location
router.get('/location/:id/update', location_controller.location_update_get);

//POST request to update location
router.post('/location/:id/update', location_controller.location_update_post);

//GET Request for one location
router.get('/location/:id', location_controller.location_detail);

//GET Request all locations list
router.get('/locations', location_controller.location_list);

//StoreStatus Routes
//GET Request to create a status
router.get('/storestatus/create', storeStatus_controller.status_create_get);

//POST request to create a status
router.post('/storestatus/create', storeStatus_controller.status_create_post);

//GET Request to delete status
router.post('/storestatus/:id/delete', storeStatus_controller.status_delete_get);

//Post request to delete status
router.get('/storestatus/:id/delete', storeStatus_controller.status_delete_post);

//GET request to update status
router.get('/storestatus/:id/update', storeStatus_controller.status_update_get);

//POST request to update status
router.post('/storestatus/:id/update', storeStatus_controller.status_update_post);

//GET Request for one status
router.get('/storestatus/:id', storeStatus_controller.status_detail);

//GET Request all statuses list
router.get('/storestatus', storeStatus_controller.status_list);

//Job Roles

//GET Request to create a job role
router.get('/jobrole/create', jobrole_controller.jobrole_create_get);

//POST Request to create a job role
router.post('/jobrole/create', jobrole_controller.jobrole_create_post);

//GET Request to delete a job role
router.get('/jobrole/:id/delete', jobrole_controller.jobrole_delete_get);

//POSt Request to delete a job role
router.post('/jobrole/:id/delete', jobrole_controller.jobrole_delete_post);

//GET request to update a job role
router.get('/jobrole/:id/update', jobrole_controller.jobrole_update_get);

//POSt request to update a job role
router.post('/jobrole/:id/update', jobrole_controller.jobrole_update_post);

//Get request for one job role
router.get('/jobrole/:id', jobrole_controller.jobrole_detail);

//GET Request to view all job roles
router.get('/jobroles', jobrole_controller.jobrole_list);

//Training Instance Routes
//GET request for creating a training_instance, NOTE: Must come before routes to display training instance using id

router.get('/traininginstance/create',VerifyToken, training_instance_controller.training_instance_create_get);

//POST Request for create a training_instance
router.post('/traininginstance/create', training_instance_controller.training_instance_create_post);

//GET Request to copy a training instance
router.get('/traininginstance/copy',training_instance_controller.copy_training_instance_get);

//POST Request to copy a training instance
router.post('/traininginstance/copy',training_instance_controller.copy_training_instance_post);

//GET request for deleting a training_instance
router.get('/traininginstance/:id/delete', training_instance_controller.training_instance_delete_get);

//POST request for deleting a training_instance
router.post('/traininginstance/:id/delete', training_instance_controller.training_instance_delete_post);

//GET request for updating a training_instance
router.get('/traininginstance/:id/update', training_instance_controller.training_instance_update_get);

//POST request for updating a training_instance
router.post('/traininginstance/:id/update', training_instance_controller.training_instance_update_post);

//Get request for one training_instance
router.get('/traininginstance/:id', training_instance_controller.training_instance_detail);

router.get('/traininginstance/:id/json', training_instance_controller.training_instance_detail_JSON);

//router.get('/traininginstance/:ti_id/trainingdata/create',training_data_controller.training_data_create_get);

//router.post('/traininginstance/:ti_id/trainingdata/create',training_data_controller.training_data_create_post);

router.get('/traininginstance/:ti_id/trainingdata',training_instance_controller.training_instance_data_list_get);

router.get('/traininginstance/:ti_id/trainingdata/edit/:command',training_instance_controller.training_instance_data_list_get_edit);

router.post('/traininginstance/:ti_id/trainingdata',training_instance_controller.training_instance_data_list_post);

router.get('/traininginstance/:ti_id/trainingdata/json',training_instance_controller.training_instance_data_list_get_JSON);



//get request for list of all training_instances
router.get('/traininginstances', training_instance_controller.training_instance_list);

//Training Data Routes
//GET request for creating a training_data, NOTE: Must come before routes to display training data using id
router.get('/trainingdata/create', training_data_controller.training_data_create_get);

//POST Request for create a training_data
router.post('/trainingdata/create', training_data_controller.training_data_create_post);

//GET request for deleting a training_data
router.get('/trainingdata/:id/delete', training_data_controller.training_data_delete_get);

//POST request for deleting a training_data
router.post('/trainingdata/:id/delete', training_data_controller.training_data_delete_post);

//GET request for updating a training_data
router.get('/trainingdata/:id/update', training_data_controller.training_data_update_get);

//POST request for updating a training_data
router.post('/trainingdata/:id/update', training_data_controller.training_data_update_post);

//Get request for one training_data
router.get('/trainingdata/:id', training_data_controller.training_data_detail);

//get request for list of all training_datas
router.get('/trainingdatas', training_data_controller.training_data_list);


module.exports = router;
