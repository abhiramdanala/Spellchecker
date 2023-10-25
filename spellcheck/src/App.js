import React, { useEffect, useState } from 'react';

 

import './App.css';

 

function App() {

  const [Text, setText] = useState('');

  let text = "";

  useEffect(() => {

    // Define a function to make the POST request

    const postData = async () => {

      try {

        const apiUrl = `https://api.textgears.com/grammar?text=${Text}&language=en-GB&whitelist=&dictionary_id=&ai=1&key=wtWYtimCaW9fGPJ5`; // Replace with your API URL

        const response = await fetch(apiUrl, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json',

          },

          body: JSON.stringify(Text),

        });

 

        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);

        }

 

        const result = await response.json();

        console.log('Data posted successfully:', result);

      } catch (error) {

        console.error('Error posting data:', error);

      }

    };

    if (Text) {

      postData();

    }

  }, [Text]);

 

  // const handleInputChange = (e) => {

  //   const { text, index } = e.target;

  //   setText({ ...Text, [text] : index });

  // };

 

  return (

    <div className="App">

      <h1>Enter Your Text Here To check your GRAMMAR</h1>

      <textarea style={{ width: '400px', height: '400px', display: "block" }} onChange={(e) => text = (e.target.value)} />

      <button onClick={() => setText(text) }>Check Text</button>

    </div>

  );

}

 

export default App;

 
