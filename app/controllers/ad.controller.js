const db = require("../models");
const Ad = db.ads;
const utils = require('./utils')
// Create and Save a new Ad
exports.create = async (req, res) => {
    const ads = [
        {
          description: 'Funniest developer ever made',
          imageUrl: "http://trendsinusa.com/wp-content/uploads/2018/01/profile_picture_by_funymony-db290dj.png",
          targeting: {
            lat: 29.5000,
            long: 36.7500,
            radius: 20,
          },
          operatingSystems: ['Windows', 'UNIX', 'LINUX'],
          browsers: ['Opera', 'Edge'],
          tags: ['travel', 'fassion'],          
        },
        {
          description: 'Angriest developer ever made',
          imageUrl: "https://i.ytimg.com/vi/xOiWrGuZU7Y/maxresdefault.jpg",
          targeting: {
            lat: 31.2000,
            long: 34.7500,
            radius: 10,
          },
          operatingSystems: ['Windows', 'LINUX'],
          browsers: ['Opera', 'Edge', 'Chrome'],
          tags: ['food', 'fassion'],          
        },
      ]
  
    for(let i=0; i<ads.length; i++){
  
        const ad = new Ad({
            description: ads[i].description,
            imageUrl: ads[i].imageUrl,
            targeting: {
              lat: ads[i].targeting.lat,
              long: ads[i].targeting.long,
              radius: ads[i].targeting.radius
            },
            operatingSystems: ads[i].operatingSystems,
            browsers: ads[i].browsers,
            tags: ads[i].tags,  
          });
        
        // Save a Ad in the MongoDB
        // await ad.save();
      }
};

// Retrieve all ads from the database.
exports.findAll = async (req, res) => {
    console.log(req.query)
    const tagQuery = utils.createTagsQuery(req.query.tag)

    try {
        // const ads = await Ad.find( { tags: req.query.tag[2] } )
        const ads = await Ad.find( {
            $and: [
            {
                $or: tagQuery
            },
            {
                'operatingSystems': req.query.os
            },
            {
                'browsers': req.query.browser
            },
            ]
        } )
        const uniqueAds = utils.getUniqueAds(ads)
        const sorted = utils.sortByRelevantTags(uniqueAds, req.query.tag)
        const inRadius = utils.getAdsInRadius(sorted, req.query.lat, req.query.long)
        res.send(inRadius)
    } catch (err) {
        res.send(err)
    }
    
};

// Find a single Ad with an id
exports.findOne = (req, res) => {
  
};

// Update an Ad by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Ad with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Ads from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Ads
exports.findBestAd = async (req, res) => {
  console.log('Finding best ad', req.query)
  const tagQuery = utils.createTagsQuery(req.query.tag)

  try {
      // const ads = await Ad.find( { tags: req.query.tag[2] } )
      const ads = await Ad.find( {
          $and: [
          {
              $or: tagQuery
          },
          {
              'operatingSystems': req.query.os
          },
          {
              'browsers': req.query.browser
          },
          ]
      } )
      const uniqueAds = utils.getUniqueAds(ads)
      const sorted = utils.sortByRelevantTags(uniqueAds, req.query.tag)
      const inRadius = utils.getAdsInRadius(sorted, req.query.lat, req.query.long)
    //   console.log(sorted)
    //   console.log('inRadius', inRadius)
      const heighestRelevantAds = utils.getHighestRelevanceAds(inRadius)
      console.log('heighestRelevantAds', heighestRelevantAds)
      const closestAd = utils.sortByDistance(heighestRelevantAds)[0]
      res.send(closestAd)
  } catch (err) {
      res.send(err)
  }
};





