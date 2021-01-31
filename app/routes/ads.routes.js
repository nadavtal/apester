module.exports = app => {
    const ads = require("../controllers/ad.controller");
  
    var router = require("express").Router();
  
    // Create a new Ad
    router.post("/", ads.create);
  
    // Retrieve all Ads
    router.get("/all", ads.findAll);
  
    // Retrieve all published Ads
    router.get("/best", ads.findBestAd);
  
    // Retrieve a single Ad with id
    router.get("/:id", ads.findOne);
  
    // Update a Ad with id
    router.put("/:id", ads.update);
  
    // Delete a Ad with id
    router.delete("/:id", ads.delete);
  
    // Create a new Ad
    router.delete("/", ads.deleteAll);
  
    app.use('/api', router);
  };
  