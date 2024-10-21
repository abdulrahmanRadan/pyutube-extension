document.addEventListener("copy", function (e) {
  // انتبه هنا، يجب التأكد من أن النص موجود في الحافظة
  navigator.clipboard
    .readText()
    .then((text) => {
      if (!text) {
        text = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // رابط افتراضي للتجربة
      }
      console.log("Copied text:", text);
      if (text.includes("youtube.com/watch?v=") || text.includes("youtu.be/")) {
        showDownloadButton(text); // استخدم الرابط المنسوخ
      }
    })
    .catch((err) => {
      console.error("Failed to read clipboard contents: ", err);
    });
});

function showDownloadButton(videoUrl) {
  console.log("Showing download button for:", videoUrl);

  // التحقق من عدم وجود الزر بالفعل لتجنب إضافته عدة مرات
  const existingButton = document.getElementById("download-button");
  if (existingButton) {
    existingButton.remove(); // إزالة الزر الحالي
  }

  const button = document.createElement("button");
  button.id = "download-button";
  button.innerText = "Download Video";
  button.style.position = "fixed"; // موضع ثابت
  button.style.bottom = "70px"; // على بُعد 20 بكسل من أسفل الشاشة
  button.style.right = "20px"; // على بُعد 20 بكسل من يمين الشاشة
  button.style.zIndex = "1000"; // لضمان ظهوره في المقدمة
  button.style.padding = "10px";
  button.style.backgroundColor = "#FF0000";
  button.style.color = "#FFFFFF";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";

  button.onclick = function () {
    console.log("Button clicked, sending request to server...");
    const userDefinedPath = prompt(
      "Enter the path to save the video (leave empty for default):",
      "./video/"
    );
    fetch("http://localhost:3000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: videoUrl, path: userDefinedPath }), // تضمين المسار
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to download the video. Please try again."); // تنبيه للمستخدم
      });
  };

  document.body.appendChild(button);
  // إخفاء الزر بعد 5 ثوانٍ
  setTimeout(() => {
    hideButton(button);
  }, 5000);
}

function hideButton(button) {
  if (button) {
    button.style.display = "none"; // إخفاء الزر
  }
}
