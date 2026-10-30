import { ProfileData, TechBadge, ProjectCard } from '../types';

export const ALL_TECH_BADGES: TechBadge[] = [
  // Programming Languages
  { id: 'c', name: 'C', category: 'languages', badgeColor: '00599C', logo: 'c', logoColor: 'white', level: 'Advanced', highlight: 'Systems programming & algorithmic logic' },
  { id: 'cpp', name: 'C++', category: 'languages', badgeColor: '00599C', logo: 'c%2B%2B', logoColor: 'white', level: 'Advanced', highlight: 'STL, Data Structures, OOP architecture' },
  { id: 'python', name: 'Python', category: 'languages', badgeColor: '3776AB', logo: 'python', logoColor: 'white', level: 'Expert', highlight: 'ML Modeling, PyTorch/Scikit, Data Pipelines' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', badgeColor: 'F7DF1E', logo: 'javascript', logoColor: 'black', level: 'Advanced', highlight: 'Modern ES6+, Async Event Loops & Tooling' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', badgeColor: '3178C6', logo: 'typescript', logoColor: 'white', level: 'Advanced', highlight: 'Type safety, Scalable frontends & APIs' },
  { id: 'sql', name: 'SQL', category: 'languages', badgeColor: '336791', logo: 'postgresql', logoColor: 'white', level: 'Advanced', highlight: 'Relational query optimization, joins & schemas' },

  // Machine Learning & Data Science
  { id: 'numpy', name: 'NumPy', category: 'ml_ds', badgeColor: '013243', logo: 'numpy', logoColor: 'white', level: 'Expert', highlight: 'Vectorized N-dim tensors, linear algebra' },
  { id: 'pandas', name: 'Pandas', category: 'ml_ds', badgeColor: '150458', logo: 'pandas', logoColor: 'white', level: 'Expert', highlight: 'Feature engineering, tabular data manipulation' },
  { id: 'matplotlib', name: 'Matplotlib', category: 'ml_ds', badgeColor: '11557C', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Scientific visualization & analytical plotting' },
  { id: 'seaborn', name: 'Seaborn', category: 'ml_ds', badgeColor: '388E3C', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Statistical distribution graphics & correlation' },
  { id: 'plotly', name: 'Plotly', category: 'ml_ds', badgeColor: '3F4F75', logo: 'plotly', logoColor: 'white', level: 'Advanced', highlight: 'Interactive visual exploration dashboards' },
  { id: 'scikitlearn', name: 'Scikit-Learn', category: 'ml_ds', badgeColor: 'F7931E', logo: 'scikit-learn', logoColor: 'white', level: 'Expert', highlight: 'Supervised/unsupervised pipelines, cross-validation' },
  { id: 'xgboost', name: 'XGBoost', category: 'ml_ds', badgeColor: '185387', logo: 'xgboost', logoColor: 'white', level: 'Expert', highlight: 'Gradient boosted trees, tabular leaderboard benchmarks' },
  { id: 'imbalancedlearn', name: 'Imbalanced-Learn', category: 'ml_ds', badgeColor: 'E25A1C', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'SMOTE, Resampling, Class imbalance mitigation' },
  { id: 'optuna', name: 'Optuna', category: 'ml_ds', badgeColor: '1A73E8', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Bayesian hyperparameter optimization pruning' },
  { id: 'joblib', name: 'Joblib', category: 'ml_ds', badgeColor: '4B8BBE', logo: 'python', logoColor: 'white', level: 'Advanced', highlight: 'Model persistence, parallel CPU pipelining' },
  { id: 'pytorch', name: 'PyTorch', category: 'ml_ds', badgeColor: 'EE4C2C', logo: 'pytorch', logoColor: 'white', level: 'Advanced', highlight: 'Deep neural networks, autograd & training loops' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ml_ds', badgeColor: 'FF6F00', logo: 'tensorflow', logoColor: 'white', level: 'Intermediate', highlight: 'Keras architectures & graph computation' },

  // AI & Development Ecosystem
  { id: 'streamlit', name: 'Streamlit', category: 'ai_ecosystem', badgeColor: 'FF4B4B', logo: 'streamlit', logoColor: 'white', level: 'Expert', highlight: 'Rapid reactive AI demos & ML web apps' },
  { id: 'jupyter', name: 'Jupyter', category: 'ai_ecosystem', badgeColor: 'F37626', logo: 'jupyter', logoColor: 'white', level: 'Expert', highlight: 'Interactive exploratory research & prototyping' },
  { id: 'kaggle', name: 'Kaggle', category: 'ai_ecosystem', badgeColor: '20BEFF', logo: 'kaggle', logoColor: 'white', level: 'Advanced', highlight: 'Competitions, benchmark datasets & notebooks' },
  { id: 'assemblyai', name: 'AssemblyAI', category: 'ai_ecosystem', badgeColor: '1E1E2F', logo: 'soundcharts', logoColor: 'white', level: 'Advanced', highlight: 'Speech-to-text, audio intelligence & transcription' },
  { id: 'supabase', name: 'Supabase', category: 'ai_ecosystem', badgeColor: '3ECF8E', logo: 'supabase', logoColor: 'white', level: 'Advanced', highlight: 'PostgreSQL backend, vector embeddings & auth' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai_ecosystem', badgeColor: 'FFD21E', logo: 'huggingface', logoColor: 'black', level: 'Advanced', highlight: 'Transformers, model hubs & pipeline APIs' },
  { id: 'langchain', name: 'LangChain', category: 'ai_ecosystem', badgeColor: '1C3C3C', logo: 'chainlink', logoColor: 'white', level: 'Advanced', highlight: 'Agentic workflows, chains & tool orchestration' },

  // Web Development & Infrastructure
  { id: 'html5', name: 'HTML5', category: 'web', badgeColor: 'E34F26', logo: 'html5', logoColor: 'white', level: 'Expert', highlight: 'Semantic document structure & accessibility' },
  { id: 'css3', name: 'CSS3', category: 'web', badgeColor: '1572B6', logo: 'css3', logoColor: 'white', level: 'Expert', highlight: 'Responsive grid, flexbox & design systems' },
  { id: 'nodejs', name: 'Node.js', category: 'web', badgeColor: '339933', logo: 'node.js', logoColor: 'white', level: 'Advanced', highlight: 'Backend services, REST APIs & microservices' },
  { id: 'vercel', name: 'Vercel', category: 'web', badgeColor: '000000', logo: 'vercel', logoColor: 'white', level: 'Advanced', highlight: 'Serverless deployment, edge caching & CDN' },
  { id: 'react', name: 'React', category: 'web', badgeColor: '61DAFB', logo: 'react', logoColor: 'black', level: 'Advanced', highlight: 'Component architectures & reactive state UI' },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'web', badgeColor: '06B6D4', logo: 'tailwindcss', logoColor: 'white', level: 'Advanced', highlight: 'Utility-first modern styling & responsiveness' },
  { id: 'fastapi', name: 'FastAPI', category: 'web', badgeColor: '009688', logo: 'fastapi', logoColor: 'white', level: 'Advanced', highlight: 'High-performance async Python model serving APIs' },

  // Developer Tools & Hardware
  { id: 'git', name: 'Git', category: 'tools', badgeColor: 'F05032', logo: 'git', logoColor: 'white', level: 'Expert', highlight: 'Version control, atomic commits & branch strategy' },
  { id: 'github', name: 'GitHub', category: 'tools', badgeColor: '181717', logo: 'github', logoColor: 'white', level: 'Expert', highlight: 'Actions, CI/CD pipelines & open source' },
  { id: 'arduino', name: 'Arduino', category: 'tools', badgeColor: '00979D', logo: 'arduino', logoColor: 'white', level: 'Intermediate', highlight: 'Microcontroller programming & sensor hardware' },
  { id: 'docker', name: 'Docker', category: 'tools', badgeColor: '2496ED', logo: 'docker', logoColor: 'white', level: 'Intermediate', highlight: 'Containerized deployment & reproducible environments' },
  { id: 'linux', name: 'Linux / Bash', category: 'tools', badgeColor: 'FCC624', logo: 'linux', logoColor: 'black', level: 'Advanced', highlight: 'Shell scripting, server automation & POSIX CLI' }
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
  customSections: [
    {
      id: 'ml_lifecycle',
      title: 'Machine Learning Workflow Architecture',
      content: '1. Problem Formulation & Data Exploration\n2. Feature Engineering & Preprocessing (Imbalanced-Learn, Pandas)\n3. Model Training & Validation (Scikit-Learn, XGBoost)\n4. Bayesian Optimization & Tuning (Optuna)\n5. Deployment & Interactive UI (Streamlit, Supabase, Vercel)',
      enabled: true
    }
  ]
};

export const FEATURED_PROJECTS: ProjectCard[] = [
  {
    id: 'agentic-pipeline',
    title: 'Agentic ML Modeling Pipeline',
    description: 'Autonomous data cleaning, automated feature selection with cross-validation and Optuna Bayesian tuning dashboard.',
    tags: ['Python', 'Scikit-Learn', 'Optuna', 'Streamlit'],
    githubUrl: 'https://github.com/swaroop-khan',
    stars: 18,
    forks: 5,
    featured: true
  },
  {
    id: 'speech-intelligence',
    title: 'Speech Intelligence & Audio Extraction',
    description: 'Speech-to-text transcription and automated semantic insight summarizer built with AssemblyAI and Supabase.',
    tags: ['AssemblyAI', 'Python', 'Supabase', 'Node.js'],
    githubUrl: 'https://github.com/swaroop-khan',
    stars: 14,
    forks: 3,
    featured: true
  },
  {
    id: 'imbalanced-benchmark',
    title: 'Imbalanced Tabular Classifier Benchmark',
    description: 'Comparative framework evaluating SMOTE variants, XGBoost hyperparameter landscapes, and cost-sensitive loss curves.',
    tags: ['XGBoost', 'Imbalanced-Learn', 'Plotly', 'Pandas'],
    githubUrl: 'https://github.com/swaroop-khan',
    stars: 22,
    forks: 7,
    featured: true
  },
  {
    id: 'fullstack-ai-hub',
    title: 'Developer Profile & System Architecture Showcase',
    description: 'Production web application delivering interactive model inference simulations, responsive terminal, and dynamic README customization.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/swaroop-khan',
    liveUrl: 'https://swaroop-khan.github.io/portfolio/',
    stars: 27,
    forks: 9,
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
