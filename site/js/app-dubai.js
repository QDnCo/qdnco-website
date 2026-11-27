/* Generated from site/dubai/index.html (inline app script moved out in Phase 1). Loaded with defer after the vendor scripts. */
window.Motion = window.Motion || window.FramerMotion;
 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
const { useRef, useEffect, useState, useCallback } = React;
const { motion, useScroll, useTransform } = window.Motion;

/* ═══════════ SHARED ═══════════ */

const ArrowUpRight = ({ className }) => (
  React.createElement('svg', { className: className, width: "24", height: "24", viewBox: "0 0 24 24"   , fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round",}
    , React.createElement('path', { d: "M7 17L17 7"  ,}), React.createElement('path', { d: "M7 7h10v10" ,})
  )
);
const Play = ({ className }) => (
  React.createElement('svg', { className: className, width: "24", height: "24", viewBox: "0 0 24 24"   , fill: "currentColor",}, React.createElement('polygon', { points: "6 4 20 12 6 20 6 4"       ,}))
);
const Mail = ({ className }) => (
  React.createElement('svg', { className: className, width: "24", height: "24", viewBox: "0 0 24 24"   , fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round",}
    , React.createElement('rect', { x: "2", y: "4", width: "20", height: "16", rx: "2",}), React.createElement('path', { d: "m2 7 10 6 10-6"    ,})
  )
);
const PhoneIcon = ({ className }) => (
  React.createElement('svg', { className: className, width: "24", height: "24", viewBox: "0 0 24 24"   , fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round",}
    , React.createElement('path', { d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z"                                                              ,})
  )
);
const WhatsAppIcon = ({ className }) => (
  React.createElement('svg', { className: className, width: "24", height: "24", viewBox: "0 0 24 24"   , fill: "currentColor",}
    , React.createElement('path', { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.93-4.4-.14-.2-1.17-1.56-1.17-2.97 0-1.41.74-2.11 1-2.4.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.17 0 .41-.07.64.49.24.58.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.09 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38Z"                                                 ,})
  )
);
const LinkedInIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",})
  )
);

const InstagramIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",})
  )
);

const FacebookIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",})
  )
);

const GoogleIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",})
  )
);

const XIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",})
  )
);

const RedditIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z",})
  )
);

const ThreadsIcon = ({ className, style }) => (
  React.createElement('svg', { className: className, style: style, width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", 'aria-hidden': "true", focusable: "false",}
    , React.createElement('path', { d: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",})
  )
);

/* QDnCo's public profiles, in the order the footer shows them. */
const SOCIAL_LINKS = [
  { title: 'LinkedIn', label: 'QDnCo on LinkedIn', href: 'https://www.linkedin.com/company/qd-co/', Icon: LinkedInIcon },
  { title: 'Instagram', label: 'QDnCo on Instagram', href: 'https://www.instagram.com/qdnco.official/', Icon: InstagramIcon },
  { title: 'Facebook', label: 'QDnCo on Facebook', href: 'https://www.facebook.com/qdnco', Icon: FacebookIcon },
  { title: 'X', label: 'QDnCo on X', href: 'https://x.com/qdnco_official', Icon: XIcon },
  { title: 'Reddit', label: 'QDnCo on Reddit', href: 'https://www.reddit.com/user/qdnco/', Icon: RedditIcon },
  { title: 'Threads', label: 'QDnCo on Threads', href: 'https://www.threads.com/@qdnco.official', Icon: ThreadsIcon },
  { title: 'Google reviews', label: 'QDnCo Google reviews', href: 'https://share.google/FodoeqQ5BsOYxikAz', Icon: GoogleIcon },
];

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className, style }) {
  return (
    React.createElement(motion.div, { className: className, style: style,
      initial: { opacity: 0, x, y },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, margin: '50px', amount: 0 },
      transition: { delay, duration, ease: [0.25, 0.1, 0.25, 1] },}
, children)
  );
}

/* Opacity-only entrance for anything whose final position must be guaranteed —
   a stuck transform must never be able to push it past the fold. */
const fadeOnly = (delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
});

const riseIn = (delay) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
});

/* ═══════════ BRAND KIT ═══════════
   Logos downloaded from each brand's own site into /brands/.
   `site: null` = no public website found; renders a wordmark instead. */
/* `ar` = intrinsic aspect ratio (w/h), read off each file. indium.svg carries a
   viewBox with no width/height, so width:auto would collapse it to zero — every
   mark therefore gets an explicit box. `scale` balances tall marks against wide
   ones so the logo wall reads evenly. */
const BRANDS = {
bhartiya: {"name": "Bhartiya City", "logo": "/brands/bhartiya.png", "ar": 1.956989247311828, "scale": 1, "site": "https://bhartiyacity.com/", "domain": "bhartiyacity.com", "shot": "/shots/bhartiya-hero.png", "invert": false} ,
nambiar: {"name": "Nambiar Builders", "logo": "/brands/nambiar.svg", "ar": 3, "scale": 1, "site": "https://nambiarbuilders.com/", "domain": "nambiarbuilders.com", "shot": "/shots/nambiar-hero.png?v=20260923-hero", "invert": false} ,
urbanrise: {"name": "Urbanrise", "logo": "/brands/urbanrise.png", "ar": 3, "scale": 1, "site": "https://www.urbanrise.in/", "domain": "urbanrise.in", "shot": "/shots/urbanrise-hero.png", "invert": false} ,
vajram: {"name": "Vajram Group", "logo": "/brands/vajram.webp", "ar": 3, "scale": 1, "site": "https://www.vajramgroup.com/", "domain": "vajramgroup.com", "shot": "/shots/vajram-hero.png", "invert": false} ,

  indium:     { name: 'Indium Group',         logo: '/brands/indium.png',     logoWhite: '/brands/indium-white.png',         ar: 378/133,     scale: 1.05, site: 'https://indiumgroup.com/',          domain: 'indiumgroup.com',      shot: '/shots/indium.jpg',            invert: false },
  brigade:    { name: 'Brigade Group',        logo: '/brands/brigade.png',    ar: 88/101,      scale: 1.35, site: 'https://www.brigadegroup.com/',     domain: 'brigadegroup.com',     shot: '/shots/brigade.jpg',           invert: true },
  kumar:      { name: 'Kumar Properties',     logo: '/brands/kumar.png',      ar: 4500/867,    scale: 0.85, site: 'https://kumarsproperties.com/',     domain: 'kumarsproperties.com', shot: '/shots/kumar.jpg',             invert: true },
  woodscapes: { name: 'Godrej Properties',    logo: '/brands/godrej.svg',     ar: 213/44,      scale: 0.92, site: 'https://www.godrejproperties.com/bengaluru/residential/godrej-woodscapes',        domain: 'godrejproperties.com', shot: '/shots/godrej-woodscapes.jpg', invert: true },
  tiara:      { name: 'Godrej Properties',    logo: '/brands/godrej.svg',     ar: 213/44,      scale: 0.92, site: 'https://www.godrejproperties.com/bengaluru/residential/godrej-tiara',             domain: 'godrejproperties.com', shot: '/shots/godrej-tiara.jpg',      invert: true },
  msr:        { name: 'Godrej Properties',    logo: '/brands/godrej.svg',     ar: 213/44,      scale: 0.92, site: 'https://www.godrejproperties.com/bengaluru/residential/barca-at-godrej-msr-city', domain: 'godrejproperties.com', shot: '/shots/godrej-msr.jpg',        invert: true },
  /* Ships as a dark-background lockup — the wordmark is white in the source art.
     Forcing it onto the light chip means inverting the wordmark to ink while the
     icon block keeps its own colours, and the result reads wrong. `darkLockup`
     tells BrandMark to skip the chip and use the white asset everywhere. */
  /* Built by make-vaishnavi.mjs from the logo the client supplied. Two
     monochrome cuts, ink and white, with the tick knocked out of the plate so
     the page shows through it — neither theme needs a CSS filter: darkLockup
     keeps it off the light chip, and logoWhite is chosen on dark grounds. */
  vaishnavi:  { name: 'Vaishnavi Group',      logo: '/brands/vaishnavi.svg',  logoWhite: '/brands/vaishnavi-white.svg',      ar: 4.8659,      scale: 0.72, site: 'https://www.vaishnavigroup.com/', domain: 'vaishnavigroup.com', shot: '/shots/vaishnavi.jpg',        invert: false, darkLockup: true },
  roboprenr:  { name: 'Roboprenr',            logo: '/brands/roboprenr.png',  ar: 500/146,     scale: 1.00, site: 'https://roboprenr.com/',            domain: 'roboprenr.com',        shot: '/shots/roboprenr.jpg',         invert: true },
  /* logo_white.png is already white — inverting it would turn it black. */
  logic:      { name: 'Logic Launch',         logo: '/brands/logiclaunch.png', logoWhite: '/brands/logiclaunch-white.png', ar: 1580/632,   scale: 1.30, site: 'https://logiclaunch.in/en-us/',     domain: 'logiclaunch.in',       shot: '/shots/logiclaunch.jpg',       invert: false },
  /* Netri's logo asset 404s on their host, so this one renders as a wordmark. */
  marga:      { name: 'Marga Education',      logo: '/brands/marga.png',      logoWhite: '/brands/marga-white.png',          ar: 536/324,     scale: 1.12, site: null,                                domain: null,                   shot: null },
  netri:      { name: 'Netri Academy',        logo: '/brands/netri.png',      logoWhite: '/brands/netri-white.png',          ar: 900/247,     scale: 1.00, invert: true,                                                   site: 'https://netriacademy.com/',         domain: 'netriacademy.com',     shot: '/shots/netri.jpg' },
};

/**
 * `plate` renders the logo in its real brand colours on a light chip. Most of
 * these marks are dark ink (Godrej is #141414, Kumar and LogicLaunch are dark
 * blues) so they would disappear if dropped straight onto the dark page —
 * the chip is what lets true brand colour show instead of a white silhouette.
 */
function BrandMark({ b, h = 34, ink = false, plate: wantPlate = false, lockTier = false }) {
  const [failed, setFailed] = useState(false);
  if (b.name === 'Vajram Group') return (
    React.createElement('span', { className: "vajram-logo-frame", style: {width:h*3.25,height:h*1.95},}
      , React.createElement('img', { src: b.logo, alt: "Vajram Group logo"  , draggable: false,} )
    )
  );
  /* darkLockup brands ship separate ink + white cuts. Always allow the light
     chip; never put the white cut on a light chip (wordmark would vanish and
     leave only a fragment of the tick). */
  const plate = wantPlate;
  const scale = b.scale || 1;
  const hPx = lockTier ? null : h;
  const boxH = lockTier ? `calc(var(--brand-mark-h) * ${scale})` : h * scale;
  const boxW = lockTier ? `calc(var(--brand-mark-h) * ${scale} * ${b.ar})` : h * scale * b.ar;
  const wordSize = (hPx || 34) * 0.46;

  if (!b.logo || failed) {
    const word = (
      React.createElement('span', { className: "font-kanit font-semibold uppercase whitespace-nowrap"   ,
            style: { color: plate || ink ? '#0A0D12' : 'var(--ink-body)', fontSize: wordSize, letterSpacing: '0.08em' },}
        , b.name
      )
    );
    if (!plate) return word;
    return (
      React.createElement('span', { className: "inline-flex items-center rounded-lg"  , style: { background: '#F3F6F8', padding: `${(hPx || 34) * 0.2}px ${(hPx || 34) * 0.34}px` },}
        , word
      )
    );
  }

  /* White cut only on dark grounds. Ink / plate / ink-forced → ink asset.
     No brightness(0) filter: the ink cut carries a black plate, white tick and
     black wordmark — flattening would erase the tick. */
  const useWhite = !plate && !ink && b.logoWhite;
  const img = (
    React.createElement('img', { src: useWhite ? b.logoWhite : b.logo, alt: b.name + ' logo', draggable: false,
         onError: () => setFailed(true),
         className: plate || useWhite ? 'logo-ink' : (b.invert && !ink ? 'logo-white' : 'logo-ink'),
         style: { height: boxH, width: boxW, objectFit: 'contain', flexShrink: 0 },} )
  );

  if (!plate) return img;
  const padBase = hPx || 34;
  return (
    React.createElement('span', { className: "inline-flex items-center justify-center rounded-lg shrink-0"    ,
          style: { background: '#F3F6F8', padding: `${Math.round(padBase * 0.22)}px ${Math.round(padBase * 0.3)}px`,
                   boxShadow: '0 2px 10px -2px rgba(0,0,0,0.5)' },}
      , img
    )
  );
}

/* ═══════════ 1. HERO — V3 cinematic ═══════════ */

/* `as` exists so the hero line can be the document's h1 without giving up the
   per-word reveal. It is the page's actual proposition, and the h1 is the most
   heavily weighted tag on it — spending that on a greeting was waste. */
function BlurText({ text, className, style, as: Tag = 'p' }) {
  const ref = useRef(null), [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    React.createElement(Tag, { ref: ref, className: className, style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em', ...style },}
      , text.split(' ').map((w, i) => (
        /* The trailing space is deliberate and load-bearing. Word spacing here
           is margin, not whitespace, so without it the markup reads
           <span>Real</span><span>Estate</span> and any text extractor that
           strips tags — which is every AI crawler, none of which run CSS —
           gets "RealEstate...". A whitespace-only text node between flex items
           is never rendered, so the layout is untouched. */
        React.createElement(React.Fragment, { key: i,}
          , React.createElement(motion.span, { style: { display: 'inline-block', marginRight: '0.28em' },
            initial: { filter: 'blur(10px)', opacity: 0, y: 50 },
            animate: show ? { filter: ['blur(10px)','blur(5px)','blur(0px)'], opacity: [0,0.5,1], y: [50,-5,0] } : {},
            transition: { duration: 0.7, times: [0,0.5,1], ease: 'easeOut', delay: (i * 100) / 1000 },}
, w), ' '
        )
      ))
    )
  );
}

/* What is actually running right now. Loops forever inside a fixed-width window. */
const LIVE_NOW = [
  "Brigade Eternia",
  "Brigade Granada",
  "Brigade Sylvana",
  "Nikoo Homes 9",
  "Nambiar Bannerghatta",
  "Urbanrise Paradise on Earth",
  "Vajram KGF 2.0",
  "Kumar Platina"
];

/* Which section the reader is actually looking at.
 *
 * Not IntersectionObserver: most of this page is 320-500vh sticky tracks, so
 * several sections are intersecting the viewport at once and the observer has
 * no opinion about which one the reader is on. A single sightline does — the
 * active section is whichever one covers a fixed line about a third down the
 * screen, which is where the eye sits.
 *
 * `intro` has no nav entry of its own; it belongs to the top of the page. */
/* ── Light / dark mode ──
 * Two treatments of the same site rather than one theme with overrides: the
 * intro in particular is a different composition in each, not the same one
 * recoloured. Default is dark, which is also what the prerender bakes, so the
 * crawler and a first-time visitor see the same thing.
 */
const ThemeCtx = React.createContext({ theme: 'light', setTheme: () => {} });
const useTheme = () => React.useContext(ThemeCtx);

function ThemeToggle({ compact = false }) {
  const { theme, setTheme } = useTheme();
  const light = theme === 'light';
  return (
    React.createElement('button', { type: "button",
            role: "switch",
            'aria-checked': light,
            onClick: () => setTheme(light ? 'dark' : 'light'),
            'aria-label': light ? 'Switch to dark mode' : 'Switch to light mode',
            title: light ? 'Dark mode' : 'Light mode',
            className: `theme-switch${compact ? ' is-compact' : ''}`,
            'data-on': light ? 'light' : 'dark',}
      /* Both icons live in the track and stay put. The knob travels over them
          and inverts whichever it covers, which is what makes the movement read
          as one object sliding rather than two states swapping. */
      , React.createElement('span', { className: "theme-switch-ico theme-switch-moon" , 'aria-hidden': "true",}
        , React.createElement('svg', { viewBox: "0 0 24 24"   , fill: "none", stroke: "currentColor", strokeWidth: "2",
             strokeLinecap: "round", strokeLinejoin: "round",}
          , React.createElement('path', { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"             ,} )
        )
      )
      , React.createElement('span', { className: "theme-switch-ico theme-switch-sun" , 'aria-hidden': "true",}
        , React.createElement('svg', { viewBox: "0 0 24 24"   , fill: "none", stroke: "currentColor", strokeWidth: "2",
             strokeLinecap: "round", strokeLinejoin: "round",}
          , React.createElement('circle', { cx: "12", cy: "12", r: "4.2",} )
          , React.createElement('path', { d: "M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5"            ,} )
        )
      )
      , React.createElement('span', { className: "theme-switch-knob", 'aria-hidden': "true",} )
    )
  );
}

/* Is the fixed chrome currently sitting over a light section?
 *
 * The page alternates dark and light grounds, and the nav, wordmark and scroll
 * orb float above all of them. White type over the off-white intro or the white
 * services block simply disappears, so each of them asks this and swaps to dark
 * ink while it overlaps a section marked data-light.
 *
 * Measured against the element's own midline rather than its top edge, so the
 * flip happens when the bar is genuinely over the light panel. */
function useOverLight(elRef) {
  const [onLight, setOnLight] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const read = () => {
      const el = elRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;

      /* data-dark wins over everything. The hero keeps its black video in both
         modes, so chrome over it must stay white even in white mode — without
         this the nav went dark-on-black the moment the theme flipped. */
      for (const sec of document.querySelectorAll('[data-dark]')) {
        const b = sec.getBoundingClientRect();
        if (mid > b.top && mid < b.bottom) { setOnLight(false); return; }
      }

      /* White mode makes every other section light, so there is nothing left to
         detect. The per-section scan below is for dark mode, where Services is
         the one light island. */
      if (theme === 'light') { setOnLight(true); return; }
      let hit = false;
      for (const s of document.querySelectorAll('[data-light]')) {
        const b = s.getBoundingClientRect();
        if (mid > b.top && mid < b.bottom) { hit = true; break; }
      }
      setOnLight((prev) => (prev === hit ? prev : hit));
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [elRef, theme]);
  return onLight;
}

const SECTION_NAV = {
  top: '#top', intro: '#top', dubai: '#dubai', services: '#services', adreel: '#services',
  projects: '#projects', pricing: '#pricing', roadmap: '#roadmap',
  faq: '#faq', contact: '#contact',
};

function useActiveSection() {
  const [active, setActive] = useState('#top');
  useEffect(() => {
    const ids = Object.keys(SECTION_NAV);
    const read = () => {
      const line = window.innerHeight * 0.34;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line) cur = id;        // last section to have started above the line
        if (r.top <= line && r.bottom > line) break;
      }
      /* The final section is usually shorter than the sightline offset, so it
         would never win on its own. At the bottom of the page it always has. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        cur = ids[ids.length - 1];
      }
      const href = SECTION_NAV[cur] || '#top';
      setActive((prev) => (prev === href ? prev : href));
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);
  return active;
}

const NAVLINKS = [
  { l: 'Home', h: '#top' },
  { l: 'Dubai', h: '#dubai' },
  { l: 'Services', h: '#services' }, { l: 'Projects', h: '#projects' },
  { l: 'Pricing', h: '#pricing' }, { l: 'Roadmap', h: '#roadmap' },
  { l: 'FAQ', h: '#faq' },
];

/* True once the page has moved at all.
 *
 * The nav pill uses .liquid-glass, whose background is rgba(...,0.01) — for
 * practical purposes transparent, with a 4px blur behind it. Over the hero that
 * is the intent. Over a dense section like the ad reel there is nothing behind
 * the labels, so page content reads straight through the bar and the nav looks
 * broken. Once the page is scrolled the pill takes a real plate. */
function useScrolled(threshold = 8) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const read = () => setOn(window.scrollY > threshold);
    read();
    window.addEventListener('scroll', read, { passive: true });
    return () => window.removeEventListener('scroll', read);
  }, [threshold]);
  return on;
}

/* India | Dubai toggle. Two real <a> links inside the prerendered bar, so
   crawlers and answer engines still see the two homepages linked. The active
   side is this page. A click remembers the visitor's choice for the session
   (the same key the pricing calculator reads), so the location redirect in
   <head> never sends them back. */
const REGION_HERE = 'dubai';
const REGIONS = [{ id: 'india', label: 'India', href: '/' }, { id: 'dubai', label: 'Dubai', href: '/dubai/' }];
function rememberRegion(id) {
  try { window.sessionStorage.setItem('qd-estimate-market', id); }
  catch (error) { console.warn('[region] storage unavailable', error); }
}
function RegionSwitch({ compact = false }) {
  return (
    React.createElement('div', { role: "group", 'aria-label': "Choose your market",
       className: `region-toggle${compact ? ' is-compact' : ''}`,}
      , REGIONS.map((r) => React.createElement('a', { key: r.id, href: r.href, hrefLang: r.id === 'dubai' ? 'en-AE' : 'en-IN',
           'aria-current': r.id === REGION_HERE ? 'page' : undefined,
           onClick: (e) => { rememberRegion(r.id); if (r.id === REGION_HERE) e.preventDefault(); },}, r.label))
    )
  );
}

function Navbar() {
  const active = useActiveSection();
  const navRef = useRef(null);
  const onLight = useOverLight(navRef);
  const scrolled = useScrolled();
  const ink = onLight ? '#0A0D12' : '#FFFFFF';
  return (
    /* A flex row with justify-between centres the pill only if both flanks are the
         same width — the wordmark is far wider than the spacer, so the pill sat left
         of centre and drifted out of line with the ticker beneath it. A three-column
         grid with a 1fr on each side centres it against the viewport instead. */
    React.createElement(React.Fragment, null
    , React.createElement('div', { className: "nav-scrim", 'data-on': scrolled ? '1' : '0', 'aria-hidden': "true",} )
    , React.createElement('nav', { ref: navRef, className: "nav-desktop hidden md:grid fixed top-4 left-0 right-0 px-3 md:px-6 z-50 items-center"          ,
         style: { gridTemplateColumns: '1fr auto 1fr' },}
      /* QDnCo wordmark, keyed out of the brand JPEG to white-on-transparent.
          The tagline is live text rather than part of the bitmap so it stays crisp. */
      /* items-start is load-bearing. This is a column flex container, so
          align-items defaults to stretch — which pulled the wordmark out to the
          width of the tagline beneath it while its inline height stayed put,
          rendering the mark at up to 2x its true aspect. Mobile looked right
          only because the tagline is hidden below sm, so nothing widened the
          column. */
      /* The lockup sits in its own stadium outline, matching the nav pill.
          rounded-full gives the parallel top and bottom edges closing into
          semicircular ends; a 1px border in the ink colour keeps it a hairline
          at any size.

          items-stretch is what makes the tagline fit: the column takes its width
          from the wordmark (the wider child), so the tagline's box is exactly the
          wordmark's width and FitWidth scales the type to fill it end to end.
          items-start would have let it keep its natural width instead. */
      , React.createElement('a', { href: "#top", className: `shrink-0 justify-self-start inline-flex items-center rounded-full${scrolled ? ' nav-plated' : ''}`,
         style: { textDecoration: 'none',
                  border: `1px solid ${onLight ? 'rgba(10,13,18,0.32)' : 'rgba(255,255,255,0.38)'}`,
                  /* Vertical padding only. The lockup is two stacked lines now
                     that the tagline actually renders, so the outline grows
                     downward to hold it; the horizontal inset is untouched
                     because the mark already sits correctly against the nav. */
                  padding: 'clamp(0.52rem, 0.86vw, 0.88rem) clamp(0.8rem, 1.1vw, 1.15rem)',
                  /* One deliberate step: 5% wider, 5% flatter, applied to the
                     lockup and its outline together. A transform rather than
                     padding, because the ask was to stretch the mark itself and
                     not just the box around it — and because a transform does not
                     participate in layout, so the nav either side of it does not
                     move. transformOrigin pins the left edge so it grows into the
                     space it already had. */
                  transform: 'scaleX(1.05) scaleY(0.95)',
                  transformOrigin: 'left center',
                  transition: 'border-color 260ms ease' },}
        /* The column's width is computed from the wordmark's own aspect ratio
            (439/89 = 4.9326), not measured. Measuring was circular: FitWidth sets
            the tagline to 100px to measure it, that widened the column, stretch
            widened the wordmark to match, and the fit then measured its own
            temporary size — the logo blew up to 1600px. A derived width has no
            such feedback loop, and it is the same trick that fixed the stretched
            wordmark earlier in this build. */
        /* Width first, height derived — the same correction the phone lockup
            needed. Sizing the column from the wordmark's height gave it about
            113px at laptop widths, and 22 characters in 113px fit at under 9px,
            below the floor, so FitWidth dropped the tagline entirely.

            The column has to be sized against FitWidth's floor rather than by
            eye, because falling one pixel short does not shrink the tagline, it
            deletes it. Measured: 22 characters at 0.11em tracking fit a 197px
            column at 12.97px, so the size scales at roughly 0.066px per pixel
            of column. A 152px floor therefore fitted at ~10.5px and was dropped
            at 1280 and 1440 while 1920 and wider kept it — which is exactly the
            "missing on laptop" report. 172px was the width that cleared an 11px
            fit at the narrowest desktop.

            Stepped down another notch to 146px — one more ~8% unit after the
            158px pass — so the lockup sits quieter against the bar on every
            desktop width. FitWidth floor stays at 9px; tracking stays at
            0.095em so the tagline degrades small rather than vanishing. */
        , React.createElement('span', { className: "flex flex-col" , style: { width: 'clamp(146px, 10.5vw, 170px)', gap: 'clamp(4px, 0.45vw, 6px)' },}
          , React.createElement('img', { src: "/brands/qdco.png", alt: "QDnCo"  , draggable: false,
               className: onLight ? 'logo-ink-flip' : undefined,
               style: { width: '100%', height: 'auto', display: 'block' },} )
          /* 0.18em of tracking was spending a fifth of the line on air and
              pushing the fitted size under the floor. Tighter tracking and a
              regular weight buy back the size the floor exists to protect. */
          , React.createElement(FitWidth, { text: "The Next-Gen Brand Lab"   , minPx: 8.5,
                    className: "font-body font-normal uppercase"  ,
                    style: { color: onLight ? 'rgba(10,13,18,0.72)' : 'rgba(255,255,255,0.72)',
                             letterSpacing: '0.06em', lineHeight: 1 },} )
        )
      )
      , React.createElement('div', { className: `hidden md:flex liquid-glass rounded-full items-center justify-self-center${scrolled ? ' nav-plated' : ''}`,
           style: { padding: 6 },}
        , NAVLINKS.map((n) => {
          const on = active === n.h;
          return (
            React.createElement('a', { key: n.l, href: n.h, 'aria-current': on ? 'true' : undefined,
               className: "rounded-full font-medium font-body whitespace-nowrap"   ,
               style: {
                 fontSize: 'clamp(0.85rem, 1.22vw, 1.24rem)',
                 padding: 'clamp(0.4rem, 0.58vw, 0.6rem) clamp(0.64rem, 0.88vw, 1rem)',
                 color: on ? (onLight ? '#F1F0ED' : '#0A0D12') : (onLight ? 'rgba(10,13,18,0.72)' : 'rgba(255,255,255,0.72)'),
                 background: on ? (onLight ? '#0A0D12' : '#FFFFFF') : 'transparent',
                 transition: 'color 260ms ease, background-color 260ms ease',
               },}
              , n.l
            )
          );
        })
        , React.createElement('a', { href: "#contact", 'aria-current': active === '#contact' ? 'true' : undefined,
           className: `nav-cta${active === '#contact' ? ' is-quiet' : ''} rounded-full font-semibold font-body whitespace-nowrap flex items-center gap-1.5`,
           style: {
             fontSize: 'clamp(0.85rem, 1.22vw, 1.24rem)',
             padding: 'clamp(0.4rem, 0.58vw, 0.6rem) clamp(0.8rem, 1.1vw, 1.22rem)',
             /* Filled accent by default (.nav-cta). While the contact section is
                active, an outline instead, so it reads as "you are here" rather
                than a second active pill. */
             ...(active === '#contact' ? {
               background: 'transparent',
               color: 'var(--accent)',
               boxShadow: 'inset 0 0 0 1.5px var(--accent)',
               animation: 'none',
             } : {}),
           },}, "Book Phase 0 "
             , React.createElement(ArrowUpRight, { className: "nav-cta-arrow h-4 w-4"  ,} )
        )
      )
      , React.createElement('div', { className: "justify-self-end flex items-center justify-end gap-3"    , style: { height: 48 },}
        , React.createElement(RegionSwitch, null )
        , React.createElement(ThemeToggle, null )
      )
    )
    )
  );
}

/* Below md the desktop pill is hidden and nothing replaced it — a phone visitor
   had no navigation at all, and no way to see where they were in a page that is
   mostly 300-500vh scroll tracks. This is that nav: a thumb-reachable bar
   pinned to the bottom, scrollable sideways because seven labels will not fit
   across 375px, and it auto-scrolls the active chip into view so the current
   section is always the one you can see. */
function MobileNav() {
  const active = useActiveSection();
  const barRef = useRef(null);
  const navRef = useRef(null);
  const onLight = useOverLight(navRef);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const chip = bar.querySelector('[data-on="1"]');
    if (!chip) return;
    /* scrollIntoView would scroll the page as well as the bar; moving the bar's
       own scrollLeft keeps the effect local. */
    const target = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  const items = [...NAVLINKS, { l: 'Contact', h: '#contact' }];
  return (
    /* Pinned to the top, wordmark on the left and the sections scrolling beside
       it — the same shape as the desktop bar, and present from first paint
       rather than appearing after a scroll. */
    /* Two rows. One row put the wordmark and the section chips on the same
       line, so the lockup ate the left third and Home — always the first chip,
       and the active one on arrival — sat half under it. Giving the chips the
       full width means the first chip starts at the left edge and is never
       crowded, and it leaves the lockup room to carry its tagline inside the
       same stadium outline the desktop bar uses. */
    React.createElement('nav', { ref: navRef, className: "nav-mobile md:hidden fixed inset-x-0 top-0 z-50 flex flex-col gap-3 px-2.5 pt-2.5 pb-2"           ,
         style: { background: onLight ? 'rgba(241,240,237,0.9)' : 'rgba(10,13,18,0.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                  borderBottom: onLight ? '1px solid rgba(10,13,18,0.14)' : '1px solid rgba(var(--ink-rgb),0.12)',
                  paddingTop: 'calc(0.5rem + env(safe-area-inset-top, 0px))' },
         'aria-label': "Section navigation" ,}
      , React.createElement('div', { className: "flex items-center justify-between gap-2"   ,}
        , React.createElement('a', { href: "#top", className: "shrink-0 inline-flex items-center rounded-full"   ,
           style: { textDecoration: 'none',
                    border: `1px solid ${onLight ? 'rgba(10,13,18,0.32)' : 'rgba(255,255,255,0.38)'}`,
                    padding: '0.36rem 0.7rem' },}
          /* The width is set first and the wordmark takes its height from it,
              which is the opposite of the desktop lockup and deliberate: the
              tagline is 22 characters, and FitWidth drops the line entirely
              rather than render it below its legibility floor. Sized from the
              wordmark's height the column came out 84px, which put the fitted
              type under 4px — so the tagline was silently absent on every
              phone.

              132px was the narrowest box that cleared the floor at 0.09em of
              tracking, so stepping the lockup down had to buy the width back
              somewhere or the tagline would vanish again. Tighter tracking pays
              for most of it: 0.07em returns roughly 2% of the line, which is
              most of what the narrower column costs. Stepped again to 112px —
              one more unit after 122 — with the floor at 8 so the tagline
              stays visible rather than vanishing. */
          , React.createElement('span', { className: "flex flex-col" , style: { width: 128, gap: 5 },}
            , React.createElement('img', { src: "/brands/qdco.png", alt: "QDnCo"  , draggable: false,
                 className: onLight ? 'logo-ink-flip' : undefined,
                 style: { width: '100%', height: 'auto', display: 'block' },} )
            , React.createElement(FitWidth, { text: "The Next-Gen Brand Lab"   , minPx: 8.5,
                      className: "font-body font-normal uppercase"  ,
                      style: { color: onLight ? 'rgba(10,13,18,0.72)' : 'rgba(255,255,255,0.72)',
                               letterSpacing: '0.035em', lineHeight: 1 },} )
          )
        )
        , React.createElement('div', { className: "flex items-center gap-2 shrink-0"   ,}
          , React.createElement(RegionSwitch, { compact: true,} )
          , React.createElement(ThemeToggle, { compact: true,} )
        )
      )
      , React.createElement('div', { ref: barRef,
           className: "flex items-center gap-1 overflow-x-auto no-scrollbar min-w-0"     ,
           style: { scrollBehavior: 'smooth' },}
        , items.map((n) => {
          const on = active === n.h;
          return (
            React.createElement('a', { key: n.l, href: n.h, 'data-on': on ? '1' : '0',
               'aria-current': on ? 'true' : undefined,
               className: "rounded-full font-body font-medium whitespace-nowrap shrink-0 grid place-items-center"      ,
               style: {
                 minHeight: 44, padding: '0 0.95rem', fontSize: '1rem',
                 color: on ? (onLight ? '#F1F0ED' : '#0A0D12') : (onLight ? 'rgba(10,13,18,0.78)' : 'rgba(255,255,255,0.78)'),
                 background: on ? (onLight ? '#0A0D12' : '#FFFFFF') : 'transparent',
                 transition: 'color 240ms ease, background-color 240ms ease',
               },}
              , n.l
            )
          );
        })
      )
    )
  );
}

/* ═══════════ 1. HERO ═══════════
 *
 * Two grounds, one structure. Dark runs the Mux stream behind it; white runs an
 * animated colour field, because the reference is a look rather than an asset —
 * a CSS gradient that drifts is the honest way to get "alive like a video"
 * without a second file to load.
 *
 * What survived the rewrite, and why:
 *   ticker      — the only element that proves the work is running right now
 *   brand scroll— nine logos say more than any sentence about who trusts this
 *   the numbers — ₹37 Cr, ₹6L, ₹266, 51% are the reason a developer keeps reading
 *
 * What went: the 43-word paragraph and the two large stat cards. The templates
 * carry a tagline, a heading and a call — so the paragraph became the heading and
 * the cards became one proof line. A developer scanning this page is looking for
 * a number and a mechanism, not prose.
 *
 * Numerals are set apart from their labels deliberately: the eye lands on ₹37 Cr
 * before it reads "pipeline influenced", which is the order the pitch works in.
 */
const HERO_VIDEO = 'https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8';

/* One proof line — no ₹37 Cr repeat of the headline. */
const HERO_PROOF = [
  {
    "v": "AED 280M",
    "k": "India pipeline influence"
  },
  {
    "v": "43+",
    "k": "Projects active in India"
  },
  {
    "v": "60%+",
    "k": "Overall leads qualified"
  }
];

/* ═══════════ HERO — LIGHT MODE ═══════════
 *
 * Built to the supplied template: CloudFront video ground, Inter throughout at
 * weight 600, everything uppercase on wide tracking, and the three-band column
 * of nav / stats / bottom content.
 *
 * Two deliberate departures, both to avoid regressing something already built:
 *
 *   NAV — the template ships its own bar with a circular logo, four links and a
 *   hamburger driving a full-screen overlay. The site already has a fixed
 *   Navbar with active-section highlighting and a separate MobileNav, both of
 *   which serve every section, not just the hero. Rendering the template's nav
 *   too would put two bars on screen at once. The template's *layout* is
 *   adopted; its nav is not.
 *
 *   TICKER AND BRAND SCROLL — kept, because they were explicitly required to
 *   stay across hero rebuilds. They take the top and bottom edges, and the
 *   template's three bands sit between them.
 *
 * The template's accent (#5E0ED7) lands on the small glyph beside each stat —
 * the currency mark or percent sign — which is the structural equivalent of the
 * "+" it colours in the original.
 */
const HERO_LIGHT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4';

const ACCENT = 'var(--accent)';

/* Numerals split so the accent can take the mark and leave the figure black,
   the way the template colours "+" but not "300". */
const HERO_LIGHT_STATS = [
  {
    "mark": "AED",
    "n": "277",
    "suffix": "M",
    "k": "India pipeline\ninfluence to date*"
  },
  {
    "mark": "",
    "n": "43",
    "suffix": "+",
    "k": "Projects active\nin India*"
  },
  {
    "mark": "",
    "n": "60",
    "suffix": "%+",
    "k": "Overall leads\nqualified*"
  }
];

/* Three stacked words, each clipped by its own wrapper so it can slide up from
   below the mask. This is QDnCo's actual differentiator rather than the
   template's copy — the offer is priced against the qualified lead, which is
   the unit that actually appears on an invoice. Kept in step with the dark
   hero's headline and with the pricing page; a claim that differs by theme is
   a claim nobody can rely on. */
const HERO_LIGHT_WORDS = ['Dubai Real Estate', 'Marketing', 'Campaigns'];
/* Single source for every word both heroes show, so the light and dark
   themes cannot drift apart. */
const HERO_COPY = {
  eyebrow: 'Dubai real estate lead generation for brokers and developers',
  headline: HERO_LIGHT_WORDS.join(' '),
  sub: 'Meta and Google campaigns for Dubai developers and brokerages, measured on qualified buyer enquiries, not on form fills.',
  primary: 'Book a Phase 0 call',
  secondary: 'See the work',
  secondaryHref: '#projects',
};

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

function HeroLight() {
  const partners = [BRANDS.brigade, BRANDS.woodscapes, BRANDS.vaishnavi, BRANDS.bhartiya, BRANDS.nambiar, BRANDS.urbanrise, BRANDS.vajram, BRANDS.kumar, BRANDS.indium];
  const lead = useLead();

  return (
    React.createElement('section', { id: "top", 'data-light': "1",
             className: "hero-light relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col"       ,
             style: { background: '#FFFFFF', fontFamily: "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, sans-serif" },}

      , React.createElement('video', { autoPlay: true, loop: true, muted: true, playsInline: true, 'aria-hidden': "true",
             className: "absolute inset-0 w-full h-full object-cover z-0"     ,
             style: { pointerEvents: 'none' },}
        , React.createElement('source', { src: HERO_LIGHT_VIDEO, type: "video/mp4",} )
      )

      , React.createElement('div', { 'aria-hidden': "true", className: "absolute inset-0 z-[1] pointer-events-none"   ,
           style: { background: 'radial-gradient(ellipse 100% 80% at 50% 55%,' +
                                ' rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.46) 45%,' +
                                ' rgba(255,255,255,0.08) 82%)' },} )

      , React.createElement('div', { className: "relative z-10 flex h-full min-h-0 flex-col"     ,}

        /* Hero: one message, one action (DESIGN.md 1, 6.5). The proof numbers that
           used to sit here live in the intro card directly below. */
        , React.createElement('div', { className: "hero-light-copy flex-1 min-h-0 flex flex-col justify-end px-5 sm:px-8 md:px-12",
             style: { paddingTop: 'var(--chrome-clear)', paddingBottom: '1.25rem' },}
          , React.createElement(motion.p, { custom: 1, variants: fadeUp, initial: "hidden", animate: "show", className: "hero-eyebrow",}, HERO_COPY.eyebrow)
          , React.createElement('h1', { className: "text-right font-semibold uppercase hero-light-h1",
                style: { color: '#000', lineHeight: 0.9 },}
            , HERO_LIGHT_WORDS.map((word, i) => (
              React.createElement('span', { key: word, className: "block overflow-hidden",}
                , React.createElement(motion.span, { className: "block",
                             initial: { y: '110%' }, animate: { y: 0 },
                             transition: { delay: 0.4 + i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] },}
                  /* The trailing space is invisible at the end of a block line, but
                      without it text extraction reads "PricedPer QualifiedLead". */
                  , i < HERO_LIGHT_WORDS.length - 1 ? `${word} ` : word
                )
              )
            ))
            , React.createElement('span', { className: "sr-only",}, " for developers and realtors")
          )
          , React.createElement(motion.p, { custom: 5, variants: fadeUp, initial: "hidden", animate: "show", className: "hero-sub",}, HERO_COPY.sub)
          , React.createElement(motion.div, { custom: 6, variants: fadeUp, initial: "hidden", animate: "show", className: "hero-ctas",}
            , React.createElement('button', { type: "button", onClick: lead.open, className: "hero-cta hero-cta-primary",}
              , HERO_COPY.primary, React.createElement(ArrowUpRight, { className: "h-[18px] w-[18px]", 'aria-hidden': "true",} ))
            , React.createElement('a', { href: HERO_COPY.secondaryHref, className: "hero-cta hero-cta-secondary",}
              , HERO_COPY.secondary, React.createElement('span', { 'aria-hidden': "true",}, "→"))
          )
        )

        , React.createElement(motion.div, { ...fadeOnly(1.2), className: "hero-brands relative shrink-0"  ,
                    style: { marginTop: '0.35rem' },}
          , React.createElement('div', { className: "absolute inset-0 pointer-events-none"  , style: { background: 'rgba(255,255,255,0.86)' },} )
          , React.createElement('div', { className: "relative w-full overflow-hidden py-1"   ,}
            , React.createElement('div', { className: "clients-track flex w-max items-center"   ,}
              , [...partners, ...partners].map((b, i) => (
                React.createElement('a', { key: `${b.name}-${i}`, href: b.site || undefined,
                   target: b.site ? '_blank' : undefined, rel: b.site ? 'noreferrer noopener' : undefined,
                   className: "shrink-0 transition-opacity hover:opacity-70"  , title: b.name,
                   style: { marginRight: 'var(--brand-gap)', cursor: b.site ? 'pointer' : 'default' },}
                  , React.createElement(BrandMark, { b: b, lockTier: true, ink: true,} )
                )
              ))
            )
            , React.createElement('div', { className: "pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20"     ,
                 style: { background: 'linear-gradient(to right, #FFFFFF, transparent)' },} )
            , React.createElement('div', { className: "pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20"     ,
                 style: { background: 'linear-gradient(to left, #FFFFFF, transparent)' },} )
          )
        )
      )
    )
  );
}

function Hero() {
  const { theme } = useTheme();
  const light = theme === 'light';
  if (light) return React.createElement(HeroLight, null );
  const partners = [BRANDS.brigade, BRANDS.woodscapes, BRANDS.vaishnavi, BRANDS.bhartiya, BRANDS.nambiar, BRANDS.urbanrise, BRANDS.vajram, BRANDS.kumar, BRANDS.indium];
  const edge = '#0A0D12';
  const lead = useLead();

  return (
    React.createElement('section', { id: "top", 'data-dark': "1",
             className: "relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden"    ,
             style: { background: '#000000' },}

      , React.createElement(HlsVideo, { src: HERO_VIDEO,
                className: "absolute inset-0 w-full h-full object-cover z-0"     ,
                style: { pointerEvents: 'none' },} )

      , React.createElement('div', { 'aria-hidden': "true", className: "absolute inset-0 z-[1] pointer-events-none"   ,
           style: { background: 'radial-gradient(ellipse 92% 70% at 50% 40%,' +
                                ' rgba(var(--page-rgb),0.64) 0%,' +
                                ' rgba(var(--page-rgb),0.34) 50%,' +
                                ' rgba(var(--page-rgb),0) 78%)' },} )

      , React.createElement('div', { className: "relative z-10 flex h-full min-h-0 flex-col"     ,}

        /* One centred column — same left edge for eyebrow, headline, sub, stats, CTAs */
        , React.createElement('div', { className: "hero-stack flex-1 min-h-0 flex flex-col items-center justify-center text-center px-5 sm:px-8"         ,
             style: { paddingTop: '0.85rem', paddingBottom: '0.65rem' },}

          , React.createElement(motion.p, { ...fadeOnly(0.45), className: "font-body font-semibold uppercase shrink-0 hero-dark-eyebrow"    ,
                    style: { color: 'rgba(var(--ink-rgb),0.72)',
                             letterSpacing: '0.2em', maxWidth: '36rem' },}, HERO_COPY.eyebrow

          )

          , React.createElement(BlurText, { as: "h1", text: HERO_COPY.headline,
            className: "font-heading italic max-w-4xl shrink-0 hero-dark-h1"    ,
            style: { color: 'var(--ink)', lineHeight: 1.05, letterSpacing: '-0.03em' },} )


          , React.createElement(motion.p, { ...fadeOnly(0.85), className: "hero-sub", style: { textAlign: 'center' },}, HERO_COPY.sub)
          , React.createElement(motion.div, { ...fadeOnly(1.0), className: "hero-dark-ctas flex flex-wrap items-center justify-center gap-3 sm:gap-4 shrink-0"       ,
                      style: { marginTop: '0.35rem' },}
            , React.createElement('button', { type: "button", onClick: lead.open,
               className: "rounded-full font-body font-medium inline-flex items-center gap-2"     ,
               style: { background: '#5e0ed7', color: '#fff', border: 'none', cursor: 'pointer',
                        padding: '0.65rem 1.35rem',
                        fontSize: 'var(--fs-body)' },}, HERO_COPY.primary, " "
                   , React.createElement(ArrowUpRight, { className: "h-4 w-4" ,} )
            )
            , React.createElement('a', { href: HERO_COPY.secondaryHref,
               className: "rounded-full font-body font-medium inline-flex items-center gap-2"     ,
               style: { color: 'var(--ink)', textDecoration: 'none',
                        border: '1px solid rgba(var(--ink-rgb),0.45)',
                        padding: '0.65rem 1.35rem',
                        fontSize: 'var(--fs-body)' },}, HERO_COPY.secondary, " "
                 , React.createElement(Play, { className: "h-3.5 w-3.5" ,} )
            )
          )
        )

        , React.createElement(motion.div, { ...fadeOnly(1.15), className: "hero-brands relative shrink-0"  ,}
          , React.createElement('div', { className: "absolute inset-0 pointer-events-none"  ,
               style: { background: 'rgba(10,13,18,0.82)' },} )
          , React.createElement('div', { className: "relative w-full overflow-hidden py-1.5"   ,}
            , React.createElement('div', { className: "clients-track flex w-max items-center"   ,}
              , [...partners, ...partners].map((b, i) => (
                React.createElement('a', { key: `${b.name}-${i}`, href: b.site || undefined, target: b.site ? '_blank' : undefined,
                   rel: b.site ? 'noreferrer noopener' : undefined,
                   className: "shrink-0 transition-opacity hover:opacity-70"  , title: b.name,
                   style: { marginRight: 'var(--brand-gap)', cursor: b.site ? 'pointer' : 'default' },}
                  , React.createElement(BrandMark, { b: b, lockTier: true,} )
                )
              ))
            )
            , React.createElement('div', { className: "pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20"     , style: { background: `linear-gradient(to right, ${edge}, transparent)` },} )
            , React.createElement('div', { className: "pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20"     , style: { background: `linear-gradient(to left, ${edge}, transparent)` },} )
          )
        )
      )
    )
  );
}

/* ═══════════ 2. INTRO — name, traced silhouette, typographic sweep ═══════════ */

/**
 * The name must run edge to edge. Rather than guess a vw value, measure the
 * rendered text once and scale the font size to the exact container width.
 */
/* Scales a single line of text so it spans its container exactly.
 *
 * Was FitHeading — dead code that still contained an <h1>, so any future use
 * would have quietly created a second one. Repurposed rather than deleted: the
 * measurement is exactly what the nav tagline needs to sit flush under the
 * wordmark from end to end, and no clamp() can do that because the target width
 * is another element's rendered size.
 *
 * Measure at a known size, then scale by the ratio — one reflow, not a search.
 * letter-spacing is in em, so it scales with the result and stays proportional.
 */
function FitWidth({ text, className, style, minPx = 0 }) {
  const wrapRef = useRef(null), textRef = useRef(null);
  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current, el = textRef.current;
      if (!wrap || !el) return;
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      if (!w || !wrap.clientWidth) { el.style.fontSize = ''; return; }
      const size = 100 * (wrap.clientWidth / w);
      /* Exact fit and legibility part company on narrow screens: the wordmark is
         108px wide at 768px, and 22 characters inside that is 6.8px type. Below
         the floor the line is dropped rather than shrunk — an unreadable tagline
         is worse than none, and stretching it past the wordmark would break the
         alignment that is the point of fitting it. */
      wrap.style.display = size < minPx ? 'none' : 'block';
      el.style.fontSize = size + 'px';
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (document.fonts) document.fonts.ready.then(fit);
    return () => ro.disconnect();
  }, [text]);
  return (
    React.createElement('span', { ref: wrapRef, className: "block w-full overflow-hidden"  ,}
      , React.createElement('span', { ref: textRef, className: className, style: { whiteSpace: 'nowrap', display: 'block', ...style },}, text)
    )
  );
}

