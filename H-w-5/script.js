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
    } else{
        alert('Arguments charToFind and charToReplace must have length=1!');
    }
    return inputString;
}

let result = replaceAll(787878787878, 8, 'f');
alert(result);
