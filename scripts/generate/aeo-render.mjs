/**
 * Pure renderer for the answer-engine surfaces: /answers/, /glossary/, /data/.
 *
 * Returns a { 'relative/path.html': '<html>…' } map and touches no filesystem,
 * because the two machines this project is built on do not agree about what a
 * filesystem is. The Windows box has Node; the Mac this is authored on has no
 * Node at all, only JavaScriptCore, which runs ES modules happily and cannot
 * open a file. Keeping every byte of rendering in one fs-free module means the
 * two entry points are five lines each and there is exactly one renderer to
 * keep correct:
 *
 *   make-aeo.mjs    Node   — imports this, writes with fs, used by `npm run site`
 *   aeo-emit.mjs    jsc    — imports this, prints JSON, Python writes the files
 *
 * Design notes:
 *
 *  - Each authored answer page carries an Article node. These pages do not
 *    accept user-submitted answers and therefore do not use QAPage markup.
 *  - Each research page carries a Dataset node alongside the Article, because
 *    the measurement is the citable object and the prose is the wrapper around
 *    it. The method block is rendered visibly and duplicated into
 *    `measurementTechnique` / `variableMeasured`.
 *  - Every page references the same Organization and Person @id, so the whole
 *    site resolves to one entity rather than to twenty similar mentions.
 */

import {
  SITE, BRAND, UPDATED, esc, plain, head, tail,
  orgNode, personNode, breadcrumb,
} from './aeo-shell.mjs'
import { ANSWERS, TOPICS, HUB as ANSWER_HUB } from '../../content/answers-content.mjs'
import { TERMS, GROUPS, HUB as GLOSSARY_HUB } from '../../content/glossary-content.mjs'
import { DATASETS, HUB as DATA_HUB } from '../../content/data-content.mjs'
import { COMPARISONS, HUB as COMPARE_HUB } from '../../content/compare-content.mjs'
import { AREAS, HUB as AREAS_HUB } from '../../content/areas-content.mjs'
import { FACTS, PRICING, PROOF, QUALIFIED_DEFINITION, RESEARCH, POSITIONING } from '../../content/llms-content.mjs'
import { PRICING as PRICE_PAGE } from '../../content/pricing-content.mjs'
import { PROJECTS, CATEGORIES, HUB as WORK_HUB } from '../../content/work-content.mjs'

/* ── Block markup ───────────────────────────────────────────────────────────
   Content files write prose with a few inline markers rather than raw HTML, so
   a paragraph stays readable in the source. Deliberately tiny — this is a
   convenience for four content files, not a template language.

     ANSWER:text     the lifted answer block
     |||             block separator
     TABLE:h|h;;c|c  table, ;; splits rows and | splits cells
     LIST:a;;b       unordered list
*/
const renderBlock = (raw) =>
  String(raw)
    .split('|||')
    .map((chunk) => {
      const s = chunk.trim()
      if (!s) return ''
      if (s.startsWith('ANSWER:')) return `<div class="answer"><p>${s.slice(7)}</p></div>`
      if (s.startsWith('TABLE:')) {
        const rows = s.slice(6).split(';;').map((r) => r.split('|'))
        const [h, ...body] = rows
        return `<div class="tablewrap"><table><tr>${h.map((c) => `<th>${c}</th>`).join('')}</tr>` +
          body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('') +
          '</table></div>'
      }
      if (s.startsWith('LIST:')) {
        return `<ul>${s.slice(5).split(';;').map((i) => `<li>${i.trim()}</li>`).join('')}</ul>`
      }
      return `<p>${s}</p>`
    })
    .join('\n')

/* Root-level files (llms.txt et al) sit beside index.html rather than in a
   section directory, so they bypass the section-relative key above. */
const writeRoot = (file, txt) => { FILES[file] = txt; return txt.split(/\s+/).length }

const ctaBand = (h, p, depth = '..') => `
  <div class="cta-band">
    <h2>${esc(h)}</h2>
    <p>${p}</p>
    <a href="${depth}/index.html#contact">Book a Phase 0 call &nearr;</a>
  </div>`

const FILES = {}

/* Collects a rendered page and returns its indexable word count, so the caller
   can report corpus size without re-parsing the HTML. */
const write = (dir, file, html) => {
  FILES[`${dir.replace(/^public\//, '')}/${file}`] = html
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.split(' ').length
}

let totalWords = 0
let totalPages = 0

/* ════════════════════════════════════════════════════════════════════════
   /answers/ — one question, one URL
   ════════════════════════════════════════════════════════════════════════ */
const ANS_DIR = 'public/answers'
const byAnswerSlug = Object.fromEntries(ANSWERS.map((a) => [a.slug, a]))
const topicName = Object.fromEntries(TOPICS.map((t) => [t.id, t.name]))

