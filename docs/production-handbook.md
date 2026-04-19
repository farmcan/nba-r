# NBA 对阵视频制作：技巧手册

> 记录在制作 NBA 季后赛对阵前瞻视频中积累的有效技巧和踩坑经验。

---

## 1. 配音时长 = 视频总帧数的硬约束

**规则**：`totalFrames = audioDurationSeconds × fps`

**踩坑**：配音 51.4s，视频只做了 33s（990 帧 @ 30fps），差 18.5s 的内容被截断，最后一句配音播完时画面已经跳到收尾了。

**做法**：
```
ffprobe -v error -show_entries format=duration -of csv=p=0 audio.mp3
# 输出：51.384000
# 目标帧数 = 51.384 × 30 = 1542 帧
```

各 scene 帧数分配参考（7 scene）：
| Scene | 帧数 | 秒数 | 占比 |
|-------|------|------|------|
| Playoff Panorama | 205 | 6.8s | 13.3% |
| Intro Hero | 220 | 7.3s | 14.3% |
| Player Cards | 250 | 8.3s | 16.2% |
| Matchup Edges | 225 | 7.5s | 14.6% |
| Deep Analysis | 240 | 8.0s | 15.6% |
| Tactical Board | 250 | 8.3s | 16.2% |
| Closing | 150 | 5.0s | 9.7% |

---

## 2. 进度条：纤细渐变 + 发光游标

**反面**：粗条（8px）+ 跳动队标 logo（`sin(frame/4) * 8`），看起来像玩具。

**正面**：
- 轨道：3px 细线，`rgba(255,255,255,0.08)` 背景
- 填充：3px 渐变条，`box-shadow` 发光
- 标记点：6px（完成）/ 9px（当前），spring 动画放大
- 游标：12px 白色圆点，`box-shadow` 双层发光
- 标签：当前 13px bold，其余 11px regular，淡入淡出

**代码**：`src/templates/matchup/shared.tsx` → `SceneProgress`

---

## 3. 球员剪影：背景层次感

**问题**：纯色背景 + 文字排版 = 幻灯片感。

**解决**：在 scene 背景叠加低透明度球员剪影 SVG，增加视觉层次但不抢夺注意力。

**实现**：`src/templates/matchup/PlayerSilhouettes.tsx`

```tsx
// 用法：放在 SceneChrome 之后、主内容之前
<div style={{position: "absolute", left: 60, bottom: 140, opacity: 0.05}}>
  <PlayerSilhouettesRow
    count={5}
    poses={["dribble", "shoot", "pass", "defend", "dunk"]}
    color={homeTheme.colors.primary}
    width={90}
    height={130}
    opacity={0.4}
  />
</div>
```

**关键参数**：
- 外层 `opacity: 0.05`（整体透明度）
- 内层 `opacity: 0.4`（每个剪影的渐变衰减）
- `width/height` 比主内容大 2-3 倍，营造"远景"感

---

## 4. 战术板：5 对 5 对位图

**核心组件**：`src/templates/matchup/TacticalBoardScene.tsx`

**组成**：
1. **HalfCourt**：半场 SVG（油漆区、三分线、罚球圈、限制区）
2. **CourtPlayer**：球员圆点（spring 动画逐个进场）
3. **PlayArrow**：战术路线箭头（逐帧绘制 + 箭头指向）
4. **FiveOnFiveCourt**：组合上述组件 + 图例

**球员位置数据**（标准挡拆阵型）：
```ts
const offensePlayers = [
  {x: 120, y: 340, number: "1", label: "持球"},
  {x: 200, y: 220, number: "4", label: "掩护"},
  {x: 370, y: 320, number: "3", label: "弱侧"},
  {x: 420, y: 180, number: "2", label: "底角"},
  {x: 250, y: 120, number: "5", label: "弧顶"},
];
```

**箭头绘制**：
- 用 `interpolate` 控制绘制进度（0→1 逐帧画出）
- 二次贝塞尔曲线（`Q` 命令）模拟弧线运动
- 箭头头部用 `polygon` + `atan2` 计算旋转角度

---

## 5. SceneChrome：统一的场景装饰层

每个 scene 都复用 `SceneChrome` 组件，包含：
- GridOverlay（网格线，opacity 可调）
- 内边框（inset 20px, 1px 边框）
- 顶部/底部渐变光晕
- 两侧球队色斜线装饰

**位置**：`src/templates/matchup/shared.tsx` → `SceneChrome`

---

## 6. BottomTicker：底部三栏信息栏

三栏等宽 grid，左/右用球队色，中间用中性色。

```tsx
<BottomTicker
  left={`${data.playerCards[0]?.name} • ${data.playerCards[1]?.name}`}
  center="四卡平铺 + 分批进场"
  right={`${data.playerCards[2]?.name} • ${data.playerCards[3]?.name}`}
  homeTheme={homeTheme}
  awayTheme={awayTheme}
/>
```

---

## 7. spring 动画参数调优

不同场景用不同 spring 配置：

| 场景 | damping | stiffness | mass | 效果 |
|------|---------|-----------|------|------|
| 球员卡片进场 | 15 | 130 | 0.85 | 快速弹入 |
| CourtPlayer 圆点 | 18 | 150 | 0.7 | 更紧凑的弹跳 |
| 文字淡入 | 15 | 120 | 0.9 | 柔和出现 |
| Closing 队标展开 | 15 | 125 | 0.9 | 中等速度 |

**通用公式**：`spring({fps, frame: Math.max(0, frame - delay), config})`

---

## 8. 渲染命令

```bash
# 标准渲染
npx remotion render Celtics76ersPreviewExample out/output.mp4 --overwrite

# 提取关键帧截图
ffmpeg -ss <seconds> -i out/output.mp4 -frames:v 1 out/review/frame.png -y
```

**注意**：修改 `Root.tsx` 的 `durationInFrames` 后必须重新渲染，remotion 不会自动检测。

---

## 9. 配色系统

```ts
// 中性色（shared.tsx）
neutral.cream = "#F4EFE6"  // 主文字
neutral.ink   = "#07111B"  // 背景深色
neutral.sky   = "#8FC2FF"  // 辅助色/标签

// 背景渐变
sceneBackground(left, right) = radial-gradient + linear-gradient
```

**球队主题**通过 `TeamTheme` 传入：
- `theme.colors.primary` — 主队主色
- `theme.colors.secondary` — 客队辅色
- `theme.colors.accent` — 强调色

---

## 10. 待验证/待实现

- [ ] 音效层：转场音效、数据出现音效
- [ ] 球员照片替代剪影：用真实球员 PNG 抠图做剪影效果
- [ ] 9:16 竖版适配
- [ ] 封面图自动生成（取第 N 帧）
- [ ] 配音文案的"金句帧"自动高亮（在配音讲到关键句时画面同步高亮对应文字）
