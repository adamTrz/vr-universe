import React from 'react';
import { Animated, Sphere, View, asset } from 'react-vr';
import { Easing } from 'react-native';
import AnimatedMath from 'react-native-animated-math';

const Globe = Animated.createAnimatedComponent(Sphere);

export default class Planet extends React.Component {
  spin = new Animated.Value(0);
  rotation = new Animated.Value(0);

  componentDidMount() {
    this.startSpinning();
    this.startRotation();
  }

  startSpinning = () => {
    Animated.loop(
      Animated.timing(this.spin, {
        toValue: 360,
        easing: Easing.linear,
        duration: this.props.dayDuration,
      })
    ).start();
  };

  startRotation = () => {
    Animated.loop(
      Animated.timing(this.rotation, {
        toValue: 2 * Math.PI,
        easing: Easing.linear,
        duration: this.props.yearDuration,
      })
    ).start();
  };

  render() {
    const { elipsisRadius, radius, inclination } = this.props;
    return (
      <View>
        <Globe
          style={{
            transform: [
              {
                translateX: Animated.multiply(
                  AnimatedMath.sin(this.rotation),
                  -elipsisRadius
                ),
              },
              {
                translateZ: Animated.multiply(
                  AnimatedMath.cos(this.rotation),
                  elipsisRadius
                ),
              },
              {
                translateY: Animated.multiply(
                  AnimatedMath.sin(this.rotation),
                  elipsisRadius * Math.sin(inclination)
                ),
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
    );
  }
}
