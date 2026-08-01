import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, CheckCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPost?: any;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({ isOpen, onClose, initialPost }) => {
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState(initialPost?.title || '');
  const [tagline, setTagline] = useState(initialPost?.tagline || '');
  const [category, setCategory] = useState(initialPost?.category || 'SaaS');
  const [description, setDescription] = useState(initialPost?.description || '');
  
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGetAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAdvice(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-[#2563EB]': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          tagline,
          category,
          description,
          userQuery: query
        })
      });

      const data = await res.json();
      if (data.advice) {
        setAdvice(data.advice);
      } else {
        setAdvice('Could not generate AI advice right now. Please verify GEMINI_API_KEY.');
      }
    } catch (err) {
      console.error(err);
      setAdvice('Error connecting to Panda Launch Advisor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E5E5E5] dark:border-[#2A2A2C] bg-[#F6F7F8]/50 dark:bg-[#1A1A1B]/50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
              🐼
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1A1A1B] dark:text-[#F5F5F5]">
                Panda Launch & Pitch Advisor
              </h2>
              <p className="text-[10px] text-[#2563EB] font-semibold">
                AI Launch Coach for Developer Products
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#1A1A1B]/50 hover:text-[#1A1A1B] dark:text-[#F5F5F5]/50 dark:hover:text-[#F5F5F5] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & AI Advice Output */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <form onSubmit={handleGetAdvice} className="space-y-3 p-4 rounded-xl bg-[#F6F7F8] dark:bg-[#1A1A1B] border border-[#E5E5E5] dark:border-[#2A2A2C]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Product Input Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="App Title (e.g. DevPulse)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
              <input
                type="text"
                placeholder="Tagline / Headline"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
              />
            </div>

            <textarea
              rows={2}
              placeholder="What specifically do you want feedback on? (e.g. 'How can I make my tagline punchier for Reddit & Product Hunt?')"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full p-3 text-xs rounded-xl bg-white dark:bg-[#0E0E10] border border-[#E5E5E5] dark:border-[#2A2A2C] text-[#1A1A1B] dark:text-[#F5F5F5]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-[#2563EB]/90 transition-colors shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Product Pitch...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Pitch Advice</span>
                </>
              )}
            </button>
          </form>

          {advice && (
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E0E10] border border-[#2563EB]/30 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
                <Bot className="w-4 h-4" />
                <span>Panda AI Recommendations:</span>
              </div>
              <div className="prose prose-xs dark:prose-invert max-w-none text-xs leading-relaxed text-[#1A1A1B]/90 dark:text-[#F5F5F5]/90">
                <ReactMarkdown>{advice}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
