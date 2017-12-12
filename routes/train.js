var express=require('express');
var router=express.Router();

//Require Controller modules
var user_controller=require('../controllers/userController');
var location_controller=require('../controllers/locationController');
var storeStatus_controller=require('../controllers/storeStatusController');

//User Routes
//Get Training Home Page
router.get('/',function(){});

//GET request for creating a user, NOTE: Must come before routes to display USER using id
router.get('/user/create',user_controller.user_create_get);

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
router.get('/user/:id, user_controller.user_detail);

//get request for list of all users
router.get('/users, user_controller.user_list);

//Location Routes
//GET Location Create NOTE: Must come before routes to display locaiton using id
router.get('/location/create',location_controller.location_create_get);

//POST request create user
router.post('/location/create',location_controller.location_create_post);

//GET Request to delete location 
router.post('/location/:id/delete',location_controller.location_delete_get);
 
//Post request to delete location
router.get('/location/:id/delete',location_controller.location_delete_post);

//GET request to update location
router.get('/location/:id/update',location_controller.location_update_get);

//POST request to update location
router.post('/location/:id/update',location_controller.location_update_post);

//GET Request for one location
router.get('/location/:id',location_controller.location_detail);

//GET Request all locations list
router.get('/locations',location_controller.location_list);

//StoreStatus Routes



