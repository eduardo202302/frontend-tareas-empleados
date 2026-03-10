import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { employees } from '../../types/inputField';


const Card = ({ empleado, onPress }: { empleado: employees; onPress: () => void }) => {
    const iniciales = empleado.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>

      <View style={[styles.avatar]}>
        <Text style={styles.avatarText}>{iniciales}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{empleado.name}</Text>
        <Text style={styles.cardEmail}>{empleado.email}</Text>
        <View style={styles.cardRow}>
          <Ionicons name="call-outline" size={12} color="#9CA3AF" />
          <Text style={styles.cardDetail}>{empleado.telefono}</Text>
          <Ionicons name="cash-outline" size={12} color="#9CA3AF" style={{ marginLeft: 10 }} />
          <Text style={styles.cardDetail}>RD$ {empleado.sueldo.toLocaleString()}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: '#070303',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardInfo: {
        flex: 1,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    cardEmail: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 5,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetail: {
        fontSize: 12,
        color: '#6B7280',
        marginLeft: 5,
    },
})

export default Card;
