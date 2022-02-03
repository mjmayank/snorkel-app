import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';

import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';

const Location = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.headerLabel}>Dive Location</Text>
        <View style={styles.subContainer}>
          <GradientCircle style={styles.iconContainer}>
            <IOIcon name="location-outline" size={25} color="white" />
          </GradientCircle>
          <GradientText
            gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 0.06,
              y: 1.8,
            }}
            gradientLocations={[0.01, 1, 1]}
            style={styles.actionText}>
            Add Location
          </GradientText>
        </View>
      </View>

      <View style={styles.mediaContainer}>
        <View style={styles.mediaContentLabel}>
          <Text style={styles.headerLabel}>Photos and Videos</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>Optional</Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <GradientCircle style={styles.iconContainer}>
            <IOIcon name="add-outline" size={30} color="white" />
          </GradientCircle>
          <GradientText
            gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 0.06,
              y: 1.8,
            }}
            gradientLocations={[0.01, 1, 1]}
            style={styles.actionText}>
            Add Photos or Videos
          </GradientText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 25,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  subContainer: {
    height: 130,
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '600',
  },
  mediaContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  optionalContainer: {},
  optionaltext: {
    color: '#aa00ff',
  },
  mediaContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Location;