import { useEffect, useState } from "react";
import { FeaturesRoot } from "../Types/Features";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Router from "next/router";
import { useAppContext } from "../Context/appContext";
import { categories } from "../Data/categories";

interface LocationDetectedProps {
  landMark: string;
}

// Step - 2
// LocationDetected Component
export const LocationDetected = ({ landMark }: LocationDetectedProps) => {
  const { saveCategory, saveCoordinates, imageUrl } = useAppContext();
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
  const categoryOptions = categories;
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
      {imageUrl}
      <div className="font-bold text-center">
        We have detected your landmark as {landMark}
      </div>
      <div>city :{cityOfInterest}</div>
      <div>country: {interestCountry}</div>
      <div>
        Coordinates:{" "}
        {coordinates.map((location, id) => {
          console.log("coordinates", coordinates);
          return (
            <div key={id}>
              {latlongFormat[id]}-{location}
            </div>
          );
        })}
      </div>

      {/* TODO - Fetch these categories dynamically */}
      <div className="container">
        <h3>Choose Categories</h3>
        <select multiple={true} size={5} onChange={onCategoryChangeHandler}>
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
      </div>
    </>
  );
};
