import React, { useState } from 'react';

function App() {
  // Init the temp to 0 and create temperature variable and setter
  const [temperature, setTemperature] = useState(0);
  // Init the converted temp to match the temp and create the setter
  const [convertedTemp, setConvertedTemp] = useState(temperature);
  // Default if the user is in celcius to true and create the setter
  const [isC, setIsC] = useState(true);
  // Default to no error
  const [error, setError] = useState('');
  // If the user is in celcius display to fahrenheit
  const btnLabel = isC ? "To Fahrenheit" : "To Celsius";
  // Display which label the value should display with
  const displayLabel = !isC ? "Fahrenheit" : "Celsius";

  /**
   * @param e event read in from the DOM
   * @returns void
   * sets errors if the user didn't enter a number or if nothing is entered
   * otherwise sets the value of the temperature
   */
  const onInputChange = (e) => {
    const value = e.target.value;

    // Validation: Allow only numbers, including negative values
    if (!isNaN(value) && value.trim() !== '') {
      setTemperature(value);
      setError(''); // Clear any previous errors
    } else {
      setError('Please enter a valid number.');
    }
  };

  /**
   * @returns void
   * On click function that sets an error if they click the convert button before entering
   * otherwise converts the temp to the specified amount and swaps if it is celcius or fahrenheight
   */
  const onConvertTemp = () => {
    // Validation: Allow only numbers, including negative values
    if (temperature === '' || isNaN(temperature)) {
      setError('Please enter a valid temperature before converting.');
      return;
    }

    // Parse the temp
    const temp = parseFloat(temperature);
    if (isC) { 
      // Sets the converted temp to fahrenheight
      setConvertedTemp((temp * 9/5 + 32).toFixed(2));
    } else {
      // Sets the converted temp to celcius
      setConvertedTemp(((temp - 32) * 5/9).toFixed(2));
    }
    // Flips type of temp
    setIsC(!isC);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div>Enter Temperature</div>
      {/* input from the user */}
      <input
        type="number"
        onChange={onInputChange}
        defaultValue={temperature}
        style={{ marginBottom: '10px' }}
      />
      {/* Validation message */}
      <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>
      {/* Button to convert temp */}
      <button onClick={onConvertTemp} style={{ margin: '5px' }}>
        {btnLabel}
      </button>
      <br />
      {/* converted temp display */}
      <div>Converted Temperature: {convertedTemp} {displayLabel}</div>
    </div>
  );
}

// Default export to allow app to be imported into index.js and ran
export default App;