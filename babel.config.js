module.exports = {
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
            "rootPathSuffix": `./src/image/blue-theme/`
          },
          {
            "rootPathPrefix": "$theme/",
            "rootPathSuffix": `./src/theme/blue-theme/`
          }
        ]
      }
    ],
    ["import", { "libraryName": "@ant-design/react-native" }],
    ["babel-plugin-inline-import", { extensions: [".svg"] }]
  ]
};