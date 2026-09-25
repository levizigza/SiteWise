import { Link } from "react-router-dom";
import { ObjectPhoto, hasPhoto } from "../components/ObjectPhoto";
import { SceneArt } from "../components/WordPicture";
import { JOURNEY, LANGUAGES, PATHWAYS, nextJourneyStep, stepDone } from "../content/curriculum";
import { useCurriculumSnap } from "./Curriculum";

/** The 20-step construction journey from the student-journey chart. */
export function PathPage() {
  const snap = useCurriculumSnap();
  const now = nextJourneyStep(snap);
  const language = LANGUAGES.find((item) => item.id === snap.language);
  const pathway = PATHWAYS.find((item) => item.id === snap.pathway);

  return (
    <div className="stack">
      <p className="kicker">Purpose Academy · Construction stream</p>
      <h2>The 20-step student journey</h2>
      <p>One platform. Three pathways. You see the thing, name it in your language, then meet the same idea in English.</p>
      <article className="panel stack path-now">
        {hasPhoto(now.id) ? <ObjectPhoto id={now.id} /> : <SceneArt id={now.id} />}
        <p className="kicker">Step {now.n} of 20</p>
        <h3>{now.title}</h3>
        <p>{now.summary}</p>
        <Link className="btn btn-primary" to={now.href}>
          {now.action}
        </Link>
      </article>
      <ol className="path-list">
        {JOURNEY.map((step) => (
          <li key={step.id} className={stepDone(step, snap) ? "done" : step.id === now.id ? "now" : undefined}>
            <Link to={step.href}>
              {hasPhoto(step.id) ? <ObjectPhoto id={step.id} compact /> : <SceneArt id={step.id} compact />}
              <span>{step.n}</span>
              <strong>{step.title}</strong>
            </Link>
          </li>
        ))}
      </ol>
      <p>
        {language ? `Your language is ${language.name}. It stays beside the picture until the English is yours.` : "Choose a language so the meaning arrives before the English."}
        {pathway ? ` ${pathway.title} is the work you chose.` : ""}
      </p>
      <p className="faint">Step 8 is homework beside the class. The hands-on practice happens with your instructor.</p>
    </div>
  );
}
