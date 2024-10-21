chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download") {
    const videoUrl = message.url;
    const command = `pyutube "${videoUrl}" "C:\\pyutube"`; // استبدال [PATH] بمسار حقيقي

    if (navigator.userAgent.indexOf("Windows") !== -1) {
      // للأمر في ويندوز
      require("child_process").exec(`start cmd /k ${command}`);
    } else {
      // للأمر في لينكس/ماك
      require("child_process").exec(`gnome-terminal -- ${command}`);
    }
  }
});
