# Cheengu Website

Official website for Cheengu - an SMS-based accountability system using real financial stakes and human verification.

## Purpose

This website is designed to pass Twilio's toll-free number verification requirements by demonstrating that Cheengu is a legitimate business with a clear service offering, proper compliance pages, and professional presentation.

## Site Structure

- `index.html` - Homepage explaining what Cheengu is and why it works
- `how-it-works.html` - Detailed explanation of the SMS check-in and verification system
- `contact.html` - Business contact information
- `privacy.html` - Privacy policy covering SMS and payment data handling
- `terms.html` - Terms of service for the commitment system
- `pay.html` - Payment page for staking commitments (requires backend integration)

## Deployment

### Deploy to Vercel

1. Push this repository to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with default settings (no build step needed for static HTML)

### Required Updates Before Going Live

1. **Update Stripe Key in pay.html**
   - Line 161: Replace `'pk_test_YOUR_KEY_HERE'` with your actual Stripe publishable key

2. **Set up Backend API**
   - The payment page requires a `/api/payment-intent/:id` endpoint
   - This should be hosted on your Render backend
   - See the "Backend Integration" section below

3. **Configure vercel.json for API Proxy**
   - Add `vercel.json` to proxy API calls to your Render backend
   - See example in this README

### Backend Integration

Your Render backend needs this endpoint:

```javascript
app.get('/api/payment-intent/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    res.status(400).json({ error: error.message });
  }
});
```

### Vercel Configuration

Create `vercel.json` in the root directory:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-render-app.onrender.com/api/:path*"
    }
  ]
}
```

Replace `your-render-app.onrender.com` with your actual Render backend URL.

## Twilio Toll-Free Verification

When submitting for Twilio verification, provide:

- **Website URL**: Your deployed Vercel URL (e.g., cheengu-site.vercel.app or cheengu.com)
- **Business Purpose**: "SMS-based accountability system for goal completion tracking"
- **Use Case**: "Automated check-ins and notifications for commitment tracking"
- **Message Volume**: Start with conservative estimate (e.g., "100-500 messages/day")

### What Twilio Looks For

✅ Professional website with clear business purpose  
✅ Privacy policy explaining SMS data handling  
✅ Terms of service  
✅ Valid contact information  
✅ Legitimate business address  
✅ Explanation of SMS use case  

### Tips for Approval

- Make sure the site is fully deployed and accessible before submitting
- Ensure all links work (nav, footer, etc.)
- Double-check that privacy and terms pages load properly
- Use your actual domain (cheengu.com) if you have it set up, not just the Vercel subdomain

## Business Information

- **Business Name**: Cheengu
- **Founder**: Brian Park
- **Email**: hello@cheengu.com
- **Address**: 100 34th Ave, San Francisco, CA 94121
- **Entity Type**: Sole Proprietorship
- **State**: California

## License

All rights reserved © 2025 Cheengu
