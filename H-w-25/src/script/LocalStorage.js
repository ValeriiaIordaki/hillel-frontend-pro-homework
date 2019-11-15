export class LocalStorage{
    constructor(){}
    setDataLS(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }
    getDataLS(name){
        const data = localStorage.getItem(name)
        return JSON.parse(data);
    }
    getActualData(){
        return this.getDataLS('stickers:') || [];
    }
}
