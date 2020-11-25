import {PropTypes} from 'prop-types';

import {requireNativeComponent, View,} from 'react-native';

let rnPlayView = {
    name: 'RNPlayView',
    propTypes: {
       
        nativeId: PropTypes.String,
        ...View.propTypes,//添加默认View的属性，否则会导致各种属性未定义错误
    },
};

module.exports = requireNativeComponent('RNPlayView', rnPlayView);