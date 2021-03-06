import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Button from '_components/ui/Buttons/Button';
import { isBelowHeightThreshold } from '_utils/constants';
import StockDiveShop from 'assets/stock-dive-shop.png';
import StockDiveShopLogo from 'assets/stock-dive-shop-logo.png';
import { DiveShopFull } from '_utils/interfaces/data/shops';

interface DiveShop {
  diveShop: DiveShopFull;
}

const DiveShopView: React.FunctionComponent<DiveShop> = ({ diveShop }) => {
  const [stampRequested, requestStamp] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {diveShop.logo_img ? (
          <Image
            source={{ uri: diveShop.logo_img }}
            style={styles.diveShopLogo}
          />
        ) : (
          <Image source={StockDiveShopLogo} style={styles.diveShopLogo} />
        )}
        <Text style={styles.label}>{diveShop.name}</Text>
      </View>
      <View style={styles.contentContainer}>
        {diveShop.logo_img ? (
          <Image
            source={{ uri: diveShop.logo_img }}
            style={styles.diveShopImage}
          />
        ) : (
          <Image source={StockDiveShop} style={styles.diveShopImage} />
        )}
      </View>
      <Button
        onPress={() => requestStamp(true)}
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
        {stampRequested ? 'Stamp Requested' : 'Request Stamp'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: 'black',
  },
  contentContainer: {
    backgroundColor: '#E6ECEF',
    height: 150,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 12,
    paddingVertical: isBelowHeightThreshold ? 12 : 16,
    marginHorizontal: 0,
    marginVertical: isBelowHeightThreshold ? 10 : 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  diveShopLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  diveShopImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default DiveShopView;
