import type { ReactNode } from "react";

/** Pictures for the learner path. The object is drawn large enough to name before the sentence. */

export function WordPicture({ id }: { id: string }) {
  return <Frame>{word(id)}</Frame>;
}

export function SceneArt({ id, compact }: { id: string; compact?: boolean }) {
  return <Frame compact={compact}>{scene(id)}</Frame>;
}

function Frame({ children, compact }: { children: ReactNode; compact?: boolean }) {
  return (
    <svg className={compact ? "scene-art compact" : "scene-art"} viewBox="0 0 320 180" role="img" aria-hidden>
      <rect width="320" height="180" fill="var(--bg)" />
      <circle cx="46" cy="36" r="16" fill="var(--amber)" />
      <rect y="148" width="320" height="32" fill="var(--earth-deep)" />
      {children}
    </svg>
  );
}

function Crew({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="10" y="78" width="16" height="8" rx="2" fill="#2a2118" />
      <rect x="30" y="78" width="16" height="8" rx="2" fill="#2a2118" />
      <rect x="14" y="56" width="10" height="24" fill="var(--earth)" />
      <rect x="32" y="56" width="10" height="24" fill="var(--earth)" />
      <path d="M8 30 h40 l4 28 H4 z" fill="#f0c419" />
      <rect x="12" y="42" width="32" height="6" fill="var(--ink-strong)" />
      <rect x="-2" y="32" width="12" height="24" rx="5" fill="#e4c7a1" />
      <rect x="46" y="32" width="12" height="24" rx="5" fill="#e4c7a1" />
      <circle cx="28" cy="18" r="13" fill="#e4c7a1" />
      <path d="M10 16 Q28 -4 46 16 L42 19 Q28 6 14 19 Z" fill="var(--amber)" />
      <rect x="6" y="15" width="44" height="6" rx="2" fill="var(--amber)" />
    </g>
  );
}

