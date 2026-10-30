import React, { useState, useEffect } from 'react';
import { ExternalLink, Check, Copy, Mail, Sparkles, MapPin, Briefcase, Terminal } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroBannerProps {
  profile: ProfileData;
  onOpenAiEnhance: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile, onOpenAiEnhance }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth typing effect simulation
  useEffect(() => {
    const lines = profile.taglineLines;
    if (!lines || lines.length === 0) return;

    const currentFullLine = lines[currentLineIndex % lines.length];
    const typingSpeed = isDeleting ? 25 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullLine.length) {
          setDisplayedText(currentFullLine.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentFullLine.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentLineIndex, profile.taglineLines]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const customColors = profile.bannerTheme.gradientColors.join(',');
  const encodedName = encodeURIComponent(profile.developerName);
  const encodedDesc = encodeURIComponent(`${profile.role} | Applied AI Developer`);
  const bannerUrl = `https://capsule-render.vercel.app/api?type=${profile.bannerTheme.type}&color=gradient&customColorList=0,1,2,3&customColors=${customColors}&height=${profile.bannerTheme.height}&section=header&text=${encodedName}&fontSize=${profile.bannerTheme.fontSize}&fontAlignY=38&desc=${encodedDesc}&descAlignY=62&descSize=19&fontColor=ffffff&stroke=0EA5E9&strokeWidth=0`;

  return (
    <section id="overview" className="relative pt-6 pb-12 overflow-hidden">
      {/* Dark Futuristic Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-blue-600/10 via-purple-600/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-7">
        {/* Banner Section with refined border */}
        <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-[#060814] shadow-2xl shadow-indigo-950/40">
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative"
          >
            <img
              src={bannerUrl}
              alt={`${profile.developerName} Animated Banner`}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).style.display = 'block';
                }
              }}
            />
            {/* Fallback SVG */}
            <div className="hidden w-full h-[220px] bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 p-8 flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {profile.developerName}
              </h1>
              <p className="mt-2 text-sky-100 text-lg font-medium">
                {profile.role} · Applied AI Developer
              </p>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md text-xs text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-md flex items-center gap-1.5 font-mono">
              <span>View Portfolio</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </div>

        {/* Live Typing Tagline Banner */}
        <div className="bg-[#080C1B]/90 border border-indigo-950/80 rounded-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left shadow-lg">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            <div className="font-mono text-cyan-300 font-semibold text-base md:text-lg min-h-[1.75rem] flex items-center">
              <span>{displayedText}</span>
              <span className="w-2 h-5 bg-cyan-400 ml-1 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bangalore, India 🇮🇳</span>
            </div>
            <span aria-hidden="true" className="text-indigo-900">|</span>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Applied AI & ML</span>
            </div>
          </div>
        </div>

        {/* Quick Social Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
            title="Portfolio Website"
          >
            <img
              src="https://img.shields.io/badge/Portfolio-0EA5E9?style=for-the-badge&logo=googlechrome&logoColor=white"
              alt="Portfolio"
              height="30"
            />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
            title="LinkedIn Profile"
          >
            <img
              src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"
              alt="LinkedIn"
              height="30"
            />
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
            title="GitHub Profile"
          >
            <img
              src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
              alt="GitHub"
              height="30"
            />
          </a>
          <a
            href={profile.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
            title="LeetCode Profile"
          >
            <img
              src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black"
              alt="LeetCode"
              height="30"
            />
          </a>
          <button
            onClick={handleCopyEmail}
            className="hover:scale-105 transition-transform relative group"
            title="Click to copy email address"
          >
            <img
              src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white"
              alt="Email"
              height="30"
            />
            {copiedEmail && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow font-mono">
                COPIED!
              </span>
            )}
          </button>
        </div>

        {/* Philosophy Card with refined dark futuristic styling */}
        <div className="relative p-6 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-[#080C1B] via-indigo-950/30 to-[#080C1B] text-center shadow-lg">
          <p className="text-slate-200 text-sm md:text-base italic leading-relaxed max-w-2xl mx-auto font-sans">
            &ldquo;{profile.philosophy}&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span className="text-cyan-400">CORE AXIOM</span>
            <span aria-hidden="true" className="text-indigo-800">·</span>
            <span>RESEARCH NOTEBOOKS TO PRODUCTION SYSTEMS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
