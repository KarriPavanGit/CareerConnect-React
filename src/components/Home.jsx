import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { Search, Work, LocationOn } from '@mui/icons-material';

// Styled Components
const HomeContainer = styled.div`
margin-top:10%;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  background-color: #f4f4f4; /* Light background */
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;

  input {
    width: 80%; /* Increased width for input */
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #1a2a2a; /* Highlight on focus */
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100px; /* Compact button width */
    padding: 10px; /* Standard padding */
    font-size: 0.9rem;
    color: white;
    background-color: #1a2a2a; /* Dark cyan button */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #123232; /* Darker hover */
    }

    svg {
      font-size: 1rem; /* Smaller icon */
    }
  }
`;


const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const JobCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const JobCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    color: #1a2a2a;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }
`;

// Framer Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Home() {
  return (
    <HomeContainer>
      <Header />
      <Content>
        <SearchBar>
          <input type="text" placeholder="Search for jobs, companies..." />
          <button>
            <Search /> Search
          </button>
        </SearchBar>
        <Title>Featured Jobs</Title>
        <JobCardsContainer>
          <JobCard variants={cardVariants} initial="hidden" animate="visible">
            <h3>
              <Work /> Software Engineer
            </h3>
            <p>Company: Tech Innovators</p>
            <p>
              <LocationOn /> New York, NY
            </p>
          </JobCard>
          <JobCard variants={cardVariants} initial="hidden" animate="visible">
            <h3>
              <Work /> Data Scientist
            </h3>
            <p>Company: Data Masters</p>
            <p>
              <LocationOn /> San Francisco, CA
            </p>
          </JobCard>
          <JobCard variants={cardVariants} initial="hidden" animate="visible">
            <h3>
              <Work /> Product Manager
            </h3>
            <p>Company: Visionary Products</p>
            <p>
              <LocationOn /> Remote
            </p>
          </JobCard>
        </JobCardsContainer>
      </Content>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
