// src/components/Homepage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';


const Homepage = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkMetamask();
  }, []);

  const checkMetamask = async () => {
    if (window.ethereum) {
      try {
        // Connect to MetaMask
        await window.ethereum.enable();
        setIsMetamaskInstalled(true);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask not found. Please install it to proceed.');
    }
  };

  const handleLogin = async () => {
    try {
      // Get the user's Ethereum address from MetaMask
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // In a real-world scenario, you would perform additional checks or authentication with the Ethereum address.
      // For simplicity, let's assume the login is successful and redirect to another page.
      navigate('./dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Plant Ecommerce Web3</h1>
      {isMetamaskInstalled ? (
        <button type="button" onClick={handleLogin} style={styles.button}>
          Connect with MetaMask
        </button>
      ) : (
        <p>Please install MetaMask to proceed.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Homepage;
