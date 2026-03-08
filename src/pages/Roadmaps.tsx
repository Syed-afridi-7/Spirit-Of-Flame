import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, Shield, Cloud, Code2, Database, Server, PenTool, Link as LinkIcon,
  Smartphone, Sparkles, ChevronRight, ChevronDown, ExternalLink,
  BookOpen, CheckCircle2, Circle, Lock, Star, TrendingUp, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Resource {
  name: string;
  url: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  free: boolean;
}

interface Phase {
  title: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  skills: string[];
  resources: Resource[];
}

interface Roadmap {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
  avgSalary: string;
  demand: string;
  phases: Phase[];
}

const roadmaps: Roadmap[] = [
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    icon: Brain,
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-violet-600',
    description: 'Build intelligent systems with deep learning, NLP, and generative AI.',
    avgSalary: '₹12-35 LPA',
    demand: 'Very High',
    phases: [
      {
        title: 'Foundation',
        level: 'Basic',
        skills: ['Python Programming', 'NumPy & Pandas', 'Linear Algebra & Statistics', 'Data Visualization (Matplotlib)'],
        resources: [
          { name: 'Python for Everybody (Coursera)', url: 'https://www.coursera.org/specializations/python', level: 'Basic', free: true },
          { name: 'Khan Academy - Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra', level: 'Basic', free: true },
          { name: 'Kaggle Learn - Pandas', url: 'https://www.kaggle.com/learn/pandas', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Core ML & Deep Learning',
        level: 'Intermediate',
        skills: ['Scikit-learn', 'TensorFlow / PyTorch', 'CNNs & RNNs', 'Model Evaluation & Tuning'],
        resources: [
          { name: 'Andrew Ng - Machine Learning (Coursera)', url: 'https://www.coursera.org/learn/machine-learning', level: 'Intermediate', free: false },
          { name: 'Fast.ai - Practical Deep Learning', url: 'https://www.fast.ai/', level: 'Intermediate', free: true },
          { name: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'Generative AI & Production',
        level: 'Advanced',
        skills: ['LangChain & RAG', 'LLM Fine-tuning', 'MLOps (MLflow, Kubeflow)', 'Prompt Engineering'],
        resources: [
          { name: 'DeepLearning.AI - LangChain', url: 'https://www.deeplearning.ai/', level: 'Advanced', free: false },
          { name: 'Hugging Face Course', url: 'https://huggingface.co/course', level: 'Advanced', free: true },
          { name: 'Made With ML', url: 'https://madewithml.com/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'cybersecurity-specialist',
    title: 'Cybersecurity Specialist',
    icon: Shield,
    color: 'text-red-400',
    gradient: 'from-red-500 to-orange-600',
    description: 'Protect organizations from cyber threats through pentesting and SOC analysis.',
    avgSalary: '₹8-30 LPA',
    demand: 'Very High',
    phases: [
      {
        title: 'Networking & OS Fundamentals',
        level: 'Basic',
        skills: ['TCP/IP & OSI Model', 'Linux Administration', 'Windows Security', 'Network Protocols'],
        resources: [
          { name: 'TryHackMe - Pre-Security Path', url: 'https://tryhackme.com/path/outline/presecurity', level: 'Basic', free: true },
          { name: 'Professor Messer - CompTIA Network+', url: 'https://www.professormesser.com/', level: 'Basic', free: true },
          { name: 'OverTheWire - Bandit', url: 'https://overthewire.org/wargames/bandit/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Security Tools & Pentesting',
        level: 'Intermediate',
        skills: ['Burp Suite & OWASP Top 10', 'Nmap & Wireshark', 'Metasploit Framework', 'Web Application Security'],
        resources: [
          { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', level: 'Intermediate', free: true },
          { name: 'TryHackMe - Jr Penetration Tester', url: 'https://tryhackme.com/', level: 'Intermediate', free: false },
          { name: 'HackTheBox Academy', url: 'https://academy.hackthebox.com/', level: 'Intermediate', free: false },
        ],
      },
      {
        title: 'Advanced & Certifications',
        level: 'Advanced',
        skills: ['CompTIA Security+ / CEH', 'OSCP Preparation', 'SOC Analysis & SIEM', 'Malware Analysis & Reverse Engineering'],
        resources: [
          { name: 'Cybrary - SOC Analyst Path', url: 'https://www.cybrary.it/', level: 'Advanced', free: false },
          { name: 'HackTheBox Pro Labs', url: 'https://www.hackthebox.com/', level: 'Advanced', free: false },
          { name: 'SANS Cyber Aces', url: 'https://www.sans.org/cyberaces/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    icon: Cloud,
    color: 'text-sky-400',
    gradient: 'from-sky-500 to-blue-600',
    description: 'Design and manage scalable cloud infrastructure on AWS, Azure, or GCP.',
    avgSalary: '₹15-45 LPA',
    demand: 'High',
    phases: [
      {
        title: 'Cloud Basics',
        level: 'Basic',
        skills: ['Cloud Computing Concepts', 'AWS / Azure / GCP Console', 'Virtual Machines & Networking', 'Storage Services (S3, Blob)'],
        resources: [
          { name: 'AWS Cloud Practitioner Essentials', url: 'https://explore.skillbuilder.aws/', level: 'Basic', free: true },
          { name: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', level: 'Basic', free: true },
          { name: 'Microsoft Learn - Azure Fundamentals', url: 'https://learn.microsoft.com/en-us/training/azure/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Infrastructure & Automation',
        level: 'Intermediate',
        skills: ['Terraform / CloudFormation', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Load Balancing & Auto Scaling'],
        resources: [
          { name: 'A Cloud Guru', url: 'https://acloudguru.com/', level: 'Intermediate', free: false },
          { name: 'KodeKloud - Terraform', url: 'https://kodekloud.com/', level: 'Intermediate', free: false },
          { name: 'Kubernetes.io - Tutorials', url: 'https://kubernetes.io/docs/tutorials/', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'Architecture & Certifications',
        level: 'Advanced',
        skills: ['AWS Solutions Architect Pro', 'Multi-cloud Strategy', 'Serverless Architecture', 'Cost Optimization & FinOps'],
        resources: [
          { name: 'AWS Skill Builder - SA Pro', url: 'https://explore.skillbuilder.aws/', level: 'Advanced', free: false },
          { name: 'Adrian Cantrill - AWS Courses', url: 'https://learn.cantrill.io/', level: 'Advanced', free: false },
          { name: 'Cloud Architecture Patterns (Book)', url: 'https://www.oreilly.com/', level: 'Advanced', free: false },
        ],
      },
    ],
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    icon: Code2,
    color: 'text-green-400',
    gradient: 'from-green-500 to-emerald-600',
    description: 'Build complete web applications from frontend to backend and deployment.',
    avgSalary: '₹8-30 LPA',
    demand: 'Very High',
    phases: [
      {
        title: 'Frontend Foundations',
        level: 'Basic',
        skills: ['HTML5, CSS3, JavaScript ES6+', 'Responsive Design & Flexbox/Grid', 'React.js Fundamentals', 'Git & Version Control'],
        resources: [
          { name: 'FreeCodeCamp - Responsive Web Design', url: 'https://www.freecodecamp.org/', level: 'Basic', free: true },
          { name: 'The Odin Project - Foundations', url: 'https://www.theodinproject.com/', level: 'Basic', free: true },
          { name: 'JavaScript.info', url: 'https://javascript.info/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Backend & Databases',
        level: 'Intermediate',
        skills: ['Node.js / Express.js', 'TypeScript', 'PostgreSQL / MongoDB', 'REST APIs & Authentication'],
        resources: [
          { name: 'The Odin Project - Full Stack JavaScript', url: 'https://www.theodinproject.com/', level: 'Intermediate', free: true },
          { name: 'Neon.tech - PostgreSQL Tutorials', url: 'https://neon.tech/docs', level: 'Intermediate', free: true },
          { name: 'FreeCodeCamp - Backend Certification', url: 'https://www.freecodecamp.org/', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'Advanced & Deployment',
        level: 'Advanced',
        skills: ['Next.js & SSR/SSG', 'Docker & CI/CD', 'System Design Basics', 'Testing (Jest, Cypress)'],
        resources: [
          { name: 'Next.js Official Docs', url: 'https://nextjs.org/learn', level: 'Advanced', free: true },
          { name: 'Vercel Deployment Guides', url: 'https://vercel.com/docs', level: 'Advanced', free: true },
          { name: 'FullStackOpen (University of Helsinki)', url: 'https://fullstackopen.com/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: Database,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-teal-600',
    description: 'Extract insights from data using statistics, ML, and visualization tools.',
    avgSalary: '₹10-35 LPA',
    demand: 'High',
    phases: [
      {
        title: 'Data Fundamentals',
        level: 'Basic',
        skills: ['Python / R Programming', 'SQL & Database Queries', 'Excel & Google Sheets', 'Descriptive Statistics'],
        resources: [
          { name: 'Google Data Analytics (Coursera)', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', level: 'Basic', free: false },
          { name: 'DataCamp - Introduction to Python', url: 'https://www.datacamp.com/', level: 'Basic', free: false },
          { name: 'Mode Analytics - SQL Tutorial', url: 'https://mode.com/sql-tutorial/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Analysis & Visualization',
        level: 'Intermediate',
        skills: ['Pandas & NumPy', 'Tableau / Power BI', 'Hypothesis Testing', 'Feature Engineering'],
        resources: [
          { name: 'Kaggle Learn - Data Visualization', url: 'https://www.kaggle.com/learn', level: 'Intermediate', free: true },
          { name: 'DataCamp - Data Scientist Track', url: 'https://www.datacamp.com/', level: 'Intermediate', free: false },
          { name: 'Tableau Public - Free Learning', url: 'https://public.tableau.com/', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'ML & Production',
        level: 'Advanced',
        skills: ['Machine Learning Models', 'Deep Learning Basics', 'A/B Testing & Experimentation', 'Data Pipelines (Airflow, dbt)'],
        resources: [
          { name: 'Andrew Ng - ML Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction', level: 'Advanced', free: false },
          { name: 'Kaggle Competitions', url: 'https://www.kaggle.com/competitions', level: 'Advanced', free: true },
          { name: 'Made With ML', url: 'https://madewithml.com/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    icon: Server,
    color: 'text-orange-400',
    gradient: 'from-orange-500 to-amber-600',
    description: 'Automate deployments, manage infrastructure, and bridge dev with operations.',
    avgSalary: '₹10-40 LPA',
    demand: 'High',
    phases: [
      {
        title: 'Linux & Scripting',
        level: 'Basic',
        skills: ['Linux System Administration', 'Bash Scripting', 'Git & GitHub Actions', 'Networking Fundamentals'],
        resources: [
          { name: 'KodeKloud - Linux Basics', url: 'https://kodekloud.com/', level: 'Basic', free: false },
          { name: 'DevOps Directive (YouTube)', url: 'https://www.youtube.com/@DevOpsDirective', level: 'Basic', free: true },
          { name: 'Linux Journey', url: 'https://linuxjourney.com/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'CI/CD & Containers',
        level: 'Intermediate',
        skills: ['Docker & Docker Compose', 'Jenkins / GitHub Actions', 'Ansible & Configuration Mgmt', 'Monitoring (Prometheus, Grafana)'],
        resources: [
          { name: 'KodeKloud - Docker', url: 'https://kodekloud.com/', level: 'Intermediate', free: false },
          { name: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions', level: 'Intermediate', free: true },
          { name: 'TechWorld with Nana (YouTube)', url: 'https://www.youtube.com/@TechWorldwithNana', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'Cloud & Orchestration',
        level: 'Advanced',
        skills: ['Kubernetes & Helm', 'Terraform & IaC', 'AWS/Azure/GCP Services', 'Site Reliability Engineering'],
        resources: [
          { name: 'KodeKloud - CKA Certification', url: 'https://kodekloud.com/', level: 'Advanced', free: false },
          { name: 'Kubernetes.io - Official Docs', url: 'https://kubernetes.io/docs/', level: 'Advanced', free: true },
          { name: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Product Designer',
    icon: PenTool,
    color: 'text-pink-400',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Design intuitive and beautiful user experiences for digital products.',
    avgSalary: '₹6-25 LPA',
    demand: 'High',
    phases: [
      {
        title: 'Design Principles',
        level: 'Basic',
        skills: ['Color Theory & Typography', 'UI Design Fundamentals', 'Wireframing & Prototyping', 'Design Thinking Process'],
        resources: [
          { name: 'Google UX Design Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design', level: 'Basic', free: false },
          { name: 'Figma - Getting Started', url: 'https://www.figma.com/resources/learn-design/', level: 'Basic', free: true },
          { name: 'Laws of UX', url: 'https://lawsofux.com/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Tools & Practice',
        level: 'Intermediate',
        skills: ['Figma Advanced', 'Adobe XD / Sketch', 'User Research Methods', 'Usability Testing'],
        resources: [
          { name: 'UX Collective (Medium)', url: 'https://uxdesign.cc/', level: 'Intermediate', free: true },
          { name: 'Refactoring UI', url: 'https://www.refactoringui.com/', level: 'Intermediate', free: false },
          { name: 'Daily UI Challenge', url: 'https://www.dailyui.co/', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'Portfolio & Advanced',
        level: 'Advanced',
        skills: ['Design Systems', 'Motion Design (After Effects)', 'Accessibility (WCAG)', 'Product Strategy & Metrics'],
        resources: [
          { name: 'Designership - Portfolio Guide', url: 'https://www.thedesignership.com/', level: 'Advanced', free: true },
          { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/', level: 'Advanced', free: false },
          { name: 'Nielsen Norman Group Articles', url: 'https://www.nngroup.com/articles/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    icon: LinkIcon,
    color: 'text-indigo-400',
    gradient: 'from-indigo-500 to-blue-600',
    description: 'Build decentralized applications and smart contracts on blockchain networks.',
    avgSalary: '₹10-40 LPA',
    demand: 'Growing',
    phases: [
      {
        title: 'Blockchain Basics',
        level: 'Basic',
        skills: ['Blockchain Fundamentals', 'Cryptography Basics', 'Bitcoin & Ethereum Concepts', 'JavaScript / TypeScript'],
        resources: [
          { name: 'CryptoZombies', url: 'https://cryptozombies.io/', level: 'Basic', free: true },
          { name: 'Blockchain Basics (Coursera)', url: 'https://www.coursera.org/learn/blockchain-basics', level: 'Basic', free: false },
          { name: 'Ethereum.org - Learn', url: 'https://ethereum.org/en/learn/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Smart Contracts & DApps',
        level: 'Intermediate',
        skills: ['Solidity Programming', 'Hardhat / Truffle', 'Web3.js / Ethers.js', 'ERC-20 & ERC-721 Tokens'],
        resources: [
          { name: 'Alchemy University', url: 'https://university.alchemy.com/', level: 'Intermediate', free: true },
          { name: 'Solidity by Example', url: 'https://solidity-by-example.org/', level: 'Intermediate', free: true },
          { name: 'Patrick Collins - Blockchain (YouTube)', url: 'https://www.youtube.com/@PatrickAlphaC', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'DeFi & Advanced',
        level: 'Advanced',
        skills: ['DeFi Protocols', 'Smart Contract Security (Auditing)', 'Layer 2 Solutions', 'Cross-chain Development'],
        resources: [
          { name: 'Damn Vulnerable DeFi', url: 'https://www.damnvulnerabledefi.xyz/', level: 'Advanced', free: true },
          { name: 'Ethernaut (OpenZeppelin)', url: 'https://ethernaut.openzeppelin.com/', level: 'Advanced', free: true },
          { name: 'Secureum Bootcamp', url: 'https://secureum.substack.com/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'mobile-app-developer',
    title: 'Mobile App Developer',
    icon: Smartphone,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500 to-green-600',
    description: 'Build cross-platform and native mobile apps for iOS and Android.',
    avgSalary: '₹8-30 LPA',
    demand: 'High',
    phases: [
      {
        title: 'Mobile Fundamentals',
        level: 'Basic',
        skills: ['Dart / JavaScript / Swift basics', 'Mobile UI Principles', 'State Management Concepts', 'App Lifecycle'],
        resources: [
          { name: 'Flutter Official Docs', url: 'https://docs.flutter.dev/', level: 'Basic', free: true },
          { name: 'React Native - Getting Started', url: 'https://reactnative.dev/docs/getting-started', level: 'Basic', free: true },
          { name: 'Hacking with Swift - 100 Days', url: 'https://www.hackingwithswift.com/100', level: 'Basic', free: true },
        ],
      },
      {
        title: 'App Development',
        level: 'Intermediate',
        skills: ['Flutter / React Native Full Apps', 'API Integration & HTTP', 'Local Storage & SQLite', 'Navigation & Routing'],
        resources: [
          { name: 'Flutter Codelabs', url: 'https://docs.flutter.dev/codelabs', level: 'Intermediate', free: true },
          { name: 'React Native - Expo Docs', url: 'https://docs.expo.dev/', level: 'Intermediate', free: true },
          { name: 'App Brewery (Udemy)', url: 'https://www.udemy.com/', level: 'Intermediate', free: false },
        ],
      },
      {
        title: 'Advanced & Publishing',
        level: 'Advanced',
        skills: ['Performance Optimization', 'CI/CD for Mobile (Fastlane)', 'App Store / Play Store Publishing', 'Push Notifications & Firebase'],
        resources: [
          { name: 'Firebase Docs', url: 'https://firebase.google.com/docs', level: 'Advanced', free: true },
          { name: 'Flutter - Advanced Cookbook', url: 'https://docs.flutter.dev/cookbook', level: 'Advanced', free: true },
          { name: 'Hacking with Swift - Advanced', url: 'https://www.hackingwithswift.com/', level: 'Advanced', free: true },
        ],
      },
    ],
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer / AI Consultant',
    icon: Sparkles,
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-orange-600',
    description: 'Master LLM interactions, fine-tuning, and building AI-powered products.',
    avgSalary: '₹10-50 LPA',
    demand: 'Very High',
    phases: [
      {
        title: 'LLM Fundamentals',
        level: 'Basic',
        skills: ['How LLMs Work (Transformers)', 'Tokenization & Embeddings', 'Prompt Design Patterns', 'ChatGPT / Claude / Gemini Usage'],
        resources: [
          { name: 'DeepLearning.AI - ChatGPT Prompt Engineering', url: 'https://www.deeplearning.ai/', level: 'Basic', free: true },
          { name: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/', level: 'Basic', free: true },
          { name: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', level: 'Basic', free: true },
        ],
      },
      {
        title: 'Advanced Prompting & RAG',
        level: 'Intermediate',
        skills: ['Chain-of-Thought Prompting', 'RAG Architecture', 'LangChain / LlamaIndex', 'Vector Databases (Pinecone, Chroma)'],
        resources: [
          { name: 'LangChain Docs', url: 'https://docs.langchain.com/', level: 'Intermediate', free: true },
          { name: 'DeepLearning.AI - LangChain for LLM App Dev', url: 'https://www.deeplearning.ai/', level: 'Intermediate', free: true },
          { name: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn/', level: 'Intermediate', free: true },
        ],
      },
      {
        title: 'Fine-tuning & Production',
        level: 'Advanced',
        skills: ['Model Fine-tuning (LoRA, QLoRA)', 'AI Agent Frameworks', 'Evaluation & Benchmarking', 'AI Product Strategy & Ethics'],
        resources: [
          { name: 'Hugging Face - Fine-tuning LLMs', url: 'https://huggingface.co/docs', level: 'Advanced', free: true },
          { name: 'DeepLearning.AI - Finetuning LLMs', url: 'https://www.deeplearning.ai/', level: 'Advanced', free: true },
          { name: 'Anthropic Research Blog', url: 'https://www.anthropic.com/research', level: 'Advanced', free: true },
        ],
      },
    ],
  },
];

const levelColors = {
  Basic: 'bg-green-500/10 text-green-400 border-green-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const levelIcons = {
  Basic: Circle,
  Intermediate: CheckCircle2,
  Advanced: Star,
};

const Roadmaps = () => {
  const [expandedRoadmap, setExpandedRoadmap] = useState<string | null>(null);
  const [completedPhases, setCompletedPhases] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('roadmap-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleRoadmap = (id: string) => {
    setExpandedRoadmap(expandedRoadmap === id ? null : id);
  };

  const togglePhaseComplete = (roadmapId: string, phaseIndex: number) => {
    const key = `${roadmapId}-${phaseIndex}`;
    const updated = { ...completedPhases, [key]: !completedPhases[key] };
    setCompletedPhases(updated);
    localStorage.setItem('roadmap-progress', JSON.stringify(updated));
  };

  const getProgress = (roadmapId: string, totalPhases: number) => {
    let completed = 0;
    for (let i = 0; i < totalPhases; i++) {
      if (completedPhases[`${roadmapId}-${i}`]) completed++;
    }
    return Math.round((completed / totalPhases) * 100);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-purple-500/10 to-transparent border border-orange-500/20 p-6">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="text-orange-400" size={16} />
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">2026 Trending</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Career <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">Roadmaps</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Top 10 trending tech career paths for 2026 — each with a structured Basic to Advanced learning path, curated free resources, and progress tracking.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-40 h-40 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute right-20 bottom-0 w-24 h-24 bg-orange-500/5 rounded-full translate-y-8" />
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-foreground">10</div>
          <div className="text-xs text-muted-foreground">Career Paths</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-foreground">30</div>
          <div className="text-xs text-muted-foreground">Learning Phases</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-foreground">90+</div>
          <div className="text-xs text-muted-foreground">Curated Resources</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">
            {Math.round(roadmaps.reduce((acc, r) => acc + getProgress(r.id, r.phases.length), 0) / roadmaps.length)}%
          </div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </div>
      </div>

      {/* Roadmap Cards */}
      <div className="space-y-4">
        {roadmaps.map((roadmap, idx) => {
          const isExpanded = expandedRoadmap === roadmap.id;
          const progress = getProgress(roadmap.id, roadmap.phases.length);

          return (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-orange-500/30 transition-colors"
            >
              {/* Card Header */}
              <button
                onClick={() => toggleRoadmap(roadmap.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roadmap.gradient} flex items-center justify-center flex-shrink-0`}>
                  <roadmap.icon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-foreground text-base truncate">{roadmap.title}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      roadmap.demand === 'Very High' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      roadmap.demand === 'High' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {roadmap.demand} Demand
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{roadmap.description}</p>
                  {/* Progress bar */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-xs">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${roadmap.gradient} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{progress}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden md:block text-right">
                    <div className="text-xs font-semibold text-foreground">{roadmap.avgSalary}</div>
                    <div className="text-[10px] text-muted-foreground">Avg. Salary</div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4">
                      {roadmap.phases.map((phase, phaseIdx) => {
                        const phaseKey = `${roadmap.id}-${phaseIdx}`;
                        const isComplete = completedPhases[phaseKey];
                        const LevelIcon = levelIcons[phase.level];

                        return (
                          <motion.div
                            key={phaseIdx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: phaseIdx * 0.1 }}
                            className={`rounded-xl border p-4 transition-all ${
                              isComplete
                                ? 'bg-green-500/5 border-green-500/20'
                                : 'bg-muted/30 border-border/50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => togglePhaseComplete(roadmap.id, phaseIdx)}
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                                    isComplete
                                      ? 'bg-green-500 border-green-500 text-white'
                                      : 'border-muted-foreground/30 hover:border-orange-400'
                                  }`}
                                >
                                  {isComplete && <CheckCircle2 size={14} />}
                                </button>
                                <div>
                                  <h4 className={`font-semibold text-sm ${isComplete ? 'text-green-400' : 'text-foreground'}`}>
                                    Phase {phaseIdx + 1}: {phase.title}
                                  </h4>
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border mt-1 ${levelColors[phase.level]}`}>
                                    <LevelIcon size={10} /> {phase.level}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="ml-9 mb-3">
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Skills to Learn</div>
                              <div className="flex flex-wrap gap-1.5">
                                {phase.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-muted text-muted-foreground border border-border/50"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Resources */}
                            <div className="ml-9">
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Resources</div>
                              <div className="space-y-1.5">
                                {phase.resources.map((resource) => (
                                  <a
                                    key={resource.name}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-orange-400 transition-colors group/link"
                                  >
                                    <ExternalLink size={11} className="flex-shrink-0 group-hover/link:text-orange-400" />
                                    <span className="truncate">{resource.name}</span>
                                    <span className={`ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${levelColors[resource.level]}`}>
                                      {resource.level}
                                    </span>
                                    {resource.free && (
                                      <span className="text-[9px] font-bold text-green-400 flex-shrink-0">FREE</span>
                                    )}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Reference Banner */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <Zap size={16} className="text-orange-400" />
          <h3 className="font-semibold text-foreground text-sm">Additional Resources</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Roadmap.sh', desc: 'Visual career paths', url: 'https://roadmap.sh/' },
            { name: 'IndiaBix', desc: 'Aptitude practice', url: 'https://www.indiabix.com/' },
            { name: 'GeeksForGeeks', desc: 'DSA & CS fundamentals', url: 'https://www.geeksforgeeks.org/' },
            { name: 'BBC Learning English', desc: 'English improvement', url: 'https://www.bbc.co.uk/learningenglish' },
          ].map((res) => (
            <a
              key={res.name}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 transition-all group/res"
            >
              <BookOpen size={14} className="text-muted-foreground group-hover/res:text-orange-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground group-hover/res:text-orange-400 truncate">{res.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{res.desc}</div>
              </div>
              <ExternalLink size={12} className="text-muted-foreground ml-auto flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
