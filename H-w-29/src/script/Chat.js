export default class Chat{
    constructor(config){
        this.config = config;
        this.websocket = new WebSocket('ws://fep-app.herokuapp.com');

        this.addEventListener(config.name);
    }
    
    send(name,type, message){
        if(this.websocket.readyState !== this.websocket.OPEN) return;
            this.websocket.send(
                JSON.stringify({
                    name,
                    type,
                    message
                })
            );
    }
    message(name, message){
        this.send(name, 'message', message);
    }
    addEventListener(name){
        this.websocket.onopen = () => {
            this.send(name, 'connected', 'Connected')
        }
   
        this.websocket.onclose = () => {
            this.send('You', 'disconnected', 'Disconnected')
        }
   
        this.websocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.config.onMessage(data);
        }
    }
}