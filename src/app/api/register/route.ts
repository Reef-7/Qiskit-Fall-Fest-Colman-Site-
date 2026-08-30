import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create Gmail transporter - requires GMAIL_USER and GMAIL_APP_PASSWORD environment variables
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

interface RegistrationData {
  name: string;
  email: string;
  institution: string;
  level: string;
}

function generateICS(data: RegistrationData): string {
  // Set a specific event date (October 13, 2026 based on the ticket display)
  const eventDate = new Date('2026-10-13T16:00:00');
  
  const startDate = new Date(eventDate);
  startDate.setHours(16, 0, 0); // 4:00 PM
  
  const endDate = new Date(eventDate);
  endDate.setHours(20, 0, 0); // 8:00 PM
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Qiskit Fall Fest//Registration//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `UID:${Date.now()}@qiskit-fall-fest`,
    'SUMMARY:Qiskit Fall Fest - Quantum Computing Event',
    'DESCRIPTION:Join us for an exciting day of quantum computing!\\n\\nEvent Details:\\n- Gathering & Refreshments: 16:00\\n- Opening Keynote: 16:30\\n- Hands-On Quantum Workshop: 17:45\\n- Closing Remarks: 19:00\\n\\nRegistered as: ' + data.name + '\\nInstitution: ' + data.institution + '\\nLevel: ' + data.level,
    'LOCATION:The College of Management, Rishon LeZion',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Qiskit Fall Fest starts in 15 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.institution || !data.level) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate ICS calendar file
    const icsContent = generateICS(data);

    // Check if email service is configured
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('Email service not configured. Registration data:', data);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Registration successful! (Email service not configured - check logs for details)',
          emailConfigured: false
        },
        { status: 200 }
      );
    }

    // Send email with calendar attachment
    try {
      const emailResult = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: data.email,
        subject: 'Registration Confirmed: Qiskit Fall Fest 🚀',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8b5cf6, #14b8a6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
              .calendar-btn { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #14b8a6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Registration Confirmed!</h1>
                <p>You're registered for Qiskit Fall Fest</p>
              </div>
              <div class="content">
                <p>Hi <strong>${data.name}</strong>,</p>
                <p>Thank you for registering for the Qiskit Fall Fest! We're excited to have you join us for this quantum computing event.</p>
                
                <div class="event-details">
                  <h3>📅 Event Details</h3>
                  <p><strong>Date:</strong> October 13, 2026</p>
                  <p><strong>Time:</strong> 4:00 PM - 8:00 PM</p>
                  <p><strong>Location:</strong> The College of Management, Rishon LeZion</p>
                  <p><strong>Your Level:</strong> ${data.level}</p>
                  <p><strong>Institution:</strong> ${data.institution}</p>
                </div>

                <p>The calendar event for this program is attached to this email. You can add it to your calendar by opening the attachment.</p>

                <div class="footer">
                  <p>This is an automated email. Please do not reply.</p>
                  <p>© 2026 Qiskit Fall Fest</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        attachments: [
          {
            filename: 'qiskit-fall-fest-event.ics',
            content: icsContent,
          },
        ],
      });

      console.log('Email sent successfully:', emailResult.messageId);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Return success anyway since registration is complete, just note email issue
      return NextResponse.json(
        { 
          success: true, 
          message: 'Registration successful! However, there was an issue sending the confirmation email. Please check your email configuration.',
          emailError: emailError instanceof Error ? emailError.message : 'Email sending failed',
          emailConfigured: true
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful! Check your email for confirmation and calendar event.',
        emailConfigured: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}