import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ObjectPhoto, hasPhoto } from "../components/ObjectPhoto";
import { SceneArt, WordPicture } from "../components/WordPicture";
import {
  BASELINE,
  COMPUTER_TASKS,
  ENGLISH_WORDS,
  EXAM,
  EXTRA_WORDS,
  JOURNEY,
  LANGUAGES,
  PATHWAYS,
  SENTENCES,
  SUPPORTED_WORDS,
  VOCAB,
  journeyDoneCount,
  meaningIn,
  nextJourneyStep,
  progressBands,
  resumeLines,
  stepDone,
  type CurriculumSnapshot,
  type PathwayId,
  type VocabWord,
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
      <SceneArt id="work" />
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
      <ObjectPhoto id={item.id === "hat" ? "hardhat" : item.id} />
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
  const { state, setLanguage, markVocab, markCurriculum, noteWord } = useProgress();
  const [params] = useSearchParams();
  const stage = params.get("stage") ?? "visual";
  const language = LANGUAGES.find((item) => item.id === state.curriculum.language) ?? null;
  const [cursor, setCursor] = useState(0);
  const [focus, setFocus] = useState<string | null>(null);
  const [hold, setHold] = useState<string | null>(null);
  const [note, setNote] = useState("");
  useEffect(() => {
    setCursor(0);
    setFocus(null);
    setHold(null);
    setNote("");
  }, [stage]);

  const mark = stage === "english" ? "english" : stage === "supported" ? "supported" : "visual";
  const pool = stage === "english" ? ENGLISH_WORDS : SUPPORTED_WORDS;
  const waiting = pool
    .filter((item) => item.id === hold || (!state.curriculum.known.includes(item.id) && !state.curriculum.vocab[item.id]?.[mark]))
    .sort((a, b) => Number(state.curriculum.hard.includes(b.id)) - Number(state.curriculum.hard.includes(a.id)));
  const again = EXTRA_WORDS.filter((item) => state.curriculum.hard.includes(item.id) && !state.curriculum.known.includes(item.id));
  const focused = focus ? VOCAB.filter((item) => item.id === focus) : [];
  const deck = focused.length ? focused : [...again, ...waiting];
  const word = deck[Math.min(cursor, Math.max(deck.length - 1, 0))];
  const showOwnLanguage = stage === "visual" || stage === "supported";

  return (
    <div className="stack">
      <p className="kicker">{stageTitle(stage)}</p>
      <h2>{stageHeading(stage)}</h2>
      <p>{stageLine(stage)}</p>
      {showOwnLanguage && !language && (
        <div className="stack">
          <p>Which language do you think in?</p>
          <div className="row">
            {LANGUAGES.map((item) => (
              <button key={item.id} type="button" className="btn btn-ghost" onClick={() => setLanguage(item.id)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {showOwnLanguage && language && <p>Your language on this page: {language.name}.</p>}
      <div className="row">
        <Link className={stage === "visual" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=visual">
          See it
        </Link>
        <Link className={stage === "supported" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=supported">
          Homework
        </Link>
        <Link className={stage === "english" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=english">
          English only
        </Link>
        <Link className={stage === "sentences" ? "btn btn-primary" : "btn btn-ghost"} to="/vocabulary?stage=sentences">
          A sentence
        </Link>
      </div>
      {stage !== "sentences" && word && (stage === "english" || language) && (
        <WordBridge
          word={word}
          stage={stage}
          language={language}
          hard={state.curriculum.hard.includes(word.id)}
          note={note}
          onListen={() => listen(word, language, stage !== "english")}
          onUnderstand={() => {
            markVocab(word.id, mark === "english" ? "visual" : mark);
            setFocus(null);
            setNote("");
          }}
          onKnown={() => {
            noteWord(word.id, "known");
            setFocus(null);
            setNote("");
          }}
          onAgain={() => {
            noteWord(word.id, "again");
            setNote("We will show this picture again.");
            listen(word, language, true);
          }}
          onPick={(correct) => {
            if (correct) {
              markVocab(word.id, stage === "supported" ? "supported" : "english");
              setHold(word.id);
              setNote(stage === "supported" ? `${word.en}. That match is homework. The practice stays in class with your instructor.` : `${word.en}. ${word.meaning}`);
            } else {
              noteWord(word.id, "hard");
              setNote("Look at the picture again. Then choose the English word.");
            }
          }}
          onContinue={() => {
            setHold(null);
            setFocus(null);
            setNote("");
          }}
          held={hold === word.id}
        />
      )}
      {stage !== "sentences" && deck.length === 0 && (
        <article className="panel stack">
          <h3>You know these words.</h3>
          <p>The next step uses them in English, then in a short sentence.</p>
          <Link className="btn btn-primary" to={stage === "english" ? "/vocabulary?stage=sentences" : stage === "supported" ? "/vocabulary?stage=english" : "/vocabulary?stage=supported"}>
            Continue
          </Link>
        </article>
      )}
      {stage === "visual" && language && (
        <div className="stack">
          <h3>Wall words, when you need them</h3>
          <p>Open one of these when the first words are easy and the wall is not.</p>
          <div className="row">
            {EXTRA_WORDS.map((item) => (
              <button key={item.id} type="button" className="btn btn-ghost" onClick={() => { setFocus(item.id); setCursor(0); setNote(""); }}>
                {item.en}
              </button>
            ))}
          </div>
        </div>
      )}
      {stage === "sentences" && <SentencePractice onMark={(id) => markCurriculum("sentences", id)} done={state.curriculum.sentences} />}
      <Link to="/home">Back to your path</Link>
    </div>
  );
}

function stageTitle(stage: string) {
  if (stage === "supported") return "Step 8 · Homework";
  if (stage === "english") return "English only";
  if (stage === "sentences") return "A short sentence";
  return "See it";
}

function stageHeading(stage: string) {
  if (stage === "supported") return "Match the word to the picture.";
  if (stage === "english") return "The English word stands alone.";
  if (stage === "sentences") return "Now a whole sentence.";
  return "Picture first.";
}

function stageLine(stage: string) {
  if (stage === "supported") return "The practice is in class, with your instructor. These units are the homework beside that class.";
  if (stage === "english") return "Your language steps back. The picture stays, so the idea is still there.";
  if (stage === "sentences") return "One blank. One word you already know.";
  return "Read the meaning in your language. Then look at the English name for the same thing.";
}

function listen(word: VocabWord, language: (typeof LANGUAGES)[number] | null, withOwn: boolean) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const own = language && withOwn ? word.gloss[language.id].word : "";
  if (own && language) {
    const first = new SpeechSynthesisUtterance(own);
    first.lang = language.speech;
    const second = new SpeechSynthesisUtterance(word.en);
    second.lang = "en-CA";
    first.onend = () => window.speechSynthesis.speak(second);
    window.speechSynthesis.speak(first);
    return;
  }
  speak(word.en, "en-CA");
}

function WordBridge({
  word,
  stage,
  language,
  hard,
  note,
  onListen,
  onUnderstand,
  onKnown,
  onAgain,
  onPick,
  onContinue,
  held,
}: {
  word: VocabWord;
  stage: string;
  language: (typeof LANGUAGES)[number] | null;
  hard: boolean;
  note: string;
  onListen: () => void;
  onUnderstand: () => void;
  onKnown: () => void;
  onAgain: () => void;
  onPick: (correct: boolean) => void;
  onContinue: () => void;
  held: boolean;
}) {
  const own = language ? word.gloss[language.id] : null;
  const sense = meaningIn(word, language?.id ?? null);
  const choices = choiceOptions(word.en, ENGLISH_WORDS.map((item) => item.en), word.unit);
  return (
    <article className="panel stack word-card">
      <ObjectPhoto id={word.id} />
      {!hasPhoto(word.id) && <WordPicture id={word.id} />}
      {hard && <p className="kicker">You asked to see this again.</p>}
      {stage !== "english" && sense && (
        <p className="vocab-gloss" dir={language?.dir} lang={language?.speech}>
          {sense}
        </p>
      )}
      {stage !== "english" && own?.word && (
        <p dir={language?.dir} lang={language?.speech}>
          <span className="kicker">{language?.name}</span> {own.word}
          {own.read ? <span className="faint"> {own.read}</span> : null}
        </p>
      )}
      {stage === "visual" && <p className="kicker">English</p>}
      {stage === "visual" && <h3>{word.en}</h3>}
      {stage === "visual" && <p>{word.meaning}</p>}
      <button type="button" className="btn btn-ghost" onClick={onListen}>
        Listen
      </button>
      {stage === "visual" && (
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={onUnderstand}>
            I understand
          </button>
          <button type="button" className="btn btn-ghost" onClick={onKnown}>
            I already know this
          </button>
          <button type="button" className="btn btn-ghost" onClick={onAgain}>
            Show me again
          </button>
        </div>
      )}
      {(stage === "english" || stage === "supported") && !held && (
        <div className="stack">
          <p>{stage === "supported" ? "Match the word to the picture." : "Which English word is this?"}</p>
          {choices.map((label) => (
            <button key={label} type="button" className="choice" onClick={() => onPick(label === word.en)}>
              {label}
            </button>
          ))}
        </div>
      )}
      {note && <p role="status">{note}</p>}
      {held && (
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Next
        </button>
      )}
    </article>
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
        <p>You used the words in a short sentence. Next, follow an instruction.</p>
        <Link className="btn btn-primary" to="/training/orientation">
          Open workplace instructions
        </Link>
      </article>
    );
  }
  return (
    <article className="panel stack">
      <p className="kicker">Sentence {index + 1} of {SENTENCES.length}</p>
      <ObjectPhoto id={item.answer === "tape measure" ? "tape" : item.answer === "hard hat" ? "hardhat" : item.answer} />
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
      <SceneArt id="computer" />
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
      <Link to="/home">Back to your path</Link>
    </div>
  );
}

export function CoursePage() {
  const { state, markCurriculum } = useProgress();
  const units = new Set(state.curriculum.units);
  const safetyReady = units.has("safety") || Boolean(state.modules.ppe?.completed);
  return (
    <div className="stack">
      <p className="kicker">The work</p>
      <h2>Stay whole. Then learn the work.</h2>
      <p>Safety comes first. After that, each card is one idea: a picture in your mind, a short line, and a choice.</p>
      <p className="faint">Learned means you saw it here. Practised means you made the choice. Competent means an instructor watched you do it. This page cannot mark that.</p>
      <article className="panel stack">
        <h3>Safety</h3>
        <SceneArt id="safety" />
        <p>Hat, eyes, hands, feet. Know the hazard before you touch the tool.</p>
        <Link className="btn btn-primary" to="/training/ppe">Open safety</Link>
        <button type="button" className="btn btn-ghost" onClick={() => markCurriculum("units", "safety")}>
          {units.has("safety") ? "Safety is open" : "I have started safety"}
        </button>
        <StageLine learned={units.has("safety") || Boolean(state.modules.ppe?.completed)} practised={Boolean(state.modules.ppe?.completed)} />
      </article>
      <article className="panel stack">
        <h3>Measurement</h3>
        <ObjectPhoto id="tape" />
        <p>A tape measure marks a length. It does not cut.</p>
        <UnitCheck id="measurement" prompt="You need the length of a board. What do you use?" ok="The tape measure." bad="My hands. Close enough." mark={markCurriculum} done={units.has("measurement")} />
        <StageLine learned={units.has("measurement")} practised={units.has("measurement")} />
      </article>
      <article className="panel stack">
        <h3>Construction math</h3>
        <SceneArt id="math" />
        <p>The number on the tape is the number you trust. A guess is not a measurement.</p>
        <UnitCheck id="math" prompt="The space from one stud to the next is marked 16 inches. What do you do?" ok="Measure 16 inches with the tape." bad="Step it off with my boot." mark={markCurriculum} done={units.has("math")} />
        <StageLine learned={units.has("math")} practised={units.has("math")} />
      </article>
      <article className="panel stack">
        <h3>Materials</h3>
        <SceneArt id="materials" />
        <p>Wet cement stays on skin. It is not ordinary dirt.</p>
        <UnitCheck id="materials" prompt="Wet cement is on your skin. What do you do?" ok="Wash it off and stop." bad="Wipe it on your pants and keep going." mark={markCurriculum} done={units.has("materials")} />
        <StageLine learned={units.has("materials")} practised={units.has("materials")} />
      </article>
      <article className="panel stack">
        <h3>Hand tools</h3>
        <ObjectPhoto id="hammer" />
        <p>A hammer drives a nail. A wrench is not a hammer.</p>
        {safetyReady ? <Link className="btn btn-ghost" to="/training/tools?play=tools-types">See the kinds of tools</Link> : <p>Finish the safety card first. Then the tools open.</p>}
        <UnitCheck id="hand-tools" prompt="Someone uses a wrench as a hammer." ok="Stop. Get the hammer. A wrench is not a hammer." bad="It still hits. Keep going." mark={markCurriculum} done={units.has("hand-tools")} />
        <StageLine learned={units.has("hand-tools")} practised={Boolean(state.modules.tools?.completed)} />
      </article>
      <article className="panel stack">
        <h3>Power tools</h3>
        <ObjectPhoto id="drill" />
        <p>A drill makes a hole. A powder-actuated tool is not a drill. Leave it if you are not allowed to use it.</p>
        <UnitCheck id="power-tools" prompt="A powder-actuated tool is on the bench. You have not been authorized." ok="Leave it. It is not an ordinary drill." bad="It makes holes. Use it carefully." mark={markCurriculum} done={units.has("power-tools")} />
        <StageLine learned={units.has("power-tools")} practised={Boolean(state.modules.tools?.completed)} />
      </article>
      <article className="panel stack">
        <h3>Equipment</h3>
        <ObjectPhoto id="ladder" />
        <p>A ladder is for a short reach. A forklift and a crane are someone else’s machine.</p>
        {safetyReady ? <Link className="btn btn-ghost" to="/training/falls">See ladders and edges</Link> : <p>Finish the safety card first.</p>}
        <StageLine learned={Boolean(state.modules.falls?.blockDone?.length)} practised={Boolean(state.modules.falls?.completed)} />
      </article>
      <article className="panel stack">
        <h3>Framing</h3>
        <SceneArt id="framing" />
        <p>Studs stand in the wall. A header sits over a door or a window.</p>
        <Link className="btn btn-ghost" to="/vocabulary?stage=visual">See stud and header</Link>
        <StageLine learned={state.curriculum.vocab.stud?.visual || state.curriculum.vocab.header?.visual || false} practised={false} />
      </article>
      <article className="panel stack">
        <h3>Interior finish</h3>
        <SceneArt id="interior" />
        <p>Dust from sanding moves. Keep it where the work is.</p>
        <UnitCheck id="interior" prompt="Sanding dust is moving into a finished room." ok="Stop and control the dust before more sanding." bad="Blow it into the hall." mark={markCurriculum} done={units.has("interior")} />
        <StageLine learned={units.has("interior")} practised={units.has("interior")} />
      </article>
      <article className="panel stack">
        <h3>Exterior</h3>
        <SceneArt id="exterior" />
        <p>A roof edge with nothing across it is a place you do not walk.</p>
        <UnitCheck id="exterior" prompt="The roof edge has no barricade." ok="Stop the approach and report the edge." bad="Walk it. You can see the edge." mark={markCurriculum} done={units.has("exterior")} />
        <StageLine learned={units.has("exterior")} practised={units.has("exterior")} />
      </article>
      <article className="panel stack">
        <h3>Electrical</h3>
        <SceneArt id="electrical" />
        <p>An open panel is not your work unless you are the person allowed to touch it.</p>
        <UnitCheck id="electrical" prompt="You see an open electrical panel." ok="Stop. Tell the person who is allowed to work on it." bad="Close it yourself and keep going." mark={markCurriculum} done={units.has("electrical")} />
        <StageLine learned={units.has("electrical")} practised={units.has("electrical")} />
      </article>
      <article className="panel stack">
        <h3>Plumbing</h3>
        <SceneArt id="plumbing" />
        <p>An open pipe can run. You do not open it to see.</p>
        <UnitCheck id="plumbing" prompt="A pipe joint is open and you were not asked to work on it." ok="Leave it. Tell the person in charge." bad="Turn the valve and see what happens." mark={markCurriculum} done={units.has("plumbing")} />
        <StageLine learned={units.has("plumbing")} practised={units.has("plumbing")} />
      </article>
      <article className="panel stack">
        <h3>HVAC</h3>
        <SceneArt id="hvac" />
        <p>A heating or cooling unit is equipment. Looking is not servicing it.</p>
        <UnitCheck id="hvac" prompt="A unit is running and making a new noise." ok="Stop and tell the person in charge. Do not open the unit." bad="Take the cover off and look inside." mark={markCurriculum} done={units.has("hvac")} />
        <StageLine learned={units.has("hvac")} practised={units.has("hvac")} />
      </article>
      <Link to="/home">Back to your path</Link>
    </div>
  );
}

function StageLine({ learned, practised }: { learned: boolean; practised: boolean }) {
  return (
    <p className="faint">
      Learned: {learned ? "yes" : "not yet"}. Practised: {practised ? "yes" : "not yet"}. Competent: an instructor verifies this with you.
    </p>
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
      <SceneArt id="check" />
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
      <SceneArt id="site" />
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
      <Link to="/home">Back to your path</Link>
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
      <SceneArt id="job" />
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
      <h3>Words to see again</h3>
      {state.curriculum.hard.length === 0 && <p>No word has been marked for another look.</p>}
      {state.curriculum.hard.map((id) => (
        <p key={id}>{VOCAB.find((word) => word.id === id)?.en ?? id}</p>
      ))}
      <h3>Where to help</h3>
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
