'use strict'
class StickersBoard{
    static BTTN_DEL_CLASS = 'sticker-del-bttn';
    static BTTN_MOVE_CLASS = 'bttn-move-sticker';
    static POSITION_RELATIVE_CLASS = 'position';
    static STICKER_CONTAINER_CLASS = 'sticker-container';

    static board = document.getElementById('board');
    static stickersFormInput = document.getElementById('sticker-form');
    static stickerInput = document.getElementById('sticker-input');
    static stickerTemp = document.getElementById('sticker-temp').innerHTML;
    static stickersContainer = document.getElementById('stickers-container');

    static bttnMoveSticker = document.getElementById('bttn-move-sticker');
    
    constructor(){
        this.bindEventListeners();
        this.dataStickers = this.getActualData();
        // this.coordinatesStickers = this.getActualСoordinates();
        this.init();
    }
    init(){
        const array = this.getActualData() || [];
        array.map(StickersBoard.renderStickerData);
        this.setDataLS('stickers:', this.dataStickers);
    }
    
    bindEventListeners(){
        StickersBoard.stickersFormInput.addEventListener('submit', this.onStickersFormSubmit.bind(this));
        StickersBoard.stickersContainer.addEventListener('focusout', this.onStickersInputBlur.bind(this));
        StickersBoard.stickersContainer.addEventListener('mousedown', this.onStickerClick.bind(this));
    }
    onStickersFormSubmit(e){
        e.target.stopPropagation;
        this.createSticker();
        StickersBoard.stickersFormInput.reset();
    }
    onStickersInputBlur(e){
        const elemChangedInLS = this.getDataActiveElem(e.target);
        switch(true){
        case e.target.matches('[name="title-sticker"]'):
            elemChangedInLS.title = e.target.value;
            break;
        case  e.target.matches('[name="text-sticker"]'):
            elemChangedInLS.text = e.target.value;
            break;
        };
        this.setDataLS('stickers:', this.dataStickers);
    }
    onStickerClick(e){
        switch(true){
            case (e.target.classList.contains(StickersBoard.BTTN_DEL_CLASS)) :
                this.delElem(e.target);
                this.resetDataFromLS(e.target);
                break;
            case (e.target.classList.contains(StickersBoard.BTTN_MOVE_CLASS)):
                const elem = StickersBoard.getParentContainer(e.target,'.sticker-container');
                this.moveAt(e.target.pageX, e.target.pageY, elem, e);

                StickersBoard.stickersContainer.addEventListener('mousemove', this.onStickerMousedown.bind(this));
                StickersBoard.stickersContainer.addEventListener('mouseup', this.onStickerMousedown.bind(this));
                break;
        }
    }
    getActualData(){
        return JSON.parse(this.getDataLS('stickers:')) || [];
    }
    delElem(eventElem){
        const changeSticker = StickersBoard.getParentContainer(eventElem,'.sticker-container');
        changeSticker.remove()
    }
    resetDataFromLS(eventElem){
        const elemDeletInLS = this.getDataActiveElem(eventElem);
        this.dataStickers = this.dataStickers.filter(el => el !== elemDeletInLS);
        this.setDataLS('stickers:', this.dataStickers);
    }
    getDataActiveElem(eventElem){
        const changeSticker = StickersBoard.getParentContainer(eventElem,'.sticker-container');
        return  this.dataStickers.find(el => el.id == changeSticker.dataset.stickerId);
    }
    setDataLS(name, data){
        localStorage.setItem(name, JSON.stringify(data));
    }
    getDataLS(name){
        return localStorage.getItem(name);
    }
    createSticker(){
        const initialObj = StickersBoard.getStickersInitialState(StickersBoard.stickerInput.value);
        StickersBoard.renderStickerData(initialObj);

        this.dataStickers.push(initialObj);
        this.setDataLS('stickers:', this.dataStickers);
    }

    static renderStickerData(titleElem){
        const elem = StickersBoard.stickerTemp.replace('{{id-sticker}}', titleElem.id)
                                         .replace('{{title}}', titleElem.title)
                                         .replace('{{text}}', titleElem.text);
        StickersBoard.stickersContainer.insertAdjacentHTML('beforeend', elem);
    }
    static getStickersInitialState(titleInput){
        return {
            title: titleInput,
            text: '',
            id: Date.now()
        }
    }
    static getParentContainer(eventElem,css){
        return eventElem.closest(css)
    }


    // additional task 
    onStickerMousedown(e){
        console.log('jjjjjj');
        const elem = StickersBoard.getParentContainer(e.target,'.sticker-container');
        this.moveAt(e.pageX , e.pageY, elem, e.target);

        elem.classList.add(StickersBoard.POSITION_RELATIVE_CLASS);

        // this.setDataLS('coordinates:', this.coordinatesStickers);
    }
    moveAt(pageX , pageY, elem){
        elem.style.top = pageX + 'px';
        console.log( elem.style.top )
        elem.style.left = pageY - elem.offsetHight + 'px';
    }
    onMouseUp(e){
        console.log('rrrrkar')
        e.target.removeEventListener('mousemove', this.onMouseMove);
    }
    // getActualСoordinates(){    static getSti    static getStickersInitialState(titleInput){
// ckersInitialState(titleInput){

    //     return this.getDataLS('coordinates:')||[];
    // }
    
    
    // static getStickersPosition(axisX, axisY){
    //     return {
    //         axisX,
    //         axisY,
    //     }
    // }
    

}
const stickers = new StickersBoard();
