
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "LightPass",
    title: "convert password to hash",
    contexts: ["editable"],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab?.id && info.menuItemId === "LightPass") {
    chrome.tabs.sendMessage(tab.id, {kind: "convert"})
  }
})

chrome.commands.onCommand.addListener((command, tab) => {
  if(tab?.id && command === "hash-password"){
    chrome.tabs.sendMessage(tab.id, {kind: "convert"})
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.kind === "clear") {
    // setTimeout(async ()=>{
    //   let queryOptions = { active: true, lastFocusedWindow: true };
    //   let [tab] = await chrome.tabs.query(queryOptions);
    //   if(tab && tab.id){
    //     await chrome.tabs.sendMessage(tab.id, message)
    //   }
    // }, 30000)
  }
  return true;
})
