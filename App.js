import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import Box from './components/box';

export default function App() {

  
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState(null);

  function PlayBox(no) {
    return(
      <Box 
        no={no}
        boxInfo={{boxes, setBoxes}}
        chance={{ isXChance, setIsXChance }}
        winner={winner}
      />
    )
  }

  const winPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8] ,[2,4,6]
  ]

  function checkDraw()
  {
    for (var i=0; i < boxes.length ; i++)
    {
        if(boxes[i] == null)
        {
          return false;
        }
      
    }
    return true;
  }

  function calculateWin() {
    for (let i=0; i<winPosition.length; i++) {
      if( 
        boxes[winPosition[i][0]] !== null &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][1]]
        && boxes[winPosition[i][0]] === boxes[winPosition[i][2]]
       ) {
      //   setWinner(boxes[winPosition[i][0]]);
         alert('We have a winner !! And It is '+boxes[winPosition[i][0]]);
         return;
       }
      
    }
  
    if(checkDraw())
    {
      alert('Oops !! It is a draw');
    }
  }


  useEffect(() => {
    calculateWin();
  }, [isXChance])

  function resetValues() {
    setWinner(null);
    setBoxes(Array(9).fill(null));
    setIsXChance(true);
    movesCount = 0;
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.titleText}>Tic-<Text style={{color:'red'}}>Tac</Text>-Toe</Text>

      <View style={styles.featureContainer}>


       <Text style={styles.primaryText}>It's the turn of : <Text style={{color:'red'}}>{isXChance ? 'X' : 'O'}</Text></Text>
        
        
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
      <Ionicons 
          style={styles.resetIcon}
          name="reload-circle" 
          size={68} 
          color="black" 
          onPress={resetValues}
        />
    </View>
  );
}

 var movesCount = 0;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  rows: {
    flexDirection: 'row',
  },
  resetIcon: {
   marginTop: 40
  },
  featureContainer: {
    alignItems: 'center',
    display: 'flex' ,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  titleText:{
    fontSize: 56,
    marginBottom: 20
  },
  primaryText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'

  },
  winnerText: {
    color: 'darkorange',
    fontSize: 48,
  }
});