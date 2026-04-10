# MindTrace — Complete Design & Development Prompt

> Use this prompt to rebuild MindTrace in React Native or any other framework. It captures every design token, component, screen, and interaction from the existing web prototype.

---

## 1. Design System

### 1.1 Color Palette (HSL)

| Token | HSL Value | Usage |
|---|---|---|
| `background` | 165 25% 96% | App background |
| `foreground` | 200 30% 12% | Primary text |
| `card` | 0 0% 100% | Card backgrounds |
| `card-foreground` | 200 30% 12% | Card text |
| `primary` | 174 62% 40% | Brand teal — buttons, active states, links |
| `primary-foreground` | 0 0% 100% | Text on primary |
| `primary-glow` | 174 65% 55% | Lighter teal for gradients/glows |
| `secondary` | 174 35% 93% | Subtle teal tint backgrounds |
| `secondary-foreground` | 174 58% 28% | Text on secondary |
| `muted` | 168 18% 93% | Disabled/placeholder backgrounds |
| `muted-foreground` | 200 12% 48% | Secondary text, labels |
| `accent` | 16 85% 58% | Orange accent — badges, CTAs |
| `accent-foreground` | 0 0% 100% | Text on accent |
| `accent-glow` | 20 90% 65% | Lighter orange for gradients |
| `destructive` | 0 75% 52% | Error/danger red |
| `destructive-foreground` | 0 0% 100% | Text on destructive |
| `border` | 170 18% 90% | Card borders, dividers |
| `input` | 170 18% 90% | Input borders |
| `ring` | 174 62% 40% | Focus ring color |
| `success` | 152 62% 42% | Green — achievements, improving trends |
| `success-foreground` | 0 0% 100% | Text on success |
| `warning` | 38 92% 52% | Amber — moderate stress, caution |
| `warning-foreground` | 0 0% 100% | Text on warning |
| `info` | 215 75% 55% | Blue — informational, reminders |
| `info-foreground` | 0 0% 100% | Text on info |
| `stress-low` | 152 62% 42% | Green (same as success) |
| `stress-medium` | 38 92% 52% | Amber (same as warning) |
| `stress-high` | 0 75% 52% | Red (same as destructive) |

### 1.2 Gradients

| Name | Value | Usage |
|---|---|---|
| `gradient-primary` | `linear-gradient(135deg, hsl(174 62% 40%), hsl(174 65% 55%))` | Primary buttons, active indicators, user chat bubbles |
| `gradient-accent` | `linear-gradient(135deg, hsl(16 85% 58%), hsl(20 90% 65%))` | Notification badges, accent CTAs |
| `gradient-surface` | `linear-gradient(135deg, hsl(165 25% 96%), hsl(174 20% 94%))` | Full-page background (fixed) |
| `gradient-card` | `linear-gradient(145deg, hsla(0,0%,100%,0.85), hsla(0,0%,100%,0.6))` | Glass card backgrounds |
| `gradient-hero` | `linear-gradient(160deg, hsl(174 62% 40%), hsl(174 65% 55%), hsl(180 50% 60%))` | Hero sections |
| `gradient-mesh` | Radial gradients: teal ellipse at 20% 0% (opacity 0.12), orange ellipse at 80% 100% (opacity 0.08), over gradient-surface | Main app background mesh |
| `gradient-calm` | `linear-gradient(135deg, hsl(174 35% 93%), hsl(165 25% 96%))` | Calm/relaxed section backgrounds |

### 1.3 Shadows

| Name | Value | Usage |
|---|---|---|
| `shadow-card` | `0 4px 24px -4px hsla(174,40%,30%,0.08), 0 1px 3px hsla(174,40%,30%,0.04)` | Standard glass cards |
| `shadow-elevated` | `0 8px 40px -8px hsla(174,40%,30%,0.12), 0 2px 8px hsla(174,40%,30%,0.06)` | Elevated cards (bottom nav) |
| `shadow-glow` | `0 0 20px -4px hsla(174,62%,40%,0.25)` | Active/focus glow effect |

### 1.4 Glassmorphism Recipe

