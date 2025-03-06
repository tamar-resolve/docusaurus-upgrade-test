// src/components/ContactForm.js
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('Submission successful!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
      </div>

      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      {status && (
        <div className="mt-4 p-2 rounded bg-gray-100">
          {status}
        </div>
      )}
    </form>
  );
};

export default ContactForm;