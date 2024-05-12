
import { StyleSheet, Text, View } from 'react-native';
import Manager from './screen/Manager';
import ManagerProduct from './screen/ManagerProduct';
import BookDetail from './screen/BookDetail';
import ManagerUser from './screen/ManagerUser'
import DashBoard from './screen/DashBoard'

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Manager App CRM"
            component={Manager}
          />
          <Stack.Screen name="ManagerProduct" component={ManagerProduct} />
          <Stack.Screen name="ManagerUser" component={ManagerUser} />
          <Stack.Screen name="DashBoard" component={DashBoard} />
          <Stack.Screen name="BookDetail" component={BookDetail} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    // <View style={styles.container}>
    //   <Manager />
    // </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginBottom: 20,
    },

});
