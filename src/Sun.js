import * as React from 'react'
import { Sphere, PointLight, View, asset } from 'react-vr'

import { SUN_RADIUS } from './constants'

class Sun extends React.Component {
	render() {
		return (
			<View>
				<Sphere
					radius={SUN_RADIUS}
					widthSegments={30}
					heightSegments={30}
					texture={asset('sun.jpg')}
				/>
				<PointLight intensity={3} />
			</View>
		)
	}
}

export default Sun
