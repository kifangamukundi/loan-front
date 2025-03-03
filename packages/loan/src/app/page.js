import { AboutSection, CallToAction, HeroSection, InfographicSection } from "@/layout";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 pb-20 sm:p-20">
      <HeroSection
        title="Empowering Individuals Through Smart Financing"
        description="Providing group-based loan services managed by dedicated agents to support individuals."
        linkText="Login Now"
        linkHref="/login"
        imgSrc="https://cdn.pixabay.com/photo/2019/11/23/09/25/marketing-4646598_960_720.png"
        imgAlt="Loaning company support"
      />
    </div>
  );
}
