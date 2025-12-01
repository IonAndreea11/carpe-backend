// import { useState } from 'react';
import MyCarousel from "../components/Carousel";
import CardSection from "../components/CardSection";
import AboutSection from "../components/AboutSection";
import HelpSection from "../components/HelpSection";
import AdoptCarousel from "../components/AdoptionSection";

function Home() {
  return (
    <div>
      <MyCarousel />
      <AboutSection />
      <CardSection />
      <AdoptCarousel />
      <HelpSection />
    </div>
  );
}

export default Home;
