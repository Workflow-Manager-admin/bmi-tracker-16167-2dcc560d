import React, { useState } from "react";

/**
 * BMITracker
 * Main container for BMI Tracker app: allows input of height and weight,
 * validates inputs, calculates BMI, and displays health category.
 * Layout follows a centered card with styled header and accent button.
 */

// PUBLIC_INTERFACE
function BMITracker() {
  // State variables for inputs
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  // State for error messages
  const [error, setError] = useState("");
  // State for results
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  // Color palette (from container_details.colors)
  const PRIMARY = "#1976D2";
  const SECONDARY = "#E3F2FD";
  const ACCENT = "#43A047";

  // Handle input changes with basic digit/decimal sanitation
  const handleHeightChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setHeight(val);
  };

  const handleWeightChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setWeight(val);
  };

  // Input validation logic
  function validateInputs(h, w) {
    if (!h || !w) return "Both fields are required.";
    const hf = parseFloat(h);
    const wf = parseFloat(w);
    if (isNaN(hf) || isNaN(wf)) return "Please enter numeric values only.";
    if (hf < 50 || hf > 300) return "Height must be between 50 cm and 300 cm.";
    if (wf < 10 || wf > 400) return "Weight must be between 10 kg and 400 kg.";
    return "";
  }

  // PUBLIC_INTERFACE
  function calculateBMI(h, w) {
    // BMI = weight(kg) / (height(m)^2)
    const meters = h / 100;
    if (meters === 0) return null;
    return w / (meters * meters);
  }

  // Determine BMI Category
  // PUBLIC_INTERFACE
  function getCategory(bmiValue) {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  }

  // Button click handler
  function handleCalculate(e) {
    e.preventDefault();
    setBmi(null); setCategory(""); // Clear previous result
    const err = validateInputs(height, weight);
    if (err) {
      setError(err);
      return;
    }
    setError("");  // No error, proceed
    const hf = parseFloat(height);
    const wf = parseFloat(weight);
    const bmiValue = calculateBMI(hf, wf);
    setBmi(bmiValue);
    setCategory(getCategory(bmiValue));
  }

  // Styling (inline for isolation)
  const cardStyle = {
    minWidth: 330,
    maxWidth: 400,
    margin: "80px auto",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(33, 150, 243, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  };
  const headerStyle = {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    background: PRIMARY,
    color: "#fff",
    padding: "2rem 2rem 1rem 2rem",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "1.4rem",
    letterSpacing: 1,
  };
  const contentStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    background: SECONDARY,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  };
  const inputWrap = {
    display: "flex",
    flexDirection: "column",
    gap: 10
  };
  const labelStyle = {
    fontWeight: 500,
    marginBottom: 4,
    color: PRIMARY,
    fontSize: "1rem",
  };
  const inputStyle = {
    padding: "8px 10px",
    fontSize: "1rem",
    border: `1.5px solid ${PRIMARY}44`,
    borderRadius: 5,
    outline: "none",
    marginBottom: 2,
    background: "#fff",
    color: "#222",
    transition: "border 0.2s",
  };
  const btnStyle = {
    background: ACCENT,
    color: "#fff",
    fontWeight: 600,
    fontSize: "1.1rem",
    padding: "12px 0",
    border: "none",
    borderRadius: 5,
    marginTop: 8,
    cursor: "pointer",
    transition: "background 0.2s",
    letterSpacing: 1,
  };
  const btnHoverStyle = {
    background: "#388d3c",
  };
  const errorStyle = {
    color: "#e24242",
    fontWeight: 500,
    marginTop: 4,
    minHeight: 22,
    textAlign: "center",
  };
  const resultStyle = {
    marginTop: 20,
    background: "#fff",
    border: `1.5px solid ${PRIMARY}33`,
    padding: "1rem",
    borderRadius: 7,
    minHeight: 60,
    textAlign: "center",
    color: "#222",
    fontSize: "1.11rem",
  };
  // Dynamic color for health category
  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Underweight": return "#0088c6";
      case "Normal": return "#43A047";
      case "Overweight": return "#ff9800";
      case "Obese": return "#e53935";
      default: return PRIMARY;
    }
  };

  // State for button hover effect
  const [isBtnHover, setIsBtnHover] = useState(false);

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>BMI Tracker</div>
      <form style={contentStyle} onSubmit={handleCalculate} autoComplete="off">
        <div style={inputWrap}>
          <label style={labelStyle} htmlFor="height">Height (cm)</label>
          <input
            style={inputStyle}
            id="height"
            name="height"
            type="text"
            placeholder="E.g. 170"
            value={height}
            onChange={handleHeightChange}
            inputMode="decimal"
            minLength="2"
            maxLength="5"
          />
        </div>
        <div style={inputWrap}>
          <label style={labelStyle} htmlFor="weight">Weight (kg)</label>
          <input
            style={inputStyle}
            id="weight"
            name="weight"
            type="text"
            placeholder="E.g. 60"
            value={weight}
            onChange={handleWeightChange}
            inputMode="decimal"
            minLength="1"
            maxLength="5"
          />
        </div>
        <div style={errorStyle}>{error}</div>
        <button
          type="submit"
          style={isBtnHover ? { ...btnStyle, ...btnHoverStyle } : btnStyle}
          onMouseEnter={() => setIsBtnHover(true)}
          onMouseLeave={() => setIsBtnHover(false)}
        >
          Calculate
        </button>
        <div style={resultStyle}>
          {bmi &&
            <>
              <div>
                <b>Your BMI:</b> {bmi.toFixed(2)}
              </div>
              <div>
                <span style={{
                  fontWeight: 700,
                  color: getCategoryColor(category),
                  fontSize: "1.1em"
                }}>
                  {category}
                </span>
              </div>
            </>
          }
        </div>
      </form>
    </div>
  );
}

export default BMITracker;
