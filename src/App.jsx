
import React, { useState } from 'react';

const ZODIAC_SIGNS = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', element: 'Fire', icon: '♈' },
  { name: 'Taurus', date: 'Apr 20 - May 20', element: 'Earth', icon: '♉' },
  { name: 'Gemini', date: 'May 21 - Jun 20', element: 'Air', icon: '♊' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', element: 'Water', icon: '♋' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', element: 'Fire', icon: '♌' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', element: 'Earth', icon: '♍' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', element: 'Air', icon: '♎' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', element: 'Water', icon: '♏' },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', element: 'Fire', icon: '♐' },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', element: 'Earth', icon: '♑' },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', element: 'Air', icon: '♒' },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', element: 'Water', icon: '♓' }
];

// Astrological data matrix used to build unique daily readings without an LLM
const READINGS = {
  Fire: [
    "The cosmos is charging your career house today. A sudden burst of clarity allows you to execute a project you've put off.",
    "Your passionate nature is heightened by the current lunar phase. Direct this intense focus toward personal branding or creative expansion.",
    "A minor planetary friction suggests patience with close peers. Avoid rushing into agreements before checking the fine print."
  ],
  Earth: [
    "Financial foundations are highlighted. The alignment favors structuring long-term investments or consolidating your digital assets.",
    "Pragmatic steps yield massive returns today. Focus on stabilizing your daily routine and removing unnecessary digital distractions.",
    "The stars indicate a strong grounding energy. Trust your instincts regarding a joint venture or collaborative partnership."
  ],
  Air: [
    "Your communication sector is fully activated. Perfect day for writing, sending critical pitches, or engaging your audience.",
    "Ideas are flowing rapidly, but execution is key. Pick one dominant concept and see it through to completion before sundown.",
    "An unexpected message could open a door to new educational or career pathways. Keep your notifications open."
  ],
  Water: [
    "Intuition is your sharpest tool today. If a deal or project feels slightly off, step back and analyze it logically.",
    "Emotional clarity brings a wave of creative genius. Use this timeframe to design, build, or re-strategize your presentation.",
    "Deep reflections bring answers to a lingering professional question. The path forward is clearer than you think."
  ]
};

const LUCK_FACTORS = ["Lucky Number: 7", "Lucky Color: Crimson", "Power Hour: 2:00 PM - 3:00 PM", "Lucky Number: 3", "Lucky Color: Electric Blue", "Power Hour: 9:00 AM - 10:30 AM"];

export default function App() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [prediction, setPrediction] = useState({ text: '', luck: '' });
  const [loading, setLoading] = useState(false);

  const generateLocalHoroscope = (sign) => {
    setLoading(true);
    setSelectedSign(sign);

    // Using the current calendar date to create a pseudo-random seed
    // This ensures the user gets a unique, consistent reading all day, which updates tomorrow!
    const today = new Date();
    const daySeed = today.getDate() + today.getMonth() + today.getFullYear();
    const signSeed = sign.name.length;
    
    setTimeout(() => {
      const elementPool = READINGS[sign.element];
      const readingIndex = (daySeed + signSeed) % elementPool.length;
      const luckIndex = (daySeed * signSeed) % LUCK_FACTORS.length;

      setPrediction({
        text: elementPool[readingIndex],
        luck: LUCK_FACTORS[luckIndex]
      });
      setLoading(false);
    }, 400); // Quick response loader for app-like responsiveness
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 px-4 py-6 shadow-2xl select-none">
      {/* Header */}
      <header className="text-center my-4">
        <h1 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">
          ASTROSEEK
        </h1>
        <p className="text-xs text-purple-300 tracking-widest uppercase mt-1">Solutions Engine</p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto mt-4 space-y-6 pb-20">
        {selectedSign ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <button 
              onClick={() => setSelectedSign(null)}
              className="text-sm text-purple-300 mb-4 flex items-center gap-1 active:scale-95 transition-transform"
            >
              ← Choose Another Sign
            </button>
            <div className="text-center">
              <span className="text-6xl block mb-2">{selectedSign.icon}</span>
              <h2 className="text-2xl font-bold text-amber-300">{selectedSign.name}</h2>
              <p className="text-xs text-slate-400">{selectedSign.date} • {selectedSign.element}</p>
            </div>
            
            <div className="mt-6 border-t border-white/5 pt-4">
              <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">Today's Shift</h3>
              {loading ? (
                <div className="h-20 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-200 leading-relaxed text-base">{prediction.text}</p>
                  <div className="inline-block bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs px-3 py-1.5 rounded-lg font-medium">
                    {prediction.luck}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4 px-1 text-center">Select Sign</h2>
            <div className="grid grid-cols-3 gap-3">
              {ZODIAC_SIGNS.map((sign) => (
                <button
                  key={sign.name}
                  onClick={() => generateLocalHoroscope(sign)}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center transition-all active:scale-95"
                >
                  <span className="text-3xl mb-1">{sign.icon}</span>
                  <span className="text-xs font-semibold text-slate-200">{sign.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 border-t border-white/10 backdrop-blur-lg flex justify-around py-3 text-slate-400">
        <button className="flex flex-col items-center text-amber-400">
          <span className="text-xl">✨</span>
          <span className="text-[10px] mt-0.5">Horoscope</span>
        </button>
        <button className="flex flex-col items-center opacity-60" onClick={() => alert("Compatibility matches unlocked in updates!")}>
          <span className="text-xl">☯️</span>
          <span className="text-[10px] mt-0.5">Compatibility</span>
        </button>
      </nav>
    </div>
  );
    }
    