```
Background: gradient-card (white 85% → white 60% opacity)
Backdrop Filter: blur(20px) saturate(1.5)        // standard card
Backdrop Filter: blur(24px) saturate(1.6)        // elevated card
Border: 1px solid hsla(170, 30%, 88%, 0.5)       // standard
Border: 1px solid hsla(170, 30%, 88%, 0.6)       // elevated
Box Shadow: shadow-card or shadow-elevated
Border Radius: 1rem (16px) — used as rounded-2xl
```

### 1.5 Typography

- **Font Family**: `'Inter'` (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extra-bold)
- **Rendering**: `antialiased`
- **Scale**:
  - Page titles: `text-2xl` (1.5rem/24px), `font-bold`
  - Subtitles: `text-sm` (0.875rem/14px), `text-muted-foreground`
  - Card labels: `text-sm` (14px), `font-medium`, `text-muted-foreground`
  - Small labels: `text-xs` (12px)
  - Tiny labels: `text-[10px]` (10px)
  - Micro labels: `text-[8px]` (8px) — tab labels, badge counts
  - Large numbers: `text-5xl` (3rem/48px), `font-bold`
  - Medium numbers: `text-2xl` (24px), `font-bold`
  - Gradient text: Use `gradient-primary` as `background-clip: text` with transparent fill

### 1.6 Spacing & Layout

- **Border Radius**: `--radius: 1rem` (16px). Cards use `rounded-2xl`. Buttons use `rounded-2xl` (large) or `rounded-xl` (small).
- **Card Padding**: `p-6` (24px) for main cards, `p-5` (20px) for secondary, `p-4` (16px) for compact
- **Section Spacing**: `space-y-5` (20px) between sections, `space-y-6` (24px) for check-in
- **Page Padding**: `px-4 pt-6 pb-28` (pb-28 accounts for bottom nav)
- **Max Width**: `max-w-md` (448px) centered
- **Safe Area**: `pb-[env(safe-area-inset-bottom)]` on bottom nav

### 1.7 Animations

| Name | Keyframes | Duration | Usage |
|---|---|---|---|
| `float` | translateY(0) → translateY(-8px) → translateY(0) | 3s ease-in-out infinite | Mascot floating |
| `pulse-soft` | opacity 1 → 0.6 → 1 | 2s ease-in-out infinite | Notification badge pulse |
| `slide-up` | translateY(24px) + opacity 0 → translateY(0) + opacity 1 | 0.5s ease-out | Screen entrance |
| `fade-in` | opacity 0 → 1 | 0.3s ease-out | Element fade in |
| `scale-in` | scale(0.95) + opacity 0 → scale(1) + opacity 1 | 0.3s ease-out | Modal/card entrance |
| `shimmer` | translateX(-100%) → translateX(100%) | 3s ease-in-out infinite | Loading shimmer overlay |

**Screen Transition**: When switching tabs, the content fades out with `opacity-0 scale-[0.98] translate-y-2` over 200ms, then the new screen fades in with `opacity-100 scale-100 translate-y-0`.

---

## 2. App Structure

### 2.1 Entry Flow

1. **First Launch** → Onboarding Screen (4 steps)
2. **After Onboarding** → Main App with Bottom Tab Navigation
3. **Onboarding flag** stored in `localStorage` key `"mindtrace-onboarded"`

### 2.2 State Management

- **Check-in Context** (React Context): Stores an array of check-in entries `{ mood, emoji, emojiLabel, brainDump, timestamp }`. Shared between Check-in Screen (writes) and Dashboard Screen (reads).
- **Local component state** for everything else (no global store needed).

---

## 3. Bottom Tab Navigation

**7 tabs** in a floating glass bar at the bottom of the screen:

| Tab | Label | Icon (Lucide) | Badge |
|---|---|---|---|
| `checkin` | Check-in | Heart | — |
| `dashboard` | Dashboard | BarChart3 | — |
| `studyplan` | Plan | BookOpen | — |
| `chat` | Chat | MessageCircle | — |
| `notifications` | Alerts | Bell | `2` (unread count) |
| `counselor` | Counselor | Stethoscope | — |
| `profile` | Profile | User | — |

