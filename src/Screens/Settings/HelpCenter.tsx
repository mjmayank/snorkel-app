import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MUIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type {
  RootStackParamList,
  SettingStackParamList,
} from '_utils/interfaces';

type HelpCenterTypeNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'HelpCenter'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HelpCenterTypeProps {
  navigation: HelpCenterTypeNavigationProps;
}

const support = [
  {
    icon: 'email-outline',
    support: 'support@zentacle.com',
  },
  {
    icon: 'phone-in-talk-outline',
    support: '+182312321323113123',
  },
  {
    icon: 'link-variant',
    support: 'www.zentacle.com',
  },
];

const HelpCenter: FunctionComponent<HelpCenterTypeProps> = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Icon name="chevron-back-outline" size={30} onPress={navigateBack} />
          <Text style={styles.headerText}>Help Center</Text>
          <View />
        </View>

        <View style={styles.helpBody}>
          <Text style={styles.helpText}>
            Do you have any questions or suggestions on how we could improve our
            app? Feel free to reach out to us
          </Text>
          <Text style={styles.helpText}>
            - we would love to get in touch with you.
          </Text>
        </View>

        <View style={styles.supportContainer}>
          {support.map((item, index) => (
            <View style={styles.support} key={index}>
              <MUIcon name={item.icon} size={30} />
              <Text style={styles.supportLink}>{item.support}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginHorizontal: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  helpBody: {
    marginTop: 30,
  },
  helpText: {
    fontSize: 16,
    lineHeight: 22,
  },
  supportContainer: {
    marginTop: 30,
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  supportLink: {
    marginLeft: 20,
    fontSize: 17,
  },
});

export default HelpCenter;