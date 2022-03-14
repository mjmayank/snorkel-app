import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  OnboardingStackParamList,
} from '_utils/interfaces';

import { useAppSelector } from '_redux/hooks';
import { selectSettings } from '_redux/slices/settings';

import Button from '_components/ui/Buttons/Button';
import UploadAvatarIcon from '_assets/UploadAvatarIcon.png';

const HEIGHT = Dimensions.get('window').width;

type ChooseAvatarScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<OnboardingStackParamList, 'ChooseAvatar'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface ChooseAvatarProps {
  navigation: ChooseAvatarScreenNavigationProps;
}

const ChooseAvatar: FunctionComponent<ChooseAvatarProps> = props => {
  const settings = useAppSelector(selectSettings);
  const [cameraImage, setCameraImage] = React.useState('');
  const navigateBack = () => {
    props.navigation.goBack();
  };

  const navigateToLovationPermissions = () => {
    props.navigation.navigate('LocationPermissions');
  };

  const navigateToApp = () => {
    props.navigation.navigate('App', {
      screen: 'Explore',
    });
  };

  const handleLaunchCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      // includeBase64: true,
    });
    if (result.assets && result.assets[0].uri) {
      setCameraImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.iconBackContainer}>
          <Icon
            onPress={navigateBack}
            name="chevron-back"
            color="black"
            size={25}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Choose your avatar</Text>
          <Text style={styles.headerSubtext}>
            Upload your avatar to continue
          </Text>
        </View>
        <View style={styles.iconAddContainer}>
          {cameraImage ? (
            <Image
              style={{ width: 168, height: 168, borderRadius: 84 }}
              source={{ uri: cameraImage }}
            />
          ) : (
            <TouchableWithoutFeedback onPress={handleLaunchCamera}>
              <Image source={UploadAvatarIcon} />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          onPress={
            // if measuremennt type is set, assume user has gone through the
            // rest of this section and navigate to app
            settings.measurementType
              ? navigateToApp
              : navigateToLovationPermissions
          }
          gradient
          gradientColors={['#AA00FF', '#00E0FF', '#00E0FF']}
          gradientLocations={[0.0, 1, 1]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0.06,
            y: 2.3,
          }}
          style={{
            container: {
              backgroundColor: 'white',
              borderRadius: 12,
              padding: HEIGHT < 400 ? 12 : 16,
              marginVertical: HEIGHT < 400 ? 10 : 20,
              marginHorizontal: 0,
            },
            text: {
              color: '#FFF',
              fontSize: 16,
              fontWeight: '800',
            },
          }}>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  headerContainer: {
    marginTop: HEIGHT < 400 ? HEIGHT * 0.1 : HEIGHT * 0.12,
    marginBottom: HEIGHT < 400 ? HEIGHT * 0.08 : HEIGHT * 0.09,
  },
  headerText: {
    color: 'black',
    fontSize: 35,
    fontWeight: '700',
  },
  headerSubtext: {
    color: 'black',
    marginTop: 8,
  },
  iconAddContainer: {
    backgroundColor: '#FFF',
    width: 168,
    height: 168,
    borderRadius: 84,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
  footer: {
    marginHorizontal: 25,
  },
  iconBackContainer: {
    marginTop: 20,
  },
});

export default ChooseAvatar;