### Navigation Bar Specs:
- Container: `glass-card-elevated` with `rounded-2xl`, bottom margin `mb-2`, horizontal padding `px-1`
- Fixed at bottom: `fixed bottom-0 left-0 right-0 z-50`
- Safe area: `pb-[env(safe-area-inset-bottom)]`
- Each tab: `flex flex-col items-center gap-0.5 py-2.5 px-1.5`
- Icon size: 18×18px
- Label: `text-[8px] font-medium`
- **Active state**: `text-primary scale-110`, icon `stroke-[2.5]`, background glow `bg-primary/10 blur-sm`, bottom indicator bar with `gradient-primary` (h-1 w-6 rounded-full)
- **Inactive state**: `text-muted-foreground`, icon `stroke-[1.5]`
- **Badge** (notifications): `gradient-accent` circle, 16×16px, `text-[8px]` bold, positioned `-top-1.5 -right-2.5`, only shown when tab is inactive

---

## 4. Screens

### 4.1 Onboarding Screen

**4-step wizard** with full-screen layout, centered content.

**Steps:**

| Step | Icon | Title | Description | Highlight |
|---|---|---|---|---|
| 1 | Mascot Image (128×128, floating animation) | Welcome to MindTrace | Your AI-powered companion for mental wellness and academic success. | Track, understand, and improve your wellbeing. |
| 2 | Heart (in 96×96 rounded-3xl gradient-primary box) | Daily Check-ins | Log your mood, emotions, and thoughts in seconds. Your data stays private. | Build self-awareness with every check-in. |
| 3 | BarChart3 | Smart Dashboard | See your stress trends, velocity, and affective state — all powered by AI. | Understand your patterns over time. |
| 4 | MessageCircle | Chat with MindBot | Need to vent, laugh, or brainstorm? MindBot is always here for you. | Let's get started! |

**UI Elements:**
- Progress dots: `h-2 rounded-full`. Active: `w-8 gradient-primary`. Inactive: `w-2 bg-muted-foreground/20`
- Primary button: `h-14 rounded-2xl text-lg font-semibold gradient-primary text-primary-foreground shadow-lg` with ArrowRight icon
- Button text: "Next" (steps 1-3), "Get Started" (step 4)
- Skip button: `text-sm text-muted-foreground hover:text-foreground` — hidden on last step
- Each step re-renders with `animate-slide-up` using the step index as key

### 4.2 Check-in Screen

**Header**: "How are you feeling?" (h1) + "Take a moment to check in with yourself" (subtitle)

**3 glass cards stacked vertically:**

#### Card 1: Mood Slider
- Label: "Mood Level" (left) + current value in large text (right)
- Value color: ≤3 = `text-stress-high`, ≤6 = `text-stress-medium`, >6 = `text-stress-low`
- Slider: min 1, max 10, step 1
- Footer labels: "Very Low" | "Neutral" | "Great"

#### Card 2: Emoji Selector
- Label: "What best describes you?"
- 4×2 grid of 8 emotions:
  - 😊 Happy, 😌 Calm, 😐 Neutral, 😰 Anxious, 😢 Sad, 😤 Frustrated, 😴 Tired, 🤯 Overwhelmed
- Each: `p-3 rounded-xl`. Selected: `bg-primary/10 ring-2 ring-primary scale-105`. Unselected: `bg-muted/50 hover:bg-muted`
- Emoji size: `text-2xl`. Label: `text-[10px] text-muted-foreground font-medium`

#### Card 3: Brain Dump
- Label: "Brain Dump"
- Textarea: `min-h-[100px] resize-none rounded-xl border-border/50 bg-muted/30`
- Placeholder: "Write whatever's on your mind... no judgment 💭"

#### Submit Button
- Full width, `h-14 rounded-2xl text-lg font-semibold gradient-primary text-primary-foreground shadow-lg`
- Text: "Submit Check-in ✨"
- On submit: toast notification "Check-in submitted! 🎉" with description "Your mood has been recorded."
- Resets all fields after submit

### 4.3 Dashboard Screen

**Header**: "Dashboard" (h1) + "Your mental wellness overview" (subtitle)

