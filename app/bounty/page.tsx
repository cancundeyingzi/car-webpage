import { bountyCopy } from "@/content/bounty";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";
import { Check, ArrowUpRight } from "lucide-react";
import { ParticipationDialog, ContactSection } from "@/components/contact";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
export const metadata: Metadata = {
  title: bountyCopy.metadataTitle,
  description: bountyCopy.metadataDescription
};
export default function BountyPage() {
  return <main id="main-content" className="inner-page section-wrap">
    <div className="bounty-layout">
      <header className="page-heading">
        <p className="eyebrow">{bountyCopy.eyebrow}</p>
        <h1>
          {bountyCopy.title}
          <br />
          <em>{bountyCopy.titleEmphasis}</em>
        </h1>
        <p className="lead">
          {bountyCopy.lead}
          <br />
          {bountyCopy.leadContinuation}
        </p>
        <div className="bounty-actions">
          <ParticipationDialog type="bounty" />
          <span className="availability-note">{bountyCopy.contactNote}</span>
        </div>
      </header>
      <section className="reward-stack" aria-label={bountyCopy.rewardAria}>
        <article className="reward-card">
          <div className="reward-card-top">
            <strong>{bountyCopy.smallTitle}</strong>
            <span>{bountyCopy.smallEyebrow}</span>
          </div>
          <div className="reward-amount">
            <small>{bountyCopy.currency}</small>
            {bountyCopy.smallMin}
            <span>{bountyCopy.rangeSeparator}</span>
            {bountyCopy.smallMax}
          </div>
          <p>{bountyCopy.smallDescription}</p>
        </article>
        <article className="reward-card large">
          <div className="reward-card-top">
            <strong>{bountyCopy.largeTitle}</strong>
            <span>{bountyCopy.largeEyebrow}</span>
          </div>
          <div className="reward-amount">
            <small>{bountyCopy.currency}</small>
            {bountyCopy.largeAmount}
          </div>
          <p>{bountyCopy.largeDescription}</p>
        </article>
        <div className="reward-condition">
          <Check size={18} />
          <span>
            <strong>{bountyCopy.paymentPolicy}</strong>
          </span>
        </div>
      </section>
    </div>
    <section className="bounty-details reveal">
      <h2>{bountyCopy.processTitle}</h2>
      <div className="process-grid">
        <article className="process-step">
          <span>{bountyCopy.stepOneNumber}</span>
          <h3>{bountyCopy.stepOneTitle}</h3>
          <p>{bountyCopy.stepOneText}</p>
        </article>
        <article className="process-step">
          <span>{bountyCopy.stepTwoNumber}</span>
          <h3>{bountyCopy.stepTwoTitle}</h3>
          <p>{bountyCopy.stepTwoText}</p>
        </article>
        <article className="process-step">
          <span>{bountyCopy.stepThreeNumber}</span>
          <h3>{bountyCopy.stepThreeTitle}</h3>
          <p>{bountyCopy.stepThreeText}</p>
        </article>
      </div>
    </section>
    <ContactSection type="bounty" />
    <section className="faq-wrap reveal">
      <h2>{bountyCopy.faqTitle}</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="drawing">
          <AccordionTrigger>{bountyCopy.drawingQuestion}</AccordionTrigger>
          <AccordionContent>{bountyCopy.drawingAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="scope">
          <AccordionTrigger>{bountyCopy.scopeQuestion}</AccordionTrigger>
          <AccordionContent>{bountyCopy.scopeAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="reward">
          <AccordionTrigger>{bountyCopy.rewardQuestion}</AccordionTrigger>
          <AccordionContent>{bountyCopy.rewardAnswer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="channel">
          <AccordionTrigger>{bountyCopy.channelQuestion}</AccordionTrigger>
          <AccordionContent>{bountyCopy.channelAnswer}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
    <div className="next-page reveal">
      <span>{bountyCopy.nextIntro}</span>
      <a href={sitePath("/story/")} className="text-link">
        {bountyCopy.nextAction}{" "}
        <ArrowUpRight size={18} />
      </a>
    </div>
  </main>;
}
