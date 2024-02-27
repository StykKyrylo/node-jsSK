const fs = require('fs');

fs.appendFile('task02.txt', 'Hello, world!\n', (err) => {
    if (err) throw err;

    console.log('Success!');
});