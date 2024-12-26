import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const FooterContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: #1a2a2a;
  color: white;
  text-align: center;
  border-top: 2px solid #555;
  font-family: Arial, sans-serif;
`;

const FooterText = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 5px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;

  &:hover {
    color: #1a2a2a; /* Dark cyan hover effect */
    text-decoration: underline;
  }
`;

// Framer Motion Variants
const footerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

function Footer() {
  return (
    <FooterContainer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
    >
      <FooterText>© 2023 YourCompany | All Rights Reserved</FooterText>
      <FooterLinks>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/terms">Terms & Conditions</FooterLink>
        <FooterLink href="/contact">Contact Us</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
}

export default Footer;
