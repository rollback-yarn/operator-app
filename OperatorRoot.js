import { Platform, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { CreelSideContext, CreelSideContextProvider } from './contexts/CreelSideContext';
import React, { useEffect, useContext } from 'react';
import apiClient from './services/apiClient'

export default function OperatorRoot() {


  const [creelSides, setCreelSides] = useContext(CreelSideContext);
  useEffect(() => {
    (async () => {

      const cs = await apiClient.getCreelSides();
      setCreelSides(cs);

    })()
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <AppNavigator />
    </>
  )

}
