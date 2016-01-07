$(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13) {
      var parameters = {search: $(this).val() };
      $.get( '/searching', parameters, function(data) {
        data.forEach(function(item){
          $('#results').append('<a href="' + item['about'] + '">Craigslist Job</a><br>');
        });
        //$('#results').html();
      });
    };
  });
});