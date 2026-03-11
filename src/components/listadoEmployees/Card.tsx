import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { employees } from '../../types/inputField';

const Card = ({ empleado, onPress }: { empleado: employees; onPress: () => void }) => {
  const iniciales = empleado.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{iniciales}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{empleado.name}</Text>
        <Text style={styles.cardEmail}>{empleado.email}</Text>
        <View style={styles.cardRow}>
          <Ionicons name="call-outline" size={12} color="#7BA7C7" />
          <Text style={styles.cardDetail}>{empleado.telefono}</Text>
          <Ionicons name="cash-outline" size={12} color="#F5A623" style={{ marginLeft: 10 }} />
          <Text style={styles.cardDetail}>RD$ {empleado.sueldo.toLocaleString()}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#93C5FD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D6E8F7',
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A4F7A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#1A4F7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A4F7A',
  },
  cardEmail: {
    fontSize: 13,
    color: '#7BA7C7',
    marginBottom: 5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetail: {
    fontSize: 12,
    color: '#7BA7C7',
    marginLeft: 4,
  },
});

export default Card;