function scene(id: string) {
  switch (id) {
    case "start":
      return <Crew x={130} y={58} />;
    case "baseline":
      return (
        <>
          <g transform="translate(18 36) scale(0.42)">
            <ellipse cx="160" cy="118" rx="90" ry="16" fill="var(--amber)" />
            <path d="M100 118 Q100 48 160 40 Q220 48 220 118 Z" fill="var(--amber)" />
          </g>
          <g transform="translate(108 28) scale(0.42)">
            <rect x="150" y="40" width="18" height="108" rx="4" fill="var(--earth)" />
            <path d="M112 28 h96 v24 h-30 v14 h-22 v-14 h-44 z" fill="var(--steel)" />
          </g>
          <g transform="translate(188 24) scale(0.5)">
            <rect x="96" y="16" width="14" height="140" fill="var(--amber)" />
            <rect x="176" y="16" width="14" height="140" fill="var(--amber)" />
            <rect x="96" y="40" width="94" height="10" fill="var(--ink)" />
            <rect x="96" y="78" width="94" height="10" fill="var(--ink)" />
            <rect x="96" y="116" width="94" height="10" fill="var(--ink)" />
          </g>
        </>
      );
    case "pathway":
      return (
        <>
          <Crew x={24} y={58} />
          <rect x="130" y="78" width="70" height="40" rx="6" fill="var(--steel)" />
          <rect x="148" y="62" width="34" height="20" fill="var(--panel-2)" />
          <circle cx="148" cy="122" r="10" fill="var(--ink-strong)" />
          <circle cx="182" cy="122" r="10" fill="var(--ink-strong)" />
          <Crew x={230} y={58} />
        </>
      );
    case "language":
      return (
        <>
          <Crew x={36} y={58} />
          <rect x="150" y="36" width="140" height="64" rx="12" fill="var(--panel)" stroke="var(--amber)" />
          <text x="168" y="76" fill="var(--ink)" fontSize="28" fontFamily="Barlow Condensed, sans-serif">
            EN
          </text>
        </>
      );
    case "understand":
    case "repeat":
      return (
        <>
          <Crew x={12} y={58} />
          <g transform="translate(150 16) scale(0.55)">{word("hammer")}</g>
        </>
      );
    case "recognize":
      return (
        <>
          <g transform="translate(-20 0)">{word("hammer")}</g>
          <rect x="176" y="48" width="120" height="70" rx="8" fill="var(--ink)" />
          <text x="196" y="92" fill="var(--amber-ink)" fontSize="22" fontFamily="Barlow Condensed, sans-serif">
            Hammer
          </text>
        </>
      );
    case "speak":
      return (
        <>
          <Crew x={24} y={58} />
          <rect x="120" y="40" width="170" height="56" rx="12" fill="var(--panel)" stroke="var(--line)" />
          <text x="136" y="74" fill="var(--ink)" fontSize="18" fontFamily="Source Sans 3, sans-serif">
            This is a hammer.
          </text>
        </>
      );
    case "instruction":
    case "computer":
      return (
        <>
          <rect x="70" y="40" width="180" height="100" rx="8" fill="var(--panel-2)" stroke="var(--steel)" />
          <rect x="86" y="54" width="148" height="64" fill="var(--bg)" />
          <rect x="130" y="140" width="60" height="8" fill="var(--steel)" />
          <text x="104" y="92" fill="var(--amber)" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            Bring the tape.
          </text>
        </>
      );
    case "safety":
      return (
        <>
          <Crew x={120} y={52} />
          <rect x="168" y="88" width="22" height="14" rx="4" fill="var(--ink)" />
          <circle cx="108" cy="100" r="8" fill="none" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="128" cy="100" r="8" fill="none" stroke="var(--ink)" strokeWidth="3" />
        </>
      );
    case "work":
    case "framing":
      return word("header");
    case "site":
      return (
        <>
          <rect x="40" y="70" width="90" height="78" fill="var(--steel)" />
          <rect x="56" y="86" width="22" height="18" fill="var(--amber)" />
          <rect x="86" y="86" width="22" height="18" fill="var(--amber)" />
          <rect x="160" y="48" width="90" height="110" rx="4" fill="var(--ink)" />
          <rect x="172" y="64" width="66" height="6" fill="var(--amber)" />
          <rect x="172" y="80" width="66" height="6" fill="var(--muted)" />
          <rect x="172" y="96" width="50" height="6" fill="var(--muted)" />
        </>
      );
    case "check":
      return (
        <>
          <rect x="90" y="28" width="140" height="120" rx="8" fill="var(--ink)" />
          <path d="M114 62 l10 10 18-22" fill="none" stroke="var(--ok)" strokeWidth="6" />
          <path d="M114 96 l10 10 18-22" fill="none" stroke="var(--ok)" strokeWidth="6" />
          <rect x="160" y="58" width="48" height="6" fill="var(--amber-ink)" />
          <rect x="160" y="92" width="48" height="6" fill="var(--amber-ink)" />
        </>
      );
    case "passport":
      return (
        <>
          <rect x="78" y="32" width="164" height="112" rx="8" fill="var(--ink)" />
          <rect x="78" y="32" width="164" height="22" fill="var(--amber)" />
          <circle cx="118" cy="92" r="22" fill="var(--amber)" />
          <rect x="154" y="74" width="68" height="6" fill="var(--amber-ink)" />
          <rect x="154" y="90" width="56" height="6" fill="var(--muted)" />
          <rect x="154" y="106" width="48" height="6" fill="var(--muted)" />
        </>
      );
    case "job":
      return (
        <>
          <Crew x={36} y={58} />
          <Crew x={200} y={58} />
          <rect x="130" y="96" width="60" height="14" rx="6" fill="#e4c7a1" />
        </>
      );
    case "measurement":
    case "math":
      return word("tape");
    case "materials":
      return (
        <>
          <rect x="110" y="70" width="100" height="70" rx="8" fill="var(--steel)" />
          <ellipse cx="160" cy="74" rx="50" ry="14" fill="var(--concrete)" />
          <path d="M150 40 q20 20 8 36" fill="none" stroke="var(--concrete)" strokeWidth="8" />
        </>
      );
    case "hand-tools":
      return word("hammer");
    case "power-tools":
      return word("drill");
    case "equipment":
      return word("ladder");
    case "interior":
      return (
        <>
          <rect x="40" y="36" width="150" height="112" fill="var(--panel-2)" />
          <circle cx="200" cy="70" r="10" fill="var(--muted)" opacity="0.7" />
          <circle cx="230" cy="96" r="16" fill="var(--muted)" opacity="0.55" />
          <circle cx="250" cy="60" r="8" fill="var(--muted)" opacity="0.6" />
        </>
      );
    case "exterior":
      return (
        <>
          <path d="M40 120 L160 40 L280 120 Z" fill="var(--earth)" />
          <rect x="200" y="88" width="8" height="40" fill="var(--danger)" />
          <rect x="188" y="100" width="32" height="8" fill="var(--danger)" />
        </>
      );
    case "electrical":
      return (
        <>
          <rect x="118" y="36" width="84" height="110" rx="4" fill="var(--steel)" />
          <rect x="130" y="50" width="60" height="78" fill="var(--bg)" />
          <path d="M148 70 l12 20 h-8 l12 22" fill="none" stroke="var(--amber)" strokeWidth="4" />
        </>
      );
    case "plumbing":
      return (
        <>
          <rect x="70" y="78" width="120" height="18" rx="8" fill="var(--steel)" />
          <rect x="176" y="48" width="18" height="70" rx="8" fill="var(--steel)" />
          <circle cx="220" cy="86" r="16" fill="none" stroke="var(--amber)" strokeWidth="6" />
        </>
      );
    case "hvac":
      return (
        <>
          <rect x="70" y="48" width="180" height="90" rx="8" fill="var(--steel)" />
          <circle cx="130" cy="92" r="26" fill="none" stroke="var(--ink)" strokeWidth="6" />
          <circle cx="210" cy="92" r="18" fill="var(--panel-2)" />
        </>
      );
    default:
      return word(id);
  }
}

