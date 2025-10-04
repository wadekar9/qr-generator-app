import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppThemeProvider from '$context/app-theme.context';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from '$navigation/root-stack-navigator';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const App = () => {
  return (
    <AppThemeProvider>
      <SafeAreaProvider>
        <KeyboardProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootStackNavigator />
          </GestureHandlerRootView>
        </KeyboardProvider>
      </SafeAreaProvider>

      <FlashMessage position="top" />
    </AppThemeProvider>
  );
};

export default App;
