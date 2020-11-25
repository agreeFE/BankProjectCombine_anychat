import React, { Component } from "react";
import { View } from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { SvgXml } from "react-native-svg";

const svgContents = require("$/image");

export default class Svg extends Component {
  constructor(props) {
    super(props);

    this.componentIsMounted = false;
    this.state= {
      source: '',
      svgXmlData: '',
      styles: {}
    }
  }
  componentDidMount() {
    this.componentIsMounted = true;
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
  }
  render() {
    const { styles, svgXmlData } = this.state;
    return (
      <View style={styles}>
        {
          svgXmlData ?
          <SvgXml xml={svgXmlData} width="100%" height="100%" />
          : null
        }
      </View>
    )
  }

  static getDerivedStateFromProps(props, state) {
    if(props.source === state.source) return null
    let svgXmlData = null;
    if (props.source) {
      const source = resolveAssetSource(props.source) || {};
      if (svgContents[source.uri.toUpperCase()]) {
        svgXmlData = svgContents[source.uri.toUpperCase()];
      } else {
        let uri = '$image';
        if (__DEV__) {
          const start = source.uri.indexOf("/src") + 1;
          const length = source.uri.indexOf("?platform") - start;

          let uriArray = source.uri.substr(start, length).split('/');

          uriArray.map((node, index) => {
            if (index > 2) {
              uri += "/" + node;
            }
          });
        } else {
          // release模式
          const uriArray = source.uri.split('_');
          uriArray.map((node, index) => {
            if (index > 2) {
              uri += "/" + node;
            }
          });

          uri += '.svg';
        }
        svgXmlData = svgContents[uri.toUpperCase()];
      }
    } else {
      svgXmlData = props.svgXmlData;
    }

    return {
      source: props.source,
      svgXmlData: svgXmlData,
      styles: props.style
    };
  }
}
