import './App.css'
import Navbar from './components/navbar/Navbar'
import HeroSection from './components/hero/HeroSection'
import StatsSection from './components/stats/StatsSection'
import CommunityFeatures from './components/community/CommunityFeatures'
import ResourcesSection from './components/resource/ResourcesSection'
import CTAAndFooter from './components/footer/CTAAndFooter'

function App() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16"> {/* Add padding to account for fixed navbar */}
        <HeroSection />
        <StatsSection />
        <CommunityFeatures />
        <ResourcesSection />
        <CTAAndFooter />
      </main>
    </div>
  )
}

export default App
