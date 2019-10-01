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

        this.creatContainer();
        this.galleryInitialState();
        this.creatButtons(this.containerGallery);
        this.listenersOfBttns();
        this.scrollGallery();
    }
    
    creatContainer(){
        const containerGallery = document.createElement('div');
        this.containerGallery = containerGallery;
        gallery.before(containerGallery);
        containerGallery.append(gallery);
        containerGallery.classList.add(GALLERRY_CONTAINER_CLASS);
    }
    creatButtons(containerParent){
        const buttonNext = document.createElement('button');
        containerParent.append(buttonNext);
        buttonNext.classList.add(BUTTON_NEXT_CLASS);

        const buttonPrev = document.createElement('button');
        containerParent.prepend(buttonPrev);
        buttonPrev.classList.add(BUTTON_PREVIOUS_CLASS);
    }

    scrollGallery(){
        this.interval = setInterval(() => this.onBtnNextClick(), 3000);
    }

    galleryInitialState(){
        const arrayPhoto = this.elem.children;
        for(let key of arrayPhoto){
            key.classList.toggle(PHOTO_HIDDEN_CLASS);
        }
        arrayPhoto[0].classList.toggle(PHOTO_SHOW_CLASS);
    }
    
    onBtnNextClick(){
        const activePhoto = document.querySelector('.photo-show');
        const nextPhoto = activePhoto.nextElementSibling;
        activePhoto.classList.toggle(PHOTO_SHOW_CLASS);
        if(!nextPhoto){
            this.elem.firstElementChild.classList.toggle(PHOTO_SHOW_CLASS);
        } else{
            nextPhoto.classList.toggle(PHOTO_SHOW_CLASS);
        }  
        
    }
    onBtnPrevClick(){
        const activePhoto = document.querySelector('.photo-show');
        const prevPhoto = activePhoto.previousElementSibling;
        activePhoto.classList.toggle(PHOTO_SHOW_CLASS);
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
        this.elem.parentElement.addEventListener('click',(e)=>{
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
        const activePhoto = document.querySelector('.photo-show');
        activePhoto.classList.toggle(PHOTO_SHOW_CLASS);

        this.elem.children[num - 1].classList.toggle(PHOTO_SHOW_CLASS);
    }
}

const myGallery = new Gallery(document.getElementById('gallery'));
// myGallery.show(3);
// myGallery.onBtnNextClick();// myGallery.next();
// myGallery.onBtnPrevClick();// myGallery.prev();
