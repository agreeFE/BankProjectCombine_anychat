/**
 * 删除android工程的build目录
 */
const childProcess = require("child_process");
const process = require("process");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");

function buildDebug() {
  const buildWorker = childProcess.exec(
    "react-native run-android",
    {
      cwd: process.cwd()
    },
    (err, stdout, stderr) => {
      process.exit(0);
    }
  );

  buildWorker.stdout.on("data", data => {
    console.log(`${data}`);
  });

  buildWorker.on("exit", code => {
    if (code === 0) {
      console.log(chalk.green("调试基座已成功安装到手机。"));
    }
  });

  buildWorker.on("error", err => {
    console.log(chalk.red(`运行失败，错误信息: ${err}`));
  });
}

const projectBasePath = path.resolve(__dirname, "../node_modules");

const replaceContent = {
  compileSdkVersion: "compileSdkVersion rootProject.ext.compileSdkVersion",
  buildToolsVersion: "buildToolsVersion rootProject.ext.buildToolsVersion",
  minSdkVersion: "minSdkVersion rootProject.ext.minSdkVersion",
  targetSdkVersion: "targetSdkVersion rootProject.ext.targetSdkVersion"
};

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

getBuildGradleFilePath(projectBasePath);

buildDebug();
