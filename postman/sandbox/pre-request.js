//check to see if a counter variable has been declared, and if so 
if(!pm.environment.has('counter'))
{
    pm.environment.set('counter',0);
}

//get the counter value
var counter = pm.environment.get('counter');

//parse the array we stored in the 1st request, since it gets stored as a string
var tiktok_id_array = JSON.parse(pm.environment.get('tiktok_id_array'));

//get the value of the idArray at the current iteration (counter)
var tiktok_id = tiktok_id_array[counter];

//store an environment variable with the value of the current id
//the {{id}} variable in the URL of this request will end up resolving to this value

pm.environment.set('tiktok_id',tiktok_id);

//incremement the counter, and store it in the environment
//counter++;
//pm.environment.set('counter',counter);