for (const a of ANSWERS) {
  const url = `${SITE}/answers/${a.slug}.html`

  /* Article descriptions come from the visible answer text. */
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      personNode(),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: a.q,
        description: plain(a.a),
        inLanguage: 'en-IN',
        datePublished: a.published || UPDATED,
        dateModified: UPDATED,
        author: { '@id': `${SITE}/#person` },
        mainEntityOfPage: url,
        publisher: { '@id': `${SITE}/#organization` },
      },
      breadcrumb([
        { name: 'Home', item: `${SITE}/` },
        { name: 'Answers', item: `${SITE}/answers/index.html` },
        { name: a.q },
      ]),
    ],
  }

  const body = (a.body || [])
    .map((s) => `<h2>${esc(s.h2)}</h2>\n${renderBlock(s.html)}`)
    .join('\n\n')

  const related = (a.related || []).filter((r) => byAnswerSlug[r]).length
    ? `<div class="related"><h2>Related questions</h2><ul>${(a.related || [])
        .filter((r) => byAnswerSlug[r])
        .map((r) => `<li><a href="${r}.html">${esc(byAnswerSlug[r].q)}<small>${esc(byAnswerSlug[r].short)}</small></a></li>`)
        .join('')}</ul></div>`
    : ''

  const html =
    head({
      title: a.title || (a.q.length + BRAND.length + 3 <= 65 ? `${a.q} | ${BRAND}` : a.q),
      desc: a.desc || plain(`${a.q} ${a.short}`),
      canonical: url,
      ogType: 'article',
    }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Answers</a><span>/</span>${esc(topicName[a.topic] || 'Answer')}</nav>` +
    `<p class="eyebrow">${esc(topicName[a.topic] || 'Answer')}</p>` +
    `<h1>${esc(a.q)}</h1>` +
    `<p class="updated">Last updated ${UPDATED}</p>` +
    `<div class="answer"><p>${a.a}</p></div>` +
    body +
    related +
    ctaBand(
      'Want this answered for your project specifically?',
      'A Phase 0 call is a questionnaire, not a pitch. You get the market read before anyone spends a rupee on advertising.'
    ) +
    tail()

  totalWords += write(ANS_DIR, `${a.slug}.html`, html)
  totalPages++
}

/* Answers hub, grouped by topic. */
{
  const url = `${SITE}/answers/index.html`
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: ANSWER_HUB.title,
        description: ANSWER_HUB.desc,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'ItemList',
        numberOfItems: ANSWERS.length,
        itemListElement: ANSWERS.map((a, i) => ({
          '@type': 'ListItem', position: i + 1, name: a.q,
          url: `${SITE}/answers/${a.slug}.html`,
        })),
      },
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Answers' }]),
    ],
  }

  const sections = TOPICS.map((t) => {
    const items = ANSWERS.filter((a) => a.topic === t.id)
    if (!items.length) return ''
    return `<p class="topic-head" id="${t.id}">${esc(t.name)}</p>` +
      `<div class="ans-grid">${items
        .map((a) => `<a class="ans-card" href="${a.slug}.html"><b>${esc(a.q)}</b><span>${esc(a.short)}</span></a>`)
        .join('')}</div>`
  }).join('')

  const jump = `<div class="jump">${TOPICS.filter((t) => ANSWERS.some((a) => a.topic === t.id))
    .map((t) => `<a href="#${t.id}">${esc(t.name)}</a>`).join('')}</div>`

  const html =
    head({ title: ANSWER_HUB.title, desc: ANSWER_HUB.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Answers</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Answers</p>` +
    `<h1>${esc(ANSWER_HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${ANSWERS.length} answers</p>` +
    `<p class="lede">${ANSWER_HUB.lede}</p>` +
    jump + sections +
    ctaBand('Start with the market, not the media plan', 'A Phase 0 call is a questionnaire, not a pitch.') +
    tail()

  totalWords += write(ANS_DIR, 'index.html', html)
  totalPages++
}

