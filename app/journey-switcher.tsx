"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Braces, Rocket, Sparkles, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    name: "IDEA",
    title: "Start with a real problem.",
    description: "Turn a rough idea into a useful product by identifying who it serves, what it needs to do, and what can wait.",
    chip: "01 / DISCOVER",
    icon: Sparkles,
    code: <>user problem <b>→</b> clear requirements<br />features <b>→</b> prioritized scope<br />scope <b>→</b> buildable plan</>,
  },
  {
    name: "PROMPT",
    title: "Give AI a plan it can follow.",
    description: "Write structured prompts with context, acceptance criteria, and constraints, then work in small, reviewable steps.",
    chip: "02 / PLAN",
    icon: BookOpen,
    code: <>const brief = <b>defineRequirements</b>(idea)<br />const tasks = <b>breakIntoSteps</b>(brief)<br /><span>await</span> review(tasks)</>,
  },
  {
    name: "CODE",
    title: "Build the complete application.",
    description: "Generate a clear frontend and backend, connect the right data model, and learn how every part fits together.",
    chip: "03 / BUILD",
    icon: Braces,
    code: <><b>export default function</b> Project() &#123;<br />&nbsp; <span>return</span> &lt;WorkingApp /&gt;<br />&#125;</>,
  },
  {
    name: "DEBUG",
    title: "Understand it. Fix it. Test it.",
    description: "Read errors, inspect behavior, and use AI as a debugging partner while you verify the actual change.",
    chip: "04 / VERIFY",
    icon: Wrench,
    code: <>✓ behavior checked<br />✓ edge cases reviewed<br />✓ changes understood</>,
  },
  {
    name: "DEPLOY",
    title: "Publish a project you control.",
    description: "Deploy to a suitable provider, connect your domain, protect your data, and keep a path open for future changes.",
    chip: "05 / SHIP",
    icon: Rocket,
    code: <>$ <b>git push</b> origin main<br /><span>✓</span> build completed<br /><span>↗</span> app is online</>,
  },
];

const subtitles = [
  "Find the right problem",
  "Write the build plan",
  "Make it work",
  "Improve with confidence",
  "Put it online",
];

export default function JourneySwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeStep = steps[activeIndex];

  return (
    <div className="journey-layout">
      <div className="step-list" role="tablist" aria-label="Development journey">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeIndex === index;

          return (
            <button
              key={step.name}
              className={`step-button${isActive ? " active" : ""}`}
              id={`journey-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="journey-panel"
              onClick={() => setActiveIndex(index)}
            >
              <span className="step-num">0{index + 1}</span>
              <span className="step-icon"><Icon size={16} /></span>
              <span>
                <span className="step-title">{step.name}</span>
                <span className="step-sub">{subtitles[index]}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        className="step-detail"
        id="journey-panel"
        key={activeIndex}
        role="tabpanel"
        aria-labelledby={`journey-tab-${activeIndex}`}
        tabIndex={0}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <span className="step-chip">{activeStep.chip}</span>
          <h3>{activeStep.title}</h3>
          <p>{activeStep.description}</p>
          <div className="step-controls">
            <button
              className="arrow"
              type="button"
              aria-label="Previous step"
              onClick={() => setActiveIndex((activeIndex + steps.length - 1) % steps.length)}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              className="arrow"
              type="button"
              aria-label="Next step"
              onClick={() => setActiveIndex((activeIndex + 1) % steps.length)}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <div className="snippet">{activeStep.code}</div>
      </motion.div>
    </div>
  );
}
