$(document).ready(function(){
    $.ajax({
        url: "http://localhost:8080/pattern/getpatterns",
        type: 'GET',
        dataType: 'json', 
        success: function(res){
            console.log (res.length);
            var img = $("#imageLink")
            var galleryContainer = $("#galleryContainer");
            for(let i = 0; i < res.length; i++) {
                console.log(res[i].image_url);
                let clone = img.clone();
                clone.attr("href", "display.html?keyword="+res[i].pattern_name);
                clone.children().attr("src", "."+res[i].image_url).attr("alt", res[i].pattern_name);
                clone.appendTo(galleryContainer);
                
            }
        },
    });    
    });