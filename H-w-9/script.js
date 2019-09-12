'user strict'

const addNoteform = document.querySelector('#addNoteForm');
let notesList = document.querySelector('#notesList');
const noteInput = document.querySelector('#noteInput');
const deletNote = document.querySelector('#deletNote').innerHTML;


notesList.addEventListener('click', onNoteClick);
addNoteform.addEventListener('submit', onFormAddNoteSubmit);

function onFormAddNoteSubmit(e){
    e.preventDefault();

    let li;
    createNote(li);

    cleanInput();
}

function createNote(node){
    node = creatTag(node);
    addTag(node, notesList);

    getDescriptionNote(node);
}

function creatTag(tag){
    tag = document.createElement('tag');
    return tag;
}

function addTag(tag, parentTag){
    parentTag.appendChild(tag);
}

function getDescriptionNote(elem){
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
