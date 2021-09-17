// Get array from reponse
var tiktok_id_array = pm.response.json().args.tiktok_id_array;
console.log(tiktok_id_array);

// Get the length of the array
var idArrayLength = tiktok_id_array.length;

// Store the array length in the environment
pm.environment.set('idArrayLength',idArrayLength);
// Store the stringified idArray in the environment
pm.environment.set('tiktok_id_array',JSON.stringify(tiktok_id_array));