**Data derived from check-in entries:**
- Stress = inverted mood (11 - mood). Mood 10 → Stress 1, Mood 1 → Stress 10
- Velocity = latest stress - previous stress
- Affective State = derived from mood + emoji: mood≥7 "Engaged", mood≥5 "Neutral", anxious/frustrated/overwhelmed emojis "Distressed", sad/tired "Disengaged", else "Uncertain"

#### Card 1: Stress Index
- "Stress Index" label + risk badge (`Low`/`Moderate`/`High`)
- Risk badge colors: Low = `bg-success/10 text-success`, Moderate = `bg-warning/10 text-warning`, High = `bg-destructive/10 text-destructive`
- Large stress number: `text-5xl font-bold` colored by level + "/ 10" suffix in `text-muted-foreground text-sm`

#### Card 2 & 3: Velocity + Affective State (2-column grid)
**Velocity card:**
- Label: "Velocity" (xs)
- Icon: ArrowDownRight (success/green) if negative, ArrowUpRight (destructive/red) if positive, Minus if zero
- Value: `text-2xl font-bold` with +/- prefix, colored by direction
- Subtitle: "Improving ↓" / "Rising ↑" / "Stable"

**Affective State card:**
- Label: "Affective State" (xs)
- 🧠 emoji + state name in `text-lg font-bold`
- Subtitle: "Based on recent check-ins"

#### Card 4: Stress Trend Graph (Recharts AreaChart)
- Header: "Stress Trend" label + trend indicator (TrendingDown/TrendingUp/Minus icon + "Improving"/"Rising"/"Stable")
- Chart: `h-40`, last 7 entries
- X-axis: day names (Sun, Mon, etc.), no axis line, fontSize 11, fill gray
- Y-axis: hidden, domain [0, 10]
- Area: stroke `hsl(174,58%,42%)`, strokeWidth 2.5, fill with linear gradient (30% opacity at top → 0% at bottom)
- Tooltip: rounded-xl, white bg, thin border
- Footer: "Based on N check-in(s)" in tiny text

### 4.4 Study Plan Screen

**Header**: "Study Plan" (h1) + "X/Y topics completed" (subtitle)

#### Progress Bar Card
- `h-3 rounded-full bg-muted` track
- Fill: `gradient-primary` with width as percentage

#### Pending Section
- Section header: Clock icon + "Pending (N)" in `text-sm font-medium text-muted-foreground`
- Topic cards (see below)

#### Completed Section
- Section header: Check icon + "Completed (N)"
- Same topic cards but with `opacity-60`

#### Topic Card
- `glass-card rounded-2xl p-4 flex items-center gap-3`
- Left: `h-10 w-10 rounded-xl bg-primary/10` with BookOpen icon in `text-primary`
- Center: Topic name (`font-medium text-sm`, strikethrough if done) + subject label (`text-[10px] text-muted-foreground`) + difficulty badge
- Right: Button — "Done" (gradient-primary) or "Undo" (outline variant)
- **Difficulty badges** (outline variant): Easy = `bg-success/10 text-success border-success/20`, Medium = `bg-warning/10 text-warning border-warning/20`, Hard = `bg-destructive/10 text-destructive border-destructive/20`

**Sample data:**
1. Linear Algebra Basics — Mathematics — Easy (done)
2. React State Management — Web Dev — Medium
3. Neural Network Backprop — AI/ML — Hard
4. SQL Joins & Aggregation — Database — Medium
5. Binary Search Trees — DSA — Easy (done)
6. OS Deadlock Detection — Operating Systems — Hard

### 4.5 Chat Screen

**Two states: Path Selection and Active Chat**

#### State 1: Path Selection
- Mascot image centered (96×96, floating animation)
- "Chat with MindBot" (h1) + "Choose a conversation style" (subtitle)
- **3 path options** as full-width glass cards:

| Path ID | Icon (Lucide) | Label | Description |
|---|---|---|---|
| `listener` | Ear | Listener | Someone to hear you out |
| `laugh` | Laugh | Make Me Laugh | Lighten the mood |
| `brainstorm` | Lightbulb | Brainstorm | Think through problems |

