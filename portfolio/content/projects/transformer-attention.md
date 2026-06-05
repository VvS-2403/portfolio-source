---
type: project
slug: transformer-variants
title: Comparative Study of Transformer Design Variants
---

# Overview
Investigated the impact of different transformer architecture components on
language modeling performance, training efficiency, memory usage, and
long-context extrapolation.

# Motivation
Rather than treating transformers as a black box, this project aimed to
understand how specific design choices — attention mechanisms and positional
encoding — influence model behaviour.

# What Was Benchmarked
6 attention mechanisms: Multi-Head Attention (MHA), Multi-Query Attention (MQA),
Grouped-Query Attention (GQA), Sparse Attention, Linear Attention.
5 positional encoding strategies: RoPE, ALiBi, Sinusoidal Encoding,
Relative Positional Encoding, Learned Positional Encoding.

# Methodology
All variants trained under identical conditions (same dataset, hyperparameters,
compute budget). Experiments tracked via Weights & Biases dashboard.

# Results
Reproducible benchmarking framework built across identical training conditions.
Sequence-length extrapolation analysis produced across all encoding strategies.
Technical report documenting architecture trade-offs completed.

# Challenges
Ensuring truly identical training conditions across architecturally different
variants. Managing GPU memory efficiently across attention mechanisms with
different complexity profiles.

# Lessons Learned
MQA and GQA offer strong memory savings with minimal quality degradation.
ALiBi shows strong length generalisation beyond training context.
Linear attention trades quality for speed in a context-dependent way.

# Technologies
Python, PyTorch, Weights & Biases, Git, Google Colab.
