import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BASELINE,
  COMPUTER_TASKS,
  COURSE_UNITS,
  ENGLISH_WORDS,
  EXAM,
  JOURNEY,
  LANGUAGES,
  PATHWAYS,
  SENTENCES,
  SUPPORTED_WORDS,
  journeyDoneCount,
  nextJourneyStep,
  progressBands,
  resumeLines,
  stepDone,
  type CurriculumSnapshot,
  type LanguageId,
  type PathwayId,
} from "../content/curriculum";
import { DISCLAIMER } from "../content/framework";
import { useContent } from "../state/content";
import { useProgress } from "../state/progress";

export function useCurriculumSnap(): CurriculumSnapshot {
  const { state } = useProgress();
  const { modules } = useContent();
  return useMemo(() => {
    const curriculum = state.curriculum;
    return {
      onboarded: state.onboarded,
      pathway: curriculum.pathway,
      language: curriculum.language,
      baseline: curriculum.baseline,
      vocab: curriculum.vocab,
      sentences: curriculum.sentences,
      computer: curriculum.computer,
      units: curriculum.units,
      logs: curriculum.logs.length,
      exam: curriculum.exam,
      modulesCompleted: modules.filter((item) => state.modules[item.id]?.completed).map((item) => item.id),
      modulesStarted: modules
        .filter((item) => (state.modules[item.id]?.blockDone.length ?? 0) > 0 || state.modules[item.id]?.completed)
        .map((item) => item.id),
    };
  }, [state, modules]);
}

