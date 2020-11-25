/**
 * 构建svg图标声明文件
 * @author 孟庆云
 * */
const path = require("path");
const fs = require("fs");

/**
 * 获取SVG文件列表
 * @author 孟庆云
 * */
function getSvgContentList(filepath, basePath) {
  const svgContentJson = {};
  const filelist = fs.readdirSync(filepath);

  filelist.map(node => {
    const nodePath = filepath + "/" + node;

    if (fs.statSync(nodePath).isFile()) {
      // 当前节点是文件
      if (node.indexOf(".svg") === node.length - 4) {
        const fileContent = readSvgFile(nodePath);
        const key = (basePath + "/" + node).toUpperCase();
        svgContentJson[key] = fileContent;
      }
    } else if (fs.statSync(nodePath).isDirectory()) {
      Object.assign(svgContentJson, getSvgContentList(nodePath, basePath + "/" + node));
    }
  });

  return svgContentJson;
}

/**
 * 根据文件路径，读取SVG图标的文件内容
 * @author 孟庆云
 * */
function readSvgFile(svgFilePath) {
  const content = fs.readFileSync(svgFilePath, {
    encoding: "UTF-8",
    flag: "r"
  });
  return content.replace(/<\?xml.*?\?>|<\!--.*?-->|<!DOCTYPE.*?>/g, "");
}

/**
 * 生成SVG图标声明文件
 * @author 孟庆云
 *
 * @param content: 要写入的文件内容
 * */
function generateSvgDefineFile() {
  const babel = require("../babel.config.js")

  // 定义SVG图标根路径
  let svgSourcePath = null;

  const staticPaths = babel.plugins[0][1].paths;
  staticPaths.map(node => {
    if (node.rootPathPrefix === "$image/") {
      svgSourcePath = path.resolve(__dirname, `.${node.rootPathSuffix}`);
    }
  });
  // 定义SVG图标声明文件的路径
  const svgDefineFilePath = path.resolve(__dirname, "../src/image/index.js");

  const svgJson = getSvgContentList(svgSourcePath, "$image");
  const svgContent = `module.exports = ${JSON.stringify(svgJson)}`;
  fs.writeFileSync(svgDefineFilePath, svgContent, { encoding: "UTF-8", flag: "w" });
}

// 首先判断Babel配置是否存在
const babelFile = path.resolve(__dirname, "../babel.config.js");

if (!fs.existsSync(babelFile)) {
  const childProcess = require("child_process");
  const buildWorker = childProcess.exec(
    "npm run set-green",
    {
      cwd: process.cwd()
    },
    (err, stdout, stderr) => {
      console.log("已成功设置默认主题为绿色。");
      generateSvgDefineFile();
    }
  );
} else {
  generateSvgDefineFile();
}
