import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { faceImage, idImage } = body;
    
    // Basic validation
    if (!faceImage || !idImage) {
      return NextResponse.json({
        success: false,
        message: 'Both face image and ID image are required for verification'
      }, { status: 400 });
    }

    // Validate image format (basic check)
    if (!faceImage.startsWith('data:image/') || !idImage.startsWith('data:image/')) {
      return NextResponse.json({
        success: false,
        message: 'Invalid image format. Please provide valid base64 images.'
      }, { status: 400 });
    }

    // Simulate processing time (2-3 seconds for realistic feel)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // MOCK face matching logic — replace with real API later
    // In production, integrate with AWS Rekognition, Azure Face API, etc.
    const match = Math.random() > 0.25; // 75% match chance for demo
    const confidence = match ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 20;
    
    if (match) {
      return NextResponse.json({
        success: true,
        message: `✅ Identity verification successful! Face matches ID document with ${confidence}% confidence.`,
        confidence: confidence,
        verificationId: `verify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `❌ Verification failed. Face does not match ID document (${confidence}% confidence).`,
        confidence: confidence,
        suggestions: [
          'Ensure good lighting conditions',
          'Face the camera directly',
          'Remove glasses or headwear if possible',
          'Use a clear, high-quality ID document image',
          'Make sure your face is clearly visible'
        ],
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Face verification API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred during verification process. Please try again.'
    }, { status: 500 });
  }
}

// Handle GET requests for API health check
export async function GET() {
  return NextResponse.json({
    status: 'Face Verification API is running',
    version: '1.0.0',
    description: 'Biometric face verification service for voter authentication',
    endpoints: {
      POST: 'Verify face against ID document'
    },
    timestamp: new Date().toISOString()
  });
}