/* ── The typographic sweep ──
   Three statements, each broken by the figure: the phrase runs in from the left,
   stops at the silhouette, and picks up again on the far side. Line 1 is the
   longest and each one after it is shorter, so the block reads as a taper.
   Windows are sequential — a line only starts once the one above has landed. */
/**
 * The line a developer actually feels. Every agency pitch he has heard promises
 * leads; what he is buying is buyers, and he has been burned by the difference.
 * So: name the thing he already believes, then invert it, then ask for the call.
 * Plain words, no jargon, no metric that needs a footnote to make sense.
 *
 * Windows run alongside the trace, not after it — both finish together at 0.85.
 */
/**
 * The line a developer actually feels. Every agency pitch promises leads; what a
 * developer is buying is buyers, and they have been burned by the difference.
 * Name what they already believe, invert it, then ask for the call.
 *
 * Line 1 is the headline act — full width above the figure, on ruled paper, so it
 * lands like something written down rather than another dark-on-dark banner.
 * Lines 2 and 3 break around the figure and step down in size beneath it.
 */
/* Left half of a line fills over the first half of its window, right half over
   the second — so one continuous sweep crosses the figure. */
function sweepClip(p, from, to, half) {
  const t = Math.max(0, Math.min(1, (p - from) / (to - from)));
  const local = half === 0 ? Math.min(1, t / 0.5) : Math.max(0, (t - 0.5) / 0.5);
  return { clipPath: `inset(0 ${((1 - local) * 100).toFixed(2)}% 0 0)`, opacity: local > 0 ? 1 : 0 };
}

/* ── The ad platforms, pinned either side of the figure ──
   Marks only, no labels, pulled in close to the figure and rendered entirely in
   white. Seven different brand palettes against a near-black page fought each
   other and pulled attention off the headline; one ink keeps the cluster reading
   as a single row of capability and lets the figure stay the focal point. */

/* Marks live in two horizontal bands the copy never enters — one above the
   shoulder line, one below the last line of type. Keeping them out of the text's
   vertical range is the only reliable way to guarantee clearance: the phrases are
   long enough that there is no outer column wide enough to hold a mark beside
   them at 1440px. */
/* ═══════════ 2. INTRO — name split around the figure ═══════════
 *
 * Rebuilt against the reference composition: a script "Hi, I'm", the name in
 * two very large grotesque words set either side of the head, and the figure
 * scaled up to carry the frame. The first name sits BEHIND the cutout and the
 * surname in FRONT, which is what gives the layering its depth — a flat stack
 * of centred text reads as a caption, this reads as a portrait.
 *
 * What went: the brush-stroke band and the "I make it come / back as buyers"
 * sweep. One statement replaces both, which also removes the two scroll windows
 * that used to drive them.
 *
 * The figure is the coordinate system, as before — every piece is positioned
 * from its width or its top edge, so the composition holds together at any
 * viewport instead of being retuned per breakpoint.
 */
/* ═══════════ 2. INTRO — the portrait plate ═══════════
 *
 * Built to the supplied mockup: warm off-white ground, the full name set very
 * large in two words either side of the head, a script "Hey, I'm" tucked under
 * the first, proof bottom-left and the call bottom-right.
 *
 * The layering is what carries it. "V. Sai" sits BEHIND the cutout so the hair
 * crops its tail; "Kavshik" sits IN FRONT, crossing the jaw and shoulder. Flat
 * centred type would read as a caption — this reads as a plate.
 *
 * `data-light` marks the section for the fixed chrome: the nav and the scroll
 * orb both read it and flip to dark ink while they are over it, otherwise white
 * type on white ground would simply disappear.
 *
 * Vertical positions are fractions of the figure height and horizontal ones are
 * viewport insets, so the composition holds without per-breakpoint retuning.
 */
/* Phone-width branch, read from matchMedia rather than guessed from a class,
   because a couple of decisions in the light intro depend on it in JS. */
function useIsPhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const read = () => setPhone(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);
  return phone;
}

/* Publishes the bottom band's measured height to the stage as --intro-bot.
 *
 * The figure is sized from the space left between the fixed nav and this band,
 * and the band's height is not something a clamp can express: it is three lines
 * of statement at 1440 and two at 1920, plus a call whose padding scales with
 * the viewport. Guessing it left the figure overlapping the statement by 31px on
 * a laptop and short by 50px on a desktop.
 *
 * Safe from feedback because nothing the band contains is sized from --fig-w —
 * the statement's width cap is deliberately written against a static bound for
 * exactly this reason. */
function useBandHeight(stageRef, bandRef) {
  useEffect(() => {
    const publish = () => {
      const stage = stageRef.current, band = bandRef.current;
      if (!stage || !band) return;
      stage.style.setProperty('--intro-bot', Math.round(band.offsetHeight) + 'px');
    };
    publish();
    const ro = new ResizeObserver(publish);
    if (bandRef.current) ro.observe(bandRef.current);
    /* Webfonts land after first paint and change the line count. */
    if (document.fonts) document.fonts.ready.then(publish);
    return () => ro.disconnect();
  }, []);
}

/* ═══════════ INTRO SIGN-OFF — the typed statement ═══════════
 *
 * The statement used to be a static block of display type sitting in the bottom
 * band. It now types itself as the section scrolls, which turns the claim into
 * something that reads as said rather than asserted.
 */

/* Typed one character at a time, then the trailing dots land in sequence so the
   line finishes on a beat rather than just stopping. The exclamation is part of
   the typed string; the dots are separate because they animate after it. */
function TypedStatement({ t, className, style }) {
  const TEXT = 'We don’t just run ads, we build category winners!';
  const clamped = Math.max(0, Math.min(1, t));

  /* Reserve the last fifth of the window for the dots. */
  const typeT = Math.min(1, clamped / 0.8);
  const dotsT = Math.max(0, (clamped - 0.8) / 0.2);

  const n = Math.round(typeT * TEXT.length);
  const typing = n > 0 && n < TEXT.length;
  const dots = Math.round(dotsT * 3);

  /* A hidden twin of the finished line holds the box open from the start.
     Without it the paragraph grows from one line to five as it types, which
     grows the bottom band, which changes the measured --intro-bot, which
     resizes the figure — 119px of portrait movement on a laptop, driven
     entirely by text reflow. The twin and the live text share one grid cell,
     so the box is always the finished line's size and nothing below reflows. */
  return (
    React.createElement('p', { className: className, style: style, 'aria-label': TEXT + '...',}
      , React.createElement('span', { className: "tw-reserve", 'aria-hidden': "true",}, TEXT, "...")
      , React.createElement('span', { className: "tw-live",}
        , React.createElement('span', { 'aria-hidden': "true",}, TEXT.slice(0, n))
        /* Rendered only while there is still text to come. Setting opacity
            would not work: .tw-caret animates opacity, and a CSS animation wins
            over an inline style for the property it animates. */
        , typing && React.createElement('span', { className: "tw-caret", 'aria-hidden': "true",
                         style: { marginLeft: '0.06em' },}, "|")
        , React.createElement('span', { 'aria-hidden': "true", style: { letterSpacing: '0.14em' },}
          , '.'.repeat(dots)
        )
      )
    )
  );
}

/* ═══════════ INTRO — the Sevora card ═══════════
 *
 * Rebuilt to the supplied reference: one large rounded card, a serif headline
 * whose last word drops to grey, subtext, two buttons, a three-stat row, and a
 * team column on the right, headed by a small availability panel. A live
 * platform strip runs beneath.
 *
 * Both modes share this build — the reference is light, so dark mode inherits
 * the same geometry through the palette tokens rather than forking the markup.
 *
 * The typed statement from the previous pass is kept and closes the card's
 * left column. The right column introduces the team, one card per member.
 */

/* Every surface QDnCo actually runs on, plus the tools the work is made with.
   Each entry is the brand's own mark, traced or supplied — no stand-ins. */
/* `treat` is not a style choice — it is the output of
   `node classify-platform-marks.mjs`, which measures each mark's contrast
   against both page grounds and flags the ones that camouflage:

     leave   already contrasts on both grounds; ships exactly as the brand
             draws it (Meta blue 3.7/5.2, Claude orange 6.2/3.1, Ads blue 5.5/3.6)
     dark    near-BLACK artwork, invisible on the dark page -> inverted there
     white   near-WHITE artwork, invisible on the white page -> inverted there.
             X and Gemini both ship white; an earlier pass had these backwards
             because the classifier was discarding white as "background".
     light   light but chromatic, so inverting would change the hue -> darkened
             on white instead. Snapchat yellow measures 1.10:1 there, the worst
             in the set.
     ink     drawn in currentColor, so it simply follows the theme */
const PLATFORM_STRIP = [
  { n: 'Meta Ads',      f: 'meta-c.svg',       treat: 'leave' },
  { n: 'Google Ads',    f: 'googleads-c.svg',  treat: 'leave' },
  { n: 'Google Gemini', f: 'googlegemini.svg', treat: 'white' },
  { n: 'Snapchat Ads',  f: 'snapchat-c.svg',   treat: 'light' },
  { n: 'X Ads',         f: 'x-c.svg',          treat: 'white' },
  { n: 'Claude',        f: 'claude.svg',       treat: 'leave' },
  { n: 'Cursor',        f: 'cursor.svg',       treat: 'dark'  },
  { n: 'Codex',         f: 'codex.svg',        treat: 'dark'  },
  { n: 'Higgsfield',    f: 'higgsfield.svg',   treat: 'dark'  },
];

/* Inlined rather than loaded as a file: an <img> renders its SVG in a separate
   document where currentColor has nothing to inherit from, so a currentColor
   mark only follows the theme when it is inline in the page. */
const INTRO_STATS = [
  {
    "v": "AED 280M",
    "k": "India pipeline influence"
  },
  {
    "v": "43+",
    "k": "Projects active in India"
  },
  {
    "v": "60%+",
    "k": "Overall leads qualified"
  }
];

function IntroCard() {
  const ref = useRef(null);
  const scrollP = useSectionProgress(ref);
  const phone = useIsPhone();
  /* Phone playhead. Desktop scrubs the reveal purely from scroll, which works
     because a wheel gesture keeps moving through the pin. On a phone the same
     code path lands the reader on a fully blank card at progress 0 — the plate
     is visible, every child is opacity 0 — and a thumb lift leaves them staring
     at an empty frame that looks broken. When the stage pins, this playhead
     drives the same cues the scroll would have, so the team slides in from
     the right and the copy rises exactly as on desktop. Scroll still wins via
     Math.max, so a fast flick can scrub ahead of the playhead, and the empty
     final quarter of the track remains the micro-pause before release. */
  const [playP, setPlayP] = useState(0);

  useEffect(() => {
    if (!phone) { setPlayP(0); return; }
    let started = false;
    let raf = 0;
    const DUR = 1800;
    const TARGET = 0.82;   /* covers the 0.74 animation span + a beat of settle */

    const tick = (t0) => (now) => {
      const u = Math.min(1, (now - t0) / DUR);
      const e = 1 - Math.pow(1 - u, 3);          /* cubic ease-out — same feel as the team slide */
      setPlayP(e * TARGET);
      if (u < 1) raf = requestAnimationFrame(tick(t0));
    };

    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      /* Left the stage — reset so a later re-entry plays again. */
      if (r.top > 80) {
        if (started) {
          started = false;
          cancelAnimationFrame(raf);
          setPlayP(0);
        }
        return;
      }
      if (started) return;
      /* Sticky is engaged when the section top has reached the viewport top and
         the section still fills the screen below. That is the moment the blank
         plate would otherwise hold. */
      if (r.top <= 1 && r.bottom > window.innerHeight * 0.6) {
        started = true;
        raf = requestAnimationFrame(tick(performance.now()));
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [phone]);

  const p = phone ? Math.max(scrollP, playP) : scrollP;

  /* On a phone every cue is packed into the first three-quarters of the track
     and the last quarter is left empty on purpose. The card used to finish
     animating at 0.96, which meant the reader arrived at the settled composition
     and the section released at almost the same moment — so on a fast scroll the
     whole thing played to an empty seat. Ending early buys a beat where
     everything is present and still, and the remaining scroll is the single
     small push that carries them out. The track is lengthened to match, so the
     beat is real time rather than borrowed from the animation. */
  const span = phone ? 0.74 : 1;
  const ramp = (from, to) => Math.max(0, Math.min(1, (p - from * span) / ((to - from) * span)));
  const rise = (t) => ({ opacity: t, transform: `translateY(${(1 - t) * 26}px)` });

  return (
    React.createElement('section', { id: "intro", ref: ref, className: "relative track-intro" ,
             style: { height: phone ? '270vh' : '190vh', background: 'var(--veil)' },}

      /* Anchored to the top on a phone rather than centred. Centring splits any
          overflow evenly, so a card fractionally taller than the frame loses the
          top of the card behind the fixed bar — the one place the overflow
          must never go. Set inline because the flex utilities are inline too and
          a stylesheet rule cannot reliably outrank them here. */
      , React.createElement('div', { className: "sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-10"
                        ,
           style: { paddingTop: 'calc(var(--chrome-clear) + clamp(0.5rem, 2vh, 1.5rem))',
                    paddingBottom: 'clamp(1rem, 3vh, 2rem)',
                    justifyContent: phone ? 'flex-start' : 'center' },}

        /* ── The card ── */
        , React.createElement(motion.div, { ...fadeOnly(0.1), className: "intro-card relative mx-auto w-full overflow-hidden"    ,
                    style: { maxWidth: 'var(--content-max)' },}

          , React.createElement('div', { className: "intro-card-grid",}
            /* ── Left column ── */
            , React.createElement('div', { className: "intro-card-copy",}
              , React.createElement('h2', { className: "intro-card-title", style: rise(ramp(0.02, 0.22)),}, "Build Dubai demand,"
                  , ' '
                , React.createElement('span', { style: { color: 'rgba(var(--ink-rgb),0.55)' },}, "faster")
              )

              , React.createElement('p', { className: "intro-card-sub", style: rise(ramp(0.08, 0.30)),}, "We're QDnCo. We build real estate lead generation for Dubai brokerages, developers and agents — research, positioning, creative testing and campaigns, with the Trakheesi permit designed into every ad. Our delivered work is in India; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original Dubai market research. Your agents handle sales."


              )

              , React.createElement('div', { className: "intro-card-btns", style: rise(ramp(0.14, 0.36)),}
                , React.createElement('a', { href: "#projects", className: "intro-btn intro-btn-solid" ,}, "See the work"  )
                , React.createElement('a', { href: "#contact", className: "intro-btn intro-btn-ghost" ,}, "Get in touch"  )
              )

              /* Stats land one after another rather than together, so the row
                  reads left to right the way it would be spoken. */
              , React.createElement('div', { className: "intro-card-stats",}
                , INTRO_STATS.map((s, i) => (
                  React.createElement('div', { key: s.k, style: rise(ramp(0.22 + i * 0.05, 0.44 + i * 0.05)),}
                    , React.createElement('div', { className: "intro-stat-v",}, s.v)
                    , React.createElement('div', { className: "intro-stat-k",}, s.k)
                  )
                ))
              )


              /* Foot of the copy column. The personal signature left with the
                  single-founder framing; the typed line speaks for the team. */
              , React.createElement('p', { className: "intro-metrics-note",}, "Figures are from our India work. Qualification covers overall leads generated; pipeline influence is not booked revenue."                )
              , React.createElement('div', { className: "intro-card-signoff",}
                , React.createElement(TypedStatement, { t: ramp(0.44, 0.74), className: "intro-card-typed", style: {},} )
              )
            )

          )
        )

      )
    )
  );
}

/**
 * The surfaces the work runs on, and the tools it is made with.
 *
 * Lives under the ad reel rather than under the intro card: after a row of
 * finished creative, "what is this built with" is the next question. Beneath
 * the portrait it read as decoration under a headshot.
 *
 * The ends are masked, not overlaid. Painting a gradient over a surface that
 * already has a colour doubles the tint and shows as a band; masking removes
 * only the marquee's own pixels, so the section reads straight through.
 */
function PlatformStrip() {
  return (
    React.createElement(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 },
                viewport: { once: true, amount: 0.3 }, transition: { duration: 0.7 },
                className: "intro-strip relative z-10 mx-auto w-full"    ,
                style: { maxWidth: 'var(--content-max)' },}
      , React.createElement('div', { className: "relative w-full overflow-hidden edge-fade"   ,}
        , React.createElement('div', { className: "platform-track flex w-max items-center"   ,}
          , [...PLATFORM_STRIP, ...PLATFORM_STRIP].map((pl, i) => (
            React.createElement('span', { key: `${pl.n}-${i}`, className: "intro-plat",}
              , React.createElement('img', { src: `/brands/platforms/${pl.f}`, alt: "", 'aria-hidden': "true",
                   className: `plat-${pl.treat}`,} )
              , React.createElement('span', null, pl.n)
            )
          ))
        )
      )
    )
  );
}

/* The strip on its own band, between the capabilities and the creative. */
function PlatformBand() {
  return (
    React.createElement('section', { 'aria-label': "Platforms and tools"  , className: "relative overflow-hidden px-4 sm:px-7 md:px-10 pt-24 sm:pt-32 pb-14 sm:pb-20"        ,
             style: { background: 'var(--veil)' },}
      , React.createElement(SeamFade, { edge: "top",} )
      , React.createElement(SeamFade, { edge: "bottom",} )
      , React.createElement('div', { className: "relative z-10 mx-auto"  , style: { maxWidth: 'var(--content-max)' },}
        , React.createElement('p', { className: "font-body font-semibold uppercase text-center"   ,
           style: { color: 'rgba(var(--ink-rgb),0.62)', letterSpacing: '0.22em',
                    fontSize: 'var(--fs-micro)',
                    marginBottom: 'clamp(1.6rem, 3.2vh, 2.4rem)' },}, "The platforms the work runs on"

        )
        , React.createElement('div', { className: "platform-band-frame",}
          , React.createElement(PlatformStrip, null )
        )
      )
    )
  );
}

/* One entry point, two treatments. */
function Intro() {
  /* Both modes now run the same card — the reference is a light composition and
     the palette tokens carry it onto the dark ground without forking markup.
     The earlier IntroLight/IntroDark pair this supersedes has been removed. */
  return React.createElement(IntroCard, null );
}

/* ═══════════ 3. MARQUEE — V2 ═══════════ */

/* Two counter-scrolling bands. Proof on top — a client alternating with the
   number that engagement produced — and the stack underneath. This replaced a
   wall of 63 animated GIFs: those were stock art from the template, they said
   nothing about the work, and 63 GIFs decoding on a loop is what was making the
   page seize. These are text, so they cost nothing to run. */
const PROOF_ROW = [
  [
    "BRIGADE GROUP",
    1
  ],
  [
    "5 PROJECT BRIEFS",
    0
  ],
  [
    "GODREJ PROPERTIES",
    1
  ],
  [
    "3 PROJECTS · AGENCY EXPERIENCE",
    0
  ],
  [
    "VAISHNAVI LIFE",
    1
  ],
  [
    "45 ACRES · 598 PLOTS",
    0
  ],
  [
    "BHARTIYA CITY",
    1
  ],
  [
    "NIKOO HOMES 9",
    0
  ],
  [
    "NAMBIAR BUILDERS",
    1
  ],
  [
    "VILLA MARKETING",
    0
  ],
  [
    "URBANRISE",
    1
  ],
  [
    "PARADISE ON EARTH",
    0
  ],
  [
    "VAJRAM GROUP",
    1
  ],
  [
    "118 RESIDENCES",
    0
  ],
  [
    "KUMAR PROPERTIES",
    1
  ],
  [
    "184 APARTMENTS",
    0
  ],
  [
    "INDIUM GROUP",
    1
  ],
  [
    "RESIDENTIAL MARKETING",
    0
  ]
];

const STACK_ROW = [
  ['META ADS', 0], ['GOOGLE ADS', 0], ['LINKEDIN ADS', 0], ['X ADS', 0],
  ['SNAPCHAT ADS', 0], ['CHATGPT ADS', 0], ['TRAKHEESI-READY CREATIVE', 0],
  ['GA4', 0], ['GOOGLE TAG MANAGER', 0], ['META PIXEL', 0], ['HUBSPOT', 0],
  ['ZOHO', 0], ['n8n', 0], ['PYTHON SCRAPERS', 0], ['META AD LIBRARY', 0],
  ['ADS TRANSPARENCY CENTER', 0], ['SEMRUSH', 0], ['AHREFS', 0],
];

function MarqueeSection() {
  const Cell = ({ item }) => {
    const [label, isBrand] = item;
    return (
      React.createElement('span', { className: "shrink-0 inline-flex items-center gap-7 md:gap-10 whitespace-nowrap"     , style: { marginRight: 'clamp(1.75rem, 3vw, 2.5rem)' },}
        , React.createElement('span', { className: isBrand ? 'font-kanit font-black uppercase' : 'font-body font-medium uppercase',
              style: isBrand
                ? { color: 'var(--ink)', fontSize: 'clamp(1rem,1.9vw,1.85rem)', letterSpacing: '-0.01em' }
                : { color: 'rgba(var(--ink-rgb),0.66)', fontSize: 'clamp(0.75rem, 1.15vw, 1.05rem)', letterSpacing: '0.16em' },}
          , label
        )
        , React.createElement('span', { className: "rounded-full shrink-0" , style: { width: 5, height: 5, background: 'rgba(232,91,208,0.75)' },} )
      )
    );
  };

  return (
    /* Less room under the rows than above them. Services opens with a rounded
       lip that already overlaps upward and reserves the nav height inside its
       own sticky frame, so symmetric padding here stacked into a dead band
       between the last ticker row and the Services headline. */
    React.createElement('section', { className: "relative overflow-hidden pt-10 sm:pt-12 md:pt-14 pb-3 sm:pb-4 md:pb-5 flex flex-col gap-5"          ,
             style: { background: 'var(--page)' },}
      , React.createElement('div', { className: "relative overflow-hidden edge-fade"  ,}
        , React.createElement('div', { className: "ticker-track flex w-max items-center"   ,}
          , [...PROOF_ROW, ...PROOF_ROW].map((it, i) => React.createElement(Cell, { key: 'p' + i, item: it,} ))
        )
      )
      , React.createElement('div', { className: "relative overflow-hidden edge-fade"  ,}
        , React.createElement('div', { className: "clients-track flex w-max items-center"   ,}
          , [...STACK_ROW, ...STACK_ROW].map((it, i) => React.createElement(Cell, { key: 's' + i, item: it,} ))
        )
      )
    )
  );
}

/* ═══════════ 4. ABOUT — pinned scroll, milestone timeline ═══════════ */
const DECOR = {
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  p59:  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  grp:  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
};

/**
 * Section scroll progress from a plain passive listener rather than a
 * rAF-driven motion value. Two reasons: it keeps advancing even when the
 * browser throttles animation frames (backgrounded tab, reduced power), and it
 * is a plain number, so the bar fill and the milestone highlight can never
 * drift out of sync with each other.
 *
 * Bucketed to 1/1000 so a flick of the wheel can't cause a re-render storm.
 */
function useSectionProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let last = -1;
    const read = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const budget = r.height - window.innerHeight;
      const raw = budget > 0 ? -r.top / budget : 0;
      const q = Math.round(Math.max(0, Math.min(1, raw)) * 1000);
      if (q !== last) { last = q; setP(q / 1000); }
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [ref]);
  return p;
}

