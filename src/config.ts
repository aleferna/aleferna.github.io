// Edit this file to personalise the site.

export const SITE = {
  // Full name, shown in the header, page titles, and home page.
  name: 'Alexandre P. Fernandes',
  // Other forms of your name people might search for (used in search-engine metadata).
  alternateNames: ['Alexandre Porcher Fernandes', 'Alexandre Fernandes', 'A. P. Fernandes'],
  // Name as it appears in author lists; it is bolded in publications.
  authorName: 'A. P. Fernandes',
  role: 'PhD Student',
  affiliation: 'University of Cambridge',
  affiliationUrl: 'https://www.slcu.cam.ac.uk/Alexandre-P-Fernandes',
  location: 'Cambridge, UK',
  description:
    'Alexandre P. Fernandes (Alexandre Porcher Fernandes), theoretical biologist and PhD student at the Sainsbury Laboratory, University of Cambridge, studying the evolution of multicellularity.',
  email: 'alexandre.porcherfernandes@slcu.cam.ac.uk', // leave '' to hide
  // Photo shown next to your name on the home page; hidden until the file exists in /public.
  avatar: '/profile.jpg',
  // Path to your CV PDF inside /public. Replace public/CV.pdf to update it.
  cvPdf: '/CV.pdf',
  url: 'https://alex-fernandes.com',
};

// Leave a value as '' to hide that link.
export const SOCIAL = {
  github: 'https://github.com/aleferna',
  scholar: 'https://scholar.google.com/citations?user=ekRZB9YAAAAJ',
  orcid: 'https://orcid.org/0000-0002-6689-3505',
  bluesky: 'https://bsky.app/profile/alefern.bsky.social',
  substack: 'https://substack.com/@alexporcherfernandes',
  linkedin: '',
};

export const NAV = [
  { href: '/', label: 'About' },
  { href: '/publications/', label: 'Publications' },
  { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' },
  { href: '/cv/', label: 'CV' },
];
