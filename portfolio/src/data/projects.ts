import { Project } from "@/types/portfolio";

const projects: Project[] = [
  {
    id: "transformer-variants",
    title: "Comparative Study of Transformer Design Variants",
    shortDescription:
      "Benchmarked 6 attention mechanisms and 5 positional encoding strategies to understand their impact on language modeling performance, memory, and long-context extrapolation.",
    fullDescription:
      "Investigated the impact of different transformer architecture components on language modeling performance, training efficiency, memory usage, and long-context extrapolation. The project focused on understanding how attention mechanisms and positional encoding strategies influence model behavior rather than treating transformers as a black box.",
    type: "Individual",
    status: "Completed",
    technologies: ["Python", "PyTorch", "Weights & Biases", "Git", "Google Colab"],
    concepts: [
      "Multi-Head Attention",
      "Multi-Query Attention",
      "Grouped-Query Attention",
      "Sparse Attention",
      "Linear Attention",
      "RoPE",
      "ALiBi",
      "Sinusoidal Encoding",
      "Relative Positional Encoding",
    ],
    outcomes: [
      "Reproducible benchmarking framework across identical training conditions",
      "Experiment tracking dashboard via Weights & Biases",
      "Sequence-length extrapolation analysis across encoding strategies",
      "Technical report documenting architecture trade-offs",
    ],
    github: '',
    featured: true,
  },
  {
    id: "causal-uplift-ebm",
    title: "Causal Uplift Modeling for Advertising using EBMs",
    shortDescription:
      "Built a causal ML framework to estimate incremental ad campaign impact on customer behavior using Explainable Boosting Machines for interpretable treatment effect estimation.",
    fullDescription:
      "Developed a causal machine learning framework to estimate the incremental impact of advertising interventions on customer behavior. The objective was to identify which users are most likely to respond positively to a campaign, enabling more efficient ad targeting and budget allocation.",
    type: "Individual",
    status: "Completed",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
    concepts: [
      "Causal Inference",
      "Uplift Modeling",
      "Treatment Effect Estimation",
      "Explainable Boosting Machines",
      "Customer Segmentation",
      "Advertising Analytics",
    ],
    outcomes: [
      "Identified customer segments with highest predicted incremental response",
      "Demonstrated causal modeling advantages over traditional response prediction",
      "Generated interpretable feature importance insights",
      "End-to-end pipeline with evaluation framework",
    ],
    github: '',
    featured: true,
  },
  {
    id: "stock-forecasting-lstm",
    title: "Stock Price Forecasting using News Sentiment and LSTMs",
    shortDescription:
      "Deep learning pipeline combining financial news sentiment signals with historical market data to forecast stock price movements via LSTM networks.",
    fullDescription:
      "Developed a deep learning pipeline to investigate the relationship between market sentiment and stock price movements. Leveraged textual sentiment signals alongside historical market data to improve stock price prediction accuracy.",
    type: "Individual",
    status: "Completed",
    technologies: ["Python", "PyTorch", "Pandas", "NumPy", "FinBERT", "Matplotlib"],
    concepts: [
      "Time Series Forecasting",
      "Sentiment Analysis",
      "NLP",
      "Financial Machine Learning",
      "LSTM Networks",
    ],
    outcomes: [
      "End-to-end forecasting pipeline with sentiment feature engineering",
      "LSTM-based prediction model evaluated against baselines",
      "Visualization and performance analysis dashboard",
      "RMSE, MAE, and directional accuracy benchmarks",
    ],
    github: '',
    featured: true,
  },
  {
    id: "ai-portfolio-manager",
    title: "AI Portfolio Manager",
    shortDescription:
      "AI-powered interactive portfolio allowing recruiters to explore a candidate's background through natural language — a personal career copilot built on RAG and full-stack engineering.",
    fullDescription:
      "Developing an AI-powered interactive portfolio that allows recruiters, professors, and hiring managers to explore a candidate's background through natural language conversations rather than static resume documents.",
    type: "Individual",
    status: "Ongoing",
    technologies: ["Python", "React", "Next.js", "FastAPI", "OpenAI API", "Git"],
    concepts: [
      "Retrieval-Augmented Generation",
      "Prompt Engineering",
      "Personal Knowledge Systems",
      "Full-Stack Development",
      "Conversational AI",
    ],
    outcomes: [
      "Fully deployed AI-powered portfolio website",
      "Personal knowledge management system",
      "Interactive recruiter experience",
      "Scalable framework for future career growth",
    ],
    github: '',
    featured: true,
  },
];

export default projects;
