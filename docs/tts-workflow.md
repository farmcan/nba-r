# TTS Workflow

`nba-r` now supports local Chinese narration generation through `edge-tts`.

## Current setup

- Tool: `edge-tts`
- Voice: `zh-CN-YunyangNeural`
- Virtual environment: `.venv-edge-tts`
- Output folder: `public/audio`

## Why this matters

- Future matchup videos can be narrated without leaving the repo
- Voiceover is tied to the local data model
- The same Remotion template can decide whether to mix in narration

## Required structure

Each matchup can optionally include:

```ts
voiceover?: {
  script: string;
  audioSrc: string;
  voice: string;
}
```

## Generation flow

1. Write the narration text
2. Save it in the matchup data file
3. Generate the audio into `public/audio`
4. Point `audioSrc` at the generated file
5. Let the template reduce music volume automatically

## Recommended narration style

- 18 to 26 seconds for a 24-second video
- One main thesis per sentence
- No invented details
- Mention injuries only when they materially affect the matchup

