import * as React from 'react';
import { View, Scene, PointLight, Animated } from 'react-vr';

const Galaxy = Animated.createAnimatedComponent(Scene);

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

import Planet from './Planet';
import Sun from './Sun';

import { EARTH_YEAR, EARTH_DAY } from './constants';

class App extends React.Component {
  state = {
    zoomedIn: false,
    zoom: new Animated.Value(0),
  };
  componentDidMount() {
    RCTDeviceEventEmitter.addListener('ondblclick', this.handleDbClick);
  }

  handleDbClick = e => {
    const { zoomedIn, zoom } = this.state;
    Animated.timing(zoom, {
      toValue: zoomedIn ? 0 : 1,
      duration: 400,
    }).start(() => {
      this.setState(state => ({ zoomedIn: !state.zoomedIn }));
    });
  };

  render() {
    const { zoom } = this.state;
    return (
      <Galaxy
        style={{
          transform: [
            {
              translateZ: zoom.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 10],
              }),
            },
            {
              translateY: zoom.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 15],
              }),
            },
          ],
        }}
      >
        <Planet
          texture="mercury.jpg"
          yearDuration={EARTH_YEAR * 0.62}
          dayDuration={EARTH_DAY * -243}
          radius={0.1 * 2.4 / 6.3}
          elipsisRadius={3 * 0.72}
          inclination={3.4}
        />
        <Planet
          texture="venus.jpg"
          yearDuration={EARTH_YEAR * 0.24}
          dayDuration={EARTH_DAY * 58}
          radius={0.1 * 6 / 6.3}
          elipsisRadius={3 * 0.72}
          inclination={3.4}
        />
        <Planet
          texture="earth.jpg"
          yearDuration={EARTH_YEAR}
          dayDuration={EARTH_DAY}
          radius={0.1}
          elipsisRadius={3}
          inclination={7.2}
        />
        <Planet
          texture="mars.jpg"
          yearDuration={EARTH_YEAR * 1.88}
          dayDuration={EARTH_DAY * 1.03}
          radius={0.1 * 3.4 / 6.3}
          elipsisRadius={3 * 1.52}
          inclination={1.9}
        />
        <Planet
          texture="jupiter.jpg"
          yearDuration={EARTH_YEAR * 11.86}
          dayDuration={EARTH_DAY * 0.4}
          radius={0.1 * 69.9 / 6.3}
          elipsisRadius={3 * 5.2}
          inclination={1.3}
        />
        <Planet
          texture="saturn.jpg"
          yearDuration={EARTH_YEAR * 29.5}
          dayDuration={EARTH_DAY * 0.5}
          radius={0.1 * 58.2 / 6.3}
          elipsisRadius={3 * 9.6}
          inclination={2.5}
        />
        <Sun />
      </Galaxy>
    );
  }
}

export default App;
