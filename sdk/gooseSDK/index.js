// 这里存放rn sdk调用代码
import ImagePicker from 'react-native-image-picker';

export default {
    // sdk版本
    version:'1.0.0',
    // 获取照片信息 
    getImagePicker(options,success,failure) {
        var configs = options.data;
        ImagePicker.showImagePicker(configs, (response) => {
          success(JSON.stringify(response))
        },(failRes) => {
          failure(JSON.stringify(failRes))
        });
    },
    // 获取照片信息 
    getImagePicker2(options,success,failure) {
        var configs = options.data;
        ImagePicker.showImagePicker(configs, (response) => {
          success(JSON.stringify(response))
        },(failRes) => {
          failure(JSON.stringify(failRes))
        });
    },
    // 获取照片信息 
    getImagePicker3(options,success,failure) {
        var configs = options.data;
        ImagePicker.showImagePicker(configs, (response) => {
          success(JSON.stringify(response))
        },(failRes) => {
          failure(JSON.stringify(failRes))
        });
    },
}