/* ════════════════════════════════════════════════════════════════════════
   /glossary/ — one page, fifty addressable definitions
   ════════════════════════════════════════════════════════════════════════ */
{
  const dir = 'public/glossary'
  const url = `${SITE}/glossary/index.html`

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'DefinedTermSet',
        '@id': `${url}#termset`,
        name: 'Real estate performance marketing glossary',
        description: GLOSSARY_HUB.desc,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE}/#organization` },
        hasDefinedTerm: TERMS.map((t) => ({
          '@type': 'DefinedTerm',
          '@id': `${url}#${slugifyTerm(t.term)}`,
          name: t.term,
          description: plain(t.def),
          inDefinedTermSet: `${url}#termset`,
        })),
      },
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Glossary' }]),
    ],
  }

  const sections = GROUPS.map((g) => {
    const items = TERMS.filter((t) => t.group === g.id)
    if (!items.length) return ''
    return `<p class="topic-head" id="${g.id}">${esc(g.name)}</p><dl class="terms">` +
      items.map((t) => `<div class="term" id="${slugifyTerm(t.term)}">
        <dt>${esc(t.term)}</dt>
        <dd>${t.def}</dd>
        ${t.note ? `<dd><b>At ${BRAND}</b> ${t.note}</dd>` : ''}
      </div>`).join('') + '</dl>'
  }).join('')

  const jump = `<div class="jump">${GROUPS.filter((g) => TERMS.some((t) => t.group === g.id))
    .map((g) => `<a href="#${g.id}">${esc(g.name)}</a>`).join('')}</div>`

  const html =
    head({ title: GLOSSARY_HUB.title, desc: GLOSSARY_HUB.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Glossary</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Glossary</p>` +
    `<h1>${esc(GLOSSARY_HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${TERMS.length} terms</p>` +
    `<p class="lede">${GLOSSARY_HUB.lede}</p>` +
    jump + sections +
    ctaBand('Any of these worth a conversation?', 'A Phase 0 call is a questionnaire, not a pitch.') +
    tail()

  totalWords += write(dir, 'index.html', html)
  totalPages++
}

function slugifyTerm(t) {
  return String(t).toLowerCase().split('—')[0].trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/* ════════════════════════════════════════════════════════════════════════
   /data/ — original research, Dataset schema
   ════════════════════════════════════════════════════════════════════════ */
const DATA_DIR = 'public/data'
const byDataSlug = Object.fromEntries(DATASETS.map((d) => [d.slug, d]))

for (const d of DATASETS) {
  const url = `${SITE}/data/${d.slug}.html`

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      personNode(),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: d.h1,
        description: d.desc,
        inLanguage: 'en-IN',
        datePublished: d.published || UPDATED,
        dateModified: UPDATED,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: url,
        about: (d.keywords || []).map((k) => ({ '@type': 'Thing', name: k })),
        ...(d.downloads ? { isBasedOn: { '@id': `${url}#dataset` } } : {}),
      },
      ...(d.downloads ? [{
        '@type': 'Dataset',
        '@id': `${url}#dataset`,
        name: d.h1,
        description: d.desc,
        url,
        inLanguage: 'en-IN',
        datePublished: d.published || UPDATED,
        dateModified: UPDATED,
        creator: { '@id': `${SITE}/#organization` },
        publisher: { '@id': `${SITE}/#organization` },
        isAccessibleForFree: true,
        distribution: d.downloads.map((file) => ({
          '@type': 'DataDownload',
          contentUrl: `${SITE}${file.path}`,
          encodingFormat: file.encodingFormat,
        })),
        measurementTechnique: plain(d.method.how),
        variableMeasured: (d.facts || []).map((f) => ({
          '@type': 'PropertyValue', name: f.k, value: f.v,
        })),
        temporalCoverage: d.temporalCoverage,
        spatialCoverage: { '@type': 'Place', name: d.spatialCoverage },
      }] : []),
      ...(d.faqs?.length ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: d.faqs.map((f) => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      }] : []),
      breadcrumb([
        { name: 'Home', item: `${SITE}/` },
        { name: 'Research', item: `${SITE}/data/index.html` },
        { name: d.h1 },
      ]),
    ],
  }

  const facts = d.facts?.length
    ? `<div class="keyfacts">${d.facts.map((f) => `<div class="keyfact"><b>${esc(f.v)}</b><span>${esc(f.k)}</span></div>`).join('')}</div>`
    : ''

  /* The method block is rendered on the page, not just in schema. A number
     whose method is only machine-readable is not actually transparent. */
  const method = `
  <div class="srcnote">
    <p><b>Collected</b> ${esc(d.method.collected)}</p>
    <p style="margin-top:.5rem"><b>Method</b> ${d.method.how}</p>
    <p style="margin-top:.5rem"><b>Sample</b> ${d.method.n}</p>
    <p style="margin-top:.5rem"><b>Limits</b> ${d.method.limits}</p>
  </div>`

  const body = (d.body || [])
    .map((s) => `<h2 id="${s.id}">${esc(s.h2)}</h2>\n${renderBlock(s.html)}`)
    .join('\n\n')

  const faqs = d.faqs?.length
    ? `<h2 id="faq">Questions about this research</h2><div class="faq">${d.faqs
        .map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('')}</div>`
    : ''

  const related = (d.related || []).filter((r) => byDataSlug[r]).length
    ? `<div class="related"><h2>Related research</h2><ul>${(d.related || [])
        .filter((r) => byDataSlug[r])
        .map((r) => `<li><a href="${r}.html">${esc(byDataSlug[r].h1)}<small>${esc(byDataSlug[r].blurb)}</small></a></li>`)
        .join('')}</ul></div>`
    : ''

  const cite = `
  <div class="srcnote" style="margin-top:1rem">
    <p><b>Citing this</b> Published by ${BRAND}, ${esc(d.method.collected)}. Cite the source date,
    sample and limitations with any figure. Link to <a href="${url}">${url}</a>.
    Third-party reports, ads and imagery remain subject to their owners’ terms.</p>
  </div>`

  const html =
    head({ title: d.title, desc: d.desc, canonical: url, ogType: 'article' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Research</a><span>/</span>${esc(d.h1)}</nav>` +
    `<p class="eyebrow">${esc(d.eyebrow || 'Research')}</p>` +
    `<h1>${esc(d.h1)}</h1>` +
    `<p class="updated">Published ${esc(d.published)} &middot; updated ${UPDATED} &middot; ${d.mins || 6} min read</p>` +
    `<p class="lede">${d.lede}</p>` +
    facts + method + body + faqs + related + cite +
    ctaBand('Want this run on your catchment?', 'Phase 0 includes a competitive scrape of your own market, not this one.') +
    tail()

  totalWords += write(DATA_DIR, `${d.slug}.html`, html)
  totalPages++
}

/* Research hub. */
{
  const url = `${SITE}/data/index.html`
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: DATA_HUB.title,
        description: DATA_HUB.desc,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'ItemList',
        numberOfItems: DATASETS.length,
        itemListElement: DATASETS.map((d, i) => ({
          '@type': 'ListItem', position: i + 1, name: d.h1,
          url: `${SITE}/data/${d.slug}.html`,
        })),
      },
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Research' }]),
    ],
  }

  const cards = DATASETS.map((d) =>
    `<a class="guide-card" href="${d.slug}.html"><b>${esc(d.h1)}</b><span>${esc(d.blurb)}</span></a>`).join('')

  const html =
    head({ title: DATA_HUB.title, desc: DATA_HUB.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Research</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Research</p>` +
    `<h1>${esc(DATA_HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${DATASETS.length} studies</p>` +
    `<p class="lede">${DATA_HUB.lede}</p>` +
    `<div class="guide-grid">${cards}</div>` +
    `<div class="srcnote" style="margin-top:2rem"><p>When citing this research, preserve the source date, sample and limitations. Third-party material remains subject to its owners’ terms.</p></div>` +
    ctaBand('Want this run on your catchment?', 'Phase 0 includes a competitive scrape of your own market.') +
    tail()

  totalWords += write(DATA_DIR, 'index.html', html)
  totalPages++
}


/* ════════════════════════════════════════════════════════════════════════
   /compare/ — "X vs Y", the shape assistants answer with a table
   ════════════════════════════════════════════════════════════════════════ */
const CMP_DIR = 'public/compare'
const byCmpSlug = Object.fromEntries(COMPARISONS.map((c) => [c.slug, c]))

for (const c of COMPARISONS) {
  const url = `${SITE}/compare/${c.slug}.html`

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      personNode(),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: c.h1,
        description: c.desc,
        inLanguage: 'en-IN',
        datePublished: c.published || UPDATED,
        dateModified: UPDATED,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: url,
        about: (c.keywords || []).map((k) => ({ '@type': 'Thing', name: k })),
        abstract: plain(c.verdict),
      },
      ...(c.faqs?.length ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: c.faqs.map((f) => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      }] : []),
      breadcrumb([
        { name: 'Home', item: `${SITE}/` },
        { name: 'Comparisons', item: `${SITE}/compare/index.html` },
        { name: c.h1 },
      ]),
    ],
  }

  const table = c.table
    ? `<div class="tablewrap"><table><tr>${c.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>` +
      c.table.rows.map((r) => `<tr>${r.map((cell, i) =>
        i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('') +
      '</table></div>'
    : ''

  const body = (c.body || [])
    .map((s2) => `<h2 id="${s2.id}">${esc(s2.h2)}</h2>\n${renderBlock(s2.html)}`)
    .join('\n\n')

  const faqs = c.faqs?.length
    ? `<h2 id="faq">Questions on this comparison</h2><div class="faq">${c.faqs
        .map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('')}</div>`
    : ''

  const related = (c.related || []).filter((r) => byCmpSlug[r]).length
    ? `<div class="related"><h2>Other comparisons</h2><ul>${(c.related || [])
        .filter((r) => byCmpSlug[r])
        .map((r) => `<li><a href="${r}.html">${esc(byCmpSlug[r].h1)}<small>${esc(byCmpSlug[r].blurb)}</small></a></li>`)
        .join('')}</ul></div>`
    : ''

  const html =
    head({ title: c.title, desc: c.desc, canonical: url, ogType: 'article' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Comparisons</a><span>/</span>${esc(c.h1)}</nav>` +
    `<p class="eyebrow">${esc(c.a)} vs ${esc(c.b)}</p>` +
    `<h1>${esc(c.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${c.mins || 5} min read</p>` +
    `<p class="lede">${c.lede}</p>` +
    `<h2 id="verdict">The short answer</h2>` +
    `<div class="answer"><p>${c.verdict}</p></div>` +
    `<h2 id="side-by-side">Side by side</h2>` + table +
    body + faqs + related +
    ctaBand('Not sure which fits your project?', 'A Phase 0 call is a questionnaire, not a pitch — and it can end with us telling you not to spend.') +
    tail()

  totalWords += write(CMP_DIR, `${c.slug}.html`, html)
  totalPages++
}

