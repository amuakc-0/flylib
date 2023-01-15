$(document).ready(function(){
    $.ajax({
        url: "http://localhost:8080/pattern/getpatterns",
        type: 'GET',
        dataType: 'json', 
        success: function(res){
            //add a element
            var elem = document.createElement("a");
            elem.id = "imageLink";
            document.getElementById("galleryContainer").appendChild(elem);
            //add img element
            var elemTwo = document.createElement("img");
            elemTwo.id = "patternImage";
            document.getElementById("imageLink").appendChild(elemTwo);

            var galleryContainer = $("#galleryContainer");
            for(let i = 0; i < res.length; i++) {
                console.log(res[i].image_url);
                let clone = $("#imageLink").clone();
                clone.attr("href", "display.html?keyword="+res[i].pattern_name);
                clone.children().attr("src", "."+res[i].image_url).attr("alt", res[i].pattern_name).attr("title", res[i].pattern_name);
                clone.appendTo(galleryContainer);
                
            }
        },
    });    
    });