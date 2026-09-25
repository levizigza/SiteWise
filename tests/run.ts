import assert from "node:assert/strict";
import { concreteReady } from "../src/content/gear";
import { parableFor } from "../src/content/parables";
import { LOCKER } from "../src/content/lockerItems";
import { jurisdictionApplies, jurisdictionHeading } from "../src/content/jurisdiction";
import { recordId } from "../src/content/record";
import { warningList } from "../src/content/warnings";

assert.equal(jurisdictionHeading("CANADA"), "General Canadian information");
assert.equal(jurisdictionHeading("ALBERTA"), "Alberta-specific information");
assert.equal(jurisdictionHeading(["ALBERTA", "BRITISH_COLUMBIA"]), "Alberta and British Columbia-specific information");
assert.equal(jurisdictionApplies("ALBERTA", "ONTARIO"), false);
assert.equal(jurisdictionApplies("ALBERTA", "ALBERTA"), true);
assert.equal(jurisdictionApplies(["ALBERTA", "BRITISH_COLUMBIA"], "BRITISH_COLUMBIA"), true);
assert.equal(jurisdictionApplies("CANADA", "ONTARIO"), true);
assert.deepEqual(warningList(["site-specific"], ["site-specific", "hands-on"]), ["site-specific", "hands-on"]);
assert.equal(recordId("Alex", ["orientation", "ppe"], "2026-09-24"), recordId("Alex", ["orientation", "ppe"], "2026-09-24"));
assert.notEqual(recordId("Alex", ["orientation"], "2026-09-24"), recordId("Sam", ["orientation"], "2026-09-24"));
assert.match(recordId("Alex", ["whmis"], "2026-09-24"), /^SW-[0-9A-F]{8}$/);

const concreteKit =
  "Good. Eyes, ears, dust protection, and the rest of the kit are on before the saw starts. This still does not authorize the saw.";
assert.equal(parableFor(concreteKit).id, "concrete-kit");
assert.match(parableFor(concreteKit).story, /goggles/i);
assert.match(parableFor(concreteKit).story, /respirator/i);
assert.doesNotMatch(parableFor(concreteKit).story, /water on the blade/i);
assert.equal(
  parableFor("This cut still needs the protection the dust, the chips, and the noise call for.").id,
  "concrete-kit",
);
assert.equal(
  parableFor("Concrete cutting can generate hazardous airborne dust. Review the respiratory-protection lesson.").id,
  "respirator",
);
assert.equal(parableFor("Sunglasses are not the eye protection for this cut.").id, "eyes");
assert.equal(
  parableFor("Ask what is specified, and whether water, a shroud, or vacuum is in use. The mask is not the whole control.").id,
  "dust-control",
);
assert.equal(parableFor("The dry cut throws a cloud. The same cut with water on the blade keeps the cloud down.").id, "dust-control");
assert.equal(parableFor("Solvents can soak through the wrong glove. The SDS names the glove material.").id, "gloves");
assert.equal(parableFor("Tape over a cut jacket is not a repair you can trust.").id, "cord");
assert.equal(parableFor("The lower guard is missing. This saw is out of service until a proper guard is on it.").id, "guard");
assert.equal(parableFor("The side rail is cracked. A damaged ladder comes out of service. Don’t “just use the other side.”").id, "ladder");
assert.equal(parableFor("The opening is the fall. The cover sitting beside it is a clue, not a control, until it is on and secured the way the site requires.").id, "opening");
assert.equal(parableFor("Sniffing is an exposure. The label is how you name it, from a safe distance if you can see it.").id, "label");
assert.equal(parableFor("Your job at this level is to avoid exposure and get the right people. Cleanup beyond your training is not heroism.").id, "spill");
assert.equal(parableFor("Two products that should not sit together are touching. Incompatible storage is a chemical hazard even when both labels are on.").id, "incompatible");
assert.equal(parableFor("The badge means you finished the SITEWISE module. It is not a certificate.").id, "badge");
assert.equal(parableFor("No hazard here. The eyewash is clear and signed. The problem is the spill in the aisle, not the eyewash.").id, "nohazard");
assert.equal(parableFor("The rail is on the deck, so the guard is feasible. Friendship and the hook do not close the opening.").id, "opening");
assert.equal(
  parableFor("The site rule covers the hat, boots, and vest. The cut adds goggles, hearing protection, the respirator named in the procedure, and work gloves.").id,
  "concrete-kit",
);

const lockerScene: Record<string, string> = {
  hardhat: "hardhat",
  eyes: "eyes",
  hearing: "hearing",
  gloves: "gloves",
  boots: "boots",
  hivis: "vest",
  harness: "harness",
  respirator: "respirator",
  drill: "cord",
  grinder: "guard",
  saw: "guard",
  ladder: "ladder",
  cord: "cord",
  hand: "tool",
};
for (const entry of LOCKER) {
  assert.equal(parableFor(entry.check.prompt).id, lockerScene[entry.id], entry.id);
}
assert.equal(concreteReady(["hardhat", "goggles", "ear", "vest", "gloves", "boots"]).ok, false);
assert.equal(
  concreteReady(["hardhat", "goggles", "ear", "vest", "gloves", "boots", "respirator"]).ok,
  true,
);
console.log("ok");
