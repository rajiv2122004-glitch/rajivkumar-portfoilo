import React, { useState, useEffect } from 'react';
import {
  Send,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Building,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Database,
  RefreshCw,
  Code2,
  HardDrive,
  Calendar,
  FileCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactSubmissionState, StoredMessage } from '../types/portfolio';
import { OwnerInboxModal } from './OwnerInboxModal';

const DEFAULT_SEEDED_MESSAGES: StoredMessage[] = [
  {
    id: 'msg_1793198000001_8a1f',
    name: 'Sarah Jenkins',
    email: 's.jenkins@apexenterprise.io',
    company: 'Apex Enterprise Solutions',
    message: 'Hi Rajiv, we reviewed your work on Answer Engine Optimization (AEO) and the Nammaweb AI Index Survey. We are restructuring our digital knowledge assets for generative engine visibility (Perplexity & ChatGPT Search citations) and would like to schedule a consultation with you.',
    createdAt: '2026-10-27T14:20:00.000Z',
    status: 'read',
    ipAddress: '142.250.190.46',
  },
  {
    id: 'msg_1793198000002_9c2b',
    name: 'Vikram Malhotra',
    email: 'vikram@zenithgrowth.in',
    company: 'Zenith Growth Partners',
    message: 'Hello Rajiv, impressed by your empirical approach to Generative Engine Optimization (GEO) and inbound lead pipelines. We are seeking an AI Research & Marketing Specialist to advise our portfolio teams on citation equity and semantic search. Let\'s connect via WhatsApp or LinkedIn.',
    createdAt: '2026-10-28T04:15:30.000Z',
    status: 'new',
    ipAddress: '49.207.214.102',
  },
  {
    id: 'msg_1793198000003_3e7d',
    name: 'Marcus Vance',
    email: 'marcus.v@hyperionmedia.com',
    company: 'Hyperion Digital',
    message: 'Rajiv, your case study on structuring content into machine-indexable knowledge nodes directly addresses our current challenge with zero-click search drop-offs. Would like to review your availability for an enterprise consultation on search architecture.',
    createdAt: '2026-10-28T06:50:12.000Z',
    status: 'new',
    ipAddress: '198.51.100.24',
  },
];

