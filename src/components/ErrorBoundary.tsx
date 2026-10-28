import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by portfolio ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Portfolio Initialization Notice</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected client script condition was caught. Reloading the portfolio will restore all interface state.
            </p>
            {this.state.error && (
              <div className="text-[11px] font-mono text-rose-300 bg-rose-950/40 p-3 rounded-lg border border-rose-900/50 text-left overflow-x-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer hover:from-cyan-300 hover:to-teal-200 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Portfolio</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
