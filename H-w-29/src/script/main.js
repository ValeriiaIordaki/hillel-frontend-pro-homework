import '../assets/styles.css';
import '../assets/reset.css';

import $ from 'jquery';
import Chat from './Chat';

const talk = new Chat({
    onMessage: addLog
})


const $log = $('#log');
const $input = $('#message');
const name = 'user';


$('#messageForm').on('submit', sendMessage);
talk.onopen(name);


function addLog(message) {
    $log.append(
        `<div class="${message.type}">${message.name}: ${message.message}</div>`
    );
}

function sendMessage(e) {
    e.preventDefault();
    const message = $input.val();
    // talk.send(name, 'message', message);
    talk.message(name,  message);
    $input.val('');
}