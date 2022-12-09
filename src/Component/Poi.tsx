import { useEffect } from "react";
import { useAppContext } from "../Context/appContext";

export interface PoiProps {}

const Poi = ({}: PoiProps) => {
  const { categories, coordinates } = useAppContext();
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
  return (
    <>
      <h1 className="mb-10">Points of Interest</h1>
    </>
  );
};

export default Poi;
