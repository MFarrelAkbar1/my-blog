import HeroSection from "@/components/home/HeroSection"
import ProfilePanel from "@/components/home/ProfilePanel"
import LatestPostPanel from "@/components/home/LatestPostPanel"
import TechStackSection from "@/components/home/TechStackSection"
import ExperienceSection from "@/components/home/ExperienceSection"
import PortfolioSection from "@/components/home/PortfolioSection"
import CertificatesSection from "@/components/home/CertificatesSection"
import LatestArticles from "@/components/home/LatestArticles"

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Di bawah hero background makin redup supaya panel tetap terbaca */}
      <div className="below-hero">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2">
            <ProfilePanel />
            <LatestPostPanel />
          </div>
        </div>

        <PortfolioSection />
        <TechStackSection />
        <ExperienceSection />
        <CertificatesSection />
        <LatestArticles />
      </div>
    </>
  )
}
