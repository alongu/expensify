// Promises can call resolve() and reject() method only once.
// resolve and reject methods can only receive 1 argument inside them (can be an object)
// promise.then() method will happen only after resolve successful, not if reject happened.
// reject() will cause an exception to be thrown?

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Alon',
            age: 30
        })
    }, 5000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
})

console.log('after');

// OUTPUT:
// 'before' and 'after' will be printed out, and after 5 seconds the 1 - data will be printed.

// Promise Chain! => we can add then() to another then().. it will get there only if resolve happened //
promise.then((data) => {
    console.log('1', data);
    return 'some data'; // if we return data -> the .then() call that will come after will have access to that value. we can also return a promise
}).then((someData) => {
    console.log('2');
    console.log(someData);
}).catch((error) => {
    console.log(error);
});