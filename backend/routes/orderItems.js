const express = require('express'),
      router = express.Router(),
      //validation
      {check, validationResult} = require('express-validator'),
      //Order model
      OrderItem = require('../models/OrderItem'),
      Product = require('../models/Product'),
      auth = require('../middleware/auth');

//API ROUTE 
//POST
//Creates an order-item document in the mongoDB 
router.post('/add-order-item', [
    auth,
    //Validation checks. 
    //productTitle is used to query the DB for a unique matching title
    //qty is used to ensure there is enough of an item in stock
    check('productTitle', 'Product title is required').not().isEmpty(),
    check('qty', 'Quantity is required').not().isEmpty()
], async (req,res) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {productTitle, qty} = req.body;

    try{
        //Make sure Product is in database
        let product = await Product.findOne({title:productTitle});
        
        if(!product){
            return res.Status(400).send('Product not found');
        }
        
        //Populate essential data
        const {imagePath, inStock} = product;
        const image = imagePath;
        const stickerPrice = product.price;
        const preTotal = stickerPrice * qty;
        const tax = .08875;
        const total = preTotal + (preTotal * tax);

        const available = (qty <= inStock);
        const price = total;

        //Make sure qty of item is in stock
        if (available) {
            let orderItem = new OrderItem({
                product,
                qty,
                price,
                imagePath                
            })
            console.log(orderItem);
            await orderItem.save();
            
            //Update stock to reflect new quantity after order
            //*************MOVED TO ORDER ENDPOINT************
            product.save();
            return res.status(200).send('We did it!!!')
        }
        else{
            //There was not enough in stock for this order
            return res.status(400).send('unavailable. not enough in stock');
        }
        
    }
    catch(err){
         console.error(err);
         res.status(500).send('server error');
    }
} )

module.exports = router;