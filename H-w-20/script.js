'use strict'
class StickersBoard{
    static BTTN_DEL_CLASS = 'sticker-del-bttn';
    static STICKER_CONTAINER_CLASS = 'sticker-container';

    static board = document.getElementById('board');
    static stickerTitleInputForm = document.getElementById('sticker-form');
    static stickerTitleInput = document.getElementById('sticker-input');
    static stickerTemp = document.getElementById('sticker-temp').innerHTML;
    static stickersContainer = document.getElementById('stickers-container');

    constructor(){
        this.bindEventListeners();
        this.dataStickers = this.getActualData();
        this.init();
    }
    init(){
        const arrayData = this.getActualData();
        arrayData.map(StickersBoard.renderDataSticker);
        this.setDataLS('stickers:', this.dataStickers);
    }
    
    bindEventListeners(){
        StickersBoard.stickerTitleInputForm.addEventListener('submit', this.onStickersFormSubmit.bind(this));
        StickersBoard.stickersContainer.addEventListener('focusout', this.onStickersInputFocusout.bind(this));
        StickersBoard.stickersContainer.addEventListener('click', this.onStickerClick.bind(this));
    }
    onStickersFormSubmit(e){
        e.target.stopPropagation;
        this.createSticker();
        StickersBoard.stickerTitleInputForm.reset();
    }
    onStickersInputFocusout(e){
        const elemChangedInLS = this.getDataItem(e.target);
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
            case (e.target.classList.contains(StickersBoard.BTTN_DEL_CLASS)):
                this.delElem(e.target);
                this.removeDataFromLS(e.target);
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
    removeDataFromLS(eventElem){
        const deletedItemData = this.getDataItem(eventElem);
        this.dataStickers = this.dataStickers.filter(el => el !== deletedItemData);
        this.setDataLS('stickers:', this.dataStickers);
    }
    getDataItem(eventElem){
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
        const initialObj = StickersBoard.getInitialDataSticker(StickersBoard.stickerTitleInput.value);
        StickersBoard.renderDataSticker(initialObj);

        this.dataStickers.push(initialObj);
        this.setDataLS('stickers:', this.dataStickers);
    }

    static renderDataSticker(titleElem){
        const elem = StickersBoard.stickerTemp.replace('{{id-sticker}}', titleElem.id)
                                         .replace('{{title}}', titleElem.title)
                                         .replace('{{text}}', titleElem.text);
        StickersBoard.stickersContainer.insertAdjacentHTML('beforeend', elem);
    }
    static getInitialDataSticker(titleInput){
        return {
            title: titleInput,
            text: '',
            id: Date.now()
        }
    }
    static getParentContainer(eventElem,css){
        return eventElem.closest(css)
    }
}

const stickers = new StickersBoard();
