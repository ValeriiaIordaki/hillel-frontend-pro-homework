'use strict'
const GALLERRY_CONTAINER_CLASS = 'container';
const BUTTON_NEXT_CLASS = 'bttn-next';
const BUTTON_PREVIOUS_CLASS = 'bttn-previous';
const PHOTO_HIDDEN_CLASS = 'photo-hidden';
const PHOTO_SHOW_CLASS = 'photo-show';


class Gallery{
    constructor(elem) {
        this.elem = elem;
        this.interval;
        this.containerGallery; 
        this.onBtnNextClick = this.onBtnNextClick.bind(this);
        this.elem.classList.add('gallery');

        this.creatContainer();
        this.galleryInitialState();
        this.addButtn(this.containerGallery);
        this.listenersOfBttns();
        this.scrollGallery();
    }
    
    creatContainer(){
        const containerGallery = document.createElement('div');
        this.containerGallery = containerGallery;
        this.elem.before(containerGallery);
        containerGallery.append(this.elem);
        containerGallery.classList.add(GALLERRY_CONTAINER_CLASS);
    }
    creatButton(classBttn){
        const button = document.createElement('button');
        button.classList.add(classBttn);
        return button;
    }
    addButtn(containerParent){
        containerParent.append(this.creatButton(BUTTON_NEXT_CLASS));
        containerParent.prepend(this.creatButton(BUTTON_PREVIOUS_CLASS));
    }

    scrollGallery(){
        this.interval = setTimeout(this.onBtnNextClick, 3000);
    }

    galleryInitialState(){
        const arrayPhoto = this.elem.children;
        for(let key of arrayPhoto){
            key.classList.toggle(PHOTO_HIDDEN_CLASS);
        }
        arrayPhoto[0].classList.toggle(PHOTO_SHOW_CLASS);
    }
    get activePhoto(){
        return document.querySelector('.photo-show');
    }
    onBtnNextClick(){
        const nextPhoto = this.activePhoto.nextElementSibling;
        console.log('click');
        this.activePhoto.classList.toggle(PHOTO_SHOW_CLASS);
        if(!nextPhoto){
            this.elem.firstElementChild.classList.toggle(PHOTO_SHOW_CLASS);
        } else{
            nextPhoto.classList.toggle(PHOTO_SHOW_CLASS);
        }  
        
    }
    onBtnPrevClick(){
        const prevPhoto = this.activePhoto.previousElementSibling;
        this.activePhoto.classList.toggle(PHOTO_SHOW_CLASS);
        if(!prevPhoto){
            this.elem.lastElementChild.classList.toggle(PHOTO_SHOW_CLASS);
        } else{
            prevPhoto.classList.toggle(PHOTO_SHOW_CLASS);
        } 
    }

    pauseGallery() {
        clearInterval(this.interval);
    }  

    listenersOfBttns(){
        this.containerGallery.addEventListener('click',(e)=>{
            const eventElem = e.target;
            switch(true){
                case eventElem.classList.contains(BUTTON_NEXT_CLASS):
                    this.onBtnNextClick();
                    this.pauseGallery();
                break
                case eventElem.classList.contains(BUTTON_PREVIOUS_CLASS):
                    this.onBtnPrevClick();
                    this.pauseGallery();
                break
            }
            this.scrollGallery()
        });
    }

    show(num){
        this.activePhoto.classList.toggle(PHOTO_SHOW_CLASS);

        this.elem.children[num - 1].classList.toggle(PHOTO_SHOW_CLASS);
    }
}
const gallery = document.getElementById('gallery');
const myGallery = new Gallery(gallery);
// myGallery.show(3);
// myGallery.onBtnNextClick();// myGallery.next();
// myGallery.onBtnPrevClick();// myGallery.prev();
