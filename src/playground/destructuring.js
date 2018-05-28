// Destructuring is taking an object and destructure it to its pieces
// instead of using person.name, just use name
// it is also possible to rename while destructuring
// it is also possible to add a DEFAULT VALUE

const person = {
    name: 'Alon',
    age: 30,
    location: {
        city: 'Rehovot',
        temp: 35
    }
};

const { name = 'Anonymous', age } = person; // default value
console.log(`${name} is ${age}`);

const { city, temp: temperature } = person.location; // change the name of temp to temperature
console.log(temperature);

// Array destructuring //
const address = ['5 Tzipora Tov', 'Rehovot', 'Israel', '7650208'];
const [, city, state = 'Israel'] = address;
console.log(`You are in ${city} ${state}`);