// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';


const Dashboard = () => {
  const [userAddress, setUserAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      // Get the user's Ethereum address from MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogout = () => {
    // You can add any additional cleanup or logout logic here.
    // For simplicity, we'll just navigate back to the homepage.
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p>Welcome, {userAddress}!</p>
      <button type="button" onClick={handleLogout} style={styles.button}>
        Logout
      </button>
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
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default Dashboard;
