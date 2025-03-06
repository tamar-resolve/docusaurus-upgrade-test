// src/pages/contact.js
import React from 'react';
import Layout from '@theme/Layout';
import ContactForm from '../components/Forms/sample'

export default function Contact() {
  return (
    <Layout title="Contact Us">
      <div className="container margin-vert--lg">
        <h1>Contact Us</h1>
        <ContactForm />
      </div>
    </Layout>
  );
}
