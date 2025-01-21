import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, message };
      const response = await axios.post('https://your-api-endpoint.com/contact', data);
      if (response.status === 200) {
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      toast.error('Failed to send the message. Please try again.');
      console.error('Error submitting the form', error);
    }
  };

  return (
    <div style={styles.contactContainer}>
      <ToastContainer />
      <Header />
      <h1 style={styles.contactTitle}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={styles.contactForm}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.contactInput}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.contactInput}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.contactTextarea}
        />
        <button type="submit" style={styles.contactButton}>
          Send Message
        </button>
      </form>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          input,
          textarea,
          button {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  contactContainer: {
    padding: '90px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    width: '100vw',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    minHeight: '100vh',
  },
  contactTitle: {
    marginBottom: '20px',
    color: '#1a2a2a',
    fontSize: '2.5rem',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    margin: '20px auto',
  },
  contactInput: {
    margin: '10px 0',
    padding: '12px',
    border: '1px solid black',
    borderRadius: '5px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  contactTextarea: {
    margin: '10px 0',
    padding: '12px',
    border: '1px solid black',
    borderRadius: '5px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    height: '100px',
  },
  contactButton: {
    margin: '20px 0',
    backgroundColor: '#1a2a2a',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Contact;
