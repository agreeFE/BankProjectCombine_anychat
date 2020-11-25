/**
 * 替换build.gradle中compileSdkVersion、buildToolsVersion、minSdkVersion、targetSdkVersion，避免打release包时出现SDK版本不匹配的报错
 * @author 孟庆云
 */
const path = require("path");
const fs = require("fs");
const childProcess = require('child_process');
const process = require('process');
const chalk = require('chalk');
const prompt = require("co-prompt");
const co = require("co");

const theme = process.argv[2];

const projectBasePath = path.resolve(__dirname, "../node_modules");

let replaceContent = {
  compileSdkVersion: "compileSdkVersion rootProject.ext.compileSdkVersion",
  buildToolsVersion: "buildToolsVersion rootProject.ext.buildToolsVersion",
  minSdkVersion: "minSdkVersion rootProject.ext.minSdkVersion",
  targetSdkVersion: "targetSdkVersion rootProject.ext.targetSdkVersion"
};

/**
 * 递归查找需要替换的build.gradle文件
 * @author 孟庆云
 */
function getBuildGradleFilePath(basePath) {
  const filelist = fs.readdirSync(basePath);

  filelist.map(node => {
    const nodeFullPath = basePath + "/" + node;
    if (fs.statSync(nodeFullPath).isFile() && node === "build.gradle") {
      replaceBuildGradle(nodeFullPath);
    } else if (
      fs.statSync(nodeFullPath).isDirectory() &&
      node !== "react-native" // 不处理react-native的依赖
    ) {
      getBuildGradleFilePath(nodeFullPath);
    }
  });
}

/**
 * 替换build.gradle的内容
 * @author 孟庆云
 */
function replaceBuildGradle(filepath) {
  console.log("已替换资源：", filepath);
  let fileContent = fs.readFileSync(filepath, "utf-8");

  fileContent = fileContent.replace(
    /compileSdkVersion ('|")*[0-9]+('|")*/g,
    replaceContent.compileSdkVersion
  );
  fileContent = fileContent.replace(
    /buildToolsVersion ('|")[0-9]+[\.[0-9]+]*('|")/g,
    replaceContent.buildToolsVersion
  );
  fileContent = fileContent.replace(
    /minSdkVersion ('|")*[0-9]+('|")*/g,
    replaceContent.minSdkVersion
  );
  fileContent = fileContent.replace(
    /targetSdkVersion ('|")*[0-9]+('|")*/g,
    replaceContent.targetSdkVersion
  );

  // 替换compile、testCompile、androidTestCompile
  fileContent = fileContent.replace(/androidTestCompile /g, 'androidTestImplementation ');
  fileContent = fileContent.replace(/testCompile /g, 'testImplementation ');
  fileContent = fileContent.replace(/compile /g, 'implementation ');

  fs.writeFileSync(filepath, fileContent, { encoding: "utf-8" });
}

/**
 * 获取Release包的APK文件路径
 * @author 孟庆云
 * */
function getApkPath() {
  const apkBasePath = path.resolve(
    __dirname,
    "../android/app/build/outputs/apk/release"
  );

  let apkFilePath = null;

  const filelist = fs.readdirSync(apkBasePath);
  if (filelist.length > 0) {
    filelist.map(node => {
      if (node.indexOf(".apk") === node.length - 4) {
        apkFilePath =
          apkBasePath + (process.platform === "win32" ? "\\" : "/") + node;
      }
    });
  } else {
    console.log(chalk.red("Release安装包不存在！"));
  }
  return apkFilePath;
}

/**
 * 安装Release版APK
 * @author 孟庆云
 * */
const installApk = function*() {
  let whetherInstall = yield prompt("是否直接安装(Y/N)？(默认N)");

  if (whetherInstall.toUpperCase() === "Y") {
    console.log(chalk.green("即将安装应用"));

    const apkFilePath = getApkPath();

    if (apkFilePath) {
      const installWorker = childProcess.spawn(
        "adb",
        ["install", "-r", apkFilePath],
        {
          cwd: process.cwd()
        }
      );

      installWorker.stdout.on("data", data => {
        console.log(`${data}`);
      })

      installWorker.on("exit", code => {
        if (code === 0) {
          console.log(chalk.green(`安装成功！`));
        }
        process.exit(0)
      });

      installWorker.on("error", err => {
        console.log(chalk.red(`安装失败，错误信息: ${err}`));
        process.exit(0)
      });
    } else {
      console.log(chalk.red("Release包不存在！"));
      process.exit(0)
    }
  } else {
    console.log(chalk.red("不安装应用"));
    process.exit(0);
  }
};

getBuildGradleFilePath(projectBasePath);

let command = process.cwd();
let commandExecPath = process.cwd();

if (process.platform === "win32") {
  // windows平台
  command += "\\android\\gradlew.bat";
  commandExecPath += "\\android";
} else {
  // Linux 和 Mac平台
  command += "/android/gradlew";
  commandExecPath += "/android";
}

console.log(chalk.gray("即将开始执行Gradle命令打包"));
const worker = childProcess.spawn(command, ["assembleRelease", `-PIdSuffix=${theme}`], {
  cwd: commandExecPath
});

worker.stdout.on("data", data => {
  console.log(`${data}`);
});

worker.on("exit", (code, signal) => {
  if (code === 0) {
    console.log(chalk.green(`打包成功！`));
    co(installApk());
  } else {
    console.log(chalk.red(`打包失败，返回码：${code}，错误信息：${signal}`));
  }
});

worker.on("error", err => {
  console.log(chalk.red(`打包失败，错误信息: ${err}`));
});
