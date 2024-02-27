const fs = require('fs');
const os = require('os');

fs.writeFile('task03.txt', `Hello, ${os.userInfo().username}!`, (err) => {
    if (err) throw err;

    console.log('Success!');
});