import Documentation from '@/components/documentation';
import Heading from '@/components/documentation/heading';
import Paragraph from '@/components/documentation/paragraph';
import Section from '@/components/documentation/section';
import { Header } from '@/components/Header';

function TermsAndConditions(): JSX.Element {
  return (
    <>
      <Header openLoginModal={false} />
      <div className="container py-6">
        <Documentation>
          <Section>
            <Heading>Terms and Conditions</Heading>
            <Paragraph>Last updated: September 27, 2025</Paragraph>
          </Section>
          <Section>
            <Heading>1. Introduction</Heading>
            <Paragraph>
              Welcome to SimCasino.club ("we", "us", "our"). These Terms and
              Conditions govern your use of our website and services. By
              accessing or using our service, you agree to be bound by these
              terms. If you disagree with any part of the terms, you may not
              access the service.
            </Paragraph>
          </Section>
          <Section>
            <Heading>2. Use of Service</Heading>
            <Paragraph>
              SimCasino.club provides a simulated gambling environment for
              entertainment and educational purposes only. No real money is
              involved in any of the games. You are provided with "play money"
              that has no real-world value.
            </Paragraph>
            <Paragraph>
              You must be at least 18 years old or of legal age for gambling in
              your jurisdiction to use our service.
            </Paragraph>
          </Section>
          <Section>
            <Heading>3. User Accounts</Heading>
            <Paragraph>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our service.
            </Paragraph>
            <Paragraph>
              You are responsible for safeguarding the password that you use to
              access the service and for any activities or actions under your
              password.
            </Paragraph>
          </Section>
          <Section>
            <Heading>4. Intellectual Property</Heading>
            <Paragraph>
              The service and its original content, features, and functionality
              are and will remain the exclusive property of SimCasino.club and
              its licensors.
            </Paragraph>
          </Section>
          <Section>
            <Heading>5. Limitation of Liability</Heading>
            <Paragraph>
              In no event shall SimCasino.club, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the service.
            </Paragraph>
          </Section>
          <Section>
            <Heading>6. Governing Law</Heading>
            <Paragraph>
              These Terms shall be governed and construed in accordance with the
              laws, without regard to its conflict of law provisions.
            </Paragraph>
          </Section>
          <Section>
            <Heading>7. Changes to Terms</Heading>
            <Paragraph>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide at least 30 days' notice
              prior to any new terms taking effect.
            </Paragraph>
          </Section>
          <Section>
            <Heading>8. Contact Us</Heading>
            <Paragraph>
              If you have any questions about these Terms, please contact us at
              support@simcasino.club.
            </Paragraph>
          </Section>
        </Documentation>
      </div>
    </>
  );
}

export default TermsAndConditions;
