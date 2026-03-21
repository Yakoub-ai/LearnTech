#!/usr/bin/env python3
"""Fetch YouTube transcripts for all LearnTech video IDs."""
import json, os
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound, CouldNotRetrieveTranscript

VIDEO_IDS = [
  # Role videos
  "4vLxWqE94l4","66hDgWottdA","7iHl71nt49o","996OiexHze0","Au1OxVSyGas",
  "BUTjcAjfMgY","DGtalg5efCw","DHjqpvDnNGE","E0Hmnixke2g","EY1hsh-HCjo",
  "Fa_V9fP2tpU","HkdAHXoRtos","NmM9HA2MQGI","PcbuKRNtCUc","SWYqp7iY_Tc",
  "VtzvF17ysbc","_uQrJ0TkZlc","gAkwW2tuIqE","i53Gi_K3o7I","iYM2zFP3Zn0",
  "lWEKiak0WVU","lWPiSZf7-uQ","m8Icp_Cid5o","mU6anWqZJcc","ok-plXXHlWw",
  "pqNCD_5r0IU","qYNweeDHiyU","qiQR5rTSshw","r9HdJ8P6GQI","rg7Fvvl3taU",
  "s9Qh9fWeOAk","u044iM9xsWU","u6QfIXgjwGQ","uvb00oaa3k8","xJFzPSAw4Fo",
  # Language videos
  "30LWjhZzg50","3a0I8ICR1Vg","8aGhZQkoFbQ","EiNiSFIPIQE","HXV3zeQKqGY",
  "HubezKbFL7E","LKVHFHJsiO0","NmM9HA2MQGI","OXGznpKZ_sA","RmGHnYUqQ4k",
  "V_Kr9OSfDeU","cCOL7MC4Pl0","dLPgQRbVquo","e-5obm1G_FY","hdI2bqOjy3c",
  "jS4aFq5-91M","jjMbPt_H3RQ","nViEqpgwxHE","pTB0EiLXUC8","pd-0G0MigUA",
  "rfscVS0vtbw","t5Bo1Je9EmE","vGVvJuazs84","x7X9w_GIm1s","zQnBQ4tB3ZA",
  "zsjvFFKOm3c","ztHopE5Wnpc",
  # Supplementary videos – under-resourced roles (Task 21)
  "YEBfamv-_do",  # Art of the Problem – Public Key Cryptography (Diffie-Hellman)
  "j9QmMEWmcfo",  # ByteByteGo – SSL, TLS, HTTPS Explained
  "u_ECkoHVlZ8",  # Analytics Mania – Google Analytics 4 Tutorial for Beginners
  "GZvSYJDk-us",  # freeCodeCamp – APIs for Beginners (full course)
]
# Deduplicate preserving order
VIDEO_IDS = list(dict.fromkeys(VIDEO_IDS))

out_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'transcripts')
os.makedirs(out_dir, exist_ok=True)

# Build index from existing files first (so re-runs produce a complete index)
index = {"available": [], "unavailable": []}
for fname in os.listdir(out_dir):
  if fname.endswith('.json') and fname != '_index.json':
    with open(os.path.join(out_dir, fname), encoding="utf-8") as f:
      data = json.load(f)
    if data.get("available"):
      index["available"].append(data["videoId"])
    else:
      index["unavailable"].append(data["videoId"])

already_fetched = set(index["available"] + index["unavailable"])

api = YouTubeTranscriptApi()

for vid in VIDEO_IDS:
  if vid in already_fetched:
    print(f"[skip] {vid}")
    continue
  out_path = os.path.join(out_dir, f"{vid}.json")
  try:
    fetched = api.fetch(vid, languages=["en", "en-US", "en-GB"])
    text = " ".join(snippet.text for snippet in fetched)
    data = {"videoId": vid, "available": True, "transcript": text}
    index["available"].append(vid)
    print(f"[ok]   {vid} ({len(text)} chars)")
  except (TranscriptsDisabled, NoTranscriptFound, CouldNotRetrieveTranscript) as e:
    data = {"videoId": vid, "available": False, "reason": str(e)}
    index["unavailable"].append(vid)
    print(f"[n/a]  {vid} — {e}")
  except Exception as e:
    data = {"videoId": vid, "available": False, "reason": str(e)}
    index["unavailable"].append(vid)
    print(f"[err]  {vid} — {e}")
  with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open(os.path.join(out_dir, "_index.json"), "w") as f:
  json.dump(index, f, indent=2)

print(f"\nDone: {len(index['available'])} available, {len(index['unavailable'])} unavailable")
print("Unavailable:", index["unavailable"] or "none")
