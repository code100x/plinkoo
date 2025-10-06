import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function HeroSection(): JSX.Element {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left floating card */}
        <div className="absolute top-20 left-10 md:left-20 animate-float">
          <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-lg p-4 rotate-12 hover-scale">
            <div className="text-primary text-2xl mb-2">🎲</div>
            <div className="text-sm text-muted-foreground">Risk Free</div>
          </div>
        </div>

        {/* Top right floating card */}
        <div className="absolute top-32 right-10 md:right-20 animate-float delay-500">
          <div className="bg-card/20 backdrop-blur-sm border border-accent-purple/20 rounded-lg p-4 -rotate-12 hover-scale">
            <div className="text-accent-purple text-2xl mb-2">📈</div>
            <div className="text-sm text-muted-foreground">Strategy Test</div>
          </div>
        </div>

        {/* Bottom left floating card */}
        <div className="absolute bottom-32 left-16 md:left-32 animate-float delay-1000">
          <div className="bg-card/20 backdrop-blur-sm border border-success/20 rounded-lg p-4 rotate-6 hover-scale">
            <div className="text-success text-2xl mb-2">⚡</div>
            <div className="text-sm text-muted-foreground">Instant Play</div>
          </div>
        </div>

        {/* Bottom right floating card */}
        <div className="absolute bottom-40 right-16 md:right-32 animate-float delay-700">
          <div className="bg-card/20 backdrop-blur-sm border border-primary/20 rounded-lg p-4 -rotate-6 hover-scale">
            <div className="text-primary text-2xl mb-2">🎯</div>
            <div className="text-sm text-muted-foreground">Zero Risk</div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-accent-purple/20 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-success/40 rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Trust indicators above headline */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">100% Safe</span>
          </div>
          <div className="flex items-center gap-2 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-accent-purple/20">
            <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse delay-300" />
            <span className="text-sm text-muted-foreground">Provably Fair</span>
          </div>
          <div className="flex items-center gap-2 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-500" />
            <span className="text-sm text-muted-foreground">
              Stake-like UI
            </span>
          </div>
          {/* <div className="flex items-center gap-2 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-500" />
            <span className="text-sm text-muted-foreground">
              No Registration
            </span>
          </div> */}
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in">
            Test Your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Strategy
            </span>
            .
            <br />
            Not Your Wallet.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
            A risk-free platform to test your crypto casino strategies on real
            games with fake money.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in delay-300">
          <Button
            className="group"
            onClick={() => {
              void navigate({ to: '/casino' });
            }}
            size="xl"
            variant="hero"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Playing for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Enhanced stats section */}
        <div className="pt-12 animate-fade-in delay-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            <div className="space-y-2 group hover-scale">
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                10K+
              </div>
              <div className="text-muted-foreground">Strategies Tested</div>
            </div>
            <div className="space-y-2 group hover-scale">
              <div className="text-3xl font-bold text-accent-purple group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-muted-foreground">Always Available</div>
            </div>
            <div className="space-y-2 group hover-scale">
              <div className="text-3xl font-bold text-success group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-muted-foreground">Provably Fair</div>
            </div>
          </div>

          {/* Quick feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Unlimited Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-accent-purple rounded-full" />
              <span>Real Game Mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full" />
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-success/3 rounded-full blur-2xl animate-pulse delay-500 -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}
