import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

const router = Router();

// ZenQuotes API response interface
interface ZenQuoteResponse {
  q: string;  // Quote text
  a: string;  // Author
  h: string;  // HTML formatted quote
}

// Our internal Quote interface
interface Quote {
  id: string;
  quote: string;
  author: string;
  category?: 'motivation' | 'education' | 'success' | 'learning';
  tags?: string[];
}

// Note: Fallback quotes removed - service will return unavailable message when API fails

// Convert ZenQuotes response to our Quote format
function convertZenQuoteToQuote(zenQuote: ZenQuoteResponse): Quote {
  return {
    id: `zen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    quote: zenQuote.q,
    author: zenQuote.a,
    category: 'motivation',
    tags: ['wisdom', 'inspiration']
  };
}

// Fetch quote from external API (no fallback - throws error if API fails)
async function fetchQuoteFromAPI(): Promise<Quote> {
  const response = await fetch('https://zenquotes.io/api/random', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'StudyControl-Backend/1.0'
    },
    timeout: 6000
  });

  if (!response.ok) {
    throw new Error(`ZenQuotes API returned ${response.status}: ${response.statusText}`);
  }

  const data: ZenQuoteResponse[] = await response.json() as ZenQuoteResponse[];
  
  if (!data || data.length === 0 || !data[0]?.q || !data[0]?.a) {
    throw new Error('Invalid response format from ZenQuotes API');
  }

  return convertZenQuoteToQuote(data[0]);
}

// Function to handle successful quote response
function sendQuoteResponse(res: Response, quote: Quote, logMessage: string) {
  console.log(logMessage);
  res.json({
    success: true,
    data: quote,
    source: 'ZenQuotes API'
  });
}

// Function to handle service unavailable response
function sendServiceUnavailableResponse(res: Response, error: Error, logMessage: string) {
  console.error(logMessage, error.message);
  res.status(503).json({
    success: false,
    error: 'Quote service temporarily unavailable',
    message: 'Unable to fetch quotes from external service. Please try again later.'
  });
}

// GET /api/quotes/random - Get a random quote
router.get('/random', async (req: Request, res: Response) => {
  try {
    const quote = await fetchQuoteFromAPI();
    sendQuoteResponse(res, quote,
      `✅ Backend: Quote received from ZenQuotes API: ${quote.quote.substring(0, 50)}...`);
  } catch (error) {
    sendServiceUnavailableResponse(res, error as Error,
      '❌ Backend: Failed to fetch quote from external API');
  }
});

// GET /api/quotes/daily - Get quote of the day (alias for random)
router.get('/daily', async (req: Request, res: Response) => {
  try {
    const quote = await fetchQuoteFromAPI();
    sendQuoteResponse(res, quote, 
      `✅ Backend: Daily quote received from ZenQuotes API`);
  } catch (error) {
    sendServiceUnavailableResponse(res, error as Error,
      '❌ Backend: Failed to fetch daily quote from external API');
  }
});

// GET /api/quotes - Get quotes (returns single random quote)
router.get('/', async (req: Request, res: Response) => {
  try {
    const quote = await fetchQuoteFromAPI();
    sendQuoteResponse(res, quote, 
      `✅ Backend: Quote received from ZenQuotes API`);
  } catch (error) {
    sendServiceUnavailableResponse(res, error as Error,
      '❌ Backend: Failed to fetch quote from external API');
  }
});

export default router;
