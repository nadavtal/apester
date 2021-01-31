import React, { useEffect, useState } from 'react'
import adsDataService from '../services/Ads';
import Ad from './Ad'
const BestAd = ({}) => {
    const [coords, setCoords] = useState()
    const [ad, setAd] = useState()
    useEffect(() => {
        getLocation()
        
        return () => {
            
        }
    }, [])
    useEffect(() => {
        if (coords) {
            adsDataService.getBestAd(coords)
                .then(res => {
                   setAd(res.data)
                })

        }
        
        return () => {
            
        }
    }, [coords])

    const  getLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
  
    //get location error
    const geoError = () => {
        alert("Geocoder failed.");
    }
    //get location success
    const geoSuccess = (position) => {
        console.log(position)
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        setCoords({ lat, lng });
    }
    return (
      <div>
        {ad && <Ad ad={ad}/>}
      </div>
    );
}

export default BestAd