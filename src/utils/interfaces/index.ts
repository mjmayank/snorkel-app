import { NavigatorScreenParams } from '@react-navigation/native';

import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import type { Spot } from './data/spot';

export type AuthtackParamList = {
  Landing: undefined;
  SignIn: undefined;
  EmailSignUp: undefined;
};

export type OnboardingStackParamList = {
  ChooseUserName: undefined;
  ChooseAvatar: undefined;
  CameraPermissions: undefined;
  LocationPermissions: undefined;
  MeasurementType: undefined;
  ActivityType: undefined;
};

export type ExploreStackParamList = {
  DiveSite: {
    diveSpot: Spot;
  };
  DiveShop: undefined;
  Map: {
    coords: {
      lat: number;
      lng: number;
    };
  };
  Reviews: undefined;
};

export type ProfileStackParamList = {
  // Profile: undefined;
};

export type SearchStackParamList = {
  // Search: undefined;
};

export type LogsStackParamList = {
  // Logs: undefined;
};

export type LogsFormStackParamList = {
  SimpleDiveLogsForm: undefined;
  AdvancedDiveLogsForm: undefined;
};

export type AppTabsParamList = {
  Explore: undefined;
  Profile: undefined;
  Search: undefined;
  Logs: undefined;
  LogsForm: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthtackParamList>;
  OnBoarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: NavigatorScreenParams<AppTabsParamList>;
  ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  SearchStack: NavigatorScreenParams<SearchStackParamList>;
  LogsStack: NavigatorScreenParams<LogsStackParamList>;
  LogsFormStack: NavigatorScreenParams<LogsFormStackParamList>;
};

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
