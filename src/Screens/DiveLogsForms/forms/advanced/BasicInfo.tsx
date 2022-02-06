import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import MAIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';

import GradientText from '_components/ui/GradientText';
import GradientCircle from '_components/ui/GradientCircle';
import GradientBox from '_components/ui/GradientBox';

import Input from '_components/ui/Input';

import LocationImage from '_assets/Location.png';
import LogImage from '_assets/log-color.png';
import StarEmpty from '_assets/StarEmpty.png';
import StarFull from '_assets/StarFull.png';

const BasicInfo = () => {
  const coordinates = { latitude: -8.409518, longitude: 115.188919 };
  const [rating, setRating] = React.useState(0);
  const [selectedDiff, selectDiff] = React.useState('Beginner');

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.headerLabel}>Dive Site Location</Text>
        <View style={styles.mapContainer}>
          <MapView
            provider="google"
            style={styles.map}
            scrollEnabled={false}
            liteMode={true}
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0121,
              longitudeDelta: 0.2122,
            }}>
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
            />
          </MapView>
          <View />
          <View style={styles.mapDescriptionContainer}>
            <View style={styles.mapTextContainer}>
              <View style={styles.mapTextItem}>
                <View style={styles.mapTextImageContainer}>
                  <Image source={LogImage} />
                </View>
                <Text style={styles.mapText}>USS Liberty Wreck on Beach</Text>
              </View>
              <View style={styles.mapTextItem}>
                <View style={styles.mapTextImageContainer}>
                  <Image source={LocationImage} />
                </View>
                <Text style={styles.mapText}>East Bali Lighthouse</Text>
              </View>
            </View>
            <View style={styles.mapIconContainer}>
              <MAIcon name="pencil-outline" color="black" size={30} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.mediaContainer}>
        <View style={styles.mediaContentLabel}>
          <Text style={styles.headerLabel}>Photos and Videos</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>Not Necessary</Text>
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

      <View style={styles.nameContainer}>
        <View style={styles.inputContentLabel}>
          <Text style={styles.headerLabel}>Enter Name</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>Up to 40 Characters</Text>
          </View>
        </View>
        <View>
          <Input
            placeholder="Write Title"
            style={styles.nameInput}
            containerStyle={styles.inputContainer}
            maxLength={40}
          />
        </View>
      </View>

      <View style={styles.notesContainer}>
        <View style={styles.inputContentLabel}>
          <Text style={styles.headerLabel}>Note</Text>
          <View style={styles.optionalContainer}>
            <Text style={styles.optionaltext}>Up to 1000 Characters</Text>
          </View>
        </View>
        <View>
          <Input
            placeholder="Write Title"
            style={styles.notesInput}
            containerStyle={styles.inputContainer}
            maxLength={1000}
            multiline
          />
        </View>
      </View>

      <View style={styles.ratingContentContainner}>
        <Text style={styles.headerLabel}>Rating</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((_item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setRating(index + 1)}>
              <Image
                style={[styles.star, index !== 0 && {}]}
                source={rating >= index + 1 ? StarFull : StarEmpty}
              />
            </TouchableWithoutFeedback>
          ))}
          <Text style={styles.starLabel}>{rating} of 5</Text>
        </View>
      </View>

      <View style={styles.levelContentContainer}>
        <Text style={styles.headerLabel}>Level of difficulty</Text>
        <View style={styles.levelContainer}>
          {levels.map(level => {
            if (level === selectedDiff) {
              return (
                <TouchableWithoutFeedback>
                  <View style={styles.selectedShadow}>
                    <GradientBox style={styles.selectedLevel}>
                      <View style={styles.selectBox}>
                        <View style={styles.selectedLevelCircle}>
                          <GradientCircle style={styles.selectedGradient} />
                        </View>
                        <Text style={styles.levelText}>{level}</Text>
                      </View>
                    </GradientBox>
                  </View>
                </TouchableWithoutFeedback>
              );
            }
            return (
              <TouchableWithoutFeedback onPress={() => selectDiff(level)}>
                <View style={styles.level}>
                  <View style={styles.normalLevelCircle}></View>
                  <Text style={styles.levelText}>{level}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
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
  mapContainer: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    marginTop: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '60%',
    borderRadius: 18,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  mapDescriptionContainer: {
    position: 'absolute',
    top: '60%',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapTextContainer: {},
  mapTextItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapTextImageContainer: {
    width: 20,
  },
  mapText: {
    marginLeft: 10,
  },
  mapIconContainer: {
    marginRight: 20,
  },
  nameContainer: {
    marginTop: 10,
  },
  inputContentLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    borderColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  nameInput: {
    height: 45,
    fontSize: 16,
  },
  notesContainer: {
    marginTop: 30,
  },
  notesInput: {
    minHeight: 90,
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 5,
  },
  ratingContentContainner: {
    marginTop: 30,
  },
  ratingContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {},
  starLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  levelContentContainer: {
    marginVertical: 40,
  },
  levelContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  level: {
    backgroundColor: '#fff',
    borderRadius: 12,
    opacity: 0.5,
  },
  selectBox: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  selectedShadow: {
    borderRadius: 12,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  selectedLevel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    elevation: 2,
  },
  levelText: {
    marginRight: 25,
    marginLeft: 15,
    marginBottom: 10,
  },
  normalLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  selectedLevelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6F9',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGradient: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default BasicInfo;