import { useEffect } from "react";

export const LocationDetected: React.FC<Landmarktype> = ({
    landMark
  })=>{

useEffect(()=>{
    fetch(`https://atlas.microsoft.com/geocode?subscription-key=Px_Nhgb8e0fe7gBm8PLbRM1pHSCFIfE-RhyrjADos1A&api-version=2022-02-01-preview&query=${landMark}`)
    .then(response => response.json())
    .then(data => { console.log("data",data)
        });


})


  return(
    <div className="font-bold text-center">We have detected your landmark as {landMark}</div>
)
}

type Landmarktype = {
    landMark: string
  };