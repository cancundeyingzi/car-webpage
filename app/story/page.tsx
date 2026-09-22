import { storyCopy } from "@/content/story-page";
import { sitePath } from "@/lib/site-path";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { StoryScenes } from "@/components/story-scenes";
import { meaningItems } from "@/content/meanings";
import { designChapters } from "@/content/story";
export const metadata: Metadata = {
  title: storyCopy.metadataTitle,
  description: storyCopy.metadataDescription
};
export default function StoryPage() {
  return <main id="main-content" className="inner-page section-wrap">
    <header className="page-heading story-heading">
      <p className="eyebrow">{storyCopy.eyebrow}</p>
      <h1>
        {storyCopy.title}
        <br />
        <em>{storyCopy.titleEmphasis}</em>
      </h1>
      <p className="lead">
        {storyCopy.lead}
        <br />
        {storyCopy.leadContinuation}
      </p>
      <nav className="sub-nav" aria-label={storyCopy.directoryAria}>
        <a href="#characters">{storyCopy.charactersLink}</a>
        <a href="#meaning">{storyCopy.meaningLink}</a>
        <a href="#design">{storyCopy.designLink}</a>
      </nav>
    </header>
    <section id="characters" aria-label={storyCopy.charactersAria}>
      <StoryScenes />
    </section>
    <section className="meaning-section" id="meaning">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">{storyCopy.meaningEyebrow}</p>
          <h2>{storyCopy.meaningTitle}</h2>
        </div>
        <span className="section-aside">{storyCopy.meaningAside}</span>
      </div>
      <figure className="hood-feature reveal">
        <div className="hood-image-wrap">
          <img src={sitePath("/images/hood-placeholder.webp")} width="1536" height="1024" alt={storyCopy.hoodAlt} loading="lazy" decoding="async" data-parallax="0.045" />
        </div>
        <figcaption>
          <span>
            <strong>{storyCopy.hoodTitle}</strong>
            {storyCopy.hoodCaption}
          </span>
          <small>{storyCopy.hoodDisclaimer}</small>
        </figcaption>
      </figure>
      <div className="meaning-grid">{meaningItems.map(item => <article className={`meaning-card tone-${item.tone} reveal`} key={item.number}>
          <span className="meaning-number">{item.number}</span>
          <p className="meaning-keywords">{item.keywords}</p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>)}</div>
      <p className="story-tension reveal">
        {storyCopy.tension}
        <br className="desktop-break" />
        {storyCopy.tensionContinuation}
      </p>
    </section>
    <section className="editorial origin-section reveal" id="design">
      <div className="editorial-title">
        <span>{storyCopy.originLabel}</span>
        <h2>
          {storyCopy.originQuestion}
          <br />
          {storyCopy.originQuestionContinuation}
        </h2>
        <p>
          {storyCopy.originIntro}
          <br />
          {storyCopy.originIntroContinuation}
        </p>
      </div>
      <div className="editorial-body">
        <p>
          {storyCopy.originOpening}
          <br />
          {storyCopy.originContext}
        </p>
        <h3>{storyCopy.originTitle}</h3>
        <p>{storyCopy.originSummary}</p>
        <div className="origin-keywords">
          <span>{storyCopy.keywordFuture}</span>
          <span>{storyCopy.keywordHope}</span>
          <span>{storyCopy.keywordHome}</span>
        </div>
      </div>
    </section>
    <details className="design-journal">
      <summary>
        <span>
          <small>{storyCopy.journalEyebrow}</small>
          <strong>{storyCopy.journalAction}</strong>
        </span>
        <span className="journal-expand">
          <span>{storyCopy.journalToggle}</span>
          <ArrowDown size={19} />
        </span>
      </summary>
      <article className="journal-body">
        {designChapters.map((chapter, index) => <section key={chapter.title}>
          <span className="journal-chapter">{String(index + 1).padStart(2, "0")}</span>
          <h3>{chapter.title}</h3>
          {chapter.paragraphs.map(paragraph => <p key={paragraph.slice(0, 25)}>{paragraph}</p>)}
        </section>)}
        <p className="journal-signature">{storyCopy.journalSignature}</p>
        <a href="#design" className="text-link">{storyCopy.journalBack}</a>
      </article>
    </details>
    <div className="next-page reveal">
      <span>{storyCopy.nextIntro}</span>
      <a className="text-link" href={sitePath("/bounty/")}>
        {storyCopy.nextAction}{" "}
        <ArrowUpRight size={18} />
      </a>
    </div>
  </main>;
}
