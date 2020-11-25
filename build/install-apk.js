/**
 * 安装Release包
 * @file install-apk.js
 * @author 孟庆云
 * */
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const childProcess = require("child_process");
const process = require("process");

const apkFilePath = path.resolve(
  __dirname,
  '../android/app/build/outputs/apk/release/app-release.apk'
);

/**
 * 判断APK文件是否存在
 * @author 孟庆云
 * */
const apkExists = () => {
  return fs.existsSync(apkFilePath);
};

/**
 * 安装APK文件
 * @author 孟庆云
 * */
const installApk = () => {
  if (apkExists()) {
    // 安装APK文件的命令
    const cmd = `adb install -r ${apkFilePath}`;

    const installWorker = childProcess.exec(
      cmd,
      {
        cwd: process.cwd()
      },
      (err, stdout, stderr) => {
        process.exit(0);
      }
    );

    installWorker.stdout.on("data", data => {
      console.log(`${data}`);
    });

    installWorker.on("exit", code => {
      if (code === 0) {
        console.log(chalk.green("APK文件已成功安装到手机。"));
      }
    });

    installWorker.on("error", err => {
      console.log(chalk.red(`安装失败，错误信息: ${err}`));
    });
  } else {
    console.log(chalk.red("APK文件不存在！"));
  }
};

installApk();