function speak(text: string, lang: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export function PathwayCards({ current }: { current: PathwayId | null }) {
  const { setPathway } = useProgress();
  return (
    <div className="grid-2" id="pathways">
      {PATHWAYS.map((pathway) => (
        <button
          key={pathway.id}
          type="button"
          className={current === pathway.id ? "select-card on" : "select-card"}
          onClick={() => setPathway(pathway.id)}
        >
          <strong>{pathway.title}</strong>
          <small>{pathway.motto}</small>
          <small>{pathway.delivered ? "This application teaches this stream." : "Same start. Course units are the next stream."}</small>
        </button>
      ))}
    </div>
  );
}

export function ProgressBands({ snap }: { snap: CurriculumSnapshot }) {
  const bands = progressBands(snap);
  return (
    <div className="stack">
      {bands.map((band) => (
        <div key={band.id} className="score-line">
          <span>{band.label}</span>
          <div className="bar" aria-hidden>
            <span style={{ width: `${band.pct}%` }} />
          </div>
          <span>{band.pct}%</span>
        </div>
      ))}
    </div>
  );
}

export function JourneyPage() {
  const snap = useCurriculumSnap();
  const next = nextJourneyStep(snap);
  const done = journeyDoneCount(snap);
  const pathway = PATHWAYS.find((item) => item.id === snap.pathway);
  return (
    <div className="stack">
      <p className="kicker">Purpose Academy</p>
      <h2>The 20-step student journey</h2>
      <p>
        One platform. Three pathways. Real opportunities start with skills you can name. This application delivers the construction stream and the shared start every pathway uses.
      </p>
      <p className="muted">
        {done} of {JOURNEY.length} steps recorded on this device.
        {pathway ? ` Pathway: ${pathway.title}.` : " Choose a pathway to record interest."} Next: {next.title}.
      </p>
      <p className="faint">Learn · Practice · Improve · Achieve</p>
      <ProgressBands snap={snap} />
      <h3>Three pathways</h3>
      <PathwayCards current={snap.pathway} />
      {PATHWAYS.map((item) => (
        <p key={item.id}>
          <strong>{item.title}.</strong> {item.body}
        </p>
      ))}
      <h3>Construction stream</h3>
      <ol className="journey-list">
        {JOURNEY.map((step) => {
          const complete = stepDone(step, snap);
          return (
            <li key={step.id} className={complete ? "journey-step done" : "journey-step"}>
              <p className="kicker">
                Step {step.n} · {complete ? "Done" : "Open"}
              </p>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
              <Link className="btn btn-primary" to={step.href}>
                {step.action}
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="disclaimer">{DISCLAIMER}</p>
    </div>
  );
}

export function BaselinePage() {
  const { state, markCurriculum } = useProgress();
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("");
  const item = BASELINE[index];
  const finished = state.curriculum.baseline.length >= BASELINE.length;
  if (!item || finished) {
    return (
      <div className="stack">
        <p className="kicker">Step 3 · Baseline</p>
        <h2>Baseline recorded</h2>
        <p>You named the hard hat, the hammer, and the ladder. That is a first look at safety awareness, not a placement test for a job.</p>
        <Link className="btn btn-primary" to="/vocabulary">
          Continue to language
        </Link>
      </div>
    );
  }
  return (
    <div className="stack">
      <p className="kicker">Step 3 · Baseline · {index + 1} of {BASELINE.length}</p>
      <h2>What is this?</h2>
      <p>{item.prompt}</p>
      {item.options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="choice"
          onClick={() => {
            setNote(item.why);
            if (option.correct) markCurriculum("baseline", item.id);
          }}
        >
          {option.label}
        </button>
      ))}
      {note && <p>{note}</p>}
      {state.curriculum.baseline.includes(item.id) && index < BASELINE.length - 1 && (
        <button type="button" className="btn btn-primary" onClick={() => { setIndex((value) => value + 1); setNote(""); }}>
          Next
        </button>
      )}
    </div>
  );
}

export function VocabularyPage() {
  const { state, setLanguage, markVocab, markCurriculum } = useProgress();
  const [params] = useSearchParams();
  const stage = params.get("stage") ?? "visual";
  const language = LANGUAGES.find((item) => item.id === state.curriculum.language) ?? null;
  const [cursor, setCursor] = useState(0);
  const [picked, setPicked] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    setCursor(0);
    setPicked("");
    setNote("");
  }, [stage]);

  const words = stage === "english" ? ENGLISH_WORDS : SUPPORTED_WORDS;
  const word = words[cursor];

  return (
    <div className="stack">
      <p className="kicker">Steps 6–10 · Workplace language</p>
      <h2>Vocabulary</h2>
      <p>
        Early units show English beside your supplementary language. See it, listen to the English, and say the meaning. The words follow bilingual dictionary headwords. Your instructor confirms the word your crew uses.
      </p>
      <label className="field">
        Supplementary language
        <select
          value={state.curriculum.language ?? ""}
          onChange={(event) => setLanguage(event.target.value as LanguageId)}
        >
          <option value="" disabled>
            Choose one
          </option>
          {LANGUAGES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <div className="row">
        <Link className={stage === "visual" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=visual">
          Visual
        </Link>
        <Link className={stage === "supported" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=supported">
          Supported
        </Link>
        <Link className={stage === "english" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=english">
          English only
        </Link>
        <Link className={stage === "sentences" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=sentences">
          Sentences
        </Link>
      </div>
      {stage !== "sentences" && word && (
        <article className="panel stack">
          <p className="kicker">
            {stage === "english" ? `Unit ${word.unit} of 11` : `Assignment ${word.unit} of 10`}
          </p>
          {stage !== "english" && language && word.gloss[language.id].word && (
            <p className="vocab-gloss" dir={language.dir} lang={language.speech}>
              {word.gloss[language.id].word}
              {word.gloss[language.id].read ? <span className="faint"> {word.gloss[language.id].read}</span> : null}
            </p>
          )}
          {stage === "visual" && (
            <>
              <h3>{word.en}</h3>
              <p>{word.meaning}</p>
              <div className="row">
                <button type="button" className="btn btn-ghost" onClick={() => speak(word.en, "en-CA")}>
                  Listen
                </button>
                <button type="button" className="btn btn-primary" onClick={() => markVocab(word.id, "visual")}>
                  {state.curriculum.vocab[word.id]?.visual ? "Seen" : "I can say this"}
                </button>
              </div>
            </>
          )}
          {stage !== "visual" && (
            <>
              <p>{word.meaning}</p>
              <p>Which English word is this?</p>
              {choiceOptions(word.en, words.map((item) => item.en), word.unit).map((label) => (
                <button
                  key={label}
                  type="button"
                  className="choice"
                  onClick={() => {
                    const correct = label === word.en;
                    setPicked(label);
                    setNote(correct ? `${word.en}. ${word.meaning}` : "Look at the meaning again, then choose the English word.");
                    if (correct) markVocab(word.id, stage === "supported" ? "supported" : "english");
                  }}
                >
                  {label}
                </button>
              ))}
              {note && <p>{note}</p>}
            </>
          )}
          <div className="row">
            {cursor > 0 && (
              <button type="button" className="btn btn-ghost" onClick={() => { setCursor((value) => value - 1); setNote(""); setPicked(""); }}>
                Previous
              </button>
            )}
            {cursor < words.length - 1 && (stage === "visual" ? state.curriculum.vocab[word.id]?.visual : picked === word.en) && (
              <button type="button" className="btn btn-primary" onClick={() => { setCursor((value) => value + 1); setNote(""); setPicked(""); }}>
                Next unit
              </button>
            )}
          </div>
        </article>
      )}
      {stage === "sentences" && <SentencePractice onMark={(id) => markCurriculum("sentences", id)} done={state.curriculum.sentences} />}
      <Link to="/journey">Back to the journey</Link>
    </div>
  );
}

function choiceOptions(answer: string, pool: string[], unit: number) {
  const others = pool.filter((item) => item !== answer);
  const first = others[unit % others.length];
  const second = others[(unit + 4) % others.length];
  const trio = [first, second, answer];
  const shift = unit % 3;
  return [...trio.slice(shift), ...trio.slice(0, shift)];
}

function SentencePractice({ onMark, done }: { onMark: (id: string) => void; done: string[] }) {
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("");
  const item = SENTENCES[index];
  if (!item || done.length >= SENTENCES.length) {
    return (
      <article className="panel stack">
        <h3>Sentences recorded</h3>
        <p>You used the words in a workplace sentence. The next instruction is on the yard, not on a flashcard.</p>
        <Link className="btn btn-primary" to="/training/orientation">
          Open workplace instructions
        </Link>
      </article>
    );
  }
  return (
    <article className="panel stack">
      <p className="kicker">Sentence {index + 1} of {SENTENCES.length}</p>
      <h3>{item.prompt}</h3>
      {item.options.map((option) => (
        <button
          key={option}
          type="button"
          className="choice"
          onClick={() => {
            const correct = option === item.answer;
            setNote(correct ? `This sentence uses “${item.answer}”.` : "The blank is the tool or the gear the sentence is about.");
            if (correct) onMark(item.id);
          }}
        >
          {option}
        </button>
      ))}
      {note && <p>{note}</p>}
      {done.includes(item.id) && index < SENTENCES.length - 1 && (
        <button type="button" className="btn btn-primary" onClick={() => { setIndex((value) => value + 1); setNote(""); }}>
          Next sentence
        </button>
      )}
    </article>
  );
}

export function ComputerPage() {
  const { state, markCurriculum } = useProgress();
  const done = new Set(state.curriculum.computer);
  const [typed, setTyped] = useState("");
  const [fileName, setFileName] = useState("");
  const [mail, setMail] = useState({ to: "", subject: "", body: "" });
  const [note, setNote] = useState("");
  return (
    <div className="stack">
      <p className="kicker">Step 12 · Basic computer skills</p>
      <h2>Five skills for this program</h2>
      <p>You are already in a browser. These five are the computer skills the journey asks for. Finishing them does not make you the site’s computer person.</p>
      <article className="panel stack">
        <h3>1. {COMPUTER_TASKS[0].title}</h3>
        <p>{COMPUTER_TASKS[0].body}</p>
        <p>Click the tool the supervisor asked you to bring.</p>
        {["Saw", "Tape measure", "Level"].map((label) => (
          <button
            key={label}
            type="button"
            className="choice"
            onClick={() => {
              if (label === "Tape measure") {
                markCurriculum("computer", "mouse");
                setNote("You pointed at the tape measure.");
              } else setNote("The instruction was the tape measure. Point at that one.");
            }}
          >
            {label}
          </button>
        ))}
      </article>
      <article className="panel stack">
        <h3>2. {COMPUTER_TASKS[1].title}</h3>
        <p>{COMPUTER_TASKS[1].body} Type: Bring the tape measure.</p>
        <label className="field">
          Instruction
          <input value={typed} onChange={(event) => setTyped(event.target.value)} />
        </label>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (typed.trim().toLowerCase() === "bring the tape measure.") {
              markCurriculum("computer", "type");
              setNote("The instruction is typed.");
            } else setNote("Match the sentence, including the period: Bring the tape measure.");
          }}
        >
          Check the typing
        </button>
      </article>
      <article className="panel stack">
        <h3>3. {COMPUTER_TASKS[2].title}</h3>
        <p>{COMPUTER_TASKS[2].body}</p>
        <label className="field">
          File name
          <input value={fileName} onChange={(event) => setFileName(event.target.value)} placeholder="daily-log.txt" />
        </label>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (fileName.trim().toLowerCase().endsWith(".txt") && fileName.trim().length > 4) {
              markCurriculum("computer", "save");
              setNote("That name can be found later. On this device the log is saved in the browser.");
            } else setNote("Give it a name that ends in .txt, such as daily-log.txt.");
          }}
        >
          Save the name
        </button>
      </article>
      <article className="panel stack">
        <h3>4. {COMPUTER_TASKS[3].title}</h3>
        <p>{COMPUTER_TASKS[3].body}</p>
        <button type="button" className="choice" onClick={() => setNote("A prize link is not the lesson. Open the training page.")}>
          Claim a free gift card
        </button>
        <button
          type="button"
          className="choice"
          onClick={() => {
            markCurriculum("computer", "internet");
            setNote("That is the training page you were sent.");
          }}
        >
          Open the Purpose Academy training page
        </button>
      </article>
      <article className="panel stack">
        <h3>5. {COMPUTER_TASKS[4].title}</h3>
        <p>{COMPUTER_TASKS[4].body}</p>
        <label className="field">
          To
          <input value={mail.to} onChange={(event) => setMail({ ...mail, to: event.target.value })} />
        </label>
        <label className="field">
          Subject
          <input value={mail.subject} onChange={(event) => setMail({ ...mail, subject: event.target.value })} />
        </label>
        <label className="field">
          Message
          <textarea value={mail.body} onChange={(event) => setMail({ ...mail, body: event.target.value })} />
        </label>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const secret = /password/i.test(mail.body);
            if (mail.to.trim() && mail.subject.trim() && mail.body.trim() && !secret) {
              markCurriculum("computer", "email");
              setNote("To and subject are filled, and the message does not carry a password. This practice message stays on this page.");
            } else if (secret) setNote("Take the password out of the message.");
            else setNote("Fill To, Subject, and a short message.");
          }}
        >
          Check the message
        </button>
      </article>
      {note && <p role="status">{note}</p>}
      <p>
        Recorded: {done.size} of {COMPUTER_TASKS.length}.
      </p>
      <Link to="/journey">Back to the journey</Link>
    </div>
  );
}

