import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const Generaltask = () => {
  const [input, setInput] = useState('');  // State for storing user input
  const [output, setOutput] = useState(''); // State for displaying API output
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to handle form submission and API request
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('text', input);

    setLoading(true); // Set loading to true before starting the request
    setOutput(''); // Clear previous output

    try {
      // Make a POST request to your backend with the selected AI
      const response = await axios.post(`http://localhost:3000/api/process-input`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'AI-Type': 'AI3'  // Send 'AI3' for Other
        },
      });
      const result = response.data.result;
      setOutput(result);
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      setOutput('Error fetching data. Please try again.'); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className="dark:bg-black bg-slate-100 dark:text-white duration-300 sm:min-h-[800px] flex flex-col sm:flex-row p-4 gap-4">
      {/* Input Box */}
      <div className="flex flex-col flex-1 relative">
        <label htmlFor="user-input" className="block text-sm font-medium mb-2">
          Enter your input for other tasks:
        </label>
        <div className="relative flex gap-2 items-center">
          <input
            id="user-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-800"
            placeholder="Enter your input..."
          />
          <FaSearch
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
            size={20}
          />
        </div>
      </div>

      {/* Output Box */}
      <div className="flex flex-col flex-1">
        <label htmlFor="output" className="block text-sm font-medium mb-2">
          Output:
        </label>
        <textarea
          id="output"
          rows="20"
          value={loading ? 'Loading...' : output}
          readOnly
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-800"
          placeholder="Output will appear here..."
        ></textarea>
      </div>
    </div>
  );
};

export default Generaltask;
