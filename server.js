// sk_test_51Lx9nCSBLeVsM0Y2sk1pyBbqjST12fbJcPbSFckKKEo5vKBIIz3p9iEqWDC2bmZFKRmq4jx5xOWGQ3bmeqzwcEOI008L9L1kMP
// coffee 
// price_1Lx9sqSBLeVsM0Y2xXsvNa5u
// sunglasses
// price_1Lx9ubSBLeVsM0Y2aNKvhh0x
// camera
// price_1Lx9y3SBLeVsM0Y2f1KKPw2o
const express =require('express');
require("dotenv").config();
var cors=require('cors');
const { writeHeapSnapshot } = require('v8');
const stripe=require('stripe')('sk_test_51Lx9nCSBLeVsM0Y2sk1pyBbqjST12fbJcPbSFckKKEo5vKBIIz3p9iEqWDC2bmZFKRmq4jx5xOWGQ3bmeqzwcEOI008L9L1kMP');
const app=express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.post("/checkout",async(req,res)=>{
    
    // req.body.items[
    //     {
    //         id: 1,  
    //         quantity:3,
    //     }
    // ] 
    // stripe wants[
    //     {
    //         price:1,
    //         quantity:3,
    //     }
    // ]
    const items=req.body.items;
    let lineItems=[];
    items.forEach((item)=>{
        lineItems.push(
            {
                price:item.id,
                quantity:item.quantity,
            }
        )
    });
    const session=await stripe.checkout.sessions.create({
        line_items:lineItems,
        mode:'payment',
        success_url:"https://shopicart77.netlify.app/success",
        cancel_url:"https://shopicart77.netlify.app/cancel",  
    })
     res.send(JSON.stringify({ 
        url:session.url
     }))
})
let port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});

app.get('/',(req,res)=>{
    res.send('api running successfully')
})

