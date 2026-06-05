---
type: project
slug: causal-uplift-ebm
title: Causal Uplift Modeling for Advertising using EBMs
---

# Overview
Built a causal machine learning framework to estimate the incremental impact
of advertising interventions on customer behaviour using Explainable
Boosting Machines.

# Motivation
Traditional response models predict who will convert — but not whether an ad
caused that conversion. Uplift modeling isolates the treatment effect:
who converts *because* of the campaign, not just *after* seeing it.

# Approach
Used the T-Learner meta-learning strategy with Explainable Boosting Machines
(EBMs) as the base learner. EBMs provide interpretable feature importance,
making the model practical for real advertising decisions.

# Key Outcomes
Identified customer segments with highest predicted incremental response.
Demonstrated causal modeling advantages over traditional response prediction.
Generated interpretable feature importance insights.
End-to-end pipeline with evaluation framework built.

# Technologies
Python, Pandas, NumPy, Scikit-learn, Jupyter.
