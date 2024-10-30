const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const app = express();

app.use(cors());
app.use(express.json());

const terminalPath = path.join(os.homedir(), "Downloads/", "video");

app.post("/download", (req, res) => {
  const videoUrl = req.body.url;
  console.log(`Using terminal path: ${terminalPath}`);
  console.log(`Video URL: ${videoUrl}`);

  const command = `pyutube "${videoUrl}" "${terminalPath}"`;
  let cmdCommand;

  if (process.platform === "win32") {
    cmdCommand = `start cmd.exe /K "cd /d ${terminalPath} && ${command}"`;
  } else if (process.platform === "darwin") {
    cmdCommand = `osascript -e 'tell application "Terminal" to do script "cd ${terminalPath} && ${command}"'`;
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
