import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!weight || weight <= 0) {
      setError('Please enter a valid weight.');
      return false;
    }
    if (!height || height <= 0) {
      setError('Please enter a valid height.');
      return false;
    }
    setError('');
    return true;
  };

  const calculateBMI = () => {
    if (!validateInputs()) {
      return;
    }
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatus('Normal weight');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatus('Overweight');
    } else {
      setStatus('Obesity');
    }
  };

  const clearInputs = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
    setError('');
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Underweight':
        return 'blue';
      case 'Normal weight':
        return 'green';
      case 'Overweight':
        return 'orange';
      case 'Obesity':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="BMICalculator">
      <h2>BMI Calculator</h2>
      <div>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      <button onClick={clearInputs} style={{ marginLeft: '10px' }}>Clear</button>
      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
      {bmi && (
        <div>
          <h3>Your BMI is: {bmi}</h3>
          <h4 style={{ color: getStatusColor() }}>Status: {status}</h4>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