/**
 * Hands the wheel back to the page when an inner scroller is exhausted.
 *
 * Browsers do chain overflow scrolling to the document eventually, but Chrome
 * and Firefox "latch" a continuous gesture to whichever element it started on:
 * once the pointer is over a scrollable panel, the rest of that gesture belongs
 * to the panel even after it hits its own end stop. Inside a sticky-pinned
 * track that reads as a dead end — the card stops moving, the page stops
 * moving, the scroll orb stops turning, and the only way out is to move the
 * pointer off the card and start a fresh gesture.
 *
 * So the end stop is detected here and the remaining delta is applied to the
 * window by hand. Scrolling through a card now runs straight on into the next
 * one, and because the page really is scrolling, everything driven by
 * window.scrollY — the phase rail, the ignition bar, the orb — keeps moving
 * with it.
 */
function useScrollChain(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Positive delta means downward. `slack` absorbs the sub-pixel scrollTop
       that fractional zoom and high-DPI displays leave behind, which otherwise
       makes "at the bottom" never quite true. */
    const exhausted = (delta) => {
      const max = el.scrollHeight - el.clientHeight;
      /* Not a scroller at this size — the light variant of the panel never is.
         Stay out of the way entirely rather than preventDefault-ing a gesture
         the browser would have handled natively and more smoothly. */
      if (max <= 1) return false;
      const slack = 1.5;
      return delta > 0 ? el.scrollTop >= max - slack : el.scrollTop <= slack;
    };

    const onWheel = (e) => {
      if (!e.deltaY || !exhausted(e.deltaY)) return;
      e.preventDefault();
      /* deltaMode 1 is lines, 2 is pages — normalise both to pixels. */
      const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      window.scrollBy(0, px);
    };

    /* Touch latches the same way, and there is no delta on the event, so the
       gesture distance is tracked between moves. */
    let y = 0;
    const onTouchStart = (e) => { y = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      const cur = e.touches[0].clientY;
      const delta = y - cur;                        // finger up = scroll down
      y = cur;
      if (!delta || !exhausted(delta)) return;
      e.preventDefault();
      window.scrollBy(0, delta);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [ref]);
}

/* Brand gradient — used by the Roadmap phase cards. */
const FILL = 'linear-gradient(90deg, #B600A8 0%, #7621B0 55%, #BE4C00 100%)';

/* ═══════════ 5. SERVICES ═══════════ */


/**
 * Seven capabilities, ordered the way an engagement actually runs: paid first,
 * the research that plans it second, organic search and AI-answer visibility
 * compounding beside it, then the creative and automation that keep both fed,
 * and last the agents that answer every lead the rest produces.
 *
 * `groups` renders as columns of bullets; `platforms` renders the ad-platform row.
 */

/* ═══════════ SERVICE FLASHCARDS ═══════════
 *
 * The service's own name is the header — invented headlines read as marketing to
 * a developer who is scanning for a capability he already has a word for.
 *
 * Everything below the name is points. No paragraphs anywhere: a builder or a
 * channel partner is deciding in seconds whether we solve his problem, and prose
 * makes him work for it. Each line names a thing we do or a number we answer to.
 *
 * The detail lives in the dropdown but stays in the DOM when collapsed — hidden
 * by max-height, not unmounted — so every point is still crawlable. That is what
 * replaces the ~600 words of prose this section used to carry.
 */
const SERVICE_CARDS = [
  {
    n: '01', name: 'Performance Marketing',
    hook: 'Spend that answers to cost per qualified lead.',
    chips: ['Client-owned accounts', 'Meta · Google'],
    points: [
      'Meta and Google built as one funnel — top, middle, bottom, retargeting',
      'Creative, budget and audience tested against each other, never guessed',
      'Cost per lead, lead quality and sales-ready % reviewed every week',
      'Budget scales only after the numbers hold for a full test window',
      'UAE-resident and overseas-investor demand run as separate pools',
      'You fund the media directly to Meta and Google — we never bill it through us',
      'Every dirham traceable to a source',
    ],
  },
  {
    n: '02', name: 'Go-to-Market & Research',
    hook: 'Nothing gets bought before the market is read.',
    chips: ['Buyer interviews', 'Pricing · TAM'],
    points: [
      'Primary — one-to-one interviews with your actual buyer',
      'Secondary — addressable market, competitor set, pricing, unit economics',
      'Historical — what already worked for you, and what burned',
      'Python scrapers pull Meta Ad Library and Google Ads Transparency for Dubai advertisers on a schedule',
      'Positioning and offer tested before any creative starts',
      'Output — a brief that gates every campaign downstream',
    ],
  },
  {
    n: '03', name: 'Growth Marketing',
    hook: 'Leads that get cheaper, not dearer.',
    chips: ['SEO', 'Local pack'],
    points: [
      'SEO ranked for the queries your buyers actually type',
      'Google Business Profile and local map-pack ranking',
      'Citations and backlinks built for authority, not volume',
      'PR placement for trust at the top of the funnel',
      'Organic demand compounding beside the paid spend',
      'Cost per lead falls as the channel matures',
    ],
  },
  {
    n: '04', name: 'AI Search Visibility',
    hook: 'Named when a buyer asks ChatGPT, not only Google.',
    chips: ['ChatGPT · Perplexity', 'GEO · AEO'],
    points: [
      'Answer pages that lead with the direct answer, written to be quoted',
      'Crawler access opened to the ChatGPT, Perplexity and Claude search bots',
      'Every page served as full HTML, so answer engines read it without running JavaScript',
      'Schema matched to what the page shows — FAQ, breadcrumbs, organisation, project',
      'Claims cited to their primary source, the signal answer engines lean on',
      'AI crawler visits counted from server logs, because GA4 never sees them',
    ],
  },
  {
    n: '05', name: 'Creative Direction',
    hook: '15 AI creatives a month included — refreshed on fatigue.',
    chips: ['Ad creatives included', 'Studio package separate'],
    points: [
      'Ad creatives as required by the agreed campaign scope included in the fee, plus AI ad copy against the research brief',
      'Pipeline capacity behind the scenes (the grade you see in the ad reel) so fatigue refreshes do not become a second invoice',
      'Hook and script pack written against research, not taste',
      'Studio package (quoted separately): professional shoot and edit, videographers, drone, UGC and IGC, motion graphics and industry-standard design',
      'That work runs through creative agencies we partner with, and is approved by you before it is commissioned',
      'Nothing enters production without written sign-off; DLD permit number and QR planned into the layout from the brief',
    ],
  },
  {
    n: '06', name: 'AI Workflows',
    hook: 'Pipelines that keep creatives and reporting moving.',
    chips: ['Creative pipelines', 'n8n · Zapier'],
    points: [
      'AI-based creative pipelines and automations that regenerate assets when demand or fatigue requires',
      'n8n and Zapier replacing manual reporting and handoffs',
      'Real-time CRM routing and sales alerts',
      'Weekly dashboard — spend, CPL, quality, scaling decisions',
      'Research refreshed on a schedule — scrapers, Ad Library, desk — so creative stays gated',
      'No black box — every number traceable to its source',
    ],
  },
  {
    n: '07', name: 'AI Lead Agents',
    partner: { name: 'Vyostra AI', href: 'https://vyostra.com/features?utm_source=qdnco.com&utm_medium=referral&utm_campaign=qdnco_services&utm_content=ai-lead-agents' },
    hook: 'Every enquiry answered in seconds, at any hour.',
    chips: ['Chat · Voice · WhatsApp', 'Scoped to your approved enquiry workflow'],
    points: [
      'An agent trained on your project — pricing, floor plans, possession, amenities',
      'Answers website chat, voice and WhatsApp in seconds, across UAE and India hours',
      'Qualifies on budget, community, handover timeline, cash or mortgage, and residency before a call',
      'Meta lead-form leads get a WhatsApp reply in seconds, not after the next export',
      'Follow-up waits for a real reply and stops the moment someone asks it to',
      'Warm leads handed to your sales team with the full transcript attached',
      'Answers only from your approved content — never guesses at price or inventory',
    ],
  },
  {
    n: '08', name: 'Websites & Landing Pages',
    partner: { name: 'Vyostra AI', href: 'https://vyostra.com/contact?utm_source=qdnco.com&utm_medium=referral&utm_campaign=qdnco_services&utm_content=websites' },
    hook: 'Project sites and landing pages that load fast and capture the lead.',
    chips: ['Project sites', 'Landing pages'],
    points: [
      'Developer and project websites designed, built and hosted',
      'A landing page per campaign — one offer, one form, nothing to wander off to',
      'Served as full HTML, so pages load fast on mobile and read cleanly to search and AI crawlers',
      'Every form wired straight into your CRM and WhatsApp follow-up',
      'Trakheesi permit number, QR code, pricing basis and disclaimers placed where the rules require them',
      'Analytics and conversion tracking live before the first dirham of media',
    ],
  },
  {
    n: '09', name: 'CRM & Lead Management',
    partner: { name: 'Vyostra AI', href: 'https://vyostra.com/features?utm_source=qdnco.com&utm_medium=referral&utm_campaign=qdnco_services&utm_content=crm' },
    hook: 'Every lead in one place, from first reply to site visit.',
    chips: ['Built-in CRM', 'Lead routing'],
    points: [
      'One pipeline for Meta, Google, Bayut, Property Finder, website and WhatsApp leads',
      'Leads routed to the right salesperson the moment they arrive',
      'Stages tracked from enquiry to qualified lead to viewing to reservation',
      'Automatic WhatsApp and email follow-up until the lead replies',
      'Duplicate and junk enquiries flagged before they reach sales',
      'Weekly pipeline and lead-quality report, every number traceable to its source',
    ],
  },
];

/* Scroll the pinned services stage spends on each card. The track is one pinned
   screen plus this much per card, so adding a card lengthens the section instead
   of making every card flick past faster. */
const CARD_SCROLL_VH = 30;

/* The subtitle states the count; derive it so it cannot drift from the array. */
const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const SERVICE_COUNT_WORD = COUNT_WORDS[SERVICE_CARDS.length] || String(SERVICE_CARDS.length);

/* The Mux HLS stream behind the carousel.
 *
 * hls.js is needed everywhere except Safari, which plays HLS natively — so the
 * component tries the library first and falls back to a plain src. Both paths
 * are guarded: if the script has not loaded, or the network refuses the
 * manifest, the section simply renders on its own background rather than
 * breaking. It is decoration, so it must never be load-bearing.
 */
/* Loads the self-hosted hls.js once, on first need. Resolves null on failure so
   the caller can fall back to native HLS or no video. */
const HLS_SRC = '/js/vendor/hls-1.5.17.min.js';
let hlsPromise = null;
function loadHls() {
  if (window.Hls) return Promise.resolve(window.Hls);
  if (!hlsPromise) {
    hlsPromise = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = HLS_SRC;
      s.async = true;
      s.onload = () => resolve(window.Hls || null);
      s.onerror = () => { hlsPromise = null; resolve(null); };
      document.head.appendChild(s);
    });
  }
  return hlsPromise;
}

function HlsVideo({ src, className, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let hls = null;
    let cancelled = false;
    const start = () => loadHls().then((Hls) => {
      if (cancelled) return;
      if (Hls && Hls.isSupported()) {
        hls = new Hls({ capLevelToPlayerSize: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    });
    /* hls.js is 400 KB: fetch it only when the video is about to be seen. */
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      start();
    }, { rootMargin: '300px' }) : null;
    if (io) io.observe(video); else start();
    return () => { cancelled = true; if (io) io.disconnect(); if (hls) hls.destroy(); };
  }, [src]);
  return (
    React.createElement('video', { ref: ref, autoPlay: true, loop: true, muted: true, playsInline: true, 'aria-hidden': "true",
           className: className, style: style,} )
  );
}

/* One card. The dropdown panel is collapsed with max-height rather than removed,
   so its points stay in the HTML for crawlers and for anyone landing mid-page. */
function ServiceCard({ c, front, light, phone, open, onToggle }) {
  const panelRef = useRef(null);
  /* The panel can outgrow the stage on a short screen, so it scrolls — and any
     inner scroller inside a pinned track has to hand the wheel back at its end
     stop or the page dead-ends. */
  useScrollChain(panelRef);

  /* Technical services delivered by Vyostra AI: pressing anywhere on the card opens
     the Vyostra page in a new tab. The badge is the real, crawlable <a>; the card
     click is the convenience. The dropdown button stops propagation so it still
     only toggles. */
  const partner = c.partner;
  const openPartner = partner ? () => window.open(partner.href, '_blank', 'noopener') : undefined;

  return (
    React.createElement('div', { className: `rounded-[26px] h-full flex flex-col${light ? '' : ' liquid-glass-strong'}`,
         onClick: openPartner,
         'data-partner': partner ? partner.name : undefined,
         style: { padding: phone ? '1.25rem' : 'clamp(1.4rem, 1.8vw, 1.9rem)',
                  /* Both plates take a step toward their ground so the type on
                     them stops competing with the video behind. Deliberately
                     short of opaque — the movement showing through the card is
                     the point of putting it over a video at all. The dark plate
                     also drops to near-black rather than page ink: 10,13,18 at
                     0.66 was reading as grey haze over a bright frame. */
                  ...(light ? { background: 'rgba(255,255,255,0.90)',
                                border: '1px solid rgba(10,13,18,0.20)',
                                boxShadow: '0 18px 50px -28px rgba(10,13,18,0.55)' }
                            : { background: 'rgba(4,7,11,0.84)',
                                border: '1px solid rgba(255,255,255,0.13)' }),
                  ...(partner ? { cursor: 'pointer' } : {}) },}

      , React.createElement('div', { className: "flex items-baseline justify-between gap-3"   ,}
        , React.createElement('span', { className: "font-black tabular-nums" ,
              style: { color: 'rgba(var(--ink-rgb),0.5)', fontSize: 'clamp(1.5rem,2.2vw,2.2rem)', lineHeight: 1 },}, c.n)
        , partner && (
          React.createElement('a', { href: partner.href, target: "_blank", rel: "noopener",
             onClick: (e) => e.stopPropagation(),
             tabIndex: front ? 0 : -1,
             'aria-label': `${c.name} is delivered by ${partner.name} — opens ${partner.name} in a new tab`,
             className: "vyostra-badge rounded-full font-body whitespace-nowrap inline-flex items-center gap-1"      ,
             style: { color: 'var(--ink)', border: '1px solid rgba(var(--ink-rgb),0.62)',
                      background: 'transparent', padding: '0.24rem 0.62rem',
                      fontSize: 'var(--fs-micro)', fontWeight: 600, letterSpacing: '0.02em',
                      textDecoration: 'none', lineHeight: 1.2 },}
            , partner.name, React.createElement('span', { 'aria-hidden': "true", style: { fontSize: '0.95em' },}, "↗")
          )
        )
        , !partner && (
        React.createElement('div', { className: "flex flex-wrap justify-end gap-1.5"   ,}
          , c.chips.map((ch) => (
            React.createElement('span', { key: ch, className: "rounded-full font-body whitespace-nowrap"  ,
                  style: { background: 'rgba(var(--fill-rgb),0.14)', color: 'var(--ink)',
                           border: '1px solid rgba(var(--ink-rgb),0.3)',
                           padding: '0.24rem 0.6rem', fontSize: 'var(--fs-micro)' },}
              , ch
            )
          ))
        )
        )
      )

      /* Partner cards give the top-right corner to the badge, so their chips drop to
          a row of their own under the number. */
      , partner && (
        React.createElement('div', { className: "flex flex-wrap gap-1.5 mt-2.5"   ,}
          , c.chips.map((ch) => (
            React.createElement('span', { key: ch, className: "rounded-full font-body whitespace-nowrap"  ,
                  style: { background: 'rgba(var(--fill-rgb),0.14)', color: 'var(--ink)',
                           border: '1px solid rgba(var(--ink-rgb),0.3)',
                           padding: '0.24rem 0.6rem', fontSize: 'var(--fs-micro)' },}
              , ch
            )
          ))
        )
      )

      /* the service's own name, as the header */
      , React.createElement('h3', { className: "font-semibold uppercase mt-3.5"  ,
          style: { color: 'var(--ink)', fontSize: 'clamp(1.15rem, 1.9vw, 1.8rem)', lineHeight: 1.08, letterSpacing: '-0.01em' },}
        , c.name
      )

      , React.createElement('p', { className: "font-body mt-2" ,
         style: { color: 'rgba(var(--ink-rgb),0.95)', fontSize: 'var(--fs-caption)', lineHeight: 1.4 },}
        , c.hook
      )

      , React.createElement('button', { type: "button",
              onClick: (e) => { e.stopPropagation(); onToggle(); },
              'aria-expanded': open ? 'true' : 'false',
              tabIndex: front ? 0 : -1,
              className: "mt-4 rounded-full font-body inline-flex items-center justify-between gap-2 w-full"       ,
              style: { background: 'rgba(var(--fill-rgb),0.14)', color: 'var(--ink)',
                       border: '1px solid rgba(var(--ink-rgb),0.34)', cursor: 'pointer',
                       padding: '0.5rem 0.9rem', fontSize: 'var(--fs-micro)',
                       minHeight: 40 },}
        , React.createElement('span', { className: "uppercase tracking-[0.12em]" ,}, open ? 'Hide detail' : 'What this includes')
        , React.createElement('span', { 'aria-hidden': "true",
              style: { transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
                       fontSize: '1.05em', lineHeight: 1 },}, "+")
      )

      , React.createElement('div', { ref: panelRef,
           className: open ? 'overflow-y-auto' : 'overflow-hidden',
           style: { maxHeight: open ? (phone ? 190 : 230) : 0,
                    opacity: open ? 1 : 0,
                    marginTop: open ? '0.85rem' : 0,
                    transition: 'max-height 420ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease, margin-top 420ms ease',
                    overscrollBehaviorY: 'auto' },}
        , React.createElement('ul', { className: "space-y-2",}
          , c.points.map((pt) => (
            React.createElement('li', { key: pt, className: "flex gap-2.5 font-body"  ,
                style: { color: 'rgba(var(--ink-rgb),0.96)', fontSize: 'var(--fs-text)', lineHeight: 1.42 },}
              , React.createElement('span', { className: "rounded-full shrink-0" ,
                    style: { width: 4, height: 4, marginTop: 7, background: 'rgba(var(--ink-rgb),0.8)' },} )
              , React.createElement('span', { className: "min-w-0",}, pt)
            )
          ))
        )
      )
    )
  );
}

/* ── The carousel ──
 *
 * Scroll drives it, not buttons. Section progress picks the active card; every
 * other card takes a role from its signed distance to that card, so scrolling
 * back walks the whole arrangement backwards without any extra state. That is
 * the only way the reverse can be exact — an animation queue would drift out of
 * step the moment someone scrolls up mid-transition.
 *
 * Roles: 0 is front and sharp, ±1 are the flanks, anything further is stacked
 * behind centre and blurred out. Positions are percentages of the stage, so the
 * shape holds from a phone to a 4K panel.
 */
function ServiceCarousel({ p, light }) {
  const N = SERVICE_CARDS.length;
  const active = Math.min(N - 1, Math.floor(p * N * 0.999));
  const phone = useIsPhone();
  /* Open by default: the detail is the point of the card, and making someone
     press a control to reach it costs more attention than it saves space. The
     button now collapses rather than reveals. Each card opens as it reaches the
     front, so a card that has scrolled away is not left expanded behind. */
  const [open, setOpen] = useState(0);
  useEffect(() => { setOpen(active); }, [active]);

  /* Signed shortest distance, so card 0 sits beside the last card rather than N-1
     places away — the wrap has to be seamless in both directions. */
  const rel = (i) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const roleStyle = (d) => {
    const side = d < 0 ? -1 : 1;
    if (d === 0) {
      return { left: '50%', transform: `translateX(-50%) scale(${phone ? 1 : 1.04})`,
               filter: 'blur(0px)', opacity: 1, zIndex: 20 };
    }
    if (Math.abs(d) === 1) {
      return { left: phone ? `${50 + side * 46}%` : `${50 + side * 34}%`,
               transform: 'translateX(-50%) scale(0.74)',
               filter: 'blur(2px)', opacity: 0.7, zIndex: 10 };
    }
    return { left: '50%', transform: `translateX(-50%) translateX(${side * 8}px) scale(0.56)`,
             filter: 'blur(5px)', opacity: 0.38, zIndex: 5 };
  };

  /* Touch swipe, expressed as scroll rather than as a second source of truth.
     The stage is pinned and the active card is a function of scroll progress, so
     a swipe that moved a local index would immediately be overruled the next
     time the page moved a pixel. Advancing the page by one card's share of the
     track instead means the swipe drives the same value everything else reads —
     card, dots and video stay in agreement, and the gesture is undoable by
     scrolling back.

     The section is 100vh pinned plus CARD_SCROLL_VH per card, so the progress
     that selects a card is spread across N x CARD_SCROLL_VH: one card is exactly
     CARD_SCROLL_VH, whatever N is. */
  const swipeRef = useRef(null);
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    let x0 = 0, y0 = 0, tracking = false;

    const start = (e) => {
      if (e.touches.length !== 1) { tracking = false; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; tracking = true;
    };
    const end = (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0, dy = t.clientY - y0;
      /* Vertical-dominant gestures are the page scrolling past, not a swipe. */
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      const step = window.innerHeight * (CARD_SCROLL_VH / 100);
      window.scrollBy({ top: dx < 0 ? step : -step, behavior: 'smooth' });
    };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', end, { passive: true });
    return () => {
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchend', end);
    };
  }, []);

  return (
    /* pan-y, not none: the section is still a scrolling page and taking vertical
       gestures away from it would trap the reader on this screen. */
    React.createElement('div', { ref: swipeRef, className: "relative w-full" ,
         style: { height: phone ? 420 : 470, touchAction: 'pan-y' },}
      , SERVICE_CARDS.map((c, i) => {
        const d = rel(i);
        const front = d === 0;
        return (
          React.createElement('article', { key: c.n,
                   'aria-hidden': front ? undefined : 'true',
                   className: "absolute top-0" ,
                   style: {
                     width: phone ? 'min(84vw, 340px)' : 'min(34vw, 430px)',
                     ...roleStyle(d),
                     /* only the front card takes clicks — a blurred neighbour
                        swallowing a tap on the dropdown is worse than no tap */
                     pointerEvents: front ? 'auto' : 'none',
                     transition: 'left 650ms cubic-bezier(0.4,0,0.2,1), transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1)',
                     willChange: 'transform, filter, opacity, left',
                   },}
            /* The drift lives here, one level in. On the positioned element its
                keyframes would overwrite the carousel's own transform. */
            , React.createElement('div', { className: front ? 'card-float' : 'card-float-b',}
              , React.createElement(ServiceCard, { c: c, front: front, light: light, phone: phone,
                           open: open === i, onToggle: () => setOpen(open === i ? null : i),} )
            )
          )
        );
      })

      /* which card of N, so the scroll has a readable position */
      , React.createElement('div', { className: "absolute inset-x-0 -bottom-2 flex justify-center gap-1.5"     , 'aria-hidden': "true",}
        , SERVICE_CARDS.map((c, i) => (
          React.createElement('span', { key: c.n, className: "rounded-full",
                style: { width: i === active ? 22 : 6, height: 6,
                         background: i === active ? 'rgba(var(--ink-rgb),0.9)' : 'rgba(var(--ink-rgb),0.32)',
                         transition: 'width 400ms ease, background-color 400ms ease' },} )
        ))
      )
    )
  );
}

const SERVICES_VIDEO = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

/* ═══════════ 5. SERVICES ═══════════
 *
 * Two halves. A pinned stage where the flashcards rotate under scroll over
 * a video ground, and the full written detail in normal flow underneath — the
 * cards are the hook, the detail is what a crawler and a serious reader get.
 *
 * No overflow on the <section>. An ancestor with overflow set creates a scroll
 * container and kills position:sticky, which is what broke every pinned section
 * earlier in this build; the sticky element carries its own clipping instead.
 */
function ServicesSection() {
  const trackRef = useRef(null);
  const prog = useSectionProgress(trackRef);
  const { theme } = useTheme();
  const light = theme === 'light';
  /* The fades exist to blend the video into the section around it, so they take
     the page colour, not black. */
  const fade = 'var(--veil-soft)';

  return (
    React.createElement('section', { id: "services", className: "relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"   ,
             style: { background: 'var(--veil-soft)' },}

      , React.createElement('div', { ref: trackRef, className: "relative", style: { height: `${100 + SERVICE_CARDS.length * CARD_SCROLL_VH}vh` },}
        /* The bar's height is reserved rather than overlapped. Centring inside
            the full viewport put the headline behind the nav on arrival; the
            padding makes the centre the centre of the VISIBLE area. */
        , React.createElement('div', { className: "sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-start px-4 sm:px-8"         ,
             style: { paddingTop: 'calc(var(--chrome-clear) + clamp(0.35rem, 1.4vh, 1rem))' },}

          , React.createElement('div', { className: "absolute inset-x-0 top-0 z-[2] pointer-events-none"    ,
               style: { height: 200, background: `linear-gradient(to bottom, ${fade}, transparent)` },} )
          , React.createElement('div', { className: "absolute inset-x-0 bottom-0 z-[2] pointer-events-none"    ,
               style: { height: 200, background: `linear-gradient(to top, ${fade}, transparent)` },} )

          , React.createElement('div', { className: "relative z-10 w-full flex flex-col items-center"     ,
               style: { paddingTop: 'clamp(0.25rem, 1.2vh, 0.85rem)' },}
            , React.createElement('h2', { className: "hero-heading font-black uppercase text-center"   ,
                style: { fontSize: 'clamp(2.1rem, min(8.5vw, 12.5vh), 118px)', lineHeight: 0.9 },}, "Services")
            , React.createElement('p', { className: "text-center font-light max-w-xl mx-auto mt-3"    ,
               style: { color: 'rgba(var(--ink-rgb),0.92)',
                        fontSize: 'clamp(1rem, min(1.45vw, 2.1vh), 1.22rem)',
                        marginBottom: 'clamp(0.75rem, 2.4vh, 1.85rem)' },}
              , SERVICE_COUNT_WORD, " capabilities. Most engagements use three or four — the research gate decides which."
            )
            , React.createElement(ServiceCarousel, { p: prog, light: light,} )
          )
        )
      )

    )
  );
}

/* ═══════════ 6. PROJECTS — grouped, brand kit, bold numbers left, live site right ═══════════ */

/**
 * Card geometry is the fix for the cut-off problem. Previously each sticky card
 * was 85vh pinned at top-24 and offset by i*28px, so by the last card the stack
 * sat ~200px lower than the first and ran off the bottom. Now:
 *   STICKY_TOP + CARD_H  must always be < 100vh
 * and the stagger is capped, so every card lands fully on screen at any height.
 */
const STICKY_TOP = 76;
const CARD_H = 'min(64vh, 540px)';
const STAGGER = 8;

const GROUPS = [{key:'realestate', label:'Real Estate', note:'Our delivered real-estate acquisition work is in India; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original Dubai market research. We have not yet run a Dubai campaign. Every project below carries an evidence ledger, and project scale and campaign outcomes are labelled separately.', projects:[
{brand: BRANDS.brigade, "name": "Brigade Eternia", "cat": "Yelahanka · North Bengaluru", "role": "Portfolio marketing", "points": [["1,124", "Homes · project scale"], ["14 acres", "Development"], ["3 & 4 BHK", "Residential formats"]], "work": "Research, positioning and creative testing for Yelahanka buyers. Figures describe project scale, not units sold."},
{brand: BRANDS.brigade, "name": "Brigade Granada", "cat": "Whitefield–Kadugodi · East Bengaluru", "role": "Portfolio marketing", "points": [["40+ acres", "Client-supplied township scale"], ["3,500+", "Planned homes · client brief"], ["AED 26.46", "Cost per form lead*"]], "work": "Separate messaging for configurations and budget bands. *24 Aug–22 Sep 2026, brigade_granada_02 only; not the combined project total. Project scale is not sales delivered."},
{brand: BRANDS.brigade, "name": "Brigade Jeevan Sandya", "cat": "Kanakapura Road · South Bengaluru", "role": "Portfolio marketing", "points": [["133", "Homes · client brief"], ["28", "Floors · client brief"], ["3 & 4 BHK", "Residential formats"]], "work": "Launch positioning and catchment research for larger homes. Client-supplied project scale; internal project working name retained."},
{brand: BRANDS.brigade, "name": "Brigade Vanagaram", "cat": "Vanagaram · Chennai", "role": "Portfolio marketing", "points": [["10 acres", "Client-supplied development"], ["5 towers", "Client brief"], ["620 approx.", "Planned apartments"], ["2 & 3 BHK", "Client brief"]], "work": "Research and creative development for the Chennai portfolio. Client-supplied project specifications; not marketing outcomes or current inventory guarantees."},
{brand: BRANDS.brigade, "name": "Brigade Sylvana", "cat": "Naganahalli · Mysore", "role": "Portfolio marketing", "points": [["60+", "Villas · campaign brief"], ["9 acres", "Community · campaign brief"], ["40 × 60", "Plot dimensions · feet"]], "work": "Independent-villa positioning for the Mysore–Bengaluru corridor. Scale facts are from the client campaign brief, not sales delivered."},
{brand: BRANDS.woodscapes, "name": "Godrej Woodscapes", "cat": "Budigere Cross · East Bengaluru", "role": "Agency-account experience", "points": [["Meta + Google", "Agency-account experience"], ["Residential", "Project portfolio"], ["Creative", "Testing and iteration"], ["Enquiries", "Acquisition focus"]], "work": "Experience executing within an agency account for the Godrej portfolio. This describes delivery experience, not a direct developer appointment."},
{brand: BRANDS.tiara, "name": "Godrej Tiara", "cat": "Yeshwanthpur · Bengaluru", "role": "Agency-account experience", "points": [["Luxury", "Residential positioning"], ["Meta + Google", "Agency-account experience"], ["Creative", "Buyer-specific messaging"], ["Enquiries", "Acquisition focus"]], "work": "Luxury residential campaign experience, with positioning matched to the buyer and project. Direct developer appointment is not implied."},
{brand: BRANDS.msr, "name": "Godrej MSR City", "cat": "Shettigere · North Bengaluru", "role": "Agency-account experience", "points": [["Airport", "Corridor catchment"], ["Residential", "Project portfolio"], ["Meta + Google", "Agency-account experience"], ["Research", "Buyer context"]], "work": "Airport-corridor residential marketing experience through an agency account. Aggregate QDnCo figures are not allocated to this project."},
{brand: BRANDS.vaishnavi, "name": "Vaishnavi Life", "cat": "R.T. Nagar · Mysore", "role": "Portfolio marketing", "points": [["45 acres", "Client-supplied layout scale"], ["598", "Plots · client brief"], ["AED 18.31", "Cost per form lead*"]], "work": "Plotted-development messaging for a land buyer. *24 Aug–22 Sep 2026; historical campaign, currently off. Form leads do not represent completed sales."},
{brand: BRANDS.bhartiya, "name": "Nikoo Homes 9", "cat": "KIADB–Bagalur · North Bengaluru", "role": "Portfolio marketing", "points": [["AED 40.59", "Cost per form lead*"], ["56,116", "Ad impressions*"], ["Residential", "Buyer research"]], "work": "Configuration-led messaging and lead generation. *24 Aug–22 Sep 2026, nikoo_09_01; not including the separate test campaign. No qualification or sales inference."},
{brand: BRANDS.nambiar, "name": "Nambiar Bannerghatta", "cat": "Bannerghatta · Bengaluru", "role": "Portfolio marketing", "points": [["76 acres", "Master plan · client brief"], ["36 acres", "Phase 1 · client brief"], ["Villas", "Luxury residential"]], "work": "Nature-led villa positioning, buyer research and creative tests. Land area is client-supplied project scale, not a marketing result."},
{brand: BRANDS.urbanrise, "name": "Urbanrise Paradise on Earth", "cat": "Gangasandra · Bengaluru", "role": "Portfolio marketing", "points": [["Villas", "Residential format"], ["Phase 2", "Client brief received"], ["Meta", "Lead generation"]], "work": "Project-specific villa positioning, creative development and acquisition work. Phase 2 is recorded in the client brief."},
{brand: BRANDS.vajram, "name": "Vajram KGF 2.0", "cat": "Kogilu · North Bengaluru", "role": "Portfolio marketing", "points": [["118", "Homes · client brief"], ["2 towers", "Project scale"], ["3 BHK", "Residential format"]], "work": "3 BHK buyer positioning and campaign testing. Figures describe the client-supplied project scale, not completed sales."},
{brand: BRANDS.kumar, "name": "Kumar Platina", "cat": "Nagasandra · Bengaluru", "role": "Portfolio marketing", "points": [["184", "Apartments · client brief"], ["2 towers", "Project scale"], ["AED 36.02", "Cost per form lead*"]], "work": "Metro-corridor buyer research and lead-generation work. *24 Aug–22 Sep 2026, KumarPlatina_C1_LEADGEN only. Current client price brief: AED 734K (₹1.9 Cr) onwards, subject to confirmation and availability."},
{brand: BRANDS.indium, "name": "Indium Group", "cat": "North Bengaluru · Residential", "role": "Historical owner report", "points": [["AED 12.32", "Historical CPL · owner report"], ["51%", "Historical qualified · owner report"], ["14 days", "Reported test period"], ["Research", "Controlled campaign test"]], "work": "Historical owner-reported project example; source reconciliation remains open. The 51% is this specific earlier cohort, distinct from the owner-reported 60%+ overall figure."}
]}];

/* Flatten once so numbering runs 01…10 across both groups. */
const FLAT = (() => { let n = 0; return GROUPS.map(g => ({ ...g, projects: g.projects.map(p => ({ ...p, n: String(++n).padStart(2,'0') })) })); })();
const TOTAL_PROJECTS = FLAT.reduce((a, g) => a + g.projects.length, 0);

const ROLE_TINT = {
  'Owned': { bg: 'rgba(94,233,160,0.15)', fg: '#7DF0B4' },
  'Led': { bg: 'rgba(255,255,255,0.10)', fg: 'var(--ink-body)' },
  'Executed (agency account)': { bg: 'rgba(var(--fill-rgb),0.05)', fg: 'rgba(var(--ink-rgb),0.6)' },
};

function SiteMock({ brand }) {
  if (!brand.shot) {
    return (
      React.createElement('div', { className: "h-full w-full rounded-xl flex flex-col items-center justify-center gap-3 px-6 text-center"         ,
           style: { background: 'rgba(var(--fill-rgb),0.03)', border: '1px dashed rgba(var(--ink-rgb),0.18)' },}
        , React.createElement(BrandMark, { b: brand, h: 30,} )
        , React.createElement('span', { className: "font-body font-light uppercase"  , style: { color: 'rgba(var(--ink-rgb),0.5)', letterSpacing: '0.12em', fontSize: 'var(--fs-micro)' },}, "Developer website"

        )
      )
    );
  }
  /* Curved on all four corners and top-aligned, so the site fills the whole right
     side of the card and gets cut cleanly at the base instead of running to a
     hard edge. The traffic-light chrome stays — it is what reads as "live site". */
  return (
    React.createElement('div', { className: "h-full w-full overflow-hidden flex flex-col"    ,
         style: { background: 'var(--panel-2)', border: '1px solid rgba(var(--ink-rgb),0.18)',
                  borderRadius: 'clamp(16px, 2vw, 26px)' },}
      , React.createElement('div', { className: "flex items-center gap-2 px-3 shrink-0"    , style: { height: 28, background: 'rgba(var(--fill-rgb),0.06)' },}
        , React.createElement('span', { className: "rounded-full shrink-0" , style: { width: 8, height: 8, background: '#FF5F57' },} )
        , React.createElement('span', { className: "rounded-full shrink-0" , style: { width: 8, height: 8, background: '#FEBC2E' },} )
        , React.createElement('span', { className: "rounded-full shrink-0" , style: { width: 8, height: 8, background: '#28C840' },} )
        , React.createElement('span', { className: "mx-auto rounded px-3 font-body truncate"    ,
              style: { background: 'rgba(0,0,0,0.4)', color: 'rgba(var(--ink-rgb),0.92)',
                       fontSize: 'var(--fs-micro)', lineHeight: '19px' },}
          , brand.domain
        )
      )
      , React.createElement('div', { className: "relative flex-1 min-h-0 overflow-hidden"   ,}
        , React.createElement('img', { src: brand.shot, alt: brand.name + ' website', loading: "lazy", draggable: false,
             className: "absolute inset-0 w-full h-full object-cover object-top"     ,} )
        /* soft fade into the curved base so the crop does not read as a hard cut */
        , React.createElement('div', { className: "pointer-events-none absolute inset-x-0 bottom-0"   , style: { height: '18%', background: 'linear-gradient(to top, rgba(10,13,18,0.75), transparent)' },} )
      )
    )
  );
}

