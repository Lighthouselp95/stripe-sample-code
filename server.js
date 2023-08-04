const express = require("express");

const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NWQBwKBqFxbmYtGILBSNcyWDkMF8aqRSxKaptZZFRSIoo7zG9BHodJIOc70ZlRLmU80KfFvQQvlyxL1PtzU3IXc00fe3g6tzx');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.get("/",(req,res)=>{
  res.sendFile("checkout.html",{'root':'public'});
});
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
console.log(items);
  // Create a PaymentIntent with the order amount and currency
    
    const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "sgd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
console.log(paymentIntent);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));