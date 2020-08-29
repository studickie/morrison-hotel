const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(404).json({ message: 'User already exists' });
//         }

//         const newUser = new User({ email, password });

//         await newUser.save();

//         req.session.user = newUser;
//         res.render('index', { message: 'User created' });

//     } catch (e) {
//         res.status(500).json({ message: 'Oops! Something went wrong', error: e });
//     }
// });

router.get('/signin', (req, res) => res.render('signin'));

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (email.length < 8 || password.length < 8) {
        return res.render('signin', {
            emailHasError: email.length < 8,
            emailErrorMessage: 'Email must be at least 8 chatacters long',
            passwordHasError: password.length < 8,
            passwordErrorMessage: 'Password must be at least 8 characters long',
            submittedEmail: email,
            submittedPassword: password
        });
    }

    

    res.render('index');
});

router.post('/signout', async (req, res) => {
    // req.session.destroy();
    // res.render('index');
});

module.exports = router;