export function CoursePage() {
  const { state, markCurriculum } = useProgress();
  const units = new Set(state.curriculum.units);
  return (
    <div className="stack">
      <p className="kicker">Construction course</p>
      <h2>Tools, materials, and systems</h2>
      <p>
        The program chart lists the same units for a course: identify materials, identify hand tools, identify power tools, safety, exterior work, interior finish, actual practice, assignments, and an exam. Logistics and Community Support will use this shape. This page is the construction version.
      </p>
      {COURSE_UNITS.map((unit) => (
        <article key={unit.id} className="panel stack">
          <p className="kicker">{units.has(unit.id) ? "Recorded" : "Open"} · {unit.chart}</p>
          <h3>{unit.title}</h3>
          <p>{unit.body}</p>
          {unit.href && (
            <Link className="btn btn-ghost" to={unit.href}>
              {unit.linkLabel}
            </Link>
          )}
          {unit.id === "materials" && <UnitCheck id="materials" prompt="Wet cement is on your skin. What do you do?" ok="Wash it off and stop." bad="Wipe it on your pants and keep going." mark={markCurriculum} done={units.has("materials")} />}
          {unit.id === "hand-tools" && <UnitCheck id="hand-tools" prompt="Someone uses a wrench as a hammer." ok="Stop. Get the hammer. A wrench is not a hammer." bad="It still hits. Keep going." mark={markCurriculum} done={units.has("hand-tools")} />}
          {unit.id === "power-tools" && <UnitCheck id="power-tools" prompt="A powder-actuated tool is on the bench. You have not been authorized." ok="Leave it. It is not an ordinary drill." bad="It makes holes. Use it carefully." mark={markCurriculum} done={units.has("power-tools")} />}
          {unit.id === "exterior" && <UnitCheck id="exterior" prompt="The roof edge has no barricade." ok="Stop the approach and report the edge." bad="Walk it. You can see the edge." mark={markCurriculum} done={units.has("exterior")} />}
          {unit.id === "interior" && <UnitCheck id="interior" prompt="Sanding dust is moving into a finished room." ok="Stop and control the dust before more sanding." bad="Blow it into the hall." mark={markCurriculum} done={units.has("interior")} />}
          {unit.id === "safety" && (
            <button type="button" className="btn btn-primary" onClick={() => markCurriculum("units", "safety")}>
              {units.has("safety") ? "Safety unit recorded" : "I know safety sits inside the modules"}
            </button>
          )}
          {unit.id === "practice" && (
            <button type="button" className="btn btn-primary" onClick={() => markCurriculum("units", "practice")}>
              {units.has("practice") ? "Practice unit recorded" : "I know practice here is not instructor sign-off"}
            </button>
          )}
          {unit.id === "assignments" && (
            <button type="button" className="btn btn-primary" onClick={() => markCurriculum("units", "assignments")}>
              {units.has("assignments") ? "Assignments unit recorded" : "I know units 1–10 are the vocabulary assignments"}
            </button>
          )}
        </article>
      ))}
      <Link to="/journey">Back to the journey</Link>
    </div>
  );
}

