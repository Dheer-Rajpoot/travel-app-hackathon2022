import { useEffect, useState } from "react";
import { FeaturesRoot } from "../Types/Features";
import Router from "next/router";
import { useAppContext } from "../Context/appContext";

interface LocationDetectedProps {
  landMark: string;
}

// Step - 2
// LocationDetected Component
export const LocationDetected = ({ landMark }: LocationDetectedProps) => {
  const { saveCategory, saveCoordinates } = useAppContext();
  const [cityOfInterest, setCityOfInterest] = useState("");
  const [interestCountry, setInterestCountry] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  // This holds the selected values
  const [selectedCategories, setSelectedCategories] = useState<string[]>();

  // Handle the onChange event of the select
  const onCategoryChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = event.currentTarget.selectedOptions;
    setSelectedCategories((current) => {
      if (!!current) {
        if (!current.includes(selectedOptions[0].value))
          return [...current, selectedOptions[0].value];
        else return [selectedOptions[0].value];
      } else return [selectedOptions[0].value];
    });
  };

  const handleNextClick = () => {
    if (!!selectedCategories) {
      saveCategory(selectedCategories);
      console.log(coordinates);
      saveCoordinates({ lng: coordinates[0], lat: coordinates[1] });
      Router.push(`/poi`);
    }
  };
  //TODO - fetch dynamically
  const categoryOptions = ["monument", "hotel"];

  const latlongFormat = ["long", "lat"];
  // fetch city of interest based on landmark
  useEffect(() => {
    fetch(
      `https://atlas.microsoft.com/geocode?subscription-key=Px_Nhgb8e0fe7gBm8PLbRM1pHSCFIfE-RhyrjADos1A&api-version=2022-02-01-preview&query=${landMark}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("landmark data", data);
        setCityOfInterest(data.features[0].properties.address.locality);
        setInterestCountry(
          data.features[0].properties.address.countryRegion.name
        );
        setCoordinates(data.features[0].geometry.coordinates);
      });
  }, []);
  console.log(selectedCategories);
  return (
    <>
      <div className="font-bold text-center">Image Container</div>
      <h1 className="text-center text-5xl mt-16">
        {landMark} {cityOfInterest} {interestCountry}
      </h1>

      {/* TODO - Fetch these categories dynamically */}
      {/* <label className="btn m-1 w-full">Choose Categories</label> */}
      <select
        className="select select-bordered select-lg w-full"
        onChange={onCategoryChangeHandler}
      >
        <option disabled selected>
          What is the best headless CMS
        </option>
        {categoryOptions &&
          categoryOptions.map((option, idx) => {
            return (
              <option key={idx} value={option}>
                {option}
              </option>
            );
          })}
      </select>
      <br />
      <div>
        {/* Display the selected values */}
        {selectedCategories &&
          selectedCategories.map((selectedCategory, idx) => (
            <span key={idx}>{selectedCategory}</span>
          ))}
        <button onClick={handleNextClick}>Next</button>
      </div>
    </>
  );
};
