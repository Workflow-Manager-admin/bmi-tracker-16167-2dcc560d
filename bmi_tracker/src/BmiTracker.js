import React, { useState } from "react";

/*
  Main Container for BMI Tracker
  Features:
  - Centered card with inputs for height (cm) and weight (kg)
  - Calculate BMI and show numeric BMI and category (Underweight, Normal, Overweight, Obese)
  - Input validation and error handling
  - Uses a light theme with primary (#1976D2), secondary (#E3F2FD), accent (#43A047) colors
*/

// PUBLIC_INTERFACE
function BmiTracker() {
  // State management
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  // Color theme
  const COLORS = {
    primary: "#1976D2",
    secondary: "#E3F2FD",
    accent: "#43A047",
    border: "#dddddd",
    text: "#222",
    error: "#c62828",
    background: "#fff"
  };

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    const { name, value } = e.target;
    // Allow only digits and decimal dot
    const re = /^\d*\.?\d*$/;
    if (!re.test(value)) {
      // Ignore invalid characters
      return;
    }
    setError("");
    if (name === "height") setHeight(value);
    if (name === "weight") setWeight(value);
  }

  // PUBLIC_INTERFACE
  function getCategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 25) return "Normal";
    else if (bmi < 30) return "Overweight";
    else return "Obese";
  }

  // PUBLIC_INTERFACE
  function validateInputs(h, w) {
    const heightVal = parseFloat(h);
    const weightVal = parseFloat(w);

    if (!h || !w) {
      setError("Both fields are required.");
      return false;
    }
    if (isNaN(heightVal) || isNaN(weightVal)) {
      setError("Please enter valid numbers.");
      return false;
    }
    if (heightVal < 50 || heightVal > 300) {
      setError("Height should be between 50 cm and 300 cm.");
      return false;
    }
    if (weightVal < 10 || weightVal > 500) {
      setError("Weight should be between 10 kg and 500 kg.");
      return false;
    }
    return true;
  }

  // PUBLIC_INTERFACE
  function handleCalculate(e) {
    e.preventDefault();
    if (!validateInputs(height, weight)) {
      setBmi(null);
      setCategory("");
      return;
    }
    const heightMeters = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    const bmiValue = weightKg / (heightMeters * heightMeters);
    setBmi(bmiValue.toFixed(1));
    setCategory(getCategory(bmiValue));
    setError("");
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
    setError("");
  }

  // Styles
  const cardStyle = {
    background: COLORS.background,
    borderRadius: "16px",
    boxShadow: "0 6px 24px 0 rgba(33,33,33,0.09)",
    maxWidth: "360px",
    margin: "60px auto",
    padding: "32px 28px 28px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: `1px solid ${COLORS.border}`,
  };

  const headerStyle = {
    background: COLORS.primary,
    color: "#fff",
    width: "100%",
    fontSize: "1.4rem",
    fontWeight: "600",
    textAlign: "center",
    padding: "14px 0",
    borderRadius: "12px 12px 0 0",
    marginBottom: "20px"
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "500",
    marginBottom: "4px",
    color: COLORS.text,
  };

  const inputStyle = {
    fontSize: "1rem",
    padding: "10px",
    borderRadius: "5px",
    border: `1px solid ${COLORS.border}`,
    outline: "none",
    background: COLORS.secondary,
    transition: "border 0.2s"
  };

  const buttonStyle = {
    background: COLORS.accent,
    color: "#fff",
    fontWeight: "600",
    marginTop: "18px",
    fontSize: "1.08rem",
    padding: "11px 0",
    border: "none",
    width: "100%",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 1px 6px 0 rgba(33,33,33,.07)",
    transition: "background 0.2s"
  };

  const errorStyle = {
    color: COLORS.error,
    marginTop: "9px",
    minHeight: "22px",
    fontSize: "0.96rem",
    textAlign: "center",
  };

  const resultStyle = {
    marginTop: "22px",
    padding: "13px",
    width: "100%",
    borderRadius: "7px",
    background: COLORS.secondary,
    color: COLORS.text,
    textAlign: "center",
    minHeight: "56px",
    fontWeight: "500",
    fontSize: "1.1rem",
  };

  const resetStyle = {
    marginTop: "10px",
    color: COLORS.primary,
    background: "none",
    border: "none",
    fontWeight: "400",
    fontSize: "0.97rem",
    cursor: "pointer",
    textDecoration: "underline"
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "85vh" }}>
      <form style={cardStyle} onSubmit={handleCalculate} autoComplete="off" spellCheck="false">
        <div style={headerStyle}>BMI Tracker</div>
        <div style={inputContainerStyle}>
          <div>
            <label htmlFor="height" style={labelStyle}>Height (cm):</label>
            <input
              type="text"
              id="height"
              name="height"
              inputMode="decimal"
              value={height}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="e.g. 170"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="weight" style={labelStyle}>Weight (kg):</label>
            <input
              type="text"
              id="weight"
              name="weight"
              inputMode="decimal"
              value={weight}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="e.g. 65"
              autoComplete="off"
            />
          </div>
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        <button
          type="submit"
          style={{
            ...buttonStyle,
            background: COLORS.accent,
            marginBottom: bmi ? "0" : "12px"
          }}
          data-testid="calculate-btn"
        >
          Calculate
        </button>
        <button
          type="button"
          style={resetStyle}
          onClick={handleReset}
          tabindex="-1"
        >
          Reset
        </button>
        <div style={resultStyle} data-testid="bmi-result">
          {bmi && (
            <>
              <div>
                <strong>BMI:</strong> {bmi}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span style={{
                  color:
                    category === "Normal"
                      ? COLORS.accent
                      : category === "Underweight"
                      ? "#FFA000"
                      : category === "Overweight"
                      ? "#FF7043"
                      : "#b71c1c"
                }}>
                  {category}
                </span>
              </div>
            </>
          )}
          {!bmi && !error && (
            <div>Enter height and weight to calculate BMI.</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default BmiTracker;
