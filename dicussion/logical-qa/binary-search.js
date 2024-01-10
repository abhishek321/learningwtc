
function binarySearchFinal(arr,target){
    let right = arr.length-1;
    if (right<=0){
        return -1;
    }
    arr = arr.sort((a,b)=>a-b);
    let left = 0;
    while(left<=right){
        let  mid = Math.floor((left+right)/2);
        if(arr[mid]===target){
            return mid;
        }
        if(arr[mid]<target) left=mid+1;
        else right=mid-1;
    }
    
return -1;
}
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1; // Element not found
}

console.log("Running.........")

console.log('output:',binarySearch([
    1, 2, 3, 3,
    4, 5, 7
  ]
  ,4));

console.log('output1:',binarySearchFinal([2,3,1,4,5,3,7],4));