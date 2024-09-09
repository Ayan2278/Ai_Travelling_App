import { useState } from "react";
import axios from "axios";
import "../css/travel.css";

const Travel = () => {
  const locations = {
    Paris: "France",
    Tokyo: "Japan",
    "New York": "USA",
    London: "UK",
    Sydney: "Australia",
    Berlin: "Germany",
    Moscow: "Russia",
    Rome: "Italy",
    Beijing: "China",
    Madrid: "Spain",
    Toronto: "Canada",
    "São Paulo": "Brazil",
    Mumbai: "India",
    Cairo: "Egypt",
    Dubai: "UAE",
    "Mexico City": "Mexico",
    Istanbul: "Turkey",
    Seoul: "South Korea",
    "Buenos Aires": "Argentina",
    Bangkok: "Thailand",
  };

  const [count, setCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [travelPlan, setTravelPlan] = useState("");

  const handleInc = () => {
    setCount(count + 1);
  };

  const handleDecr = () => {
    setCount(count - 1);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setSelectedCountry(locations[city]);
  };

  const submitClicked = async () => {
    const prompt = `Create a travel itinerary for ${count} days in ${selectedCity}, ${selectedCountry}.`;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo-instruct",
              messages: [{ role: "user", content: prompt }],
            },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YourAPIKeyHere`
          },
        }
      );

      const travelResponse = response.data.choices[0].message.content;
      setTravelPlan(travelResponse);
    } catch (error) {
      console.error(
        "Error fetching travel plan:",
        error.response ? error.response.data : error.message
      );
      setTravelPlan("Failed to generate travel plan.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex justify-center w-[100vw] lg:w-[30vw]">
        <div className="flex flex-col">
          <select
            className="selectionList"
            name="cities"
            id="cities"
            onChange={handleCityChange}
            value={selectedCity}
          >
            <option value="" disabled>
              Select a city
            </option>
            {Object.keys(locations).map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            className="selectionList mt-4"
            name="countries"
            id="countries"
            value={selectedCountry}
            disabled
          >
            <option value={selectedCountry}>{selectedCountry}</option>
          </select>

          <div className="mt-4">
            <button className="btn" onClick={handleDecr}>
              -
            </button>
            <input
              type="text"
              value={count}
              className="mx-2 selectionList w-[80px]"
              disabled
            />
            <button className="btn" onClick={handleInc}>
              +
            </button>
          </div>
          <button className="btn my-4" onClick={submitClicked}>
            Create Plan
          </button>
        </div>
      </div>
      <div>
        <div className="card flex p-3 w-[100vw] lg:w-[60vw]">
          {travelPlan ? travelPlan : "Your plan will be shown here"}
        </div>
      </div>
    </div>
  );
};

export default Travel;
