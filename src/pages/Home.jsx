/**
 * Home Page
 * Main landing page that assembles all components
 * Contains Header, Hero Section, and Footer
 */

import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

