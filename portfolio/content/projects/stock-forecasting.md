---
type: project
slug: stock-forecasting-lstm
title: Stock Price Forecasting using News Sentiment and LSTMs
---

# Overview
Deep learning pipeline combining financial news sentiment signals with
historical market data to forecast stock price movements.

# Approach
Used Vader to extract sentiment scores from financial news headlines.
Combined these signals with OHLCV market data as LSTM input features.
Evaluated against ARIMA and vanilla LSTM baselines.

# Results
End-to-end forecasting pipeline with sentiment feature engineering built.
Evaluated using RMSE, MAE, and directional accuracy benchmarks.
Sentiment-augmented model outperformed vanilla LSTM on directional accuracy.

# Technologies
Python, PyTorch, Pandas, NumPy, Vader, NLTK, Matplotlib.
