import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import InfoScreen from './src/screens/Info';
import FormEntryScreen from './src/screens/Form';
import SelectMapScreen from './src/screens/SelectMap';
import DetailScreen from './src/screens/Detail';
import ShowMap from './src/screens/ShowMap';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ presentation: 'transparentModal', headerTitleAlign: "center" }} initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Info' component={InfoScreen} options={{ headerBackVisible: true }} />
        <Stack.Screen name='Form' component={FormEntryScreen} options={{ headerBackVisible: true }} />
        <Stack.Screen name='SelectMap' component={SelectMapScreen} options={{ headerBackVisible: true }} />
        <Stack.Screen name='Detail' component={DetailScreen} options={{ headerBackVisible: true }} />
        <Stack.Screen name='ShowMap' component={ShowMap} options={{ headerBackVisible: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}