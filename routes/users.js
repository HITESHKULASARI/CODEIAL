// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const usersController = require('../controller/user_controller');


// router.get('/profile',passport.checkAuthentication, usersController.profile);
// router.get('/sign-up', usersController.signUp);
// router.get('/sign-in', usersController.signIn);


// router.post('/create',usersController.create);
// router.post('/create-session',passport.authenticate(
//     //the strategy is local
//     'local',
//     //if it's not done then it's redirect to user
//     {failureRedirect:'/users/sign-in'},
//     ),usersController.createSession);

// module.exports = router;

const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

const passport = require('passport');


// router.get('/', userController.home);
//:id ye robo 3t mein jaakr utah lo and yaha pr paste krni pdegi
//kunal ne ek or chij boli dynamices routes something concept in routes
// router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.get('/profile/:id',passport.checkAuthentication, userController.profile);



router.post('/update/:id',passport.checkAuthentication, userController.update);

router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);
router.get('/sign-out',userController.destroySession);

router.post('/create', userController.create);

// use passport as a middleware authentication
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),userController.createSession);

router.get('/sign-out', userController.destroySession);


//passport google-oauthentication for signin
// router.get('/auth/google', passport.authenticate('google', {scope: [ 'profile', 'email']}));

// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession)


module.exports = router;