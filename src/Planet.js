import React from 'react'
import { Animated, Sphere, View, asset } from 'react-vr'
import { Easing } from 'react-native'
import AnimatedMath from 'react-native-animated-math'

const Globe = Animated.createAnimatedComponent(Sphere)

const radians = degrees => degrees * Math.PI / 180

export default class Planet extends React.Component {
	spin = new Animated.Value(0)
	// rotation = new Animated.Value(0)
	inclination = new Animated.Value(0)
	position = new Animated.ValueXY()

	componentDidMount() {
		this.startSpinning()
		this.startRotation()
	}

	startSpinning = () => {
		Animated.timing(this.spin, {
			toValue: 360,
			easing: Easing.linear,
			duration: this.props.dayDuration,
		}).start(() => {
			this.spin.setValue(0)
			this.startSpinning()
		})
	}

	startRotation = () => {
		Animated.parallel([
			Animated.timing(this.inclination, {
				toValue: 360,
				duration: this.props.yearDuration,
				easing: Easing.linear,
			}),
			Animated.timing(this.position, {
				toValue: { x: 360, y: 360 },
				duration: this.props.yearDuration,
				easing: Easing.linear,
				extrapolate: 'clamp',
			}),
		]).start(() => {
			this.inclination.setValue(0)
			this.position.setValue({ x: 0, y: 0 })
			this.startRotation()
		})
		// Animated.timing(this.rotation, {
		// 	toValue: 2 * Math.PI,
		// 	easing: Easing.linear,
		// 	duration: this.props.yearDuration,
		// }).start(() => {
		// 	this.rotation.setValue(0)
		// 	this.startRotation()
		// })
	}

	render() {
		const { elipsisRadius, radius, inclination } = this.props
		let range = new Array(360)
		for (let i = 0; i < 360; i++) {
			range[i] = i
		}
		return (
			<View>
				<Globe
					style={{
						transform: [
							// {
							// 	translateX: Animated.multiply(
							// 		AnimatedMath.sinus(this.rotation),
							// 		-elipsisRadius
							// 	),
							// },
							// {
							// 	translateZ: Animated.multiply(
							// 		AnimatedMath.cosinus(this.rotation),
							// 		elipsisRadius
							// 	),
							// },
							// {
							// 	translateY: Animated.multiply(
							// 		AnimatedMath.sinus(this.rotation),
							// 		elipsisRadius * Math.sin(inclination)
							// 	),
							// },
							/** without AnimatedMath, take 1: */
							{
								translateX: this.position.x.interpolate({
									inputRange: range,
									outputRange: range.map(
										i => -elipsisRadius * Math.sin(i * Math.PI / 180)
									),
								}),
							},
							{
								translateZ: this.position.y.interpolate({
									inputRange: range,
									outputRange: range.map(
										i => -elipsisRadius * Math.cos(i * Math.PI / 180)
									),
								}),
							},
							{
								translateY: this.inclination.interpolate({
									inputRange: range,
									outputRange: range.map(
										i => inclination * Math.sin(i * Math.PI / 180)
									),
								}),
							},
							{ rotateY: this.spin },
						],
					}}
					radius={radius}
					widthSegments={radius * 10 + 20}
					heightSegments={radius * 10 + 20}
					lit
					texture={asset(this.props.texture)}
				/>
			</View>
		)
	}
}
