import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const RandomNumber = props => {
  const { value, setSelectedNumbers, selectedNumbers, index, gameStatus } = props;

  const handleSelectNumber = (index) => {
    setSelectedNumbers([...selectedNumbers, index]);
  };

  const isSelected = selectedNumbers.includes(index);

  return (
    <TouchableOpacity
      style={[
        styles.random,
        isSelected && styles.selected
      ]}
      onPress={() => handleSelectNumber(index)}
      disabled={isSelected || ['WON', 'LOST'].includes(gameStatus)}
    >
      <Text style={styles.randomText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  random: {
    width: '35%',
    backgroundColor: '#aaa',
    marginTop: 40
  },
  randomText: {
    textAlign: 'center',
    fontSize: 35,
  },
  selected: {
    opacity: 0.4,
  }
});

RandomNumber.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  selectedNumbers: PropTypes.array.isRequired,
  setSelectedNumbers: PropTypes.func.isRequired,
  gameStatus: PropTypes.string.isRequired
};

export default RandomNumber;