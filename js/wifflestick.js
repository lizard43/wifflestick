  var GAME_URL='/games/game';

// Create the tooltips only when document ready
$(document).ready(function() {

  $('area').each(function() {

    $(this).qtip("destroy")

    $(this).qtip({
      position: {
        target: [5, 5]      
      },
      show: {
        delay: 100,
        solo: true
      },
      hide: {
        delay: 0               
      },
      style: 'qtip-light qtip-rounded',
      content: {
        text: function(event, api) {
          $.ajax({
            cache: false,
            url: GAME_URL + api.elements.target.attr('id') + '.html'
          })
          .then(
              function(content) {
                // Set the tooltip content upon successful retrieval
                api.set('content.text', content);
              } , 
              function(xhr, status, error) {
                // Upon failure... set the tooltip content to error
                api.set('content.text', status + ': ' + error);
              }
            );
            return 'Loading...'; // Set some initial text
        },
        title: function(event, api) {
          return 'Game ' + api.elements.target.attr('id') ;
        }
    }
  });
});
});