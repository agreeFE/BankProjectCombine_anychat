/**
 * FileName: RNFSUtils.js
 * Author: hf
 * Date: 2019/2/11 14:39
 * Description:封装对文件的【下载、文本写入、文本读取、文本追加、删除】的工具类方法
 *
 */
import RNFS from 'react-native-fs';

import {
    Platform
  } from 'react-native';


import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'


/** @namespace RNFS.ExternalDirectoryPath */
/**
 * 常用文件存储目录(ios与android)
 *
 * RNFS.MainBundlePath
 * RNFS.CachesDirectoryPath
 * RNFS.DocumentDirectoryPath
 * RNFS.TemporaryDirectoryPath
 * RNFS.LibraryDirectoryPath
 * RNFS.ExternalDirectoryPath
 * RNFS.ExternalStorageDirectoryPath

 */
const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
// console.warn('ExternalDirectoryPath----------------------')
// console.warn(ExternalDirectoryPath)
const MainBundlePath = RNFS.MainBundlePath;
// console.warn('MainBundlePath---------------------')
// console.warn(MainBundlePath)
const CachesDirectoryPath = RNFS.CachesDirectoryPath;
// console.warn('CachesDirectoryPath---------------------')
// console.warn(CachesDirectoryPath)
const DocumentDirectoryPath = RNFS.DocumentDirectoryPath;
// console.warn('DocumentDirectoryPath---------------------')
// console.warn(DocumentDirectoryPath)
const TemporaryDirectoryPath = RNFS.TemporaryDirectoryPath;
// console.warn('TemporaryDirectoryPath---------------------')
// console.warn(TemporaryDirectoryPath)
const LibraryDirectoryPath = RNFS.LibraryDirectoryPath;
// console.warn('LibraryDirectoryPath---------------------')
// console.warn(LibraryDirectoryPath)
// const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
const ExternalStorageDirectoryPath = RNFS.ExternalStorageDirectoryPath;
// console.warn('ExternalStorageDirectoryPath---------------------')
// console.warn(ExternalStorageDirectoryPath)


/**
 * 功能描述: <br>
 * 〈文件下载(图片、文件、音频、视频)〉
 *
 * @MethodName: _downloadFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:46
 * @Param: [formUrl 要下载的文件地址, targetName 目标文件名称(类似text.txt),callback: 1：下载成功   0：下载失败]
 *
 */
export const _downloadFile = (formUrl, targetName) => {

    let toLoadPath = '';
    let DirectoryPath = '';

    if (Platform.OS === 'android') {
        DirectoryPath = ExternalDirectoryPath+'/';
    }else{
        DirectoryPath = './';
    }
    toLoadPath = `${DirectoryPath}${targetName}`;

    console.warn('开始下载++++++++++++++++++++++++++++++++++++++++')
    // const toLoadPath = `${ExternalDirectoryPath}/${targetName}`;
    RNFS.downloadFile({
        fromUrl: formUrl,
        toFile: toLoadPath,
        progressDivider: 5,
        begin: (res) => console.log('begin', res) ,
        progress: function(suc){
            console.warn(suc)
        }
    }).promise.then((response) => {
        console.log("rsp",response);
        if (response.statusCode == 200) {
            $Toast.info('下载完成')
            //解压
            // console.warn('开始解压++++++++++++++++++++++++++++++++++++++++')
            // console.warn(toLoadPath)
            // console.warn(DirectoryPath)
            // unzip(toLoadPath,DirectoryPath)
            //     .then((path) => {
            //         console.warn(`zip completed at ${path}`)
            //     })
            //     .catch((error) => {
            //         console.warn('解压error')
            //         console.warn(error)
            //     })
        } else {
          console.log('SERVER ERROR');
        }
      })
      .catch((err) => {
        if(err.description === "cancelled") {
          // cancelled by user
        }
        console.log(err);
      });
};

/**
 * 功能描述: <br>
 * 〈将内容写入本地文本〉
 *
 * @MethodName: _writeFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:47
 * @Param: [ targetName 目标文件名称(类似text.txt)  content 文本内容   callback: 1：成功 ]
 *
 */
export const _writeFile = (targetName,content, callback) => {
    const path = `${ExternalDirectoryPath}/${targetName}`;
    RNFS.writeFile(path, content, 'utf8')
        .then(result => callback(1));
};


/**
 * 功能描述: <br>
 * 〈读取文本内容〉
 *
 * @MethodName: _readFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:48
 * @Param: [fileName 文件名称，callback 回调函数获得读取的文件内容]
 *
 */
export const _readFile = (fileName, callback) => {
    RNFS.readFile(`${ExternalDirectoryPath}/${fileName}`)
        .then(result => callback(result));
};

/**
 * 功能描述: <br>
 * 〈在已有的txt上添加新的文本〉
 *
 * @MethodName: _appendFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:49
 * @Param: [fileName:要追加的目标文本名称, content 要添加的文本信息, callback:回调函数   1：成功]
 *
 */
export const _appendFile = (fileName, content, callback) => {
     RNFS.appendFile(`${ExternalDirectoryPath}/${fileName}`, content, 'utf8')
        .then(()=>callback(1));
};

/**
 * 功能描述: <br>
 * 〈删除本地文件〉
 *
 * @MethodName: _deleteFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:49
 * @Param: targetName 要删除的文件名称   callback:回调函数   1：成功  0/其它:失败
 *
 */
export const _deleteFile = (targetName,callback)=> {
     RNFS.unlink(`${ExternalDirectoryPath}/${targetName}`)
        .then(()=> callback(1));
};

/**
 * 功能描述: <br>
 * 〈
 * 判断文件是否存在  文件存在返回:true  不存在返回:false
 * 〉
 *
 * @MethodName: _fileEx
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/3/7 15:30
 * @Param: [filePath文件路径    callback:回调函数]
 *
 */
export const _fileEx = (filePath, callback) => {
    RNFS.exists(filePath)
        .then(res => callback(res));
};

/**
 * 功能描述: <br>
 * 〈
 * 创建Android目录
 * 〉
 *
 * @MethodName: _mkdir
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/3/29 17:08
 * @Param: [path:要创建的文件夹路径【file:///sacard/AXX/files】  callback: 1:创建成功  0/其它:创建失败]
 *
 */
export function _mkdir(path, callback) {
    RNFS.mkdir(path)
        .then(() => callback(1),()=>callback(0))
}
