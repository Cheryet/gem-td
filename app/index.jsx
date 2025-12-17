import { View } from 'react-native';
import GameScreen from '../src/screens/GameScreen';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GameScreen />
    </View>
  );
}
