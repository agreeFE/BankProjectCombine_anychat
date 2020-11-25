const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");
const process = require("process");
const chalk = require("chalk");

function cleanAndroid() {
  let cleanCommand = process.cwd();
  let cleanCommandExecPath = process.cwd();

  if (process.platform === "win32") {
    cleanCommand += "\\android\\gradlew.bat";
    cleanCommandExecPath += "\\android";
  } else {
    cleanCommand += "/android/gradlew";
    cleanCommandExecPath += "/android";
  }

  const cleanWorker = childProcess.spawn(cleanCommand, ["clean"], {
    cwd: cleanCommandExecPath
  });

  cleanWorker.stdout.on("data", data => {
    console.log(`${data}`);
  });

  cleanWorker.on("exit", code => {
    if (code === 0) {
      console.log(chalk.green("清理成功"));
    }
  });

  cleanWorker.on("error", err => {
    console.log(chalk.red(`清理失败，错误信息: ${err}`));
  });
}

cleanAndroid();
