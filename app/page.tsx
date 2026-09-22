import { homeCopy } from "@/content/home";
import { sitePath } from "@/lib/site-path";
import { ArrowDown, ArrowUpRight, BookOpen, Sparkles, Armchair } from "lucide-react";
import { HeroPhotos } from "@/components/photos";
export default function Home() {
  return <main id="main-content" className="home-page">
    <section className="welcome" aria-labelledby="welcome-title">
      <div className="welcome-copy">
        <p className="eyebrow">
          <span className="mini-spark">{homeCopy.decoration}</span>{" "}
          {homeCopy.subject}{" "}
          <span className="eyebrow-divider" />{" "}
          {homeCopy.vehicle}
        </p>
        <h1 id="welcome-title">{homeCopy.title}</h1>
        <p className="welcome-description">{homeCopy.intro}</p>
        <div className="welcome-actions">
          <a className="button button-dark" href={sitePath("/story/#meaning")}>
            {homeCopy.detailAction}{" "}
            <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href={sitePath("/bounty/")}>
            {homeCopy.bountyAction}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <HeroPhotos />
      <div className="hero-caption">
        <span>{homeCopy.caption}</span>
        <a href="#explore" aria-label={homeCopy.exploreAria}>
          <ArrowDown size={15} />{" "}
          {homeCopy.exploreAction}
        </a>
        <span>{homeCopy.captionEnglish}</span>
      </div>
    </section>
    <section className="explore section-wrap" id="explore">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">{homeCopy.exploreEyebrow}</p>
          <h2>{homeCopy.exploreTitle}</h2>
        </div>
        <span className="section-aside">{homeCopy.exploreAside}</span>
      </div>
      <div className="entry-grid">
        <a className="entry-card story-entry reveal" href={sitePath("/story/")}>
          <div className="entry-top">
            <BookOpen size={23} strokeWidth={1.5} />
            <span>{homeCopy.storyNumber}</span>
          </div>
          <h3>{homeCopy.storyTitle}</h3>
          <p>
            {homeCopy.storyIntro}
            <br className="desktop-break" />
            {homeCopy.storyOutro}
          </p>
          <div className="entry-bottom">
            <span>{homeCopy.storyAction}</span>
            <span className="round-arrow">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </a>
        <a className="entry-card bounty-entry reveal" href={sitePath("/bounty/")}>
          <div className="entry-top">
            <Sparkles size={23} strokeWidth={1.5} />
            <span>{homeCopy.bountyNumber}</span>
          </div>
          <h3>{homeCopy.bountyTitle}</h3>
          <p>
            {homeCopy.bountyIntro}
            <br className="desktop-break" />
            {homeCopy.bountyOutro}
          </p>
          <div className="entry-bottom">
            <span>
              {homeCopy.bountyLabel}{" "}
              <strong>{homeCopy.rewardRange}</strong>
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </a>
        <a className="entry-card visit-entry reveal" href={sitePath("/visit/")}>
          <div className="entry-top">
            <Armchair size={23} strokeWidth={1.5} />
            <span>{homeCopy.visitNumber}</span>
          </div>
          <h3>{homeCopy.visitTitle}</h3>
          <p>
            {homeCopy.visitIntro}
            <br className="desktop-break" />
            {homeCopy.visitOutro}
          </p>
          <div className="entry-bottom">
            <span>{homeCopy.visitAction}</span>
            <span className="round-arrow">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </a>
      </div>
    </section>
    <div className="closing-note reveal">
      <span>{homeCopy.decoration}</span>
      <p>{homeCopy.closing}</p>
    </div>
  </main>;
}
