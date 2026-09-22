import { visitCopy } from "@/content/visit";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";
import { Heart, MessageCircle, Armchair, Camera, ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/photos";
import { ParticipationDialog, ContactSection } from "@/components/contact";
export const metadata: Metadata = {
  title: visitCopy.metadataTitle,
  description: visitCopy.metadataDescription
};
export default function VisitPage() {
  return <main id="main-content" className="inner-page section-wrap">
    <div className="visit-hero">
      <header className="page-heading">
        <p className="eyebrow">{visitCopy.eyebrow}</p>
        <h1>
          {visitCopy.title}
          <br />
          <em>{visitCopy.titleEmphasis}</em>
        </h1>
        <p className="lead">
          {visitCopy.lead}
          <br />
          {visitCopy.leadContinuation}
        </p>
        <ParticipationDialog type="visit" />
        <span className="availability-note">{visitCopy.contactNote}</span>
      </header>
      <figure className="visit-photo">
        <Photo scene="day" eager />
        <figcaption>
          <Heart size={15} />{" "}
          {visitCopy.photoCaption}
        </figcaption>
      </figure>
    </div>
    <p className="visit-quote reveal">{visitCopy.quote}</p>
    <section className="visit-details reveal">
      <h2>{visitCopy.processTitle}</h2>
      <div className="process-grid">
        <article className="process-step">
          <MessageCircle size={28} strokeWidth={1.5} />
          <h3>{visitCopy.helloTitle}</h3>
          <p>{visitCopy.helloText}</p>
        </article>
        <article className="process-step">
          <Armchair size={28} strokeWidth={1.5} />
          <h3>{visitCopy.experienceTitle}</h3>
          <p>{visitCopy.experienceText}</p>
        </article>
        <article className="process-step">
          <Camera size={28} strokeWidth={1.5} />
          <h3>{visitCopy.photoTitle}</h3>
          <p>{visitCopy.photoText}</p>
        </article>
      </div>
    </section>
    <ContactSection type="visit" />
    <div className="next-page reveal">
      <span>{visitCopy.nextIntro}</span>
      <a href={sitePath("/")} className="text-link">
        {visitCopy.nextAction}{" "}
        <ArrowUpRight size={18} />
      </a>
    </div>
  </main>;
}
