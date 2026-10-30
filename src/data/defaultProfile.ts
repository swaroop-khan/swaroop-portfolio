import { ProfileData, TechBadge, ProjectCard } from '../types';

export const ALL_TECH_BADGES: TechBadge[] = [
  // Programming Languages
  { id: 'c', name: 'C', category: 'languages', badgeColor: '00599C', logo: 'c', logoColor: 'white', level: 'Advanced', highlight: 'Low-level systems, pointer arithmetic & graphics canvas' },
  { id: 'cpp', name: 'C++', category: 'languages', badgeColor: '00599C', logo: 'c%2B%2B', logoColor: 'white', level: 'Advanced', highlight: 'STL, OOP architecture & algorithmic problem-solving' },
  { id: 'python', name: 'Python', category: 'languages', badgeColor: '3776AB', logo: 'python', logoColor: 'white', level: 'Expert', highlight: 'Primary ML modeling, Optuna tuning, automation scripts' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', badgeColor: 'F7DF1E', logo: 'javascript', logoColor: 'black', level: 'Advanced', highlight: 'Asynchronous full-stack applications & Voice agent backends' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', badgeColor: '3178C6', logo: 'typescript', logoColor: 'white', level: 'Advanced', highlight: 'Type-safe production web apps & UI components' },
  { id: 'sql', name: 'SQL', category: 'languages', badgeColor: '336791', logo: 'postgresql', logoColor: 'white', level: 'Advanced', highlight: 'Relational data querying, schema design & transformations' },

  // Machine Learning & Data Science
  { id: 'numpy', name: 'NumPy', category: 'ml_ds', badgeColor: '013243', logo: 'numpy', logoColor: 'white', level: 'Expert', highlight: 'High-performance n-dimensional array computing' },
  { id: 'pandas', name: 'Pandas', category: 'ml_ds', badgeColor: '150458', logo: 'pandas', logoColor: 'white', level: 'Expert', highlight: 'Tabular data munging, feature creation & cleaning' },
  { id: 'scikitlearn', name: 'Scikit-Learn', category: 'ml_ds', badgeColor: 'F7931E', logo: 'scikit-learn', logoColor: 'white', level: 'Expert', highlight: 'Classification, regression, stratified cross-validation' },
  { id: 'xgboost', name: 'XGBoost', category: 'ml_ds', badgeColor: '185387', logo: 'xgboost', logoColor: 'white', level: 'Expert', highlight: 'Gradient boosting ensembles for Kaggle benchmarks' },
  { id: 'imbalancedlearn', name: 'Imbalanced-Learn', category: 'ml_ds', badgeColor: 'E25A1C', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'SMOTE resampling & class imbalance resolution' },
  { id: 'optuna', name: 'Optuna', category: 'ml_ds', badgeColor: '1A73E8', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Bayesian hyperparameter optimization & automated trial pruning' },
  { id: 'joblib', name: 'Joblib', category: 'ml_ds', badgeColor: '4B8BBE', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Model artifact serialization & parallel pipeline execution' },
  { id: 'matplotlib', name: 'Matplotlib', category: 'ml_ds', badgeColor: '11557C', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Exploratory data analysis & performance curve visualization' },
  { id: 'seaborn', name: 'Seaborn', category: 'ml_ds', badgeColor: '388E3C', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Statistical distributions, correlation matrices & violin plots' },
  { id: 'plotly', name: 'Plotly', category: 'ml_ds', badgeColor: '3F4F75', logo: 'plotly', logoColor: 'white', level: 'Advanced', highlight: 'Interactive visual diagnostics & web dashboards' },

  // AI & Development Ecosystem
  { id: 'assemblyai', name: 'AssemblyAI', category: 'ai_ecosystem', badgeColor: '1E1E2F', logo: 'soundcharts', logoColor: 'white', level: 'Advanced', highlight: 'Speech-to-text intelligence for conversational AI agents' },
  { id: 'streamlit', name: 'Streamlit', category: 'ai_ecosystem', badgeColor: 'FF4B4B', logo: 'streamlit', logoColor: 'white', level: 'Expert', highlight: 'Interactive web UI for ML churn models & inference' },
  { id: 'jupyter', name: 'Jupyter', category: 'ai_ecosystem', badgeColor: 'F37626', logo: 'jupyter', logoColor: 'white', level: 'Expert', highlight: 'Exploratory data science research & experimentation' },
  { id: 'kaggle', name: 'Kaggle', category: 'ai_ecosystem', badgeColor: '20BEFF', logo: 'kaggle', logoColor: 'white', level: 'Advanced', highlight: 'Competitive data science modeling & benchmarks' },
  { id: 'supabase', name: 'Supabase', category: 'ai_ecosystem', badgeColor: '3ECF8E', logo: 'supabase', logoColor: 'white', level: 'Advanced', highlight: 'Cloud PostgreSQL database & serverless API storage' },

  // Web Development & Infrastructure
  { id: 'html5', name: 'HTML5', category: 'web', badgeColor: 'E34F26', logo: 'html5', logoColor: 'white', level: 'Expert', highlight: 'Semantic markup & accessible structural layout' },
  { id: 'css3', name: 'CSS3', category: 'web', badgeColor: '1572B6', logo: 'css3', logoColor: 'white', level: 'Expert', highlight: 'Modern responsive layouts, animations & custom styling' },
  { id: 'nodejs', name: 'Node.js', category: 'web', badgeColor: '339933', logo: 'node.js', logoColor: 'white', level: 'Advanced', highlight: 'Backend microservices, runtime execution & REST endpoints' },
  { id: 'vercel', name: 'Vercel', category: 'web', badgeColor: '000000', logo: 'vercel', logoColor: 'white', level: 'Advanced', highlight: 'Edge deployments, continuous delivery & portfolio hosting' },

  // Developer Tools & Hardware
  { id: 'git', name: 'Git', category: 'tools', badgeColor: 'F05032', logo: 'git', logoColor: 'white', level: 'Expert', highlight: 'Version control, atomic commits, branch workflows' },
  { id: 'github', name: 'GitHub', category: 'tools', badgeColor: '181717', logo: 'github', logoColor: 'white', level: 'Expert', highlight: 'Open-source collaboration, issues & repository hosting' },
  { id: 'arduino', name: 'Arduino', category: 'tools', badgeColor: '00979D', logo: 'arduino', logoColor: 'white', level: 'Intermediate', highlight: 'Embedded microcontroller logic & sensor integration' }
];

export const INITIAL_PROFILE: ProfileData = {
  developerName: 'Swaroop Khan',
  taglineLines: [
    'AI & ML Enthusiast',
    'Building Intelligent Software Systems',
    'From Machine Learning Models to Real-World Applications',
    'Full Stack & Applied AI Developer'
  ],
  location: 'Bangalore, India 🇮🇳',
  role: 'AI & ML Enthusiast | Developer',
  specialization: 'Model Training, Hyperparameter Tuning & Applied Web Deployments',
  currentFocus: 'Intelligent Agentic Workflows, Machine Learning Pipelines & Scalable Backends',
  currentlyBuilding: 'Intelligent Software & Systems',
  philosophy: 'Bridging research notebooks with reliable, scalable production systems.',
  portfolioUrl: 'https://swaroop-khan.github.io/portfolio/',
  linkedinUrl: 'https://linkedin.com/in/swaroop-khan',
  githubUsername: 'swaroop-khan',
  githubUrl: 'https://github.com/swaroop-khan',
  leetcodeUsername: 'swaroop-khan',
  leetcodeUrl: 'https://leetcode.com/u/swaroop-khan/',
  email: 'swaroopkhanp@gmail.com',
  bannerTheme: {
    type: 'waving',
    height: 220,
    gradientColors: ['0EA5E9', '6366F1', '8B5CF6', 'A855F7'],
    fontSize: 48
  },
  typingConfig: {
    font: 'Fira+Code',
    weight: 600,
    size: 20,
    duration: 3000,
    pause: 1000,
    color: '38BDF8'
  },
  badgeStyle: 'flat-square',
  selectedTech: [
    'c', 'cpp', 'python', 'javascript', 'sql',
    'numpy', 'pandas', 'matplotlib', 'seaborn', 'plotly', 'scikitlearn', 'xgboost', 'imbalancedlearn', 'optuna', 'joblib',
    'streamlit', 'jupyter', 'kaggle', 'assemblyai', 'supabase',
    'html5', 'css3', 'nodejs', 'vercel',
    'git', 'github', 'arduino'
  ],
  statsTheme: 'tokyonight',
  customSections: []
};

// Pinned / Authentic repositories from @swaroop-khan on GitHub
export const FEATURED_PROJECTS: ProjectCard[] = [
  {
    id: 'voxhire',
    title: 'VoxHire — AI Voice Technical Interviewer',
    description: 'AI-powered voice interviewer that conducts adaptive technical interviews, asks intelligent follow-up questions, evaluates candidate responses in real-time, and generates structured performance reports.',
    tags: ['AssemblyAI', 'JavaScript', 'Node.js', 'Voice Agent'],
    githubUrl: 'https://github.com/swaroop-khan/Voxhire',
    liveUrl: 'https://voice-agent-r3fb.onrender.com/',
    stars: 1,
    forks: 0,
    featured: true
  },
  {
    id: 'telecom-churn',
    title: 'Telecom Customer Churn Predictor',
    description: 'Production machine learning application featuring automated Optuna Bayesian hyperparameter optimization, SMOTE class balancing for imbalanced subscriber data, and an interactive Streamlit UI.',
    tags: ['Python', 'Optuna', 'Imbalanced-Learn', 'Streamlit', 'Scikit-Learn'],
    githubUrl: 'https://github.com/swaroop-khan/telecom-customer-churn-prediction',
    stars: 1,
    forks: 0,
    featured: true
  },
  {
    id: 'house-prices',
    title: 'House Price Prediction (Kaggle)',
    description: 'End-to-end regression modeling pipeline for the Kaggle House Prices competition utilizing gradient boosting architectures, feature interaction engineering, and cross-validation benchmarks.',
    tags: ['Python', 'XGBoost', 'Pandas', 'Kaggle', 'Jupyter'],
    githubUrl: 'https://github.com/swaroop-khan/house-price-prediction',
    stars: 1,
    forks: 0,
    featured: true
  },
  {
    id: 'titanic-ml',
    title: 'Titanic Survival Machine Learning',
    description: 'Comprehensive tabular classification pipeline demonstrating feature extraction, missing-value imputation, stratified cross-validation, and ensemble decision evaluation.',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/swaroop-khan/titanic-survival-ml',
    stars: 1,
    forks: 0,
    featured: true
  },
  {
    id: 'graphic-editor',
    title: '2D Graphics Canvas Editor in C',
    description: 'Low-level character-based 2D graphics engine implemented in C, enabling dynamic rasterization and management of rectangles, lines, triangles, and circles through a structured terminal interface.',
    tags: ['C', 'Data Structures', 'Graphics', 'CLI'],
    githubUrl: 'https://github.com/swaroop-khan/graphic-editor',
    stars: 1,
    forks: 0,
    featured: true
  },
  {
    id: 'developer-portfolio',
    title: 'Interactive Developer Portfolio',
    description: 'Personal web engineering showcase and profile application built with TypeScript and modern component architecture, deployed globally on Vercel.',
    tags: ['TypeScript', 'JavaScript', 'CSS3', 'Vercel'],
    githubUrl: 'https://github.com/swaroop-khan/swaroop-portfolio',
    liveUrl: 'https://swaroop-portfolio-one.vercel.app',
    stars: 0,
    forks: 0,
    featured: true
  }
];

export function generateMarkdown(profile: ProfileData, badges: TechBadge[]): string {
  const customColors = profile.bannerTheme.gradientColors.join(',');
  const encodedName = encodeURIComponent(profile.developerName);
  const encodedDesc = encodeURIComponent(`${profile.role} | Applied AI Developer`);
  const bannerUrl = `https://capsule-render.vercel.app/api?type=${profile.bannerTheme.type}&color=gradient&customColorList=0,1,2,3&customColors=${customColors}&height=${profile.bannerTheme.height}&section=header&text=${encodedName}&fontSize=${profile.bannerTheme.fontSize}&fontAlignY=38&desc=${encodedDesc}&descAlignY=62&descSize=19&fontColor=ffffff&stroke=0EA5E9&strokeWidth=0`;

  const linesParam = profile.taglineLines.map(l => encodeURIComponent(l)).join(';');
  const typingUrl = `https://readme-typing-svg.demolab.com?font=${profile.typingConfig.font}&weight=${profile.typingConfig.weight}&size=${profile.typingConfig.size}&duration=${profile.typingConfig.duration}&pause=${profile.typingConfig.pause}&color=${profile.typingConfig.color}&center=true&vCenter=true&multiline=false&width=620&height=45&lines=${linesParam}`;

  const selectedBadges = badges.filter(b => profile.selectedTech.includes(b.id));

  const languagesBadges = selectedBadges
    .filter(b => b.category === 'languages')
    .map(b => `  <img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`)
    .join('\n');

  const mlBadges = selectedBadges
    .filter(b => b.category === 'ml_ds')
    .map(b => `  <img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`)
    .join('\n');

  const aiBadges = selectedBadges
    .filter(b => b.category === 'ai_ecosystem')
    .map(b => `  <img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`)
    .join('\n');

  const webBadges = selectedBadges
    .filter(b => b.category === 'web')
    .map(b => `  <img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`)
    .join('\n');

  const toolBadges = selectedBadges
    .filter(b => b.category === 'tools')
    .map(b => `  <img src="https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.badgeColor}?style=${profile.badgeStyle}&logo=${b.logo}&logoColor=${b.logoColor || 'white'}" alt="${b.name}" height="28" />`)
    .join('\n');

  return `<div align="center">

<!-- Hero Banner Header -->
<a href="${profile.portfolioUrl}">
  <img src="${bannerUrl}" alt="${profile.developerName} Banner" width="100%" />
</a>

<!-- Typing Effect Tagline -->
<p align="center">
  <a href="${profile.portfolioUrl}">
    <img src="${typingUrl}" alt="Typing Tagline" />
  </a>
</p>

<!-- Quick Badges / Social Links Bar -->
<p align="center">
  <a href="${profile.portfolioUrl}"><img src="https://img.shields.io/badge/Portfolio-0EA5E9?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="${profile.linkedinUrl}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="${profile.githubUrl}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="${profile.leetcodeUrl}"><img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode" /></a>
  <a href="mailto:${profile.email}"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<p align="center">
  <em>${profile.philosophy}</em>
</p>

</div>

<br />

---

### ⚡ Overview & Terminal Profile

\`\`\`jsonc
{
  "developer": "${profile.developerName}",
  "location": "${profile.location}",
  "role": "${profile.role}",
  "focus": [
    "Artificial Intelligence",
    "Machine Learning",
    "System Design & Architecture"
  ],
  "currently_building": "${profile.currentlyBuilding}",
  "philosophy": "${profile.philosophy}"
}
\`\`\`

<table>
  <tr>
    <td width="50%" valign="top">
      <h4>📍 Core Directives</h4>
      <ul>
        <li><strong>Location:</strong> Bangalore, Karnataka, India</li>
        <li><strong>Current Focus:</strong> ${profile.currentFocus}</li>
        <li><strong>Specialization:</strong> ${profile.specialization}</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h4>🎯 Vision & Objective</h4>
      <ul>
        <li><strong>Building:</strong> Resilient AI-driven tools with clean UX and predictable inference.</li>
        <li><strong>Exploration:</strong> End-to-end ML lifecycle — Data Cleaning, Feature Engineering, Evaluation, Serving.</li>
        <li><strong>Collaboration:</strong> Open to research discussions and impactful open-source tooling.</li>
      </ul>
    </td>
  </tr>
</table>

<br />

---

### 🛠️ Tech Stack & Architecture

Organized by functional domains to reflect production engineering standards.

<br />

#### 💻 Programming Languages
<p align="left">
${languagesBadges}
</p>

#### 🧠 Machine Learning & Data Science
<p align="left">
${mlBadges}
</p>

#### 🚀 AI & Development Ecosystem
<p align="left">
${aiBadges}
</p>

#### 🌐 Web Development & Infrastructure
<p align="left">
${webBadges}
</p>

#### ⚙️ Developer Tools & Hardware
<p align="left">
${toolBadges}
</p>

<br />

---

### 📊 GitHub Analytics & Most Used Languages

<div align="center">
  <a href="${profile.githubUrl}">
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&langs_count=8&theme=${profile.statsTheme}&hide_border=true&hide=jupyter%20notebook" alt="Top Languages - ${profile.developerName}" width="460px" />
  </a>
</div>

<br />

---

### 🤝 Connect & Collaborate

<div align="center">
  <p>Whether you're looking to discuss AI system architectures, machine learning modeling, or building intelligent tools, let's connect!</p>

  <a href="${profile.portfolioUrl}">
    <img src="https://img.shields.io/badge/🌐_Portfolio-swaroop--khan.github.io-0EA5E9?style=for-the-badge&logoColor=white" alt="Portfolio" />
  </a>
  &nbsp;
  <a href="${profile.linkedinUrl}">
    <img src="https://img.shields.io/badge/💼_LinkedIn-swaroop--khan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  &nbsp;
  <a href="${profile.githubUrl}">
    <img src="https://img.shields.io/badge/🐙_GitHub-swaroop--khan-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <br /><br />
  <a href="${profile.leetcodeUrl}">
    <img src="https://img.shields.io/badge/🧠_LeetCode-swaroop--khan-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode" />
  </a>
  &nbsp;
  <a href="mailto:${profile.email}">
    <img src="https://img.shields.io/badge/✉️_Email-${profile.email}-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</div>

<br />

<div align="center">
  <sub>Designed with precision for <a href="${profile.githubUrl}">@${profile.githubUsername}</a> • AI & ML Systems</sub>
</div>
`;
}
