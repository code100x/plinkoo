import { Brain, Bot, Scale, Zap } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Strategy Playground',
    description:
      'Develop and refine your manual betting strategies without any financial risk. Test different approaches and learn what works.',
    icon: Brain,
    status: 'Available',
    highlight: true,
  },
  {
    title: 'Automated Testing',
    description:
      'Get ready to automate your strategies with our upcoming bot system. Set it and forget it while testing your algorithms.',
    icon: Bot,
    status: 'Coming Soon',
    highlight: false,
  },
  {
    title: 'Provably Fair System',
    description:
      'Our games are provably fair. Every outcome is verifiable on the blockchain for complete transparency and trust.',
    icon: Scale,
    status: 'Available',
    highlight: false,
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Track your performance with detailed statistics and insights. Understand your win rates and optimize your strategies.',
    icon: Zap,
    status: 'Coming Soon',
    highlight: false,
  },
];

export function CoreFeatures(): JSX.Element {
  return (
    <section className="py-24 px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Core{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master crypto casino strategies in a
            risk-free environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(feature => {
            const IconComponent = feature.icon;
            return (
              <Card
                className={`group transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm ${
                  feature.highlight
                    ? 'border-primary/50 hover:shadow-glow hover:border-primary'
                    : 'border-border/50 hover:shadow-card hover:border-border'
                }`}
                key={feature.title}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          feature.highlight
                            ? 'bg-gradient-primary text-background'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                    <Badge
                      className={
                        feature.status === 'Available'
                          ? 'bg-success/20 text-success border-success/30'
                          : 'bg-muted text-muted-foreground'
                      }
                      variant={
                        feature.status === 'Available' ? 'default' : 'secondary'
                      }
                    >
                      {feature.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground mt-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
