import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '_utils/interfaces';

import Landing from '_screens/Onboarding';
import SignIn from '_screens/Onboarding/SignIn';
import EmailSignUp from '_screens/Onboarding/EmailSignUp';

const Navigator: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
