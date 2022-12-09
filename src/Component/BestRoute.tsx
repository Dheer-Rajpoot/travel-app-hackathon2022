import React from 'react'
import { useAppContext } from "../Context/appContext";

const BestRoute = () => {
    const { selectedPlaces  } = useAppContext();
    return (
        <div>{JSON.stringify(selectedPlaces, null, 2)}</div>
    )
}

export default BestRoute