function ProjectCard({ p, i, total, progress }) {
  const targetScale = 1 - (total - 1 - i) * 0.02;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const hasSite = !!p.brand.site;
  const tint = ROLE_TINT[p.role] || ROLE_TINT['Led'];
  const Card = hasSite ? motion.a : motion.div;
  const linkProps = hasSite ? { href: p.brand.site, target: '_blank', rel: 'noreferrer noopener' } : {};

  return (
    React.createElement('div', { className: "sticky", style: { top: STICKY_TOP, height: CARD_H, marginBottom: '2.5rem' },}
      , React.createElement(Card, { ...linkProps,
        className: `relative h-full rounded-[26px] md:rounded-[32px] overflow-hidden ${hasSite ? 'group' : ''}`,
        style: {
          scale, top: Math.min(i, 4) * STAGGER,
          border: '1.5px solid rgba(var(--ink-rgb),0.55)',
          background: 'var(--page)', display: 'flex', flexDirection: 'column',
          textDecoration: 'none', cursor: hasSite ? 'pointer' : 'default',
        },}

        /* HEADER */
        , React.createElement('div', { className: "shrink-0 flex items-center gap-4 md:gap-6 px-5 md:px-7 py-3.5 md:py-4"        ,
             style: { borderBottom: '1px solid rgba(var(--ink-rgb),0.14)' },}
          , React.createElement('span', { className: "font-black tabular-nums shrink-0"  ,
                style: { color: 'rgba(var(--ink-rgb),0.22)', fontSize: 'clamp(1.9rem,3.4vw,3rem)', lineHeight: 1, letterSpacing: '-0.02em' },}
            , p.n
          )
          , React.createElement('span', { className: "shrink-0 self-stretch" , style: { width: 1, background: 'rgba(var(--ink-rgb),0.16)' },} )
          , React.createElement('div', { className: "min-w-0 flex-1 flex items-center gap-4 md:gap-5"     ,}
            /* brand mark in its own colours, on a light chip */
            , React.createElement(BrandMark, { b: p.brand, h: 30, plate: true,} )
            , React.createElement('span', { className: "shrink-0 hidden sm:block self-center"   , style: { width: 1, height: 26, background: 'rgba(var(--ink-rgb),0.16)' },} )
            , React.createElement('span', { className: "min-w-0",}
              , React.createElement('span', { className: "block font-semibold uppercase leading-none truncate"    ,
                    style: { color: 'var(--ink)', fontSize: 'clamp(1.05rem,2vw,1.85rem)', letterSpacing: '0.01em' },}, p.name)
              , React.createElement('span', { className: "block font-body font-light uppercase tracking-[0.16em] mt-1.5 truncate"      ,
                    style: { color: 'rgba(var(--ink-rgb),0.66)', fontSize: 'var(--fs-micro)' },}, p.cat)
            )
          )
        )

        /* BODY */
        /* Numbers sit centred in their column rather than pinned to the top, and
            run larger now that the role badge and button are gone. */
        , React.createElement('div', { className: "flex-1 min-h-0 split-body"  ,}
          , React.createElement('div', { className: "min-w-0 flex flex-col justify-center gap-4 px-5 md:px-7 py-4"       ,
               style: { borderRight: '1px solid rgba(var(--ink-rgb),0.14)' },}
            , React.createElement('div', { className: "grid grid-cols-2 gap-x-2.5 gap-y-5 md:gap-y-6"    , style: { maxWidth: 'min(100%, 30rem)' },}
              , p.points.map(([v, k]) => (
                React.createElement('div', { key: k, className: "min-w-0",}
                  , React.createElement('div', { className: "font-black leading-[0.88] truncate"  ,
                       style: { color: 'var(--ink)', fontSize: 'clamp(1.35rem,3.1vw,3rem)', letterSpacing: '-0.025em' },}, v)
                  , React.createElement('div', { className: "font-body font-medium uppercase tracking-[0.13em] mt-1.5"    ,
                       style: { color: 'rgba(var(--ink-rgb),0.6)', fontSize: 'var(--fs-micro)', lineHeight: 1.25 },}, k)
                )
              ))
            )
            , React.createElement('p', { className: "font-body font-light project-source-note"  ,
               style: { color: 'rgba(var(--ink-rgb),0.68)', fontSize: 'var(--fs-text)', lineHeight: 1.55 },}, p.work)
          )

          /* the client's site fills the whole right side, curved top and bottom */
          , React.createElement('div', { className: "min-w-0 p-3 md:p-4 pl-0 md:pl-0"    ,}, React.createElement(SiteMock, { brand: p.brand,} ))
        )
      )
    )
  );
}

/**
 * The break between one sector's cards and the next.
 *
 * Driven by the band's own scroll progress rather than a whileInView trigger,
 * because the movement has to run both ways: the title rushes out of the page
 * centre toward the reader, holds, then carries upward as the next group's
 * cards come in underneath. A one-shot reveal cannot do the second half.
 *
 * Scale and blur move together — a thing arriving from depth resolves as it
 * approaches — and the rule and meta fade in behind it once it has landed, so
 * the sector name is the only thing moving during the approach.
 */
function GroupBreak({ g }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scale   = useTransform(p, [0, 0.34, 0.52, 1], [0.46, 1.05, 1, 0.9]);
  const y       = useTransform(p, [0, 0.34, 0.52, 1], ['26vh', '0vh', '-1vh', '-18vh']);
  const opacity = useTransform(p, [0, 0.16, 0.74, 1], [0, 1, 1, 0.12]);
  const blurPx  = useTransform(p, [0, 0.3], [14, 0]);
  const filter  = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);

  /* The sector name and nothing else. The count-and-note strip that used to sit
     under it repeated the inline header from the first group and read as a
     stray caption between two cards, so the break is now purely the title. */
  return (
    React.createElement('div', { ref: ref, className: "group-break",}
      , React.createElement(motion.div, { className: "group-break-stage", style: { scale, y, opacity, filter },}
        , React.createElement('span', { className: "group-break-label",}, g.label)
      )
    )
  );
}

/* Projects: a single-row rail that drifts left (UI audit P-1, Scroll Stop
   reference). Homepage order, all projects. The loop is a second copy of the list,
   aria-hidden with tabindex=-1 links, so screen readers and keyboards meet each
   project once while mouse and touch clicks still work. Motion
   pauses on hover, on keyboard focus and with the Pause button, and is off
   entirely under prefers-reduced-motion, where the rail becomes a swipeable row. */
const WORK_BASE = "/work/";
const CASE_SLUG = {
  'Indium Group': 'indium-north-bangalore', 'Kumar Platina': 'kumar-platina',
  'Brigade Eternia': 'brigade-eternia', 'Brigade Granada': 'brigade-granada',
  'Brigade Jeevan Sandya': 'brigade-jeevan-sandya', 'Brigade Vanagaram': 'brigade-vanagaram',
  'Godrej Woodscapes': 'godrej-woodscapes', 'Godrej Tiara': 'godrej-tiara', 'Godrej MSR City': 'godrej-msr-city',
  'Nambiar Bannerghatta': 'nambiar-bannerghatta', 'Vaishnavi Life': 'vaishnavi-life-mysore',
  'Nikoo Homes 9': 'nikoo-homes-9', 'Urbanrise Paradise on Earth': 'urbanrise-paradise-on-earth',
  'Vajram KGF 2.0': 'vajram-kogilu',
};
function projectHeadline(p) { return p.points.find((pt) => /cost per|cpl/i.test(pt[1])) || p.points[0]; }
function projectHref(p) { return CASE_SLUG[p.name] ? WORK_BASE + CASE_SLUG[p.name] + '.html' : WORK_BASE + 'index.html'; }

function ProjectTile({ p, ghost, plain, pos }) {
  const [value, label] = projectHeadline(p);
  const hasCase = !!CASE_SLUG[p.name];
  return (
    React.createElement('article', { className: "qd-card",}
      , React.createElement('div', { className: plain ? "qd-card-media is-plain" : "qd-card-media",}
        , p.brand.shot && !plain ? React.createElement('img', { src: p.brand.shot, alt: ghost ? '' : p.brand.name + ' website', loading: "lazy", draggable: false, style: { objectPosition: pos },} ) : null
        , React.createElement('span', { className: "qd-card-n",}, p.n)
        , React.createElement('span', { className: "qd-card-logo",}
          , React.createElement('img', { src: p.brand.logo.replace('vajram.webp', 'vajram-dark-on-white.png'), alt: ghost ? '' : p.brand.name, loading: "lazy", draggable: false,} )
        )
      )
      , React.createElement('div', { className: "qd-card-body",}
        , React.createElement('p', { className: "qd-card-cat",}, p.cat)
        , React.createElement('h3', { className: "qd-card-name",}, p.name)
        , React.createElement('p', { className: "qd-card-stat",}
          , React.createElement('strong', null, value)
          , React.createElement('span', null, label)
        )
        , React.createElement('a', { className: "qd-card-cta", href: projectHref(p), tabIndex: ghost ? -1 : undefined,
            'aria-label': (hasCase ? 'View case study: ' : 'View all projects, including ') + p.name,}
          , hasCase ? 'View case study' : 'View in portfolio'
          , React.createElement('span', { className: "qd-card-arrow", 'aria-hidden': "true",}, "→")
        )
      )
    )
  );
}

function ProjectsSection() {
  const [paused, setPaused] = useState(false);
  const list = FLAT.flatMap((g) => g.projects);
  /* Screenshots exist per developer, not per project. Every card shows a photo;
     repeat cards for the same developer pan to a different part of the shot.
     A logo panel is only for a project with no screenshot at all. */
  const PANS = ['50% 0%', '0% 0%', '100% 0%', '25% 0%', '75% 0%'];
  const shotCount = {};
  const plainFor = {};
  const posFor = {};
  list.forEach((p) => { const k = p.brand.shot || ''; plainFor[p.n] = !k; const c = shotCount[k] || 0; posFor[p.n] = PANS[c % PANS.length]; shotCount[k] = c + 1; });
  return (
    React.createElement('section', { id: "projects", className: "qd-proj relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pb-8 sm:pb-12"         , style: { background: 'var(--veil)', paddingTop: 'calc(var(--chrome-clear) + 1rem)' },}
      , React.createElement('div', { className: "px-4 sm:px-7 md:px-10" ,}
        , React.createElement('h2', { className: "hero-heading font-black uppercase leading-none tracking-tight text-center"     ,
            style: { fontSize: 'clamp(2.4rem, min(11vw, 13.5vh), 150px)' },}, "Projects")
        , React.createElement('p', { className: "text-center mb-8 font-body font-light max-w-xl mx-auto"     , style: { color: 'rgba(var(--ink-rgb),0.74)', fontSize: 'var(--fs-text-lg)' },}, "Selected real-estate project work across client and agency portfolios. Developer logos identify the projects; they do not imply direct appointment or endorsement. Campaign figures show their reporting period; project inventory is not units sold."
                                           , ' '
          , React.createElement('a', { href: WORK_BASE + "index.html", style: { color: 'var(--accent)' },}, "Read the full case studies →"     )
        )
      )
      , React.createElement('div', { className: "qd-rail", 'data-paused': paused ? 'true' : 'false', role: "region", 'aria-label': "Projects, scrolling",}
        , React.createElement('div', { className: "qd-track",}
          , React.createElement('ul', { className: "qd-set",}
            , list.map((p) => React.createElement('li', { key: p.n,}, React.createElement(ProjectTile, { p: p, ghost: false, plain: plainFor[p.n], pos: posFor[p.n],} )))
          )
          , React.createElement('ul', { className: "qd-set", 'aria-hidden': "true",}
            , list.map((p) => React.createElement('li', { key: 'g' + p.n,}, React.createElement(ProjectTile, { p: p, ghost: true, plain: plainFor[p.n], pos: posFor[p.n],} )))
          )
        )
      )
      , React.createElement('div', { className: "qd-actions px-4" ,}
        , React.createElement('a', { className: "qd-all", href: WORK_BASE + "index.html",}, "View all " + list.length + " projects", React.createElement('span', { 'aria-hidden': "true",}, " →"))
        , React.createElement('button', { type: "button", className: "qd-pause", 'aria-pressed': paused, onClick: () => setPaused(!paused),}
          , paused ? 'Play' : 'Pause', React.createElement('span', { className: "sr-only",}, " project scrolling")
        )
      )
      , React.createElement('p', { className: "qd-note px-4" ,}, "* Cost per form lead is for the named ad set and reporting period on each case study, not a combined project total. Project scale is client-supplied and is not units sold. Rupee figures are converted to AED at ₹25.9 per AED (October 2026); cost per lead includes a 20% Dubai cost allowance.")
    )
  );
}

/* ═══════════ 6b. ROADMAP — the launch sequence ═══════════ */

/**
 * The delivery system from the portfolio doc, staged as a launch sequence — a
 * deliberate callback to the cinematic hero. Phases 0–2 are pre-launch and read
 * in steel; at Phase 3 the sequence ignites and everything downstream carries
 * the magenta gradient, because that is the actual argument in the source
 * document: "from Phase 3 onward you are live in the market."
 *
 * Pinned like the About timeline and driven by the same rAF-independent
 * progress hook, so the rail, the status readout and the detail panel can never
 * disagree about which phase you are on.
 */
const PHASES = [
  { id:'00', title:'Questionnaire & Business Learning', dur:'~2 weeks', live:false,
    lead:'Research does not start until the brief is real.',
    points:['Business model · goals · units · ticket · sales process','Past ad history and brand assets audited','Catchment, competitors, capacity, decision-makers','Output: a brief that gates everything downstream'] },
  { id:'01', title:'Market Research & Intelligence', dur:'~2 weeks', live:false,
    lead:'Three separate research tracks, run in parallel — nothing here is guesswork.',
    /* Rendered as three verticals rather than a bullet list: primary on the far
       left, secondary through the middle (it carries the most weight), historical
       on the right. No internal shorthand — every term is written out in full. */
    columns:[
      { key:'primary', label:'Primary', span:'1fr',
        means:'Primary research means going directly to the people who buy, and asking them.',
        items:[
          'One-to-one interviews with your ideal customer profile',
          'What actually makes them stop scrolling on an advert',
          'Their interests, fears and aspirations, in their own words',
          'Which trust signals make them believe a brand is credible',
          'Whether the offer you have today matches what they are asking for',
        ] },
      { key:'secondary', label:'Secondary', span:'1.55fr',
        means:'Secondary research means reading the entire market before a dirham is committed.',
        items:[
          'Total addressable market analysis — how large the real buying pool is',
          'Competitive landscape mapping — who else bids for the same buyer',
          'Buyer persona and segmentation modelling',
          'Industry trend analysis',
          'Strengths, weaknesses, opportunities and threats assessment',
          'Porter’s five forces — supplier, buyer and rivalry pressure',
          'Pricing strategy analysis against comparable inventory',
          'Go-to-market strategy design',
          'Customer journey mapping, first touch to booking',
          'Unit economics and financial modelling',
          'Risk and scenario planning',
          'Market entry and expansion planning',
        ],
        note:'Custom Python scrapers and crawlers pull all of this at scale — the Meta Ad Library, the Google Ads Transparency Center, listing portals, competitor creative, price movements and launch timing — collected on a schedule and refreshed, not read off a single afternoon of desk research.' },
      { key:'historical', label:'Historical', span:'1fr',
        means:'Historical research means studying your own past so the same money is never spent twice.',
        items:[
          'Every campaign and channel that worked before, and the reason it worked',
          'Every campaign that failed, so the same mistake is not repurchased',
          'The strategic decisions that built the brand, so they get protected',
        ] },
    ],
    points:[] },
  { id:'02', title:'Architecture & Creative Direction', dur:'10 days – 2 weeks', live:false,
    lead:'Nothing reaches production without a positive approval.',
    points:['Full-funnel structure — TOF / MOF / BOF / RTG','Trakheesi permit and QR placement agreed per creative','Creative script pack: hooks, value props, high-CTR angles, CTAs','AI pipeline primed for high-volume creative testing once live','Approval loop — a no routes back to live references','Studio package only if the brief needs a shoot'] },
  { id:'03', title:'A/B Testing + Market Launch', dur:'~1 month', live:true,
    lead:'You enter the market here. Budget works in market, not in decks.',
    points:['Creative volume — hooks, formats, AI statics and motion at daily cadence','Budget — pacing, test vs scale splits','Allocation — TOF / MOF / BOF / RTG weights','Platform, persona, segmentation and market response'] },
  { id:'04', title:'Lead Funnel · CRM · Dashboard', dur:'~1 week', live:true,
    lead:'Absolute transparency — dashboard plus weekly reporting. No black box.',
    points:['Sales / CIS process mapped and aligned','Lead funnel designed and executed with sales','Real-time CRM routing and alerts','Weekly dashboard: spend, CPL, quality, scaling decisions'] },
  { id:'05', title:'Track · Learn · Scale', dur:'Ongoing', live:true,
    lead:'Market response drives budget. Kill what fails, scale what converts.',
    points:['Weekly CPL and lead-quality review','Budget scaling gated on proven unit economics','Creative refresh on fatigue signals','Month 3 — the system is locked and repeatable'] },
];

/* STEEL fills small chips as well as text, so it needs a companion foreground:
   on a dark page the chip is pale and the number sits dark on it, on a white page
   the chip is dark ink and the number has to invert. */
const STEEL = 'linear-gradient(90deg, rgba(var(--ink-rgb),0.85), rgba(var(--ink-rgb),0.45))';
const ON_STEEL = 'var(--on-steel)';

/**
 * The research classification, drawn as the concept map it is in the source doc
 * rather than as three columns of prose.
 *
 * Three columns failed at both ends: on a phone they crushed to unreadable, and
 * on a wide screen twelve bullet lines became a grey wall nobody scans. A root
 * node with a spine and three labelled branches solves both — the shape carries
 * the classification at a glance, and the leaves become chips, which wrap
 * naturally at any width instead of forcing a fixed column count.
 *
 * The spine and elbows are plain divs, not an SVG. Branch heights differ (twelve
 * leaves versus three), so anything with hard-coded connector coordinates would
 * drift out of alignment the moment the text reflowed.
 */
function ResearchTree({ columns, light = false }) {
  /* Accent per branch. The dark palette's mint and pale blue wash out on white,
     so the light variant uses saturated equivalents that hold their contrast. */
  const TINT = light
    ? { primary: '#0E8F5B', secondary: '#A8129C', historical: '#2A5FAE' }
    : { primary: 'var(--tint-primary)', secondary: 'var(--tint-secondary)', historical: 'var(--tint-historical)' };
  /* Tokens in both branches — `light` now only changes size and layout, not
     colour, so the tree reads correctly on a white or a black ground. */
  const ink      = 'var(--ink)';
  const muted    = 'rgba(var(--ink-rgb),0.62)';
  const leafFg   = 'rgba(var(--ink-rgb),0.8)';
  const line     = 'rgba(var(--ink-rgb),0.22)';
  const cardBg   = 'rgba(var(--fill-rgb),0.04)';
  const leafBg   = 'rgba(var(--fill-rgb),0.06)';
  const leafEdge = 'rgba(var(--ink-rgb),0.14)';

  /* This is the one panel on the page deep enough to scroll on its own, and it
     sits inside the pinned roadmap track — so it needs the wheel handed back
     to the page the moment it runs out, or phase 01 becomes a dead end. */
  const scroller = useRef(null);
  useScrollChain(scroller);

  return (
    React.createElement('div', { ref: scroller, className: light ? 'w-full' : 'flex-1 min-h-0 mt-3 pt-3 overflow-y-auto',
         style: light ? {} : { borderTop: '1px solid rgba(var(--ink-rgb),0.14)', overscrollBehaviorY: 'auto' },}
      , React.createElement('div', { className: "flex flex-col sm:flex-row items-stretch"   ,}

        /* root */
        , React.createElement('div', { className: "flex sm:items-center shrink-0 sm:pr-3 pb-3 sm:pb-0"     ,}
          , React.createElement('div', { className: "rounded-2xl px-4 py-3 text-center sm:text-left"    ,
               style: { background: cardBg, border: `1px solid ${line}`, maxWidth: light ? 215 : 168 },}
            , React.createElement('div', { className: "font-body uppercase tracking-[0.2em]"  ,
                 style: { color: muted, fontSize: 'var(--fs-micro)' },}, "Phase 01" )
            , React.createElement('div', { className: "font-black uppercase leading-tight mt-1"   ,
                 style: { color: ink, fontSize: light ? 'clamp(0.98rem,1.45vw,1.3rem)' : 'clamp(0.86rem,1.25vw,1.05rem)' },}, "Market research & intelligence"

            )
            , React.createElement('div', { className: "font-body font-light mt-1.5"  ,
                 style: { color: muted, fontSize: 'var(--fs-micro)' },}, "three tracks, in parallel"   )
          )
        )

        /* spine + branches */
        , React.createElement('div', { className: "relative flex-1 min-w-0 pl-5 sm:pl-7 space-y-2"     ,}
          , React.createElement('div', { className: "absolute left-0 w-px"  , style: { top: '9%', bottom: '9%', background: line },} )

          , columns.map((c) => {
            const tint = TINT[c.key] || 'var(--ink-body)';
            return (
              React.createElement('div', { key: c.key, className: "relative",}
                /* elbow into the spine */
                , React.createElement('div', { className: "absolute top-1/2 h-px"  ,
                     style: { left: 'calc(-1 * clamp(1.25rem, 1.75rem, 1.75rem))', width: 'clamp(1.25rem,1.75rem,1.75rem)', background: line },} )
                , React.createElement('div', { className: "absolute top-1/2 rounded-full"  ,
                     style: { left: -3.5, width: 7, height: 7, marginTop: -3.5, background: tint, boxShadow: `0 0 8px 1px ${tint}66` },} )

                , React.createElement('div', { className: "rounded-xl px-3.5 py-2.5"  ,
                     style: { background: cardBg, border: `1px solid ${tint}${light ? '55' : '3d'}` },}
                  , React.createElement('div', { className: "flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5"    ,}
                    , React.createElement('span', { className: "font-black uppercase leading-none"  ,
                          style: { color: tint, fontSize: light ? 'clamp(1rem,1.4vw,1.28rem)' : 'clamp(0.82rem,1.15vw,1rem)', letterSpacing: '0.01em' },}
                      , c.label
                    )
                    , React.createElement('span', { className: "font-body font-light min-w-0"  ,
                          style: { color: muted, fontSize: light ? 'clamp(0.82rem,1.08vw,0.98rem)' : 'clamp(0.7rem,0.92vw,0.8rem)' },}
                      , c.means
                    )
                  )

                  /* leaves as wrapping chips — no fixed column count to break */
                  , React.createElement('div', { className: "flex flex-wrap gap-1.5 mt-2"   ,}
                    , c.items.map((it) => (
                      React.createElement('span', { key: it, className: "rounded-md font-body font-light"  ,
                            style: { background: leafBg, border: `1px solid ${leafEdge}`,
                                     color: leafFg, padding: light ? '0.32rem 0.66rem' : '0.22rem 0.5rem',
                                     fontSize: light ? 'clamp(0.82rem,1.05vw,0.96rem)' : 'clamp(0.7rem,0.88vw,0.8rem)', lineHeight: 1.4 },}
                        , it
                      )
                    ))
                  )

                  , c.note && (
                    React.createElement('div', { className: "rounded-lg px-3 py-2 mt-2"   ,
                         style: { background: light ? 'rgba(168,18,156,0.07)' : 'rgba(182,0,168,0.1)', border: `1px solid ${light ? 'rgba(168,18,156,0.35)' : 'rgba(182,0,168,0.4)'}` },}
                      , React.createElement('div', { className: "font-body uppercase tracking-[0.18em]"  ,
                           style: { color: light ? '#8E1A86' : '#E85BD0', fontSize: 'var(--fs-micro)' },}, "How it gets collected"   )
                      , React.createElement('div', { className: "font-body font-light mt-0.5"  ,
                           style: { color: leafFg, fontSize: light ? 'clamp(0.82rem,1.05vw,0.96rem)' : 'clamp(0.74rem,0.86vw,0.78rem)', lineHeight: 1.5 },}
                        , c.note
                      )
                    )
                  )
                )
              )
            );
          })
        )
      )
    )
  );
}

/* ═══════════ 7. PROCESS — vertical timeline ═══════════
 *
 * This replaced a 500vh sticky track that showed one phase at a time, driven by
 * scroll position. That worked on a wide screen and fell apart on a phone: a
 * two-column rail plus detail panel compressed into 375px left every phase
 * cramped, and the one panel deep enough to need its own scrollbar dead-ended
 * the page. It also meant five of the six phases were absent from the DOM at any
 * moment, so the build had to sweep the track and inject the missing ones for
 * crawlers.
 *
 * A timeline solves all three at once. Every phase is a card on a spine, always
 * present, always fully readable. There is one layout, not a desktop layout and
 * a broken phone version of it — the spine moves from centre-left to flush-left
 * and the cards go full width, but the structure and the reading order never
 * change. Nothing is pinned, so nothing can dead-end.
 */
function PhaseCard({ ph, i }) {
  const live = ph.live;
  const accent = live ? '#E85BD0' : 'rgba(var(--ink-rgb),0.55)';

  return (
    React.createElement('li', { className: "relative pl-14 sm:pl-20 pb-8 sm:pb-10 last:pb-0"     ,}
      /* node on the spine */
      , React.createElement('span', { 'aria-hidden': "true",
            className: "absolute left-0 grid place-items-center rounded-xl font-black tabular-nums shrink-0"       ,
            style: {
              top: 2, width: 'clamp(38px, 4.4vw, 46px)', height: 'clamp(32px, 3.6vw, 38px)',
              background: live ? FILL : STEEL, color: live ? '#FFFFFF' : ON_STEEL,
              fontSize: 'var(--fs-caption)',
              boxShadow: live ? '0 0 18px rgba(182,0,168,0.45)' : 'none',
            },}
        , ph.id
      )

      , React.createElement('div', { className: "rounded-2xl md:rounded-[26px] p-4 sm:p-6 md:p-7"    ,
           style: { background: 'var(--panel)',
                    border: live ? '1.5px solid rgba(182,0,168,0.42)' : '1.5px solid var(--panel-edge)' },}

        , React.createElement('div', { className: "flex flex-wrap items-baseline gap-x-3 gap-y-1.5"    ,}
          , React.createElement('h3', { className: "font-semibold uppercase leading-tight"  ,
              style: { color: 'var(--ink)', fontSize: 'clamp(1rem, 1.9vw, 1.6rem)' },}, ph.title)
          , live && (
            React.createElement('span', { className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-body uppercase tracking-[0.16em] whitespace-nowrap"         ,
                  style: { background: 'rgba(125,240,180,0.14)', color: '#7DF0B4', fontSize: 'var(--fs-micro)' },}
              , React.createElement('span', { className: "rounded-full", style: { width: 5, height: 5, background: '#7DF0B4' },} ), " live in market"
            )
          )
          , React.createElement('span', { className: "font-body font-light uppercase tracking-[0.18em] ml-auto whitespace-nowrap"     ,
                style: { color: 'rgba(var(--ink-rgb),0.5)', fontSize: 'var(--fs-micro)' },}, ph.dur)
        )

        , React.createElement('p', { className: "font-medium mt-2.5" ,
           style: { color: 'var(--ink-body)', fontSize: 'clamp(0.86rem, 1.25vw, 1.05rem)', lineHeight: 1.5 },}, ph.lead)

        , ph.columns ? (
          React.createElement(ResearchTree, { columns: ph.columns,} )
        ) : (
          React.createElement('ul', { className: "mt-3.5 pt-3.5 space-y-2"  , style: { borderTop: '1px solid rgba(var(--ink-rgb),0.14)' },}
            , ph.points.map((pt) => (
              React.createElement('li', { key: pt, className: "flex gap-3 font-body font-light"   ,
                  style: { color: 'rgba(var(--ink-rgb),0.76)', fontSize: 'var(--fs-text)', lineHeight: 1.5 },}
                , React.createElement('span', { className: "rounded-full shrink-0" , style: { width: 5, height: 5, marginTop: 8, background: accent },} )
                , React.createElement('span', { className: "min-w-0",}, pt)
              )
            ))
          )
        )
      )
    )
  );
}

/* ═══════════ ROADMAP — the site build ═══════════
 *
 * Modelled directly on the supplied reference clip, phase for phase:
 *
 *   1  bare dirt plot in a low-poly city, cyan survey grid pegged out on it
 *   2  the grid extrudes into a full-height cyan hologram of the tower;
 *      the plot is levelled to a grey pad and lorries arrive on the roads
 *   3  grey concrete columns stand up, first slabs land, tower cranes appear
 *   4  red brick infill climbs floor by floor behind the slab bands
 *   5  blue glazing rises bottom-up over the brick
 *   6  finished glass tower with white mullion fins, crown and podium;
 *      the cranes have gone, traffic and trees are back
 *
 * Palette is sampled from the clip rather than invented: tan dirt, pastel
 * neighbours, #3FC9F5 blueprint cyan, concrete greys, #C4604A brick, blue-green
 * glass, grey-and-yellow cranes.
 *
 * The previous version drifted below the fold because the SVG had overflow
 * visible and a viewBox that did not actually contain the geometry. Here the
 * viewBox is derived from the world extents and the scene is meet-fitted, so
 * the whole build is inside the frame at every viewport by construction.
 */

const ISO_X = 0.866, ISO_Y = 0.5;
const iso = (x, y, z) => [(x - y) * ISO_X, (x + y) * ISO_Y - z];
const pt = (x, y, z) => iso(x, y, z).map((n) => n.toFixed(1)).join(',');

/* Three visible faces of a cuboid, each returned separately so it can take its
   own shade — that shading is the whole illusion of solidity. */
function box(x, y, z, w, d, h) {
  return {
    top: [pt(x, y, z + h), pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x, y + d, z + h)].join(' '),
    left: [pt(x, y + d, z), pt(x + w, y + d, z), pt(x + w, y + d, z + h), pt(x, y + d, z + h)].join(' '),
    right: [pt(x + w, y, z), pt(x + w, y + d, z), pt(x + w, y + d, z + h), pt(x + w, y, z + h)].join(' '),
  };
}

/* Sampled from the reference. Each solid gets a top / left / right triple. */
const C = {
  dirt: ['#C2A277', '#A98A61', '#8E7350'],
  pad: ['#D5D2CB', '#B3B0A9', '#918E88'],
  conc: ['#D8D5CE', '#B0ADA6', '#8D8A84'],
  slab: ['#CFCCC4', '#A8A59E', '#87847E'],
  brick: ['#C4604A', '#A54B38', '#8C3E2E'],
  glass: ['#A8D4EA', '#5E93B8', '#3C6B8C'],
  podium: ['#E4E1DA', '#BFBCB5', '#9B988F'],
  road: '#6C7176',
  line: '#E8E6E0',
  cyan: '#3FC9F5',
  cyanHi: '#9CEBFF',
  craneMast: '#C9CCD1',
  craneJib: '#E8B830',
  truck: '#EDE9E1',
  truckHot: '#D2453C',
  /* Blackened cast metal. Three values for the three facings, a warm-grey
     highlight for the leading wing edge, and a lighter beak so the head reads
     at 20 pixels. */
  eagleDk: '#14161A',
  eagleMd: '#26292F',
  eagleLt: '#3C4149',
  eagleHi: '#8A9099',
  eagleBeak: '#6E747D',
  tree: '#59A05C',
  treeDark: '#3F7A45',
  crew: '#F2C14E',
};

const N_FLOORS = 11;
const FH = 13;                 // storey height
const FW = 54;                 // tower footprint
const PLOT = 132;              // plot the tower stands on
const TOP_Z = N_FLOORS * FH;

const SITE_STAGES = [
  { id: '00', tag: 'Site survey', gate: 'pre', dur: '~2 weeks',
    title: 'Questionnaire & Business Learning',
    stat: 'Business · buyer · sales process',
    line: 'Nothing is dug until the plot is understood. We map the business model, unit mix, ticket size and the real sales process, audit every past campaign and brand asset, and establish the catchment, the competitors, the capacity and who actually signs off. The output is a written brief that gates everything downstream — no research begins until it is real.' },
  { id: '01', tag: 'Blueprint', gate: 'pre', dur: '~2 weeks',
    title: 'Market Research & Intelligence',
    stat: 'Primary · Secondary · Historical',
    line: 'Three research tracks run in parallel. Primary: one-to-one interviews with your ideal buyer — what stops their scroll, what they fear, which trust signals make a brand credible. Secondary: addressable market, competitive landscape, pricing against comparable inventory, unit economics and journey mapping, pulled at scale by custom scrapers across the Meta Ad Library, Google Ads Transparency Center and listing portals. Historical: what already worked or failed for you, so the same money is never spent twice.' },
  { id: '02', tag: 'Structure', gate: 'pre', dur: '10 days – 2 weeks',
    title: 'Architecture & Creative Direction',
    stat: 'Campaign architecture locked',
    line: 'Columns up, first slabs landed. Full-funnel structure is built — top, middle, bottom and a separate retargeting layer — alongside the creative script pack: hooks, value propositions, high-CTR angles and calls to action. The AI pipeline is primed for high-volume creative testing once live. Everything passes an approval loop. Studio production is only commissioned when the brief needs a camera.' },
  { id: '03', tag: 'Build-out', gate: 'post', dur: '~1 month',
    title: 'A/B Testing + Market Launch',
    stat: 'T-0 · money goes to market',
    line: 'You enter the market here, and the budget works in market rather than in decks. Walls go in floor by floor and get tested under load: research-backed hooks at volume through the AI pipeline, budget pacing, test-versus-scale splits, funnel weights, platform and persona. Controlled spend establishes cost per lead and lead quality before anything scales.' },
  { id: '04', tag: 'Cladding', gate: 'post', dur: '~1 week',
    title: 'Lead Funnel · CRM · Dashboard',
    stat: 'Multi-project campaign management',
    line: 'The façade rises from the ground up. The sales process is mapped and aligned, the lead funnel is designed and executed with your sales team, and CRM routing and alerts run in real time. A weekly dashboard carries spend, cost per lead, lead quality and the scaling decision behind each one — absolute transparency, no black box.' },
  { id: '05', tag: 'Handover', gate: 'post', dur: 'Ongoing · locked by month 3',
    title: 'Track · Learn · Scale',
    stat: 'Owner-reported AED 12.32 CPL · 51% qualified',
    line: 'Glazed, lit and occupied. Cost per lead and lead quality are reviewed weekly, budget scales only onto proven unit economics, and creative refreshes on fatigue signals rather than on a calendar. The funnel, reporting and scaling rules are reviewed throughout the engagement. People remain responsible for approvals, monitoring and lead-quality feedback.' },
];

