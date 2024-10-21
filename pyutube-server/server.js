const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path"); // استيراد حزمة path

const app = express();
app.use(cors());
app.use(express.json());

const defaultPath = path.join("./", "video"); // مسار افتراضي

// تأكد من أن المجلد موجود، وإذا لم يكن موجودًا، قم بإنشائه
if (!fs.existsSync(defaultPath)) {
  fs.mkdirSync(defaultPath, { recursive: true });
  console.log(`Created directory at ${defaultPath}`);
}

app.post("/download", (req, res) => {
  const videoUrl = req.body.url;
  const userPath = req.body.path || defaultPath; // الحصول على المسار المدخل أو استخدام المسار الافتراضي

  console.log(`Received video URL: ${videoUrl}`); // إضافة تسجيل الرابط المستلم
  console.log(`Using path: ${userPath}`); // طباعة المسار المستخدم

  const command = `pyutube "${videoUrl}" "${userPath}"`;
  const cmdCommand = `start cmd /k "${command}"`;

  exec(cmdCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send("Failed to execute command");
    }
    res.send("Command opened in CMD");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
