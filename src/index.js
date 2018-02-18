import * as React from 'react'
import { View, Sphere, asset, PointLight } from 'react-vr'

import Planet from './Planet'

import { EARTH_YEAR, EARTH_DAY } from './constants'

class App extends React.Component {
  render() {
    return (
      <View>
        <Planet
          texture="earth.jpg"
          yearDuration={EARTH_YEAR}
          dayDuration={EARTH_DAY}
          radius={0.1}
          elipsisRadius={1}
          inclination={7.155}
          axialTilt={23.4}
        />
        <PointLight
          intensity={1}
          style={{ transform: [{ translate: [0, 0, 0] }] }}
        />
      </View>
    )
  }
}

export default App
