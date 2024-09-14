const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse'); // Import pdf-parse for PDF extraction
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Replace these with your actual API key and external user ID
const apiKey = process.env.API_KEY;  // Store API key in .env file
const externalUserId = process.env.EXTERNAL_USER_ID;  // Store User ID in .env file

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to create a chat session
async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error.response?.data || error.message);
    throw error;
  }
}

// Function to submit a query
async function submitQuery(sessionId, text) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',  // Use the correct endpoint ID
        query: text,  // Query from the user
        pluginIds: ['plugin-1712327325',
          'plugin-1713962163',
          'plugin-1718116202',
          'plugin-1717448083'],  // Plugins provided by onDemand
        responseMode: 'sync'  // Synchronous response mode
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.answer;  // Return only the answer
  } catch (error) {
    console.error('Error submitting query:', error.response?.data || error.message);
    throw error;
  }
}

// Function to extract text from PDF file
async function extractTextFromPDF(fileBuffer) {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text; // Return extracted text
  } catch (error) {
    console.error('Error extracting text from PDF:', error.message);
    throw error;
  }
}

// API route to handle user input and file upload
app.post('/api/process-input', upload.single('file'), async (req, res) => {
  const { text } = req.body;  // The text from the frontend input
  const file = req.file;  // The file from the frontend input

  try {
    // Extract text from the PDF file if it exists
    let pdfText = '';
    if (file) {
      pdfText = await extractTextFromPDF(file.buffer);
    }

    // Combine the text from the input and the PDF file
    const combinedText = `${text}\n\n${pdfText}`;

    // Create a chat session
    const sessionId = await createChatSession();
    console.log('Created session ID:', sessionId);

    // Submit the combined text to the agent
    const queryResponse = await submitQuery(sessionId, combinedText);
    console.log('Query Response:', queryResponse);

    // Send the response back to the frontend
    res.json({ result: queryResponse });
  } catch (error) {
    console.error('Error processing input:', error.message);
    res.status(500).json({ error: 'Error processing input' });
  }
});

// API route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }

  // Configure email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email where you'll receive messages
    subject: `Contact Form Submission from ${name}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/contact', {  // Use full URL with port 3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
            setResponseMessage('Thank you for your message. We will get back to you soon.');
        } else {
            setResponseMessage('There was an issue sending your message. Please try again later.');
        }
    } catch (error) {
        setResponseMessage('An error occurred. Please try again.');
    }
};


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
