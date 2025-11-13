chrome.tabs.query({}, (tabs) => {
  const tabList = document.getElementById("tab-list");

  tabs.forEach((tab) => {
    const listItem = document.createElement("li");
    listItem.textContent = tab.url;
    listItem.style.marginBottom = "8px";
    listItem.style.fontSize = "12px";
    listItem.style.wordBreak = "break-all";
    tabList.appendChild(listItem);
  });
});
