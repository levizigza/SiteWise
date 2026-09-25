/**
 * Purpose Academy curriculum.
 * The student journey follows the 20-step construction poster.
 * The course list follows the program chart: materials, hand tools, power tools,
 * safety, exterior work, interior finish, practice, assignments, and an exam.
 * Logistics and Community Support are the other two pathways. This application
 * delivers the shared start and the construction stream.
 */

export type PathwayId = "construction" | "logistics" | "community";
export type LanguageId = "es" | "fr" | "ar" | "hi" | "am" | "ti";
export type VocabStage = "visual" | "supported" | "english";

export interface Pathway {
  id: PathwayId;
  title: string;
  motto: string;
  body: string;
  /** This build teaches the stream in full. */
  delivered: boolean;
}

export const PATHWAYS: Pathway[] = [
  {
    id: "construction",
    title: "Construction",
    motto: "Build skills. Build futures.",
    body: "The stream in this application. Workplace language, safety, tools, materials, and the construction systems you can practise here.",
    delivered: true,
  },
  {
    id: "logistics",
    title: "Logistics",
    motto: "Move people. Move opportunities.",
    body: "Movement of goods and people. The same start — registration, language, and work readiness — applies. The logistics course units are the next stream, not a second copy of the yard.",
    delivered: false,
  },
  {
    id: "community",
    title: "Community Support",
    motto: "Stronger people. Stronger communities.",
    body: "Community and social-service work, the stream the program chart calls social workers. The same start applies. Those course units are prepared as the next stream.",
    delivered: false,
  },
];

