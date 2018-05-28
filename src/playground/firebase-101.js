// other events to subscribe:
// child_removed //
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});
// child_changed //
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});
// child_added //
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// We are getting the data from the db using snapshot.val(), but in arrays of objects it returns in a format not good for us.
// That is why we are making a manipulation here
database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        console.log(expenses);
    });

// on is doing a subscription, once only gets the data once

// firebase does NOT support array //
// it does not throw an error, but it converts the data to objects with indexes 0,1,2 ... etc. it gets converted to objects.
// we want to generate a random id - using push command, and this will be OUR WAY to Support List<Object>...
database.ref('notes').push({
    title: 'Course Topics',
    body: 'To Do'
});

// Reading data from firebase //
database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is ${val.job.title} as ${val.job.company}`);
});

// Remove data => using remove. for exmpale:
  database.ref()
    .remove()
    .then(() => {
        console.log('Data was removed');
    }).catch((e) => {
        console.log('Did not remove data', e);
    });

// Updating data in firebase - using the update method //
database.ref().update({
    stressLevel: 9,
    'job/company:': 'Amazon',
    'location/city': 'Seattle'
});