import { Twitter, Github, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                alt="SimCasino Logo"
                className="h-10 w-auto"
                src="/sim-casino-logo.webp"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Master crypto casino strategies in a risk-free environment.
              Practice makes perfect.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <div className="space-y-2 text-sm">
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/casino/home"
              >
                Games
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/"
              >
                Features
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/"
              >
                Strategies
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/"
              >
                Analytics
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm">
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/"
              >
                About Us
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/provably-fair"
              >
                Provably Fair
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/"
              >
                Help Center
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/terms-and-conditions"
              >
                Terms of Service
              </a>
              <a
                className="block text-muted-foreground hover:text-foreground transition-colors"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold">Community</h4>
            <div className="flex gap-2">
              {/* <Button
                className="text-muted-foreground hover:text-foreground"
                size="icon"
                variant="ghost"
              >
                <Twitter className="w-4 h-4" />
              </Button> */}
              <Button
                className="text-muted-foreground hover:text-foreground"
                size="icon"
                variant="ghost"
                onClick={() =>
                  window.open('https://github.com/nimit9/plinkoo', '_blank')
                }
              >
                <Github className="w-4 h-4" />
              </Button>
              {/* <Button
                className="text-muted-foreground hover:text-foreground"
                size="icon"
                variant="ghost"
              >
                <MessageCircle className="w-4 h-4" />
              </Button> */}
            </div>
            <p className="text-xs text-muted-foreground">
              Join our community of strategy testers and learn from the best.
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 SimCasino. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* <a className="hover:text-foreground transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-foreground transition-colors" href="#">
              Cookie Policy
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
