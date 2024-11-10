import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Timer = () => {
  const [timers, setTimers] = useState([]);
  const maxTimers = 5;

  const addTimer = () => {
    if (timers.length < maxTimers) {
      setTimers([...timers, { id: Date.now(), time: 60, isRunning: false }]);
    } else {
      Alert.alert('Max Timers', 'You can only have up to 5 timers.');
    }
  };

  const toggleTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  const resetTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, time: 60, isRunning: false } : timer
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.time > 0) {
            return { ...timer, time: timer.time - 1 };
          } else if (timer.isRunning && timer.time === 0) {
            Alert.alert('Timer Done', 'One of your timers has reached zero.');
            return { ...timer, isRunning: false };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={addTimer}>
        <Text style={styles.addButtonText}>+ Add Timer</Text>
      </TouchableOpacity>
      <FlatList
        data={timers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Timer: {item.time}s</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.controlButton, item.isRunning ? styles.pauseButton : styles.startButton]}
                onPress={() => toggleTimer(item.id)}
              >
                <Text style={styles.buttonText}>{item.isRunning ? 'Pause' : 'Start'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.resetButton]}
                onPress={() => resetTimer(item.id)}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FFC107',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Timer;
