import { useEffect, useState, type ReactNode } from "react";
import { SCENES, parableFor, type ParableId } from "../content/parables";

const FONT = "Barlow Condensed, sans-serif";

export function TeachText({ text, scene }: { text: string; scene?: ParableId }) {
  const [open, setOpen] = useState(false);
  const parable = scene ? { id: scene, story: SCENES[scene].story } : parableFor(text);
  return (
    <div className="teach">
      <button type="button" className={open ? "teach-line on" : "teach-line"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>{text}</span>
        <span className="kicker">{open ? "Hide" : "See it"}</span>
      </button>
      {open ? <Parable id={parable.id} story={parable.story} /> : null}
    </div>
  );
}

export function Parable({ id, story }: { id: ParableId; story: string }) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setBeat((value) => (value === 0 ? 1 : 0)), 1800);
    return () => window.clearInterval(timer);
  }, [id]);

  return (
    <figure className="parable">
      <figcaption>
        <span className="kicker">See it</span>
        <p>{story}</p>
      </figcaption>
      <Scene id={id} beat={beat} />
    </figure>
  );
}

function Scene({ id, beat }: { id: ParableId; beat: number }) {
  const after = beat === 1;
  return (
    <svg className="parable-art" viewBox="0 0 480 250" role="img" aria-hidden>
      <rect width="480" height="250" fill="var(--bg)" />
      <rect y="198" width="480" height="52" fill="var(--earth-deep)" />
      <text x="16" y="24" fill="var(--amber)" fontSize="14" fontFamily={FONT} letterSpacing="1.4">
        {after ? "THEN" : "FIRST"}
      </text>
      {draw(id, after)}
    </svg>
  );
}

