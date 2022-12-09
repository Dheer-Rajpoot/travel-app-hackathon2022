import { useEffect, useState } from "react";
import { FeaturesRoot } from "../Types/Features";

export const LocationDetected: React.FC<Landmarktype> = ({
    landMark
  })=>{
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [coordinates,setCoordinates] = useState ([])


useEffect(()=>{
    fetch(`https://atlas.microsoft.com/geocode?subscription-key=Px_Nhgb8e0fe7gBm8PLbRM1pHSCFIfE-RhyrjADos1A&api-version=2022-02-01-preview&query=${landMark}`)
    .then(response => response.json())
    .then(data => { 
      setCity(data.features[0].properties.address.locality)
      setCountry(data.features[0].properties.address.countryRegion.name)
      setCoordinates(data.features[0].geometry.coordinates)
       });


},[])


  return(
    <>
    <div className="font-bold text-center">We have detected your landmark as {landMark}</div>
    <div>city :{city}</div>
    <div>country: {country}</div>
    <div>coordinates: {coordinates.map((location,id)=>{
    return(
      <div key={id}>{location}</div>
      )
    })}</div>
    </>
    
)
}

type Landmarktype = {
    landMark: string
  };