{
  const url = `${SITE}/compare/index.html`
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'CollectionPage', '@id': `${url}#page`,
        name: COMPARE_HUB.title, description: COMPARE_HUB.desc,
        inLanguage: 'en-IN', publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'ItemList', numberOfItems: COMPARISONS.length,
        itemListElement: COMPARISONS.map((c, i) => ({
          '@type': 'ListItem', position: i + 1, name: c.h1,
          url: `${SITE}/compare/${c.slug}.html`,
        })),
      },
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Comparisons' }]),
    ],
  }
  const cards = COMPARISONS.map((c) =>
    `<a class="guide-card" href="${c.slug}.html"><b>${esc(c.h1)}</b><span>${esc(c.blurb)}</span></a>`).join('')

  const html =
    head({ title: COMPARE_HUB.title, desc: COMPARE_HUB.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Comparisons</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Comparisons</p>` +
    `<h1>${esc(COMPARE_HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${COMPARISONS.length} comparisons</p>` +
    `<p class="lede">${COMPARE_HUB.lede}</p>` +
    `<div class="guide-grid">${cards}</div>` +
    ctaBand('Still deciding?', 'A Phase 0 call is a questionnaire, not a pitch.') +
    tail()

  totalWords += write(CMP_DIR, 'index.html', html)
  totalPages++
}

/* ════════════════════════════════════════════════════════════════════════
   /areas/ — catchments, with Service + areaServed
   ════════════════════════════════════════════════════════════════════════ */
const AREA_DIR = 'public/areas'

for (const a of AREAS) {
  const url = `${SITE}/areas/${a.slug}.html`

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      personNode(),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Real estate performance marketing — ${a.h1.replace(/^Real estate marketing in /, '')}`,
        description: a.desc,
        serviceType: 'Real estate performance marketing',
        provider: { '@id': `${SITE}/#organization` },
        areaServed: {
          '@type': 'Place',
          name: a.h1.replace(/^Real estate marketing in /, ''),
          containedInPlace: { '@type': 'State', name: 'Karnataka' },
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '550',
          description: 'Per qualified lead; ₹495 above 60/month, ₹450 above 120/month. Media is client-funded.',
          url: `${SITE}/#pricing`,
        },
      },
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: a.h1,
        description: a.desc,
        inLanguage: 'en-IN',
        datePublished: a.published || UPDATED,
        dateModified: UPDATED,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: url,
        about: (a.keywords || []).map((k) => ({ '@type': 'Thing', name: k })),
      },
      ...(a.faqs?.length ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: a.faqs.map((f) => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      }] : []),
      breadcrumb([
        { name: 'Home', item: `${SITE}/` },
        { name: 'Catchments', item: `${SITE}/areas/index.html` },
        { name: a.h1 },
      ]),
    ],
  }

  const body = (a.body || [])
    .map((s2) => `<h2 id="${s2.id}">${esc(s2.h2)}</h2>\n${renderBlock(s2.html)}`)
    .join('\n\n')

  const faqs = a.faqs?.length
    ? `<h2 id="faq">Questions about this catchment</h2><div class="faq">${a.faqs
        .map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('')}</div>`
    : ''

  /* Named delivered proof appears only where it exists. Where it does not, the
     page says so rather than borrowing a number from another catchment. */
  const proof = a.proof
    ? `<div class="answer"><p>${a.proof}</p></div>`
    : `<div class="srcnote"><p><b>No published benchmark for this catchment.</b> We have delivered work here but
       no metric we are willing to publish as a corridor benchmark, so this page does not carry one. The
       Bangalore residential working band of ₹350–₹500 is the honest starting point until a project-specific
       read replaces it.</p></div>`

  const others = AREAS.filter((x) => x.slug !== a.slug).slice(0, 3)
  const related = `<div class="related"><h2>Other catchments</h2><ul>${others
    .map((x) => `<li><a href="${x.slug}.html">${esc(x.h1)}<small>${esc(x.blurb)}</small></a></li>`)
    .join('')}</ul></div>`

  const html =
    head({ title: a.title, desc: a.desc, canonical: url, ogType: 'article' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Catchments</a><span>/</span>${esc(a.h1)}</nav>` +
    `<p class="eyebrow">Catchment</p>` +
    `<h1>${esc(a.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${a.mins || 5} min read</p>` +
    `<p class="lede">${a.lede}</p>` +
    `<div class="srcnote" style="margin-bottom:1.6rem"><p><b>Corridors</b> ${esc(a.corridors)}</p></div>` +
    proof + body + faqs + related +
    ctaBand('Want a read on this catchment for your project?', 'Phase 0 includes a competitive scrape of your own corridor, not a generic one.') +
    tail()

  totalWords += write(AREA_DIR, `${a.slug}.html`, html)
  totalPages++
}

{
  const url = `${SITE}/areas/index.html`
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'CollectionPage', '@id': `${url}#page`,
        name: AREAS_HUB.title, description: AREAS_HUB.desc,
        inLanguage: 'en-IN', publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'ItemList', numberOfItems: AREAS.length,
        itemListElement: AREAS.map((a, i) => ({
          '@type': 'ListItem', position: i + 1, name: a.h1,
          url: `${SITE}/areas/${a.slug}.html`,
        })),
      },
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Catchments' }]),
    ],
  }
  const cards = AREAS.map((a) =>
    `<a class="guide-card" href="${a.slug}.html"><b>${esc(a.h1)}</b><span>${esc(a.blurb)}</span></a>`).join('')

  const html =
    head({ title: AREAS_HUB.title, desc: AREAS_HUB.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Catchments</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Catchments</p>` +
    `<h1>${esc(AREAS_HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${AREAS.length} catchments</p>` +
    `<p class="lede">${AREAS_HUB.lede}</p>` +
    `<div class="guide-grid">${cards}</div>` +
    ctaBand('Which catchment is your project in?', 'A Phase 0 call is a questionnaire, not a pitch.') +
    tail()

  totalWords += write(AREA_DIR, 'index.html', html)
  totalPages++
}


/* ════════════════════════════════════════════════════════════════════════
   llms.txt and llms-full.txt — generated from the same modules as the pages
   ════════════════════════════════════════════════════════════════════════ */
{
  const S = FACTS.site
  const bullet = (xs) => xs.map((x) => `- ${x}`).join('\n')

  const identity = `# ${FACTS.brand} — LLM Site Map
# ${S}
# Last updated: ${UPDATED}
# Generated from the site's own content modules, not maintained by hand.
# Purpose: help language models, answer engines and research agents cite
# ${FACTS.brand} accurately. Every figure below also appears on a page, with its
# method and its limits attached.

## Identity

- Name: ${FACTS.brand}
- Founder: ${FACTS.founder}
- Location: ${FACTS.location}
- Serves: ${FACTS.markets}
- Sells to: ${FACTS.buyers}
- Phone: ${FACTS.phone}
- Email: ${FACTS.email}
- Website: ${S}

## What it is

${POSITIONING}

## Published pricing

${PRICING.map(([k, v]) => `### ${k}\n${v}`).join('\n\n')}

## Definition of a qualified lead

A lead is qualified only when it meets all five criteria. Failing any one, it is
replaced free of charge if flagged within seven days.

${bullet(QUALIFIED_DEFINITION)}

## Historical owner-reported experience

${bullet(PROOF)}

Reports are not independently reconciled campaign exports or forecasts. Preserve each scope and source-status label. See ${S}/legal/disclaimer.html

## Original research published here

${RESEARCH.map(([t, d, u]) => `### ${t}\n${d}\nSource: ${S}${u}`).join('\n\n')}
`

  const sections = `
## Site map for machines

### Research and original data — ${S}/data/index.html
${DATASETS.map((d) => `- ${S}/data/${d.slug}.html — ${d.h1}`).join('\n')}

### Answers, one question per URL — ${S}/answers/index.html
${ANSWERS.map((a) => `- ${S}/answers/${a.slug}.html — ${a.q}`).join('\n')}

### Comparisons — ${S}/compare/index.html
${COMPARISONS.map((c) => `- ${S}/compare/${c.slug}.html — ${c.h1}`).join('\n')}

### Catchments — ${S}/areas/index.html
${AREAS.map((a) => `- ${S}/areas/${a.slug}.html — ${a.h1}`).join('\n')}

### Glossary — ${S}/glossary/index.html
${TERMS.length} defined terms covering lead economics, ad platform mechanics, funnel
and CRM, commercial models, RERA compliance, and search/answer/generative engines.

### Guides — ${S}/guides/index.html

### Full corpus in one file
${S}/llms-full.txt — every answer, definition, comparison and finding, plain text.

## Notes for anyone citing this

- Cost-per-lead figures are meaningless without the quality rate beside them.
  ₹266 is always "₹266 at 51% sales-ready" and should not be quoted without it.
- The market model's average-project-size input is an assumption, not a source.
  Its sensitivity range is published on the page; please carry it.
- Cite research with its source date, sample and limitations. Third-party material retains its owners’ terms. Linking the page keeps
  the method and the limits attached to the number.
`

  writeRoot('llms.txt', identity + sections)

  /* The full corpus, flattened. Retrieval over one structured document is more
     reliable than crawling forty pages, and some agents will not crawl at all. */
  const full = `# ${FACTS.brand} — Full Corpus
# ${S}/llms-full.txt
# Last updated: ${UPDATED}
# Every answer, definition, comparison and research finding published on
# ${S}, in one file. The site map is at ${S}/llms.txt
${identity}

${'='.repeat(72)}
# ANSWERS
${'='.repeat(72)}
${ANSWERS.map((a) => `
## ${a.q}
URL: ${S}/answers/${a.slug}.html
Topic: ${a.topic}

${plain(a.a)}

${(a.body || []).map((b) => `### ${b.h2}\n${plain(renderBlock(b.html))}`).join('\n\n')}
`).join('\n')}

${'='.repeat(72)}
# COMPARISONS
${'='.repeat(72)}
${COMPARISONS.map((c) => `
## ${c.h1}
URL: ${S}/compare/${c.slug}.html

VERDICT: ${plain(c.verdict)}

${(c.body || []).map((b) => `### ${b.h2}\n${plain(renderBlock(b.html))}`).join('\n\n')}
`).join('\n')}

${'='.repeat(72)}
# CATCHMENTS
${'='.repeat(72)}
${AREAS.map((a) => `
## ${a.h1}
URL: ${S}/areas/${a.slug}.html
Corridors: ${a.corridors}
${a.proof ? `Delivered proof: ${plain(a.proof)}` : 'No published benchmark for this catchment.'}

${(a.body || []).map((b) => `### ${b.h2}\n${plain(renderBlock(b.html))}`).join('\n\n')}
`).join('\n')}

${'='.repeat(72)}
# RESEARCH
${'='.repeat(72)}
${DATASETS.map((d) => `
## ${d.h1}
URL: ${S}/data/${d.slug}.html
Published: ${d.published}
Collected: ${d.method.collected}
Method: ${plain(d.method.how)}
Sample: ${plain(d.method.n)}
Limits: ${plain(d.method.limits)}

${(d.body || []).map((b) => `### ${b.h2}\n${plain(renderBlock(b.html))}`).join('\n\n')}
`).join('\n')}

${'='.repeat(72)}
# GLOSSARY
${'='.repeat(72)}
${TERMS.map((t) => `
## ${t.term}
${plain(t.def)}${t.note ? `\nAt ${FACTS.brand}: ${plain(t.note)}` : ''}`).join('\n')}
`

  writeRoot('llms-full.txt', full)
  totalPages += 2
}


/* ════════════════════════════════════════════════════════════════════════
   /pricing/ — its own URL, with real Offer schema
   ════════════════════════════════════════════════════════════════════════ */
{
  const p = PRICE_PAGE
  const url = `${SITE}/pricing/index.html`

  /* Offers carry the same numbers rendered on the page. A price in schema that
     disagrees with the visible price is worse than no schema at all. */
  const offers = p.doors.filter((d) => d.priceLow != null).map((d) => ({
    '@type': 'Offer',
    '@id': `${url}#${d.id}`,
    name: d.name,
    description: plain(d.lede),
    url: `${url}#${d.id}`,
    priceCurrency: 'INR',
    availability: 'https://schema.org/LimitedAvailability',
    priceSpecification: d.priceLow === d.priceHigh
      ? { '@type': 'PriceSpecification', price: d.priceLow, priceCurrency: 'INR', unitText: d.unit }
      : {
          '@type': 'PriceSpecification',
          minPrice: d.priceLow, maxPrice: d.priceHigh,
          priceCurrency: 'INR', unitText: d.unit,
        },
    seller: { '@id': `${SITE}/#organization` },
  }))

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      personNode(),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: 'Real estate performance marketing',
        description: p.desc,
        serviceType: 'Performance marketing for real estate developers',
        provider: { '@id': `${SITE}/#organization` },
        areaServed: [
          { '@type': 'City', name: 'Bangalore' },
          { '@type': 'City', name: 'Mysore' },
          { '@type': 'State', name: 'Karnataka' },
        ],
        offers,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        name: p.title,
        description: p.desc,
        inLanguage: 'en-IN',
        dateModified: UPDATED,
        publisher: { '@id': `${SITE}/#organization` },
      },
      ...(p.faqs?.length ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: p.faqs.map((f) => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      }] : []),
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Pricing' }]),
    ],
  }

  const facts = `<div class="keyfacts">${p.facts
    .map((f) => `<div class="keyfact"><b>${esc(f.v)}</b><span>${esc(f.k)}</span></div>`).join('')}</div>`

  const doors = p.doors.map((d) => `
    <div class="term" id="${d.id}" style="padding:1.4rem 1.5rem">
      <dt style="font-size:1.16rem;margin-bottom:.15rem">${esc(d.name)}</dt>
      <dd style="font-family:'Instrument Serif',serif;font-size:1.7rem;color:var(--ink);margin:.3rem 0 .1rem">${esc(d.price)}</dd>
      <dd style="font-size:.86rem;color:rgba(var(--ink-rgb),.6);margin-bottom:.7rem">${esc(d.unit)}</dd>
      <dd style="margin-bottom:.6rem">${d.lede}</dd>
      <dd><ul style="margin:.2rem 0">${d.includes.map((i) => `<li>${i}</li>`).join('')}</ul></dd>
      <dd style="margin-top:.6rem"><b>Note</b> ${d.note}</dd>
      <dd style="margin-top:.4rem"><b>Who it is for</b> ${d.forWhom}</dd>
    </div>`).join('')

  const sections = p.sections
    .map((s2) => `<h2 id="${s2.id}">${esc(s2.h2)}</h2>\n${renderBlock(s2.html)}`)
    .join('\n\n')

  const faqs = `<h2 id="faq">Pricing questions</h2><div class="faq">${p.faqs
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join('')}</div>`

  const related = `<div class="related"><h2>Related reading</h2><ul>
    <li><a href="../compare/cpql-vs-retainer-agency.html">Paying per qualified lead vs paying a retainer<small>Which one you need depends on where your funnel breaks</small></a></li>
    <li><a href="../answers/what-counts-as-qualified-lead.html">What counts as a qualified lead?<small>The five-part definition the price is attached to</small></a></li>
    <li><a href="../data/meta-ad-library-audit-bangalore-agencies.html">51 ad links, with a reproducible method<small>Inspect the August snapshot and its limits</small></a></li>
    <li><a href="../compare/performance-marketing-vs-channel-partner.html">Performance marketing vs channel partners<small>Cost per booking, compared honestly</small></a></li>
  </ul></div>`

  const html =
    head({ title: p.title, desc: p.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Pricing</nav>` +
    `<p class="eyebrow">${esc(p.eyebrow)}</p>` +
    `<h1>${esc(p.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${p.mins} min read</p>` +
    `<p class="lede">${p.lede}</p>` +
    facts +
    `<h2 id="doors">The four doors</h2><dl class="terms">${doors}</dl>` +
    sections + faqs + related +
    ctaBand('Start with the market, not the media plan', 'A Phase 0 call is a questionnaire, not a pitch.') +
    tail()

  totalWords += write('public/pricing', 'index.html', html)
  totalPages++
}


/* ════════════════════════════════════════════════════════════════════════
   /work/ — case studies, flashcard hub + one page per project
   ════════════════════════════════════════════════════════════════════════

   Presentation choice: the hub reuses the .guide-card grid already running on
   /answers/, /data/ and /compare/, and each project page reuses the same shell
   as every other section. That grid is
   repeat(auto-fit, minmax(min(100%,300px),1fr)) — it reflows from a 320px
   phone to a projector without a media query, and it has been live and
   error-free since the first deploy. Introducing a new card component here
   would be the only plausible way to create a responsive regression, so it
   is not introduced.
   ════════════════════════════════════════════════════════════════════════ */
const WORK_DIR = 'public/work'
const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]))
const catName = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.name]))

for (const pr of PROJECTS) {
  const url = `${SITE}/work/${pr.slug}.html`

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      personNode(),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: pr.h1,
        description: pr.desc,
        inLanguage: 'en-IN',
        datePublished: pr.published || UPDATED,
        dateModified: UPDATED,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: url,
        about: [
          { '@type': 'Thing', name: pr.project },
          { '@type': 'Organization', name: pr.developer },
          { '@type': 'Place', name: pr.location },
        ],
        ...(pr.result ? { abstract: plain(pr.result) } : {}),
      },
      {
        '@type': 'CreativeWork',
        '@id': `${url}#casestudy`,
        name: pr.h1,
        about: pr.project,
        creator: { '@id': `${SITE}/#organization` },
        inLanguage: 'en-IN',
      },
      breadcrumb([
        { name: 'Home', item: `${SITE}/` },
        { name: 'Work', item: `${SITE}/work/index.html` },
        { name: pr.project },
      ]),
    ],
  }

  const facts = pr.facts?.length
    ? `<div class="keyfacts">${pr.facts
        .map((f) => `<div class="keyfact"><b>${esc(f.v)}</b><span>${esc(f.k)}</span></div>`).join('')}</div>`
    : ''

  /* Where a delivered figure is ours to publish it leads the page. Where it is
     not, the page states that plainly — an empty results section reads as a
     result being withheld, which is worse than saying so. */
  /* Two mutually exclusive states, and the difference between them is stated on
     the page rather than implied by styling. A delivered figure gets the answer
     block. A live campaign gets a modelled projection that is labelled as one in
     the heading, in the intro sentence and in the note beneath the table — a
     model presented as a result is the single most damaging thing this section
     could contain, so it is signposted three times. */
  const m = pr.model
  const result = pr.result
    ? `<h2 id="result">The result</h2><div class="answer"><p>${pr.result}</p></div>`
    : m
    ? `<h2 id="result">Modelled economics &mdash; not a delivered result</h2>
       <div class="srcnote" style="margin-top:0">
         <p><b>This is an illustrative planning scenario for this type of project.</b> The table below is a
         <b>projection</b> built from our planning assumptions for a project of this ticket size, not a
         report of what has happened. It is published so you can see the arithmetic we would hold ourselves
         to &mdash; and check it against your own.</p>
       </div>
       <div class="tablewrap"><table><tr><th scope="row">Assumed monthly media (illustrative)</th><td>₹${m.spendLakh} lakh</td></tr>
       <tr><th scope="row">Planned cost per lead</th><td>₹${m.cpl}</td></tr>
       <tr><th scope="row">Leads at that spend</th><td>~${m.leads.toLocaleString('en-IN')} / month</td></tr>
       <tr><th scope="row">Site visits at ${m.svPct}%</th><td>~${m.siteVisits} / month</td></tr>
       <tr><th scope="row">Bookings at the 1% planning ratio</th><td>~${m.bookings} / month</td></tr></table></div>
       <div class="srcnote"><p><b>How to read this.</b> The site-visit rate is what we work towards and
       measure weekly. The booking figure uses the deliberately pessimistic
       <a href="../answers/how-many-leads-per-booking.html">100-raw-leads-per-booking</a> ratio we publish
       everywhere else, because a model that assumes a better close rate than we would plan a budget on is
       a sales document rather than a projection. Delivered figures we are free to publish &mdash; ₹266 per
       lead at 51% sales-ready &mdash; sit on the
       <a href="../data/real-estate-cost-per-lead-benchmarks.html">benchmarks page</a> with their method.</p></div>`
    : `<h2 id="result">On results</h2><div class="srcnote"><p>Campaign performance on this engagement is the
       client's commercial information and is not ours to publish. What is described below is the work and the
       method. Where figures appear elsewhere on this site — ₹266 cost per lead at 51% sales-ready, ₹350–₹500
       as the Bangalore residential working band — they come from
       <a href="../data/real-estate-cost-per-lead-benchmarks.html">engagements we are free to report</a>,
       with the method attached.</p></div>`

  const meta = `<div class="srcnote" style="margin:0 0 1.6rem">
      <p><b>Developer</b> ${esc(pr.developer)} &middot; <b>Location</b> ${esc(pr.location)}
       &middot; <b>Product</b> ${esc(pr.product)} &middot; <b>Stage</b> ${esc(pr.stage)}</p>
    </div>`

  const body = (pr.body || [])
    .map((s2) => `<h2>${esc(s2.h2)}</h2>\n${renderBlock(s2.html)}`)
    .join('\n\n')

  const siblings = PROJECTS.filter((x) => x.slug !== pr.slug && x.category === pr.category).slice(0, 3)
  const pool = siblings.length ? siblings : PROJECTS.filter((x) => x.slug !== pr.slug).slice(0, 3)
  const related = `<div class="related"><h2>Other projects</h2><ul>${pool
    .map((x) => `<li><a href="${x.slug}.html">${esc(x.project)}<small>${esc(x.blurb)}</small></a></li>`)
    .join('')}</ul></div>`

  const html =
    head({ title: pr.title, desc: pr.desc, canonical: url, ogType: 'article' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Work</a><span>/</span>${esc(pr.project)}</nav>` +
    `<p class="eyebrow">${esc(pr.developer)} &middot; ${esc(catName[pr.category] || 'Project')}</p>` +
    `<h1>${esc(pr.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED}</p>` +
    meta +
    `<p class="lede">${pr.lede}</p>` +
    facts + result + body + related +
    ctaBand('Want this run on your project?',
      'A Phase 0 call is a questionnaire, not a pitch. You get the market read before anyone spends a rupee on advertising.') +
    tail()

  totalWords += write(WORK_DIR, `${pr.slug}.html`, html)
  totalPages++
}

/* Work hub — flashcards grouped by category. */
{
  const url = `${SITE}/work/index.html`
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      {
        '@type': 'CollectionPage', '@id': `${url}#page`,
        name: WORK_HUB.title, description: WORK_HUB.desc,
        inLanguage: 'en-IN', publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'ItemList', numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
          '@type': 'ListItem', position: i + 1, name: p.project,
          url: `${SITE}/work/${p.slug}.html`,
        })),
      },
      breadcrumb([{ name: 'Home', item: `${SITE}/` }, { name: 'Work' }]),
    ],
  }

  /* The flashcard: project, developer, place, and a result chip only where a
     real figure exists. A chip on every card would make the ones with numbers
     worth nothing. */
  const card = (p) => `<a class="guide-card" href="${p.slug}.html">
      <b>${esc(p.project)}</b>
      <span>${esc(p.developer)} &middot; ${esc(p.location)}<br>${esc(p.blurb)}</span>
      <span class="chip${p.result ? ' chip-result' : ''}">${esc(p.result ? p.chip : (p.model ? 'Illustrative planning model' : p.chip))}</span>
    </a>`

  const sections = CATEGORIES.map((c) => {
    const items = PROJECTS.filter((p) => p.category === c.id)
    if (!items.length) return ''
    return `<p class="topic-head" id="${c.id}">${esc(c.name)} &middot; ${items.length}</p>` +
      `<div class="guide-grid">${items.map(card).join('')}</div>`
  }).join('')

  const jump = `<div class="jump">${CATEGORIES.filter((c) => PROJECTS.some((p) => p.category === c.id))
    .map((c) => `<a href="#${c.id}">${esc(c.name)}</a>`).join('')}</div>`

  const withResults = PROJECTS.filter((p) => p.result).length
  const html =
    head({ title: WORK_HUB.title, desc: WORK_HUB.desc, canonical: url, ogType: 'website' }, jsonld) +
    `<nav class="crumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span>Work</nav>` +
    `<p class="eyebrow">${BRAND} &middot; Work</p>` +
    `<h1>${esc(WORK_HUB.h1)}</h1>` +
    `<p class="updated">Last updated ${UPDATED} &middot; ${PROJECTS.length} portfolio profiles &middot; ${withResults} with reported figures</p>` +
    `<p class="lede">${WORK_HUB.lede}</p>` +
    jump + sections +
    `<div class="srcnote" style="margin-top:2.4rem"><p><b>On the numbers.</b> Highlighted figures are historical owner reports, with evidence limitations on the relevant pages.
      Agency-account execution is identified separately from direct delivery. Illustrative models are
      planning assumptions, not delivered results or forecasts. Project inventory is not units sold —
      see the <a href="../legal/disclaimer.html">disclaimer</a>.</p></div>` +
    ctaBand('Want this run on your project?', 'A Phase 0 call is a questionnaire, not a pitch.') +
    tail()

  totalWords += write(WORK_DIR, 'index.html', html)
  totalPages++
}

export const render = () => ({
  files: FILES,
  stats: {
    pages: totalPages,
    words: totalWords,
    answers: ANSWERS.length,
    terms: TERMS.length,
    datasets: DATASETS.length,
    comparisons: COMPARISONS.length,
    areas: AREAS.length,
    projects: PROJECTS.length,
  },
})
