const fs = require('fs');

function userData() {
    const userJSON = fs.readFileSync('user.json', 'utf-8');
    return(JSON.parse(userJSON));
}

function add(language) {
    const user = userData();

    user.languages.push(language);

    fs.writeFileSync('user.json', JSON.stringify(user));
}

function list() {
    const user = userData();

    console.log("User programming languages list:");
    console.log(user.languages);
}

function read(searchedLanguage) {
    const user = userData();

    const languageObj = user.languages.find(lang => lang.title === searchedLanguage);

    if (!languageObj) {
        console.error(`Error: Language ${searchedLanguage.title} not found in languages list.`);
        return;
    }

    console.log(`Searched language: ${languageObj.title} | Level: ${languageObj.level}`);
}

function remove(searchedLanguage) {
    const user = userData();

    const languageObj = user.languages.find(lang => lang.title === searchedLanguage);
    const indexToRemove = user.languages.indexOf(languageObj);

    if (indexToRemove > -1) {
        user.languages.splice(indexToRemove, 1);
        fs.writeFileSync("user.json", JSON.stringify(user));
        console.log(`Removed ${searchedLanguage} from languages list.`);
    } else {
        console.error(`Error: Language ${searchedLanguage} not found in languages list.`);
    }
}

module.exports = {add, remove, list, read}