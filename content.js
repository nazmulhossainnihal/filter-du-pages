const FILTER_KEYWORDS = [
  'DU',
  'Dhaka University',
  'ঢাবি',
  'ঢাকা বিশ্ববিদ্যালয়',
  'University of Dhaka'
];

function normalizeText(text) {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFC');
}

function containsFilterKeyword(text) {
  if (!text) return false;

  const normalizedText = normalizeText(text);
  const lowerText = normalizedText.toLowerCase();

  return FILTER_KEYWORDS.some(keyword => {
    const normalizedKeyword = normalizeText(keyword);
    const lowerKeyword = normalizedKeyword.toLowerCase();

    if (lowerText.includes(lowerKeyword)) {
      return true;
    }

    if (normalizedText.includes(normalizedKeyword)) {
      return true;
    }

    return false;
  });
}

function extractAllText(element) {
  const texts = [];

  if (element.textContent) {
    texts.push(element.textContent);
  }

  if (element.getAttribute('aria-label')) {
    texts.push(element.getAttribute('aria-label'));
  }

  if (element.getAttribute('title')) {
    texts.push(element.getAttribute('title'));
  }

  return texts.join(' ');
}

function processPost(post) {
  if (post.dataset.filtered === 'true') return;

  post.dataset.filtered = 'true';

  const pageNameSelectors = [
    'a[role="link"] span',
    'a[role="link"]',
    'a.x1i10hfl span',
    'a.x1i10hfl',
    'h4 span',
    'h4',
    'strong span',
    'strong',
    'a span strong',
    'span[dir="auto"]',
    'h2 span',
    'h3 span'
  ];

  const possiblePageNames = [];

  for (const selector of pageNameSelectors) {
    const elements = post.querySelectorAll(selector);
    for (const element of elements) {
      const text = extractAllText(element);
      if (text && text.trim().length > 1) {
        possiblePageNames.push(text);
      }
    }
  }

  const links = post.querySelectorAll('a');
  for (const link of links) {
    const label = link.getAttribute('aria-label');
    if (label && label.trim().length > 1) {
      possiblePageNames.push(label);
    }

    const linkText = link.textContent;
    if (linkText && linkText.trim().length > 1) {
      possiblePageNames.push(linkText);
    }
  }

  for (const pageName of possiblePageNames) {
    if (containsFilterKeyword(pageName)) {
      console.log('Filtering post from:', pageName);
      post.style.display = 'none';
      return;
    }
  }
}

function processPosts() {
  const postSelectors = [
    'div[data-pagelet^="FeedUnit"]',
    'div[data-ad-preview="message"]',
    'div.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z',
    'div[role="article"]',
    'div[data-pagelet*="FeedUnit"]',
    'div[class*="story"]'
  ];

  postSelectors.forEach(selector => {
    const posts = document.querySelectorAll(selector);
    posts.forEach(post => processPost(post));
  });
}

processPosts();

const observer = new MutationObserver(() => {
  processPosts();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

setInterval(processPosts, 2000);

console.log('Facebook Page Filter extension loaded');
console.log('Filtering keywords:', FILTER_KEYWORDS);
