import * as React from 'react';
import { View, Scene, PointLight, Animated } from 'react-vr';

const Galaxy = Animated.createAnimatedComponent(Scene);

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

import Planet from './Planet';
import Sun from './Sun';

import * as constants from './constants';

class App extends React.Component {
  state = {
    zoomLvl: 2,
    zoom: new Animated.Value(0),
  };
  componentDidMount() {
    RCTDeviceEventEmitter.addListener('ondblclick', this.handleDbClick);
  }

  handleDbClick = e => {
    const { zoomLvl, zoom } = this.state;
    const toValue = zoomLvl === 6 ? 0 : zoomLvl + 1;
    Animated.timing(zoom, {
      toValue,
      duration: 400,
    }).start(() => {
      this.setState(state => ({ zoomLvl: toValue }));
    });
  };

  render() {
    const { zoom, zoomLvl } = this.state;
    return (
      <Galaxy
        style={{
          transform: [
            {
              translateZ: zoom.interpolate({
                inputRange: [0, 1],
                outputRange: [35, 50],
              }),
            },
            {
              translateY: zoom.interpolate({
                inputRange: [0, 1],
                outputRange: [35, 50],
              }),
            },
            { rotateX: -45 },
          ],
        }}
      >
        <Planet
          texture="mercury.jpg"
          yearDuration={constants.MERCURY_YEAR}
          dayDuration={constants.MERCURY_DAY}
          radius={constants.MERCURY_RADIUS}
          elipsisRadius={constants.MERCURY_AXIS}
          inclination={constants.MERCURY_INCLINATION}
        />
        <Planet
          texture="venus.jpg"
          yearDuration={constants.VENUS_YEAR}
          dayDuration={constants.VENUS_DAY}
          radius={constants.VENUS_RADIUS}
          elipsisRadius={constants.VENUS_AXIS}
          inclination={constants.VENUS_INCLINATION}
        />
        <Planet
          texture="earth.jpg"
          yearDuration={constants.EARTH_YEAR}
          dayDuration={constants.EARTH_DAY}
          radius={constants.EARTH_RADIUS}
          elipsisRadius={constants.EARTH_AXIS}
          inclination={constants.EARTH_INCLINATION}
        />
        <Planet
          texture="mars.jpg"
          yearDuration={constants.MARS_YEAR}
          dayDuration={constants.MARS_DAY}
          radius={constants.MARS_RADIUS}
          elipsisRadius={constants.MARS_AXIS}
          inclination={constants.MARS_INCLINATION}
        />
        <Planet
          texture="jupiter.jpg"
          yearDuration={constants.JUPITER_YEAR}
          dayDuration={constants.JUPITER_DAY}
          radius={constants.JUPITER_RADIUS}
          elipsisRadius={constants.JUPITER_AXIS}
          inclination={constants.JUPITER_INCLINATION}
        />
        <Planet
          texture="saturn.jpg"
          yearDuration={constants.SATURN_YEAR}
          dayDuration={constants.SATURN_DAY}
          radius={constants.SATURN_RADIUS}
          elipsisRadius={constants.SATURN_AXIS}
          inclination={constants.SATURN_INCLINATION}
        />
        <Planet
          texture="uranus.jpg"
          yearDuration={constants.URANUS_YEAR}
          dayDuration={constants.URANUS_DAY}
          radius={constants.URANUS_RADIUS}
          elipsisRadius={constants.URANUS_AXIS}
          inclination={constants.URANUS_INCLINATION}
        />
        <Planet
          texture="neptune.jpg"
          yearDuration={constants.NEPTUNE_YEAR}
          dayDuration={constants.NEPTUNE_DAY}
          radius={constants.NEPTUNE_RADIUS}
          elipsisRadius={constants.NEPTUNE_AXIS}
          inclination={constants.NEPTUNE_INCLINATION}
        />
        <Sun />
      </Galaxy>
    );
  }
}

export default App;
