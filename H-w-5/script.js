'user strict'

function replaceAll(inputString, charToFind, charToReplace){
    inputString = String(inputString);
    charToFind = String(charToFind);
    charToReplace = String(charToReplace);

    if (charToFind.length == 1 && charToReplace.length == 1) {
        let index = inputString.indexOf(charToFind);

        if (index >= 0) {
            return replaceAll(
                inputString.replace(charToFind, charToReplace),
                charToFind, 
                charToReplace
            );
        }

        alert('Result: ' + inputString);
    } else{
        alert('Arguments charToFind and charToReplace must have length=1!');
    }
}

replaceAll(78655888, 8, 'f');
