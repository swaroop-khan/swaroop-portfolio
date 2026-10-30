import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Github, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  githubUsername: string;
  onCopyReadme: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({
  isOpen,
  onClose,
  githubUsername,
  onCopyReadme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    onCopyReadme();
    setCopied(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const newRepoUrl = `https://github.com/new?name=${githubUsername}&description=✨+Special+repository+for+my+GitHub+Profile&public=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                How to Deploy to GitHub
              </h3>
              <p className="text-xs text-slate-400">
                Publish your custom README to your public profile in 30 seconds.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step-by-step checklist */}
        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex gap-3">
            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono flex items-center justify-center shrink-0 font-bold">
              1
            </span>
            <div className="space-y-1">
              <span className="font-semibold text-white">Create the Secret Special Repository</span>
              <p className="text-slate-400 leading-relaxed">
                On GitHub, create a new public repository matching your exact username:{' '}
                <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded">
                  {githubUsername || 'username'}/{githubUsername || 'username'}
                </code>.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex gap-3">
            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono flex items-center justify-center shrink-0 font-bold">
              2
            </span>
            <div className="space-y-1">
              <span className="font-semibold text-white">Add or Replace README.md</span>
              <p className="text-slate-400 leading-relaxed">
                Ensure &quot;Add a README file&quot; is checked or create a new file named{' '}
                <code className="text-cyan-300 font-mono bg-slate-900 px-1 py-0.5 rounded">
                  README.md
                </code>{' '}
                at the root.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex gap-3">
            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono flex items-center justify-center shrink-0 font-bold">
              3
            </span>
            <div className="space-y-1">
              <span className="font-semibold text-white">Paste and Commit</span>
              <p className="text-slate-400 leading-relaxed">
                Copy the generated markdown below, paste it into the GitHub editor, and click &quot;Commit changes&quot;. Your profile is instantly live!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={newRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open GitHub Create Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy README.md'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
