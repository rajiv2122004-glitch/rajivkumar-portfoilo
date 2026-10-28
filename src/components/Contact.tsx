import React, { useState } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactSubmissionState } from '../types/portfolio';
import { OwnerInboxModal } from './OwnerInboxModal';

export const Contact: React.FC = () => {
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    // Client-side quick check
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

      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        honeypot: '',
      });
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
            Interested in exploring generative search audits, conversational answer optimization, or digital marketing advisory? Reach out through any of the verified channels below.
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

          {/* Right Column: Production Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Send a Message Directly</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Submissions are persistently saved and delivered to Rajiv Kumar H N.
                </p>
              </div>

              {/* Success Notification */}
              {successResponse && (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 space-y-1 text-sm animate-fade-in">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Message Submitted Successfully</span>
                  </div>
                  <p className="text-xs text-emerald-300/90 pl-7">
                    {successResponse.message}
                  </p>
                  {successResponse.id && (
                    <div className="text-[11px] font-mono text-emerald-400/80 pl-7 pt-1">
                      Confirmation ID: {successResponse.id}
                    </div>
                  )}
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
                    placeholder="Describe your project, inquiry, or role requirements..."
                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-y min-h-[110px]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500 font-mono">
                    Protected by server-side rate limits &amp; input sanitization.
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 text-slate-950 font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs tracking-wide"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

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
