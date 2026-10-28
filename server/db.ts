import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'archived';
  ipAddress?: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'contact_messages.json');

// Ensure database directory and file exist
export function initDb(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to initialize local JSON database:', err);
  }
}

// Atomic file writer to avoid corruption
function writeMessagesToFile(messages: ContactMessage[]): void {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(messages, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

export function getAllMessages(): ContactMessage[] {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading contact messages database:', err);
    return [];
  }
}

export function saveMessage(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
  ipAddress?: string;
}): ContactMessage {
  initDb();
  const messages = getAllMessages();
  
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company ? data.company.trim() : undefined,
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
    status: 'new',
    ipAddress: data.ipAddress,
  };

  messages.unshift(newMessage);
  writeMessagesToFile(messages);
  return newMessage;
}

export function updateMessageStatus(id: string, status: 'new' | 'read' | 'archived'): ContactMessage | null {
  initDb();
  const messages = getAllMessages();
  const target = messages.find((m) => m.id === id);
  if (!target) return null;
  
  target.status = status;
  writeMessagesToFile(messages);
  return target;
}

export function getStats(): { total: number; unread: number; lastSubmissionAt: string | null } {
  const messages = getAllMessages();
  const unread = messages.filter((m) => m.status === 'new').length;
  const lastSubmissionAt = messages.length > 0 ? messages[0].createdAt : null;
  return {
    total: messages.length,
    unread,
    lastSubmissionAt,
  };
}
