'use strict'

class Gallery{
    static SHOW_FULL_IMG ='show-full-img';
    static DATA_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=1500';

    static gallery = document.getElementById('gallery');
    static navContainer = document.getElementById('navigation-container');
    static closeImgBttn = document.getElementById('close-img-bttn');
    static darkBackground = document.querySelector('.container-full-img');
    static enlargedImg = document.querySelector('.full-img');
    static imgTempl = document.getElementById('img-temp').innerHTML;
    static navTempl = document.getElementById('navigation-gallery').innerHTML;
    static lastActivePage = Gallery.getDataLS('idLastPage') || 1;

    constructor() {
        this.numberOfImgPage = 50;
        this.lengthArrImgs = null;

        this.showGallery(); 
        this.bindEventListeners();
    }

    showGallery(){
        Gallery.requestJson(Gallery.DATA_URL)
        .then((data) => {
            this.lengthArrImgs = data.length;
            Gallery.setDataLS('galleryImg', data);
            this.init();   
        })
    }
    init(){
        this.createGallery(Gallery.lastActivePage);
        this.createNavigation();       
    }
    createNavigation(){
        const numberPage = this.getNumberOfPages();
        Gallery.renderNavigation(numberPage);
    }
    createGallery(page){
        const data = this.getSliceImages(page);
        Gallery.addImages(data);
    }
   
    bindEventListeners() {
        Gallery.gallery.addEventListener('click',this.onImgClick);
        Gallery.darkBackground.addEventListener('click',this.onImgCloseClick);
        Gallery.navContainer.addEventListener('click',this.onClickNavigation.bind(this));
    }
    onImgClick(e){
       if( e.target.matches('img')){
            Gallery.darkBackground.classList.toggle(Gallery.SHOW_FULL_IMG);
        
            Gallery.settingAttribute(Gallery.enlargedImg,'src', e.target);
            Gallery.settingAttribute(Gallery.enlargedImg,'alt', e.target);
        }
    }
    onImgCloseClick(e){
        if(e.target.matches('#close-img-bttn')|| 
           e.target.matches('div.container-full-img')){
            Gallery.darkBackground.classList.toggle(Gallery.SHOW_FULL_IMG);
        }
    }
    onClickNavigation(e){
        const id = e.target.dataset.idPage;
        Gallery.setDataLS('idLastPage', id);

        if(id){
            this.createGallery(id);
        }
    }
    
    getSliceImages(id){
        const beginImg = this.numberOfImgPage * id - this.numberOfImgPage;
        const endImg = this.numberOfImgPage * id;

        return Gallery.getData(beginImg, endImg);
    }
    getNumberOfPages(){
        return Math.ceil( this.lengthArrImgs / this.numberOfImgPage);
    }
    
    static requestJson(url){
        return fetch(url)
        .then(resp =>  resp.json())
        .catch(err => console.warn(err)); 
    }
    static setDataLS(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }
    static getDataLS(name){
        const data = localStorage.getItem(name)
        return JSON.parse(data);
    }
    static renderNavigation(number){
        for(let i = 1; i <= number; i++){
            const page = Gallery.navTempl.replace('{{number}}', i)
                                                  .replace('{{pageNumber}}', i)
                                                  .replace('{{page}}', i)
            Gallery.navContainer.insertAdjacentHTML('beforeend', page);
        }
    }
    static getData(beginImg, endImg){
        const data = Gallery.getDataLS('galleryImg');
        return data.slice(beginImg, endImg);
    }
    static addImages(arrImages){
        Gallery.gallery.innerHTML='';
        arrImages.map( (elem)=>{
            let newImg = Gallery.imgTempl.replace('{{thumbnailUrl}}', elem.thumbnailUrl)
                            .replace('{{title}}', elem.title);
            Gallery.gallery.insertAdjacentHTML('beforeend', newImg);
        });
    }
    static settingAttribute(tagChange, attrb, tagParent){
        const newContextAttrb = tagParent.getAttribute(attrb);
        tagChange.setAttribute(attrb, newContextAttrb);
    }

}
const galllery = new Gallery();
