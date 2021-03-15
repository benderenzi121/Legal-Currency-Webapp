const adminAuth = require('../middleware/adminAuth');

const 
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    { check, validationResult } = require('express-validator'),
    User = require('../models/User');
    auth = require('../middleware/auth');
  


router.get('/', [auth,adminAuth], async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        return res.status(200).send(users);
    }
    catch(err) {
        return res.sendStatus(400);
    }
});

//gets default shipping information for current signed in user.
router.get('/userShipping', [auth], async (req, res) => {
    //Takes token from the header
    const token = req.header('x-auth-token');
    if (!token){
        return res.status(401).json({ msg: 'no token, auth denied'});
    }

    //Decodes JWT 
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    let user = decoded.user;
    let userEmail = user.email;

    

    try {
        // Finds the User associated with token
        let dbUser = await User.findOne({userEmail});
        console.log(dbUser.shipping);
        //Queries shipping information from database
        let dbShipping = await Shipping.findById(dbUser.shipping[0]);
        console.log(dbShipping);
        //returns Users default shipping information
        return res.status(200).send(dbShipping);
    }
    catch(err) {
        return res.sendStatus(400);
    }
});

router.post('/', [
        check('firstName','name is required').not().isEmpty(),
        check('email', 'please include a valid email').isEmail(),
        check('password' , 'please enter a password with 6 or more charecters').isLength({min: 6})
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const { firstName, lastName, email, password } = req.body;

        try{
            let user = await User.findOne({ email })
            if (user){
                res.status(400).json({errors: [{msg: 'user already exists' }] });
            }

            user = new User({ firstName, lastName, email, password });
        
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt)

        //  saves user to the database
            await user.save();

        //  This starts the JSON web token part
            
        //  creates a payload to be loaded into the token
            const payload = {
                user: {
                    id: user.id,
                    permission: user.permissions
                }
            }

        //  signs the json token using payload, secret key in config.js,
        //  timer for when the token will expire, callback function to either
        //  throw error or return the token in a json format
        
            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );


        } catch(err){
            console.error(err);
            res.status(500).send('server error');
        }
    });



module.exports = router;