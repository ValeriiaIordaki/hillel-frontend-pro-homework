'use strict'
$(function(){

    const $searchUserGithub = $('#search');
    const $resultsContainer = $('.results-container');
    const $resultSearchTemp = $('#search-results-temp').html();
    const SEARCH_URL = 'https://api.github.com/search/users?q=';

    $searchUserGithub.autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                url: SEARCH_URL + request.term,
                dataType: "jsonp",
                success: function(data) {
                    response($.map(data.data.items, (elem) => {
                        return {
                            label: elem.login,
                            url: elem.url
                        }
                    }));
                }
            });
        },
        select: function(event, ui) {
            $.ajax( {
                url: ui.item.url,
                dataType: "jsonp",        
                success: function(data){
                    const htmlElem = renderDataResult(data.data);  
                    displayOfSearchResult(htmlElem);
                }
            });      
        },
    }); 
    
    function changeDateFormat(date) {
        date = new Date(date);
        return date.toLocaleDateString('en-GB');
    }
    
    
    function displayOfSearchResult(elem) {
        $resultsContainer.html(elem);
    }

    function renderDataResult(data) { 
        return $resultSearchTemp
            .replace('{{avatar-user-link}}', data.avatar_url)
            .replace('{{full-name}}', data.name || data.login)
            .replace('{{user-profile-url}}', data.html_url)
            .replace('{{login}}', data.login)
            .replace('{{repositories number}}', data.public_repos)
            .replace('{{followers number}}', data.followers)
            .replace('{{date registered}}', changeDateFormat(data.created_at))
    }
  
});
   
