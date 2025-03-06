// src/components/SubmissionsList.js
import React, { useState, useEffect } from 'react';

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Form Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">ID</th>
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{submission.id}</td>
                <td className="px-6 py-4 border-b">{submission.name}</td>
                <td className="px-6 py-4 border-b">{submission.email}</td>
                <td className="px-6 py-4 border-b">{submission.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {submissions.length === 0 && (
        <p className="text-center py-4 text-gray-500">No submissions yet</p>
      )}
    </div>
  );
};

export default SubmissionsList;
