import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import Footer from './Footer';

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  text-align: center;
`;

const AnimatedText = styled(motion.h1)`
  color: #333;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -1px;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: 'easeOut' } },
};

const CallToAction = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const MainButton = styled(motion.button)`
  background-color: #1a2a2a;
  color: white;
  padding: 18px 35px;
  font-size: 1.2rem;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #004085;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1rem;
  }
`;

const SubHeading = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-top: 20px;
  max-width: 600px;
  margin-bottom: 20px;
  font-weight: 300;
`;

function Home() {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <>
      <Header />
      <Content>
        {/* Animated Heading */}
        <AnimatedText variants={textVariants} initial="hidden" animate="visible">
          Welcome to Your Dream Job Portal
        </AnimatedText>
        
        {/* Call to Action */}
        <CallToAction>
          <SubHeading>
            Find exciting career opportunities with top companies. Let us help you take the next step in your professional journey.
          </SubHeading>
          <MainButton
            variants={{
              hidden: { scale: 0.95 },
              visible: { scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/login')} // Corrected onClick handler
          >
            Start Your Search
          </MainButton>
        </CallToAction>
      </Content>
      <Footer />
    </>
  );
}

export default Home;
