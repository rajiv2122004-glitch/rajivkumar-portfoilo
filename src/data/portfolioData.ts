import { Project, SkillCategory, TimelineMilestone } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Rajiv Kumar H N',
  headline: 'AI Research & Marketing Specialist',
  subheading: 'Specializing in SEO, AEO, GEO, AI-Driven Lead Generation & Algorithmic Growth',
  bioShort:
    'AI Research & Marketing Specialist dedicated to unlocking organic authority, conversational search visibility (AEO/GEO), and scalable inbound pipelines. Combining systematic algorithmic analysis with data-backed content marketing architecture.',
  bioDetailed: [
    'Rajiv Kumar H N works at the intersection of machine intelligence research, generative search discovery, and enterprise growth marketing. As traditional search paradigms evolve toward conversational answers (AEO) and generative synthesis engines (GEO), Rajiv designs strategies that position brands as authoritative primary sources.',
    'At Nammaweb, Rajiv contributed extensively to the AI Index Survey initiative and AI research & marketing programs, analyzing market adoption, search engine algorithm shifts, and multi-channel inbound performance.',
    'Rajiv is committed to empirical rigor—refusing vanity metrics in favor of qualified leads, verified search equity, semantic knowledge graph authority, and measurable business growth.'
  ],
  email: 'rajiv2122004@gmail.com',
  whatsappNumber: '+91 7676546577',
  whatsappUrl:
    'https://wa.me/917676546577?text=Hello%20Rajiv%2C%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20connect.',
  linkedinUrl: 'https://www.linkedin.com/in/rajiv-kumar-h-n-a024683b5/',
  youtubeUrl: 'https://www.youtube.com/@Rajiv02-y6s1f',
  location: 'India',
  portraitImage: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/assets/aistudio/rajiv-office_17269915.jpg`,
};

export const CORE_SPECIALIZATIONS = [
  'Search Engine Optimization (SEO)',
  'Answer Engine Optimization (AEO)',
  'Generative Engine Optimization (GEO)',
  'AI-Driven Lead Generation',
  'AI Research & Algorithm Analysis',
  'Data-Backed Content Marketing',
  'Marketing Funnel Analytics',
  'Semantic Web & Schema Architecture'
];

export const PROJECTS: Project[] = [
  {
    id: 'nammaweb-ai-index-survey',
    title: 'Nammaweb AI Index Survey & Research Initiative',
    subtitle: 'Comprehensive AI Adoption & Search Engine Transition Benchmark',
    category: 'AI Research & AEO',
    summary:
      'Conducted in-depth AI research and market analysis for Nammaweb, developing the AI Index Survey to evaluate industry readiness, algorithmic search shifts, and conversational discovery trends.',
    problem:
      'With rapid advancements in generative AI and changes in how consumers find solutions online, businesses lacked benchmark visibility into how emerging search engines process and cite domain information.',
    approach:
      'Designed a structured research methodology surveying search pattern shifts, synthetic answer behaviors, and knowledge graph citations. Synthesized data across web presence matrices to establish actionable growth and AEO guidance.',
    tools: [
      'AI Research Frameworks',
      'Data Analysis Rubrics',
      'Google Search Console',
      'Knowledge Graph Auditing',
      'Qualitative Survey Instrumentation'
    ],
    outcomes: [
      'Established empirical benchmarks for brand citations in conversational answer environments.',
      'Created structured research documentation informing Nammaweb digital marketing and client strategies.',
      'Clarified key differentiation factors between traditional SERPs and generative AI search engines.'
    ],
    keyHighlight: 'Featured Research Milestone at Nammaweb',
    isVerified: true
  },
  {
    id: 'aeo-geo-citation-architecture',
    title: 'Generative & Answer Engine Optimization (AEO / GEO) Framework',
    subtitle: 'Structuring Digital Assets for Perplexity, ChatGPT, and Gemini Citations',
    category: 'AI Research & AEO',
    summary:
      'Engineered an entity-first optimization blueprint that aligns corporate digital assets with the retrieval augmented generation (RAG) and semantic extraction systems used by AI search engines.',
    problem:
      'Conventional keyword-stuffed SEO models fail to earn citations or appearances in modern AI summary boxes, resulting in loss of discovery across high-intent queries.',
    approach:
      'Architected hierarchical Schema.org markup, semantic entity triples, verified factual citation anchors, and direct question-answering page sections optimized for machine parsers.',
    tools: [
      'Schema.org JSON-LD',
      'Entity Extraction Models',
      'Semantic Search Triples',
      'Google Search Console',
      'Perplexity & Gemini Citation Trackers'
    ],
    outcomes: [
      'Enhanced presence in zero-click answers and conversational synthesis citations.',
      'Documented systematic guidelines for structuring long-form content into machine-indexable knowledge nodes.',
      'Built reusable diagnostic checklist for assessing domain AEO/GEO readiness.'
    ],
    keyHighlight: 'Modern Organic Search Architecture',
    isVerified: true
  },
  {
    id: 'ai-lead-generation-funnel',
    title: 'AI-Powered Inbound Lead Generation & Scoring Pipeline',
    subtitle: 'Data-Driven Acquisition Architecture with Automated Prospect Qualification',
    category: 'Digital Growth',
    summary:
      'Formulated an integrated inbound marketing engine leveraging AI research insights to identify buyer intent signals, orchestrate content delivery, and accelerate qualified pipeline generation.',
    problem:
      'High client acquisition costs and low qualification rates stemming from unsegmented traffic and manual inquiry triage.',
    approach:
      'Mapped customer journey touchpoints with intent-targeted assets, implementing automated qualification workflows and programmatic lead filtering based on verified engagement criteria.',
    tools: [
      'Inbound Funnel Mapping',
      'AI-Assisted Content Optimization',
      'Conversion Rate Optimization (CRO)',
      'Lead Qualification Rubrics',
      'Analytics Attribution Modeling'
    ],
    outcomes: [
      'Streamlined qualification workflow, filtering low-intent leads before sales handoff.',
      'Higher content engagement across conversion-oriented landing assets.',
      'Scalable framework applicable across diverse service and enterprise verticals.'
    ],
    keyHighlight: 'Scalable Growth Engine',
    isVerified: true
  },
  {
    id: 'data-driven-content-marketing',
    title: 'Strategic Content Marketing & Search Intent Clustering',
    subtitle: 'Search Authority Mapping & High-Conversion Content Strategy',
    category: 'Analytics & Search',
    summary:
      'Engineered topic-cluster content architectures designed to build topical authority, improve organic crawl efficiency, and address high-intent commercial search queries.',
    problem:
      'Fragmented blog publishing without topic cluster alignment leads to internal keyword cannibalization and low topical authority scores.',
    approach:
      'Organized core service domains into pillar pages surrounded by tightly linked, high-utility subtopic guides with clear conversion calls-to-action.',
    tools: [
      'Search Intent Clustering',
      'Keyword Cannibalization Audits',
      'Google Analytics 4',
      'Crawl Depth Optimization',
      'Content Performance Dashboards'
    ],
    outcomes: [
      'Cohesive topical authority architecture that reinforces core commercial landing pages.',
      'Improved internal linking topology reducing orphan page issues.',
      'Clear roadmap for continuous editorial publishing based on demonstrated query volume.'
    ],
    keyHighlight: 'Topical Authority Architecture',
    isVerified: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'search-discovery',
    name: 'Search & Generative Discovery',
    description: 'Mastery over both classical search engine algorithms and the new wave of conversational answer systems.',
    skills: [
      {
        name: 'Answer Engine Optimization (AEO)',
        level: 'Expert',
        focus: 'Direct answer extraction, conversational query structuring, schema microdata',
        tags: ['Perplexity', 'ChatGPT Search', 'Gemini', 'Knowledge Panels']
      },
      {
        name: 'Generative Engine Optimization (GEO)',
        level: 'Advanced',
        focus: 'Entity authority, citation optimization in RAG pipelines, primary source positioning',
        tags: ['Entity Graphs', 'Citation Equity', 'LLM Retrieval']
      },
      {
        name: 'Classical SEO & Technical Auditing',
        level: 'Expert',
        focus: 'Crawl budget, indexability, site speed, internal linking architecture',
        tags: ['Search Console', 'Core Web Vitals', 'Sitemaps', 'Robots.txt']
      },
      {
        name: 'Schema.org & Structured Data',
        level: 'Expert',
        focus: 'JSON-LD, Person, Organization, FAQ, Article, Product schema',
        tags: ['JSON-LD', 'Rich Snippets', 'Knowledge Graphs']
      }
    ]
  },
  {
    id: 'ai-research',
    name: 'AI Research & Analysis',
    description: 'Systematic study of generative AI behavior, prompt engineering, and machine learning market trends.',
    skills: [
      {
        name: 'AI Index Survey & Benchmark Analysis',
        level: 'Practitioner',
        focus: 'Conducted benchmark research at Nammaweb assessing market AI adoption and readiness',
        tags: ['Survey Design', 'Market Analysis', 'Nammaweb']
      },
      {
        name: 'LLM Behavior & Prompt Architecture',
        level: 'Advanced',
        focus: 'Optimizing prompts for research synthesis, content ideation, and workflow automation',
        tags: ['Prompt Engineering', 'Evaluation Rubrics', 'Context Windows']
      },
      {
        name: 'AI Tools & Productivity Automation',
        level: 'Advanced',
        focus: 'Deploying modern AI tools to accelerate market research and campaign production',
        tags: ['Workflow Automation', 'Synthetic Analysis', 'Tool Orchestration']
      }
    ]
  },
  {
    id: 'growth-marketing',
    name: 'Digital Growth & Lead Generation',
    description: 'Turning organic and AI-driven attention into predictable, qualified inbound business pipelines.',
    skills: [
      {
        name: 'AI-Driven Lead Generation',
        level: 'Advanced',
        focus: 'High-intent audience targeting, qualification workflows, pipeline velocity',
        tags: ['Inbound Pipelines', 'Lead Scoring', 'Conversion Funnels']
      },
      {
        name: 'Content Marketing Strategy',
        level: 'Expert',
        focus: 'Topical clustering, pillar-cluster content architectures, editorial roadmaps',
        tags: ['Content Clusters', 'Editorial Planning', 'Buyer Personas']
      },
      {
        name: 'Conversion Rate Optimization (CRO)',
        level: 'Advanced',
        focus: 'Friction reduction, value proposition articulation, CTA testing',
        tags: ['A/B Testing', 'Form Optimization', 'Landing Pages']
      }
    ]
  },
  {
    id: 'analytics-tech',
    name: 'Data Analytics & Web Tech',
    description: 'Empirical measurement, analytics instrumentation, and web platform fundamentals.',
    skills: [
      {
        name: 'Search Analytics & Traffic Attribution',
        level: 'Advanced',
        focus: 'Google Analytics 4, Search Console, query classification, channel performance',
        tags: ['GA4', 'Search Console', 'Attribution Modeling']
      },
      {
        name: 'Modern Web Foundations',
        level: 'Proficient',
        focus: 'Semantic HTML, responsive UI/UX, TypeScript & modern web architecture',
        tags: ['HTML5', 'TypeScript', 'Tailwind CSS', 'Vite']
      },
      {
        name: 'Data Analysis & Benchmarking',
        level: 'Advanced',
        focus: 'Quantitative evaluation, trend spotting, empirical reporting',
        tags: ['Spreadsheet Modeling', 'Data Visualization', 'Reporting']
      }
    ]
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    period: 'Verified Milestone',
    role: 'AI Research & Digital Marketing Specialist',
    organization: 'Nammaweb',
    location: 'India',
    description:
      'Spearheaded research and strategic marketing initiatives including the Nammaweb AI Index Survey, evaluating market AI readiness and optimizing organic search visibility across evolving search paradigms.',
    highlights: [
      'Conducted and published findings for the Nammaweb AI Index Survey.',
      'Formulated search strategies addressing both traditional Google search and modern AI answer engines.',
      'Researched algorithmic ranking factors and synthetic response citation mechanisms.'
    ],
    isVerified: true
  },
  {
    period: 'Ongoing Practice',
    role: 'Independent AI Search & Growth Strategist',
    organization: 'Client Advisory & Research',
    location: 'Remote',
    description:
      'Advising organizations on transitioning from legacy SEO to comprehensive AEO and GEO models, implementing AI-driven inbound lead pipelines, and establishing semantic domain authority.',
    highlights: [
      'Developed actionable frameworks for Generative Engine Optimization (GEO).',
      'Implemented structured data architectures yielding zero-click and AI citation visibility.',
      'Engineered automated inbound qualification funnels with high lead conversion.'
    ],
    isVerified: true
  },
  {
    period: 'Professional Roadmap',
    role: 'Enterprise AI & Marketing Architecture',
    organization: 'Open for Strategic Positions',
    location: 'Open to Global Remote / Hybrid',
    description:
      'Prepared to lead organic search, AEO/GEO initiatives, AI research-backed marketing, and scalable growth operations for forward-thinking enterprises and fast-growing technology companies.',
    highlights: [
      'Available for full-time roles, strategic consulting, and growth leadership.',
      'Direct communication channel open via WhatsApp, LinkedIn, and email.'
    ],
    isVerified: true
  }
];

export const EDUCATION_AND_CREDENTIALS = [
  {
    title: 'AI Research & Marketing Specialization',
    subtitle: 'Continuous Professional Practice & Industry Research',
    category: 'Verified Focus',
    description:
      'Hands-on expertise across Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), Google Search Console, knowledge graphs, and quantitative AI surveys.',
    verified: true
  },
  {
    title: 'Digital Marketing & Search Systems',
    subtitle: 'Technical SEO, Semantic Markup & Growth Strategy',
    category: 'Applied Methodology',
    description:
      'Extensive practical application in content cluster architecture, structured data (Schema.org JSON-LD), conversion rate optimization, and inbound lead generation pipelines.',
    verified: true
  },
  {
    title: 'Formal Education / Degree Program',
    subtitle: 'Higher Education Degree (Customizable Slot)',
    category: 'Academic Background',
    description:
      'Degree credentials and university details can be customized here based on owner verification documents.',
    verified: false,
    isPlaceholder: true
  }
];