function SiteScene({ stage, within }) {
  /* Sub-progress for the current stage; anything already passed stays at 1. */
  const at = (s) => (stage > s ? 1 : stage === s ? within : 0);

  /* ── Rotation ──
     The plot turns slowly as the build goes up, so the scene reads as a model
     being walked around rather than a flipbook. Kept to a 26 degree sweep and
     eased at both ends: the cuboid shading is baked per face, and past roughly
     30 degrees the faces the shading assumes stop being the faces on screen. */
  const walk = Math.max(0, Math.min(1, (stage + within) / SITE_STAGES.length));
  const eased = walk < 0.5 ? 2 * walk * walk : 1 - Math.pow(-2 * walk + 2, 2) / 2;
  const yaw = (-13 + 26 * eased) * Math.PI / 180;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);

  const iso = (x, y, z) => {
    const rx = x * cy - y * sy;
    const ry = x * sy + y * cy;
    return [(rx - ry) * ISO_X, (rx + ry) * ISO_Y - z];
  };
  const pt = (x, y, z) => iso(x, y, z).map((n) => n.toFixed(1)).join(',');
  const box = (x, y, z, w, d, h) => ({
    top:   [pt(x, y, z + h), pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x, y + d, z + h)].join(' '),
    left:  [pt(x, y + d, z), pt(x + w, y + d, z), pt(x + w, y + d, z + h), pt(x, y + d, z + h)].join(' '),
    right: [pt(x + w, y, z), pt(x + w, y + d, z), pt(x + w, y + d, z + h), pt(x + w, y, z + h)].join(' '),
  });

  const levelled = at(1);
  const blueprint = stage === 1 ? within : stage > 1 ? Math.max(0, 1 - at(2) * 2) : 0;
  const structure = at(2);
  const walls = at(3);
  const glazing = at(4);
  const finish = at(5);

  const shade = (m) => C[m];
  const Solid = ({ b, m, o = 1 }) => {
    const [t, l, r] = shade(m);
    return (
      React.createElement('g', { opacity: o,}
        , React.createElement('polygon', { points: b.left, fill: l,} )
        , React.createElement('polygon', { points: b.right, fill: r,} )
        , React.createElement('polygon', { points: b.top, fill: t,} )
      )
    );
  };

  /* Six positions at 60-degree steps on a ring outside the plot, so no side of
     the building is bare and none is crowded. Radius sits clear of the pad and
     inside the viewBox at every yaw. */
  const TREE_RING = [
    [80, 46], [0, 92], [-80, 46],
    [-80, -46], [0, -92], [80, -46],
  ];
  const treesOn = Math.max(stage === 0 ? 1 : 0, finish);
  const treesAt = (list) => (treesOn <= 0.02 ? null : list.map(([tx, ty], k) => {
    const [px, py] = iso(tx, ty, 0);
    return (
      React.createElement('g', { key: `${tx},${ty}`, opacity: treesOn,}
        , React.createElement('line', { x1: px, y1: py, x2: px, y2: py - 7, stroke: "#6B5138", strokeWidth: "2",} )
        , React.createElement('circle', { cx: px, cy: py - 12, r: "7", fill: C.tree,} )
        , React.createElement('circle', { cx: px - 3, cy: py - 9, r: "4.6", fill: C.treeDark, opacity: "0.7",} )
      )
    );
  }));

  const plotBox = box(-PLOT / 2, -PLOT / 2, -7, PLOT, PLOT, 7);
  const padBox = box(-FW / 2 - 10, -FW / 2 - 10, 0, FW + 20, FW + 20, 3);

  return (
    /* viewBox derived from the world extents: x spans ±(PLOT)·0.866 plus the
       neighbours, y from the tower crown down to the front corner of the plot.
       meet-fitted, so the build is always wholly inside the frame. */
    React.createElement('svg', { className: "site-svg", viewBox: "-142 -250 284 344"   ,
         preserveAspectRatio: "xMidYMid meet" , role: "img",
         'aria-label': `Construction stage ${stage + 1} of ${SITE_STAGES.length}`,}

      /* ── Roads framing the plot ── */
      , [[-PLOT / 2 - 26, -PLOT / 2 - 26, PLOT + 52, 22], [-PLOT / 2 - 26, PLOT / 2 + 4, PLOT + 52, 22]].map(([x, y, w, d], i) => (
        React.createElement('polygon', { key: i, fill: C.road, opacity: "0.55",
                 points: [pt(x, y, 0), pt(x + w, y, 0), pt(x + w, y + d, 0), pt(x, y + d, 0)].join(' '),} )
      ))

      /* ── The plot: dirt until it is levelled, then a grey pad ── */
      , React.createElement(Solid, { b: plotBox, m: levelled > 0.5 ? 'pad' : 'dirt',} )

      /* Survey pegs and string lines — phase 00 */
      , React.createElement('g', { opacity: stage === 0 ? 1 : Math.max(0, 1 - levelled * 2.5),}
        , React.createElement('polygon', { fill: C.cyan, fillOpacity: "0.1", stroke: C.cyanHi, strokeWidth: "2.2", strokeDasharray: "6 4" ,
                 style: { filter: 'drop-shadow(0 0 5px ' + C.cyan + ')' },
                 points: [pt(-FW / 2, -FW / 2, 0), pt(FW / 2, -FW / 2, 0), pt(FW / 2, FW / 2, 0), pt(-FW / 2, FW / 2, 0)].join(' '),} )
        /* Interior setting-out grid, as in the clip. */
        , [-1, 0, 1].map((k) => (
          React.createElement('g', { key: k,}
            , React.createElement('line', { stroke: C.cyan, strokeWidth: "0.9", opacity: "0.75",
                  x1: iso(k * FW / 3, -FW / 2, 0)[0], y1: iso(k * FW / 3, -FW / 2, 0)[1],
                  x2: iso(k * FW / 3, FW / 2, 0)[0], y2: iso(k * FW / 3, FW / 2, 0)[1],} )
            , React.createElement('line', { stroke: C.cyan, strokeWidth: "0.9", opacity: "0.75",
                  x1: iso(-FW / 2, k * FW / 3, 0)[0], y1: iso(-FW / 2, k * FW / 3, 0)[1],
                  x2: iso(FW / 2, k * FW / 3, 0)[0], y2: iso(FW / 2, k * FW / 3, 0)[1],} )
          )
        ))
        , [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy], i) => {
          const [px, py] = iso(sx * FW / 2, sy * FW / 2, 0);
          return React.createElement('g', { key: i,}
            , React.createElement('line', { x1: px, y1: py, x2: px, y2: py - 13, stroke: C.cyanHi, strokeWidth: "1.8",} )
            , React.createElement('circle', { cx: px, cy: py - 14, r: "2", fill: C.cyanHi,} )
          );
        })
      )

      /* ── Levelled pad ── */
      , React.createElement(Solid, { b: padBox, m: "pad", o: levelled,} )

      /* Trees behind the tower, drawn before it so it occludes them. */
      , treesAt(TREE_RING.filter((t) => t[0] + t[1] < 0))

      /* ── Blueprint hologram: the whole tower, drawn in light ── */
      , React.createElement('g', { opacity: blueprint,}
        , Array.from({ length: N_FLOORS }, (_, i) => {
          const z = i * FH;
          const rise = Math.max(0, Math.min(1, blueprint * N_FLOORS - i));
          if (rise <= 0) return null;
          return (
            React.createElement('g', { key: i, opacity: rise,}
              , React.createElement('polygon', { fill: C.cyan, fillOpacity: "0.07", stroke: C.cyanHi, strokeWidth: "1.5",
                       points: [pt(-FW / 2, -FW / 2, z), pt(FW / 2, -FW / 2, z), pt(FW / 2, FW / 2, z), pt(-FW / 2, FW / 2, z)].join(' '),} )
            )
          );
        })
        , [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy], i) => {
          const a = iso(sx * FW / 2, sy * FW / 2, 0);
          const b = iso(sx * FW / 2, sy * FW / 2, TOP_Z * Math.min(1, blueprint * 1.2));
          return React.createElement('line', { key: i, x1: a[0], y1: a[1], x2: b[0], y2: b[1],
                       stroke: C.cyanHi, strokeWidth: "2.2", opacity: "0.95",
                       style: { filter: 'drop-shadow(0 0 4px ' + C.cyan + ')' },} );
        })
      )

      /* ── Structure: columns, then slabs ── */
      , Array.from({ length: N_FLOORS }, (_, i) => {
        const z = i * FH;
        /* Columns lead the slabs by half a floor, as in the clip. */
        const colT = Math.max(0, Math.min(1, structure * (N_FLOORS + 2) - i));
        const slabT = Math.max(0, Math.min(1, structure * (N_FLOORS + 2) - i - 0.6));
        if (colT <= 0) return null;

        const wallT = Math.max(0, Math.min(1, walls * (N_FLOORS + 1) - i));
        const glassT = Math.max(0, Math.min(1, glazing * (N_FLOORS + 1) - i));

        return (
          React.createElement('g', { key: i,}
            /* Corner and centre columns */
            , [[-1, -1], [1, -1], [1, 1], [-1, 1], [0, 0]].map(([sx, sy], k) => {
              const cx = sx * (FW / 2 - 4), cy = sy * (FW / 2 - 4);
              return React.createElement(Solid, { key: k, m: "conc", o: colT,
                            b: box(cx - 2.4, cy - 2.4, z, 4.8, 4.8, FH * colT),} );
            })

            /* Brick infill behind the slab line */
            , wallT > 0 && (
              React.createElement('g', { opacity: wallT,}
                , React.createElement('polygon', { points: box(-FW / 2 + 2, -FW / 2 + 2, z, FW - 4, FW - 4, FH - 2).left, fill: C.brick[1],} )
                , React.createElement('polygon', { points: box(-FW / 2 + 2, -FW / 2 + 2, z, FW - 4, FW - 4, FH - 2).right, fill: C.brick[2],} )
                /* Window openings punched into the face nearest the viewer. */
                , [0, 1, 2].map((k) => {
                  const wx = -FW / 2 + 9 + k * 15;
                  const [ox, oy] = iso(wx, FW / 2 - 2, z + FH * 0.42);
                  return React.createElement('rect', { key: k, x: ox - 3.2, y: oy - 5, width: "6.4", height: "6.4",
                               fill: "#5B3128", opacity: "0.85", rx: "0.6",} );
                })
              )
            )

            /* Glazing climbs over the brick */
            , glassT > 0 && (
              React.createElement('g', { opacity: glassT,}
                , React.createElement('polygon', { points: box(-FW / 2 + 1, -FW / 2 + 1, z, FW - 2, FW - 2, FH - 1).left, fill: C.glass[1],} )
                , React.createElement('polygon', { points: box(-FW / 2 + 1, -FW / 2 + 1, z, FW - 2, FW - 2, FH - 1).right, fill: C.glass[2],} )
                /* Reflected sky band across the upper part of each pane. */
                , React.createElement('polygon', { points: box(-FW / 2 + 1, -FW / 2 + 1, z + FH * 0.55, FW - 2, FW - 2, FH * 0.34).left,
                         fill: C.glass[0], opacity: "0.5",} )
              )
            )

            /* Floor slab, last so it always caps the storey below it */
            , React.createElement(Solid, { b: box(-FW / 2 - 1.4, -FW / 2 - 1.4, z + FH - 2.4, FW + 2.8, FW + 2.8, 2.4),
                   m: "slab", o: slabT,} )
          )
        );
      })

      /* ── White mullion fins and crown, on the finished tower only ── */
      , React.createElement('g', { opacity: finish,}
        , [-1, -0.33, 0.33, 1].map((f, i) => {
          const fx = f * (FW / 2 - 2);
          const a = iso(fx, FW / 2 - 1, 0), b = iso(fx, FW / 2 - 1, TOP_Z);
          return React.createElement('line', { key: i, x1: a[0], y1: a[1], x2: b[0], y2: b[1],
                       stroke: "#F1EFEA", strokeWidth: "2.2", opacity: "0.9",} );
        })
        , React.createElement(Solid, { b: box(-FW / 2 - 2, -FW / 2 - 2, TOP_Z, FW + 4, FW + 4, 9), m: "podium",} )
        , React.createElement(Solid, { b: box(-FW / 2 + 8, -FW / 2 + 8, TOP_Z + 9, FW - 16, FW - 16, 12), m: "podium",} )
      )

      /* No street-level podium. A 70x70 slab wrapped around the base read as an
         unfinished block sitting in front of the tower rather than as part of
         it — the tower stands on its own. Completion is carried by the crown,
         the mullion fins and the glazing instead. */
      

      /* ── Tower cranes: on site from structure to the end of cladding ── */
      , (() => {
        const on = Math.min(1, structure * 2.5) * Math.max(0, 1 - finish * 1.8);
        if (on <= 0.02) return null;
        const mastH = TOP_Z + 34;
        return [[-1, -1], [1, 1]].map(([sx, sy], k) => {
          const bx = sx * (FW / 2 + 30), by = sy * (FW / 2 + 30);
          const a = iso(bx, by, 0), t = iso(bx, by, mastH * Math.min(1, structure * 1.5));
          const dir = sx;
          return (
            React.createElement('g', { key: k, opacity: on,}
              , React.createElement('line', { x1: a[0], y1: a[1], x2: t[0], y2: t[1], stroke: C.craneMast, strokeWidth: "3",} )
              , Array.from({ length: 10 }, (_, r) => {
                const p = iso(bx, by, (mastH / 10) * r * Math.min(1, structure * 1.5));
                return React.createElement('line', { key: r, x1: p[0] - 3.4, y1: p[1], x2: p[0] + 3.4, y2: p[1],
                             stroke: C.craneMast, strokeWidth: "1", opacity: "0.8",} );
              })
              , React.createElement('line', { x1: t[0], y1: t[1], x2: t[0] + dir * 76, y2: t[1] - 9, stroke: C.craneJib, strokeWidth: "2.6",} )
              , React.createElement('line', { x1: t[0], y1: t[1], x2: t[0] - dir * 26, y2: t[1] - 4, stroke: C.craneMast, strokeWidth: "2.2",} )
              , React.createElement('rect', { x: t[0] - (dir > 0 ? 34 : -22), y: t[1] - 9, width: "12", height: "6", rx: "1.2", fill: C.craneMast,} )
              /* Hoist with a brick pallet, riding up as the build progresses. */
              , React.createElement('line', { x1: t[0] + dir * 52, y1: t[1] - 6, x2: t[0] + dir * 52,
                    y2: t[1] - 6 + 60 - 44 * Math.max(walls, glazing), stroke: "#9AA0A6", strokeWidth: "0.9",} )
              , React.createElement('rect', { x: t[0] + dir * 52 - 6, y: t[1] - 6 + 60 - 44 * Math.max(walls, glazing),
                    width: "12", height: "6", rx: "1", fill: C.brick[1],} )
            )
          );
        });
      })()

      /* ── Lorries on the approach road while the frame is going up ── */
      , (() => {
        const on = Math.min(1, levelled * 2) * Math.max(0, 1 - glazing * 1.4);
        if (on <= 0.02) return null;
        return [0, 1, 2].map((k) => {
          const travel = ((within * 0.7 + k * 0.34) % 1);
          const lx = -PLOT / 2 - 14 + travel * (PLOT + 28);
          const [px, py] = iso(lx, PLOT / 2 + 14, 0);
          const b = box(0, 0, 0, 19, 8, 7);
          return (
            React.createElement('g', { key: k, opacity: on, transform: `translate(${px} ${py})`,}
              , React.createElement('polygon', { points: b.left, fill: k === 1 ? C.truckHot : '#C9C5BD',} )
              , React.createElement('polygon', { points: b.right, fill: k === 1 ? '#A5332C' : '#AAA69E',} )
              , React.createElement('polygon', { points: b.top, fill: k === 1 ? C.truckHot : C.truck,} )
              , React.createElement('ellipse', { cx: "3", cy: "6", rx: "4.6", ry: "2.6", fill: "#4A4E52",} )
              , React.createElement('ellipse', { cx: "15", cy: "6", rx: "4.6", ry: "2.6", fill: "#4A4E52",} )
            )
          );
        });
      })()

      /* ── Roof eagle ──
          The crown read as a bare slab. A small cast statue is what a prestige
          tower actually puts there, and at this scale it also gives the roofline
          a silhouette instead of a flat edge.

          Built from projected 3D points rather than a flat glyph: the two wings
          take different shades because they face different ways, which is the
          same trick the rest of the scene uses to read as solid. Deliberately
          smaller than the crown it stands on — a statue that competes with the
          roof stops looking like a statue. */
      , finish > 0.02 && (() => {
        const z0 = TOP_Z + 21;                    // top face of the crown
        const P = (x, y, z) => iso(x, y, z);
        const j = (...ps) => ps.map((q) => q.map((n) => n.toFixed(1)).join(',')).join(' ');

        const plinth = box(-5, -5, z0, 10, 10, 2);
        const foot   = P(0, 0, z0 + 2);
        const chest  = P(0, 0, z0 + 8);
        const neck   = P(0, 0, z0 + 11);
        const head   = P(0, -1, z0 + 13.5);
        const tail   = P(0, 7, z0 + 2.5);
        const shL    = P(-2.5, 0, z0 + 10);
        const shR    = P(2.5, 0, z0 + 10);
        const tipL   = P(-15, -2, z0 + 17);
        const tipR   = P(15, 2, z0 + 17);
        const midL   = P(-9, -1, z0 + 9);
        const midR   = P(9, 1, z0 + 9);

        return (
          React.createElement('g', { opacity: finish,}
            , React.createElement('polygon', { points: plinth.left,  fill: C.eagleDk,} )
            , React.createElement('polygon', { points: plinth.right, fill: C.eagleDk,} )
            , React.createElement('polygon', { points: plinth.top,   fill: C.eagleMd,} )

            /* Far wing first, so the near one overlaps it. */
            , React.createElement('polygon', { points: j(shL, tipL, midL, chest), fill: C.eagleDk,} )
            , React.createElement('polygon', { points: j(chest, tail, foot),      fill: C.eagleDk,} )
            , React.createElement('polygon', { points: j(foot, chest, neck, head, P(1.6, 0, z0 + 10), P(1.6, 0, z0 + 3)),
                     fill: C.eagleMd,} )
            , React.createElement('polygon', { points: j(shR, tipR, midR, chest), fill: C.eagleLt,} )

            /* Beak and the one highlight that says metal rather than paint. */
            , React.createElement('polygon', { points: j(head, P(0, -4, z0 + 12.8), P(0, -1, z0 + 12.4)), fill: C.eagleBeak,} )
            , React.createElement('line', { x1: shR[0], y1: shR[1], x2: tipR[0], y2: tipR[1],
                  stroke: C.eagleHi, strokeWidth: "0.9", opacity: "0.85",} )
          )
        );
      })()

      /* ── Handover sparkle ──
          Fires as the glazing lands and the tower is signed off. Positions are
          a fixed list rather than random so the frame is identical on every
          render — Math.random here would also break the prerender's snapshot.

          The twinkle is a CSS keyframe on a class, and the stage gate is opacity
          on the WRAPPER: this file has been bitten four times by an animation
          on the same property as an inline style, where the keyframe silently
          wins and the gate stops working. */
      , finish > 0.02 && (
        React.createElement('g', { opacity: finish, className: "site-sparkle",}
          , [[-34, -40, 96], [30, -46, 118], [46, 8, 74], [-46, 14, 132],
            [8, -58, 148], [-14, 44, 60], [58, -20, 100], [-58, -8, 52],
            [22, 34, 156], [-6, -22, 168]].map(([sx, sz, h], i) => {
            const [px, py] = iso(sx, sz, h);
            const r = 1.5 + (i % 3) * 0.55;
            return (
              React.createElement('g', { key: i, style: { animationDelay: `${(i * 0.37).toFixed(2)}s` },}
                , React.createElement('path', { d: `M${px} ${py - r * 2.6} L${px + r * 0.62} ${py - r * 0.62} L${px + r * 2.6} ${py}
                          L${px + r * 0.62} ${py + r * 0.62} L${px} ${py + r * 2.6}
                          L${px - r * 0.62} ${py + r * 0.62} L${px - r * 2.6} ${py}
                          L${px - r * 0.62} ${py - r * 0.62} Z`,
                      fill: "#FFFFFF",} )
              )
            );
          })
        )
      )

      /* Trees in front, drawn after the tower. */
      , treesAt(TREE_RING.filter((t) => t[0] + t[1] >= 0))

      /* ── Site crew, from levelling until the glass is on ── */
      , (() => {
        const on = Math.min(1, levelled * 2) * Math.max(0, 1 - glazing);
        if (on <= 0.02) return null;
        return [[-48, 44], [40, 50], [-30, -50]].map(([wx, wy], k) => {
          const [px, py] = iso(wx, wy, 0);
          return (
            React.createElement('g', { key: k, opacity: on,}
              , React.createElement('line', { x1: px, y1: py, x2: px, y2: py - 6, stroke: C.crew, strokeWidth: "2", strokeLinecap: "round",} )
              , React.createElement('circle', { cx: px, cy: py - 7.8, r: "1.8", fill: C.crew,} )
            )
          );
        });
      })()
    )
  );
}

function RoadmapEvolution() {
  const trackRef = useRef(null);
  const p = useSectionProgress(trackRef);
  const phone = useIsPhone();
  const { theme } = useTheme();
  const light = theme === 'light';

  /* Equal share of the track per stage. The earlier `length - 0.3` divisor left
     the last stage only about 12% of the scroll, so the finished tower — the
     whole payoff of the sequence — was on screen for a moment and then the
     sticky released. A flat 1/6 each gives handover the same dwell as
     excavation. */
  const raw = Math.max(0, Math.min(1, p)) * SITE_STAGES.length;
  const stage = Math.min(SITE_STAGES.length - 1, Math.floor(raw));
  const within = Math.max(0, Math.min(1, raw - stage));
  const s = SITE_STAGES[stage];

  /* The pre/post split is the T-0 gate the written roadmap already marks:
     everything up to Architecture is preparation, everything from Launch on is
     money in market. Clicking a side scrolls to the first stage on that side
     rather than switching a hidden view, so the toggle and the scroll position
     can never disagree with each other. */
  const jumpTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const usable = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + usable * ((i + 0.35) / (SITE_STAGES.length - 0.3));
    window.scrollTo({ top: Math.round(target), behavior: 'smooth' });
  };

  return (
    React.createElement('section', { id: "roadmap", ref: trackRef, className: "relative",
             style: { height: `${SITE_STAGES.length * 68}vh`, background: 'var(--veil)' },}
      , React.createElement(SeamFade, { edge: "top",} )

      , React.createElement('div', { className: "sticky top-0 h-screen overflow-hidden flex flex-col"     ,
           style: { paddingTop: 'calc(var(--chrome-clear) + clamp(0.4rem, 1.6vh, 1.2rem))' },}

        , React.createElement('div', { className: "px-4 sm:px-7 md:px-10 shrink-0 flex flex-wrap items-end justify-between gap-3"        ,}
          , React.createElement('div', null
            , React.createElement('div', { className: "font-body text-xs md:text-sm"  , style: { color: 'rgba(var(--ink-rgb),0.75)' },}, "// The "
                , React.createElement('span', { className: "roadmap-mark",}, "roadmap")
            )
            , React.createElement('h2', { className: "hero-heading font-black uppercase leading-none tracking-tight mt-1"     ,
                style: { fontSize: 'clamp(1.5rem, 4vw, 3.1rem)' },}, "Our Client Roadmap"  )
          )

          , React.createElement('div', { className: "site-toggle", role: "group", 'aria-label': "Jump to phase group"   ,}
            , [['pre', 'Pre-launch', 0], ['post', 'Post-launch', 3]].map(([g, label, i]) => (
              React.createElement('button', { key: g, type: "button", onClick: () => jumpTo(i),
                      'aria-pressed': s.gate === g,
                      className: s.gate === g ? 'is-on' : undefined,}
                , label
              )
            ))
          )
        )

        , React.createElement('div', { className: "flex-1 min-h-0 grid items-center gap-3 px-4 sm:px-7 md:px-10 pb-5"        ,
             style: { gridTemplateColumns: phone ? '1fr' : 'minmax(0, 0.92fr) minmax(0, 1.08fr)' },}

          , React.createElement('div', { className: "site-stage",}
            , React.createElement(SiteScene, { stage: stage, within: within,} )
          )

          , React.createElement('div', { className: "min-w-0 roadmap-copy" ,}
            , React.createElement('div', { className: "flex items-center gap-2.5 flex-wrap"   ,}
              , React.createElement('span', { className: "font-black tabular-nums" ,
                    style: { color: 'rgba(var(--ink-rgb),0.55)', fontSize: 'clamp(1.5rem, min(2.5vw, 3.4vh), 2.5rem)', lineHeight: 1 },}, String(stage + 1).padStart(2, '0'))
              , React.createElement('span', { className: "rounded-full font-body font-semibold uppercase"   ,
                    style: { background: 'rgba(var(--fill-rgb),0.14)', color: 'var(--ink)',
                             border: '1px solid rgba(var(--ink-rgb),0.3)', letterSpacing: '0.16em',
                             padding: '0.3rem 0.78rem', fontSize: 'var(--fs-micro)' },}, s.tag)
              , React.createElement('span', { className: "rounded-full font-body font-semibold uppercase"   ,
                    style: { background: s.gate === 'post' ? 'var(--accent)' : 'transparent',
                             color: s.gate === 'post' ? 'var(--on-accent-fill)' : 'rgba(var(--ink-rgb),0.7)',
                             border: '1px solid ' + (s.gate === 'post' ? 'transparent' : 'rgba(var(--ink-rgb),0.28)'),
                             letterSpacing: '0.14em', padding: '0.28rem 0.7rem',
                             fontSize: 'var(--fs-micro)' },}
                , s.gate === 'post' ? 'Post-launch' : 'Pre-launch'
              )
              , React.createElement('span', { className: "rounded-full font-body font-semibold"  ,
                    style: { background: 'rgba(182,0,168,0.12)', color: 'var(--accent)',
                             border: '1px solid rgba(182,0,168,0.45)', letterSpacing: '0.04em',
                             padding: '0.3rem 0.78rem', fontSize: 'var(--fs-micro)' },}
                , s.dur
              )
            )

            , React.createElement('h3', { className: "font-semibold mt-3" ,
                style: { color: 'var(--ink)', fontSize: 'clamp(1.25rem, min(2.5vw, 3.4vh), 2.35rem)', lineHeight: 1.14, letterSpacing: '-0.01em' },}
              , s.title
            )
            , React.createElement('p', { className: "font-heading italic mt-2"  ,
               style: { color: 'var(--accent)', fontSize: 'clamp(1.02rem, min(1.9vw, 2.5vh), 1.6rem)', lineHeight: 1.12 },}
              , s.stat
            )
            , React.createElement('p', { className: "font-body mt-3 max-w-2xl"  ,
               style: { color: 'rgba(var(--ink-rgb),0.92)',
                        fontSize: 'clamp(0.86rem, min(1.18vw, 1.72vh), 1.12rem)', lineHeight: 1.55 },}
              , s.line
            )

            /* The six steps as cards (formerly the separate "How we work"
                section, which repeated this roadmap). The card for the stage on
                screen is marked; a click scrolls the scene to that stage, so the
                cards, the toggle and the building can never disagree. Phones
                keep the dots: the pinned frame has no room for a card grid
                beside the scene. */
            , phone ? null : React.createElement('ol', { className: "rm-steps", 'aria-label': "The six roadmap steps",}
              , SITE_STAGES.map((x, i) => (
                React.createElement('li', { key: x.id,}
                  , React.createElement('button', { type: "button", className: "qd-step rm-step", 'aria-pressed': i === stage,
                          'aria-label': `Step ${i + 1}: ${x.title}`, onClick: () => jumpTo(i),}
                    , React.createElement('span', { className: "rm-step-top",}
                      , React.createElement('span', { className: "qd-step-n",}, i + 1)
                      , React.createElement('span', { className: 'qd-gate qd-gate-' + x.gate,}, x.gate === 'pre' ? 'Pre-launch' : 'Post-launch')
                    )
                    , React.createElement('strong', { className: "qd-step-title",}, x.title)
                    , React.createElement('small', { className: "qd-step-dur",}, x.dur)
                  )
                )
              ))
            )
            , !phone ? null : React.createElement('ol', { className: "flex items-center gap-1.5 mt-5"   , style: { listStyle: 'none' },}
              , SITE_STAGES.map((x, i) => (
                React.createElement('li', { key: x.id,}
                  , React.createElement('span', { className: "rounded-full transition-all duration-300 block"   ,
                        style: { width: i === stage ? 26 : 7, height: 7,
                                 background: i <= stage ? 'var(--ink)' : 'rgba(var(--ink-rgb),0.28)' },} )
                )
              ))
              , React.createElement('li', { className: "font-body ml-2" ,
                  style: { color: 'rgba(var(--ink-rgb),0.6)', fontSize: 'var(--fs-micro)' },}
                , stage + 1, " / "  , SITE_STAGES.length
              )
            )
          )
        )
      )
    )
  );
}

/* Founder film (QDnCo New design, DESIGN.md 6.13). Plays in view, pauses when
   scrolled away or the tab is hidden; never autoplays with sound. */
function FounderFilm() {
  const ref = useRef(null);
  const [needsSound, setNeedsSound] = useState(false);
  const playWithSound = () => { const v = ref.current; if (!v) return; v.muted = false; v.volume = 1; v.play().then(() => setNeedsSound(false)).catch(() => setNeedsSound(true)); };
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let inView = false, disposed = false;
    const sync = () => {
      if (inView && !document.hidden && !still) {
        if (v.ended) v.currentTime = 0;
        const p = v.play();
        if (p) p.then(() => { if (disposed || !inView || document.hidden) v.pause(); else setNeedsSound(v.muted || v.volume === 0); })
               .catch((e) => { if (!disposed && inView && e.name === 'NotAllowedError') setNeedsSound(true); });
      } else v.pause();
    };
    const io = new IntersectionObserver(([en]) => { inView = en.isIntersecting && en.intersectionRatio >= 0.35; sync(); }, { threshold: [0, 0.35] });
    io.observe(v); document.addEventListener('visibilitychange', sync);
    return () => { disposed = true; io.disconnect(); document.removeEventListener('visibilitychange', sync); v.pause(); };
  }, []);
  return (
    React.createElement('section', { id: "founder-film", className: "qd-film relative px-4 sm:px-7 md:px-10", 'aria-labelledby': "film-heading",}
      , React.createElement('div', { className: "qd-film-panel",}
        , React.createElement('div', { className: "qd-film-copy",}
          , React.createElement('h2', { id: "film-heading",}, "Your buyer has changed.", React.createElement('em', null, "Has your marketing?"))
          , React.createElement('p', null, "Before a buyer speaks to your sales team, they have already compared projects on Instagram, Google and WhatsApp. We meet them there, answer their questions and hand your team a buyer who is ready to visit.")
          , React.createElement('ul', { className: "qd-film-points",}
            , React.createElement('li', null, React.createElement('strong', null, "Research first."), " Every campaign starts with your buyer, catchment and competitors.")
            , React.createElement('li', null, React.createElement('strong', null, "Creative at volume."), " Fresh ads tested every week, not one poster a month.")
            , React.createElement('li', null, React.createElement('strong', null, "Follow-up built in."), " WhatsApp and CRM routing so no enquiry goes cold.")
          )
          , React.createElement('p', { className: "qd-film-team",}, "QDnCo is run by its three co-founders: Adarsh Jee Pandey (CEO), V. Sai Kavshik (Head of Sales) and Vinayak Tiwari (CTO).")
          , React.createElement('div', { className: "qd-film-actions",}
            , React.createElement('a', { className: "hero-cta hero-cta-primary", href: "#contact",}, "Get a free marketing plan", React.createElement('span', { 'aria-hidden': "true",}, "↗"))
            , React.createElement('a', { className: "hero-cta qd-film-outline", href: "/about/#team",}, "Meet the founders", React.createElement('span', { 'aria-hidden': "true",}, "↗"))
          )
        )
        , React.createElement('div', { className: "qd-film-frame",}
          , React.createElement('video', { ref: ref, controls: true, playsInline: true, muted: true, preload: "metadata",
              poster: "/assets/qd-ad-enhanced-cover.jpg", src: "/assets/qd-ad-web-720x1280.mp4", 'aria-label': "Adarsh: your buyer has changed",
              onVolumeChange: () => { const v = ref.current; if (v) setNeedsSound(v.muted || v.volume === 0); },})
          , needsSound ? React.createElement('button', { type: "button", className: "qd-film-sound", onClick: playWithSound,}, "▶ Play with sound") : null
          , React.createElement('div', { className: "qd-film-label",}, "Adarsh Jee Pandey · CEO & co-founder", React.createElement('br', null), React.createElement('strong', null, "A better start for your sales team."))
        )
      )
    )
  );
}

/* Guides teaser (QDnCo New design, DESIGN.md 6.14). */
function ResourcesTeaser() {
  const dubai = true;
  const list = dubai
    ? [['/guides/real-estate-objection-handling-dubai.html', 'Dubai property buyer objection-handling guide', 'Guide'],
       ['/data/india-dubai-buyer-acquisition-report.html', 'Indian buyers of Dubai property: research report', 'Research'],
       ['/insights/real-estate-funnel-economics.html', 'Calculate lead costs and booking costs', 'Calculator']]
    : [['/insights/lead-quality-audit.html', 'Check your real estate lead quality', 'Audit'],
       ['/insights/real-estate-funnel-economics.html', 'Calculate lead costs and booking costs', 'Calculator'],
       ['/insights/project-comparison-resource.html', 'Property comparison worksheet for buyers', 'Worksheet']];
  return (
    React.createElement('section', { id: "resources", className: "qd-res relative px-4 sm:px-7 md:px-10", 'aria-labelledby': "resources-heading", style: { background: 'var(--veil)' },}
      , React.createElement('div', { className: "qd-svc-inner",}
        , React.createElement('header', { className: "qd-res-head",}
          , React.createElement('div', null
            , React.createElement('h2', { id: "resources-heading", className: "hero-heading qd-process-title",}, "Real estate marketing guides.")
            , React.createElement('p', { className: "qd-process-kicker",}, "Free tools for your sales team.")
          )
          , React.createElement('a', { className: "qd-res-all", href: "/insights/",}, "All guides and worksheets ", React.createElement('span', { 'aria-hidden': "true",}, "↗"))
        )
        , React.createElement('div', { className: "qd-res-grid",}
          , list.map(([href, t, k]) => (
            React.createElement('a', { key: href, href: href, className: "qd-res-card",}
              , React.createElement('span', null, k)
              , React.createElement('h3', null, t)
              , React.createElement('b', null, "Open ", React.createElement('span', { 'aria-hidden': "true",}, "↗"))
            )
          ))
        )
      )
    )
  );
}

