import Navbar from '../components/navbar/Navbar'
import HeroSection from '../components/hero/HeroSection'
import StatsSection from '../components/stats/StatsSection'
import CommunityFeatures from '../components/community/CommunityFeatures'
import ResourcesSection from '../components/resource/ResourcesSection'
import CTAAndFooter from '../components/footer/CTAAndFooter'
import Team from '../components/team/Team'

const Home = () => {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-16">
          <HeroSection />
          <StatsSection />
          <CommunityFeatures />
          <ResourcesSection />
          <Team />
          <CTAAndFooter />
        </main>
      </div>
    )
  }
  
  export default Home