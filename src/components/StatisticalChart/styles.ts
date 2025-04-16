import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 