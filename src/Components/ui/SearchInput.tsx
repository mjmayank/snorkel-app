import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { FunctionComponent } from 'react';
import type {
  ViewStyle,
  TextStyle,
  ColorValue,
  // NativeSyntheticEvent,
  // TextInputFocusEventData,
  // TextInputChangeEventData,
} from 'react-native';

import FilterIcon from '_assets/Filter.png';

const HEIGHT = Dimensions.get('window').height;

interface BaseProps {
  style?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  onClickFilterIcon?: () => void;
}

type FilteredSearchInputProps = Omit<
  BaseProps,
  'containerStyle' | 'onClickFilterIcon'
>;

console.log('hi', HEIGHT);

const SearchInput: FunctionComponent<BaseProps> = props => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Icon name="search" size={22} color="grey" />
      <TextInput
        {...(props as unknown as FilteredSearchInputProps)}
        style={styles.input}
      />
      <TouchableWithoutFeedback onPress={props.onClickFilterIcon}>
        <Image source={FilterIcon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 25,
    borderRadius: 12,
    marginTop: HEIGHT < 705 ? HEIGHT * 0.045 : HEIGHT * 0.055,
  },
  input: {
    width: '80%',
  },
});

export default SearchInput;