function UnitCheck({
  id,
  prompt,
  ok,
  bad,
  mark,
  done,
}: {
  id: string;
  prompt: string;
  ok: string;
  bad: string;
  mark: (bucket: "units", id: string) => void;
  done: boolean;
}) {
  const [note, setNote] = useState("");
  return (
    <div className="stack">
      <p>{prompt}</p>
      <button
        type="button"
        className="choice"
        onClick={() => {
          mark("units", id);
          setNote(ok);
        }}
      >
        {ok}
      </button>
      <button type="button" className="choice" onClick={() => setNote("That keeps the hazard in the work. Choose the stop.")}>
        {bad}
      </button>
      {(note || done) && <p>{note || "Recorded."}</p>}
    </div>
  );
}

export function ExamPage() {
  const { state, markCurriculum } = useProgress();
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("");
  const item = EXAM[index];
  const finished = state.curriculum.exam.length >= EXAM.length;
  if (!item || finished) {
    return (
      <div className="stack">
        <p className="kicker">Step 18 · Final assessment</p>
        <h2>Exam recorded</h2>
        <p>This was the program exam for language, tools, and one safety decision. It is not a provincial certificate.</p>
        <Link className="btn btn-primary" to="/record">
          Open the skills passport
        </Link>
      </div>
    );
  }
  return (
    <div className="stack">
      <p className="kicker">Step 18 · {index + 1} of {EXAM.length}</p>
      <h2>Final assessment</h2>
      <p>{item.prompt}</p>
      {item.options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="choice"
          onClick={() => {
            setNote(option.feedback);
            if (option.correct) markCurriculum("exam", item.id);
          }}
        >
          {option.label}
        </button>
      ))}
      {note && <p>{note}</p>}
      {state.curriculum.exam.includes(item.id) && index < EXAM.length - 1 && (
        <button type="button" className="btn btn-primary" onClick={() => { setIndex((value) => value + 1); setNote(""); }}>
          Next question
        </button>
      )}
    </div>
  );
}

