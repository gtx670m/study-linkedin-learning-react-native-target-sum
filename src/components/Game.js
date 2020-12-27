import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash/shuffle';

const Game = (props) => {
  const { randomNumberCount = 0, initialSeconds = 0, resetGame } = props;
  const [gameStatus, setGameStatus] = useState('PLAYING');
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [randomNumbers, setRandomNumbers] = useState(
    Array.from({ length: randomNumberCount }).map(() =>
      Math.floor(Math.random() * 5 + 10)
    )
  );
  const [target] = useState(() => {
    return randomNumbers
      .slice(0, randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);
  });
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  useEffect(() => {
    setRandomNumbers(shuffle(randomNumbers));
  }, []);

  useEffect(() => {
    const sumResult = selectedNumbers.reduce(
      (acc, curr) => acc + randomNumbers[curr],
      0
    );
    if (sumResult < target) {
      setGameStatus('PLAYING');
    } else if (sumResult === target) {
      setGameStatus('WON');
    } else {
      setGameStatus('LOST');
    }
  }, [selectedNumbers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);
    if (remainingSeconds === 0) {
      if (gameStatus === 'PLAYING') {
        setGameStatus('LOST');
      }
      clearInterval(interval);
    }
    if (['WON', 'LOST'].includes(gameStatus)) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [remainingSeconds]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text
          style={[
            styles.target,
            gameStatus === 'WON' && styles.won,
            gameStatus === 'LOST' && styles.lost,
          ]}>
          {target}
        </Text>
        <View style={styles.randomContainer}>
          {randomNumbers.map((item, index) => (
            <RandomNumber
              key={index}
              index={index}
              value={item}
              selectedNumbers={selectedNumbers}
              setSelectedNumbers={setSelectedNumbers}
              gameStatus={gameStatus}
            />
          ))}
        </View>
        {gameStatus === 'PLAYING' && (
          <View>
            <Text style={styles.timer}>{`${remainingSeconds}s`}</Text>
          </View>
        )}
        <View style={styles.resetBtn}>
          {['WON', 'LOST'].includes(gameStatus) && (
            <Button title="Play again" onPress={resetGame} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
  won: {
    backgroundColor: 'green',
  },
  lost: {
    backgroundColor: 'red',
  },
  randomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  random: {
    width: '35%',
    backgroundColor: '#aaa',
    marginTop: 40,
  },
  randomText: {
    textAlign: 'center',
    fontSize: 35,
  },
  timer: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 40,
  },
  resetBtn: {
    marginTop: 40
  }
});

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default Game;
