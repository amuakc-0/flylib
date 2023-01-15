$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var keyword = urlParams.get('keyword')
    
    $.ajax({
        url: "http://localhost:8080/pattern/findbyname?keyword="+keyword,
        type: 'GET',
        dataType: 'json', 
        success: function(res){
            console.log(res);
            let displayContainer = $("#displayContainer");
            //create element and append to displayContainer
            var elem = document.createElement("img");
            elem.id = "displayImage";
            document.getElementById("displayContainer").appendChild(elem);
            //Write out info form db in the different paragraphs
            displayContainer.children().filter('#displayName').text(res[0].pattern_name);
            displayContainer.children().filter('#displayHookType').text(res[0].hook_type);
            displayContainer.children().filter('#displayTyingInstruction').text(res[0].instruction);
            displayContainer.children().filter('#displayMaterial').text(res[0].material);
            displayContainer.children().filter('#displayImage').attr('src', "."+res[0].image_url+"").attr("alt", res[0].pattern_name);
        },
    });
    });