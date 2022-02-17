import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Form, Field } from 'react-final-form';

import SearchInput from '_components/ui/SearchInput';
import AutocompleteModal from './components/AutocompleteModal';
import SearchFiltersModal from './components/SearchFiltersModal';
import GradientText from '_components/ui/GradientText';
import DiveShopImage from '_assets/EcoCenter.jpeg';
import LocationImage from '_assets/LocationLargish.png';
import DiveSiteImage from '_assets/DiveSite5.jpeg';

import { destinations } from './utils';

// const WIDTH = Dimensions.get('window').width;

interface InitialValues {
  difficulty: string;
  preference: string;
  entry: string;
  maxDepth: number;
}

const Search = () => {
  const [autocompleteModalOpen, toggleAutocompleteModal] =
    React.useState(false);
  const [filtersModalopen, toggleFiltersModal] = React.useState(false);
  const recentSearches = ['beach', 'coral', 'dive', 'dive party', 'party'];

  const handleInputFocus = () => {
    toggleAutocompleteModal(true);
  };

  const handleToggleFiltersModal = () => {
    toggleFiltersModal(!filtersModalopen);
  };

  const initialValues: InitialValues = {
    difficulty: 'Beginner',
    preference: 'Scuba',
    entry: 'Shore',
    maxDepth: 18,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Search</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Form
          onSubmit={() => {}}
          initialValues={initialValues}
          render={({ values, form }) => {
            return (
              <View>
                <Field
                  name="search"
                  isVisible={autocompleteModalOpen}
                  component={AutocompleteModal}
                  closeModal={() => toggleAutocompleteModal(false)}
                />
                <Field
                  name="search"
                  component={SearchInput}
                  containerStyle={styles.searchInputContainer}
                  withFilterIcon
                  handleInputFocus={handleInputFocus}
                  onClickFilterIcon={handleToggleFiltersModal}
                />
                <SearchFiltersModal
                  isVisible={filtersModalopen}
                  closeModal={handleToggleFiltersModal}
                  reset={form.reset}
                />
              </View>
            );
          }}
        />

        <View style={styles.mainBody}>
          <View style={styles.recentSearchesContainer}>
            <Text style={styles.headerLabel}>Recent Searches</Text>
            <View style={styles.recentSearches}>
              {recentSearches.map((item, index) => (
                <View style={styles.recentSearch} key={index}>
                  <Text style={styles.recentSearchesText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.destinationsContainer}>
            <View style={styles.destinationLabelContainer}>
              <Text style={styles.headerLabel}>Destination</Text>
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
                style={styles.headerLabelGradient}>
                See All
              </GradientText>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.destinations}>
              {destinations.map((destination, index) => (
                <View style={styles.destination} key={index}>
                  <Image
                    source={destination.image}
                    style={styles.destinationImage}
                  />
                  <View style={styles.destinationTextContainer}>
                    <Text style={styles.destinationMainText}>
                      {destination.place}
                    </Text>
                    <Text style={styles.destinationSubtext}>
                      {destination.country}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.diveShopsContainer}>
            <View style={styles.diveShopLabelContainer}>
              <Text style={styles.headerLabel}>Destination</Text>
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
                style={styles.headerLabelGradient}>
                See All
              </GradientText>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.diveShops}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <View style={styles.diveShop} key={index}>
                  <Image source={DiveShopImage} style={styles.diveShopImage} />
                  <View style={styles.diveShopTextContainer}>
                    <Text style={styles.diveShopMainText}>
                      Ecologic Divers Center
                    </Text>
                    <View style={styles.diveShopLocationContainer}>
                      <Image
                        style={styles.locationImage}
                        source={LocationImage}
                      />
                      <Text style={styles.diveShopLocationText}>
                        East Bali Lighthouse
                      </Text>
                    </View>
                    <Text style={styles.diveShopSubtext}>
                      Diving Equipment Retail
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.diveSitesContainer}>
            <View style={styles.diveSiteLabelContainer}>
              <Text style={styles.headerLabel}>Popular Dive Sites</Text>
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
                style={styles.headerLabelGradient}>
                See All
              </GradientText>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.diveSites}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <View style={styles.diveSite} key={index}>
                  <Image source={DiveSiteImage} style={styles.diveSiteImage} />
                  <View style={styles.diveSiteTextContainer}>
                    <Text style={styles.diveSiteMainText}>Snorkel Shop</Text>
                    <View style={styles.diveSiteSubtextContainer}>
                      <Image
                        style={styles.locationImage}
                        source={LocationImage}
                      />
                      <Text numberOfLines={1} style={styles.diveSiteSubtext}>
                        East Bali Lighthouse
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  contentContainer: {
    marginBottom: Platform.OS === 'android' ? 100 : 65,
    paddingBottom: 50,
  },
  headerText: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    marginHorizontal: 25,
    marginTop: 30,
  },
  headerContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
  },
  searchInputContainer: {
    paddingVertical: 5,
  },
  headerLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 25,
  },
  mainBody: {},
  recentSearchesContainer: {
    marginTop: 30,
  },
  recentSearches: {
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 15,
  },
  recentSearchesText: {},
  recentSearch: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 15,
    borderRadius: 10,
  },
  destinationsContainer: {
    marginTop: 40,
  },
  destinations: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  destinationLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLabelGradient: {
    fontSize: 18,
    fontWeight: '400',
    marginRight: 25,
  },
  destination: {
    marginRight: 15,
  },
  destinationImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  destinationTextContainer: {
    marginTop: 10,
  },
  destinationMainText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  destinationSubtext: {
    fontSize: 14,
    color: 'grey',
  },
  diveShopsContainer: {
    marginTop: 40,
  },
  diveShops: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  diveShopLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  diveShop: {
    marginRight: 15,
    flexDirection: 'row',
  },
  diveShopImage: {
    width: 80,
    height: 85,
    borderRadius: 8,
  },
  diveShopTextContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  diveShopMainText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  diveShopSubtext: {
    fontSize: 14,
    color: 'grey',
  },
  diveShopLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diveShopLocationText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 10,
  },
  locationImage: {
    width: 15,
    height: 18,
  },
  diveSitesContainer: {
    marginTop: 40,
    marginBottom: 30,
  },
  diveSites: {
    paddingLeft: 25,
    paddingRight: 10,
    marginTop: 10,
  },
  diveSiteLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  diveSite: {
    marginRight: 15,
  },
  diveSiteImage: {
    width: 150,
    height: 160,
    borderRadius: 8,
  },
  diveSiteTextContainer: {
    marginTop: 10,
  },
  diveSiteMainText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  diveSiteSubtext: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 10,
    flex: 1,
    width: 100,
  },
  diveSiteSubtextContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default Search;