/* Closing CTA band (QDnCo New design, DESIGN.md 6.15). */
function CtaBand() {
  const dubai = true;
  return (
    React.createElement('section', { id: "get-plan", className: "qd-cta relative px-4 sm:px-7 md:px-10", 'aria-labelledby': "cta-heading",}
      , React.createElement('div', { className: "qd-cta-panel",}
        , React.createElement('div', null
          , React.createElement('h2', { id: "cta-heading",}, "Need more qualified buyer leads in Dubai?", React.createElement('em', null, "Get a free marketing plan."))
          , React.createElement('p', null, "Tell us about your project. Within 24 hours you get a campaign plan, a pricing estimate and a call with our team.")
          , React.createElement('ul', { className: "qd-cta-ticks",}
            , React.createElement('li', null, "No commitment")
            , React.createElement('li', null, "Ad accounts stay in your name")
            , React.createElement('li', null, dubai ? 'Built for Dubai projects' : '43+ active projects')
          )
        )
        , React.createElement('div', { className: "qd-cta-actions",}
          , React.createElement('a', { className: "hero-cta hero-cta-primary", href: "#contact",}, "Get my free plan", React.createElement('span', { 'aria-hidden': "true",}, "↗"))
          , React.createElement('a', { className: "hero-cta qd-cta-wa", href: "https://wa.me/918861179992?text=Hi%20QDnCo%2C%20I%27d%20like%20a%20marketing%20plan%20for%20my%20project.", target: "_blank", rel: "noreferrer",}
            , React.createElement('svg', { viewBox: "0 0 24 24", 'aria-hidden': "true", width: 18, height: 18, fill: "currentColor",}, React.createElement('path', { d: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z",}))
            , "Chat on WhatsApp")
          , React.createElement('a', { className: "qd-cta-tel", href: "tel:+918861179992",}, "or call +91 88611 79992")
        )
      )
    )
  );
}

/* Markets map (QDnCo New design, DESIGN.md 6.16): a draggable globe with the
   Chicago -> Dubai -> India route, a country close-up drawn as a dot grid under
   the official outline (India here; Dubai first on /dubai/), region cards and
   city pills that stay in sync.
   Pins show market coverage, not offices. Geometry: Natural Earth, India point
   of view (scripts/generate/make-markets-map.py builds assets/markets-map.json). */
const MAP_CITIES = [['Bangalore', 12.97, 77.59], ['Chennai', 13.08, 80.27], ['Pune', 18.52, 73.85], ['Mumbai', 19.08, 72.88], ['Delhi', 28.61, 77.21], ['Dubai', 25.20, 55.27], ['Chicago', 41.88, -87.63], ['Hyderabad', 17.39, 78.49]];
const MAP_REGIONS = ['Karnataka, India', 'Tamil Nadu, India', 'Maharashtra, India', 'Maharashtra, India', 'Delhi, India', 'Dubai, United Arab Emirates', 'Illinois, United States', 'Telangana, India'];
const MAP_GEO_URL = '/assets/markets-map.json?v=2026-10-19-3';
const CLOSEUP_LABELS = { Bangalore: [-7, 3, 'end'], Chennai: [7, 3, 'start'], Hyderabad: [7, 2, 'start'], Pune: [7, 5, 'start'], Mumbai: [-7, -1, 'end'], Delhi: [7, 2, 'start'], Dubai: [-8, 3, 'end'] };
const CLOSEUPS = {
  india: { kicker: 'A closer view of India', pins: [0, 1, 2, 3, 4, 7], label: 'India on its official boundary, drawn as a dot grid, with labeled Bangalore, Chennai, Hyderabad, Pune, Mumbai and Delhi pins' },
  uae: { kicker: 'A closer view of Dubai', pins: [5], label: 'The United Arab Emirates drawn as a dot grid, lit around a labeled Dubai pin' },
};
const GLOBE_R = 146, GLOBE_CX = 162, GLOBE_CY = 166, GLOBE_RAD = Math.PI / 180;
const GLOBE_VIEWS = { India: [78, 22], Dubai: [52, 27], Chicago: [-88, 38] };
const GLOBE_CAPTIONS = { India: ['India', 'Bangalore · Chennai · Hyderabad · Pune · Mumbai · Delhi'], Dubai: ['Dubai', 'United Arab Emirates'], Chicago: ['Chicago', 'Illinois, United States'] };
const GLOBE_PINS = [['Chicago', -87.63, 41.88], ['Dubai', 55.27, 25.20]];

/* Orthographic projection: [x, y, z] on the unit sphere, z >= 0 faces the viewer. */
function globeRot(view, lon, lat) {
  const l = (lon - view[0]) * GLOBE_RAD, p = lat * GLOBE_RAD, p0 = view[1] * GLOBE_RAD;
  return [Math.cos(p) * Math.sin(l), Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l), Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)];
}
const globeXY = (p) => (GLOBE_CX + p[0] * GLOBE_R).toFixed(1) + ',' + (GLOBE_CY - p[1] * GLOBE_R).toFixed(1);
const globeAngle = (p) => Math.atan2(-p[1], p[0]);
const globeWrap = (a) => ((a + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;

function globeHorizon(a, b) {
  const t = a[2] / (a[2] - b[2]), x = a[0] + t * (b[0] - a[0]), y = a[1] + t * (b[1] - a[1]), h = Math.hypot(x, y) || 1;
  return [x / h, y / h, 0];
}

/* One ring as a path, clipped at the horizon: hidden runs follow the rim as an arc. */
function globeRing(view, ring) {
  const P = ring.map(([lon, lat]) => globeRot(view, lon, lat)), n = P.length, s = P.findIndex((p) => p[2] >= 0);
  if (s < 0) return '';
  if (P.every((p) => p[2] >= 0)) return 'M' + P.map(globeXY).join('L') + 'Z';
  const Q = P.slice(s).concat(P.slice(0, s));
  let d = 'M' + globeXY(Q[0]), i = 1;
  while (i <= n) {
    if (Q[i % n][2] >= 0) { d += 'L' + globeXY(Q[i % n]); i++; continue; }
    const exit = globeHorizon(Q[i - 1], Q[i % n]);
    let j = i, turn = 0, last = globeAngle(exit);
    while (Q[j % n][2] < 0) { const a = globeAngle(Q[j % n]); turn += globeWrap(a - last); last = a; j++; }
    const entry = globeHorizon(Q[(j - 1) % n], Q[j % n]);
    turn += globeWrap(globeAngle(entry) - last);
    d += 'L' + globeXY(exit) + 'A' + GLOBE_R + ' ' + GLOBE_R + ' 0 ' + (Math.abs(turn) > Math.PI ? 1 : 0) + ' ' + (turn > 0 ? 1 : 0) + ' ' + globeXY(entry);
    i = j;
  }
  return d + 'Z';
}

/* Polyline through projected points; frontOnly keeps it inside the visible disc. */
function globeLine(pts, frontOnly) {
  let d = '', pen = false;
  pts.forEach((p) => {
    const r = Math.hypot(p[0], p[1]), show = frontOnly ? p[2] >= 0 && r <= 1 : p[2] >= 0;
    if (show) d += (pen ? 'L' : 'M') + globeXY(p);
    pen = show;
  });
  return d;
}

function globeGraticule(view) {
  let d = '';
  for (let lon = -180; lon < 180; lon += 30) { const pts = []; for (let lat = -90; lat <= 90; lat += 4) pts.push(globeRot(view, lon, lat)); d += globeLine(pts, false); }
  for (let lat = -60; lat <= 60; lat += 30) { const pts = []; for (let lon = -180; lon <= 180; lon += 4) pts.push(globeRot(view, lon, lat)); d += globeLine(pts, false); }
  return d;
}

/* Great-circle route between two [lon, lat] points, lifted off the surface mid-way. */
function globeRoute(view, a, b, lift) {
  const vec = ([lon, lat]) => [Math.cos(lat * GLOBE_RAD) * Math.cos(lon * GLOBE_RAD), Math.cos(lat * GLOBE_RAD) * Math.sin(lon * GLOBE_RAD), Math.sin(lat * GLOBE_RAD)];
  const va = vec(a), vb = vec(b), om = Math.acos(va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]), pts = [];
  for (let k = 0; k <= 48; k++) {
    const t = k / 48, s1 = Math.sin((1 - t) * om) / Math.sin(om), s2 = Math.sin(t * om) / Math.sin(om);
    const v = [0, 1, 2].map((i) => va[i] * s1 + vb[i] * s2), h = 1 + lift * Math.sin(Math.PI * t);
    pts.push(globeRot(view, Math.atan2(v[1], v[0]) / GLOBE_RAD, Math.asin(v[2]) / GLOBE_RAD).map((c) => c * h));
  }
  return globeLine(pts, true);
}

function MarketsGlobe({ geo, market }) {
  const [view, setView] = useState(GLOBE_VIEWS[market]);
  const viewRef = useRef(GLOBE_VIEWS[market]), raf = useRef(0), drag = useRef(null), svg = useRef(null);
  const apply = (v) => { viewRef.current = v; setView(v); };
  const nudge = (dl, dp) => { const [l, p] = viewRef.current; apply([l + dl, Math.max(-60, Math.min(75, p + dp))]); };
  useEffect(() => {
    const [tl, tp] = GLOBE_VIEWS[market], [sl, sp] = viewRef.current, t0 = performance.now();
    const dl = (((tl - sl) % 360) + 540) % 360 - 180, dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900;
    const step = (now) => {
      const t = dur ? Math.min(1, (now - t0) / dur) : 1, e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      apply([sl + dl * e, sp + (tp - sp) * e]);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [market]);
  const onDown = (e) => {
    cancelAnimationFrame(raf.current); drag.current = [e.clientX, e.clientY];
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { console.warn('markets map: pointer capture unavailable', err); }
    e.currentTarget.classList.add('is-grabbing');
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const k = (180 / (Math.PI * GLOBE_R)) * (324 / svg.current.getBoundingClientRect().width);
    nudge(-(e.clientX - drag.current[0]) * k, (e.clientY - drag.current[1]) * k);
    drag.current = [e.clientX, e.clientY];
  };
  const onUp = (e) => { drag.current = null; e.currentTarget.classList.remove('is-grabbing'); };
  const onKey = (e) => {
    const m = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, 6], ArrowDown: [0, -6] }[e.key];
    if (m) { e.preventDefault(); cancelAnimationFrame(raf.current); nudge(m[0], m[1]); }
  };
  const ring = (r) => globeRing(view, r);
  const pins = GLOBE_PINS.map(([label, lon, lat], i) => {
    const p = globeRot(view, lon, lat);
    if (p[2] < 0.05) return null;
    const w = label.length * 7 + 14;
    return React.createElement('g', { key: label, className: "qd-pin", transform: 'translate(' + globeXY(p) + ')', style: { '--d': (-i * 0.7) + 's' },}
      , React.createElement('circle', { className: "halo", r: 7,}), React.createElement('circle', { className: "dot", r: 2.5,})
      , React.createElement('rect', { className: "badge", x: -w / 2, y: 6, width: w, height: 19, rx: 5,})
      , React.createElement('text', { className: "lbl", x: 0, y: 19, textAnchor: "middle",}, label));
  });
  const india = globeRot(view, 78.5, 21.5);
  return (
    React.createElement('svg', { ref: svg, className: "qd-globe", viewBox: "0 0 324 345", role: "img", tabIndex: 0,
        'aria-label': "Globe with the route from Chicago to Dubai to India. India, the United Arab Emirates and the United States are highlighted. Drag or use the arrow keys to turn it.",
        onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerCancel: onUp, onKeyDown: onKey,}
      , React.createElement('circle', { className: "g-sphere", cx: GLOBE_CX, cy: GLOBE_CY, r: GLOBE_R,})
      , React.createElement('path', { className: "g-grat", d: globeGraticule(view),})
      , geo && React.createElement('path', { className: "g-land", d: geo.land.map(ring).join(''),})
      , geo && React.createElement('path', { className: "g-hi", d: [geo.india, geo.usa, geo.uae].map((m) => m.map(ring).join('')).join(''),})
      , React.createElement('path', { className: "g-arc", d: globeRoute(view, [-87.63, 41.88], [55.27, 25.20], 0.08),})
      , React.createElement('path', { className: "g-arc", d: globeRoute(view, [55.27, 25.20], [77.59, 12.97], 0.04),})
      , pins
      , india[2] > 0.05 && React.createElement('text', { className: "g-label", x: GLOBE_CX + india[0] * GLOBE_R - 4, y: GLOBE_CY - india[1] * GLOBE_R + 26,}, "India"))
  );
}

function CloseupDots({ geo, place, active, pick }) {
  const spec = CLOSEUPS[place], vb = geo ? geo.vb.join(' ') : '0 0 324 345';
  const [cx, cy] = geo ? geo.cities[MAP_CITIES[active][0]] : [0, 0];
  const dots = geo ? geo.dots.map(([x, y], k) => {
    const t = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / 70);
    return t > 0
      ? React.createElement('circle', { key: k, className: "on", cx: x, cy: y, r: (1.45 + t * 0.5).toFixed(2), style: { opacity: (0.3 + t * 0.7).toFixed(2) },})
      : React.createElement('circle', { key: k, cx: x, cy: y, r: 1.45,});
  }) : null;
  const pins = geo ? spec.pins.map((i) => {
    const name = MAP_CITIES[i][0], [x, y] = geo.cities[name], [dx, dy, anchor] = CLOSEUP_LABELS[name];
    return React.createElement('g', { key: name, transform: 'translate(' + x + ',' + y + ')', className: 'qd-india-pin' + (active === i ? ' on' : ''), role: "button", tabIndex: 0,
        'aria-label': name + ', ' + MAP_REGIONS[i], 'aria-pressed': active === i, onClick: pick(i), onKeyDown: pick(i),}
      , React.createElement('title', null, name + ', ' + MAP_REGIONS[i])
      , React.createElement('circle', { className: "dot", r: active === i ? 3.4 : 2.4,})
      , React.createElement('text', { x: dx, y: dy, textAnchor: anchor,}, name));
  }) : null;
  return (
    React.createElement('svg', { viewBox: vb, role: "img", 'aria-label': spec.label,}
      , geo && geo.neighbours && React.createElement('defs', null
        , React.createElement('radialGradient', { id: "qd-closeup-fade-g", r: "60%",}, React.createElement('stop', { offset: "0.55", stopColor: "#fff",}), React.createElement('stop', { offset: "1", stopColor: "#000",}))
        , React.createElement('mask', { id: "qd-closeup-fade",}, React.createElement('rect', { width: geo.vb[2], height: geo.vb[3], fill: "url(#qd-closeup-fade-g)",})))
      , geo && geo.neighbours && React.createElement('path', { className: "qd-closeup-neighbours", d: geo.neighbours, mask: "url(#qd-closeup-fade)",})
      , React.createElement('g', { className: "qd-dots",}, dots)
      , geo && React.createElement('path', { className: "qd-india-outline", d: geo.outline,})
      , pins)
  );
}

function MarketsMap() {
  const dubai = true;
  const [geo, setGeo] = useState(null);
  const [active, setActive] = useState(dubai ? 5 : 0);
  const [indiaCity, setIndiaCity] = useState(0);
  const [place, setPlace] = useState(dubai ? 'uae' : 'india');
  useEffect(() => {
    let live = true;
    fetch(MAP_GEO_URL).then((r) => r.json()).then((d) => { if (live) setGeo(d); })
      .catch((err) => console.warn('markets map: geometry failed to load', err));
    return () => { live = false; };
  }, []);
  /* The close-up follows the market on /dubai/; Chicago keeps whichever is showing. */
  const select = (i) => {
    setActive(i);
    if (i !== 5 && i !== 6) { setIndiaCity(i); setPlace('india'); }
    if (i === 5 && dubai) setPlace('uae');
  };
  const pick = (i) => (e) => { if (!e.key || e.key === 'Enter' || e.key === ' ') { if (e.key) e.preventDefault(); select(i); } };
  const market = active === 5 ? 'Dubai' : active === 6 ? 'Chicago' : 'India';
  const closeCity = place === 'uae' ? 5 : indiaCity, city = MAP_CITIES[closeCity];
  /* [n, country, short country, cities, short cities, states, index]. The short
     pair is what the three-up selector shows on phones (qd-map CSS). */
  const regions = [['01', 'India', 'India', 'Bangalore · Chennai · Hyderabad · Pune · Mumbai · Delhi', '6 cities', 'Karnataka · Tamil Nadu · Telangana · Maharashtra · Delhi', 0], ['02', 'United Arab Emirates', 'UAE', 'Dubai', 'Dubai', 'Emirate of Dubai', 5], ['03', 'United States', 'USA', 'Chicago', 'Chicago', 'Illinois', 6]];
  return (
    React.createElement('section', { id: "worldwide", className: "qd-map relative px-4 sm:px-7 md:px-10", 'aria-labelledby': "worldwide-heading",}
      , React.createElement('div', { className: "qd-svc-inner",}
        , React.createElement('div', { className: "qd-map-head",}
          , React.createElement('span', { className: "qd-map-eyebrow",}, "Connected across borders")
          , React.createElement('h2', { id: "worldwide-heading",}, "India, Dubai and Chicago.", React.createElement('em', null, "One team, close to every market."))
          , React.createElement('p', null, React.createElement('span', { className: "qd-beacon", 'aria-hidden': "true",}), "India · United Arab Emirates · United States")
        )
        , React.createElement('div', { className: "qd-map-summary",}
          , React.createElement('span', null, "Six Indian cities. Dubai. Chicago.", React.createElement('br', null), "Local market understanding. Connected across borders.")
          , React.createElement('a', { href: "#contact",}, "Build demand in your market ", React.createElement('span', { 'aria-hidden': "true",}, "↗"))
        )
        , React.createElement('div', { className: "qd-atlas",}
          , React.createElement('div', { className: "qd-atlas-card",}
            , React.createElement('div', { className: "qd-atlas-kicker",}, "Chicago → Dubai → India")
            , React.createElement(MarketsGlobe, { geo: geo && geo.globe, market: market,})
            , React.createElement('div', { className: "qd-atlas-caption", 'aria-live': "polite",}, React.createElement('strong', null, GLOBE_CAPTIONS[market][0]), React.createElement('br', null), GLOBE_CAPTIONS[market][1]
              , React.createElement('span', { className: "qd-atlas-hint",}, "Drag to turn the globe"))
          )
          , React.createElement('div', { className: "qd-atlas-card",}
            , React.createElement('div', { className: "qd-atlas-kicker",}, CLOSEUPS[place].kicker)
            , React.createElement(CloseupDots, { key: place, geo: geo && geo[place], place: place, active: closeCity, pick: pick,})
            , React.createElement('div', { className: "qd-atlas-caption", 'aria-live': "polite",}, React.createElement('strong', null, city[0]), React.createElement('br', null), MAP_REGIONS[closeCity])
          )
        )
        , React.createElement('div', { className: "qd-regions",}
          , regions.map(([n, c, cShort, cities, citiesShort, states, i]) => (
            React.createElement('button', { key: c, type: "button", className: (i === 0 ? (active < 5 || active === 7) : active === i) ? 'on' : '', 'aria-label': c + ': ' + cities, onClick: () => select(i),}
              , React.createElement('span', { className: "qd-region-n",}, n + ' / MARKET')
              , React.createElement('strong', null, React.createElement('span', { className: "qd-full",}, c), React.createElement('span', { className: "qd-short",}, cShort))
              , React.createElement('p', null, React.createElement('span', { className: "qd-full",}, cities), React.createElement('span', { className: "qd-short",}, citiesShort))
              , React.createElement('small', null, states))
          ))
        )
        , React.createElement('div', { className: "qd-cities", role: "group", 'aria-label': "Cities",}
          , MAP_CITIES.map((c, i) => React.createElement('button', { key: c[0], type: "button", 'aria-pressed': active === i, onClick: () => select(i),}, c[0])))
        , React.createElement('p', { className: "qd-map-note",}, "Market coverage shown; pins do not represent office locations. Map: Natural Earth (India point of view).")
      )
    )
  );
}

/* Results proof cards (QDnCo New design, DESIGN.md 6.12). */
function ProofSection() {
  const dubai = true;
  const k = dubai ? 'India results' : 'Case result';
  const items = [[k, 'AED 12.32', 'cost per lead', 'Indium Group, North Bangalore', '/work/indium-north-bangalore.html'],
    [k, '51%', 'client-scored sales-ready leads', 'Indium Group, North Bangalore', '/work/indium-north-bangalore.html'],
    ['Historical portfolio', '~22,000', 'monthly leads', 'Godrej Woodscapes', '/work/godrej-woodscapes.html']];
  return (
    React.createElement('section', { id: "results", className: "qd-proof relative px-4 sm:px-7 md:px-10", 'aria-labelledby': "proof-heading", style: { background: 'var(--veil)' },}
      , React.createElement('div', { className: "qd-svc-inner",}
        , React.createElement('header', { className: "qd-process-head",}
          , React.createElement('div', null
            , React.createElement('h2', { id: "proof-heading", className: "hero-heading qd-process-title",}, "Results from real projects.")
            , React.createElement('p', { className: "qd-process-kicker",}, "Measured on lead quality, not lead volume.")
          )
          , React.createElement('p', { className: "qd-process-lede",}, dubai ? 'Reported India project outcomes in AED: converted at ₹25.9 per AED (October 2026), with cost per lead raised 20% as a Dubai cost allowance. Dubai case studies will be added once outcome records are available.' : 'Reported project outcomes from our case records. Each card opens the full story.')
        )
        , React.createElement('div', { className: "qd-proof-grid",}
          , items.map(([kind, n, l, who, href]) => (
            React.createElement('a', { key: l, className: "qd-proof-card", href: href,}
              , React.createElement('span', { className: "qd-proof-kind",}, kind)
              , React.createElement('strong', null, n)
              , React.createElement('span', { className: "qd-proof-label",}, l)
              , React.createElement('span', { className: "qd-proof-who",}, who, ' ', React.createElement('b', { 'aria-hidden': "true",}, "↗"))
            )
          ))
        )
      )
    )
  );
}

/* Services: two columns (Marketing, Technology) of expandable services, from the
   QDnCo New design (DESIGN.md 6.10). Replaces the nine-card carousel. */
const SVC_DUBAI = true;
const SVC_BRANCHES = [
  { name: 'Marketing', label: 'Generate leads', outcome: 'More enquiries from buyers who fit the project.', cta: 'Discuss your ad campaigns', items: [
    { title: 'Meta/Google Ad Campaigns', copy: 'Everything your campaign needs.', points: ['Market research & intelligence', 'Project positioning & strategy', SVC_DUBAI ? '15 static AI creatives/month + AI ad copy; fatigue refresh included' : 'Unlimited ad creatives — as required, no extra charge', 'Meta asset setup — as required, no extra charge', 'Campaign launch', 'Campaign management & optimization', 'Weekly reporting', 'Dedicated relationship manager', ...(SVC_DUBAI ? ['Studio shoots, drone, UGC and motion production quoted separately', 'Permit and QR-ready layouts using approved project materials'] : [])] },
    { title: 'Real Estate SEO & AI Search Optimization', copy: 'One service. Search visibility, brand presence and PR.', points: ['SEO — Google & Bing', 'AEO & GEO — AI search visibility', 'Google Business Profile', 'Brand citations & relevant backlinks', 'Digital PR & expert content'] },
  ] },
  { name: 'Technology', label: 'Manage your leads', outcome: 'Every enquiry answered, routed and followed up.', cta: 'Discuss your lead systems', items: [
    { title: 'CRM Setup & Automation', copy: 'Every enquiry. In the right hands.', points: ['Lead capture & routing', 'Sales pipeline tracking', 'Sales feedback & reporting'] },
    { title: 'Landing Pages', copy: 'Turn project interest into enquiries.', points: ['Project-specific pages', 'Lead forms & CRM integration', 'Mobile-first design'] },
    { title: 'AI Lead Follow-Up & WhatsApp Automation', copy: 'Keep the conversation moving.', points: ['Instant lead responses', 'Automated follow-ups', 'Sales-team handover'] },
  ] },
];

function ServicesV4() {
  return (
    React.createElement('section', { id: "services", className: "qd-svc relative px-4 sm:px-7 md:px-10", 'aria-labelledby': "services-heading", style: { background: 'var(--veil)' },}
      , React.createElement('div', { className: "qd-svc-inner",}
        , React.createElement('header', { className: "qd-process-head",}
          , React.createElement('div', null
            , React.createElement('h2', { id: "services-heading", className: "hero-heading qd-process-title",}, "Real estate marketing services.")
            , React.createElement('p', { className: "qd-process-kicker",}, "From the first ad to the site visit.")
          )
          , React.createElement('p', { className: "qd-process-lede",}, "Choose one service or the full system: ads, SEO, CRM and lead follow-up.")
        )
        , React.createElement('div', { className: "qd-svc-cols",}
          , SVC_BRANCHES.map((b, j) => (
            React.createElement('article', { key: b.name, className: 'qd-svc-col qd-svc-col-' + j,}
              , React.createElement('div', { className: "qd-svc-colhead",}
                , React.createElement('span', null, b.label)
                , React.createElement('h3', null, b.name)
                , React.createElement('p', null, b.outcome)
              )
              , b.items.map((item, i) => (
                React.createElement('details', { key: item.title, className: "qd-svc-item", open: i === 0,}
                  , React.createElement('summary', null
                    , React.createElement('span', { className: "qd-svc-title",}, item.title)
                    , React.createElement('span', { className: "qd-svc-copy",}, item.copy)
                    , React.createElement('span', { className: "qd-svc-plus", 'aria-hidden': "true",})
                  )
                  , React.createElement('ul', null, item.points.map((p) => React.createElement('li', { key: p,}, p)))
                )
              ))
              , React.createElement('a', { className: "qd-svc-cta", href: "#contact",}, b.cta, React.createElement('span', { 'aria-hidden': "true",}, "↗"))
            )
          ))
        )
      )
    )
  );
}

/* "How we work": six step cards plus a detail panel (QDnCo New design, DESIGN.md 6.8).
   Replaces the "Every phase in full" accordion list. Reuses SITE_STAGES, the same
   data the construction-scene roadmap above it runs on, so the two never disagree. */
function Roadmap() {
  /* Collapsed by default. The detail list is six phases deep and used to sit
     between the scene and the FAQ as a mandatory scroll — a reader who already
     took the point had to wade through all of it. The summary card carries the
     shape and the timings; the dropdown carries the depth for whoever wants it. */
  const [open, setOpen] = useState(false);

  return (
    React.createElement('section', { className: "roadmap-detail relative px-4 sm:px-7 md:px-10 pt-4 pb-4 sm:pb-5 md:pb-6"        ,
             style: { background: 'var(--veil)' },}
      , React.createElement(SeamFade, { edge: "bottom",} )

      , React.createElement('div', { className: "shrink-0",}
        , React.createElement('div', { className: "font-body text-xs md:text-sm"  , style: { color: 'rgba(var(--ink-rgb),0.75)' },}, "// The "
            , React.createElement('span', { className: "roadmap-mark",}, "roadmap")
        )
        , React.createElement('h2', { className: "hero-heading font-black uppercase leading-none tracking-tight mt-1"     ,
            style: { fontSize: 'clamp(1.4rem, 3.4vw, 2.6rem)' },}, "Every phase in full"   )
        , React.createElement('p', { className: "font-body font-light mt-3 max-w-2xl"   ,
           style: { color: 'rgba(var(--ink-rgb),0.7)', fontSize: 'var(--fs-text-lg)', lineHeight: 1.6 },}, "Six phases from first conversation to a managed marketing system. You are live in market from roughly week six; by month three the funnel, the reporting and the scaling rules are locked."


        )
      )

      /* ── Summary card: every phase, its timing, and what it settles ── */
      , React.createElement('ol', { className: "phase-sum", style: { listStyle: 'none' },}
        , PHASES.map((ph) => (
          React.createElement('li', { key: ph.id, className: ph.live ? 'phase-sum-row is-live' : 'phase-sum-row',}
            , React.createElement('span', { className: "phase-sum-id",}, ph.id)
            , React.createElement('span', { className: "phase-sum-main",}
              , React.createElement('span', { className: "phase-sum-title",}, ph.title)
              , React.createElement('span', { className: "phase-sum-lead",}, ph.lead)
            )
            , React.createElement('span', { className: "phase-sum-dur",}, ph.dur)
            , React.createElement('span', { className: "phase-sum-gate",}, ph.live ? 'In market' : 'Pre-launch')
          )
        ))
      )

      , React.createElement('button', { type: "button", className: "phase-toggle", onClick: () => setOpen((o) => !o),
              'aria-expanded': open, 'aria-controls': "roadmap-full",}
        , open ? 'Hide the detail' : 'Open every phase in detail'
        , React.createElement('span', { 'aria-hidden': "true", className: "phase-toggle-caret", 'data-open': open ? '1' : '0',}, "▾")
      )

      , React.createElement('div', { id: "roadmap-full", hidden: !open,}
      /* The spine sits under the node column, so it lines up at every width
          without hard-coded offsets. */
      , React.createElement('ol', { className: "relative mt-10 sm:mt-12"  ,
          style: { listStyle: 'none' },}
        , React.createElement('span', { 'aria-hidden': "true", className: "absolute top-2 bottom-0"  ,
              style: { left: 'clamp(18px, 2.2vw, 22px)', width: 2,
                       background: 'linear-gradient(180deg, rgba(var(--ink-rgb),0.28) 0%, rgba(var(--ink-rgb),0.28) 42%, rgba(182,0,168,0.55) 52%, rgba(182,0,168,0.45) 100%)' },} )

        , PHASES.slice(0, 3).map((ph, i) => React.createElement(PhaseCard, { key: ph.id, ph: ph, i: i,} ))

        /* T-0: the point where prep stops and money goes to market. */
        , React.createElement('li', { className: "relative pl-14 sm:pl-20 pb-8 sm:pb-10"    ,}
          , React.createElement('span', { 'aria-hidden': "true", className: "absolute grid place-items-center rounded-full"   ,
                style: { left: 'clamp(8px, 1.2vw, 12px)', top: 0, width: 'clamp(22px, 2.4vw, 24px)', height: 'clamp(22px, 2.4vw, 24px)',
                         background: 'var(--page)', border: '2px solid rgba(182,0,168,0.75)', color: '#E85BD0', fontSize: 'var(--fs-micro)' },}, "▲"

          )
          , React.createElement('div', { className: "flex items-center gap-3"  ,}
            , React.createElement('span', { className: "font-body uppercase tracking-[0.28em] whitespace-nowrap"   ,
                  style: { color: '#E85BD0', fontSize: 'var(--fs-micro)' },}, "Ignition · T-0"  )
            , React.createElement('span', { className: "h-px flex-1" , style: { background: 'rgba(182,0,168,0.5)' },} )
          )
        )

        , PHASES.slice(3).map((ph, i) => React.createElement(PhaseCard, { key: ph.id, ph: ph, i: i + 3,} ))
      )

      /* outcome */
      , React.createElement('div', { className: "rounded-2xl md:rounded-[26px] px-5 py-5 md:px-7 md:py-6 mt-4 ml-14 sm:ml-20"        ,
           style: { background: 'rgba(182,0,168,0.1)', border: '1.5px solid rgba(182,0,168,0.5)' },}
        , React.createElement('div', { className: "font-body uppercase tracking-[0.2em]"  , style: { color: '#E85BD0', fontSize: 'var(--fs-micro)' },}, "Month 3" )
        , React.createElement('div', { className: "font-body font-light mt-1.5"  ,
             style: { color: 'rgba(var(--ink-rgb),0.82)', fontSize: 'clamp(0.85rem, 1.15vw, 1rem)', lineHeight: 1.55 },}, "The expensive unknowns are resolved before scale spend. Learnings, funnel and execution locked."

        )
      )
      )
    )
  );
}

/* ═══════════ FAQ ═══════════
   Answer engines quote FAQ blocks almost verbatim, and this is the only place on
   the page where the long-tail questions a developer actually types get answered
   in plain prose. The same copy is mirrored into FAQPage JSON-LD in the head, so
   the crawler and the reader see identical text — divergence there is treated as
   cloaking. */
const FAQS = [
  { q: "How do you market an off-plan project in Dubai?",
    a: "Research first, media second. Every engagement starts with a business questionnaire and three research tracks: interviews with the buyers you actually sell to, desk research on competing launches, pricing, payment plans and the Meta Ad Library, and a review of what your past campaigns did. Campaigns are then built across Meta and Google with UAE residents and overseas investors in separate pools, the DLD permit number and QR designed into every creative, and spend scaled only after cost per qualified lead holds for a full test window." },
  { q: "What does every Dubai property ad need before it goes live?",
    a: "A Dubai Land Department real estate advertising permit, applied for through the Trakheesi system, with the permit number shown in the ad. DLD also requires the Madmoun QR code linked to that permit on real estate advertisements. DLD lists the fee as AED 1,000 per permit and AED 5,000 for a project-launch event permit, plus a AED 20 Knowledge and Innovation fee. Portals such as Bayut and dubizzle will not publish a listing without a permit." },
  { q: "Who applies for the Trakheesi permit, you or us?",
    a: "You do. The permit is issued to the licensed brokerage or developer, and a broker applies with its marketing contract from the owner. QDnCo is not a licensed broker and does not apply for permits. We plan the permit into the creative from the brief, so every ad carries the right number and QR from day one and nothing has to be rebuilt after approval." },
  { q: "What is a good cost per lead for real estate in Dubai?",
    a: "There is no single reliable number. Community, ticket size, off-plan versus ready, the audience's country and the qualification definition all move it, and published Dubai figures vary widely because they measure different things. We will not publish a Dubai benchmark until we have our own campaign data. Judge any agency on cost per accepted qualified lead from your CRM, not on cost per form fill." },
  { q: "What exactly counts as a qualified lead?",
    a: "Lead quality is assessed against agreed contactability, budget, purchase timeline, location fit and duplicate checks. Record these in the CRM and use sales feedback to improve targeting and follow-up. Qualification is a reporting measure, not a per-lead billing or replacement guarantee. Results and bookings are not guaranteed." },
  { q: "How much do you charge in Dubai?",
    a: "Dubai services are quoted in AED by project or campaign count. Realtor / channel partner campaign management starts at AED 4,650 per project per month, with volume tiers. Developers and mandate firms share a separate rate schedule. Media spend is paid directly to Meta and Google; other services receive a custom quote." },
  { q: "Who pays for the ad spend, you or us?",
    a: "You do, directly to Meta and Google. The ad account stays in your brokerage's or company's name, so you remain the advertiser of record under the permit, media costs are visible to you rather than bundled, and a falling cost per lead shows up on your own invoice. Our fee is separate and covers the work, not the media." },
  { q: "Do you have an office or a licence in Dubai?",
    a: "No. QDnCo works from Bengaluru, India, and serves Dubai clients remotely. We do not hold a RERA broker licence and we do not sell property. We build and run the marketing inside your accounts and under your permits; your agents handle viewings, negotiation and closing." },
  { q: "Have you run campaigns in Dubai before?",
    a: "Not yet. Our delivered real-estate acquisition work is in India, across ten developer brands; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original research: an audit of 984 Dubai property ads in the UAE and 521 shown in India. Every Dubai engagement starts with Phase 0, a market read you can judge before any retainer, and every India figure on this page is labelled as India. We will publish our first India→Dubai results, labelled, when we have them." },
  { q: "Do you work with agents and brokerages as well as developers?",
    a: "Yes. Brokerages holding off-plan mandates, independent agents and channel partners running under their own licence, and developers launching off-plan all fit. Campaigns run from your own ad account and brand, so the leads are yours alone and are not resold to other agents." },
  { q: "How do you reach Indian buyers for Dubai property?",
    a: "Indian nationals were the largest foreign buyer group in Dubai in 2025, around 22% of foreign purchases according to brokerage analysis of DLD data. We already run campaigns to Indian property buyers every week, so we run India-side campaigns for Dubai inventory as a separate pool: city-level targeting, creative that answers the questions Indian buyers ask about ownership, payment plans and remittance, and follow-up timed for India, which is 90 minutes ahead of Dubai." },
  { q: "Can an agent promote listings on their personal Instagram?",
    a: "Individuals who advertise on social media in the UAE need an Advertiser Permit from the UAE Media Council, and the property ad still needs its DLD permit. Confirm the current scope for your case with the Media Council and your brokerage's compliance team before posting." },
  { q: "Which platforms work best for Dubai property?",
    a: "Meta and Google carry most paid demand: Meta for discovery and off-plan launches, Google for high-intent searches on communities, developers and project names. Portals such as Bayut, Property Finder and dubizzle stay with your listings team; we route their leads into the same CRM. LinkedIn suits high-ticket and investor audiences, and Snapchat is used where the buyer profile justifies it. The research decides the mix." },
  { q: "How long does it take to see results?",
    a: "You are live in market from roughly week six. The questionnaire, research and campaign architecture take about five to six weeks, then a month of live A/B testing produces the scale playbook. By month three the funnel, CRM routing and weekly dashboard are running and repeatable." },
  { q: "What reporting do you provide?",
    a: "A weekly dashboard and report covering spend, cost per lead, lead quality, sales-ready percentage, viewings, creative approvals and every budget-scaling decision. No metric that cannot be traced to a source." },
  { q: "Do you charge extra for more ad creatives?",
    a: "No. Both plans include ad creatives as required by the agreed campaign scope plus AI ad copy, regenerated on fatigue without a separate creative invoice. Studio production such as shoots, drone, UGC and motion graphics is a separate package, quoted per project and approved before commissioning." },
];

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    React.createElement('section', { id: "faq", className: "relative px-5 sm:px-8 md:px-10 pb-24"    ,
             style: { background: 'var(--veil)',
                      paddingTop: 'calc(var(--chrome-clear) + clamp(0.5rem, 2vh, 1.5rem))' },}
      , React.createElement(SeamFade, { edge: "bottom",} )
      , React.createElement('div', { className: "gridlines absolute inset-0 opacity-25"   ,} )
      , React.createElement('div', { className: "relative max-w-4xl mx-auto"  ,}
        , React.createElement('div', { className: "font-body text-xs md:text-sm mb-2"   , style: { color: 'rgba(var(--ink-rgb),0.75)' },}, "// Questions we get asked"    )
        , React.createElement('h2', { className: "hero-heading font-black uppercase leading-none tracking-tight"    ,
            style: { fontSize: 'clamp(2rem, 6vw, 4.5rem)' },}, "Real estate marketing, answered"   )

        , React.createElement('p', { className: "font-body mt-5" , style: { color: 'rgba(var(--ink-rgb),0.74)',
             fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', lineHeight: 1.6, maxWidth: '62ch' },}, "Longer answers live in the"
              , ' '
          , React.createElement('a', { href: "/guides/", style: { color: 'var(--accent)' },}, "guides"), " — including"  , ' '
          , React.createElement('a', { href: "/guides/ai-creative-volume-vs-traditional-agency.html", style: { color: 'var(--accent)' },}, "AI creative volume vs a traditional agency"      ), ",", ' '
          , React.createElement('a', { href: "/guides/cost-per-qualified-lead-real-estate.html", style: { color: 'var(--accent)' },}, "real cost-per-qualified-lead benchmarks"  ), ",", ' '
          , React.createElement('a', { href: "/guides/what-counts-as-a-qualified-lead.html", style: { color: 'var(--accent)' },}, "the written definition of a qualified lead"      ), ", and" , ' '
          , React.createElement('a', { href: "/guides/how-much-should-a-developer-spend.html", style: { color: 'var(--accent)' },}, "how to size a launch budget"     ), "."
        )

        , React.createElement('div', { className: "mt-10", style: { borderTop: '1px solid rgba(var(--ink-rgb),0.14)' },}
          , FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              React.createElement('div', { key: f.q, style: { borderBottom: '1px solid rgba(var(--ink-rgb),0.14)' },}
                , React.createElement('button', { onClick: () => setOpen(isOpen ? -1 : i),
                        'aria-expanded': isOpen,
                        className: "w-full text-left flex items-start gap-4 py-5 transition-colors hover:bg-white/[0.02]"       ,}
                  , React.createElement('span', { className: "font-body tabular-nums shrink-0 pt-1"   ,
                        style: { color: isOpen ? 'var(--tint-secondary)' : 'rgba(var(--ink-rgb),0.66)', fontSize: 'var(--fs-micro)' },}
                    , String(i + 1).padStart(2, '0')
                  )
                  , React.createElement('h3', { className: "flex-1 font-medium leading-snug"  ,
                      style: { color: isOpen ? 'var(--ink)' : 'rgba(var(--ink-rgb),0.88)', fontSize: 'clamp(1rem,1.6vw,1.3rem)' },}
                    , f.q
                  )
                  , React.createElement('span', { className: "shrink-0 mt-1" , style: { color: isOpen ? 'var(--tint-secondary)' : 'rgba(var(--ink-rgb),0.66)',
                        transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 320ms cubic-bezier(0.16,1,0.3,1)' },}, "+")
                )
                , React.createElement('div', { className: "grid", style: { gridTemplateRows: isOpen ? '1fr' : '0fr',
                     transition: 'grid-template-rows 380ms cubic-bezier(0.16,1,0.3,1)' },}
                  , React.createElement('div', { className: "overflow-hidden",}
                    , React.createElement('p', { className: "font-body font-light pb-6 pl-10 pr-4 max-w-3xl"     ,
                       style: { color: 'rgba(var(--ink-rgb),0.72)', fontSize: 'var(--fs-text-lg)', lineHeight: 1.65 },}
                      , f.a
                    )
                  )
                )
              )
            );
          })
        )
      )
    )
  );
}

/* ═══════════ 7. CONTACT ═══════════ */
/* ═══════════ CTA + FOOTER ═══════════
 *
 * Built to the supplied template: cinematic full-width call over a video ground,
 * centred heading, two CTAs — one glass, one solid — and a minimal footer bar.
 *
 * One deliberate departure. The template mounts its own <video> of the Mux
 * stream; the site wallpaper is already that exact stream, running fixed behind
 * every section. Mounting a second copy would decode the same asset twice for no
 * visual gain, so the section takes the soft veil and lets the wallpaper through.
 * The template's top and bottom fades are kept — they still do their job of
 * settling the motion at the section's edges.
 *
 * Footer contents are chosen from the research rather than from convention:
 *   · NAP block (name, area, phone, email) — the entity signal answer engines
 *     read, and the thing a developer checks before calling a solo practice.
 *   · RERA line — Section 3(1) bars advertising an unregistered project, and
 *     almost no small agency says so out loud. It is a trust signal and a
 *     liability shield at once.
 *   · Catchment named explicitly (Bangalore + Mysore) — the Tier-2 arbitrage is
 *     real delivered work, not a claim, and it is what a Mysore plot developer
 *     searches for.
 *   · The three offers link straight into #pricing, because published pricing is
 *     the position and the footer is where a returning visitor looks for it.
 */
const FOOTER_NAV = [
  {
    h: 'Offers',
    links: [
      { l: 'Meta/Google Ad Campaigns — From AED 4,650', h: '#pricing' },
      { l: 'Monthly Retainer', h: '#pricing' },
      { l: 'Creative add-ons', h: '#pricing' },
    ],
  },
  {
    h: 'The work',
    links: [
      { l: 'Built for Dubai', h: '#dubai' },
      { l: 'Services', h: '#services' },
      { l: 'Projects', h: '#projects' },
      { l: 'Ad creative', h: '#adreel' },
      { l: 'How we work together', h: '#roadmap' },
      { l: 'Questions', h: '#faq' },
    ],
  },
  {
    h: 'Dubai guides',
    links: [
      { l: 'Indian buyers for Dubai property', h: '/dubai/indian-real-estate-performance-marketing-agency/' },
      { l: 'India → Dubai buyer report 2026', h: '/data/india-dubai-buyer-acquisition-report.html' },
      { l: 'Dubai real estate marketing', h: '/dubai/real-estate-marketing/' },
      { l: 'Trakheesi permits for marketers', h: '/dubai/trakheesi-permit-guide/' },
      { l: 'Lead generation for Dubai brokers', h: '/dubai/real-estate-lead-generation/' },
      { l: 'Selling Dubai property to Indian buyers', h: '/dubai/indian-buyers/' },
      { l: 'Off-plan launch marketing', h: '/dubai/off-plan-launch-marketing/' },
      { l: 'Dubai Meta ad audit (original research)', h: '/data/meta-ad-library-audit-dubai-real-estate.html' },
      { l: 'Lead generation from India', h: '/dubai/property-lead-generation-from-india/' },
      { l: 'NRI and HNI marketing', h: '/dubai/nri-hni-real-estate-marketing/' },
      { l: 'Off-plan for Indian buyers', h: '/dubai/off-plan-marketing-indian-buyers/' },
      { l: 'Meta & Google Ads from India', h: '/dubai/meta-google-ads-dubai-property-india/' },
    ],
  },
  {
    h: 'India work',
    links: [
      { l: 'QDnCo India', h: '/' },
      { l: 'About QDnCo', h: '/about/' },
      { l: 'All case studies', h: '/work/' },
      { l: 'Indium — AED 12.32 CPL at 51%', h: '/work/indium-north-bangalore.html' },
      { l: 'Kumar Platina', h: '/work/kumar-platina.html' },
      { l: 'Meta Ad Library audit — 41 agencies', h: '/data/meta-ad-library-audit-bangalore-agencies.html' },
      { l: 'All guides', h: '/guides/' },
      { l: 'Resource library', h: '/resources/' },
      { l: 'Field guides & worksheets', h: '/insights/' },
    ],
  },
  {
    h: 'Legal',
    links: [
      { l: 'Privacy Policy', h: '/legal/privacy.html' },
      { l: 'Terms of Use', h: '/legal/terms.html' },
      { l: 'Cookie Policy', h: '/legal/cookies.html' },
      { l: 'Disclaimer', h: '/legal/disclaimer.html' },
      { l: 'Refunds & Cancellation', h: '/legal/refund.html' },
    ],
  },
];

function CtaFooter() {
  const { open: openLead } = useLead();
  const fade = (i) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    /* amount 0 + a bottom margin: on phones the footer column stack is taller than
       the screen, so any fraction (0.3 of ~3300px) can never be in view and the
       footer stayed at opacity 0. Reveal once its top clears the bottom 10%. */
    viewport: { once: true, amount: 0, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    React.createElement('section', { id: "contact", className: "relative overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24 pb-10"      ,
             style: { background: 'var(--veil-soft)',
                      paddingTop: 'calc(var(--chrome-clear) + clamp(1rem, 3vh, 2.5rem))' },}

      /* Only the bottom edge fade survives. The matching one at the top washed
          the page colour over the first 200px of the footer, so arriving here
          read as a transition being played at you rather than as a section. */
      , React.createElement('div', { 'aria-hidden': "true", className: "absolute inset-x-0 bottom-0 z-[1] pointer-events-none"    ,
           style: { height: 200, background: 'linear-gradient(to top, rgb(var(--page-rgb)), transparent)' },} )

      , React.createElement('div', { className: "relative z-10" ,}

        /* ── The call, in the hero template's vocabulary ──
            Inter at 600, uppercase on wide tracking, the accent carrying the
            primary link, and the two-row bottom composition — tagline against
            call, then description against a big right-aligned heading that
            clip-reveals word by word. The same shape closes the page that opens
            it, which is the point of reusing the template here.

            Colour comes from tokens rather than the template's literal #000, so
            one build serves both grounds: --ink flips, and --accent carries a
            lightened violet on the dark page where #5E0ED7 would drop to ~2:1. */
        , React.createElement('div', { style: { fontFamily: "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, sans-serif" },}

          /* Row A — tagline left, accent call right */
          , React.createElement('div', { className: "flex items-center justify-between gap-4"   ,}
            , React.createElement(motion.p, { ...fade(0), className: "font-semibold uppercase tracking-widest"  ,
                      style: { color: 'var(--ink)', fontSize: 'var(--fs-micro)',
                               lineHeight: 1.5, maxWidth: 'clamp(130px, 20vw, 260px)' },}, "A Questionnaire"
               , React.createElement('br', null ), "Not A Proposal"  , React.createElement('br', null ), "Paid, Not Pitched"
            )

            /* Was a bare mailto link that read as text and bypassed the form.
                Now a button: oval, transparent, and it opens the lead dialog. */
            , React.createElement(motion.button, { ...fade(1), type: "button", onClick: openLead,
                           className: "footer-cta",}, "Book a Phase 0 call"

              , React.createElement(ArrowUpRight, { className: "h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]"   ,} )
            )
          )

          /* ── The form, beside the closing line ──
              A reader who has come this far has already decided. Making them
              open a dialog first adds a step at the exact moment the friction
              costs most, so the same component is rendered in place. */
          , React.createElement('div', { className: "closing-grid",}
            , React.createElement(EmbeddedLeadForm, null )
            , React.createElement('div', { className: "closing-right",}

          /* Row B — description left, clip-revealed heading right */
          /* The heading owns the row now. Beside it the line was floating in
              the middle of the column with nothing to align to; underneath, it
              reads as the heading's own subtitle. */
          , React.createElement('div', { className: "closing-head mt-6 md:mt-10"  ,}

            /* Back to "Let's talk" in the display serif. The Inter setting
                matched the hero template, but this is the closing line of the
                page and the serif is what carried it before — the template's
                job here was the layout, not the voice. */
            , React.createElement('h2', { className: "closing-title text-right" ,
                style: { color: 'var(--ink)', fontFamily: "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, serif",
                         fontStyle: 'italic', fontWeight: 400,
                         fontSize: 'clamp(2.4rem, 9vw, 8.4rem)', lineHeight: 0.86,
                         /* Opened from -0.02em. Positive tracking widens the words
                            leftward from a fixed right edge, which reaches further
                            left without the glyphs getting any bigger. */
                         letterSpacing: '0.012em' },}
              /* The observer has to watch the WRAPPER, not the word. The word
                  starts at y:110% — translated clean outside its own clip mask —
                  so a whileInView on the word itself never intersects and the
                  reveal never fires. Driving it through variants from the
                  stationary parent is what makes the trigger reliable. */
              , ["Let's", 'talk'].map((word, i) => (
                React.createElement(motion.span, { key: word, className: "block overflow-hidden" ,
                             initial: "hidden", whileInView: "show",
                             viewport: { once: true, amount: 0.2 },}
                  , React.createElement(motion.span, { className: "block",
                               variants: { hidden: { y: '110%' }, show: { y: 0 } },
                               transition: { delay: 0.15 + i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] },}
                    , word
                  )
                )
              ))
            )
          )

          , React.createElement(motion.p, { ...fade(2), className: "closing-note",}, "You will know what the market says about your project before anyone spends a dirham"

          )

          /* Two explicit rows rather than one wrapping rail. Left to wrap, the
              five chips ran wider than the heading and the break landed
              wherever the widest chip happened to fall. Phone, WhatsApp and
              email are the routes someone actually uses at this point, so they
              hold the first row on their own. */
          , React.createElement(motion.div, { ...fade(3), className: "closing-rail",}
            , React.createElement('div', { className: "closing-rail-row",}
              , React.createElement('a', { className: "footer-chip", href: "tel:+918861179992",}
                , React.createElement(PhoneIcon, { className: "h-4 w-4" ,} ), " +91 88611 79992"
              )
              , React.createElement('a', { className: "footer-chip", href: "https://wa.me/918861179992", target: "_blank", rel: "noreferrer noopener" ,}
                , React.createElement(WhatsAppIcon, { className: "h-4 w-4" , style: { color: '#25D366' },} ), " WhatsApp"
              )
              , React.createElement('a', { className: "footer-chip", href: "mailto:qdnco01@gmail.com",}
                , React.createElement(Mail, { className: "h-4 w-4" ,} ), " Email"
              )
            )
            /* Social profiles as platform icons (Simple Icons, one filled family in
                currentColor). Icon-only, so each chip carries its name in
                aria-label and the glyph is hidden from assistive tech. */
            , React.createElement('div', { className: "closing-rail-row social-row",}
              , SOCIAL_LINKS.map((s) => (
                React.createElement('a', { key: s.label, className: "footer-chip footer-chip-icon", href: s.href,
                   target: "_blank", rel: "noreferrer noopener me", 'aria-label': s.label, title: s.title,}
                  , React.createElement(s.Icon, { className: "h-[18px] w-[18px]",} )
                )
              ))
            )
            , React.createElement('div', { className: "closing-rail-row",}
              , React.createElement('a', { className: "footer-chip", href: "#pricing",}, "Pricing "
                 , React.createElement(ArrowUpRight, { className: "h-3.5 w-3.5" ,} )
              )
            )
          )
            )
          )
        )

        /* ── footer ── */
        , React.createElement(motion.div, { ...fade(3), className: "mt-14 md:mt-20 pt-10"  ,
                    style: { borderTop: '1px solid rgba(var(--ink-rgb),0.16)' },}

          , React.createElement('div', { className: "grid gap-9 sm:gap-8 footer-cols"   ,
               style: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))' },}

            /* NAP — the entity block */
            , React.createElement('div', null
              , React.createElement('p', { className: "font-body font-semibold uppercase"  , style: { color: 'var(--ink)', letterSpacing: '0.12em', fontSize: 'var(--fs-micro)' },}, "QDnCo"  )
              , React.createElement('p', { className: "font-body font-light mt-3"  , style: { color: 'rgba(var(--ink-rgb),0.72)', fontSize: 'var(--fs-text)', lineHeight: 1.6 },}, "Real estate marketing."
                  , React.createElement('br', null ), "Based in Bengaluru, India. Serving Dubai and the UAE remotely."

              )
              , React.createElement('div', { className: "flex flex-col gap-1.5 mt-4"   ,}
                , React.createElement('a', { href: "tel:+918861179992", className: "font-body inline-flex items-center gap-2 w-fit"    ,
                   style: { color: 'rgba(var(--ink-rgb),0.86)', textDecoration: 'none', fontSize: 'var(--fs-caption)', minHeight: 28 },}
                  , React.createElement(PhoneIcon, { className: "h-3.5 w-3.5 shrink-0"  ,} ), " +91 88611 79992"
                )
                , React.createElement('a', { href: "https://wa.me/918861179992", target: "_blank", rel: "noreferrer noopener" ,
                   className: "font-body inline-flex items-center gap-2 w-fit"    ,
                   style: { color: 'rgba(var(--ink-rgb),0.86)', textDecoration: 'none', fontSize: 'var(--fs-caption)', minHeight: 28 },}
                  , React.createElement(WhatsAppIcon, { className: "h-3.5 w-3.5 shrink-0"  , style: { color: '#25D366' },} ), " WhatsApp"
                )
                , React.createElement('a', { href: "mailto:qdnco01@gmail.com", className: "font-body inline-flex items-center gap-2 w-fit"    ,
                   style: { color: 'rgba(var(--ink-rgb),0.86)', textDecoration: 'none', fontSize: 'var(--fs-caption)', minHeight: 28, wordBreak: 'break-all' },}
                  , React.createElement(Mail, { className: "h-3.5 w-3.5 shrink-0"  ,} ), " qdnco01@gmail.com"
                )
                , React.createElement('a', { href: "https://www.linkedin.com/in/v-s-kavshik", target: "_blank", rel: "noreferrer noopener" ,
                   className: "footer-chip footer-chip-icon", 'aria-label': "V. Sai Kavshik on LinkedIn", title: "LinkedIn",}
                  , React.createElement(LinkedInIcon, { className: "h-[18px] w-[18px]",} )
                )
              )
            )

            , FOOTER_NAV.map((col) => (
              React.createElement('div', { key: col.h,}
                , React.createElement('p', { className: "font-body font-semibold uppercase"  , style: { color: 'var(--ink)', letterSpacing: '0.12em', fontSize: 'var(--fs-micro)' },}, col.h)
                , React.createElement('ul', { className: "mt-3 space-y-1.5" ,}
                  , col.links.map((l) => (
                    React.createElement('li', { key: l.l,}
                      , React.createElement('a', { href: l.h, className: "font-body font-light inline-flex items-center transition-opacity hover:opacity-100"     ,
                         style: { color: 'rgba(var(--ink-rgb),0.72)', textDecoration: 'none',
                                  fontSize: 'var(--fs-caption)', lineHeight: 1.5, minHeight: 28 },}
                        , l.l
                      )
                    )
                  ))
                )
              )
            ))

            /* The compliance line, given its own column rather than buried in
                the small print — it is a differentiator, not a disclaimer. */
            , React.createElement('div', null
              , React.createElement('p', { className: "font-body font-semibold uppercase"  , style: { color: 'var(--ink)', letterSpacing: '0.12em', fontSize: 'var(--fs-micro)' },}, "How we work"  )
              , React.createElement('p', { className: "font-body font-light mt-3"  , style: { color: 'rgba(var(--ink-rgb),0.72)', fontSize: 'var(--fs-text)', lineHeight: 1.6 },}, "Every Dubai ad is checked for a valid DLD advertising permit before it runs. Media is billed to you directly by Meta and Google — never through us."


              )
              , React.createElement('p', { className: "font-body font-light mt-3"  , style: { color: 'rgba(var(--ink-rgb),0.66)', fontSize: 'var(--fs-text)', lineHeight: 1.55 },}, "Historical figures are owner-reported. Pipeline is not booked revenue; planning examples are labelled separately."
                             , ' '
                , React.createElement('a', { href: "/legal/disclaimer.html", style: { color: 'var(--accent)', textDecoration: 'none' },}, "Read the disclaimer"  ), "."
              )
            )
          )

          , React.createElement('div', { className: "flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-7"       ,
               style: { borderTop: '1px solid rgba(var(--ink-rgb),0.12)' },}
            , React.createElement('p', { className: "font-body font-light text-center sm:text-left"   ,
               style: { color: 'rgba(var(--ink-rgb),0.66)', fontSize: 'var(--fs-micro)', lineHeight: 1.6 },}, "© 2026 QDnCo. All rights reserved."
                     , React.createElement('br', null )
              , React.createElement('span', null, "Bangalore, Karnataka, India · Grievance officer:"
                     , ' '
                , React.createElement('a', { href: "mailto:qdnco01@gmail.com",
                   style: { color: 'inherit', textDecoration: 'underline' },}, "V. Sai Kavshik"  )
              )
            )
            , React.createElement('div', { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-2"     ,}
              , [['Privacy', '/legal/privacy.html'], ['Terms', '/legal/terms.html'],
                ['Cookies', '/legal/cookies.html'], ['Disclaimer', '/legal/disclaimer.html'],
                ['Back to top', '#top']].map(([l, h]) => (
                React.createElement('a', { key: l, href: h, className: "font-body font-light transition-opacity hover:opacity-100"   ,
                   style: { color: 'rgba(var(--ink-rgb),0.66)', textDecoration: 'none', fontSize: 'var(--fs-micro)', minHeight: 28, display: 'inline-flex', alignItems: 'center' },}
                  , l
                )
              ))
            )
          )
        )
      )
    )
  );
}

