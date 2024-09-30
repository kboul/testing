import { useState } from "react";
import Posts from "../features/Posts";

import replaceCamelWithSpaces from "../utils/index";

export default function App() {
  const [buttonColor, setButonColor] = useState("MediumVioletRed");
  const [checkboxValue, setCheckboxValue] = useState(false);

  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  const handleClick = () => setButonColor(newButtonColor);

  return (
    <div className="App">
      <button
        disabled={checkboxValue}
        style={{ backgroundColor: checkboxValue ? "gray" : buttonColor }}
        onClick={handleClick}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>

      <br />

      <input
        id="disable-button-checkbox"
        onChange={(e) => setCheckboxValue(e.target.checked)}
        type="checkbox"
        value={checkboxValue}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>

      <Posts />
    </div>
  );
}
