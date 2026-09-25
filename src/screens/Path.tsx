import { Link } from "react-router-dom";
import { CrewSite } from "../components/CrewSite";
import { SceneArt } from "../components/WordPicture";
import { BASELINE, COMPUTER_TASKS, ENGLISH_WORDS, EXAM, LANGUAGES, PATHWAYS, SENTENCES, SUPPORTED_WORDS } from "../content/curriculum";
import { useCurriculumSnap } from "./Curriculum";
import { useProgress } from "../state/progress";

/**
 * The learner's front door.
 * One next step, in the order a person actually learns a new workplace:
 * who you are, what you already know, the name of the thing, then the work.
 */
export function PathPage() {
  const snap = useCurriculumSnap();
  const { state } = useProgress();
  const steps = pathSteps(snap, state.curriculum.computer.length, Boolean(state.modules.ppe?.completed));
  const now = steps.find((step) => !step.done) ?? steps[steps.length - 1];
  const language = LANGUAGES.find((item) => item.id === snap.language);
  const pathway = PATHWAYS.find((item) => item.id === snap.pathway);

  return (
    <div className="stack">
      <p className="kicker">Purpose Academy</p>
      <h2>One thing at a time.</h2>
      <CrewSite />
      <p>See it. Understand it in your language. Then meet the same idea in English.</p>
      <article className="panel stack path-now">
        <SceneArt id={now.id} />
        <p className="kicker">Do this now</p>
        <h3>{now.title}</h3>
        <p>{now.line}</p>
        <Link className="btn btn-primary" to={now.href}>
          {now.action}
        </Link>
      </article>
      <ol className="path-list">
        {steps.map((step, index) => (
          <li key={step.id} className={step.done ? "done" : step.id === now.id ? "now" : undefined}>
            <Link to={step.href}>
              <SceneArt id={step.id} compact />
              <span>{index + 1}</span>
              <strong>{step.title}</strong>
            </Link>
          </li>
        ))}
      </ol>
      <p>
        {language ? `Your language is ${language.name}. It stays beside the picture until the English is yours.` : "Choose a language on the next word, so the meaning arrives before the English."}
        {pathway ? ` ${pathway.title} is the work you chose.` : ""}
      </p>
      <p className="faint">Learned. Practised. Competent. A person, not this screen, says you are competent.</p>
    </div>
  );
}

interface PathStep {
  id: string;
  title: string;
  line: string;
  action: string;
  href: string;
  done: boolean;
}

function pathSteps(
  snap: ReturnType<typeof useCurriculumSnap>,
  computerDone: number,
  safetyModule: boolean,
): PathStep[] {
  const seen = (stage: "visual" | "supported" | "english", words: { id: string }[]) =>
    words.filter((word) => snap.vocab[word.id]?.[stage]).length >= words.length;
  const safety = snap.units.includes("safety") || safetyModule;
  const work = ["materials", "hand-tools", "exterior", "interior"].filter((id) => snap.units.includes(id)).length >= 2;

  return [
    {
      id: "start",
      title: "Your name",
      line: "Tell us who you are. That is the start.",
      action: "Open your profile",
      href: "/profile",
      done: snap.onboarded,
    },
    {
      id: "baseline",
      title: "What is this?",
      line: "Look at a picture. Name it. We learn what you already know.",
      action: "Look at the pictures",
      href: "/baseline",
      done: snap.baseline.length >= BASELINE.length,
    },
    {
      id: "pathway",
      title: "Your work",
      line: "Construction, logistics, or community support. Construction is the work in this app.",
      action: "Choose the work",
      href: "/profile",
      done: Boolean(snap.pathway),
    },
    {
      id: "language",
      title: "Your language",
      line: "The meaning comes in the language you think in. English comes next to it.",
      action: "Choose your language",
      href: "/vocabulary?stage=visual",
      done: Boolean(snap.language),
    },
    {
      id: "understand",
      title: "See the thing",
      line: "A picture. Your language. Then the English word.",
      action: "See the first word",
      href: "/vocabulary?stage=visual",
      done: seen("visual", SUPPORTED_WORDS),
    },
    {
      id: "repeat",
      title: "Say it again",
      line: "Hearing it twice is how a new word stays.",
      action: "Say it again",
      href: "/vocabulary?stage=supported",
      done: seen("supported", SUPPORTED_WORDS),
    },
    {
      id: "recognize",
      title: "Know the English",
      line: "The picture stays. Your language steps back. The English remains.",
      action: "Name it in English",
      href: "/vocabulary?stage=english",
      done: seen("english", ENGLISH_WORDS),
    },
    {
      id: "speak",
      title: "Say a sentence",
      line: "This is a hammer. A whole sentence, still short.",
      action: "Say a sentence",
      href: "/vocabulary?stage=sentences",
      done: snap.sentences.length >= SENTENCES.length,
    },
    {
      id: "instruction",
      title: "Follow the words",
      line: "Bring the tape measure. The words now ask you to do something.",
      action: "Follow an instruction",
      href: "/computer",
      done: computerDone >= COMPUTER_TASKS.length,
    },
    {
      id: "safety",
      title: "Stay safe",
      line: "Learn how to stay whole before you practise with a tool.",
      action: "Open safety",
      href: "/course",
      done: safety,
    },
    {
      id: "work",
      title: "Do the work",
      line: "Measure, name the tools, and look at a wall, a floor, and the outside of a building.",
      action: "Open the work",
      href: "/course",
      done: work,
    },
    {
      id: "site",
      title: "Write the day",
      line: "What you did. What you would tell the person in charge.",
      action: "Write the day",
      href: "/sitelog",
      done: snap.logs > 0,
    },
    {
      id: "check",
      title: "Show what you know",
      line: "Safety, measuring, the work, and the words. A short check.",
      action: "Start the check",
      href: "/exam",
      done: snap.exam.length >= EXAM.length,
    },
    {
      id: "passport",
      title: "Your record",
      line: "What you studied, practised, and showed. It is a training record.",
      action: "Open your record",
      href: "/record",
      done: snap.modulesCompleted.length >= 8,
    },
    {
      id: "job",
      title: "Toward a job",
      line: "Lines you can say to an employer. A person helps with the rest.",
      action: "See the lines",
      href: "/employment",
      done: snap.units.includes("employment"),
    },
  ];
}