/* ═══════════ SCROLL ORB ═══════════
   A small translucent sphere pinned to the bottom-left for the whole site.
   Two semicircular arrows chase each other inside it, and they turn only as the
   page turns — so any scroll produces visible motion and the reader can feel
   they are making progress rather than dragging through dead space.
   The shell itself rotates continuously but very slowly, and drifts, so the
   thing is alive even when the page is still. */
function ScrollOrb() {
  const [rot, setRot] = useState(0);
  const [onLight, setOnLight] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let last = -1;
    const read = () => {
      /* Direct mapping to scroll position, not accumulated delta — scrolling back
         up unwinds the arrows, which is what makes it feel connected. */
      const deg = Math.round(window.scrollY * 0.34);
      if (deg !== last) { last = deg; setRot(deg); }

      /* Any light section, not just Services — the intro is light in white
         mode too, and a white sphere on an off-white ground disappears. */
      const el = ref.current;
      if (el) {
        const o = el.getBoundingClientRect();
        const mid = o.top + o.height / 2;
        let hit = false;
        for (const sec of document.querySelectorAll('[data-light]')) {
          const b = sec.getBoundingClientRect();
          if (mid > b.top && mid < b.bottom) { hit = true; break; }
        }
        setOnLight(hit);
      }
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  const ink = onLight ? '#0A0D12' : '#FFFFFF';
  const rim = onLight ? 'rgba(10,13,18,0.42)' : 'rgba(255,255,255,0.20)';

  /* Fixed positions so a rerender never makes the stars jump. */
  const STARS = [
    { x: 26, y: 30, s: 1.6, d: '0s' },
    { x: 68, y: 24, s: 1.2, d: '0.7s' },
    { x: 38, y: 66, s: 1.4, d: '1.4s' },
    { x: 74, y: 60, s: 1.0, d: '2.1s' },
    { x: 52, y: 18, s: 1.1, d: '2.8s' },
    { x: 20, y: 52, s: 1.0, d: '1.1s' },
  ];

  return (
    React.createElement('div', { ref: ref, className: "orb-shell fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 pointer-events-none"       ,
         'aria-hidden': "true",
         style: { width: 'clamp(58px, 7vw, 78px)', height: 'clamp(58px, 7vw, 78px)' },}

      /* the sphere: low-opacity fog, thin rim, soft inner light */
      , React.createElement('div', { className: "relative h-full w-full rounded-full overflow-hidden"    ,
           style: {
             background: onLight
               ? 'radial-gradient(circle at 34% 28%, rgba(10,13,18,0.20) 0%, rgba(10,13,18,0.10) 34%, rgba(10,13,18,0.04) 62%, rgba(10,13,18,0.02) 100%)'
               : 'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.14) 0%, rgba(var(--fill-rgb),0.05) 34%, rgba(var(--fill-rgb),0.015) 62%, rgba(var(--fill-rgb),0.005) 100%)',
             backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)',
             border: `1px solid ${rim}`,
             boxShadow: onLight
               ? 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -8px 14px rgba(10,13,18,0.14), 0 10px 22px -10px rgba(10,13,18,0.35)'
               : 'inset 0 1px 2px rgba(255,255,255,0.22), inset 0 -8px 14px rgba(0,0,0,0.35), 0 10px 26px -8px rgba(0,0,0,0.7)',
             /* No transition on the contrast swap. A fade would leave a window where
                the orb is mid-way between light and dark — i.e. invisible against
                whichever surface it is crossing — and it would stall entirely if the
                browser throttles animation frames. The flip must be immediate. */
           },}

        /* meridian lines — what makes the sphere read as turning */
        , React.createElement('div', { className: "orb-meridian absolute inset-0 rounded-full"   ,
             style: { background: `repeating-linear-gradient(90deg, transparent 0 9px, ${onLight ? 'rgba(10,13,18,0.10)' : 'rgba(var(--fill-rgb),0.055)'} 9px 10px)` },} )
        , React.createElement('div', { className: "orb-sheen absolute inset-0 rounded-full"   ,
             style: { background: `linear-gradient(115deg, transparent 38%, ${onLight ? 'rgba(10,13,18,0.09)' : 'rgba(255,255,255,0.10)'} 50%, transparent 62%)` },} )

        /* sparkles */
        , STARS.map((s, i) => (
          React.createElement('span', { key: i, className: "orb-star absolute rounded-full"  ,
                style: { left: s.x + '%', top: s.y + '%', width: s.s, height: s.s,
                         background: ink,
                         boxShadow: `0 0 3px 1px ${onLight ? 'rgba(10,13,18,0.55)' : 'rgba(255,255,255,0.9)'}`,
                         animationDelay: s.d },} )
        ))

        /* the two chasing arrows — turned by the scroll */
        , React.createElement('svg', { viewBox: "0 0 100 100"   , className: "absolute inset-0 h-full w-full"   ,
             style: { transform: `rotate(${rot}deg)`, willChange: 'transform' },}
          , React.createElement('defs', null
            , React.createElement('marker', { id: onLight ? 'orbArrowDark' : 'orbArrow', viewBox: "0 0 10 10"   , refX: "6", refY: "5",
                    markerWidth: "3.6", markerHeight: "3.6", orient: "auto",}
              , React.createElement('path', { d: "M 0 1 L 9 5 L 0 9 z"         , fill: ink,} )
            )
          )
          /* upper arc, head aiming into the lower arc's tail */
          , React.createElement('path', { d: "M 20.5 44.8 A 30 30 0 0 1 79.5 44.8"          , fill: "none",
                stroke: ink, strokeOpacity: onLight ? 0.88 : 0.82, strokeWidth: "3.4", strokeLinecap: "round",
                markerEnd: `url(#${onLight ? 'orbArrowDark' : 'orbArrow'})`,} )
          /* lower arc, head aiming back into the upper arc's tail */
          , React.createElement('path', { d: "M 79.5 55.2 A 30 30 0 0 1 20.5 55.2"          , fill: "none",
                stroke: ink, strokeOpacity: onLight ? 0.88 : 0.82, strokeWidth: "3.4", strokeLinecap: "round",
                markerEnd: `url(#${onLight ? 'orbArrowDark' : 'orbArrow'})`,} )
        )
      )
    )
  );
}

/* The line that used to sit inside the hero, now the handover between the hero
   and what follows.
 *
 * It reads better here: inside the hero it was one more thing competing for the
 * fold, and the hero already carries the logos it refers to. As a strip on the
 * page ground it does the job a section divider does — it tells you the proof
 * you just scrolled past was real, and hands you on. */
