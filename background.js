// List of blocked domains (search engines and AI tools)
const BLOCKED_DOMAINS = [
  'bing.com',
  'duckduckgo.com',
  'search.yahoo.com',
  'perplexity.ai',
  'you.com',
  'chatgpt.com',
  'chat.openai.com',
  'gemini.google.com',
  'claude.ai'
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;
  
  const url = new URL(changeInfo.url);
  
  if (isGoogleSearch(url)) {
    if (!url.searchParams.has("udm") || url.searchParams.get("udm") !== "14") {
      url.searchParams.set("udm", "14");
      chrome.tabs.update(tabId, { url: url.toString() });
    }
  }
  else if (isBlockedDomain(url)) {
    const blockedPageUrl = chrome.runtime.getURL('blocked.html') + '?url=' + encodeURIComponent(changeInfo.url);
    chrome.tabs.update(tabId, { 
      url: blockedPageUrl
    });
  }
});

function isGoogleSearch(url) {
  const isGoogle = url.hostname.includes("google.com");
  const isSearch = url.pathname.includes("/search");
  const hasQuery = url.searchParams.has("q");
  
  return isGoogle && isSearch && hasQuery;
}

function isBlockedDomain(url) {
  return BLOCKED_DOMAINS.some(domain => url.hostname.includes(domain));
}
