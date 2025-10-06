import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface GameResult {
  id: string;
  game: string;
  result: string;
  outcome: 'win' | 'loss';
  multiplier?: string;
  timestamp: string;
}

const generateMockResult = (): GameResult => {
  const games = ['Crash', 'Plinko', 'Dice'];
  const game = games[Math.floor(Math.random() * games.length)];
  const isWin = Math.random() > 0.52; // Slightly house-favored

  let result = '';
  let multiplier = '';

  if (game === 'Crash') {
    const crashPoint = (Math.random() * 10 + 1).toFixed(2);
    result = `${crashPoint}x`;
    multiplier = isWin
      ? `+${(Math.random() * 5 + 1).toFixed(2)}x`
      : `-${(Math.random() * 2 + 0.5).toFixed(2)}x`;
  } else if (game === 'Plinko') {
    const slot = Math.floor(Math.random() * 16);
    result = `Slot ${slot}`;
    multiplier = isWin
      ? `+${(Math.random() * 3 + 0.5).toFixed(2)}x`
      : `-${(Number(Math.random()) + 0.5).toFixed(2)}x`;
  } else {
    const roll = Math.floor(Math.random() * 100);
    result = `${roll}`;
    multiplier = isWin
      ? `+${(Math.random() * 2 + 0.5).toFixed(2)}x`
      : `-${(Number(Math.random()) + 0.5).toFixed(2)}x`;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    game,
    result,
    outcome: isWin ? 'win' : 'loss',
    multiplier,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export function TransparencyFeed(): JSX.Element {
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    // Initialize with some results
    const initialResults = Array.from({ length: 8 }, generateMockResult);
    setResults(initialResults);

    // Add new results every 3-6 seconds
    const interval = setInterval(
      () => {
        const newResult = generateMockResult();
        setResults(prev => [newResult, ...prev.slice(0, 7)]);
      },
      Math.random() * 3000 + 3000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const winCount = results.filter(r => r.outcome === 'win').length;
  const lossCount = results.filter(r => r.outcome === 'loss').length;
  const winRate =
    results.length > 0 ? ((winCount / results.length) * 100).toFixed(1) : '0';

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Real Outcomes. <span className="text-success">Unfiltered</span>{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Transparency
            </span>
            .
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch live game results as they happen. Every outcome is recorded
            and verifiable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Platform Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm">Player Wins</span>
                  </div>
                  <Badge
                    className="text-success border-success/30"
                    variant="outline"
                  >
                    {winCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-destructive" />
                    <span className="text-sm">House Wins</span>
                  </div>
                  <Badge
                    className="text-destructive border-destructive/30"
                    variant="outline"
                  >
                    {lossCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm">Win Rate</span>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {winRate}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Feed */}
          <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    Live Game Results
                  </CardTitle>
                  <CardDescription>
                    Real-time feed of recent game outcomes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Game</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map(result => (
                    <TableRow
                      className="border-border/50 hover:bg-muted/20"
                      key={result.id}
                    >
                      <TableCell className="font-medium">
                        {result.game}
                      </TableCell>
                      <TableCell className="font-mono">
                        {result.result}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {result.outcome === 'win' ? (
                            <TrendingUp className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          )}
                          <span
                            className={
                              result.outcome === 'win'
                                ? 'text-success'
                                : 'text-destructive'
                            }
                          >
                            {result.multiplier}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {result.timestamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
