// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

const stripe = require('stripe');
const express = require('express');
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_20778921cf56ee6d0bfb16fe21804fb2748c607458960ae12a641fe9634a8b6e";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
      case 'checkout.session.completed':
      const charge = event.data.object;
      const xtra_email = event.data.object.customer_details.email;
      const username = event.data.object.client_reference_id;
      const customer_id = event.data.object.customer;
      const subscription_id = event.data.object.subscription;
      console.log(username,customer_id,xtra_email);
      const stripe2 = require('stripe')('sk_test_51KoyEjKEmxTujg3VUuPnJS2MB3XHjP8vddIVR3MZ3SkXoPGbiIFnr8O3wU2KbB6owxRRmEuhC7WGKjfv4jkYropY00NxgZTfM2');
      const subscriptionItems = await stripe2.subscriptionItems.list({
          subscription: subscription_id,
      });

      console.log(subscriptionItems);
      subscriptionItems.data.forEach(i => console.log(i));
      // Then define and call a function to handle the event charge.captured
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      //console.log(event.data.object);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));