- Each card: `glass-card rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02]`
- Icon container: `h-12 w-12 rounded-xl gradient-primary` with icon in `text-primary-foreground`

#### State 2: Active Chat
- **Header**: Mascot (32×32) + "MindBot" (font-semibold) + "Online" badge (`bg-success/10 text-success text-[10px]`) + "New Chat" ghost button
- **Messages area**: Scrollable, `space-y-3`
  - Bot messages: `bg-muted text-foreground rounded-2xl rounded-bl-md`
  - User messages: `gradient-primary text-primary-foreground rounded-2xl rounded-br-md`
  - Max width: `max-w-[80%]`, padding `px-4 py-3`
- **Star Rating**: Shows after 3+ messages. 5 stars using Star icon. Filled: `fill-warning text-warning`. Unfilled: `text-muted-foreground/30`
- **Input bar**: Input (`h-12 rounded-xl bg-muted/30 border-border/50`) + Send button (`h-12 w-12 rounded-xl gradient-primary`)

**Bot Responses** (cycled per path):
- Listener: empathetic supportive messages
- Laugh: jokes with emojis
- Brainstorm: problem-solving prompts

### 4.6 Notifications Screen

**Header**: "Notifications" (h1) + "N new alerts" (subtitle) + Bell icon button with unread count badge (`gradient-accent`, `animate-pulse-soft`)

**Two sections**: "New" (unread) and "Earlier" (read), each with uppercase tracking-wider label

**4 notification types:**

| Type | Icon (Lucide) | Color | Background |
|---|---|---|---|
| `reminder` | Clock | `text-info` | `bg-info/10` |
| `alert` | AlertTriangle | `text-warning` | `bg-warning/10` |
| `achievement` | CheckCircle2 | `text-success` | `bg-success/10` |
| `tip` | BookOpen | `text-primary` | `bg-primary/10` |

**Notification Card:**
- `glass-card rounded-2xl p-4 flex gap-3`
- Unread: `ring-1 ring-primary/20`. Read: `opacity-70`
- Left: Icon in colored rounded-xl box (40×40)
- Right: Title (font-semibold text-sm, truncated) + unread dot (h-2 w-2 gradient-primary) + message (text-xs, 2-line clamp) + timestamp (text-[10px] text-muted-foreground/60)

**Sample notifications:**
1. Daily Check-in reminder (5 min ago, unread)
2. Stress Rising alert (1 hr ago, unread)
3. 🎉 3-Day Streak achievement (2 hrs ago, read)
4. Study Tip (5 hrs ago, read)
5. Study Plan Update reminder (Yesterday, read)
6. Sleep Reminder alert (Yesterday, read)

### 4.7 Counselor Dashboard Screen

**Header**: "Counselor Dashboard" (h1) + "Monitor student wellness" (subtitle)

#### Summary Cards (2-column grid)
- **Total Students**: Users icon in `bg-primary/10`, count "26" in `text-2xl font-bold`
- **Need Attention**: AlertTriangle icon in `bg-destructive/10`, count in `text-destructive`

#### Risk Distribution Bar Chart (Recharts BarChart)
- Label: "Risk Distribution"
- `h-32`, 4 bars with rounded tops (`radius={[8,8,0,0]}`)
- X-axis: risk level names, no axis line
- Bar colors: Low = `hsl(145,60%,45%)`, Medium = `hsl(38,90%,55%)`, High = `hsl(16,80%,60%)`, Critical = `hsl(0,72%,55%)`
- Data: Low: 12, Medium: 8, High: 4, Critical: 2

#### Student Risk Cards
- Sorted by risk severity: Critical → High → Medium → Low
- Critical cards have `ring-1 ring-destructive/30`
- Each card contains:
  - **Row 1**: Avatar circle (40×40, gradient-primary, initials in white) + Name + Year + Last check-in + Risk badge
  - **Row 2**: Stress value + Velocity (with TrendingUp/Down icon, colored red/green) + Mini sparkline (AreaChart, h-16) + "View" outline button
  - Sparkline colors: High/Critical risk = red `hsl(0,72%,55%)`, Low/Medium = teal `hsl(174,58%,42%)`

