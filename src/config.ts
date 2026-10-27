// Edit this file to personalise the site. Everything marked TODO is placeholder text.

export const SITE = {
  // Full name, shown in the header, page titles, and home page.
  name: 'Alex Fernández', // TODO: your full name
  // Name as it appears in author lists; it is bolded in publications.
  authorName: 'A. Fernández', // TODO
  role: 'PhD Researcher', // TODO
  affiliation: 'Your University', // TODO
  affiliationUrl: 'https://example.edu', // TODO
  location: 'London, UK', // TODO
  description: 'Personal website: research, publications, projects, and notes.',
  email: 'you@example.edu', // TODO: shown on the home page; leave '' to hide
  // Path to a photo in /public (e.g. '/profile.jpg'); leave '' to hide.
  avatar: '',
  // Path to a PDF CV in /public (e.g. '/cv.pdf'); leave '' to hide the download link.
  cvPdf: '',
  url: 'https://aleferna.github.io',
};

// Leave a value as '' to hide that link.
export const SOCIAL = {
  github: 'https://github.com/aleferna',
  scholar: '', // e.g. https://scholar.google.com/citations?user=XXXX
  orcid: '', // e.g. https://orcid.org/0000-0000-0000-0000
  linkedin: '',
  bluesky: '',
};

export const NAV = [
  { href: '/', label: 'About' },
  { href: '/publications/', label: 'Publications' },
  { href: '/projects/', label: 'Projects' },
  { href: '/blog/', label: 'Blog' },
  { href: '/cv/', label: 'CV' },
];
