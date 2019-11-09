import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl, View, Text, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { CreelSideContext } from '../contexts/CreelSideContext';
import apiClient from '../services/apiClient'
import { COLORS } from '../globalColors';
import moment from 'moment';
import { AppText } from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';


export default function LinksScreen({ navigation: { navigate } }) {

  const [refreshing, setRefreshing] = useState(false);
  const [creelSides, setCreelSides] = useContext(CreelSideContext);
  const loadCreelSides = useCallback(async () => {

    setRefreshing(true);
    const cs = await apiClient.getCreelSides();
    setCreelSides(cs);
    setRefreshing(false);


  }, []);
  return (
    <View
      style={styles.container}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadCreelSides}
          />
        }
      >
        {creelSides.map(creelSide => {
          const { new: neww } = creelSide;
          return (
            <View
              key={creelSide.id}
              style={{
                ...styles.creelListItem,
                borderColor: neww ? COLORS.RED : 'transparent',
                borderWidth: 2,
              }}
            >

              <View
                style={styles.creelInfo}
              >

                <View
                  style={styles.firstInfo}
                >
                  <AppText
                    style={styles.created}
                  >
                    {moment(creelSide.created_at, 'X').format('L LTS')}
                  </AppText>
                  <AppText
                    style={styles.machine}
                  >
                    {creelSide.machine_name}
                  </AppText>
                </View>
                <View style={styles.where}>
                  <AppText style={styles.whereText}>
                    {creelSide.creel_id + ' / ' + creelSide.side}
                  </AppText>
                </View>

              </View>

              <TouchableOpacity
                onPress={() => {
                  navigate('FindCreels', { machine_name: creelSide.machine_name })
                }}
                style={styles.creelCTA}
              >
                <Ionicons
                  name={'ios-radio'}
                  color={'white'}
                  size={26}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

LinksScreen.navigationOptions = {
  // header: null,
  title: 'All Creels',
  // headerStyle: {
  //   backgroundColor: COLORS.GREY,
  //   borderBottomWidth: 0,
  // },

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 60,
    paddingTop: 15,
    backgroundColor: COLORS.GREY,
  },
  creelListItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,

    marginVertical: 5,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  creelInfo: {
    padding: 10,
    // backgroundColor: COLORS.GREY,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexGrow: 1,
  },
  firstInfo: {
    flexGrow: 10
  },

  created: {
    fontSize: 10,
    marginBottom: 5
  },
  machine: {
    fontSize: 16
  },
  creelCTA: {
    backgroundColor: COLORS.RED,
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  where: {
    alignSelf: 'center'
  },
  whereText: {
    fontSize: 20
  }

});
