/** One object, large enough to name before any sentence. */
export function WordPicture({ id }: { id: string }) {
  return (
    <svg className="word-art" viewBox="0 0 320 180" role="img" aria-hidden>
      <rect width="320" height="180" rx="16" fill="var(--bg)" />
      <rect y="148" width="320" height="32" fill="var(--earth-deep)" />
      {draw(id)}
    </svg>
  );
}

function draw(id: string) {
  switch (id) {
    case "hammer":
      return (
        <>
          <rect x="148" y="36" width="28" height="22" rx="3" fill="var(--ink)" />
          <rect x="158" y="56" width="8" height="88" fill="var(--amber)" />
        </>
      );
    case "saw":
      return (
        <>
          <path d="M70 120 L230 78 L236 90 L76 132 Z" fill="var(--ink)" />
          <rect x="214" y="62" width="36" height="18" rx="3" fill="var(--amber)" />
          <rect x="168" y="70" width="28" height="10" rx="2" fill="var(--ok)" />
        </>
      );
    case "tape":
      return (
        <>
          <rect x="118" y="58" width="64" height="48" rx="8" fill="var(--amber)" />
          <rect x="182" y="74" width="70" height="10" fill="var(--ink)" />
        </>
      );
    case "drill":
      return (
        <>
          <rect x="96" y="70" width="110" height="36" rx="10" fill="var(--ink)" />
          <rect x="206" y="82" width="48" height="8" fill="var(--amber)" />
          <rect x="108" y="106" width="22" height="28" rx="4" fill="var(--ink)" />
        </>
      );
    case "level":
      return (
        <>
          <rect x="48" y="78" width="224" height="28" rx="6" fill="var(--amber)" />
          <circle cx="160" cy="92" r="10" fill="var(--bg)" stroke="var(--ink)" strokeWidth="3" />
        </>
      );
    case "hardhat":
      return <path d="M70 110 Q160 28 250 110 L230 110 Q160 58 90 110 Z" fill="var(--amber)" />;
    case "ladder":
      return (
        <>
          <rect x="118" y="28" width="10" height="120" fill="var(--amber)" />
          <rect x="192" y="28" width="10" height="120" fill="var(--amber)" />
          <rect x="118" y="48" width="84" height="8" fill="var(--ink)" />
          <rect x="118" y="78" width="84" height="8" fill="var(--ink)" />
          <rect x="118" y="108" width="84" height="8" fill="var(--ink)" />
        </>
      );
    case "nail":
      return (
        <>
          <rect x="154" y="40" width="12" height="90" fill="var(--ink)" />
          <rect x="142" y="36" width="36" height="10" rx="2" fill="var(--ink)" />
        </>
      );
    case "gloves":
      return <path d="M110 130 L110 70 Q110 48 128 48 Q140 48 140 68 L140 90 L150 62 Q158 46 172 54 L168 100 L180 58 Q190 44 204 56 L190 110 Q186 132 160 132 Z" fill="var(--amber)" />;
    case "glasses":
      return (
        <>
          <circle cx="120" cy="88" r="28" fill="none" stroke="var(--ink)" strokeWidth="8" />
          <circle cx="200" cy="88" r="28" fill="none" stroke="var(--ink)" strokeWidth="8" />
          <rect x="148" y="82" width="24" height="8" fill="var(--ink)" />
        </>
      );
    case "guard":
      return (
        <>
          <circle cx="150" cy="96" r="36" fill="none" stroke="var(--ink)" strokeWidth="10" />
          <rect x="186" y="88" width="70" height="16" fill="var(--amber)" />
        </>
      );
    case "stud":
      return <rect x="146" y="24" width="28" height="124" fill="var(--amber)" />;
    case "header":
      return (
        <>
          <rect x="70" y="48" width="180" height="22" fill="var(--amber)" />
          <rect x="86" y="70" width="16" height="78" fill="var(--ink)" />
          <rect x="218" y="70" width="16" height="78" fill="var(--ink)" />
        </>
      );
    case "flashing":
      return <path d="M60 70 L200 70 L260 110 L60 110 Z" fill="var(--ink)" />;
    case "joist":
      return (
        <>
          <rect x="40" y="70" width="240" height="16" fill="var(--ink)" />
          <rect x="70" y="86" width="14" height="50" fill="var(--amber)" />
          <rect x="150" y="86" width="14" height="50" fill="var(--amber)" />
          <rect x="230" y="86" width="14" height="50" fill="var(--amber)" />
        </>
      );
    default:
      return <circle cx="160" cy="90" r="28" fill="var(--amber)" />;
  }
}
