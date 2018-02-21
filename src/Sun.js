import * as React from 'react'
import { Sphere, PointLight, View, asset } from 'react-vr'

class Sun extends React.Component {
  render() {
    return (
      <View>
        <Sphere
          radius={0.5}
          widthSegments={20}
          heightSegments={20}
          texture={asset('sun.jpg')}
        />
        <PointLight
          intensity={1}
          style={{ transform: [{ translate: [0, 0, 0] }] }}
        />
      </View>
    )
  }
}

export default Sun
