'use strict'
const TABSET_CONTAINER_CLASS = 'my-tabset';
const TABSET_CONTENT_DISPLAY_CLASS = 'tabset-content-display';
const TABSET_HEADING_CLASS = 'tabset-heading';
const TABSET_HEADING_DISPLAY_CLASS = 'tabset-heading-active';

class Tabset{
    constructor(elem) {
        this.elem = elem;
        this.index = 1;

        this.bindClasses();
        this.bindEventListeners();
        this.show(this.index);
    }
    static isElemTogle(elem, ourClass){
        return elem.classList.contains(ourClass);
    }
    static addClass(elem, ourClass){
        elem.classList.add(ourClass);
    }
    static removeClass(elem, ourClass){
        elem.classList.remove(ourClass);
    }

    bindClasses(){
        this.elem.classList.add(TABSET_CONTAINER_CLASS);
    }
    bindEventListeners(){
        this.elem.addEventListener('click',this.onElementClick.bind(this));
    }

    get CollectionContent(){
        return this.elem.lastElementChild.children;
    }
    get CollectionHeading(){
        return this.elem.firstElementChild.children;
    }
    get HeadingLength(){
        return this.elem.children.length;
    }

    show(num){
        this.index = num;
        Array.prototype.forEach.call(this.CollectionContent, (elem) => {
            Tabset.removeClass(elem, TABSET_CONTENT_DISPLAY_CLASS);
            if(elem.dataset.contentIndex == this.index){
                Tabset.addClass(elem, TABSET_CONTENT_DISPLAY_CLASS);
            }
        });

        Array.prototype.forEach.call(this.CollectionHeading, (elem) => {
            Tabset.removeClass(elem, TABSET_HEADING_DISPLAY_CLASS);
            if(elem.dataset.headingIndex == this.index){
                Tabset.addClass(elem, TABSET_HEADING_DISPLAY_CLASS);
            }
        });
    }
    onElementClick(e){
        const eventElem = e.target;
        const isVisible = Tabset.isElemTogle(eventElem, TABSET_HEADING_CLASS)
        if(isVisible){
            const dataIndexHeading = eventElem.dataset.headingIndex;
            this.show(dataIndexHeading);
        }
    }
    next(){
        this.index++;

        if(this.index > this.HeadingLength + 1){
            this.index = 1;
        }
        this.show(this.index);
    }
    prev(){
        this.index--;
        if(this.index < 1){
            this.index = this.HeadingLength + 1;
        }
        this.show(this.index);
    }
}

const tabset = new Tabset(document.getElementById('tabset'));