export default class Chat{
    constructor(config){
        this.config = config;
        this.websocket = new WebSocket('ws://fep-app.herokuapp.com');
        this.onmessage();
    }
    send(name,type, message){
        this.websocket.send(
            JSON.stringify({
                name,
                type,
                message
            })
        );
    }
    message(name, message){
        this.send(name,'message', message);
    }
    onopen(name){
        this.websocket.onopen = () => {this.send(name, 'connected', 'Connected')}
    }
    onmessage(){
        this.websocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.config.onMessage(data);
        }
    }
}