import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [dropdownValue, setDropdownValue] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputValue);
      const res = await axios.post('https://your-backend-url.railway.app/bfhl', parsedData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const handleDropdownChange = (e) => {
    setDropdownValue([...e.target.selectedOptions].map(option => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredData = {};
    if (dropdownValue.includes('Alphabets')) {
      filteredData.alphabets = response.alphabets;
    }
    if (dropdownValue.includes('Numbers')) {
      filteredData.numbers = response.numbers;
    }
    if (dropdownValue.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    return (
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
