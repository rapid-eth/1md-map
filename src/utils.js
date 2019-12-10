/* 
 * Return a random slice of an arbitrary array
 * arr: the array to slice
 * size: how many elements to return
*/

export const getRandomSubarray = (arr, size) => {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}