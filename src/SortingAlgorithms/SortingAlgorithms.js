export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

export function getQuickSortAnimations(arr2) {
  const animations = [];
  if (arr2.length <= 1) return arr2;
  quickSortHelper(arr2, 0, arr2.length - 1, animations);
  console.log(arr2);

  return animations;
}

export function getBubbleSortAnimations(arr3) {
  const animations = [];
  if (arr3.length <= 1) return arr3;

  for(let i=0;i<arr3.length-1;i++){
    for(let j=0;j<arr3.length-i-1;j++){
      if(arr3[j]>arr3[j+1]){
        let temp = arr3[j+1];
        arr3[j+1] = arr3[j];
        arr3[j] = temp;
        animations.push([j,j+1,arr3[j],arr3[j+1]])  
      }
    }
  }
  console.log(arr3);
  return animations;
}


  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {

      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  

  function quickSortHelper(
    mainArray,
    startIdx,
    endIdx,
    animations,
  ) {
    if (startIdx < endIdx) {
      let pi = partition(mainArray, startIdx, endIdx, animations);
      quickSortHelper(mainArray, startIdx, pi - 1, animations);
      quickSortHelper(mainArray, pi + 1, endIdx, animations);
    }
  
    return animations;
  }
  
  function partition(
    mainArray,
    startIdx,
    endIdx,
    animations
  ) {
    const pivot = mainArray[endIdx];
    let i = startIdx - 1;
    for (let j = startIdx; j < endIdx; j++) {
      // If current element is smaller than the pivot 
      if (mainArray[j] < pivot) {
        i = i + 1;
  
        // swap arr[i] and arr[j] 
        const temp = mainArray[i];
        mainArray[i] = mainArray[j];
        mainArray[j] = temp;
        animations.push([i, j, mainArray[i], mainArray[j]]);
      }
    }
  
    // swap arr[i+1] and arr[high] (or pivot) 
    const temp = mainArray[i + 1];
    mainArray[i + 1] = mainArray[endIdx];
    mainArray[endIdx] = temp;
    animations.push([i + 1, endIdx, mainArray[i + 1], mainArray[endIdx]]);
  
  
    return i + 1;
  }