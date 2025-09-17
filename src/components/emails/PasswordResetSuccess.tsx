import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import EmailHeader from "@/components/emails/ui/Header";
import EmailFooter from "@/components/emails/ui/Footer";

interface PasswordResetSuccessEmailProps {
  userEmail: string
  loginUrl?: string
  ipAddress?: string
  resetTime?: string
}

export function PasswordResetSuccessEmail({ 
  userEmail, 
  loginUrl = "http://localhost:3000/login",
  ipAddress = "Unknown",
  resetTime
}: PasswordResetSuccessEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your password has been reset successfully</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-5 pb-12">
            <EmailHeader />
            
            <Section className="bg-white rounded-lg shadow-sm mx-auto max-w-md p-12">
              <Heading className="text-3xl font-bold text-gray-900 text-center mb-8">
                Password Reset Successful
              </Heading>
              
              <Text className="text-base text-gray-700 mb-4">
                Hello,
              </Text>
              
              <Text className="text-base text-gray-700 mb-4">
                Your password for {userEmail} has been successfully reset.
              </Text>
              
              <Text className="text-base text-gray-700 mb-4">
                You can now sign in to your account using your new password.
              </Text>
              
              <Section className="text-center my-8">
                <Button
                  href={loginUrl}
                  className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg no-underline inline-block"
                >
                  Sign In to Your Account
                </Button>
              </Section>
              
              {/* Security Information */}
              <Section className="bg-gray-50 rounded-lg p-4 my-6">
                <Text className="text-sm font-semibold text-gray-900 mb-2">
                  Security Information:
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                  <strong>IP Address:</strong> {ipAddress}
                </Text>
                {resetTime && (
                  <Text className="text-sm text-gray-600 mb-1">
                    <strong>Reset Time:</strong> {resetTime}
                  </Text>
                )}
              </Section>
              
              <Text className="text-base text-gray-700 mb-4">
                If you did not reset your password, please contact our support team immediately 
                as your account may have been compromised.
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