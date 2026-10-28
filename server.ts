import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { saveMessage, getAllMessages, updateMessageStatus, getStats, initDb } from './server/db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const OWNER_SECRET = process.env.OWNER_SECRET_KEY || 'rajiv-access-2026';

// Initialize persistent storage
initDb();

app.use(express.json({ limit: '64kb' }));

// Simple in-memory rate limiter for contact form submissions: max 5 per 10 mins per IP
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = rateLimits.get(ip);

  if (!clientData || now > clientData.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    const waitSeconds = Math.ceil((clientData.resetAt - now) / 1000);
    res.status(429).json({
      error: `Too many submissions from your address. Please try again in ${waitSeconds} seconds or message Rajiv directly via WhatsApp or LinkedIn.`,
    });
    return;
  }

  clientData.count += 1;
  next();
}

// Sanitize string input
function sanitizeText(str: string): string {
  return str
    .replace(/<[^>]*>?/gm, '') // strip HTML tags
    .replace(/[^\w\s.,!?'"()\-@+:/]/gi, ' ') // remove dangerous characters
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ownerProtected: true,
    stats: getStats(),
  });
});

// Contact submission endpoint
app.post('/api/contact', rateLimiter, (req: Request, res: Response) => {
  try {
    const { name, email, company, message, honeypot } = req.body;

    // Honeypot anti-spam check
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
      // Silently reject bot submissions
      res.status(200).json({ success: true, message: 'Message received.' });
      return;
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'Please enter your full name (minimum 2 characters).' });
      return;
    }

    if (name.length > 100) {
      res.status(400).json({ error: 'Name must be 100 characters or less.' });
      return;
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (email.length > 120) {
      res.status(400).json({ error: 'Email must be 120 characters or less.' });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      res.status(400).json({ error: 'Please provide a meaningful message (minimum 10 characters).' });
      return;
    }

    if (message.length > 3000) {
      res.status(400).json({ error: 'Message must not exceed 3,000 characters.' });
      return;
    }

    const cleanName = sanitizeText(name);
    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany = company && typeof company === 'string' ? sanitizeText(company).slice(0, 100) : undefined;
    const cleanMessage = sanitizeText(message);

    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress;

    const saved = saveMessage({
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany,
      message: cleanMessage,
      ipAddress: clientIp,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been safely received. Rajiv will respond shortly.',
      id: saved.id,
      createdAt: saved.createdAt,
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({
      error: 'An internal error occurred while processing your message. Please reach out via WhatsApp or LinkedIn directly.',
    });
  }
});

// Secure Owner-only Authentication Middleware
function requireOwnerAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const customKey = req.headers['x-owner-key'];
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (typeof customKey === 'string') {
    token = customKey.trim();
  }

  if (!token || token !== OWNER_SECRET) {
    res.status(401).json({
      error: 'Unauthorized. Valid owner access key is required to access incoming portfolio inquiries.',
    });
    return;
  }

  next();
}

// Protected Owner routes
app.get('/api/contact/messages', requireOwnerAuth, (_req: Request, res: Response) => {
  const messages = getAllMessages();
  res.json({
    messages,
    stats: getStats(),
  });
});

app.patch('/api/contact/messages/:id', requireOwnerAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['new', 'read', 'archived'].includes(status)) {
    res.status(400).json({ error: "Status must be 'new', 'read', or 'archived'." });
    return;
  }

  const updated = updateMessageStatus(id, status);
  if (!updated) {
    res.status(404).json({ error: 'Message not found.' });
    return;
  }

  res.json({ success: true, message: updated });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT} [${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
