// 'use client';

import Navigation from "@/app/components/layout/Navigation";
import Hero from "./_components/Hero";
import TrustStrip from "./_components/TrustStrip";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import CtaBand from "./_components/CtaBand";
import Footer from "@/app/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <CtaBand />
      <Footer />
    </>
  );
}
