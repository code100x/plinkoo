import Documentation from '@/components/documentation';
import Code from '@/components/documentation/code';
import Heading from '@/components/documentation/heading';
import Link from '@/components/documentation/link';
import Paragraph from '@/components/documentation/paragraph';
import Section from '@/components/documentation/section';
import { Link as RouterLink } from '@tanstack/react-router';

const Overview = () => {
  return (
    <div className="p-1 flex flex-col gap-2 pb-3">
      <Documentation>
        <Section>
          <Heading className="text-sm">
            Solving the Trust Issue with Online Gambling
          </Heading>
          <Paragraph className="text-xs">
            The underlying concept of provable fairness is that players have the
            ability to prove and verify that their results are fair and
            unmanipulated. This is achieved through the use of a{' '}
            <Link
              text="commitment scheme"
              link="https://en.wikipedia.org/wiki/Commitment_scheme"
              className="text-xs"
            />
            , along with cryptographic hashing.
          </Paragraph>
          <Paragraph className="text-xs">
            The commitment scheme is used to ensure that the player has an
            influence on all results generated. Cryptographic hashing is used to
            ensure that the casino also remains honest to this commitment
            scheme. Both concepts combined creates a trust-less environment when
            gambling online.
          </Paragraph>
          <Paragraph className="text-xs">
            This is simplified in the following representation:
          </Paragraph>
          <Code className="text-xs">
            fair result = operators input (hashed) + players input
          </Code>
        </Section>
      </Documentation>
      <div className="w-full px-2 text-center font-medium text-neutral-weak hover:text-neutral-default text-sm">
        <RouterLink to="/provably-fair/overview" target="_blank">
          Learn more
        </RouterLink>
      </div>
    </div>
  );
};

export default Overview;
