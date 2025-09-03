import { NextApiRequest, NextApiResponse } from 'next';
import { QuoteSubmission } from '@/types/quote';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const data: QuoteSubmission = req.body;

        // Basic validation
        if (!data.clientInfo.name || !data.clientInfo.email) {
            return res.status(400).json({ 
                message: 'Name and email are required' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.clientInfo.email)) {
            return res.status(400).json({ 
                message: 'Invalid email format' 
            });
        }

        // Log the submission (in a real app, you'd save to database)
        console.log('Quote submission received:', {
            timestamp: data.timestamp,
            clientName: data.clientInfo.name,
            clientEmail: data.clientInfo.email,
            totalPrice: data.totalPrice,
            currency: data.currency,
            selectedFeatures: data.selectedFeatures.length,
            sectionCount: data.sectionCount
        });

        // Simulate processing time
        setTimeout(() => {
            // In a real application, you would:
            // 1. Save to database
            // 2. Send email notification
            // 3. Add to CRM system
            // 4. Send confirmation email to client
            
            res.status(200).json({ 
                success: true,
                message: 'Quote submitted successfully',
                quoteId: `QUOTE-${Date.now()}` // Generate a quote ID
            });
        }, 1000);

    } catch (error) {
        console.error('Error processing quote submission:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
}
