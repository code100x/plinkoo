import Documentation from '@/components/documentation';
import BulletPoints from '@/components/documentation/bullet';
import Code from '@/components/documentation/code';
import Heading from '@/components/documentation/heading';
import Link from '@/components/documentation/link';
import Paragraph from '@/components/documentation/paragraph';
import Section from '@/components/documentation/section';

const Overview = () => {
  return (
    <Documentation>
      <Section>
        <Heading>Solving the Trust Issue with Online Gambling</Heading>
        <Paragraph>
          The underlying concept of provable fairness is that players have the
          ability to prove and verify that their results are fair and
          unmanipulated. This is achieved through the use of a{' '}
          <Link
            text="commitment scheme"
            link="https://en.wikipedia.org/wiki/Commitment_scheme"
          />
          , along with cryptographic hashing.
        </Paragraph>
        <Paragraph>
          The commitment scheme is used to ensure that the player has an
          influence on all results generated. Cryptographic hashing is used to
          ensure that the casino also remains honest to this commitment scheme.
          Both concepts combined creates a trust-less environment when gambling
          online.
        </Paragraph>
        <Paragraph>
          This is simplified in the following representation:
        </Paragraph>
        <Code>fair result = operators input (hashed) + players input</Code>
      </Section>
      <Section>
        <Heading>3rd Party Verification</Heading>
        <Paragraph>
          All games played on SimCasino can be verified both here and via 3rd
          party websites who have also open sourced the verification procedure.
          You can find them via a google search, or simply check out some of
          these:
        </Paragraph>
        <BulletPoints
          bulletPoints={[
            <Link
              link="https://www.provablyfair.me"
              text="https://www.provablyfair.me"
            />,
          ]}
        />
      </Section>
    </Documentation>
  );
};

export default Overview;
