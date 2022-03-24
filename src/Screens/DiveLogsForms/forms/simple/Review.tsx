import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from 'react-native';
import IoIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GradientCircle from '_components/ui/GradientCircle';
import GradientText from '_components/ui/GradientText';
import Button from '_components/ui/Buttons/Button';

import type { FunctionComponent } from 'react';

import type { SimpleFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

import DivingPlaceholder from '_assets/diving-placeholder.jpeg';
import LocationImage from '_assets/Location.png';
import DescIcon from '_assets/DescIcon.png';
import CopyIcon from '_assets/CopySimple.png';
import UploadIcon from '_assets/UploadSimple.png';
import { useAppSelector } from '_redux/hooks';
import { selectUser } from '_redux/slices/user';

interface ReviewProps {
  navigateToAdvancedDiveForm: () => void;
  formValues: InitialValues;
  id: number;
}

const Review: FunctionComponent<ReviewProps> = ({
  navigateToAdvancedDiveForm,
  formValues,
  id,
}) => {
  const activeUser = useAppSelector(selectUser);
  const onShare = async () => {
    console.log('active user', activeUser);
    const url = `zentacle://dive-log/${id}`;
    try {
      const result = await Share.share({
        message: url,
        title: `${activeUser?.username} wants to share their dive log with you`,
        url,
      });
      console.log(result);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of type result.activity type
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      interface CaughtErr {
        message: string;
      }
      Alert.alert((err as CaughtErr).message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gradientContainer}>
        <GradientCircle style={styles.gradient}>
          <IoIcon name="checkmark-outline" size={50} color="#fff" />
        </GradientCircle>
      </View>
      <Text style={styles.mainText}>
        Your dive log has been successfully created!
      </Text>

      <View style={styles.imageContainer}>
        {formValues.images && formValues.images.length ? (
          <>
            <Image
              style={styles.image}
              source={{ uri: formValues.images[0].uri }}
            />
            <View style={styles.imageCountContainer}>
              <Icon name="image-outline" size={18} color="#FFF" />
              <Text style={styles.imageCountText}>
                {formValues.images.length}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Image style={styles.image} source={DivingPlaceholder} />
            <View style={styles.imageCountContainer}>
              <Icon name="image-outline" size={18} color="#FFF" />
              <Text style={styles.imageCountText}>0</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>{formValues.name}</Text>
        <View style={styles.descContainer}>
          <Image source={DescIcon} />
          <Text style={styles.descText}>{formValues.name}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image source={LocationImage} />
          <Text style={styles.locationText}>{formValues.location?.desc}</Text>
          {/* <View style={styles.dot} /> */}
          <Text style={styles.locationTimestamp}>
            {new Date().toDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.shareContainer}>
        <TouchableWithoutFeedback onPress={onShare}>
          <View style={styles.shareItems}>
            <Image style={styles.shareIcon} source={UploadIcon} />
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
              style={styles.shareText}>
              Share
            </GradientText>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.shareItems}>
          <Image style={styles.shareIcon} source={CopyIcon} />
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
            style={styles.shareText}>
            Copy Link
          </GradientText>
        </View>
      </View>

      <View>
        <Button
          onPress={navigateToAdvancedDiveForm}
          gradient
          gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
          gradientLocations={[0.01, 1, 1]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0.06,
            y: 2.2,
          }}
          style={{
            container: styles.buttonContainer,
            text: styles.buttonText,
          }}>
          Add More Details
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 25,
  },
  mainText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: '20%',
  },
  gradientContainer: {
    alignItems: 'center',
  },
  gradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageContainer: {
    marginTop: 30,
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: 210,
    borderRadius: 20,
  },
  imageCountContainer: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(131,131,131,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageCountText: {
    marginLeft: 5,
    opacity: 1,
  },
  details: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  descContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  descText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
    maxWidth: '50%',
    color: 'black',
  },
  locationTimestamp: {
    color: 'grey',
    marginLeft: 5,
  },
  dot: {
    width: 2.4,
    height: 2.4,
    borderRadius: 1.2,
    backgroundColor: '#828993',
    marginLeft: 10,
    marginTop: 4,
    color: 'black',
  },
  shareContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shareItems: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '48%',
  },
  shareText: {
    fontSize: 17,
    fontWeight: '600',
  },
  shareIcon: {
    marginRight: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Review;
