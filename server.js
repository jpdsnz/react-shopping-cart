//copy up one level

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51MgIz8E8xYOT8PJXBkHvZQ2JlBHX38bZYX7NebsxImV4c2aYfp8td1WGYnXhSIFIptrUzNAsOGdU7snkeZHecA4J00TJv7LV7R');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    /*
    request.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    
    strip wants
    [
        {
            price: 1, 
            quantity: 3
        }
    ] 
    */
   
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=>{
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));