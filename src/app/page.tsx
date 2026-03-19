import HeroSection from "@/components/home/HeroSection"
import TechStackSection from "@/components/home/TechStackSection"
import PortfolioSection from "@/components/home/PortfolioSection"
import LatestArticles from "@/components/home/LatestArticles"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <PortfolioSection />
      <LatestArticles />
    </>
  )
}
