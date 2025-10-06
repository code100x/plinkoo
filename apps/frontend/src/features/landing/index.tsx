import { HeroSection } from './hero-section';
import { FeaturedGames } from './featured-games';
import { CoreFeatures } from './core-features';
import { TransparencyFeed } from './transparency-feed';
import { Footer } from './footer';

function Landing(): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturedGames />
      <CoreFeatures />
      <TransparencyFeed />
      <Footer />
    </div>
  );
}

export default Landing;
