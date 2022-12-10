import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/appContext";
import { Root } from "../Types/Categories";
// Step 1
// https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
export const Dashboard = () => {
  const [callAPi, setCallAPi] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false)
  const { saveImage } = useAppContext();
  useEffect(() => {
    const uploadToMachine = () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Training-key": "c239abc1041344079a10f3da58ec0b1f",
        },
        body: JSON.stringify({
          "images": [
            {
              "url": url
            }]
        }),
      };
      fetch(
        "https://customvisionakqahackathon2022.cognitiveservices.azure.com/customvision/v3.3/Training/projects/68cc9541-a88a-4cb0-895a-47bb9c890238/images/urls",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if(data.isBatchSuccessful) {
            setError(true)
          }
        });
    }
    const callCustomApi = () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Prediction-Key": "d33f0fb4b1fb45c2b839b659aed26ed0",
        },
        body: JSON.stringify({ url: url }),
      };
      fetch(
        "https://customvisionakqahackathon2022-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/68cc9541-a88a-4cb0-895a-47bb9c890238/classify/iterations/Iteration3/url",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          const customPlace = data.predictions.filter((prediction:any) => prediction.probability > 0.8)
          if (!customPlace.length) {
            uploadToMachine()
          } else {
            Router.push(
              `/location?landmark=${customPlace.tagName}`
            );
          }
        });
    }
    if (callAPi) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "777b4362895e407cad30cff5e985ebbe",
        },
        body: JSON.stringify({ url: url }),
      };
      fetch(
        "https://eastus.api.cognitive.microsoft.com/vision/v3.2/analyze?details=Landmarks&language=en&model-version=latest",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          const categories = data as Root;
          if (!data.categories || !(data.categories[0].detail)) {
            callCustomApi()
          } else {
            Router.push(
              `/location?landmark=${categories?.categories[0]?.detail?.landmarks[0]?.name}`
            );
          }
        });
    }
  }, [callAPi, url]);
  const onClick = () => {
    if (url) {
      saveImage(url);
      setCallAPi(true);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallAPi(false);
    setUrl(e.target?.value);
  };
  return (
    <>
      {
        error ? <div className="min-w-xs">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Sorry we couldn't find a place out of your image</span>
          </div>
        </div>
        <div className="alert alert-success shadow-lg mt-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>But, your image has been successfully uploaded to our custom training model!!</span>
          </div>
        </div>
        </div> : null
      }
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        onChange={handleChange}
        value={url}
        placeholder="Enter Image URL here"
        className="input w-[70%] text-center mb-12"
      />
      <br />
      <button className="btn btn-secondary" onClick={onClick}>
        Detect Landmark
      </button>
    </>
  );
};
