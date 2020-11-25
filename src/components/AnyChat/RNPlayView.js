import React, {Component, PropTypes}from 'react';

import RctPlayView from './RNPlayViewManager';

export default class RNPlayView extends Component {
    //默认属性定义使用static propTypes
    static propTypes = {
        
    };

    render() {
        return (
            <RctPlayView
                {...this.props}
            />
        );
    }


}