**Risk badge styles:**
- Low: `bg-success/10 text-success`
- Medium: `bg-warning/10 text-warning`
- High: `bg-accent/10 text-accent`
- Critical: `bg-destructive/10 text-destructive`

**Sample students:**
1. Priya Sharma — Year 3 — Stress 8.5 — Velocity +0.8 — Critical
2. Aarav Mehta — Year 2 — Stress 7.8 — Velocity +1.2 — High
3. Sneha Patel — Year 2 — Stress 6.1 — Velocity +0.3 — Medium
4. Rohan Gupta — Year 1 — Stress 4.2 — Velocity -0.5 — Low
5. Vikram Singh — Year 4 — Stress 3.5 — Velocity -1.0 — Low

### 4.8 Profile Screen

**Header Card** (glass-card, centered):
- Avatar: `h-20 w-20 rounded-full gradient-primary` with User icon (40×40)
- Mascot badge: `h-7 w-7 rounded-full bg-card border-2 border-border` at bottom-right of avatar
- Name: "Dhruv Suthar" (text-xl font-bold)
- Subtitle: "Computer Science • Year 3" (text-sm text-muted-foreground)

**Stats Row** (3-column grid):
| Stat | Icon (Lucide) | Value | Label |
|---|---|---|---|
| Streak | Flame (text-accent) | 7 | Day Streak |
| Check-ins | Calendar (text-primary) | 23 | Check-ins |
| Badges | Award (text-warning) | 5 | Badges |

Each: `glass-card rounded-2xl p-4 flex-col items-center`, value in `text-2xl font-bold`, label in `text-[10px] text-muted-foreground font-medium`

**Settings List** (glass-card with divide-y):

| Icon | Label | Control | Danger? |
|---|---|---|---|
| Moon | Dark Mode | Toggle Switch | No |
| Bell | Notifications | Toggle Switch | No |
| Shield | Privacy | ChevronRight | No |
| Settings | Preferences | ChevronRight | No |
| LogOut | Log Out | ChevronRight | Yes (red) |

Each row: `px-5 py-4 flex items-center justify-between`. Danger rows use `text-destructive` for icon and label.

---

## 5. Assets

- **Mascot**: `mindtrace-mascot.png` — used in Onboarding (128×128), Chat path selection (96×96), Chat header (32×32), Profile badge (20×20). A friendly AI/brain character.

---

## 6. Technical Notes

- **Icons**: All from `lucide-react` (Lucide icon library). Map to equivalent in your target framework.
- **Charts**: Built with Recharts (AreaChart, BarChart). Use equivalent charting library.
- **Toast notifications**: Using Sonner toast library. Green success toasts with emoji.
- **No backend**: All data is local/mock. Check-in entries stored in React Context (in-memory). Onboarding flag in localStorage.
- **Responsive**: Designed mobile-first at `max-w-md` (448px). Single column layout throughout.
- **Transitions**: 200ms tab switch animation with opacity + scale + translateY.

---

## 7. Quick Start Prompt (Copy-Paste Ready)

> Build a mental wellness mobile app called **MindTrace** with a **glassmorphism + gradient** design using a **teal & mint** color palette (primary: HSL 174 62% 40%). The app has 7 tabs: Check-in (mood slider 1-10, 8 emoji grid, brain dump textarea), Dashboard (stress index card, velocity/affective state metrics, area chart trend), Study Plan (progress bar, topic cards with Easy/Medium/Hard badges), Chat (3-path selector: Listener/Laugh/Brainstorm, then chat bubbles with star rating), Notifications (4 types: reminder/alert/achievement/tip with unread dots), Counselor Dashboard (summary cards, risk bar chart, student risk cards with sparklines sorted by severity), and Profile (avatar, streak/stats row, settings with toggles). Use frosted glass cards (blur 20px, white 85%→60% gradient bg, subtle teal-tinted borders), floating bottom tab bar with active glow, and smooth slide-up page transitions. Font: Inter. Animations: float (mascot), pulse-soft (badges), slide-up (screens), shimmer (loading). Include a 4-step onboarding flow with mascot on step 1.
