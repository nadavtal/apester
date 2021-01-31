import React,  {useEffect, useState} from 'react'
import adsDataService from '../services/Ads';
import Ad from './Ad'
const AllAds = ({}) => {
    const [ads, setAds] = useState([])
    const [coords, setCoords] = useState()
    useEffect(() => {
        getLocation()
    }, [])
    useEffect(() => {
        if (coords) {
            adsDataService.getAll(coords)
                .then(res => {
                    
                    setAds(res.data)
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
    return <div>
        {ads.map(ad => <Ad ad={ad} key={ad._id}/>)}
    </div>
}

export default AllAds