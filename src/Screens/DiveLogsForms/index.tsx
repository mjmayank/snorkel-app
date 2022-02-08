import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Form } from 'react-final-form';
import validate from 'validate.js';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import type { FormApi } from 'final-form';

import type {
  RootStackParamList,
  LogsFormStackParamList,
} from '_utils/interfaces';

import FormStates from './components/FormStates';
import Footer from './components/FormFooter';

import { simpleformStages as stages } from './utils/utils';
import Location from './forms/simple/Location';
import Rating from './forms/simple/Rating';
import Name from './forms/simple/Name';
import Notes from './forms/simple/Notes';
import Review from './forms/simple/Review';
import ExitModal from './components/ExitModal';

import type { SimpleFormInitialValues as InitialValues } from '_utils/interfaces/data/logs';

type SimpleDiveLogsFormsNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<LogsFormStackParamList, 'SimpleDiveLogsForm'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface SimpleDiveLogsFormsProps {
  navigation: SimpleDiveLogsFormsNavigationProps;
}

const SimpleDiveLogsForms: FunctionComponent<
  SimpleDiveLogsFormsProps
> = props => {
  const [page, switchPage] = React.useState(0);
  const [modalIsOpen, toggleModal] = React.useState(false);
  let formRef = React.useRef<FormApi>();

  const goBack = () => {
    props.navigation.goBack();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const modalAction = () => {
    toggleModal(false);
    goBack();
  };

  const modalCancelAction = () => {
    toggleModal(false);
  };

  const navigateToAdvancedDiveForm = (formvalues: InitialValues) => {
    props.navigation.navigate('LogsFormStack', {
      screen: 'AdvancedDiveLogsForm',
      params: {
        simpleDiveLog: formvalues,
      },
    });
  };

  const constraints = {};
  const initialValues: InitialValues = {
    rating: 0,
    difficulty: 'Beginner',
  };

  React.useEffect(() => {
    return props.navigation.addListener('blur', () => {
      switchPage(0);
      formRef.current?.reset();
    });
  }, [props.navigation]);

  const canMoveToNextPage = (
    currentPage: number,
    values: InitialValues,
  ): boolean => {
    switch (currentPage) {
      case 0:
        return true;
      case 1:
        return !!(values.rating && values.difficulty);
      case 2:
        return !!values.name;
      case 3:
        return !!values.note;
      default:
        return true;
    }
  };

  const next = () => {
    switchPage(page + 1);
  };

  const goToPage = (target: number) => {
    switchPage(target);
  };

  const previous = () => {
    switchPage(page - 1);
  };

  return (
    <Form
      validate={values => validate(values, constraints)}
      onSubmit={() => {}}
      initialValues={initialValues}
      render={({ values, handleSubmit, submitting, pristine, form }) => {
        // console.log(
        //   'values',
        //   values,
        //   page,
        //   canMoveToNextPage(page, values as InitialValues),
        // );
        formRef.current = form;

        const showForms = (): JSX.Element => {
          switch (page) {
            case 0:
              return <Location />;
            case 1:
              return <Rating />;
            case 2:
              return <Name />;
            case 3:
              return <Notes />;
            default:
              return (
                <Review
                  navigateToAdvancedDiveForm={() =>
                    navigateToAdvancedDiveForm(values as InitialValues)
                  }
                  formValues={values as InitialValues}
                />
              );
          }
        };
        return (
          <SafeAreaView style={styles.container}>
            <ExitModal
              subtext="On exit, all dive log information you entered will be deleted."
              isVisible={modalIsOpen}
              modalAction={modalAction}
              modalCancelAction={modalCancelAction}
              actionText="Exit"
              cancelActionText="Cancel"
            />
            <ScrollView
              style={[
                styles.scrollContainer,
                page !== stages.length && {
                  marginBottom: Platform.OS === 'android' ? 114 : 80,
                },
              ]}>
              <View style={styles.headerContainer}>
                {page > 0 && page !== stages.length ? (
                  <TouchableWithoutFeedback onPress={previous}>
                    <Icon
                      name="chevron-back-outline"
                      color="black"
                      size={30}
                      style={styles.prev}
                    />
                  </TouchableWithoutFeedback>
                ) : (
                  <View style={styles.prevPlaceholder} />
                )}
                <View />
                <Text
                  style={[styles.header, page === 0 && { marginLeft: -20 }]}>
                  {page === stages.length
                    ? 'Dive Log Created'
                    : 'Create Dive Log'}
                </Text>
                <TouchableWithoutFeedback
                  onPress={page === stages.length ? goBack : openModal}>
                  <Icon
                    style={styles.back}
                    name="close-outline"
                    color="black"
                    size={30}
                  />
                </TouchableWithoutFeedback>
              </View>

              {!!(page !== stages.length) && (
                <FormStates
                  goToPage={(target: number) => {
                    canMoveToNextPage(target - 1, values as InitialValues)
                      ? goToPage(target)
                      : () => {};
                  }}
                  activeId={page}
                  stages={stages}
                />
              )}

              {showForms()}
            </ScrollView>
            {page === stages.length ? (
              <View />
            ) : (
              <Footer
                next={next}
                disabled={!canMoveToNextPage(page, values as InitialValues)}
                text={page === stages.length - 1 ? 'Complete' : 'Continue'}
              />
            )}
          </SafeAreaView>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  scrollContainer: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 25,
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
  prevPlaceholder: {
    width: 30,
    position: 'absolute',
    left: 0,
  },
  prev: {
    position: 'absolute',
    left: 0,
  },
  back: {
    position: 'absolute',
    right: 0,
  },
});

export default SimpleDiveLogsForms;
