import React, { useEffect, useState } from 'react';
import img from '../assets/bg.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const navCreateProj = () => {
    navigate('/createproject');
  };

  const navExplore = () => {
    navigate('/projects');
  };

  return (
    <div
      className={`text-white mt-20`}
      style={{
        background: 'linear-gradient(to right, #000000, #00007F, #FFFFFF)',
        animation: `${fadeIn ? 'fade-in 1s' : ''}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div style={{ alignSelf: 'center' }}>
          <p style={{ fontSize: '6rem', textAlign: 'justify' }}>
            Find <span style={{ color: '#00007F', lineHeight: '10rem' }}>Freelancers</span>
            <br />
            for Your <span style={{ color: '#00007F', lineHeight: '10rem' }}>Pro</span> Gigs
          </p>
          <p style={{ fontSize: '1.5rem', lineHeight: '2.5rem' }}>
            Join our platform today and start finding the perfect freelancer for your projects
          </p>

          <button
            style={{
              backgroundColor: '#00007F',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              color: '#FFFFFF',
            }}
            onClick={navExplore}
          >
            explore
          </button>
          <button
            style={{
              backgroundColor: '#FFFFFF',
              fontWeight: 'bold',
              color: '#00007F',
              marginLeft: '1rem',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              marginTop: '1rem',
            }}
            onClick={navCreateProj}
          >
            create project
          </button>
        </div>
        <div>
          <img src={img} alt='' />
        </div>
      </div>
      <div
        style={{
          padding: '2rem',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'space-evenly',
          fontSize: '3rem',
          background: 'linear-gradient(to right, #000000, #009193, #FFFFFF)',
        }}
      >
        <p>2+ projects</p>
        <p>2+ freelancers</p>
        <p>3+ active users</p>
      </div>
    </div>
  );
};

export default Home;
