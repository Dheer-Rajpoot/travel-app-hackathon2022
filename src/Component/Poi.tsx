import Router from "next/router";
import { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import { WayPoint } from "./MapRoute";

export interface PoiProps {}

const Poi = ({}: PoiProps) => {
  const { categories, coordinates, saveWaypoints } = useAppContext();
  const { lat, lng } = coordinates;
  const radius = 9000;
  const subscriptionKey = "NAXWQD3Pyr9Rzxb4dto1J0iXICEhDlLykfgIk8w8sYw";

  useEffect(() => {
    {
      categories.forEach((category) => {
        fetch(
          `https://atlas.microsoft.com/search/poi/json?api-version=1.0&query=${category}&subscription-key=${subscriptionKey}&lat=${lat}&lon=${lng}&radius=${radius}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("POI data", data);
          });
      });
    }
  }, []);

  console.log("POI category array", categories);

  const handleNextClick = () => {
    const waypoints: WayPoint[] = [
      {
        lat: 77.2177,
        lng: 28.6304,
        title: "CP",
      },
      {
        lat: 77.0721,
        lng: 28.3976,
        title: "WorldMark",
      },
      {
        lat: 77.3211,
        lng: 28.5673,
        title: "DLF Mall Noida",
      },
      {
        lat: 77.0958,
        lng: 28.5058,
        title: "Ambience Mall",
      },
    ];
    saveWaypoints(waypoints);
    Router.push(`/maproute`);
  };

  return (
    <>
      <h1 className="mb-10">Points of Interest</h1>
      <button onClick={handleNextClick}>Next</button>
    </>
  );
};

export default Poi;
