function swapPairsWithSameSum(arr1, arr2) {
    const sumArr1 = arr1.reduce((acc, val) => acc + val, 0);
    const sumArr2 = arr2.reduce((acc, val) => acc + val, 0);
  
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        const newSumArr1 = sumArr1 - arr1[i] + arr2[j];
        const newSumArr2 = sumArr2 - arr2[j] + arr1[i];
  
        if (newSumArr1 === sumArr2 && newSumArr2 === sumArr1) {
          const temp = arr1[i];
          arr1[i] = arr2[j];
          arr2[j] = temp;
  
          return { arr1, arr2 };
        }
      }
    }
  
    return null;
  }
  
  // Example usage
  const arr1 = [2, 3, 0, 5];
  const arr2 = [2, 4, 1, 5];
  
  const result = swapPairsWithSameSum(arr1, arr2);
  
  if (result) {
    console.log('Swapped Arrays:');
    console.log('arr1:', result.arr1);
    console.log('arr2:', result.arr2);
  } else {
    console.log('No valid swap found.');
  }
  