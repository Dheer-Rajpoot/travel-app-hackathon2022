import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/appContext";
import { Root } from "../Types/Categories";

// Step 1
// https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
export const Dashboard = () => {
  const [callAPi, setCallAPi] = useState(false);
  const [url, setUrl] = useState("");
  const { saveImage } = useAppContext();

  useEffect(() => {
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

          Router.push(
            `/location?landmark=${categories?.categories[0]?.detail?.landmarks[0]?.name}`
          );
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
      <button className="btn" onClick={onClick}>
        Detect Landmark
      </button>
    </>
  );
};
