# CALRD

**MLLMs Get It Right, Then Get It Wrong: Tracing and Correcting Late-Layer Textual Bias**

[![Project Page](https://img.shields.io/badge/Project-Page-3159d9)](https://qingyonghu.github.io/CALRD/)
[![Conference](https://img.shields.io/badge/IJCAI--ECAI-2026-18233a)](#)
[![Code](https://img.shields.io/badge/Code-Coming%20Soon-64748b)](#)

CALRD is the project page repository for our IJCAI-ECAI 2026 paper on multimodal knowledge conflict. The paper studies a failure mode in multimodal large language models (MLLMs): when image evidence conflicts with text, models often form the correct visual answer in intermediate layers but later shift toward the text-suggested answer before producing the final output.

We call this behavior **late-layer textual override** and propose **Conflict-Aware Layer Reference Decoding (CALRD)**, a training-free inference-time method that detects suppressed visual predictions and selectively restores the transition-layer signal.

## Project Page

The website is available at:

**https://qingyonghu.github.io/CALRD/**

This repository currently hosts the static project page under:

```text
index.html
static/css/style.css
static/js/index.js
static/images/
```

## Highlights

- **Layer-wise conflict diagnosis:** CALRD uses Modal Dominance Ratio (MDR) to trace visual-versus-textual preference across model depth.
- **Late-layer textual override:** Failure cases often contain the correct visual answer in intermediate layers, then lose it in late layers.
- **Training-free decoding:** CALRD requires no finetuning, external knowledge, or additional training data.
- **Selective intervention:** The method restores transition-layer logits only when anchor confidence is high and final-layer retention is low.
- **Broad evaluation:** Experiments cover five MLLM families on Conflict-VQA and PhD-icc, with standard checks on POPE and CHAIR.

## Key Findings

- **85%** of failure cases shift toward text.
- **89%** of successful cases shift toward vision.
- CALRD produces **4-9%** absolute gains on conflict benchmarks across evaluated MLLMs.
- On PhD-icc, LLaVA-1.5 greedy accuracy improves from **27.72** to **36.35**.
- On CHAIR, InstructBLIP greedy CI drops from **23.7** to **14.6**.

## Method Overview

CALRD works in three steps:

1. **Find the transition layer:** locate the adjacent-layer distributional shift with maximum Jensen-Shannon divergence after stability onset.
2. **Detect suppressed anchors:** measure whether the transition-layer top prediction is confident and whether it survives to the final layer.
3. **Blend only when needed:** adaptively combine final-layer logits with transition-layer logits using:

```text
phi' = (1 - lambda) * phi(final) + lambda * phi(transition)
lambda = Dconf * (1 - rho)
```

When prediction retention is high, `lambda` stays near zero and the model output is largely unchanged.

## Assets

The project page uses the following paper figures:

- `static/images/figures/teaser.webp`
- `static/images/figures/framework.webp`
- `static/images/figures/mdr_combined.webp`
- `static/images/figures/compare.webp`
- `static/images/figures/detection.webp`
- `static/images/figures/data.webp`

## Local Preview

The page is static and can be served with any local HTTP server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Citation

```bibtex
@inproceedings{li2026calrd,
  title     = {MLLMs Get It Right, Then Get It Wrong: Tracing and
               Correcting Late-Layer Textual Bias},
  author    = {Li, Xingming and Cheng, Ao and Sun, Qiyao and He, Xixiang
               and Ji, Xuanyu and Huang, Runke and Hu, Qingyong},
  booktitle = {Proceedings of the Thirty-Fifth International Joint
               Conference on Artificial Intelligence},
  year      = {2026},
  note      = {IJCAI-ECAI 2026}
}
```

## Status

Paper, arXiv, dataset, and implementation release links are coming soon.

## Contact

For questions about CALRD or multimodal knowledge conflict analysis, please contact:

**Qingyong Hu**  
huqingyong15@outlook.com
