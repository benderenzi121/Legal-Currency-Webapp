const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../models/User')
router.get('/', async (req,res) => {
    const user = await User.find()
    console.log(user)
    return res.sendStatus(200)
})
router.post('/', [
    check('firstName','name is required')
    .not()
    .isEmpty(),
    check('email', 'please include a valid email')
    .isEmail(),
    check('password' , 'please enter a password with 6 or more charecters')
    .isLength({min: 6})
],
async (req,res) => {
    const  errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const{firstName,lastName, email, password} = req.body;

    try{
        
        let user = await User.findOne({ email })

        if (user){
            res.status(400).json({errors: [{msg: 'user already exists' }] });
            
        }

        user = new User({
            firstName,
            lastName,
            email, 
            password
        });
        
       
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

    //  saves user to the database
        await user.save();

    //  This starts the JSON web token part
        
    //  creates a payload to be loaded into the token
        const payload = {
            user: {
                id: user.id
            }
        }

    //  signs the json token using payload, secret key in config.js,
    //  timer for when the token will expire, callback function to either
    //  throw error or return the token in a json format
       
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
            )
   
        

    } catch(err){
        console.error(err);
        res.status(500).send('server error');
    }
    
});

module.exports = router;