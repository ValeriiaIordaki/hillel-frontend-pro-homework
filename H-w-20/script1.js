'use strict'
class StickersBoard{
    static BTTN_DEL_CLASS = 'sticker-del-bttn';
    // static BTTN_PULL_OVER_CLASS = 'sticker-pull-over';
    // static POSITION_ABSOLUTE_CLASS = 'position';

    static  board = document.getElementById('board');
    static stickersFormInput = document.getElementById('sticker-form');
    static stickerInput = document.getElementById('sticker-input');
    static stickerTemp = document.getElementById('sticker-temp').innerHTML;
    static stickersContainer = document.getElementById('stickers-container');
    
    constructor(){
        this.bindEventListeners();
        this.dataStickers = this.getActualData();
        this.init();
    }

    init(){
        const arrayData = this.getActualData() || [];
        arrayData.map(StickersBoard.renderSticker);
        this.setDataLS();
    }
    
    bindEventListeners(){
        StickersBoard.stickersFormInput.addEventListener('submit', this.onStickersFormSubmit.bind(this));
        StickersBoard.stickersContainer.addEventListener('input', this.onStickersInputBlur.bind(this));
        StickersBoard.stickersContainer.addEventListener('click', this.onStickerClick.bind(this));
    }
    onStickersFormSubmit(e){
        e.target.stopPropagation;
        this.createSticker();
        StickersBoard.stickersFormInput.reset();
    }
    onStickersInputBlur(e){
        e.target.stopPropagation;
        const elemChangeInLS = this.getElemActiveInLS(e.target);
        switch(true){
        case e.target.matches('[name="title-sticker"]'):
            elemChangeInLS.title = e.target.value;
            break;
        case  e.target.matches('[name="text-sticker"]'):
            elemChangeInLS.text = e.target.value;
            break;
        };
        this.setDataLS();
    }
    onStickerClick(e){
        switch(true){
            case e.target.classList.contains(StickersBoard.BTTN_DEL_CLASS):
                this.delElem(e.target);
                this.resetElemLS(e.target);
                break;
    }
    }
    getActualData(){
        return JSON.parse(this.getDataLS()) || [];
    }
    delElem(target){
        const changeSticker = StickersBoard.getParentContainer(target,'.sticker-container');
        changeSticker.remove()
    }
    resetElemLS(target){
        const elemDeletInLS = this.getElemActiveInLS(target);
        this.dataStickers = this.dataStickers.filter(el => el !== elemDeletInLS);
        this.setDataLS();
    }
    getElemActiveInLS(target){
        const changeSticker = StickersBoard.getParentContainer(target,'.sticker-container');
        return  this.dataStickers.find(el => el.id == changeSticker.dataset.stickerId);
    }
    setDataLS(){
        localStorage.setItem('stickers:', JSON.stringify(this.dataStickers))
    }
    createSticker(){
        const initialObj = StickersBoard.getStickersInitialState(StickersBoard.stickerInput.value);
        const elem = StickersBoard.renderSticker(initialObj);
        this.dataStickers.push(initialObj);
        this.setDataLS();
    }
    getDataLS(){
        return localStorage.getItem('stickers:');
    }
    
    static renderSticker(titleElem){
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
    static getParentContainer(target,css){
        return target.closest(css)
    }
}

const stickers = new StickersBoard();