function draw(id: ParableId, after: boolean): ReactNode {
  switch (id) {
    case "concrete-kit":
      return (
        <>
          <Saw x={230} dust={!after} />
          <Crew x={36} shades={!after} hat={after} goggles={after} muffs={after} mask={after} vest={after} gloves={after} boots={after} />
          <Tag x={24} y={36} text={after ? "FULL KIT ON" : "SUNGLASSES ONLY"} tone={after ? "ok" : "danger"} />
          {after && (
            <>
              <Tag x={150} y={36} text="HAT" />
              <Tag x={150} y={56} text="GOGGLES" />
              <Tag x={150} y={76} text="EARS" />
              <Tag x={150} y={96} text="RESPIRATOR" />
              <Tag x={150} y={116} text="VEST  GLOVES  BOOTS" />
            </>
          )}
        </>
      );
    case "dust-control":
      return (
        <>
          <Saw x={150} dust={!after} water={after} />
          <Tag x={24} y={40} text={after ? "WATER ON THE BLADE" : "DRY CUT"} tone={after ? "ok" : "danger"} />
          <Crew x={24} mask={after} goggles />
        </>
      );
    case "eyes":
      return (
        <>
          <Saw x={250} dust />
          <Crew x={40} shades={!after} goggles={after} hat={after} />
          <Tag x={24} y={40} text={after ? "GOGGLES OR SHIELD" : "STREET SUNGLASSES"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "respirator":
      return (
        <>
          <Saw x={240} dust={!after} />
          <Crew x={36} hat goggles muffs={after} mask={after} vest gloves boots />
          <Tag x={24} y={40} text={after ? "RESPIRATOR ON" : "NO RESPIRATOR"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "hearing":
      return (
        <>
          <Truck x={250} backing={!after} />
          <Crew x={36} muffs hat vest />
          <Tag x={24} y={40} text={after ? "LOOK FIRST" : "MUFFS HIDE THE ALARM"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "vest":
      return (
        <>
          <Truck x={260} />
          <Crew x={36} hat boots vest={after} />
          <Tag x={24} y={40} text={after ? "VEST, THEN EYE CONTACT" : "UNSEEN IN THE PATH"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "gloves":
      return (
        <>
          <Can x={280} label="SDS" />
          <Crew x={40} gloves={after} />
          <Tag x={24} y={40} text={after ? "GLOVE THE SDS NAMES" : "COTTON GLOVE"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "cord":
      return (
        <>
          <Cord cut={!after} hooked={after} />
          <Tag x={24} y={40} text={after ? "OUT OF SERVICE" : "TAPE ON THE CUT"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "guard":
      return (
        <>
          <Saw x={180} guard={after} />
          <Tag x={24} y={40} text={after ? "GUARD ON" : "GUARD MISSING"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "ladder":
      return (
        <>
          {!after && <Ladder cracked />}
          {after && <Stairs />}
          <Crew x={300} phone={!after} />
          <Tag x={24} y={40} text={after ? "STAIR, LADDER TAGGED OUT" : "CRACKED RAIL"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "opening":
      return (
        <>
          <Hole covered={after} />
          <Crew x={320} />
          <Tag x={24} y={40} text={after ? "COVER ON THE HOLE" : "OPEN HOLE"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "harness":
      return (
        <>
          <Hole covered={after} />
          {!after && <Tag x={250} y={120} text="PIPE IS NOT AN ANCHOR" tone="danger" />}
          <Crew x={300} />
          <Tag x={24} y={40} text={after ? "USE THE COVER" : "NO RATED ANCHOR"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "spill":
      return (
        <>
          <Can x={120} tipped={!after} />
          <Spill contained={after} />
          <Crew x={300} />
          <Tag x={220} y={40} text={after ? "STEP BACK AND REPORT" : "DO NOT WIPE OR SNIFF"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "label":
      return (
        <>
          <Can x={70} label={after ? "NL-14" : "?"} />
          {after && <Sheet x={220} />}
          <Crew x={360} />
          <Tag x={200} y={40} text={after ? "READ THE LABEL" : "NO NAME ON THE CAN"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "incompatible":
      return (
        <>
          <Can x={after ? 60 : 120} label="A" />
          <Can x={after ? 280 : 168} label="B" />
          <Tag x={24} y={40} text={after ? "SEPARATED" : "INCOMPATIBLES TOUCHING"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "container":
      return (
        <>
          <Can x={140} tipped={!after} split={!after} />
          <Tag x={24} y={40} text={after ? "UPRIGHT AND REPORTED" : "SPLIT OR ON ITS SIDE"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "sds":
      return (
        <>
          {after ? <Sheet x={160} /> : <LockerDoor />}
          <Tag x={24} y={40} text={after ? "SDS OPEN" : "SDS LOCKED"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "signal":
      return (
        <>
          <Can x={80} label={after ? "DANGER" : "?"} />
          <Sheet x={240} title={after ? "DANGER" : "WORD"} />
          <Tag x={24} y={40} text={after ? "DANGER OR WARNING" : "NO SIGNAL WORD"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "flame":
      return (
        <>
          <Can x={70} label="FLAME" />
          {!after && <Heater x={230} />}
          {after && <Tag x={230} y={120} text="AWAY FROM IGNITION" tone="ok" />}
          <Tag x={24} y={40} text={after ? "CAN CLOSED, KEPT CLEAR" : "CAN BESIDE HEAT"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "signin":
      return (
        <>
          <Board x={40} signed={after} />
          <Crew x={280} />
          <Tag x={200} y={40} text={after ? "SIGNED IN" : "WAVED PAST THE BOARD"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "exit":
      return (
        <>
          <Door blocked={!after} />
          <Tag x={24} y={40} text={after ? "EXIT CLEAR" : "EXIT BLOCKED"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "housekeeping":
      return (
        <>
          <Scrap binned={after} />
          <Crew x={300} />
          <Tag x={24} y={40} text={after ? "PATH CLEAR" : "SCRAP IN THE PATH"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "alarm":
      return (
        <>
          <Alarm />
          <Crew x={after ? 300 : 80} />
          <Tag x={160} y={40} text={after ? "MUSTER AND STAY" : "STILL WORKING"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "report":
      return (
        <>
          <Crew x={40} />
          <Crew x={240} vest />
          <Tag x={140} y={70} text={after ? "TELL THE SUPERVISOR" : "NOTHING SAID"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "stop":
      return (
        <>
          <Saw x={200} guard />
          <Tag x={24} y={40} text={after ? "TOOL DOWN, PEOPLE CLEAR" : "STILL CUTTING"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "load":
      return (
        <>
          <Load />
          <Crew x={after ? 340 : 180} />
          <Tag x={24} y={40} text={after ? "OUT FROM UNDER IT" : "STANDING UNDER THE LOAD"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "ask":
      return (
        <>
          <Crew x={40} />
          <Crew x={250} vest />
          <Tag x={130} y={60} text={after ? "ASK, THEN READ IT BACK" : "NOD AND MOVE"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "electrical":
      return (
        <>
          <Panel open={!after} />
          <Crew x={320} />
          <Tag x={24} y={40} text={after ? "KEEP CLEAR, GET HELP" : "EXPOSED EQUIPMENT"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "extinguisher":
      return (
        <>
          <Extinguisher buried={!after} />
          <Crew x={320} />
          <Tag x={24} y={40} text={after ? "VISIBLE, OR LEAVE AND MUSTER" : "BURIED IN SCRAP"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "eyewash":
      return (
        <>
          <Eyewash running={after} />
          <Crew x={300} />
          <Tag x={24} y={40} text={after ? "EYEWASH NOW" : "WAITING"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "fatigue":
      return (
        <>
          <Ladder />
          <Crew x={250} />
          <Tag x={24} y={40} text={after ? "NAME IT AND STOP" : "TIRED ON THE LADDER"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "swing":
      return (
        <>
          <Machine />
          <Crew x={after ? 340 : 180} vest hat />
          <Tag x={24} y={40} text={after ? "MACHINE STOPPED" : "IN THE SWING"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "badge":
      return (
        <>
          <Badge />
          <Tag x={200} y={90} text={after ? "NOT A CERTIFICATE" : "BADGE ONLY"} tone={after ? "ok" : "amber"} />
        </>
      );
    case "hierarchy":
      return (
        <>
          <Hole covered={after} />
          <Tag x={24} y={40} text={after ? "HIGHER CONTROL FIRST" : "PPE ALONE"} tone={after ? "ok" : "danger"} />
          <Crew x={320} mask={!after} hat />
        </>
      );
    case "firstaid":
      return (
        <>
          <Cross />
          <Tag x={180} y={80} text={after ? "FIRST AID, CONFIRMED" : "NOT THE LUNCH ROOM"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "gate":
      return (
        <>
          <Fence open={!after} />
          <Crew x={300} />
          <Tag x={24} y={40} text={after ? "STAY OUT, REPORT IT" : "OPEN GATE, STILL RESTRICTED"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "rebar":
      return (
        <>
          <Rebar capped={after} />
          <Tag x={24} y={40} text={after ? "CAPS ON" : "UNCAPPED REBAR"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "scaffold":
      return (
        <>
          <Plank split={!after} />
          <Tag x={24} y={40} text={after ? "PLANK REPLACED" : "SPLIT PLANK"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "horseplay":
      return (
        <>
          <Stairs />
          <Crew x={40} />
          <Crew x={120} />
          <Tag x={220} y={40} text={after ? "SHOVE STOPPED" : "SHOVE ON THE STAIR"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "conduct":
      return (
        <>
          <Crew x={40} />
          <Crew x={180} vest />
          <Tag x={250} y={70} text={after ? "SPEAK DIRECTLY, THEN THE PROCESS" : "LAUGHING IS TAKING A SIDE"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "radio":
      return (
        <>
          <Crew x={40} />
          <Radio />
          <Tag x={160} y={50} text={after ? "REPEAT THE SENTENCE" : "NOD ON THE RADIO"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "nohazard":
      return (
        <>
          <Can x={80} label="OK" />
          <Tag x={180} y={70} text={after ? "THIS ONE IS FINE" : "LOOK AT THE OTHER HAZARD"} tone="ok" />
        </>
      );
    case "tool":
      return (
        <>
          <Hammer split={!after} />
          <Tag x={24} y={40} text={after ? "SET ASIDE" : "SPLIT HANDLE"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "hardhat":
      return (
        <>
          <Crew x={60} hat />
          <Tag x={180} y={70} text={after ? "CRACKED SHELL IS OUT" : "CRACKED SHELL"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "boots":
      return (
        <>
          <Crew x={60} boots={after} />
          <Tag x={180} y={80} text={after ? "TREAD ON THE WET SITE" : "SMOOTH SOLES"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "phone":
      return (
        <>
          <Ladder />
          <Crew x={250} phone={!after} />
          <Tag x={24} y={40} text={after ? "PHONE AWAY" : "PHONE ON THE LADDER"} tone={after ? "ok" : "danger"} />
        </>
      );
    case "spotter":
      return (
        <>
          <Machine />
          <Crew x={after ? 300 : 150} vest hat />
          <Tag x={24} y={40} text={after ? "WHERE THE OPERATOR SEES YOU" : "HIDDEN FROM THE CAB"} tone={after ? "ok" : "danger"} />
        </>
      );
    default:
      return (
        <>
          <Board x={40} signed={after} />
          <Crew x={280} />
          <Tag x={200} y={48} text={after ? "FOLLOW THIS CALL" : "STOP AND MATCH IT"} tone={after ? "ok" : "amber"} />
        </>
      );
  }
}

function Tag({ x, y, text, tone = "amber" }: { x: number; y: number; text: string; tone?: "amber" | "ok" | "danger" }) {
  const fill = tone === "ok" ? "var(--ok)" : tone === "danger" ? "var(--danger)" : "var(--amber)";
  const width = Math.max(78, text.length * 7.4 + 16);
  return (
    <g>
      <rect x={x} y={y} width={width} height={18} rx="4" fill="var(--ink-strong)" />
      <text x={x + 8} y={y + 13} fill={fill} fontSize="12" fontFamily={FONT}>
        {text}
      </text>
    </g>
  );
}

function Crew({
  x,
  hat = false,
  goggles = false,
  shades = false,
  muffs = false,
  mask = false,
  vest = false,
  gloves = false,
  boots = false,
  phone = false,
}: {
  x: number;
  hat?: boolean;
  goggles?: boolean;
  shades?: boolean;
  muffs?: boolean;
  mask?: boolean;
  vest?: boolean;
  gloves?: boolean;
  boots?: boolean;
  phone?: boolean;
}) {
  return (
    <g transform={`translate(${x} 86)`} className="live-worker">
      {hat && <path d="M0 16h44c-2 16-12 22-22 22S2 32 0 16z" fill="var(--amber)" />}
      <circle cx="22" cy="30" r="14" fill="var(--earth)" />
      {shades && (
        <>
          <path d="M8 28h12l2 5H8z" fill="var(--ink-strong)" />
          <path d="M24 28h12l2 5H24z" fill="var(--ink-strong)" />
        </>
      )}
      {goggles && <rect x="6" y="24" width="32" height="10" rx="4" fill="none" stroke="var(--info)" strokeWidth="3" />}
      {muffs && (
        <>
          <circle cx="4" cy="30" r="6" fill="var(--ok)" />
          <circle cx="40" cy="30" r="6" fill="var(--ok)" />
        </>
      )}
      {mask && <rect x="12" y="34" width="20" height="12" rx="3" fill="var(--concrete)" />}
      <rect x="10" y="48" width="24" height="32" rx="5" fill={vest ? "var(--amber)" : "var(--panel-2)"} />
      {gloves && (
        <>
          <rect x="0" y="64" width="10" height="12" rx="2" fill="var(--earth)" />
          <rect x="34" y="64" width="10" height="12" rx="2" fill="var(--earth)" />
        </>
      )}
      <rect x="12" y="80" width="8" height="24" rx="2" fill="var(--ink-strong)" />
      <rect x="24" y="80" width="8" height="24" rx="2" fill="var(--ink-strong)" />
      {boots && (
        <>
          <rect x="10" y="98" width="12" height="8" rx="2" fill="var(--ink)" />
          <rect x="22" y="98" width="12" height="8" rx="2" fill="var(--ink)" />
        </>
      )}
      {phone && <rect x="36" y="58" width="10" height="16" rx="2" fill="var(--info)" />}
    </g>
  );
}

function Saw({ x, dust = false, water = false, guard = true }: { x: number; dust?: boolean; water?: boolean; guard?: boolean }) {
  return (
    <g transform={`translate(${x} 108)`}>
      <rect x="0" y="62" width="170" height="26" rx="2" fill="var(--concrete)" />
      <text x="85" y="80" textAnchor="middle" fill="var(--ink-strong)" fontSize="12" fontFamily={FONT}>
        CONCRETE
      </text>
      <rect x="36" y="34" width="78" height="30" rx="4" fill="var(--panel-2)" stroke="var(--steel)" />
      <circle cx="124" cy="56" r="24" fill="none" stroke={guard ? "var(--steel)" : "var(--danger)"} strokeWidth="5" />
      {guard && <path d="M100 40h28v28" fill="none" stroke="var(--ok)" strokeWidth="4" />}
      {!guard && (
        <text x="124" y="28" textAnchor="middle" fill="var(--danger)" fontSize="12" fontFamily={FONT}>
          NO GUARD
        </text>
      )}
      {dust && <ellipse className="live-pulse" cx="70" cy="10" rx="48" ry="16" fill="var(--concrete)" opacity="0.8" />}
      {dust && (
        <text x="70" y="2" textAnchor="middle" fill="var(--ink)" fontSize="12" fontFamily={FONT}>
          DUST
        </text>
      )}
      {water && <path className="live-wink" d="M48 0c24 18 24 40 10 56" fill="none" stroke="var(--info)" strokeWidth="5" />}
      {water && (
        <text x="8" y="16" fill="var(--info)" fontSize="12" fontFamily={FONT}>
          WATER
        </text>
      )}
    </g>
  );
}

function Truck({ x, backing = false }: { x: number; backing?: boolean }) {
  return (
    <g transform={`translate(${x} 120)`}>
      <rect width="150" height="54" rx="6" fill="var(--panel-2)" stroke="var(--amber)" />
      <text x="75" y="32" textAnchor="middle" fill="var(--amber)" fontSize="16" fontFamily={FONT}>
        {backing ? "REVERSING" : "TRUCK"}
      </text>
      {backing && <path d="M20 70h110" stroke="var(--danger)" strokeWidth="4" />}
    </g>
  );
}

function Can({ x, label = "", tipped = false, split = false }: { x: number; label?: string; tipped?: boolean; split?: boolean }) {
  return (
    <g transform={`translate(${x} 110) ${tipped ? "rotate(70 24 40)" : ""}`}>
      <rect width="48" height="78" rx="8" fill="var(--panel-2)" stroke={split ? "var(--danger)" : "var(--steel)"} strokeWidth="3" />
      <rect width="48" height="14" rx="6" fill="var(--steel)" />
      {split && <path d="M10 30l28 24" stroke="var(--danger)" strokeWidth="3" />}
      <text x="24" y="48" textAnchor="middle" fill="var(--amber)" fontSize="12" fontFamily={FONT}>
        {label}
      </text>
    </g>
  );
}

function Spill({ contained }: { contained: boolean }) {
  return <ellipse cx="180" cy="190" rx={contained ? 16 : 46} ry="8" fill="var(--danger)" opacity="0.8" />;
}

function Sheet({ x, title = "SDS" }: { x: number; title?: string }) {
  return (
    <g transform={`translate(${x} 70)`}>
      <rect width="130" height="100" rx="4" fill="var(--ink)" />
      <text x="12" y="24" fill="var(--amber)" fontSize="16" fontFamily={FONT}>
        {title}
      </text>
      <rect x="12" y="36" width="90" height="6" fill="var(--muted)" />
      <rect x="12" y="50" width="100" height="6" fill="var(--muted)" />
      <rect x="12" y="64" width="80" height="6" fill="var(--muted)" />
    </g>
  );
}

function Cord({ cut, hooked }: { cut: boolean; hooked: boolean }) {
  return (
    <g>
      <path d="M40 170 C 100 120, 160 190, 220 130" fill="none" stroke={cut ? "var(--danger)" : "var(--ok)"} strokeWidth="6" />
      {cut && <Tag x={120} y={100} text="COPPER SHOWING" tone="danger" />}
      {hooked && (
        <g transform="translate(300 80)">
          <path d="M20 0v50" stroke="var(--steel)" strokeWidth="4" />
          <path d="M8 50h24" stroke="var(--amber)" strokeWidth="6" />
          <text x="20" y="78" textAnchor="middle" fill="var(--amber)" fontSize="14" fontFamily={FONT}>
            HOOK
          </text>
        </g>
      )}
    </g>
  );
}

function Ladder({ cracked = false }: { cracked?: boolean }) {
  return (
    <g transform="translate(70 50)">
      <rect width="8" height="140" fill={cracked ? "var(--danger)" : "var(--steel)"} />
      <rect x="40" width="8" height="140" fill="var(--steel)" />
      <path d="M0 40h48M0 70h48M0 100h48" stroke="var(--steel)" strokeWidth="4" />
      {cracked && (
        <text x="0" y="160" fill="var(--danger)" fontSize="12" fontFamily={FONT}>
          CRACK
        </text>
      )}
    </g>
  );
}

function Stairs() {
  return <path d="M80 180h36v-28h36v-28h36v-28h36" fill="none" stroke="var(--ok)" strokeWidth="8" />;
}

function Hole({ covered }: { covered: boolean }) {
  return (
    <g>
      <rect x="70" y="168" width="120" height="30" fill="var(--ink-strong)" />
      <text x="130" y="188" textAnchor="middle" fill="var(--danger)" fontSize="13" fontFamily={FONT}>
        {covered ? "" : "HOLE"}
      </text>
      {covered && <rect x="70" y="160" width="120" height="16" fill="var(--amber)" />}
      {covered && (
        <text x="130" y="154" textAnchor="middle" fill="var(--amber)" fontSize="12" fontFamily={FONT}>
          COVER
        </text>
      )}
    </g>
  );
}

function Board({ x, signed }: { x: number; signed: boolean }) {
  return (
    <g transform={`translate(${x} 60)`}>
      <rect width="120" height="110" rx="6" fill="var(--panel-2)" />
      <text x="12" y="24" fill="var(--amber)" fontSize="16" fontFamily={FONT}>
        BOARD
      </text>
      <rect x="12" y="40" width="80" height="8" fill="var(--muted)" />
      <rect x="12" y="58" width="70" height="8" fill={signed ? "var(--ok)" : "var(--muted)"} />
      {signed && <path d="M78 70l10 10 18-20" fill="none" stroke="var(--ok)" strokeWidth="4" />}
    </g>
  );
}

function Door({ blocked }: { blocked: boolean }) {
  return (
    <g transform="translate(180 70)">
      <rect width="90" height="120" fill="var(--panel-2)" stroke="var(--ok)" />
      <text x="45" y="40" textAnchor="middle" fill="var(--ok)" fontSize="16" fontFamily={FONT}>
        EXIT
      </text>
      {blocked && <rect x="-20" y="90" width="130" height="22" fill="var(--danger)" />}
      {blocked && (
        <text x="45" y="106" textAnchor="middle" fill="var(--ink)" fontSize="12" fontFamily={FONT}>
          SCRAP
        </text>
      )}
    </g>
  );
}

function Scrap({ binned }: { binned: boolean }) {
  return binned ? (
    <rect x="80" y="140" width="50" height="50" fill="var(--panel-2)" />
  ) : (
    <g transform="translate(100 160)">
      <rect width="40" height="12" fill="var(--amber)" />
      <rect x="16" y="14" width="36" height="10" fill="var(--earth)" />
    </g>
  );
}

function Alarm() {
  return <circle className="live-pulse" cx="70" cy="70" r="18" fill="var(--danger)" />;
}

function Load() {
  return (
    <g className="live-float" transform="translate(180 36)">
      <rect x="28" width="4" height="30" fill="var(--steel)" />
      <rect y="30" width="60" height="22" fill="var(--earth)" />
      <text x="30" y="46" textAnchor="middle" fill="var(--ink)" fontSize="12" fontFamily={FONT}>
        LOAD
      </text>
    </g>
  );
}

function Panel({ open }: { open: boolean }) {
  return (
    <g transform="translate(80 80)">
      <rect width="90" height="100" fill="var(--panel-2)" stroke={open ? "var(--danger)" : "var(--ok)"} strokeWidth="4" />
      <text x="45" y="30" textAnchor="middle" fill="var(--amber)" fontSize="14" fontFamily={FONT}>
        PANEL
      </text>
      {open && <path d="M20 50h50M20 66h40" stroke="var(--danger)" strokeWidth="4" />}
    </g>
  );
}

function Extinguisher({ buried }: { buried: boolean }) {
  return (
    <g transform="translate(120 90)">
      <rect width="28" height="70" rx="8" fill="var(--danger)" />
      {buried && <rect x="-16" y="48" width="70" height="20" fill="var(--earth)" />}
    </g>
  );
}

function Eyewash({ running }: { running: boolean }) {
  return (
    <g transform="translate(80 90)">
      <rect width="80" height="50" rx="6" fill="var(--panel-2)" />
      <text x="40" y="30" textAnchor="middle" fill="var(--info)" fontSize="13" fontFamily={FONT}>
        EYEWASH
      </text>
      {running && <path className="live-wink" d="M20 50c10 16 20 16 30 0" fill="none" stroke="var(--info)" strokeWidth="4" />}
    </g>
  );
}

function Machine() {
  return (
    <g transform="translate(40 110)">
      <rect width="120" height="60" rx="6" fill="var(--panel-2)" />
      <text x="60" y="36" textAnchor="middle" fill="var(--amber)" fontSize="14" fontFamily={FONT}>
        MACHINE
      </text>
      <path d="M120 30h70" stroke="var(--danger)" strokeWidth="3" strokeDasharray="6 4" />
    </g>
  );
}

function Badge() {
  return (
    <g transform="translate(70 80)">
      <circle cx="40" cy="40" r="36" fill="var(--amber)" />
      <text x="40" y="46" textAnchor="middle" fill="var(--amber-ink)" fontSize="14" fontFamily={FONT}>
        BADGE
      </text>
    </g>
  );
}

function Cross() {
  return (
    <g transform="translate(70 70)">
      <rect width="70" height="70" rx="8" fill="var(--ok-deep)" />
      <path d="M30 12h10v46H30zM12 30h46v10H12z" fill="var(--ok)" />
    </g>
  );
}

function Fence({ open }: { open: boolean }) {
  return (
    <g>
      <rect x="40" y="90" width="120" height="8" fill="var(--steel)" />
      <rect x="300" y="90" width="120" height="8" fill="var(--steel)" />
      <rect x="160" y="70" width="8" height="110" fill={open ? "var(--danger)" : "var(--ok)"} />
      <text x="200" y="60" fill="var(--amber)" fontSize="14" fontFamily={FONT}>
        RESTRICTED
      </text>
    </g>
  );
}

function Rebar({ capped }: { capped: boolean }) {
  return (
    <g transform="translate(160 120)">
      <rect width="10" height="70" fill="var(--steel)" />
      <rect x="28" width="10" height="70" fill="var(--steel)" />
      {capped && (
        <>
          <rect y="-8" width="10" height="12" fill="var(--ok)" />
          <rect x="28" y="-8" width="10" height="12" fill="var(--ok)" />
        </>
      )}
    </g>
  );
}

function Plank({ split }: { split: boolean }) {
  return (
    <g transform="translate(80 140)">
      <rect width="220" height="18" fill={split ? "var(--danger)" : "var(--ok)"} />
      <rect x="0" y="18" width="8" height="40" fill="var(--steel)" />
      <rect x="212" y="18" width="8" height="40" fill="var(--steel)" />
    </g>
  );
}

function Radio() {
  return <rect x="140" y="120" width="28" height="40" rx="4" fill="var(--ink-strong)" stroke="var(--amber)" />;
}

function Hammer({ split }: { split: boolean }) {
  return (
    <g transform="translate(160 90)">
      <rect x="28" width="50" height="22" rx="3" fill="var(--steel)" />
      <rect x="46" y="22" width="12" height="80" fill={split ? "var(--danger)" : "var(--earth)"} />
    </g>
  );
}

function LockerDoor() {
  return (
    <g transform="translate(160 70)">
      <rect width="120" height="110" rx="6" fill="var(--panel-2)" />
      <text x="60" y="50" textAnchor="middle" fill="var(--danger)" fontSize="16" fontFamily={FONT}>
        LOCKED
      </text>
      <text x="60" y="74" textAnchor="middle" fill="var(--muted)" fontSize="13" fontFamily={FONT}>
        SDS
      </text>
    </g>
  );
}

function Heater({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 120)`}>
      <rect width="50" height="60" fill="var(--danger)" />
      <text x="25" y="36" textAnchor="middle" fill="var(--ink)" fontSize="12" fontFamily={FONT}>
        HEAT
      </text>
    </g>
  );
}
