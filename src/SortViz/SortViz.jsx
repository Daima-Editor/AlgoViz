import React from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
//import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';

import './SortViz.css';

const ANIMATION_SPEED_MS = 3;

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    //We have an array stored in the state
    this.state = {
      array: [],
      arr2: [],
      arr3: [],
    };
  }

  // This componenents loads for the first time and resetArray is called 
  componentDidMount() {
    this.resetArray();
  }
 
  resetArray() {     // When using the generate new array method
    const array = [];
    const arr2 = [];
    const arr3 = [];
    for (let i = 0; i < 170; i++) {
      array.push(randomIntFromInterval(5, 500));
      arr2.push(randomIntFromInterval(5, 500));
      arr3.push(randomIntFromInterval(5, 500));
    }
    this.setState({array});   // Then it resets the state
    this.setState({arr2});
    this.setState({arr3});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    //const newAnimation = [];
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations2 = getQuickSortAnimations(this.state.arr2);
        for (let i = 0; i < animations2.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar2');
          setTimeout(() => {
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations2[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
  }

  bubbleSort() {
    const animations3 = getBubbleSortAnimations(this.state.arr3);
        for (let i = 0; i < animations3.length; i++) {
          //console.log(animations[i]);
          const arrayBars = document.getElementsByClassName('array-bar3');
          setTimeout(() => {
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations3[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
  }

  render() {
    const { array } = this.state;
    const { arr2 } = this.state;
    const { arr3 } = this.state; 

    return (
        <div className="array-container">
         {array.map((value, idx) => (
          <div className="array-bar" key={idx} style={{height: `${value}px`}}></div>
         ))}
         {arr2.map((value, idx) => (
          <div className="array-bar2" key={idx} style={{height: `${value}px`}}></div>
         ))}
         {array.map((value, idx) => (
          <div className="array-bar3" key={idx} style={{height: `${value}px`}}></div>
         ))}
         <button onClick={() => this.resetArray()}>Generate New Array</button>
         <button onClick={() => this.mergeSort()}>Merge Sort</button>
         <button onClick={() => this.quickSort()}>Quick Sort</button>
         <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

