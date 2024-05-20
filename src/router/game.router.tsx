import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthRouteNames, GameRouteNames } from './route-names';
import { Text } from 'react-native'
import LobbyScreen from '../screens/game/Lobby.screen';
import TabelScreen from '../screens/game/Table.screen';
import LoginScreen from '../screens/auth/Login.screen'
import UserDetailsScreen from '../screens/auth/UserDetails.screen'

const GameStack = createNativeStackNavigator()

const gameRoutes = (
    <GameStack.Navigator>
        <GameStack.Screen name={GameRouteNames.LOBBY} component={LobbyScreen} options={{
            header: () => null,
        }}/>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TabelScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
        <GameStack.Screen name={AuthRouteNames.USERDETAILS} component={UserDetailsScreen} options={{
            headerTitle: (props) => <Text {...props}>My Profile</Text>
        }}/>
         <GameStack.Screen name={AuthRouteNames.LOGIN} component={LoginScreen} options={{
            headerTitle: (props) => <Text {...props}>Login</Text>
        }}/>
    </GameStack.Navigator>
)

export default gameRoutes;