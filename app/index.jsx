import { SafeAreaProvider } from 'react-native-safe-area-context';
import GameScreen from '../src/screens/GameScreen';

export default function Index() {
  return (
    <SafeAreaProvider>
      <GameScreen />
    </SafeAreaProvider>
  );
}
