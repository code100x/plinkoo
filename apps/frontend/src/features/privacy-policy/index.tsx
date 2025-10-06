import Documentation from '@/components/documentation';
import BulletPoints from '@/components/documentation/bullet';
import Heading from '@/components/documentation/heading';
import Paragraph from '@/components/documentation/paragraph';
import Section from '@/components/documentation/section';
import { Header } from '@/components/Header';

function PrivacyPolicy(): JSX.Element {
  return (
    <>
      <Header openLoginModal={false} />
      <div className="container py-6">
        <Documentation>
          <Section>
            <Heading>Privacy Policy</Heading>
            <Paragraph>Last updated: September 27, 2025</Paragraph>
          </Section>
          <Section>
            <Heading>1. Introduction</Heading>
            <Paragraph>
              Welcome to SimCasino.club ("we", "us", "our"). We are committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our service.
            </Paragraph>
          </Section>
          <Section>
            <Heading>2. Information We Collect</Heading>
            <Paragraph>
              We may collect information about you in a variety of ways. The
              information we may collect on the Service includes:
            </Paragraph>
            <BulletPoints
              bulletPoints={[
                <Paragraph>
                  <strong>Personal Data:</strong> Personally identifiable
                  information, such as your name, email address, and profile
                  picture, that you voluntarily give to us when you register
                  with the Service (e.g., via Google OAuth).
                </Paragraph>,
                <Paragraph>
                  <strong>Derivative Data:</strong> Information our servers
                  automatically collect when you access the Service, such as
                  your IP address, your browser type, your operating system,
                  your access times, and the pages you have viewed directly
                  before and after accessing the Service.
                </Paragraph>,
                <Paragraph>
                  <strong>Usage Data:</strong> We collect data related to your
                  gameplay, such as bets placed, games played, and strategies
                  tested. This data is used to provide you with statistics and
                  is not shared with third parties.
                </Paragraph>,
              ]}
            />
          </Section>
          <Section>
            <Heading>3. Use of Your Information</Heading>
            <Paragraph>
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the Service to:
            </Paragraph>
            <BulletPoints
              bulletPoints={[
                <Paragraph>Create and manage your account</Paragraph>,
                <Paragraph>
                  Compile anonymous statistical data and analysis for use
                  internally.
                </Paragraph>,
                <Paragraph>
                  Monitor and analyze usage and trends to improve your
                  experience with the Service.
                </Paragraph>,
                <Paragraph>
                  Provide and deliver the products and services you request
                </Paragraph>,
              ]}
            />
          </Section>
          <Section>
            <Heading>4. Disclosure of Your Information</Heading>
            <Paragraph>
              We do not share, sell, rent or trade your personal information
              with any third parties for their commercial purposes.
            </Paragraph>
          </Section>
          <Section>
            <Heading>5. Security of Your Information</Heading>
            <Paragraph>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable.
            </Paragraph>
          </Section>
          <Section>
            <Heading>6. Policy for Children</Heading>
            <Paragraph>
              We do not knowingly solicit information from or market to children
              under the age of 18. If you become aware of any data we have
              collected from children under age 18, please contact us using the
              contact information provided below.
            </Paragraph>
          </Section>
          <Section>
            <Heading>7. Changes to This Privacy Policy</Heading>
            <Paragraph>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </Paragraph>
          </Section>
          <Section>
            <Heading>8. Contact Us</Heading>
            <Paragraph>
              If you have any questions about this Privacy Policy, please
              contact us at [your-contact-email@example.com].
            </Paragraph>
          </Section>
        </Documentation>
      </div>
    </>
  );
}

export default PrivacyPolicy;
