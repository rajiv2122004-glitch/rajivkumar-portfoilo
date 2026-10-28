import React, { useState } from 'react';
import { X, Lock, RefreshCw, CheckCheck, Archive, Mail, Calendar, Building, ShieldAlert } from 'lucide-react';
import { StoredMessage } from '../types/portfolio';

interface OwnerInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerInboxModal: React.FC<OwnerInboxModalProps> = ({ isOpen, onClose }) => {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [stats, setStats] = useState<{ total: number; unread: number; lastSubmissionAt: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const fetchMessages = async (key: string) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact/messages', {
        headers: {
          Authorization: `Bearer ${key.trim()}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid owner passkey. Access denied.');
        }
        throw new Error(`Server returned error: ${res.statusText}`);
      }

      const data = await res.json();
      setMessages(data.messages || []);
      setStats(data.stats || null);
      setIsAuthenticated(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate and fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setErrorMsg('Please enter your owner secret passkey.');
      return;
    }
    fetchMessages(passkey);
  };

  const handleUpdateStatus = async (id: string, status: 'read' | 'archived') => {
    try {
      const res = await fetch(`/api/contact/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${passkey.trim()}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
        if (stats) {
          setStats({
            ...stats,
            unread: Math.max(0, stats.unread - 1),
          });
        }
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0c0f17] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Owner Inquiries Portal</h3>
              <p className="text-xs text-slate-400">
                Secure access for Rajiv Kumar H N to view stored contact messages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto py-6">
            <div className="text-center space-y-2 mb-6">
              <p className="text-xs text-slate-400">
                Messages submitted via the contact form are persistently stored in the server database. Enter your passkey to authenticate.
              </p>
              <div className="text-[11px] font-mono text-cyan-400/80 bg-slate-900 p-2 rounded border border-slate-800">
                Default Environment Key: <code className="text-white">rajiv-access-2026</code>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Owner Passkey
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter OWNER_SECRET_KEY"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/40 p-3 rounded-lg border border-rose-800/50">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold rounded-xl hover:from-cyan-300 hover:to-teal-200 transition-all text-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Unlock Owner Inbox'}
            </button>
          </form>
        ) : (
          /* Authenticated Message List */
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400">Total Inquiries: </span>
                  <span className="font-bold text-white tabular-nums">{stats?.total || messages.length}</span>
                </div>
                <div>
                  <span className="text-slate-400">Unread: </span>
                  <span className="font-bold text-cyan-400 tabular-nums">{stats?.unread ?? 0}</span>
                </div>
              </div>
              <button
                onClick={() => fetchMessages(passkey)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Inquiries */}
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No contact inquiries stored in the database yet. Test the contact form below to submit a live message.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-xl border transition-all space-y-3 ${
                      msg.status === 'new'
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        {msg.company && (
                          <span className="text-slate-400 flex items-center gap-1">
                            <Building className="w-3 h-3" /> {msg.company}
                          </span>
                        )}
                        {msg.status === 'new' && (
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-xs text-cyan-300 font-mono flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${msg.email}`} className="hover:underline">
                        {msg.email}
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      {msg.status !== 'read' && (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'read')}
                          className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      {msg.status !== 'archived' && (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'archived')}
                          className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>Archive</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
