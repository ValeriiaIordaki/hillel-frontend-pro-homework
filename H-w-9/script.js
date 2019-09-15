'user strict'

const addNoteform = document.querySelector('#addNoteForm');
let notesList = document.querySelector('#notesList');
const noteInput = document.querySelector('#noteInput');
const deletNote = document.querySelector('#deletNote').innerHTML;


notesList.addEventListener('click', onNoteClick);
addNoteform.addEventListener('submit', onFormAddNoteSubmit);

function onFormAddNoteSubmit(e){
    e.preventDefault();

    let li = 'li';
    createNote(li);

    cleanInput();
}

function createNote(node){
    node = creatTag(node);
    addTag(node, notesList);

    descriptionNote(node);
}

function creatTag(tag){
    return tag = document.createElement(tag);
}

function addTag(tag, parentTag){
    parentTag.appendChild(tag);
}

function descriptionNote(elem){
    elem.classList.add('note');
    elem.innerHTML = deletNote + noteInput.value;
}

function cleanInput(){
    noteInput.value = '';
}


function onNoteClick(e){
    switch(true){
       case e.target.classList.contains('note'):
            e.target.classList.toggle('noteSelect');
            break
       case e.target.classList.contains('delBtn'):        
            e.target.parentElement.remove();
            break
    }
}
