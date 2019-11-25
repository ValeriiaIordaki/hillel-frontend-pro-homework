import '../assets/styles.css';
import '../assets/reset.css';

import $ from 'jquery';
import Chat from './Chat';

const $log = $('#log');
const $input = $('#message');
const name = 'user';

const talk = new Chat({
    onMessage: addLog,
    name
})

$('#messageForm').on('submit', sendMessage);

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