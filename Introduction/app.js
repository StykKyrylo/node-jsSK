const user = require("./user")
const yargs = require('yargs/yargs');


yargs(process.argv.slice(2))
    .command({
        command: 'list',
        desc: 'Get the list of languages',
        handler: () => {
            user.list();
        }
    })
    .command({
        command: "read",
        describe: "View the details of a particular language",
        builder: {
            title: {
                describe: "Language title",
                demandOption: true,
                type: "string",
            },
        },
        handler: (argv) => {
            user.read(argv.title)
        }
    })
    .command({
        command: "remove",
        describe: "remove new language",
        builder: {
            title: {
                describe: "Language title",
                demandOption: true,
                type: "string",
            },
        },
        handler: (argv) => {
            user.remove(argv.title)
        }
    })
    .command({
        command: 'add',
        describe: 'Add new language',
        builder: {
            title: {
                type: 'string',
                demandOption : true,
                describe: 'Language title'
            },
            level:
                {
                    describe: 'Level of Knowledge',
                    demandOption: true,
                    type: 'string'
                }
        },
        handler: (argv) => {
            user.add({title: argv.title, level: argv.level})
            console.log({title: argv.title, level: argv.level})
        }
    }).parse()
