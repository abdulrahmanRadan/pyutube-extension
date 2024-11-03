const express = require("express");
const cors = require("cors");
const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const app = express();

app.use(cors());
app.use(express.json());

const terminalPath = path.join(os.homedir(), "Downloads/", "video");

// تحقق من وجود المجلد، وإن لم يكن موجودًا فقم بإنشائه
if (!fs.existsSync(terminalPath)) {
  fs.mkdirSync(terminalPath, { recursive: true });
  console.log(`Directory created at: ${terminalPath}`);
}

app.post("/download", (req, res) => {
  const videoUrl = req.body.url;
  console.log(`Using terminal path: ${terminalPath}`);
  console.log(`Video URL: ${videoUrl}`);

  const command = `pyutube ${videoUrl} ${terminalPath}`;
  let cmdCommand;

  if (process.platform === "win32") {
    // أمر لنظام Windows
    cmdCommand = `start cmd.exe /K "cd /d ${terminalPath} && ${command}"`;
  } else if (process.platform === "darwin") {
    // الاحتمال الأول: استخدام osascript لفتح Terminal
    cmdCommand = `osascript -e 'tell application "Terminal" to do script "cd ${terminalPath} && ${command}"'`;

    exec(cmdCommand, (error, stdout, stderr) => {
      if (error) {
        console.warn(`osascript failed: ${error.message}`);
        // الاحتمال الثاني: استخدام iTerm إذا فشل Terminal
        const itermCommand = `open -a iTerm.app "${terminalPath}" && osascript -e 'tell application "iTerm" to do script "cd ${terminalPath} && ${command}"'`;

        exec(itermCommand, (itermError, itermStdout, itermStderr) => {
          if (itermError) {
            console.warn(`iTerm failed: ${itermError.message}`);
            // الاحتمال الثالث: استخدام spawn كحل احتياطي
            const term = spawn("osascript", [
              "-e",
              `tell application "Terminal" to do script "cd ${terminalPath} && ${command}"`,
            ]);

            term.on("error", (spawnError) => {
              console.error(`Spawn error: ${spawnError.message}`);
              return res.status(500).send("All command attempts failed");
            });

            term.on("exit", (code) => {
              if (code === 0) {
                res.send("Command executed successfully via spawn");
              } else {
                res.status(500).send("Spawn command failed");
              }
            });
          } else {
            console.log("Command executed successfully via iTerm");
            res.send("Command executed successfully via iTerm");
          }
        });
      } else {
        console.log("Command executed successfully via Terminal");
        res.send("Command executed successfully via Terminal");
      }
    });
  } else {
    // محاولات لأنظمة لينكس المختلفة
    cmdCommand = `gnome-terminal --working-directory=${terminalPath} -e "bash -c '${command}; exec bash'" || \
                  xfce4-terminal --working-directory=${terminalPath} -e "bash -c '${command}; exec bash'" || \
                  konsole --workdir ${terminalPath} -e "bash -c '${command}; exec bash'" || \
                  xterm -e "cd ${terminalPath} && ${command}"`;

    exec(cmdCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Linux terminal error: ${error.message}`);
        return res.status(500).send("Failed to execute command on Linux");
      }
      console.log(stdout);
      res.send("Command executed successfully on Linux");
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
