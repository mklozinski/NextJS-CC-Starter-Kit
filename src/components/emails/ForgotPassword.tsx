import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import EmailHeader from "@/components/emails/ui/Header";
import EmailFooter from "@/components/emails/ui/Footer";

interface ForgotPasswordEmailProps {
  resetUrl: string
  userEmail: string
}

export function ForgotPasswordEmail({ resetUrl, userEmail }: ForgotPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-5 pb-12">
            <EmailHeader />
            
            <Section className="bg-white rounded-lg shadow-sm mx-auto max-w-md p-12">
              <Heading className="text-3xl font-bold text-gray-900 text-center mb-8">
                Password Reset Request
              </Heading>
              
              <Text className="text-base text-gray-700 mb-4">
                Hello,
              </Text>
              
              <Text className="text-base text-gray-700 mb-4">
                We received a request to reset the password for your account ({userEmail}). 
                If you made this request, click the button below to reset your password:
              </Text>
              
              <Section className="text-center my-8">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg no-underline inline-block"
                >
                  Reset Password
                </Button>
              </Section>
              
              <Text className="text-base text-gray-700 mb-4">
                This link will expire in 1 hour for security reasons.
              </Text>
              
              <Text className="text-base text-gray-700 mb-4">
                If you didn&apos;t request a password reset, you can safely ignore this email. 
                Your password will not be changed.
              </Text>
              
              <Text className="text-base text-gray-700 mb-4">
                If the button above doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              
              <Text className="text-sm text-gray-600 mb-4 break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>
              
              <Text className="text-sm text-gray-500 mt-8">
                Best regards,<br />
                The Team
              </Text>
            </Section>
            
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 