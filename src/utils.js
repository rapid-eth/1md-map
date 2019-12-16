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

export const distanceMeters = ($lat1, $lon1, $lat2, $lon2) => {
  const $x = deg2rad($lon1 - $lon2) * Math.cos(deg2rad($lat1));
  const $y = deg2rad($lat1 - $lat2);
  const $dist = 6371000.0 * Math.sqrt($x * $x + $y * $y);
  return $dist;
}

const deg2rad = (degrees) => {
  const pi = Math.PI;
  return degrees * (pi/180);
}