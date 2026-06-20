import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/landing/Hero'
import EnvironmentalImpact from '../components/landing/EnvironmentalImpact'
import Features from '../components/landing/Features'
import DashboardStats from '../components/dashboard/DashboardStats'
import FutureScope from '../components/landing/FutureScope'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07130D]">
      <Navbar />
      <main>
        <Hero />
        <EnvironmentalImpact />
        <DashboardStats />
        <Features />
        <FutureScope />
      </main>
      <Footer />
    </div>
  )
}
