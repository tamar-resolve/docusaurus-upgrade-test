// src/pages/admin.js
import React from 'react';
import Layout from '@theme/Layout';
import SubmissionsList from '../components/Forms/list';

export default function Admin() {
  return (
    <Layout title="Admin - View Submissions">
      <div className="container margin-vert--lg">
        <h1>View Submissions</h1>
        <SubmissionsList />
      </div>
    </Layout>
  );
}