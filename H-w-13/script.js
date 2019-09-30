'use strict'
class Gallery{
    constructor(elem) {
        this.elem = elem;
        this.interval;
        this.initializationGallery();
    }
    initializationGallery(){
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
        containerGallery.classList.add('container');
    }
    creatButtons(containerParent){
        const buttonNext = document.createElement('button');
        containerParent.append(buttonNext);
        buttonNext.classList.add('bttn-next');

        const buttonPrev = document.createElement('button');
        containerParent.prepend(buttonPrev);
        buttonPrev.classList.add('bttn-previous');
    }

    scrollGallery(){
        this.interval = setInterval(() => this.onBtnNextClick(), 3000);
    }

    galleryInitialState(){
        const arrayPhoto = this.elem.children;
        for(let key of arrayPhoto){
            key.classList.toggle('photo-hidden');
        }
        arrayPhoto[0].classList.toggle('photo-shown');
    }
    
    onBtnNextClick(){
        const activePhoto = document.querySelector('.photo-shown');
        const nextPhoto = activePhoto.nextElementSibling;
        activePhoto.classList.toggle('photo-shown');
        if(!nextPhoto){
            this.elem.firstElementChild.classList.toggle('photo-shown');
        } else{
            nextPhoto.classList.toggle('photo-shown');
        }  
        
    }
    onBtnPrevClick(){
        const activePhoto = document.querySelector('.photo-shown');
        const prevPhoto = activePhoto.previousElementSibling;
        activePhoto.classList.toggle('photo-shown');
        if(!prevPhoto){
            this.elem.lastElementChild.classList.toggle('photo-shown');
        } else{
            prevPhoto.classList.toggle('photo-shown');
        } 
    }

    pauseGallery() {
        clearInterval(this.interval);
    }  

    listenersOfBttns(){
        this.elem.parentElement.addEventListener('click',(e)=>{
            const eventElem = e.target;
            switch(true){
                case eventElem.classList.contains('bttn-next'):
                    this.onBtnNextClick();
                    this.pauseGallery();

                break
                case eventElem.classList.contains('bttn-previous'):
                    this.onBtnPrevClick();
                    this.pauseGallery();
                break
            }
            this.scrollGallery()
        });
    }

    show(num){
        const activePhoto = document.querySelector('.photo-shown');
        activePhoto.classList.toggle('photo-shown');

        this.elem.children[num - 1].classList.toggle('photo-shown');
    }
}

const myGallery = new Gallery(document.getElementById('gallery'));
// myGallery.show(3);
// myGallery.onBtnNextClick();// myGallery.next();
// myGallery.onBtnPrevClick();// myGallery.prev();