export function SiteLogPage() {
  const { state, addSiteLog } = useProgress();
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  return (
    <div className="stack">
      <p className="kicker">Step 17 · On-site training</p>
      <h2>Practice-yard log</h2>
      <p>Write the task and what you would tell a supervisor. This log stays on this device. It is not the employer’s timesheet, and it is not a supervisor’s signature.</p>
      <label className="field">
        Task
        <input value={task} onChange={(event) => setTask(event.target.value)} />
      </label>
      <label className="field">
        What the supervisor should know
        <textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          if (!task.trim() || !note.trim()) return;
          addSiteLog(task.trim(), note.trim());
          setTask("");
          setNote("");
        }}
      >
        Save the log
      </button>
      {state.curriculum.logs.map((entry) => (
        <article key={entry.at} className="panel">
          <p className="kicker">{new Date(entry.at).toLocaleString("en-CA")}</p>
          <p>
            <strong>{entry.task}</strong>
          </p>
          <p>{entry.note}</p>
        </article>
      ))}
      <Link to="/journey">Back to the journey</Link>
    </div>
  );
}

export function EmploymentPage() {
  const snap = useCurriculumSnap();
  const { markCurriculum, state } = useProgress();
  const lines = resumeLines(snap);
  return (
    <div className="stack">
      <p className="kicker">Step 20 · Employment connection</p>
      <h2>From training to a skills list</h2>
      <p>
        Employer matching, job placement, and the 30-, 90-, and 180-day follow-up are done with program staff. This page turns what you finished into lines you can say. It does not offer you a job.
      </p>
      <article className="panel stack">
        <h3>Lines you can use</h3>
        <ul>
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <button type="button" className="btn btn-primary" onClick={() => markCurriculum("units", "employment")}>
          {state.curriculum.units.includes("employment") ? "Saved to this journey" : "Save this step on the journey"}
        </button>
      </article>
      <Link to="/record">Open the skills passport</Link>
    </div>
  );
}