export interface SuppLanguage {
  id: LanguageId;
  name: string;
  /** BCP 47 tag for spoken early-learning support. */
  speech: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: SuppLanguage[] = [
  { id: "es", name: "Spanish", speech: "es-MX", dir: "ltr" },
  { id: "fr", name: "French", speech: "fr-CA", dir: "ltr" },
  { id: "ar", name: "Arabic", speech: "ar", dir: "rtl" },
  { id: "hi", name: "Hindi", speech: "hi-IN", dir: "ltr" },
  { id: "am", name: "Amharic", speech: "am-ET", dir: "ltr" },
  { id: "ti", name: "Tigrinya", speech: "ti-ER", dir: "ltr" },
];

export interface Gloss {
  word: string;
  read?: string;
}

export interface VocabWord {
  id: string;
  unit: number;
  en: string;
  meaning: string;
  /** Unit 11 is English-only, matching the poster. */
  englishOnly?: boolean;
  /** Shown when a learner needs more help. Not required to finish the first ten. */
  extra?: boolean;
  gloss: Record<LanguageId, Gloss>;
}

export const VOCAB: VocabWord[] = [
  {
    id: "hammer",
    unit: 1,
    en: "Hammer",
    meaning: "A tool used to drive or remove nails.",
    gloss: {
      es: { word: "Martillo" },
      fr: { word: "Marteau" },
      ar: { word: "مطرقة", read: "mitraqa" },
      hi: { word: "हथौड़ा", read: "hathoda" },
      am: { word: "መዶሻ", read: "medosha" },
      ti: { word: "ማርተሎ", read: "martelo" },
    },
  },
  {
    id: "saw",
    unit: 2,
    en: "Saw",
    meaning: "A tool that cuts wood or other material. The guard stays on.",
    gloss: {
      es: { word: "Sierra" },
      fr: { word: "Scie" },
      ar: { word: "منشار", read: "minshar" },
      hi: { word: "आरा", read: "aara" },
      am: { word: "መጋዝ", read: "megazi" },
      ti: { word: "መጋዝ", read: "megaz" },
    },
  },
  {
    id: "tape",
    unit: 3,
    en: "Tape measure",
    meaning: "A tool that marks a length. It does not cut.",
    gloss: {
      es: { word: "Cinta métrica" },
      fr: { word: "Mètre à ruban" },
      ar: { word: "شريط قياس", read: "sharit qiyas" },
      hi: { word: "नापने का टेप", read: "napne ka tep" },
      am: { word: "የመለኪያ ቴፕ", read: "yemelekia tep" },
      ti: { word: "ቴፕ መለክዒ", read: "tep melek'i" },
    },
  },
  {
    id: "drill",
    unit: 4,
    en: "Drill",
    meaning: "A power tool that makes a hole. The cord or battery is part of the check.",
    gloss: {
      es: { word: "Taladro" },
      fr: { word: "Perceuse" },
      ar: { word: "مثقاب", read: "mithqab" },
      hi: { word: "ड्रिल", read: "dril" },
      am: { word: "መሰርሰሪያ", read: "meserseriya" },
      ti: { word: "ድሪል", read: "dril" },
    },
  },
  {
    id: "level",
    unit: 5,
    en: "Level",
    meaning: "A layout tool that shows whether something is flat or plumb.",
    gloss: {
      es: { word: "Nivel" },
      fr: { word: "Niveau" },
      ar: { word: "ميزان", read: "mizan" },
      hi: { word: "लेवल", read: "leval" },
      am: { word: "ሌቨል", read: "level" },
      ti: { word: "ሌቨል", read: "level" },
    },
  },
  {
    id: "hardhat",
    unit: 6,
    en: "Hard hat",
    meaning: "Head protection worn in the work area.",
    gloss: {
      es: { word: "Casco" },
      fr: { word: "Casque de sécurité" },
      ar: { word: "خوذة", read: "khudha" },
      hi: { word: "हेलमेट", read: "helmet" },
      am: { word: "የራስ ቁር", read: "yeras qur" },
      ti: { word: "ቁቡዕ ደሕንነት", read: "qubu' dihninet" },
    },
  },
  {
    id: "ladder",
    unit: 7,
    en: "Ladder",
    meaning: "Access equipment for a short reach. It is not a scaffold.",
    gloss: {
      es: { word: "Escalera" },
      fr: { word: "Échelle" },
      ar: { word: "سُلَّم", read: "sullam" },
      hi: { word: "सीढ़ी", read: "seedhi" },
      am: { word: "መሰላል", read: "meselal" },
      ti: { word: "ኣስካላ", read: "askala" },
    },
  },
  {
    id: "nail",
    unit: 8,
    en: "Nail",
    meaning: "A fastener driven with a hammer. The right fastener matches the material.",
    gloss: {
      es: { word: "Clavo" },
      fr: { word: "Clou" },
      ar: { word: "مسمار", read: "mismaar" },
      hi: { word: "कील", read: "keel" },
      am: { word: "ሚስማር", read: "mismarr" },
      ti: { word: "ምስማር", read: "mismarr" },
    },
  },
  {
    id: "gloves",
    unit: 9,
    en: "Gloves",
    meaning: "Hand protection matched to the task. Cotton is not a chemical glove.",
    gloss: {
      es: { word: "Guantes" },
      fr: { word: "Gants" },
      ar: { word: "قفازات", read: "quffazat" },
      hi: { word: "दस्ताने", read: "dastane" },
      am: { word: "ጓንት", read: "gwant" },
      ti: { word: "ግዋንቲ", read: "giwanti" },
    },
  },
  {
    id: "glasses",
    unit: 10,
    en: "Safety glasses",
    meaning: "Eye protection for chips and dust. Street sunglasses are not a substitute.",
    gloss: {
      es: { word: "Gafas protectoras" },
      fr: { word: "Lunettes de sécurité" },
      ar: { word: "نظارات واقية", read: "nazzarat waqiya" },
      hi: { word: "सुरक्षा चश्मा", read: "suraksha chashma" },
      am: { word: "መከላከያ መነፅር", read: "mekelakeya menetsir" },
      ti: { word: "መነጸር", read: "menetser" },
    },
  },
  {
    id: "stud",
    unit: 12,
    en: "Stud",
    meaning: "The upright piece of wood inside a wall.",
    extra: true,
    gloss: {
      es: { word: "Montante" },
      fr: { word: "Montant" },
      ar: { word: "قائم", read: "qa'im" },
      hi: { word: "स्टड", read: "stad" },
      am: { word: "ስታድ", read: "stad" },
      ti: { word: "ስታድ", read: "stad" },
    },
  },
  {
    id: "header",
    unit: 13,
    en: "Header",
    meaning: "The piece above a door or a window.",
    extra: true,
    gloss: {
      es: { word: "Cargadero" },
      fr: { word: "Linteau" },
      ar: { word: "ساكف", read: "sakif" },
      hi: { word: "हेडर", read: "hedar" },
      am: { word: "ሄደር", read: "heder" },
      ti: { word: "ሄደር", read: "heder" },
    },
  },
  {
    id: "flashing",
    unit: 14,
    en: "Flashing",
    meaning: "The metal that keeps water out.",
    extra: true,
    gloss: {
      es: { word: "Tapajuntas" },
      fr: { word: "Solin" },
      ar: { word: "حاجز ماء", read: "hajiz ma" },
      hi: { word: "फ्लैशिंग", read: "flashing" },
      am: { word: "ፍላሺንግ", read: "flashing" },
      ti: { word: "ፍላሺንግ", read: "flashing" },
    },
  },
  {
    id: "joist",
    unit: 15,
    en: "Joist",
    meaning: "The piece that holds up the floor.",
    extra: true,
    gloss: {
      es: { word: "Vigueta" },
      fr: { word: "Solive" },
      ar: { word: "رافدة", read: "rafida" },
      hi: { word: "जॉइस्ट", read: "joist" },
      am: { word: "ጆይስት", read: "joist" },
      ti: { word: "ጆይስት", read: "joist" },
    },
  },
  {
    id: "guard",
    unit: 11,
    en: "Guard",
    meaning: "The cover that stays on a saw or grinder. Taking it off is not a setup.",
    englishOnly: true,
    gloss: {
      es: { word: "" },
      fr: { word: "" },
      ar: { word: "" },
      hi: { word: "" },
      am: { word: "" },
      ti: { word: "" },
    },
  },
];

export const SUPPORTED_WORDS = VOCAB.filter((word) => !word.englishOnly && !word.extra);
export const EXTRA_WORDS = VOCAB.filter((word) => word.extra);
export const ENGLISH_WORDS = VOCAB.filter((word) => !word.extra);

/** Short meaning in the learner's language, so the idea lands before the English word. */
const SENSE: Record<string, Record<LanguageId, string>> = {
  hammer: {
    es: "Sirve para clavar o sacar clavos.",
    fr: "Sert à enfoncer ou à retirer des clous.",
    ar: "تُستخدم لطرق المسامير أو نزعها.",
    hi: "इससे कील ठोकते या निकालते हैं।",
    am: "ሚስማር ለመምታት ወይም ለማውጣት ነው።",
    ti: "ምስማር ንምትካእ ወይ ንምውጻእ እዩ።",
  },
  saw: {
    es: "Corta madera. La guarda se queda puesta.",
    fr: "Coupe le bois. Le protecteur reste en place.",
    ar: "تقطع الخشب. الغطاء يبقى في مكانه.",
    hi: "लकड़ी काटता है। गार्ड लगा रहता है।",
    am: "እንጨት ይቆርጣል። መከላከያው ይቆያል።",
    ti: "ዕንጨይቲ ይቖርጽ። መከላኸሊ ይጸንሕ።",
  },
  tape: {
    es: "Mide un largo. No corta.",
    fr: "Mesure une longueur. Il ne coupe pas.",
    ar: "تقيس الطول. لا تقطع.",
    hi: "लंबाई नापता है। काटता नहीं।",
    am: "ርዝመት ይለካል። አይቆርጥም።",
    ti: "ንውሓት ይለክዕ። ኣይቖርጽን።",
  },
  drill: {
    es: "Hace un agujero. Revisa el cable o la batería.",
    fr: "Fait un trou. Vérifiez le fil ou la batterie.",
    ar: "يصنع ثقبًا. افحص السلك أو البطارية.",
    hi: "छेद करता है। तार या बैटरी देखें।",
    am: "ጉድጓድ ይሰራል። ገመድ ወይም ባትሪ ይመልከቱ።",
    ti: "ጉድጓድ ይሰርሕ። ገመድ ወይ ባትሪ ርኣዩ።",
  },
  level: {
    es: "Muestra si algo está plano o a plomo.",
    fr: "Montre si quelque chose est de niveau ou d'aplomb.",
    ar: "يُظهر إن كان الشيء مستويًا.",
    hi: "बताता है कि चीज़ सीधी है या नहीं।",
    am: "ነገር ቀጥ ያለ መሆኑን ያሳያል።",
    ti: "ነገር ቀጥ ዘሎ እንተኾነ የርኢ።",
  },
  hardhat: {
    es: "Protege la cabeza en el trabajo.",
    fr: "Protège la tête au travail.",
    ar: "تحمي الرأس في العمل.",
    hi: "काम पर सिर की सुरक्षा।",
    am: "በስራ ጭንቅላትን ይጠብቃል።",
    ti: "ኣብ ስራሕ ርእሲ ይሕልው።",
  },
  ladder: {
    es: "Sirve para subir un poco. No es un andamio.",
    fr: "Sert à monter un peu. Ce n'est pas un échafaudage.",
    ar: "للصعود قليلًا. ليست سقالة.",
    hi: "थोड़ा ऊपर चढ़ने के लिए। यह मचान नहीं है।",
    am: "ትንሽ ለመውጣት ነው። ስካፎልድ አይደለም።",
    ti: "ቁሩብ ንምድያብ እዩ። ስካፎልድ ኣይኮነን።",
  },
  nail: {
    es: "Se clava con el martillo.",
    fr: "On l'enfonce avec le marteau.",
    ar: "يُدق بالمطرقة.",
    hi: "इसे हथौड़े से ठोकते हैं।",
    am: "በመዶሻ ይመታል።",
    ti: "ብማርተሎ ይትከእ።",
  },
  gloves: {
    es: "Protegen las manos. El algodón no sirve para químicos.",
    fr: "Protègent les mains. Le coton ne protège pas des produits chimiques.",
    ar: "تحمي اليدين. القطن لا يحمي من المواد الكيميائية.",
    hi: "हाथ बचाते हैं। सूती दस्ताने रसायन से नहीं बचाते।",
    am: "እጅን ይጠብቃል። ጥጥ ከኬሚካል አይከላከልም።",
    ti: "ኢድ ይሕልው። ጥጥ ካብ ኬሚካል ኣይከላኸልን።",
  },
  glasses: {
    es: "Protegen los ojos. Las gafas de sol no sirven.",
    fr: "Protègent les yeux. Les lunettes de soleil ne suffisent pas.",
    ar: "تحمي العينين. نظارات الشمس لا تكفي.",
    hi: "आँख बचाते हैं। धूप का चश्मा काफी नहीं।",
    am: "ዓይንን ይጠብቃል። የፀሐይ መነፅር አይበቃም።",
    ti: "ዓይኒ ይሕልው። መነጸር ጸሓይ ኣይኣክልን።",
  },
  stud: {
    es: "El palo vertical dentro de la pared.",
    fr: "Le bois vertical dans le mur.",
    ar: "الخشبة العمودية داخل الجدار.",
    hi: "दीवार के अंदर खड़ी लकड़ी।",
    am: "በግድግዳ ውስጥ ቀጥ ያለ እንጨት።",
    ti: "ኣብ ውሽጢ መንደቕ ዝቆመ ዕንጨይቲ።",
  },
  header: {
    es: "La viga sobre una puerta o una ventana.",
    fr: "La pièce au-dessus d'une porte ou d'une fenêtre.",
    ar: "القطعة فوق الباب أو النافذة.",
    hi: "दरवाज़े या खिड़की के ऊपर की लकड़ी।",
    am: "በር ወይም መስኮት ላይ ያለው እንጨት።",
    ti: "ኣብ ላዕሊ ኣፍደገ ወይ መስኮት ዘሎ እንጨይቲ።",
  },
  flashing: {
    es: "El metal que impide que entre el agua.",
    fr: "Le métal qui empêche l'eau d'entrer.",
    ar: "المعدن الذي يمنع دخول الماء.",
    hi: "पानी रोकने वाली धातु।",
    am: "ውሃ እንዳይገባ የሚከለክል ብረት።",
    ti: "ማይ ከይኣቱ ዝኽልክል ብረት።",
  },
  joist: {
    es: "La viga que sostiene el piso.",
    fr: "La pièce qui porte le plancher.",
    ar: "القطعة التي تحمل الأرضية.",
    hi: "फर्श को संभालने वाली लकड़ी।",
    am: "ወለልን የሚሸከም እንጨት።",
    ti: "ወለል ዝሕዝ እንጨይቲ።",
  },
};

export function meaningIn(word: VocabWord, language: LanguageId | null): string | null {
  if (!language) return null;
  return SENSE[word.id]?.[language] ?? null;
}

export interface SentenceItem {
  id: string;
  prompt: string;
  answer: string;
  options: string[];
}

export const SENTENCES: SentenceItem[] = [
  {
    id: "this-hammer",
    prompt: "This is a ___.",
    answer: "hammer",
    options: ["hammer", "saw", "level"],
  },
  {
    id: "bring-tape",
    prompt: "Bring the ___.",
    answer: "tape measure",
    options: ["tape measure", "hard hat", "ladder"],
  },
  {
    id: "wear-hat",
    prompt: "Wear the ___ in the work area.",
    answer: "hard hat",
    options: ["hard hat", "saw", "nail"],
  },
  {
    id: "guard-on",
    prompt: "The ___ stays on the saw.",
    answer: "guard",
    options: ["guard", "glove", "ladder"],
  },
];

export interface BaselineItem {
  id: string;
  prompt: string;
  options: { id: string; label: string; correct: boolean }[];
  why: string;
}

export const BASELINE: BaselineItem[] = [
  {
    id: "hat",
    prompt: "What is this? It protects the head from a falling object.",
    options: [
      { id: "hat", label: "Hard hat", correct: true },
      { id: "hammer", label: "Hammer", correct: false },
      { id: "ladder", label: "Ladder", correct: false },
    ],
    why: "A hard hat is head protection. A hammer is a tool. A ladder is access equipment.",
  },
  {
    id: "hammer",
    prompt: "What is this? It drives or pulls a nail.",
    options: [
      { id: "hammer", label: "Hammer", correct: true },
      { id: "hat", label: "Hard hat", correct: false },
      { id: "ladder", label: "Ladder", correct: false },
    ],
    why: "A hammer strikes a nail. It is not head protection and it is not a way up.",
  },
  {
    id: "ladder",
    prompt: "What is this? It is for a short reach. It is not a scaffold.",
    options: [
      { id: "ladder", label: "Ladder", correct: true },
      { id: "hammer", label: "Hammer", correct: false },
      { id: "hat", label: "Hard hat", correct: false },
    ],
    why: "A ladder is access equipment. Naming it is not permission to climb.",
  },
];

export interface ComputerTask {
  id: string;
  title: string;
  body: string;
}

export const COMPUTER_TASKS: ComputerTask[] = [
  {
    id: "mouse",
    title: "Use a mouse or a finger",
    body: "Point at the control you mean, then click or tap it. A mis-click is a reason to look again, not to rush.",
  },
  {
    id: "type",
    title: "Type",
    body: "Workplace notes are short and specific. Type the instruction the way you would say it on the site.",
  },
  {
    id: "save",
    title: "Save a file",
    body: "A saved file has a name you can find later. The training record on this device is saved in the browser, not emailed unless you sign in and store it.",
  },
  {
    id: "internet",
    title: "Use the internet",
    body: "Open the page you were sent. A link that offers a prize, a password reset you did not ask for, or a file you were not expecting is not the lesson.",
  },
  {
    id: "email",
    title: "Send an email",
    body: "An email needs a person in To and a subject that says what it is. A password does not go in the message.",
  },
];

export interface CourseUnit {
  id: string;
  title: string;
  chart: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

export const COURSE_UNITS: CourseUnit[] = [
  {
    id: "materials",
    title: "Identify materials",
    chart: "Identify materials",
    body: "Name the material before you cut, carry, or fasten it. Lumber splinters. Wet cement burns skin. Drywall and concrete dust are not a reason to blow the cloud around. Insulation is a skin and lung irritant. The fastener matches the material.",
  },
  {
    id: "hand-tools",
    title: "Identify hand tools",
    chart: "Identify hand tools",
    body: "Hammers, bars, wrenches, knives, and handsaws are powered by you. The handle and the head get a look every time.",
    href: "/training/tools?play=tools-types",
    linkLabel: "Open types of tools",
  },
  {
    id: "power-tools",
    title: "Identify power tools",
    chart: "Identify power tools",
    body: "Corded, cordless, and air tools have a motor or a compressor behind them. Powder-actuated tools are a separate type. Naming one here does not authorize you to run it.",
    href: "/training/tools?play=tools-types",
    linkLabel: "Review power tool types",
  },
  {
    id: "safety",
    title: "Safety",
    chart: "Safety",
    body: "PPE, hazards, falls, WHMIS, emergencies, and how you speak up. Safety is inside every module, not a separate day you can skip.",
    href: "/training",
    linkLabel: "Open the training map",
  },
  {
    id: "exterior",
    title: "Exterior work",
    chart: "Exteriors work",
    body: "The outside of the building: weather, roof edges, openings, and materials staged in the walk. An unmarked edge is a stop. This page is not a roofing ticket.",
  },
  {
    id: "interior",
    title: "Interior finish",
    chart: "Interior finish",
    body: "Drywall, flooring, and paint happen closer to finished surfaces and to other people. Dust stays controlled. Finished work stays protected. This page is not a finishing ticket.",
  },
  {
    id: "practice",
    title: "Actual practice",
    chart: "Actual practice",
    body: "The games are the practice in this application. Hands-on skill is still verified by an instructor in person. The app records what you practised. It does not sign that verification.",
    href: "/games",
    linkLabel: "Open the games",
  },
  {
    id: "assignments",
    title: "Assignments",
    chart: "Assignments",
    body: "Vocabulary units 1–10 are the supported assignments. Unit 11 is English only. Module practice and the games are the construction assignments.",
    href: "/vocabulary",
    linkLabel: "Open vocabulary assignments",
  },
  {
    id: "exam",
    title: "Exam",
    chart: "Exam",
    body: "A short check across language, tools, materials, and one safety decision. It is a training exam for this program, not a provincial certificate.",
    href: "/exam",
    linkLabel: "Start the exam",
  },
];

export interface ExamItem {
  id: string;
  prompt: string;
  options: { id: string; label: string; correct: boolean; feedback: string }[];
}

export const EXAM: ExamItem[] = [
  {
    id: "cement",
    prompt: "Wet cement is on a bare hand. What is the right first move?",
    options: [
      { id: "wipe", label: "Wipe it on your pants and keep placing.", correct: false, feedback: "Wet cement stays on skin that way. It is a burn hazard, not dirt." },
      { id: "wash", label: "Stop and wash it off. Tell someone if the skin is already reacting.", correct: true, feedback: "Get it off the skin. The site’s first-aid person is the next call if the skin is damaged." },
      { id: "glove", label: "Put a glove on over it and finish the bay.", correct: false, feedback: "A glove over wet cement holds the hazard against the skin." },
    ],
  },
  {
    id: "guard",
    prompt: "The guard is off a grinder because it blocked the cut.",
    options: [
      { id: "off", label: "Leave it off. The worker knows the tool.", correct: false, feedback: "Familiarity is not a guard." },
      { id: "stop", label: "Stop. The guard goes back, or the work changes.", correct: true, feedback: "If the guard cannot do the cut, you need a different method." },
      { id: "glasses", label: "Add glasses and keep the guard off.", correct: false, feedback: "Glasses do not replace a guard." },
    ],
  },
  {
    id: "tape-word",
    prompt: "Which tool marks a length and does not cut?",
    options: [
      { id: "tape", label: "Tape measure", correct: true, feedback: "A tape measure is a layout tool." },
      { id: "saw", label: "Saw", correct: false, feedback: "A saw cuts. The guard stays on." },
      { id: "drill", label: "Drill", correct: false, feedback: "A drill makes a hole." },
    ],
  },
  {
    id: "edge",
    prompt: "An opening at the exterior edge has no cover and no barricade.",
    options: [
      { id: "walk", label: "Walk around it. Everyone can see it.", correct: false, feedback: "An unmarked opening is how someone meets it without seeing it." },
      { id: "stop", label: "Stop the approach and report it so it gets covered or barricaded.", correct: true, feedback: "Name it, keep people off it, and use the site’s way of reporting." },
      { id: "board", label: "Drop a loose board over it and keep working.", correct: false, feedback: "A loose board is not a cover." },
    ],
  },
  {
    id: "dust",
    prompt: "Interior sanding is putting a cloud through a finished room.",
    options: [
      { id: "blow", label: "Blow the dust into the hall so the room looks clear.", correct: false, feedback: "Moving the cloud moves the exposure." },
      { id: "control", label: "Stop and use the dust control the task requires before more sanding.", correct: true, feedback: "Control the dust. A finished room is not a reason to skip it." },
      { id: "later", label: "Finish the wall and clean at the end of the day.", correct: false, feedback: "The people in the room meet the dust now." },
    ],
  },
];

export interface JourneyStep {
  n: number;
  id: string;
  title: string;
  summary: string;
  href: string;
  action: string;
}

export const JOURNEY: JourneyStep[] = [
  { n: 1, id: "login", title: "Login", summary: "Students, instructors, and administrators each sign in to their own work.", href: "/signin", action: "Sign in" },
  { n: 2, id: "register", title: "Registration", summary: "You tell the program who you are: your role, the construction work you are interested in, and your province.", href: "/onboarding", action: "Review registration" },
  { n: 3, id: "baseline", title: "Baseline assessment", summary: "A first look at safety awareness: name the hard hat, the hammer, and the ladder.", href: "/baseline", action: "Start the baseline" },
  { n: 4, id: "interest", title: "Career interest", summary: "Construction, Logistics, or Community Support. Interest chooses a pathway. It does not assign a job.", href: "/journey#pathways", action: "See the pathways" },
  { n: 5, id: "pathway", title: "Choose your pathway", summary: "This application opens the construction stream. The other two pathways keep the same start.", href: "/profile", action: "Set your pathway" },
  { n: 6, id: "language", title: "Supplementary language", summary: "Spanish, French, Arabic, Hindi, Amharic, or Tigrinya appears beside English in the early units.", href: "/vocabulary", action: "Choose the language" },
  { n: 7, id: "visual", title: "Visual vocabulary", summary: "See the word, hear the English, and read the meaning. Say it in your supplementary language.", href: "/vocabulary?stage=visual", action: "See the words" },
  { n: 8, id: "supported", title: "Supported practice and homework", summary: "The practical training happens in class, with your instructor. Units 1–10 on this page are the homework beside that class: match the word to the picture.", href: "/vocabulary?stage=supported", action: "Open the homework" },
  { n: 9, id: "english", title: "English-only vocabulary", summary: "Units 1–11, including the guard. The translation stays off so the English word has to stand alone.", href: "/vocabulary?stage=english", action: "Practice in English" },
  { n: 10, id: "sentences", title: "Simple sentences", summary: "Use the words in a workplace sentence. This is a hammer. Bring the tape measure.", href: "/vocabulary?stage=sentences", action: "Write the sentence" },
  { n: 11, id: "instructions", title: "Workplace instructions", summary: "Follow a short instruction on the yard: where to go, what to bring, and when to stop.", href: "/training/orientation", action: "Open orientation" },
  { n: 12, id: "computer", title: "Basic computer skills", summary: "Point and click, type, save, use a real link, and send a message without putting a password in it.", href: "/computer", action: "Practise the five skills" },
  { n: 13, id: "safety", title: "Safety training", summary: "PPE, hazards, tool safety, site safety, and emergency procedures, built into the modules.", href: "/training", action: "Open safety modules" },
  { n: 14, id: "tools", title: "Tools, materials, and equipment", summary: "Hand tools, power tools, materials, and mobile equipment. Identify them, then inspect before use.", href: "/course", action: "Open the construction course" },
  { n: 15, id: "systems", title: "Construction systems and skills", summary: "Exterior work, interior finish, trade awareness, and measurement. Identification and decisions, not a trade ticket.", href: "/course", action: "Open systems and skills" },
  { n: 16, id: "hands", title: "Hands-on practical training", summary: "Learned and practised in the games. An instructor verifies the hands-on part in person.", href: "/games", action: "Practise in the games" },
  { n: 17, id: "onsite", title: "On-site training", summary: "A daily log for the practice yard: the task, and what you would tell a supervisor. It is not an employer timesheet.", href: "/sitelog", action: "Write a log" },
  { n: 18, id: "exam", title: "Final assessment", summary: "Safety, measurement language, knowledge, and one practical decision.", href: "/exam", action: "Start the exam" },
  { n: 19, id: "passport", title: "Graduation and skills passport", summary: "The completion record is this program’s skills passport. It lists modules you finished. It is not a government certificate.", href: "/record", action: "Open the skills passport" },
  { n: 20, id: "employment", title: "Employment connection", summary: "Name the skills you can put on a résumé. Employer matching and 30-, 90-, and 180-day follow-up are done with program staff.", href: "/employment", action: "Prepare the skills list" },
];

export const ADMIN_DUTIES = [
  { id: "management", title: "Management", body: "Users, instructors, and the program overview live on the admin desk." },
  { id: "administration", title: "Administration", body: "Accounts, versions, and what is published to the training path." },
  { id: "instructor", title: "Instructor", body: "Read a learner’s progress, gaps, and on-site log. Hands-on verification still happens with the person." },
  { id: "assignments", title: "Assignments", body: "Vocabulary units and the module practice are the assignments a learner can finish here." },
  { id: "recognition", title: "Recognition", body: "The skills passport records modules completed in this program." },
  { id: "evaluation", title: "Evaluation", body: "First answers, the exam, and the baseline are the evaluation. Speed is not a score." },
  { id: "certification", title: "Certification", body: "This program can record completion. It does not issue a provincial certificate, a WHMIS sign-off, or equipment authorization." },
  { id: "courses", title: "Courses", body: "The construction course is the stream in this application. Logistics and Community Support are the streams the desk is ready to add." },
];

const SAFETY_MODULES = ["ppe", "hazards", "falls", "whmis", "emergency", "conduct"];

export interface CurriculumSnapshot {
  onboarded: boolean;
  pathway: PathwayId | null;
  language: LanguageId | null;
  baseline: string[];
  vocab: Record<string, { visual?: boolean; supported?: boolean; english?: boolean }>;
  sentences: string[];
  computer: string[];
  units: string[];
  logs: number;
  exam: string[];
  modulesCompleted: string[];
  modulesStarted: string[];
}

export function emptyCurriculumSnapshot(): CurriculumSnapshot {
  return {
    onboarded: false,
    pathway: null,
    language: null,
    baseline: [],
    vocab: {},
    sentences: [],
    computer: [],
    units: [],
    logs: 0,
    exam: [],
    modulesCompleted: [],
    modulesStarted: [],
  };
}

function countStage(vocab: CurriculumSnapshot["vocab"], stage: VocabStage, words: VocabWord[]) {
  return words.filter((word) => vocab[word.id]?.[stage]).length;
}

export function stepDone(step: JourneyStep, snap: CurriculumSnapshot): boolean {
  const visual = countStage(snap.vocab, "visual", SUPPORTED_WORDS);
  const supported = countStage(snap.vocab, "supported", SUPPORTED_WORDS);
  const english = countStage(snap.vocab, "english", ENGLISH_WORDS);
  const safetyDone = SAFETY_MODULES.filter((id) => snap.modulesCompleted.includes(id)).length;
  switch (step.id) {
    case "login":
    case "register":
      return snap.onboarded;
    case "baseline":
      return snap.baseline.length >= BASELINE.length;
    case "interest":
    case "pathway":
      return Boolean(snap.pathway);
    case "language":
      return Boolean(snap.language);
    case "visual":
      return visual >= SUPPORTED_WORDS.length;
    case "supported":
      return supported >= SUPPORTED_WORDS.length;
    case "english":
      return english >= ENGLISH_WORDS.length;
    case "sentences":
      return snap.sentences.length >= SENTENCES.length;
    case "instructions":
      return snap.modulesStarted.includes("orientation") || snap.modulesCompleted.includes("orientation");
    case "computer":
      return snap.computer.length >= COMPUTER_TASKS.length;
    case "safety":
      return safetyDone >= 3;
    case "tools":
      return snap.units.includes("hand-tools") && snap.units.includes("power-tools") && snap.units.includes("materials");
    case "systems":
      return snap.units.includes("exterior") && snap.units.includes("interior");
    case "hands":
      return snap.modulesStarted.includes("tools") || snap.modulesCompleted.includes("shift");
    case "onsite":
      return snap.logs > 0;
    case "exam":
      return snap.exam.length >= EXAM.length;
    case "passport":
      return snap.modulesCompleted.length >= 8;
    case "employment":
      return snap.units.includes("employment");
    default:
      return false;
  }
}

export function nextJourneyStep(snap: CurriculumSnapshot): JourneyStep {
  return JOURNEY.find((step) => !stepDone(step, snap)) ?? JOURNEY[JOURNEY.length - 1];
}

export function journeyDoneCount(snap: CurriculumSnapshot): number {
  return JOURNEY.filter((step) => stepDone(step, snap)).length;
}

export interface ProgressBand {
  id: string;
  label: string;
  pct: number;
}

export function progressBands(snap: CurriculumSnapshot): ProgressBand[] {
  const visual = countStage(snap.vocab, "visual", SUPPORTED_WORDS);
  const supported = countStage(snap.vocab, "supported", SUPPORTED_WORDS);
  const english = countStage(snap.vocab, "english", ENGLISH_WORDS);
  const vocabTotal = SUPPORTED_WORDS.length * 2 + ENGLISH_WORDS.length + SENTENCES.length;
  const vocabDone = visual + supported + english + snap.sentences.length;
  const safetyIds = SAFETY_MODULES;
  const safetyDone = safetyIds.filter((id) => snap.modulesCompleted.includes(id)).length;
  const safetyStarted = safetyIds.filter((id) => snap.modulesStarted.includes(id) || snap.modulesCompleted.includes(id)).length;
  const toolsPct = snap.modulesCompleted.includes("tools") ? 100 : snap.modulesStarted.includes("tools") ? 45 : snap.units.includes("hand-tools") ? 25 : 0;
  const constructionIds = ["orientation", "report", "shift"];
  const constructionDone = constructionIds.filter((id) => snap.modulesCompleted.includes(id)).length;
  const unitBoost = ["materials", "exterior", "interior"].filter((id) => snap.units.includes(id)).length;
  const constructionPct = Math.round(((constructionDone + unitBoost) / (constructionIds.length + 3)) * 100);
  const overall = Math.round((journeyDoneCount(snap) / JOURNEY.length) * 100);
  return [
    { id: "vocabulary", label: "Vocabulary", pct: Math.round((vocabDone / vocabTotal) * 100) },
    {
      id: "safety",
      label: "Safety",
      pct: Math.round((safetyDone / safetyIds.length) * 100) || (safetyStarted ? 15 : 0),
    },
    { id: "tools", label: "Tools", pct: toolsPct },
    { id: "construction", label: "Construction skills", pct: constructionPct },
    { id: "overall", label: "Overall progress", pct: overall },
  ];
}

export function resumeLines(snap: CurriculumSnapshot): string[] {
  const lines = ["Completed general educational training in the Purpose Academy construction stream (SITEWISE)."];
  if (countStage(snap.vocab, "english", ENGLISH_WORDS) >= ENGLISH_WORDS.length) {
    lines.push("Can name common site tools and protective equipment in English.");
  }
  const safety = SAFETY_MODULES.filter((id) => snap.modulesCompleted.includes(id));
  if (safety.length) lines.push(`Finished safety modules in this program: ${safety.join(", ")}.`);
  if (snap.modulesCompleted.includes("tools") || snap.units.includes("hand-tools")) {
    lines.push("Can describe hand tools, power tools, and a pre-use check that takes a damaged tool out of service.");
  }
  if (snap.logs > 0) lines.push("Kept a practice-yard log of tasks and what to tell a supervisor.");
  lines.push("This list is wording for a résumé. It is not a job offer and not a certificate.");
  return lines;
}
