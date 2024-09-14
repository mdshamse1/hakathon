import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Aiwork() {
  const [input, setInput] = useState('');  // State for storing user input
  const [file, setFile] = useState(null);  // State for storing the PDF file
  const [output, setOutput] = useState(''); // State for displaying API output
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for error message

  // Function to handle form submission and API request
  const handleSubmit = async () => {
    if (!file || !input) {
      setError('Please provide both a file and input text.'); // Handle case where either input or file is missing
      return;
    }
    setError(''); // Clear previous error message

    const formData = new FormData();
    formData.append('text', input);
    if (file) {
      formData.append('file', file);
    }

    setLoading(true); // Set loading to true before starting the request
    setOutput(''); // Clear previous output

    try {
      // Make a POST request to your backend for skill analysis
      const response = await axios.post(`http://localhost:3000/api/process-input`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'AI-Type': 'AI1'  // Send 'AI1' for Skills Analysis
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

  // Check if the submit button should be disabled
  const isSubmitDisabled = !file || !input;

  return (
    <div className="dark:bg-black bg-slate-100 dark:text-white duration-300 sm:min-h-[800px] flex flex-col sm:flex-row p-4 gap-4">
      {/* Input Box */}
      <div className="flex flex-col flex-1 relative">
        <label htmlFor="user-input" className="block text-sm font-medium mb-2">
          Input:
        </label>
        <div className="relative flex gap-2 items-center">
          <input
            id="user-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-gray-800"
            placeholder="Enter your additional input here..."
          />
          {/* Submit Button */}
          <div className="flex items-center">
            <FaSearch
              onClick={handleSubmit}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              size={20}
              style={{ pointerEvents: isSubmitDisabled ? 'none' : 'auto' }}
            />
          </div>
        </div>
        <label htmlFor="file-upload" className="block text-sm font-medium mt-4">
          Upload Resume (PDF):
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-2 border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-200 dark:bg-gray-800"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
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
}

export default Aiwork;
