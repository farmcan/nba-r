# Social Overlay Template Research

Date: 2026-05-07

## Sources Checked

| Source | URL | Useful Pattern |
| --- | --- | --- |
| X conversations help | https://help.x.com/en/using-x/x-conversations | X replies are public conversation objects; conversations may be ranked/grouped by relevance, so the template should show a post plus replies, not generic quote cards. |
| X mobile web help | https://help.x.com/en/using-x/mobile-x-on-feature-phones | Mobile X home timeline uses top navigation/timeline behavior, so a phone-scroll template should show app chrome and feed movement. |
| EZGrafix sports broadcast overlays | https://banyanboard.com/products/ezgrafix-plug-n-play-sports-graphics/ | Theme-based graphics library, lower thirds, scorebugs, producer panel, browser overlays, live data integration. |
| Envato broadcast/social comments template | https://elements.envato.com/youtube-and-broadcast-comments-mogrt-SYP9UM7 | Animated comment boxes with flexible color, position, opacity, shadow, and duration controls. |
| vMix social bubble template | https://merch.livestreamingpros.com/products/vmix-social-bubble-template | Pre-made comment bubbles for Twitter, Facebook, YouTube Live, Twitch; color variants and 1920x1080 design target. |
| Hupu NBA stats page | https://nba.hupu.com/stats/players | Dense Chinese sports table language and player ranking/stat hierarchy. |
| Hupu player rating page | https://m.hupu.com/score-item/common_second/282906 | Fan-rating product mental model: player card, score, number of raters, community judgment. |
| Hupu mobile score example | https://m.hupu.com/score-item/common_second/294762 | Real mobile fields include topic, item title, a score, `JRs评分`, `立即评分`, and rating distribution percentages. |
| Reddit broadcast workflow discussion | https://www.reddit.com/r/nba/comments/1c242do/how_are_the_digital_creatives_in_halftime_designs/ | Broadcast teams pre-template animations and fill in stats/content quickly. |

## Template Principles

Advanced sports templates should behave like a pre-built graphics package, not one-off cards.

Required properties:

- **Data-fillable:** text, numbers, colors, team, and source labels should be props.
- **Small modules:** each template should work as an insert, lower-third, or side panel.
- **Themeable:** team color and accent color must be enough to reskin quickly.
- **Motion-ready:** DOM structure should expose stable class names for GSAP.
- **Broadcast credible:** use score bugs, chips, badges, panel chrome, and micro-labels.
- **Social native:** support comments, posts, stickers, ratings, and fan sentiment.

## Correction: Broadcast Social Is Not Mobile Social

The first pass was too generic: it looked like a broadcast quote package, not like a user scrolling a real app. The corrected direction splits these use cases:

- `x-mobile-social-feed`: phone shell, top timeline tabs, one main post, action row, reply thread, and vertical scroll motion.
- `social-post-deck`: broadcast lower-third quote package. Use only when the scene wants TV graphics, not a phone.
- `hupu-mobile-rating`: light mobile app page with orange Hupu-style header, score, `JRs评分`, `立即评分`, distribution bars, ranking rows, and hot comments.

Agent rule:

- If the script says "球员发推", "刷到一条", "评论区炸了", choose `x-mobile-social-feed`.
- If the script says "虎扑评分", "JRs评分", "亮评", choose `hupu-mobile-rating`.
- If the script says "官方发文/记者 quote" inside a broadcast package, choose `social-post-deck`.

## Templates To Prebuild

### 1. Social Post Deck

Use for:

- player tweet
- NBA official post
- team account post
- reporter quote
- viral fan take

Borrowed from:

- tweet lower-thirds
- sports journalism social embeds
- clean broadcast comment templates

Design requirements:

- avatar or team dot
- handle and timestamp
- verified/status chip
- 1-2 line post body
- metrics strip
- source label optional

### 2. Fan Comment Wall

Use for:

- comment-section reaction
- "球迷怎么说"
- debate framing before CTA
- live chat burst

Borrowed from:

- vMix social bubble template
- YouTube/TikTok comment motion templates

Design requirements:

- staggered bubbles
- sentiment label
- compact username
- color variants by team/sentiment
- safe for 16:9 and later 9:16

### 3. Hupu-Style Rating Panel

Use for:

- 虎扑评分
- post-game player reaction
- fan confidence meter
- ranking/leader board

Borrowed from:

- Hupu player score/rating pages
- Hupu NBA stats table hierarchy

Design requirements:

- big score
- number of JRs or voters
- player/team row
- rating tag such as "开局观察", "争议点", "高分预警"
- compact ranking table

Important: if actual Hupu ratings are not fetched, label the panel as "Hupu-style fan rating mock" or "社区评分模板", not real data.

Implemented as:

- `templates/hupu-mobile-rating.html`
- `templates/manifest.json` entry `hupu-mobile-rating`

### 3b. X Mobile Social Feed

Use for:

- 球员发推
- post + reply thread
- phone scrolling montage
- fans reacting under the post

Borrowed from:

- X Home timeline / conversation mental model
- mobile feed top tabs
- action row with replies/reposts/likes/share
- ranked/public reply conversations

Design requirements:

- phone shell
- status bar and timeline tabs
- player post cell
- media block optional
- reply thread below
- vertical scroll motion
- synthetic/fake content clearly marked if not a real post

### 4. Sticker Tape

Use for:

- social stickers
- meme labels
- quick claims
- "LOCK", "UPSET WATCH", "KEY 01", "HOT TAKE"

Borrowed from:

- sports social graphics packs
- meme/live reaction overlays
- collectible-card insert language

Design requirements:

- diagonal tape or floating sticker placement
- short words only
- strong color contrast
- easy GSAP pop/slide motion

### 5. Producer Rundown Panel

Use for:

- behind-the-scenes editorial rundown
- rapid content preview
- scene selector
- live show feel

Borrowed from:

- sports broadcast producer panels
- pre-templated halftime graphics workflows

Design requirements:

- vertical cue list
- active cue highlight
- duration/timecode
- status chips
- source/asset readiness indicators

## Implementation Decision

Build these as string-based HyperFrames HTML helpers under `scripts/lib/social-overlays.ts`.

Reason:

- current stable HyperFrames path is single generated HTML
- helpers can be imported by future build scripts
- gallery can render all templates without changing the main video
- class names can later be targeted by GSAP

Generated preview:

- `templates/nba-social-overlays.html`
