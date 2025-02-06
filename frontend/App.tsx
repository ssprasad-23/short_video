import React from 'react';
import { SafeAreaView, StatusBar, View} from 'react-native';
import Home from './src/screens/home';
import LoginPage from './src/screens/loginPage';


function App(): React.JSX.Element {  
  return (
    <>
      <View>
        {/* <Home/> */}
        <LoginPage/>
      </View>
    </>
  );
}


export default App;
