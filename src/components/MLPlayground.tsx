import React, { useState, useMemo } from 'react';
import { Sliders, Play, RotateCcw, Activity, Award, TrendingUp, Info } from 'lucide-react';

export const MLPlayground: React.FC = () => {
  const [learningRate, setLearningRate] = useState<number>(0.08);
  const [nEstimators, setNEstimators] = useState<number>(85);
  const [maxDepth, setMaxDepth] = useState<number>(4);
  const [resamplingRatio, setResamplingRatio] = useState<number>(0.85); // SMOTE balance
  const [trialsCount, setTrialsCount] = useState<number>(14);
  const [isRunningTrial, setIsRunningTrial] = useState<boolean>(false);

  // Simulated metrics derived mathematically from hyperparameter balance
  const metrics = useMemo(() => {
    // Optimal point around lr=0.05-0.12, depth=3-5, nEstimators=80-120, resampling=0.8-1.0
    const lrPenalty = Math.abs(learningRate - 0.08) * 45;
    const depthPenalty = Math.abs(maxDepth - 4) * 2.2;
    const estReward = Math.min(nEstimators / 100, 1.2) * 5;
    const resampleReward = (resamplingRatio - 0.5) * 8;

    const baseAccuracy = 92.4;
    const accuracy = Math.min(99.4, Math.max(78.0, baseAccuracy - lrPenalty - depthPenalty + estReward + resampleReward));
    const f1Score = Math.min(0.985, Math.max(0.72, (accuracy / 100) * 0.98 - (resamplingRatio < 0.7 ? 0.05 : 0)));
    const logLoss = Math.max(0.08, 0.45 - (accuracy / 100) * 0.35 + (learningRate > 0.3 ? 0.15 : 0));
    const inferenceLatencyMs = Math.round(18 + maxDepth * 3.5 + nEstimators * 0.15);

    return {
      accuracy: accuracy.toFixed(2),
      f1Score: f1Score.toFixed(3),
      logLoss: logLoss.toFixed(4),
      inferenceLatencyMs,
    };
  }, [learningRate, nEstimators, maxDepth, resamplingRatio]);

  // Generate simulated historical trials for the convergence curve
  const trials = useMemo(() => {
    const list = [];
    let currentBest = 84.0;
    for (let i = 1; i <= Math.min(trialsCount, 25); i++) {
      const noise = (Math.sin(i * 1.5) * 3 + Math.cos(i) * 2);
      const trialScore = Math.min(98.8, 85 + (i * 0.6) + noise);
      if (trialScore > currentBest) {
        currentBest = trialScore;
      }
      list.push({ trial: i, score: trialScore, best: currentBest });
    }
    return list;
  }, [trialsCount]);

  const handleRunOptuna = () => {
    setIsRunningTrial(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setTrialsCount((prev) => prev + 1);
      // Auto adjust towards pareto front
      setLearningRate((prev) => +(prev * 0.96 + 0.08 * 0.04).toFixed(3));
      if (step >= 4) {
        clearInterval(interval);
        setIsRunningTrial(false);
      }
    }, 280);
  };

  const handleReset = () => {
    setLearningRate(0.08);
    setNEstimators(85);
    setMaxDepth(4);
    setResamplingRatio(0.85);
    setTrialsCount(12);
  };

  return (
    <section id="playground" className="py-12 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Applied ML Tuning & Inference Simulator</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Interactive demonstration of Swaroop&apos;s specialization in Bayesian optimization (Optuna) and decision boundaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleRunOptuna}
              disabled={isRunningTrial}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isRunningTrial ? 'animate-spin' : ''}`} />
              <span>{isRunningTrial ? 'Sampling TPE...' : 'Run Optuna Trial'}</span>
            </button>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sliders */}
          <div className="lg:col-span-5 p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Hyperparameter Search Space
              </span>
              <span className="text-[11px] font-mono text-cyan-400">XGBoost + Optuna</span>
            </div>

            {/* Slider 1: Learning Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Learning Rate ($\eta$)</span>
                <span className="font-mono text-cyan-400">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.4"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.01 (slow/stable)</span>
                <span>0.40 (aggressive)</span>
              </div>
            </div>

            {/* Slider 2: n_estimators */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Number of Estimators ($T$)</span>
                <span className="font-mono text-cyan-400">{nEstimators} trees</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={nEstimators}
                onChange={(e) => setNEstimators(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20</span>
                <span>200</span>
              </div>
            </div>

            {/* Slider 3: Max Depth */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Max Tree Depth ($d$)</span>
                <span className="font-mono text-cyan-400">{maxDepth} levels</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={maxDepth}
                onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2 (linear)</span>
                <span>10 (complex/overfit risk)</span>
              </div>
            </div>

            {/* Slider 4: SMOTE Resampling Ratio */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">SMOTE Sampling Ratio ($\beta$)</span>
                <span className="font-mono text-cyan-400">{resamplingRatio}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={resamplingRatio}
                onChange={(e) => setResamplingRatio(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.20 (skewed)</span>
                <span>1.00 (balanced 50:50)</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Simulates Tree-structured Parzen Estimator (TPE) surrogate model updates in real time based on active hyperparameter coordinates.
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Readout & Convergence Chart */}
          <div className="lg:col-span-7 space-y-4">
            {/* Real-time Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-500">Val Accuracy</span>
                <div className="text-lg md:text-xl font-bold font-mono text-cyan-400 mt-1">
                  {metrics.accuracy}%
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-500">F1-Score</span>
                <div className="text-lg md:text-xl font-bold font-mono text-indigo-400 mt-1">
                  {metrics.f1Score}
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-500">Log Loss</span>
                <div className="text-lg md:text-xl font-bold font-mono text-emerald-400 mt-1">
                  {metrics.logLoss}
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-500">Latency</span>
                <div className="text-lg md:text-xl font-bold font-mono text-amber-400 mt-1">
                  {metrics.inferenceLatencyMs}ms
                </div>
              </div>
            </div>

            {/* Simulated Convergence Curve */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">Optuna Objective Optimization Curve</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Trial #{trialsCount}</span>
              </div>

              {/* SVG Curve Chart */}
              <div className="h-36 w-full pt-2">
                <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#1E293B" strokeDasharray="3 3" />

                  {/* Polyline for best trial curve */}
                  <polyline
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="2.5"
                    points={trials
                      .map((t, idx) => {
                        const x = (idx / Math.max(1, trials.length - 1)) * 390 + 5;
                        const y = 110 - ((t.best - 80) / 20) * 100;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Scatter dots for individual sample trials */}
                  {trials.map((t, idx) => {
                    const x = (idx / Math.max(1, trials.length - 1)) * 390 + 5;
                    const y = 110 - ((t.score - 80) / 20) * 100;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="3"
                        className="fill-indigo-400 hover:fill-cyan-300 transition-colors cursor-pointer"
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-cyan-400 rounded" />
                    <span>Best Objective Value</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>Trial Iterations</span>
                  </span>
                </div>
                <span>TPE Algorithm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
