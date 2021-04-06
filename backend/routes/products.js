const express = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/adminAuth');
const Product = require('../models/Product');
const { find } = require('../models/Product');
 

const router = express.Router();
// Route to update value of instock for a product 
// Takes 2 parameter 'id' the id of the product to be altered
//                   'change' the value in which to increment/decrement by
// **************************NEEDS MIDDLEWEAR***********************
router.post('/update-stock',[
   auth,
   authAdmin,
   check('id', 'Product id required').not().isEmpty(),
   check('change', 'change (increment/decrement) integer required').not().isEmpty()     
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
    }

    const {id,change} = req.body;
    try {
        let product = await Product.findOne({_id: id});
        

        product.inStock += change;
        
        await product.save();
        res.status(200).send(product);

    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
})





// Returns list of all products 
router.get('/' , async (req,res) => {
    const productList = await Product.find();
    
    return res.status(200).send(productList);
})

//  Creates a new Product
//  
// 
router.post('/new-product', [auth,authAdmin,
    check('title', 'title is required')
        .not()
        .isEmpty(),
    check('description', 'description is required')
        .not()
        .isEmpty(),
    check('price', 'price is required')
        .not()
        .isEmpty(),
    check('imagePath', 'please provide a url for an image')
        .not()
        .isEmpty(),
    check('imagePath', 'please provide a quantity being added to stock')
        .not()
        .isEmpty(),
    ],//NEEDS MIDDLEWEAR still)
    async (req,res) => { 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
       const { title , description, price, tag, date, imagePath, inStock } = req.body
       console.log(req.body);
        try{
            let product = await Product.findOne({title})
            
            if(product){
               return res.status(400).json({errors: [{msg: 'product already exists'}]});
            }

            product = new Product({
                title,
                description, 
                price, 
                tag, 
                date, 
                imagePath,  
                inStock   
            })

            await product.save();
            res.status(200).send('it worked, should be in DB');
            
        }
        catch(err){
            console.error(err);
            res.status(500).send(err);

        }
        ;
    }
);


// Gets product ID from the database 
// Takes 1 parameter 'title' and queries the DB to see if it finds a matching title
// Returns the ID of the product with the requests title
router.get('/product-id', async (req,res) => {
        const {title} = req.body;

        try{
            let product = await Product.findOne({title});
            const prodID = product._id
            res.status(200).send({prodID})
        }
        catch(err){
            res.status(500).send('server error')
        }
});
module.exports = router;

//Custom Queries Based on User tags 
router.get('/product-list',
      async (req,res) => {
      //get list of tags from req and store it in a variable
      let {tags} = req.body;
      let results = [];
      
      try{
            //if no tags selected return all products
            if (!tags){
                let products = await Product.find({inStock : {$gte: 1}});
                //if no products return an error
                if(!products){
                    res.status(400).json({errors: [{msg: 'no products in database?' }] });
                }
                return res.status(200).send(products);
            }
            //find all products that have any of the associated tags
            for (let i=0; i< tags.length; i++){
                let prod = await Product.find({tag:tags[i],inStock : {$gte: 1}});
                results.push(prod);
            };
            
            //send a list of the products queried for by tag
            return res.status(200).send(results);
    }
    catch(err){
        console.error(err);
        return res.status(400).json({errors: [{msg: 'no products in database?' }] });
    };
})