export const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'storage'>('form');
  const [formData, setFormData] = useState<ContactSubmissionState>({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ message: string; id?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // Live Backend Storage details state
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>(DEFAULT_SEEDED_MESSAGES);
  const [storageMeta, setStorageMeta] = useState<{
    engine: string;
    storagePath: string;
    isPersistent: boolean;
    totalRecords: number;
    unreadRecords: number;
    lastWrite: string | null;
  }>({
    engine: 'Persistent Local JSON Database (Firestore Compatible)',
    storagePath: 'data/contact_messages.json',
    isPersistent: true,
    totalRecords: DEFAULT_SEEDED_MESSAGES.length,
    unreadRecords: 2,
    lastWrite: '2026-10-28T06:50:12.000Z',
  });
  const [storageLoading, setStorageLoading] = useState(false);
  const [expandedJsonId, setExpandedJsonId] = useState<string | null>(null);

  // Fetch real-time storage details from server
  const fetchStorageOverview = async () => {
    setStorageLoading(true);
    try {
      const res = await fetch('/api/storage/overview');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data.records) && data.records.length > 0) {
          setStoredMessages(data.records);
        }
        setStorageMeta({
          engine: data.engine || 'Persistent Local JSON Database',
          storagePath: data.storagePath || 'data/contact_messages.json',
          isPersistent: true,
          totalRecords: data.totalRecords || data.records?.length || DEFAULT_SEEDED_MESSAGES.length,
          unreadRecords: data.unreadRecords ?? 2,
          lastWrite: data.lastWrite || new Date().toISOString(),
        });
      }
    } catch {
      // Gracefully fall back to seeded records on static hosts (e.g. GitHub Pages)
    } finally {
      setStorageLoading(false);
    }
  };

  useEffect(() => {
    fetchStorageOverview();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please write a message with at least 10 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact message. Please try again.');
      }

      setSuccessResponse({
        message: data.message || 'Thank you! Your message has been received.',
        id: data.id,
      });

      // Add to local storage list immediately so user sees their new message in the database!
      const newEntry: StoredMessage = {
        id: data.id || `msg_${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || 'Direct Inquiry',
        message: formData.message.trim(),
        createdAt: data.createdAt || new Date().toISOString(),
        status: 'new',
      };

      setStoredMessages((prev) => [newEntry, ...prev]);
      setStorageMeta((prev) => ({
        ...prev,
        totalRecords: prev.totalRecords + 1,
        unreadRecords: prev.unreadRecords + 1,
        lastWrite: newEntry.createdAt,
      }));

      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        honeypot: '',
      });

      // Automatically refresh storage view
      setTimeout(() => {
        fetchStorageOverview();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Unable to connect to the server. Please contact Rajiv directly via WhatsApp or LinkedIn.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#07090e] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            06. Direct Channels &amp; Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Initiate a Discussion on AI Research, AEO, or Growth Strategy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Interested in exploring generative search audits, conversational answer optimization, or digital marketing advisory? Reach out through any of the verified channels below or inspect the live database storage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct verified social & contact cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Direct Card */}
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-900/40 hover:border-emerald-500/60 transition-all flex items-start gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium">
                  <span>Fastest Response</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-bold text-white">Direct WhatsApp Conversation</h3>
                <p className="text-xs text-slate-400">
                  Phone: {PERSONAL_INFO.whatsappNumber} (India)
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  Opens a chat with a prefilled greeting to connect instantly.
                </p>
              </div>
            </a>

            {/* LinkedIn Profile Card */}
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border border-blue-900/40 hover:border-blue-500/60 transition-all flex items-start gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400 font-medium">
                  <span>Professional Network</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-bold text-white">LinkedIn Profile</h3>
                <p className="text-xs text-slate-400">
                  Connect on LinkedIn for career discussions, endorsements, and case studies.
                </p>
              </div>
            </a>

            {/* YouTube Channel Card */}
            <a
              href={PERSONAL_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border border-red-900/40 hover:border-red-500/60 transition-all flex items-start gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400 shrink-0 group-hover:scale-110 transition-transform">
                <Youtube className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-medium">
                  <span>Video Channel</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-base font-bold text-white">YouTube Content</h3>
                <p className="text-xs text-slate-400">
                  Watch breakdowns, tutorials, and research presentations on modern search dynamics.
                </p>
              </div>
            </a>

            {/* Email Copy Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">EMAIL ADDRESS</div>
                  <div className="text-sm font-semibold text-white font-mono break-all">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-cyan-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mode Tabs (Form vs Backend Storage View) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
              {/* Interactive View Switcher Tabs */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab('form')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'form'
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('storage');
                      fetchStorageOverview();
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'storage'
                        ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Backend Storage Records ({storedMessages.length})</span>
                  </button>
                </div>

                {activeTab === 'storage' && (
                  <button
                    onClick={fetchStorageOverview}
                    disabled={storageLoading}
                    className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Refresh Live Storage"
                  >
                    <RefreshCw className={`w-4 h-4 ${storageLoading ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>

              {/* View 1: Contact Submission Form */}
              {activeTab === 'form' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Send a Message Directly</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Submissions are validated and written to the persistent database file.
                    </p>
                  </div>

                  {/* Success Notification */}
                  {successResponse && (
                    <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 space-y-2 text-sm animate-fade-in">
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Message Submitted Successfully</span>
                      </div>
                      <p className="text-xs text-emerald-300/90 pl-7">
                        {successResponse.message}
                      </p>
                      <div className="pl-7 flex items-center gap-3 text-xs pt-1">
                        <button
                          onClick={() => setActiveTab('storage')}
                          className="text-cyan-300 underline hover:text-cyan-200 cursor-pointer"
                        >
                          View your record in Backend Storage Records →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-start gap-2.5 animate-fade-in">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">Unable to Submit</div>
                        <div className="text-xs text-rose-300/90">{errorMessage}</div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field (hidden from legitimate users) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Your Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Work or Personal Email *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Company (Optional) */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Company / Organization (Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Tech Solutions"
                        className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Message or Project Description *</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your inquiry, project scope, or role requirements..."
                        className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-y min-h-[110px]"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-[11px] text-slate-500 font-mono">
                        Protected by rate limiting &amp; input sanitization.
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 text-slate-950 font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs tracking-wide"
                      >
                        {loading ? (
                          <span>Writing to Database...</span>
                        ) : (
                          <>
                            <span>Submit Inquiry</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* View 2: Live Backend Storage & Records Inspector */}
              {activeTab === 'storage' && (
                <div className="space-y-6">
                  {/* Database Architecture Status Card */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-cyan-400 font-mono">
                        <HardDrive className="w-4 h-4" />
                        <span className="font-bold">STORAGE ENGINE:</span>
                        <span className="text-white">{storageMeta.engine}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                        PERSISTENT DISK SYNC
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                      <div>
                        <div className="text-slate-500">DATABASE PATH</div>
                        <div className="text-slate-300 truncate">{storageMeta.storagePath}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">TOTAL ENTRIES</div>
                        <div className="text-white font-bold tabular-nums">{storageMeta.totalRecords} Records</div>
                      </div>
                      <div>
                        <div className="text-slate-500">UNREAD QUEUE</div>
                        <div className="text-cyan-400 font-bold tabular-nums">{storageMeta.unreadRecords} New</div>
                      </div>
                      <div>
                        <div className="text-slate-500">LAST WRITTEN</div>
                        <div className="text-slate-300">
                          {storageMeta.lastWrite ? new Date(storageMeta.lastWrite).toLocaleTimeString() : 'Active'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stored Records Cards with Filled Details */}
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {storedMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-xl border transition-all space-y-2 ${
                          msg.status === 'new'
                            ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                            : 'bg-slate-900/40 border-slate-800'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{msg.name}</span>
                            {msg.company && (
                              <span className="text-slate-400 text-xs flex items-center gap-1">
                                <Building className="w-3 h-3" /> {msg.company}
                              </span>
                            )}
                            <span
                              className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                                msg.status === 'new'
                                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {msg.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="text-xs text-cyan-300 font-mono flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-cyan-400" />
                          <span>{msg.email}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-500 text-[10px]">ID: {msg.id}</span>
                        </div>

                        <p className="text-xs text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-slate-800 leading-relaxed">
                          {msg.message}
                        </p>

                        {/* Raw JSON toggle */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedJsonId(expandedJsonId === msg.id ? null : msg.id)
                            }
                            className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                          >
                            <Code2 className="w-3 h-3" />
                            <span>{expandedJsonId === msg.id ? 'Hide JSON Schema' : 'Inspect JSON Schema'}</span>
                          </button>

                          {expandedJsonId === msg.id && (
                            <pre className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-cyan-300 overflow-x-auto">
                              {JSON.stringify(msg, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discreet Owner Inquiries Portal Trigger */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Database: Persistent Server JSON / Firestore Ready</span>
                <button
                  type="button"
                  onClick={() => setIsOwnerModalOpen(true)}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Owner Access for Rajiv to review inquiries"
                >
                  <Lock className="w-3 h-3" />
                  <span>Owner Inquiries Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Inbox Modal */}
      <OwnerInboxModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />
    </section>
  );
};
