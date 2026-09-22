import { notFoundCopy } from "@/content/not-found";
import { sitePath } from "@/lib/site-path";
export default function NotFound() {
  return <main id="main-content" className="inner-page section-wrap">
    <header className="page-heading">
      <p className="eyebrow">{notFoundCopy.eyebrow}</p>
      <h1>{notFoundCopy.title}</h1>
      <p className="lead">{notFoundCopy.description}</p>
    </header>
    <a className="button button-dark" href={sitePath("/")}>{notFoundCopy.homeAction}</a>
  </main>;
}
