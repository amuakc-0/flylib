$(document).ready(function(){

  //Get all patterns in DB and push to array allMaterials
  var allMaterials = [];
  $.ajax({
    url: "http://localhost:8080/pattern/getpatterns",
    type: 'GET',
    dataType: 'json', 
    success: function(res){
        
        for (var i = 0; i < res.length; i++){
          allMaterials.push(res[i].material);
        }
      
      //Turn allMaterials to a String
      var materialsString = JSON.stringify(allMaterials);
      //Replace quotes and brackets in String
      var finalString = materialsString.replace(/"/g, "").replace(/\[/g, "").replace(/\]/g, "");
      //Create a new array, separate elements with comma
      var newArray = finalString.split(",");
      //set availableTags to the new array so that they show in JQuery UI autocomplete input
      var availableTags = newArray;
        $( "#tags" ).autocomplete({
          source: availableTags
        });


      },
});
  //Submit button handler
  $('#submitButton').click(function(){
    $('#searchContainer').empty();
    var keyword = $('#tags').val();
    //get all patterns based  on inputed value
    $.ajax({
      url: "http://localhost:8080/pattern/findbymaterial?keyword="+keyword,
      type: 'GET',
      dataType: 'json', 
      success: function(res){
          let searchContainer = $("#searchContainer");
          let link = $('#foundPattern');
          //Print out links to found patterns using .clone()
          for(var i = 0; i < res.length; i++) {
            let clone = link.clone();
                clone.attr("href", "display.html?keyword="+res[i].pattern_name);
                clone.text(res[i].pattern_name);
                clone.appendTo(searchContainer);
               }
    },
  });

  })
   
});