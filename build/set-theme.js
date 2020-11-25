const process = require('process');
const fs = require('fs');
const path = require('path');
const chalk = require("chalk");

const themeType = process.argv[2];

// Babel设置
let babelConfigContent = `module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["babel-plugin-root-import",
      {
        "paths": [
          {
            "rootPathPrefix": "@/",
            "rootPathSuffix": "./src/"
          },
          {
            "rootPathPrefix": "$/",
            "rootPathSuffix": "./src/"
          },
          {
            "rootPathPrefix": "$image/",
            "rootPathSuffix": \`./src/image/${themeType}/\`
          },
          {
            "rootPathPrefix": "$theme/",
            "rootPathSuffix": \`./src/theme/${themeType}/\`
          }
        ]
      }
    ],
    ["import", { "libraryName": "@ant-design/react-native" }],
    ["babel-plugin-inline-import", { extensions: [".svg"] }]
  ]
};`;

const babelConfigPath = path.resolve(__dirname, "../babel.config.js");

fs.writeFileSync(babelConfigPath, babelConfigContent);

console.log(chalk.green("已成功设置主题"));
