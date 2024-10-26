const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const app = express();

app.use(cors());
app.use(express.json());

const terminalPath = path.join(os.homedir(), "Documents");

app.post("/download", (req, res) => {
  const videoUrl = req.body.url;
  const userProvidedPath = req.body.path;

  // طباعة المسار الذي يأتي من background.js
  console.log(`Received path from background: ${userProvidedPath}`);
  console.log(`Using terminal path: ${terminalPath}`);

  const finalPath = userProvidedPath; // استخدام المسار المستلم من background.js كما هو
  console.log(`Final path for video: ${finalPath}`);
  console.log(`Video URL: ${videoUrl}`);

  if (!fs.existsSync(finalPath)) {
    fs.mkdirSync(finalPath, { recursive: true });
    console.log(`Created directory at ${finalPath}`);
  }

  const command = `pyutube "${videoUrl}" "${finalPath}"`;
  let cmdCommand;

  if (process.platform === "win32") {
    cmdCommand = `start cmd.exe /K "cd /d ${terminalPath} && ${command}"`;
  } else {
    cmdCommand = `gnome-terminal -- bash -c "cd ${terminalPath} && ${command}"`;
  }

  exec(cmdCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send("Failed to execute command");
    }
    console.log(stdout);
    res.send("Command executed successfully");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
