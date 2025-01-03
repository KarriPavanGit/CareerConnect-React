import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const HeaderWrapper = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #1a2a2a; /* Dark cyan */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 20px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
`;

const NavButton = styled(Link)`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: #1a2a2a;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #1a2a2a;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

// Motion Variants for Animations
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Header = () => {
  return (
    <HeaderWrapper
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <Title>Career Connect</Title>
      <ButtonContainer>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/about">About</NavButton>
        <NavButton to="/login">Login</NavButton>
        <NavButton to="/studentregister">Register</NavButton>
        <NavButton to="/contact">Contact</NavButton>
      </ButtonContainer>
    </HeaderWrapper>
  );
};

export default Header;
