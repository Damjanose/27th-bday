# Model routing

This project must not burn expensive models on Q&A. Route by Cursor mode and by whether you are changing code.

## Ask mode (read-only)

- Answer in this chat. Do not launch subagents unless a search is too large to do yourself.
- If you must use `Task`, set `model` to `composer-2.5-fast` (cheap / fast). Never pick Opus, GPT-5.x, or other high-cost models.
- Do not switch to Plan or Agent just to answer a question.
- Prefer Grep, Read, Glob, and short replies over multi-agent exploration.

## Plan mode

- Use a capable model for planning work: `gpt-5.6-luna-medium` or `claude-opus-5-thinking-high` on any `Task` you launch.
- Explore thoroughly, compare options, and produce a concrete plan. Do not implement until the user asks.

## Agent mode (implement / edit)

- Use a capable model for implementation, refactors, reviews, and verification: `gpt-5.6-luna-medium` or `claude-opus-5-thinking-high` on `Task` subagents.
- Default `inherit` is fine when this chat is already on a strong model.
- Do not fall back to `composer-2.5-fast` for coding, architecture, or debugging unless the user explicitly asks to save cost.

## Quick map

| Situation | Subagent `model` |
| --- | --- |
| Ask mode, any task | `composer-2.5-fast` |
| Plan mode | `gpt-5.6-luna-medium` or `claude-opus-5-thinking-high` |
| Implementing or reviewing changes | `gpt-5.6-luna-medium` or `claude-opus-5-thinking-high` |

If a mode is unclear: questions and explanations → cheap; designing or writing code → capable.

## Session budget

Mid-range cap per chat: **~80,000 tokens** or **2 mid-level tasks**, whichever comes first (1 large task or ~4 small ones also counts as a full session).

1. At the start of a session, read `.cursor/session-progress.json`. Resume from `inProgress` and `queued`.
2. Track completed work in that file as you go.
3. When the cap is hit (or the user asks to continue past it): compress the thread into the JSON — goal, done, files touched, decisions, next steps, blockers. Set `status` to `needs_new_session`.
4. Stop implementing. Tell the user to open a **new chat** and say to continue from `.cursor/session-progress.json`.
5. Do not keep a long session alive with more implementation after the cap. Compression + handoff only.
