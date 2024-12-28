import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  const aboutContainerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  };

  const aboutContentStyle = {
    textAlign: 'center',
    marginTop: '30px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#2c3e50',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#34495e',
    margin: '15px 0',
    lineHeight: '1.6',
  };

  const subHeadingStyle = {
    fontSize: '1.8rem',
    color: '#2980b9',
    marginTop: '30px',
  };

  const imageStyle = {
    marginTop: '40px',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  };

  return (
    <div>
      <Header />
      <section style={aboutContentStyle}>
        <h2 style={headingStyle}>About Career Connect</h2>
        <p style={paragraphStyle}>
          Career Connect is an innovative platform designed to connect job seekers with
          employers from diverse industries. Our mission is to bridge the gap between
          talent and opportunity by providing a user-friendly, efficient, and effective
          space for both employers and job seekers.
        </p>
        <h3 style={subHeadingStyle}>Our Mission</h3>
        <p style={paragraphStyle}>
          At Career Connect, we are committed to empowering job seekers by giving them
          the tools they need to succeed. Whether you're just starting your career or
          looking to take the next step, we offer a range of resources, job postings,
          and guidance to help you land your dream job.
        </p>
        <h3 style={subHeadingStyle}>For Employers</h3>
        <p style={paragraphStyle}>
          For employers, Career Connect offers a platform to discover skilled professionals
          who are ready to contribute to your company's growth. Our easy-to-use interface
          allows companies to post job openings, browse resumes, and connect with potential
          hires all in one place.
        </p>
        <div style={imageStyle}>
          <img src="path/to/your/image.jpg" alt="Career Connect" />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