function word(id: string) {
  switch (id) {
    case "hammer":
      return (
        <>
          <rect x="148" y="46" width="18" height="108" rx="5" fill="var(--earth)" />
          <path d="M96 28 h128 v26 h-40 v16 h-28 v-16 H96 z" fill="var(--steel)" />
          <path d="M176 54 v18 h12 l-8 12 h-16 z" fill="var(--bg)" />
        </>
      );
    case "saw":
      return (
        <>
          <path d="M36 108 L210 70 L220 88 L46 126 Z" fill="var(--steel)" />
          <path d="M50 120 l12-8 8 10 12-8 8 10 12-8 8 10 12-8 8 10 12-8 8 10 12-8" fill="none" stroke="var(--ink-strong)" strokeWidth="3" />
          <rect x="196" y="58" width="64" height="28" rx="8" fill="var(--amber)" />
          <rect x="150" y="62" width="36" height="12" rx="2" fill="var(--ok)" />
        </>
      );
    case "tape":
      return (
        <>
          <rect x="78" y="58" width="78" height="64" rx="12" fill="var(--amber)" />
          <circle cx="112" cy="90" r="16" fill="var(--ink-strong)" />
          <rect x="150" y="82" width="110" height="14" fill="var(--ink)" />
          <path d="M160 82 v14 M176 82 v8 M192 82 v14 M208 82 v8 M224 82 v14 M240 82 v8" stroke="var(--amber)" strokeWidth="2" />
        </>
      );
    case "drill":
      return (
        <>
          <rect x="78" y="62" width="120" height="40" rx="12" fill="var(--ink)" />
          <rect x="198" y="74" width="36" height="14" fill="var(--steel)" />
          <rect x="230" y="78" width="40" height="6" fill="var(--amber)" />
          <path d="M100 100 h28 v36 h-18 z" fill="var(--ink)" />
          <rect x="70" y="118" width="40" height="8" fill="var(--steel)" />
        </>
      );
    case "level":
      return (
        <>
          <rect x="28" y="74" width="264" height="36" rx="6" fill="var(--amber)" />
          <rect x="120" y="80" width="80" height="24" rx="12" fill="var(--ink-strong)" />
          <circle cx="160" cy="92" r="6" fill="var(--ok)" />
          <rect x="48" y="84" width="40" height="16" rx="8" fill="var(--ink-strong)" />
          <rect x="232" y="84" width="40" height="16" rx="8" fill="var(--ink-strong)" />
        </>
      );
    case "hardhat":
    case "hat":
      return (
        <>
          <ellipse cx="160" cy="124" rx="96" ry="16" fill="var(--amber)" />
          <path d="M92 124 Q92 46 160 38 Q228 46 228 124 Z" fill="var(--amber)" />
          <path d="M118 78 Q160 64 202 78" fill="none" stroke="var(--amber-ink)" strokeWidth="4" />
        </>
      );
    case "ladder":
      return (
        <>
          <rect x="108" y="16" width="14" height="148" fill="var(--amber)" />
          <rect x="198" y="16" width="14" height="148" fill="var(--amber)" />
          <rect x="108" y="40" width="104" height="10" fill="var(--ink)" />
          <rect x="108" y="76" width="104" height="10" fill="var(--ink)" />
          <rect x="108" y="112" width="104" height="10" fill="var(--ink)" />
        </>
      );
    case "nail":
      return (
        <>
          <rect x="60" y="108" width="200" height="28" fill="var(--earth)" />
          <rect x="152" y="36" width="16" height="78" fill="var(--ink)" />
          <rect x="136" y="30" width="48" height="12" rx="2" fill="var(--steel)" />
        </>
      );
    case "gloves":
      return (
        <>
          <path d="M78 130 L78 78 Q78 52 98 52 Q112 52 114 74 L116 96 L128 60 Q138 42 154 52 L146 100 L162 56 Q174 40 190 54 L176 108 Q170 136 140 136 Z" fill="#f0c419" stroke="var(--amber-ink)" strokeWidth="3" />
          <path d="M150 132 L168 84 Q180 64 198 74 L186 120 Q180 140 160 140 Z" fill="var(--amber)" stroke="var(--amber-ink)" strokeWidth="3" />
        </>
      );
    case "glasses":
      return (
        <>
          <circle cx="118" cy="96" r="18" fill="#e4c7a1" />
          <path d="M96 78 Q118 58 140 78 L136 82 Q118 66 100 82 Z" fill="var(--amber)" />
          <circle cx="100" cy="100" r="16" fill="none" stroke="var(--ink)" strokeWidth="6" />
          <circle cx="148" cy="100" r="16" fill="none" stroke="var(--ink)" strokeWidth="6" />
          <rect x="116" y="94" width="16" height="6" fill="var(--ink)" />
        </>
      );
    case "guard":
      return (
        <>
          <circle cx="140" cy="100" r="46" fill="var(--steel)" />
          <path d="M140 54 A46 46 0 0 1 186 100 L140 100 Z" fill="var(--ok)" />
          <circle cx="140" cy="100" r="10" fill="var(--ink-strong)" />
          <rect x="180" y="90" width="80" height="20" rx="4" fill="var(--amber)" />
        </>
      );
    case "stud":
      return (
        <>
          <rect x="36" y="28" width="16" height="120" fill="var(--earth)" />
          <rect x="268" y="28" width="16" height="120" fill="var(--earth)" />
          <rect x="36" y="28" width="248" height="14" fill="var(--earth)" />
          <rect x="36" y="134" width="248" height="14" fill="var(--earth)" />
          <rect x="150" y="42" width="22" height="92" fill="var(--amber)" />
        </>
      );
    case "header":
      return (
        <>
          <rect x="40" y="36" width="240" height="28" fill="var(--amber)" />
          <rect x="56" y="64" width="20" height="84" fill="var(--earth)" />
          <rect x="244" y="64" width="20" height="84" fill="var(--earth)" />
          <rect x="76" y="100" width="168" height="48" fill="var(--bg-raise)" stroke="var(--line)" />
        </>
      );
    case "flashing":
      return (
        <>
          <rect x="70" y="40" width="120" height="80" fill="var(--panel-2)" stroke="var(--ink)" />
          <path d="M60 108 L200 108 L250 140 L60 140 Z" fill="var(--steel)" />
          <circle cx="230" cy="48" r="4" fill="var(--info)" />
          <circle cx="246" cy="70" r="4" fill="var(--info)" />
          <circle cx="236" cy="92" r="4" fill="var(--info)" />
        </>
      );
    case "joist":
      return (
        <>
          <rect x="24" y="40" width="272" height="16" fill="var(--panel-2)" />
          <rect x="48" y="56" width="18" height="80" fill="var(--earth)" />
          <rect x="110" y="56" width="18" height="80" fill="var(--amber)" />
          <rect x="172" y="56" width="18" height="80" fill="var(--earth)" />
          <rect x="234" y="56" width="18" height="80" fill="var(--earth)" />
        </>
      );
    default:
      return <Crew x={130} y={58} />;
  }
}
