import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkGrammar = async () => {
    setErrors([]); 
    setLoading(true);

    const apiUrl = `https://api.textgears.com/check.php?text=${text}&key=wtWYtimCaW9fGPJ5`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Data fetched successfully:', result);

      if (result.errors && result.errors.length > 0) {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWordClick = (error) => {
    if (error.suggestions && error.suggestions.length > 0) {
      const suggestion = error.suggestions[0];
      const correctedText = text.slice(0, error.offset) + suggestion + text.slice(error.offset + error.length);
      setText(correctedText);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Grammar Checker</h1>

      <div className="textarea-container">
        <textarea
          className="textarea"
          placeholder="Enter your text here"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="check-button" onClick={checkGrammar}>
          Check Grammar
        </button>
      </div>

      {loading && <p className="loading">Checking...</p>}
      <div>
        <h3>Errors:</h3>
        {errors.map((error, index) => (
          <div key={index}>
            <p>
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => handleWordClick(error)}
              >
                {text.slice(error.offset, error.offset + error.length)}
              </span>
            </p>
            {error.suggestions && error.suggestions.length > 0 && (
              <p>Suggestions: {error.suggestions.join(', ')}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
