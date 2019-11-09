import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, RefreshControl, View, Text, TouchableOpacity, Picker } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { CreelSideContext } from '../contexts/CreelSideContext';
import apiClient from '../services/apiClient'
import { COLORS } from '../globalColors';
import moment from 'moment';
import { AppText } from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import Fade from '../components/Fade';


export default function FindCreels({ navigation }) {

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showing, setShowing] = useState(false);

  const { params: routeParams } = navigation;
  const machineNameFromRoute = routeParams && routeParams.machine_name;
  useEffect(() => {
    if (machineNameFromRoute) {
      setSelectedMachine(machineNameFromRoute)
    }
  }, [machineNameFromRoute]);

  const [creelSides] = useContext(CreelSideContext);
  const machines = useMemo(() => {
    return creelSides.reduce((red, cs) => {
      const { machine_name: machineName } = cs;
      if (red.indexOf(machineName) === -1) {
        red.push(machineName);
      }
      return red;
    }, []);
  }, [creelSides]);

  useEffect(() => {
    if (selectedMachine === null && machines.length) {
      setSelectedMachine(machines[0]);
    }
  }, [selectedMachine, setSelectedMachine, machines])


  return (
    <View style={styles.container}>
      <AppText
        numberOfLines={3}
        style={{
          padding: 10,
          fontSize: 18,
        }}
      >Select One Machine Below. When you click on "Find Bobbles", all Carts that contain
        Bobbles produced by the
        selected machine will light up.
      </AppText>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Picker
          selectedValue={selectedMachine}
          enabled={!showing}
          style={{
            height: 50,
          }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedMachine(itemValue)
          }>
          {machines.map(machine => {
            return <Picker.Item key={machine} label={machine} value={machine} />
          })}
        </Picker>
      </View>
      <View
        style={{
          marginTop: 'auto',
        }}
      >
        <Fade visible={showing}>
          <AppText
            numberOfLines={2}
            style={{
              padding: 10,
              fontFamily: 'Arial',
              fontWeight: 'bold',
              color: COLORS.RED,
            }}
          >
            Lights are showing creels with bobbins from {selectedMachine}
          </AppText>
        </Fade>
        <TouchableOpacity
          onPress={() => {
            setShowing(!showing)
          }}
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.RED,
            marginBottom: 20,
            padding: 20,
            alignItems: 'center',
            height: 80,
          }}
        >
          <Ionicons
            name={'ios-radio'}
            color={'white'}
            size={26}
          />
          <AppText
            numberOfLines={2}
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 20
            }}
          >
            {showing ?
              'Turn off lights' :
              `Show Bobbins produced by\n${selectedMachine}`}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

FindCreels.navigationOptions = {
  title: 'Find Creel',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: COLORS.GREY,
  },

});
