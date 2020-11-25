//路由loader,start工程时执行
const path = require('path')
const fs = require('fs')

const RouterConfig = require('../router/router_config')

let source = `
import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
`
let routers = RouterConfig.routers

let routerParams = ''

Object.keys(routers).forEach(key => {
    let newScreen = routers[key].screen
    //只处理js
    if(newScreen.substr(newScreen.length-3) == '.js'){
        let importString = 'var ' + key +' =' + ' require("$/' + routers[key].screen +'")';
        routers[key].screen = '///'+key+'///';
        source += importString+'\n';
    }else{
        // console.log(newScreen.substr(newScreen.length-4))
    }
})

routerParams += JSON.stringify(routers);

var nowRouterParams = routerParams.split('///"').join("").split('"///').join("");

let initialRouteName = RouterConfig.initialRouteName;
let initialRouteNameString = ',{'+'"initialRouteName": ' + '"'+ RouterConfig.initialRouteName+'"}'
nowRouterParams += initialRouteNameString;

let paramString = 'let RootStack = createStackNavigator('+nowRouterParams +');'+'\n'+'module.exports = RootStack'

source += paramString;

fs.writeFileSync("router/router.js",source)
