import Documentation from '@/components/documentation';
import BulletPoints from '@/components/documentation/bullet';
import Code from '@/components/documentation/code';
import Heading from '@/components/documentation/heading';
import Link from '@/components/documentation/link';
import Paragraph from '@/components/documentation/paragraph';
import Section from '@/components/documentation/section';

const GameEvents = () => {
  return (
    <Documentation>
      <Section>
        <Paragraph>
          Game events are translation of the randomly generated floats into a
          relatable outcome that is game specific. This includes anything from
          the outcome of a dice roll to the order of the cards in a deck, or
          even the location of every bomb in a game of mines.
        </Paragraph>
        <Paragraph>
          Below is a detailed explanation as to how we translate floats into
          events for each particular different game on our platform.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Blackjack</Heading>
        <Paragraph>
          In a standard deck of cards, there are 52 unique possible outcomes.
          When it comes to playing Blackjack on our platform, we utilise an
          unlimited amount of decks when generating the game event, and
          therefore each turn of a card always has the same probability. To
          calculate this, we multiply each randomly generated float by 52, and
          then translate that result into a particular card, based on the
          following index:
        </Paragraph>
        <Code>
          // Index of 0 to 51 : ♦2 to ♣A <br />
          const CARDS = [ <br />
          <p className="pl-4">
            ♦2, ♥2, ♠2, ♣2, ♦3, ♥3, ♠3, ♣3, ♦4, ♥4, <br />
            ♠4, ♣4, ♦5, ♥5, ♠5, ♣5, ♦6, ♥6, ♠6, ♣6,
            <br />
            ♦7, ♥7, ♠7, ♣7, ♦8, ♥8, ♠8, ♣8, ♦9, ♥9,
            <br /> ♠9, ♣9, ♦10, ♥10, ♠10, ♣10, ♦J, ♥J, ♠J,
            <br />
            ♣J, ♦Q, ♥Q, ♠Q, ♣Q, ♦K, ♥K, ♠K, ♣K, ♦A, <br />
            ♥A, ♠A, ♣A
          </p>
          ]; <br />
          <br /> // Game event translation <br />
          const card = CARDS[Math.floor(float * 52)];
        </Code>
        <Paragraph>
          There is a cursor of 13 to generate 52 possible game events for cases
          where a large amount of cards are required to be dealt to the player
        </Paragraph>
      </Section>
      <Section>
        <Heading>Dice Roll</Heading>
        <Paragraph>
          In our version of dice, we cover a possible roll spread of 00.00 to
          100.00, which has a range of 10,001 possible outcomes. The game event
          translation is done by multiplying the float by number of possible
          outcomes and then dividing by 100 so that the resulting number fits
          the constraints of our stated dice range.
        </Paragraph>
        <Code>
          // Game event translation <br />
          const roll = (float * 10001) / 100;
        </Code>
      </Section>
      <Section>
        <Heading>Roulette Roll</Heading>
        <Paragraph>
          Our Roulette is derived from the European version of the game where
          the wheel consists of 37 possible different pockets, ranging from 0 to
          36. The game event is calculated by multiplying the float by 37 and
          then translated into a corresponding pocket using the following index:
        </Paragraph>
        <Code>
          // Index of 0 to 36
          <br />
          const POCKETS = [
          <br />
          <p className="pl-4">
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, <br />
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            <br />
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            <br /> 30, 31, 32, 33, 34, 35, 36
          </p>
          ]; <br />
          <br /> // Game event translation <br />
          const pocket = POCKETS[Math.floor(float * 37)];
        </Code>
      </Section>
      <Section>
        <Heading>Keno</Heading>
        <Paragraph>
          Traditional Keno games require the selection of 10 possible game
          events in the form of hits on a board. To achieve this, we multiply
          each float by the number of possible unique squares that exist. Once a
          hit has been placed, it cannot be chosen again, which changes the pool
          size of the possible outcomes. This is done by subtracting the size of
          possible maximum outcomes by 1 for each iteration of game event result
          generated using the corresponding float provided, using the following
          index:
        </Paragraph>
        <Code>
          // Index of 0 to 39 : 1 to 40
          <br />
          const SQUARES = [
          <br />
          <p className="pl-4">
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            <br />
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            <br />
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            <br />
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40
          </p>
          ];
          <br />
          <br />
          // Game event translation
          <br />
          const hit = SQUARES[Math.floor(float * 40)];
        </Code>
        <Paragraph>
          The fisher-yates shuffle implementation is utilised to prevent
          duplicate possible hits being generated.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Mines</Heading>
        <Paragraph>
          A mine game is generated with 24 separate game events, in the form of
          mines on the board. Each float is multiplied by the number of possible
          unique tiles still remaining on the board. This is done by subtracting
          the number of tiles remaining by 1 for each iteration of game event
          result generated using the corresponding float provided. The location
          of the mine is plotted using a grid position from left to right, top
          to bottom.
        </Paragraph>
        <Paragraph>
          The fisher-yates shuffle implementation is utilised to prevent
          duplicate possible hits being generated. Between 1 and 24 game event
          results are used, based on the settings chosen.
        </Paragraph>
      </Section>
    </Documentation>
  );
};

export default GameEvents;