function HeroBridge() {
  return (
    /* This line now holds the space the marquees used to fill, so it arrives
       rather than simply being present: it starts pulled back and slightly
       small, then pushes outward to full size as it enters. The scale is the
       whole effect — a fade alone reads as nothing at this size of type. */
    React.createElement('div', { className: "relative w-full text-center px-4"   ,
         style: { background: 'var(--veil)', paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' },}
      , React.createElement(motion.span, { initial: { opacity: 0, scale: 0.82, letterSpacing: '0.4em' },
                   whileInView: { opacity: 1, scale: 1, letterSpacing: '0.22em' },
                   viewport: { once: true, amount: 0.6 },
                   transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                   className: "font-body font-semibold uppercase inline-block"   ,
                   style: { color: 'var(--ink)', fontSize: 'clamp(0.82rem, 1.25vw, 1.08rem)',
                            paddingBottom: 8, borderBottom: '2px solid rgba(var(--ink-rgb),0.45)' },}, "Proof from India's leading developer projects"

      )
    )
  );
}

/* ═══════════ AD REEL — the work, on a curved continuous scroll ═══════════
 *
 * Framing note, because it is a real strategic choice and not a copy decision.
 *
 * The obvious version of this section is "look at our AI ads". The research says
 * that is a losing frame: AI adoption in Indian commercial real estate went from
 * under 5% in 2023 to 91% in 2025 (JLL), and one of the 41 sell-side advertisers
 * in the August 2026 Ad Library scrape already runs "AI-Powered Digital Marketing"
 * as its headline hook. Announcing AI in 2026 reads as late, not advanced.
 *
 * So the section keeps both: the work is on show, and the frame around it is the
 * research gate. AI made creative cheap and therefore abundant — volume is no
 * longer scarce, and knowing which variant to make is. The reel demonstrates the
 * throughput; the heading claims the judgement.
 *
 * The curve is the reference's, done in CSS: the strip is over-wide and rotated
 * slightly, with each tile counter-rotated by its position so the row reads as an
 * arc without a 3D context or a canvas.
 */
/* Generated by `node make-adreel.mjs` from QDnCo/Reference creatives —
   not hand-listed, because a hand-list is how an asset silently 404s.
   Re-run that script after dropping new creatives in and paste the
   manifest back here. */
/* Generated by `node make-adreel.mjs` from QDnCo/Reference creatives.
   Order is hand-set, not manifest order: ad-06 and ad-07 are the same
   Platina layout and sat adjacent, reading as a duplicate. They now hold
   the two ends of the loop with an equal run of ten between them, so the
   pair is never on screen together. */
const AD_REEL = [
  /* All 9:16, all 620x1102. The frame ratio equals the artwork ratio, so
     cover fills the tile corner to corner and trims nothing. */
  { f: 'ad-01.jpg', w: 620, h: 1102 },
  { f: 'ad-02.jpg', w: 620, h: 1102 },
  { f: 'ad-03.jpg', w: 620, h: 1102 },
  { f: 'ad-04.jpg', w: 620, h: 1102 },
  { f: 'ad-05.jpg', w: 620, h: 1102 },
  { f: 'ad-06.jpg', w: 620, h: 1102 },
  { f: 'ad-07.jpg', w: 620, h: 1102 },
  { f: 'ad-08.jpg', w: 620, h: 1102 },
  { f: 'ad-09.jpg', w: 620, h: 1102 },
  { f: 'ad-10.jpg', w: 620, h: 1102 },
  { f: 'ad-11.jpg', w: 620, h: 1102 },
];

/* Placeholder tiles until the real creatives land. Each carries its spec so the
   row is legible as a production sheet rather than as decoration — and so the
   swap to real artwork is a one-line change per entry. */
/* ═══════════ AD REEL — arc carousel ═══════════
 *
 * The reference is not a flat marquee. The row is the FAR side of a cylinder
 * curving away from the viewer: a tile enters small at the right, swells as it
 * comes round through the middle where it is nearest and most face-on, then
 * shrinks again as it leaves on the left.
 *
 * The first build had this inverted — big at the ends, small in the middle —
 * which reads as the strip bulging out of the screen toward you. Turning it
 * inside out is a sign flip on all three terms: scale, bow and tilt.
 *
 * That cannot be done with a CSS keyframe translate, because every tile needs a
 * different transform depending on where it currently is across the viewport.
 * So position is driven from a single rAF loop that computes each tile's
 * progress analytically and writes one transform per tile per frame.
 *
 * Deliberately analytic rather than measured: reading getBoundingClientRect for
 * 24 tiles every frame would force 24 layout flushes and stutter on a phone.
 * The loop knows the step and the offset, so it can derive x without asking the
 * browser anything.
 */
const REEL_SPEED = 46;      // px per second, left-ward
const ARC_DEPTH = 0.15;     // how much smaller the ENDS of the arc sit
const ARC_LIFT = 0.08;      // vertical bow, as a fraction of tile height
const ARC_TILT = 4.2;       // degrees at the extremes

function AdReelCarousel() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const itemsRef = useRef([]);
  const offsetRef = useRef(0);
  const lastRef = useRef(0);
  const [tiles, setTiles] = useState([]);

  /* Enough copies to cover the widest viewport plus one tile of overhang at
     each end, so the loop never shows a gap. Recomputed on resize. */
  useEffect(() => {
    const compute = () => {
      const vw = _optionalChain([viewportRef, 'access', _2 => _2.current, 'optionalAccess', _3 => _3.clientWidth]) || 1200;
      const el = itemsRef.current.find(Boolean);
      const step = el ? el.offsetWidth + parseFloat(getComputedStyle(el).marginRight || 0) : 260;
      const need = Math.ceil((vw + step * 3) / (AD_REEL.length * step));
      setTiles(Array.from({ length: Math.max(2, need + 1) }, () => AD_REEL).flat());
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const frame = (t) => {
      const vp = viewportRef.current;
      const els = itemsRef.current.filter(Boolean);
      if (!vp || !els.length) { raf = requestAnimationFrame(frame); return; }

      const dt = lastRef.current ? Math.min(0.05, (t - lastRef.current) / 1000) : 0;
      lastRef.current = t;
      if (!reduce) offsetRef.current += REEL_SPEED * dt;

      const first = els[0];
      const tw = first.offsetWidth;
      const th = first.offsetHeight;
      const step = tw + parseFloat(getComputedStyle(first).marginRight || 0);
      const total = step * els.length;
      const vw = vp.clientWidth;
      /* Travel span: fully off the right edge to fully off the left edge. */
      const span = vw + tw;

      for (let i = 0; i < els.length; i++) {
        let x = i * step - (offsetRef.current % total);
        /* Wrap into the visible band. Two conditionals rather than a modulo so
           the value never jumps by a whole period mid-frame, which would show
           as a tile teleporting. */
        if (x < -tw) x += total;
        if (x > total - tw) x -= total;

        /* u: 0 at the right edge, 1 at the left. */
        const u = Math.max(0, Math.min(1, (vw - x) / span));
        const bow = Math.sin(Math.PI * u);            // 0 at ends, 1 at centre

        const scale = 1 - ARC_DEPTH * (1 - bow);
        const lift = -ARC_LIFT * th * bow;            // centre rides highest
        const tilt = ARC_TILT * Math.cos(Math.PI * u);  // tangent of the arc

        /* -50% is the tile's own half-height, so it centres on the track's
           midline at any viewport width; the bow is added on top of that. */
        els[i].style.transform =
          `translate(${x.toFixed(1)}px, calc(-50% + ${lift.toFixed(1)}px))` +
          ` rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        /* Tiles at the very ends fade rather than clipping hard at the mask. */
        els[i].style.opacity = (0.35 + 0.65 * Math.min(1, Math.sin(Math.PI * u) * 1.9 + 0.25)).toFixed(3);
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [tiles.length]);

  return (
    React.createElement('div', { ref: viewportRef, className: "adreel-viewport", 'aria-label': "Selected ad creatives"  ,}
      , React.createElement('div', { ref: trackRef, className: "adreel-track",}
        , tiles.map((a, i) => (
          React.createElement('figure', { key: `${a.f}-${i}`, className: "adreel-tile",
                  ref: (el) => { itemsRef.current[i] = el; },}
            , React.createElement('img', { src: `/adreel/${a.f}`, alt: "", 'aria-hidden': "true",
                 loading: "lazy", decoding: "async", width: a.w, height: a.h,} )
          )
        ))
      )
    )
  );
}

function AdReelSection() {
  return (
    React.createElement('section', { id: "adreel", className: "relative overflow-hidden px-4 sm:px-7 md:px-10 pb-20 sm:pb-24"      ,
             style: { background: 'var(--veil)',
                      paddingTop: 'calc(var(--chrome-clear) + clamp(0.5rem, 2vh, 1.5rem))' },}

      , React.createElement(SeamFade, { edge: "top",} )
      , React.createElement(SeamFade, { edge: "bottom",} )

      /* The eyebrow said "Creative production · Meta & Google" and the closing
          line under the reel says the same thing in a full sentence. Two labels
          for one section pushed the headline down without adding anything, so
          the headline opens the section and takes the space back as size. */
      , React.createElement('div', { className: "relative z-10 mx-auto text-center"   , style: { maxWidth: 'var(--content-max)' },}
        , React.createElement(motion.h2, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
                   viewport: { once: true, amount: 0.4 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                   className: "font-heading italic mx-auto max-w-5xl"   ,
                   style: { color: 'var(--ink)', fontSize: 'clamp(2.5rem, 7vw, 5.6rem)', lineHeight: 0.92, letterSpacing: '-0.025em' },}, "Research-led ad creatives. Ad creatives included."

        )

        , React.createElement(motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.4 }, transition: { duration: 0.6, delay: 0.12 },
                  className: "font-body font-light mx-auto max-w-2xl mt-5"    ,
                  style: { color: 'rgba(var(--ink-rgb),0.86)', fontSize: 'var(--fs-text)', lineHeight: 1.55 },}, "Imagine shipping dozens of AI creatives across a launch — research decides the angle, volume finds the winner — without a separate studio invoice for AI statics. The commercial package includes ad creatives as required by the agreed campaign scope, refreshed on fatigue."



        )
      )

      /* The reel. Over-wide and tilted so the row reads as an arc; the tiles
          counter-rotate so their own type stays level. */
      , React.createElement('div', { className: "adreel-stage relative mt-12 sm:mt-16"   ,}
        , React.createElement(AdReelCarousel, null )
      )

      , React.createElement('p', { className: "relative z-10 font-body text-center mx-auto mt-9 max-w-2xl"      ,
         style: { color: 'rgba(var(--ink-rgb),0.7)', fontSize: 'var(--fs-text)', lineHeight: 1.55 },}, "Selected AI pipeline creatives across Meta and Google — capacity, not a daily quota."

      )

      /* The reader is looking at the creative right now, which is the only
          place the in-scope / out-of-scope line will actually be read. */
      , React.createElement('div', { className: "reel-scope",}
        , React.createElement('p', null, React.createElement('strong', null, "Included in every package:"   ), " AI-generated ad copy and ad creatives as required by the agreed campaign scope at this grade, refreshed on fatigue with no separate creative invoice. Pipeline capacity can reach dozens of variants across a project — that is capability, not a daily quota. Traditional studio hours are not how this path works."


                     )
        , React.createElement('p', null, React.createElement('strong', null, "Quoted separately — the studio package:"     ), " professional shoot and product shoot, professional edit, videographers, drone cinematography, UGC and IGC creator content, motion graphics and industry-standard graphic design. Partnered creative agencies deliver that at studio grade, priced per project and approved by you first."



         )
      )

    )
  );
}

function SeamFade({ edge, h = 140 }) {
  const dir = edge === 'top' ? 'to bottom' : 'to top';
  /* Seams blended opaque sections into each other. Every section now shares
     the same translucent veil over the wallpaper, so a fade here only paints a
     visible band; it renders nothing until a section needs it again. */
  void dir; void h;
  return null;
}

const Check = ({ className }) => (
  React.createElement('svg', { className: className, width: "16", height: "16", viewBox: "0 0 24 24"   , fill: "none",
       stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", 'aria-hidden': "true",}
    , React.createElement('path', { d: "M20 6 9 17l-5-5"   ,})
  )
);


/* ═══════════ DUBAI — who, what every ad needs, and the India corridor ═══════════
 * The one section the India page does not have. Three blocks, each answering a
 * question a Dubai broker asks before anything else: is this for me, do you know
 * the permit rules, and why a Bengaluru team. */
const DUBAI_ICP = [
  { k: '01', t: 'Brokerages', s: 'Off-plan mandates · secondary stock',
    d: 'Launch-window volume for the projects you hold and a steady flow for secondary listings, scored against a written definition before it reaches your agents.' },
  { k: '02', t: 'Developers', s: 'Off-plan launches · sales centres',
    d: 'Research-led positioning and full-funnel campaigns feeding your sales centre and broker network with enquiries they can actually work.' },
  { k: '03', t: 'Agents & channel partners', s: 'Your licence · your brand',
    d: 'Campaigns run from your own licensed account under your permits. The leads are yours alone, never a shared pool resold to five other agents.' },
  { k: '04', t: 'Selling to Indian buyers', s: 'The largest foreign buyer group',
    d: 'India-side campaigns for Dubai inventory: city-level targeting, answers to the ownership and payment-plan questions Indian buyers ask, and follow-up timed to IST.' },
];
const PERMIT_STEPS = [
  { n: '01', t: 'Marketing contract', d: 'Your licensed brokerage holds a marketing contract with the owner or developer for the unit or project.' },
  { n: '02', t: 'Trakheesi permit', d: 'You apply to the Dubai Land Department. AED 1,000 per permit, AED 5,000 for a launch event, plus AED 20.' },
  { n: '03', t: 'Permit number + QR on the ad', d: 'We design the permit number and Madmoun QR into the creative from the brief, not stamped on after approval.' },
  { n: '04', t: 'Live on every channel', d: 'Meta, Google and landing pages go live under that permit. Bayut and dubizzle need it to publish a listing too.' },
];
const CORRIDOR = [
  { v: '~22%', k: 'Share of foreign Dubai purchases by Indian nationals in 2025, brokerage analysis of DLD data',
    src: 'https://www.benhams.ae/news/property-advice/whos-buying-in-dubai-2025-recap/' },
  { v: '90 min', k: 'India runs ahead of Dubai. Follow-up windows are planned for both time zones', src: null },
  { v: '43+', k: 'Projects we are running for Indian buyers right now', src: null },
];

const WHY_QD = [
  { t: 'Indian real-estate acquisition', d: 'Fourteen residential campaigns across ten developer brands, each with an evidence ledger.', h: '/work/', l: 'Case studies' },
  { t: 'Indian buyer understanding', d: 'Campaigns built around how Indian buyers decide: price bands, payment plans and trust signals.', h: '/guides/real-estate-leads-for-channel-partners.html', l: 'India guides' },
  { t: 'India-city segmentation', d: 'Targeting planned from where interest concentrates: Delhi, Haryana, Goa, Maharashtra, Karnataka.', h: '/data/india-dubai-buyer-acquisition-report.html#s1', l: 'State and city data' },
  { t: 'Dubai-specific research', d: 'Our own audits of 984 Dubai property ads in the UAE and 521 shown in India.', h: '/data/india-dubai-buyer-acquisition-report.html', l: 'The report' },
  { t: 'DLD-aware construction', d: 'Permit number and Madmoun QR designed into every creative from the brief.', h: '/dubai/trakheesi-permit-guide/', l: 'Trakheesi guide' },
  { t: 'Qualified-lead economics', d: 'Optimised against a written five-point qualified-lead definition, not form fills.', h: '#pricing', l: 'AED pricing' },
  { t: 'CRM and WhatsApp', d: 'Leads routed to your CRM and answered on WhatsApp within minutes, in IST and GST.', h: '/dubai/property-lead-generation-from-india/', l: 'The funnel' },
];

function DubaiSection() {
  const card = { background: 'var(--veil)', border: '1px solid rgba(var(--ink-rgb),0.18)' };
  const up = (i) => ({ initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05 }, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } });
  const kicker = { color: 'rgba(var(--ink-rgb),0.7)', letterSpacing: '0.16em', fontSize: 'var(--fs-micro)' };
  const body = { color: 'rgba(var(--ink-rgb),0.9)', fontSize: 'var(--fs-text)', lineHeight: 1.5 };
  const h3 = { color: 'var(--ink)', fontSize: 'clamp(1.6rem, 3.6vw, 2.9rem)', lineHeight: 0.95 };
  return (
    React.createElement('section', { id: "dubai", className: "relative px-4 sm:px-7 md:px-10 pb-20 sm:pb-24 md:pb-28"      ,
             style: { background: 'var(--veil)', paddingTop: 'calc(var(--chrome-clear) + clamp(0.5rem, 2vh, 1.5rem))' },}
      , React.createElement(SeamFade, { edge: "top",} )
      , React.createElement(SeamFade, { edge: "bottom",} )
      , React.createElement('div', { className: "relative z-10 mx-auto"  , style: { maxWidth: 'var(--content-max)' },}

        , React.createElement(motion.div, { ...up(0), className: "text-center",}
          , React.createElement('h2', { className: "font-black uppercase" ,
              style: { color: 'var(--ink)', fontSize: 'clamp(2.3rem, 8.5vw, 118px)', lineHeight: 0.9 },}, "Built for Dubai"  )
          , React.createElement('p', { className: "font-light max-w-2xl mx-auto mt-3"   ,
             style: { color: 'rgba(var(--ink-rgb),0.92)', fontSize: 'var(--fs-text-lg)' },}, "Who we work with, what every Dubai property ad needs before it runs, and why a team that already markets to Indian buyers every week."


          )
        )

        , React.createElement('div', { className: "grid gap-4 sm:gap-5 mt-11 sm:mt-14"    ,
             style: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' },}
          , DUBAI_ICP.map((c, i) => (
            React.createElement(motion.article, { key: c.k, ...up(i), className: "rounded-[26px] flex flex-col"  ,
                            style: { ...card, padding: 'clamp(1.3rem, 1.8vw, 1.8rem)' },}
              , React.createElement('div', { className: "flex items-baseline justify-between gap-3"   ,}
                , React.createElement('span', { className: "font-black tabular-nums" ,
                      style: { color: 'rgba(var(--ink-rgb),0.55)', fontSize: 'clamp(1.3rem,1.8vw,1.8rem)', lineHeight: 1 },}, c.k)
                , React.createElement('span', { className: "font-body uppercase text-right"  , style: kicker,}, c.s)
              )
              , React.createElement('h3', { className: "font-semibold uppercase mt-3"  ,
                  style: { color: 'var(--ink)', fontSize: 'clamp(1.2rem,1.7vw,1.55rem)', lineHeight: 1.05 },}, c.t)
              , React.createElement('p', { className: "font-body mt-3" , style: body,}, c.d)
            )
          ))
        )

        , React.createElement(motion.div, { ...up(0), className: "rounded-[30px] mt-6 sm:mt-8"  ,
                    style: { ...card, background: 'rgba(var(--fill-rgb),0.06)', padding: 'clamp(1.4rem, 3vw, 2.6rem)' },}
          , React.createElement('div', { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-3"     ,}
            , React.createElement('div', null
              , React.createElement('p', { className: "font-body uppercase" , style: kicker,}, "Compliance, before creative"  )
              , React.createElement('h3', { className: "font-black uppercase mt-2"  , style: h3,}, "Every ad carries its Trakheesi permit"     )
            )
            , React.createElement('a', { href: "/dubai/trakheesi-permit-guide/", className: "font-body font-medium inline-flex items-center gap-2 shrink-0"     ,
               style: { color: 'var(--accent)', textDecoration: 'none', fontSize: 'var(--fs-caption)' },}, "Read the Trakheesi guide for marketers "
                    , React.createElement(ArrowUpRight, { className: "h-4 w-4" ,} )
            )
          )
          , React.createElement('ol', { className: "grid gap-4 mt-7"  , style: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))' },}
            , PERMIT_STEPS.map((p) => (
              React.createElement('li', { key: p.n, className: "pt-4", style: { borderTop: '2px solid rgba(var(--ink-rgb),0.35)' },}
                , React.createElement('p', { className: "font-black tabular-nums" , style: { color: 'var(--accent)', fontSize: 'var(--fs-caption)' },}, p.n)
                , React.createElement('p', { className: "font-semibold uppercase mt-1"  , style: { color: 'var(--ink)', fontSize: 'var(--fs-text)', letterSpacing: '0.02em' },}, p.t)
                , React.createElement('p', { className: "font-body mt-2" , style: { ...body, color: 'rgba(var(--ink-rgb),0.8)' },}, p.d)
              )
            ))
          )
          , React.createElement('p', { className: "font-body mt-6" , style: { color: 'rgba(var(--ink-rgb),0.66)', fontSize: 'var(--fs-micro)', lineHeight: 1.5 },}, "Sources: "
             , React.createElement('a', { href: "https://dubailand.gov.ae/en/eservices/real-estate-ad-permit/", rel: "noopener", style: { color: 'inherit' },}, "Dubai Land Department, Real Estate Ad Permit"      ), " ·" , ' '
            , React.createElement('a', { href: "https://dubailand.gov.ae/en/news-media/dubai-land-department-strengthens-transparency-with-ai-enabled-real-estate-advertising-governance", rel: "noopener", style: { color: 'inherit' },}, "DLD advertising governance update, April 2025"     ), ". QDnCo is not a licensed broker; permits are issued to your brokerage or developer."

          )
        )

        , React.createElement(motion.div, { ...up(0), className: "rounded-[30px] mt-6 sm:mt-8"  , style: { ...card, padding: 'clamp(1.4rem, 3vw, 2.6rem)' },}
          , React.createElement('p', { className: "font-body uppercase" , style: kicker,}, "The India–Dubai corridor"  )
          , React.createElement('h3', { className: "font-black uppercase mt-2"  , style: h3,}, "Your biggest overseas buyer is our home market"       )
          , React.createElement('div', { className: "grid gap-6 mt-7"  , style: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' },}
            , CORRIDOR.map((c) => (
              React.createElement('div', { key: c.v,}
                , React.createElement('p', { className: "font-heading italic" , style: { color: 'var(--ink)', fontSize: 'clamp(2.4rem, 4.6vw, 4rem)', lineHeight: 1 },}, c.v)
                , React.createElement('p', { className: "font-body mt-2" , style: { ...body, color: 'rgba(var(--ink-rgb),0.8)' },}
                  , c.k, c.src && React.createElement(React.Fragment, null, " · "  , React.createElement('a', { href: c.src, rel: "noopener", style: { color: 'var(--accent)' },}, "source"))
                )
              )
            ))
          )
          , React.createElement('div', { className: "flex flex-wrap gap-3 mt-8"   ,}
            , React.createElement('a', { href: "/dubai/indian-real-estate-performance-marketing-agency/", className: "intro-btn intro-btn-solid" ,}, "Indian buyers for Dubai property"    )
            , React.createElement('a', { href: "/data/india-dubai-buyer-acquisition-report.html", className: "intro-btn intro-btn-ghost" ,}, "India → Dubai buyer report"    )
          )
        )

        , React.createElement(motion.div, { ...up(0), className: "rounded-[30px] mt-6 sm:mt-8"  , style: { ...card, background: 'rgba(var(--fill-rgb),0.06)', padding: 'clamp(1.4rem, 3vw, 2.6rem)' },}
          , React.createElement('p', { className: "font-body uppercase" , style: kicker,}, "Why QD for Indian buyers"    )
          , React.createElement('h3', { className: "font-black uppercase mt-2"  , style: h3,}, "Why developers and brokerages use QD for India-side acquisition"        )
          , React.createElement('ol', { className: "grid gap-5 mt-7"  , style: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))' },}
            , WHY_QD.map((w, i) => (
              React.createElement('li', { key: w.t, className: "pt-4", style: { borderTop: '2px solid rgba(var(--ink-rgb),0.35)' },}
                , React.createElement('p', { className: "font-black tabular-nums" , style: { color: 'var(--accent)', fontSize: 'var(--fs-caption)' },}, String(i + 1).padStart(2, '0'))
                , React.createElement('p', { className: "font-semibold uppercase mt-1"  , style: { color: 'var(--ink)', fontSize: 'var(--fs-text)', letterSpacing: '0.02em' },}, w.t)
                , React.createElement('p', { className: "font-body mt-2" , style: { ...body, color: 'rgba(var(--ink-rgb),0.8)' },}, w.d, ' '
                  , React.createElement('a', { href: w.h, style: { color: 'var(--accent)', whiteSpace: 'nowrap' },}, w.l, " →" ))
              )
            ))
          )
          , React.createElement('p', { className: "font-body mt-7" , style: { ...body, color: 'rgba(var(--ink-rgb),0.78)' },}, "Our delivered real-estate acquisition work is in India; our Dubai practice is built for the India→Dubai buyer corridor and grounded in original Dubai market research. We have not yet run a Dubai campaign."

                         , ' '
            , React.createElement('a', { href: "/about/editorial-policy.html", style: { color: 'var(--accent)' },}, "How we label every number →"     )
          )
        )
      )
    )
  );
}

/* ═══════════ PRICING — marketing cost calculator (DESIGN.md 6.17) ═══════════
 *
 * The calculator is plain JS (/js/estimate/), shared with the secondary pages
 * and blog embeds. React renders an empty host and hands it over: the effect
 * mounts it now if the widget is loaded, or when "qd-estimate-ready" fires.
 * Rates live in /js/estimate/catalog.js, never here.
 */
function PricingCalculator({ market }) {
  const host = React.useRef(null);
  React.useEffect(() => {
    const mount = () => {
      if (window.QDEstimateWidget && host.current && host.current.parentNode) window.QDEstimateWidget.mountAll(host.current.parentNode);
    };
    mount();
    window.addEventListener('qd-estimate-ready', mount);
    return () => window.removeEventListener('qd-estimate-ready', mount);
  }, []);
  return React.createElement('div', { ref: host, id: "calculator", className: "mt-11 sm:mt-14",
    'data-qd-estimate': "", 'data-market': market, 'data-source': market === 'dubai' ? 'dubai:pricing' : 'home:pricing' });
}

function PricingSection() {
  return (
    React.createElement('section', { id: "pricing", className: "relative px-4 sm:px-7 md:px-10 pb-20 sm:pb-24 md:pb-28"      ,
             style: { background: 'var(--veil)',
                      paddingTop: 'calc(var(--chrome-clear) + clamp(0.5rem, 2vh, 1.5rem))' },}

      , React.createElement(SeamFade, { edge: "top",} )
      , React.createElement(SeamFade, { edge: "bottom",} )

      , React.createElement('div', { className: "relative z-10 mx-auto"  , style: { maxWidth: 'var(--content-max)' },}
        , React.createElement(motion.div, { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.4 },
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    className: "text-center",}
          , React.createElement('h2', { className: "font-black uppercase" ,
              style: { color: 'var(--ink)', fontSize: 'clamp(2.3rem, 8.5vw, 118px)', lineHeight: 0.9 },}, "Pricing")
          , React.createElement('p', { className: "font-light max-w-2xl mx-auto mt-3"   ,
             style: { color: 'rgba(var(--ink-rgb),0.92)', fontSize: 'var(--fs-text-lg)' },}, "Your fee depends on who you are and how many projects you run. Share your name and number and the calculator opens with your monthly price in AED."


          )
        )

        , React.createElement(PricingCalculator, { market: "dubai",} )

        , React.createElement('p', { className: "font-body text-center mx-auto mt-8 max-w-2xl"    ,
           style: { color: 'rgba(var(--ink-rgb),0.74)', fontSize: 'var(--fs-text)', lineHeight: 1.55 },}, "Media spend is billed to you directly by Meta and Google, never through us. Every Dubai ad is checked for a valid DLD advertising permit before it goes live."


        )
      )
    )
  );
}

/* ═══════════ LEAD CAPTURE ═══════════
 *
 * One translucent dialog, opened from a persistent floating call and from every
 * CTA on the page. Five fields, because the research is explicit that this
 * market's objection is trust rather than interest — a long form reads as a
 * qualification gauntlet and costs more leads than the extra data is worth.
 *
 * The one field that earns its place beyond contact details is the budget band:
 * the stated budget helps scope a feasible test. It is not a universal
 * platform minimum or a guarantee that the campaign will work.
 *
 * Submission posts to a Google Apps Script Web App, which appends to a Sheet
 * and emails on every row in the same call. Deliberately not writing to Sheets
 * directly from the browser: that would need an API key in the front end, and
 * a Sheet alone has no notification and no delivery guarantee.
 *
 * If LEAD_ENDPOINT is ever emptied the form still validates and still tells the
 * user what happened — it falls back to a mailto hand-off rather than silently
 * dropping the lead, which is the failure mode that matters most here.
 */
const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzfTd1BieV-6g4OFB99RTufHTYxhFdS9J0w3qHik2IxxPDlJ2ss8Xkugcs10VINJBKb/exec';

const BUDGET_BANDS = [
  'Under AED 10k / month',
  'AED 10k – 25k / month',
  'AED 25k – 60k / month',
  'AED 60k+ / month',
  'Not decided yet',
];

const LeadCtx = React.createContext({ open: () => {} });
const useLead = () => React.useContext(LeadCtx);

/**
 * The form itself, wrapper-agnostic.
 *
 * Extracted so the dialog and the copy embedded in the closing section are the
 * same component rather than two that drift. The only difference between them
 * is the chrome around it and whether there is a close button.
 */
function LeadFormCore({ onClose, embedded = false, firstRef }) {
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  const localFirst = useRef(null);
  const first = firstRef || localFirst;
  const pending = useRef(null);
  const inFlight = useRef(false);

  const submit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(e.currentTarget);
    const lead = Object.fromEntries(form.entries());
    const digits = String(lead.phone || '').replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15 || !/^[+0-9\s().-]+$/.test(String(lead.phone || ''))) {
      setErr('Please enter a valid phone number, including your country code.');
      setState('error');
      return;
    }
    Object.assign(lead, QDLeadCapture.context(window.location.href, document.referrer));
    const signature = JSON.stringify(lead);
    if (!pending.current || pending.current.signature !== signature) {
      pending.current = { signature, id: QDLeadCapture.requestId() };
    }
    lead.request_id = pending.current.id;
    lead.submitted = new Date().toISOString();

    if (!LEAD_ENDPOINT) {
      const body = Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:qdnco01@gmail.com?subject=${encodeURIComponent('Dubai website enquiry — ' + (lead.project || lead.name))}&body=${encodeURIComponent(body)}`;
      setState('email');
      return;
    }

    inFlight.current = true;
    setErr('');
    setState('sending');
    try {
      await QDLeadCapture.send(LEAD_ENDPOINT, lead);
      setState('done');
      if (window.gtag) window.gtag('event', 'generate_lead', { form_name: 'phase0', site_region: location.pathname.indexOf('/dubai/') === 0 ? 'dubai' : 'india' });
    } catch (error) {
      setErr('We could not confirm receipt. Your details are still here; you can retry or email us.');
      setState('error');
    } finally {
      inFlight.current = false;
    }
  };

  return (
    React.createElement(React.Fragment, null
        , state === 'done' || state === 'email' ? (
          React.createElement('div', { className: "lead-done",}
            , React.createElement('p', { className: "lead-eyebrow",}, state === 'done' ? 'Received' : 'Email ready')
            , React.createElement('h3', { id: "lead-title", className: "lead-title",}, state === 'done' ? 'Your enquiry has been recorded.' : 'Finish sending in your email app.')
            , React.createElement('p', { className: "lead-sub",}
              , state === 'email' ? 'Opening your email app does not send the message. Review it and press Send. For urgent enquiries,' : 'We will review the project details and contact you. For urgent enquiries,', "WhatsApp "
               , React.createElement('a', { href: "https://wa.me/918861179992", target: "_blank", rel: "noreferrer noopener" ,}, "+91 88611 79992"  ), "."
            )
            , React.createElement('button', { type: "button", className: "lead-submit", onClick: onClose || (() => { pending.current = null; setState('idle'); }),}, embedded ? 'Send another' : 'Close')
          )
        ) : (
          React.createElement('form', { onSubmit: submit, noValidate: false,}
            , React.createElement('p', { className: "lead-eyebrow",}, "Phase 0" )
            , React.createElement('h3', { id: "lead-title", className: "lead-title",}, "Tell us about the project."    )
            , React.createElement('p', { className: "lead-sub",}, "Tell us about the project so we can assess the right next step."

            )

            , React.createElement('label', { className: "lead-field",}
              , React.createElement('span', null, "Your name" )
              , React.createElement('input', { ref: first, name: "name", required: true, maxLength: 120, autoComplete: "name", placeholder: "Your full name"  ,} )
            )

            , React.createElement('label', { className: "lead-field",}
              , React.createElement('span', null, "Phone / WhatsApp"  )
              , React.createElement('input', { name: "phone", required: true, type: "tel", minLength: 8, maxLength: 30, inputMode: "tel", autoComplete: "tel",
                     placeholder: "+971 50 123 4567"   ,} )
            )

            , React.createElement('label', { className: "lead-field",}
              , React.createElement('span', null, "Project")
              , React.createElement('input', { name: "project", required: true, maxLength: 200, placeholder: "Name of the project or company"     ,} )
            )

            , React.createElement('label', { className: "lead-field",}
              , React.createElement('span', null, "Community / area"  )
              , React.createElement('input', { name: "catchment", required: true, maxLength: 200, placeholder: "Dubai Marina, JVC, Business Bay…"    ,} )
            )

            , React.createElement('label', { className: "lead-field",}
              , React.createElement('span', null, "Monthly ad budget"  )
              , React.createElement('select', { name: "budget", required: true, defaultValue: "",}
                , React.createElement('option', { value: "", disabled: true,}, "Select a band"  )
                , BUDGET_BANDS.map((b) => React.createElement('option', { key: b, value: b,}, b))
              )
            )

            , state === 'error' && React.createElement('p', { className: "lead-error", role: "alert",}, err, " " , React.createElement('a', { href: "mailto:qdnco01@gmail.com",}, "Email qdnco01@gmail.com" ), ".")

            , React.createElement('button', { type: "submit", className: "lead-submit", disabled: state === 'sending',}
              , state === 'sending' ? 'Sending…' : 'Book a Phase 0 call'
              , state !== 'sending' && React.createElement(ArrowUpRight, { className: "h-4 w-4" ,} )
            )
            , React.createElement('p', { className: "lead-fine",}, "Your details are used to respond to this enquiry. Campaign tags and the referring site, when available, help us understand where it came from. No newsletter signup."

            )
          )
        )
    )
  );
}

function LeadDialog({ open, onClose }) {
  const firstRef = useRef(null);

  /* Escape closes, focus lands in the form, and the page behind stops
     scrolling — the three things a dialog has to get right. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => _optionalChain([firstRef, 'access', _4 => _4.current, 'optionalAccess', _5 => _5.focus, 'call', _6 => _6()]), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  /* Rendered unconditionally by the provider, so the closed state has to be
     handled here. Without this the scrim sits over the page permanently. */
  if (!open) return null;

  return (
    React.createElement('div', { className: "lead-scrim", role: "dialog", 'aria-modal': "true", 'aria-labelledby': "lead-title",
         onMouseDown: (e) => { if (e.target === e.currentTarget) onClose(); },}
      , React.createElement('div', { className: "lead-panel liquid-glass-strong" ,}
        , React.createElement('button', { type: "button", className: "lead-close", onClick: onClose, 'aria-label': "Close",}, "×")
        , React.createElement(LeadFormCore, { onClose: onClose, firstRef: firstRef,} )
      )
    )
  );
}

/**
 * The same form, in the page rather than over it.
 *
 * A reader who has scrolled the whole site and reached the closing section has
 * already decided; making them open a dialog first adds a step at exactly the
 * wrong moment. Identical component, so there is no second form to keep in sync.
 */
function EmbeddedLeadForm() {
  return (
    React.createElement('div', { className: "lead-embed",}
      , React.createElement(LeadFormCore, { embedded: true,} )
    )
  );
}


/* Persistent call, pinned bottom-right. Appears once the hero is behind you —
   showing it over the hero would compete with the hero's own call.
 *
 * Over the roadmap it shrinks to a disc and moves to the top of the screen. The
 * roadmap pins itself and builds a figure while the phase copy sits in the lower
 * half, so a full-width pill parked at the bottom right covered the text of
 * whichever phase you were reading — and unlike a normal section you cannot
 * scroll past it to escape, because the section is holding still. The disc keeps
 * the call available without occupying the one band the reader needs. */
function LeadFloatingCta() {
  const { open } = useLead();
  const [show, setShow] = useState(false);
  const [mini, setMini] = useState(false);

  useEffect(() => {
    const read = () => setShow(window.scrollY > window.innerHeight * 0.9);
    read();
    window.addEventListener('scroll', read, { passive: true });
    return () => window.removeEventListener('scroll', read);
  }, []);

  useEffect(() => {
    const roadmap = document.getElementById('roadmap');
    if (!roadmap || !('IntersectionObserver' in window)) return;
    /* The track is several viewports tall, so "mostly on screen" cannot be a
       ratio of the section — it is never close to 1. Comparing the visible slice
       against the viewport instead is true for the whole pinned stretch and
       false the moment the next section takes over. */
    const io = new IntersectionObserver(([e]) => {
      const r = e.intersectionRect;
      setMini(r.height > window.innerHeight * 0.6);
    }, { threshold: [0, 0.05, 0.2, 0.5, 0.8, 1], rootMargin: '0px' });
    io.observe(roadmap);
    return () => io.disconnect();
  }, []);

  return (
    React.createElement('button', { type: "button", onClick: open,
            className: `lead-fab${show ? ' is-in' : ''}${mini ? ' is-mini' : ''}`,
            'aria-hidden': !show, tabIndex: show ? 0 : -1,
            'aria-label': "Book a Phase 0 call"    ,}
      , React.createElement('span', { className: "lead-fab-dot",} )
      , React.createElement('span', { className: "lead-fab-label",}, "Book a Phase 0 call"    )
      , React.createElement('span', { className: "lead-fab-short", 'aria-hidden': "true",}, "P0")
      , React.createElement(ArrowUpRight, { className: "lead-fab-arrow h-4 w-4"  ,} )
    )
  );
}

/* Wraps the app so any CTA can open the dialog without prop drilling. */
function LeadProvider({ children }) {
  const [open, setOpen] = useState(false);
  const api = React.useMemo(() => ({ open: () => setOpen(true) }), []);

  /* Every in-page link that pointed at #contact becomes a form opener, so the
     CTAs already scattered through the page all funnel here without each one
     having to be rewritten. */
  useEffect(() => {
    const onClick = (e) => {
      const a = _optionalChain([e, 'access', _7 => _7.target, 'access', _8 => _8.closest, 'optionalCall', _9 => _9('a[href="#contact"]')]);
      if (!a) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    React.createElement(LeadCtx.Provider, { value: api,}
      , children
      , React.createElement(LeadFloatingCta, null )
      , React.createElement(LeadDialog, { open: open, onClose: () => setOpen(false),} )
    )
  );
}

/* ═══════════ SITE WALLPAPER ═══════════
 *
 * One fixed video behind the entire document, in place of the flat page colour.
 * Fixed rather than repeated per section: a single decode serves every screen,
 * the motion is continuous as you scroll instead of restarting at each boundary,
 * and there is exactly one place to tune the wash.
 *
 * It replaces the services section's own copy of this same stream — that was a
 * second decode of an identical asset, and once the wallpaper is global the
 * section only has to thin its veil to reveal it.
 *
 * Sections sit on top at partial alpha (--veil), so the violet reads through
 * everywhere without any of them losing the contrast their type needs.
 */
function SiteWallpaper() {
  const { theme } = useTheme();
  const light = theme === 'light';
  return (
    React.createElement('div', { 'aria-hidden': "true", className: "fixed inset-0 z-0 pointer-events-none"   , style: { background: 'var(--page)' },}
      , React.createElement(HlsVideo, { src: SERVICES_VIDEO,
                className: "absolute inset-0 w-full h-full object-cover"    ,
                style: { pointerEvents: 'none',
                         /* The clip is a bright ribbon on a dark ground. Inverting it for the light
                            theme (and turning the hue back) keeps the ribbon's colour but gives
                            it a white ground, so the light page can show it without going grey. */
                         filter: light ? 'invert(1) hue-rotate(180deg) saturate(1.4) brightness(1.04)'
                                       : 'saturate(1.45) contrast(1.12)' },} )
      /* A base wash so no section has to carry the whole contrast burden alone. */
      , React.createElement('div', { className: "absolute inset-0" ,
           style: { background: light ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.22)' },} )
    )
  );
}

function App() {
  /* Prefer the boot-script theme (light by default; saved toggle if present)
     so the first client paint matches the loader and does not clobber a
     returning visitor's intentional dark choice. */
  const [theme, setTheme] = useState(() => {
    try {
      const t = document.documentElement.getAttribute('data-theme');
      if (t === 'light' || t === 'dark') return t;
    } catch (e2) {}
    return 'light';
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('qd-theme');
      if (saved === 'light' || saved === 'dark') setTheme(saved);
      else setTheme('light');
    } catch (e3) {
      setTheme('light');
    }
  }, []);
  useEffect(() => {
    try { localStorage.setItem('qd-theme', theme); } catch (e4) {}
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /* Dismiss the theme-matched boot loader once the app shell is up. */
  useEffect(() => {
    const el = document.getElementById('boot-loader');
    if (!el) return;
    let done = false;
    const hide = () => {
      if (done) return;
      done = true;
      el.classList.add('is-done');
      setTimeout(() => { try { el.remove(); } catch (e5) {} }, 650);
    };
    const tMin = setTimeout(hide, 720);
    const tMax = setTimeout(hide, 2600);
    const fonts = document.fonts && document.fonts.ready
      ? document.fonts.ready.then(() => setTimeout(hide, 280))
      : null;
    window.addEventListener('load', () => setTimeout(hide, 200), { once: true });
    return () => { clearTimeout(tMin); clearTimeout(tMax); };
  }, []);

  return (
    React.createElement(ThemeCtx.Provider, { value: { theme, setTheme },}
    , React.createElement(LeadProvider, null
    , React.createElement(SiteWallpaper, null )
    /* Above every section rather than inside the hero. See the note in the
        hero: a z-10 section wrapper is a stacking context, and the bar cannot
        out-paint a later sibling from inside one. */
    , React.createElement(Navbar, null )
    , React.createElement('div', { className: "relative z-10" , style: { overflowX: 'clip', background: 'transparent' },}
      , React.createElement(Hero, null )
      /* Same order as the India page: the founder film directly under the
          hero, then the numbers. The team lives on /about/#team, which the
          film's "Meet the founders" button opens. */
      , React.createElement(FounderFilm, null )
      , React.createElement(Intro, null )
      , React.createElement(ProofSection, null )
      , React.createElement(HeroBridge, null )
      , React.createElement(PlatformBand, null )  /* replaces the text marquee (DESIGN.md 6.6) */
      , React.createElement(DubaiSection, null )
      , React.createElement(ServicesV4, null )
      , React.createElement(AdReelSection, null )
      , React.createElement(ProjectsSection, null )
      , React.createElement(PricingSection, null )
      , React.createElement(RoadmapEvolution, null )
      , React.createElement(MarketsMap, null )
      , React.createElement(ResourcesTeaser, null )
      , React.createElement(FAQSection, null )
      , React.createElement(CtaBand, null )
      , React.createElement(CtaFooter, null )
      , React.createElement(ScrollOrb, null )
      , React.createElement(MobileNav, null )
    )
    )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null ));
