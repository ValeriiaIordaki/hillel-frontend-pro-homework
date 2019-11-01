'use strict'
$(function(){
    const BTTN_DEL_CLASS = 'bttn-delete';
    const DARK_BACKGROUND_CLASS = 'background';
    const STICKER_POSITION_VAL = 'absolute';

    const $bttnAddSticker = $('#add-sticker');
    const $board = $('#board');
    const $stickerHTML = $('#sticker-temp').html();
    const $stickersContainer = $('#stickers-container');
    const $modalIcon = $('#modal-icon');
    const $modalForm = $('#modal-form');

    let dataStickers = getActualData();

    const modalIconForCreatingSticker = $modalIcon.dialog({
        autoOpen: false,
        modal: true,
        buttons: {
          'Create sticker': function() {
                addSticker();
                $modalIcon.dialog( 'close' );
                $( ".sticker-container" ).draggable({
                    stop:function( event, ui ){
                        const el = $(event.target);
                        getDataItem(el).position = STICKER_POSITION_VAL;
                        $.extend(getDataItem(el), ui.offset);
                        setDataLS('stickers:', dataStickers);
                    }
                });
            },
            Cancel: function() {
                $modalIcon.dialog( 'close' );
            }
        },
        close: function() {
            $('#modal-form')[0].reset();
            $board.removeClass(DARK_BACKGROUND_CLASS);
        }         
    });


    $modalForm.submit(function(event) {
        event.preventDefault();
        addSticker();
    });
    $bttnAddSticker.click(onBttnAddStickerClick);
    $stickersContainer.click(onBttnDelStickerClick);

   function onBttnAddStickerClick(){
        modalIconForCreatingSticker.dialog('open');
    }
    function onBttnDelStickerClick(e){
        const $el = $(e.target);

        if($el.hasClass(BTTN_DEL_CLASS)){
            delElem($el);
            removeDataFromLS($el);
        }
    }
    
    init();
    function init(){
         dataStickers.map(renderDataSticker);
 
         $( ".sticker-container" ).draggable({
             stop:function( event, ui ){
                 const el = $(event.target);
 
                 getDataItem(el).position = STICKER_POSITION_VAL;
                 $.extend(getDataItem(el), ui.offset);
                 setDataLS('stickers:', dataStickers);
             }
         });
    } 

   function addSticker(){
        const arrayDataNewSticker = getObjDataSticker();

        renderDataSticker(arrayDataNewSticker);

        dataStickers.push(arrayDataNewSticker);
        setDataLS('stickers:',  dataStickers); 
   }
   
   function renderDataSticker(titleElem){
    const $elem = $stickerHTML.replace('{{id-sticker}}', titleElem.id)
                                     .replace('{{title}}', titleElem.title)
                                     .replace('{{text}}', titleElem.description)
                                     .replace('{{top}}', titleElem.top || 0)
                                     .replace('{{left}}', titleElem.left || 0)
                                     .replace('{{position}}', titleElem.position || 'relative');
    $stickersContainer.append($elem);
    }

    function setDataLS(name, data){
        localStorage.setItem(name, JSON.stringify(data));
    }
    function getDataLS(name){
        return localStorage.getItem(name);
    }
    function getObjDataSticker(){
        let arrayData = {id:Date.now()};
        $modalForm.serializeArray().forEach(({name, value}) => arrayData[name] = value);
        return arrayData;
    }
    function getActualData(){
        return JSON.parse(getDataLS('stickers:')) || [];
    }
    function getDataItem($eventElem){
        const selectedSticker = getParentContainer($eventElem,'.sticker-container');

        return  dataStickers.find(el => el.id == selectedSticker.data('stickerId'));
    }

    function delElem($eventElem){
        const selectedSticker = getParentContainer($eventElem,'.sticker-container');
        selectedSticker.remove()
    }
    function removeDataFromLS(eventElem){
        const deletedItemData = getDataItem(eventElem);
        dataStickers = dataStickers.filter(el => el !== deletedItemData);
        setDataLS('stickers:', dataStickers);
    }
    function getParentContainer($eventElem, css){
        return $eventElem.closest(css);
    }
});
   