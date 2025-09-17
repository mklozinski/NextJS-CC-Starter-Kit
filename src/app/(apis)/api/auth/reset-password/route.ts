import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import bcrypt from "bcryptjs"
import { PasswordResetSuccessEmail } from "@/components/emails/PasswordResetSuccess"

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const remoteAddr = request.headers.get("x-remote-addr")
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (remoteAddr) {
    return remoteAddr
  }
  
  return "Unknown"
}

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    // Get client IP address
    const clientIP = getClientIP(request)

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    })

    // Send confirmation email
    try {
      const loginUrl = `${process.env.NEXTAUTH_URL}/login`
      
      await resend.emails.send({
        from: `${process.env.EMAIL_NAME} <${process.env.FROM_EMAIL}>`,
        to: user.email,
        subject: "Password Reset Successful",
        react: PasswordResetSuccessEmail({ 
          userEmail: user.email,
          loginUrl,
          ipAddress: clientIP,
          resetTime: new Date().toLocaleString()
        })
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the request if email fails, but log it
    }

    // Log the password reset for security monitoring
    console.log(`Password reset successful for user ${user.email} from IP ${clientIP} at ${new Date().toISOString()}`)

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 