export function InstructorPage() {
  const snap = useCurriculumSnap();
  const { state } = useProgress();
  const bands = progressBands(snap);
  const weak = bands.filter((band) => band.id !== "overall" && band.pct < 70);
  return (
    <div className="stack">
      <p className="kicker">Instructor</p>
      <h2>Support, guide, verify</h2>
      <p>
        This is the instructor reading of the learner on this device: progress, gaps, the practice log, and what is not yet verified in person. A class list of many students is the admin desk. Hands-on verification is still a person’s signature, not a button here.
      </p>
      <ProgressBands snap={snap} />
      <h3>Learning gaps</h3>
      {weak.length === 0 && <p>No band is under 70% yet, or the record is still empty. Empty is a gap.</p>}
      {weak.map((band) => (
        <p key={band.id}>
          {band.label} is at {band.pct}%. That is the place to practise again.
        </p>
      ))}
      <h3>On-site log</h3>
      {state.curriculum.logs.length === 0 && <p>No practice-yard log yet.</p>}
      {state.curriculum.logs.map((entry) => (
        <p key={entry.at}>
          <strong>{entry.task}.</strong> {entry.note}
        </p>
      ))}
      <div className="row">
        <Link className="btn btn-primary" to="/record">
          Recognition: skills passport
        </Link>
        <Link className="btn btn-ghost" to="/admin">
          Admin desk
        </Link>
      </div>
    </div>
  );
}
