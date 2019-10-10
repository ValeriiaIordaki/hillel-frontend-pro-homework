'use strict'

class Gallery{
    static SHOW_FULL_IMG ='show-full-img';

    static prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
    static gallery = document.getElementById('gallery');
    static imgTempl = document.getElementById('imgTemp').innerHTML;
    static closeImgBttn = document.getElementById('close-img-bttn');
    static darkBackground = document.querySelector('.container-full-img');
    static enlargedImg = document.querySelector('.full-img');function 

    constructor() {
        this.createGallery();
        this.bindEventListeners();
    }

    createGallery(){
        Gallery.prom.then((resp) => {resp.json().then((data) => {
                this.addImages(data, Gallery.gallery);
            });
        }); 
    }
    addImages(arrImg, container){
        arrImg.forEach((elem)=>{
            let newImg = Gallery.imgTempl.replace('{{thumbnailUrl}}', elem.thumbnailUrl)
                            .replace('{{title}}', elem.title);
            container.insertAdjacentHTML('beforeend', newImg);
        });
    }

    bindEventListeners() {
        Gallery.gallery.addEventListener('click',this.onImgClick);
        Gallery.darkBackground.addEventListener('click',this.onImgCloseClick);
    }
    onImgClick(e){
       if( e.target.matches('img')) {
            Gallery.darkBackground.classList.toggle(Gallery.SHOW_FULL_IMG);
        
            Gallery.settingAttribute(Gallery.enlargedImg,'src', e.target);
            Gallery.settingAttribute(Gallery.enlargedImg,'alt', e.target);
        }
    }
    onImgCloseClick(e){
        if(e.target.matches('#close-img-bttn')|| 
           e.target.matches('div.container-full-img')) {
            Gallery.darkBackground.classList.toggle(Gallery.SHOW_FULL_IMG);
        }
    }

    static settingAttribute(tagChange, attrb, tagParent){
        const newContextAttrb = tagParent.getAttribute(attrb);
        tagChange.setAttribute(attrb, newContextAttrb);
    }

}
const galllery = new Gallery();
