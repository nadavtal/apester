const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mq = require('./src/mq');
const port = 3000
const app = express();
const db = require("./app/models");
const adsController = require('./app/controllers/ad.controller')
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("Connected to the database!");
    adsController.create()
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// app.get('/ads', (req, res) => {
//   // TODO: COMPLETE LOGIC.
//   res.send('Many ads');
// });
// app.get('api/ads/best', (req, res) => {
//   // TODO: COMPLETE LOGIC.
//   console.log('getting ad')
//   res.send('One ad');
// });

// mq.subscribe('create-ad', (newAd, ack, nack) => {
//   // TODO: COMPLETE LOGIC.  
//   ack();
// });

// set port, listen for requests
const PORT = process.env.PORT || port;
require("./app/routes/ads.routes")(app)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
