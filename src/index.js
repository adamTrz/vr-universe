import * as React from 'react'
import { View, Scene, PointLight, Animated } from 'react-vr'

const Galaxy = Animated.createAnimatedComponent(Scene)

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter')

import Planet from './Planet'
import Sun from './Sun'

import { EARTH_YEAR, EARTH_DAY } from './constants'

class App extends React.Component {
  state = {
    zoomedIn: false,
    zoom: new Animated.Value(0),
  }
  componentDidMount() {
    RCTDeviceEventEmitter.addListener('ondblclick', this.handleDbClick)
  }

  handleDbClick = e => {
    console.log('e', e)
    const { zoomedIn, zoom } = this.state
    Animated.timing(zoom, {
      toValue: zoomedIn ? 0 : 1,
      duration: 400,
    }).start(() => {
      this.setState(state => ({ zoomedIn: !state.zoomedIn }))
    })
  }

  render() {
    const { zoom } = this.state
    return (
      <Galaxy
        style={{
          transform: [
            {
              translateZ: zoom.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 5],
              }),
            },
            {
              translateY: zoom.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 3],
              }),
            },
          ],
        }}
      >
        <Planet
          texture="earth.jpg"
          yearDuration={EARTH_YEAR}
          dayDuration={EARTH_DAY}
          radius={0.1}
          elipsisRadius={1}
          inclination={7.155}
          axialTilt={23.4}
        />
        <Sun />
      </Galaxy>
    )
  }
}

export default App
