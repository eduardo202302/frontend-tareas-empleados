import { View, Text, StyleSheet } from 'react-native';
import Form from './src/components/Form';
import StackNavigator from './src/components/navegation/StackNavigator';
import Toast from "react-native-toast-message";

export default function App() {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.content}>
          <StackNavigator />
        </View>
        <Toast 
          visibilityTime={3000}
          topOffset={60}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,              
    flexDirection: 'column', 
  },
  header: {
    height: 60,
    backgroundColor: '#0D316B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,             
    backgroundColor: '#ffff',
  },
});