const distance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

exports.getUniqueAds = (ads) => {

    let unique = []

    ads.forEach(ad => {
        if (!unique.includes(ad)) unique.push(ad)
    });

    return unique

}

exports.sortByRelevantTags = (ads, tags) => {
    let sorted = getNumberOfCommonElements(ads, tags)
    // console.log(sorted)
    sorted.sort(function(a, b) {
        return b._doc.relevance - a._doc.relevance;
    });
    return sorted
}
exports.sortByDistance = (ads) => {
 
    // console.log(sorted)
    return ads.sort(function(a, b) {
        return a._doc.distance - b._doc.distance;
    });

}

const getNumberOfCommonElements = (ads, tags) => {
    let newAds = [...ads]
    newAds.forEach(ad => {  
        let relevance = ad.tags.filter(tag => tags.includes(tag)).length; 
        ad._doc.relevance = relevance
    })
    // let newAds = ads.map(ad => {
    //     return {...ad, relevance: ad.tags.filter(tag => tags.includes(tag)).length}
    // })
    // console.log(newAds)
    return newAds
}

exports.getAdsInRadius = (ads, lat, long) => {
    let inRadius = []
    ads.forEach(ad => {
        const dist = distance(ad.targeting.lat, ad.targeting.long, lat, long, "K")
        ad._doc.distance = dist
        if (ad.targeting.radius >= dist) inRadius.push(ad)
    })
    return inRadius
}

exports.createTagsQuery = (tags) => {
    return tags.map(tag => {
        return {'tags': tag}
    })
}

exports.getHighestRelevanceAds = (ads) => {
    const highestRelevance = getHighestRelavance(ads)
    const highestRelevanceAds = ads.filter(ad => ad._doc.relevance == highestRelevance)
    return highestRelevanceAds
}

const getHighestRelavance = (ads) => {
    let highestRelevance = 0
    ads.forEach(ad => {
        if (ad._doc.relevance > highestRelevance) highestRelevance = ad._doc.relevance
    })
    return highestRelevance
}
