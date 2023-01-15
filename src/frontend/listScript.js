$(document).ready(function(){
    //hide patternDiv0
    //call showFlies() on load
    //add image element
    var elem = document.createElement("img");
    elem.id = "patternImage0";
    document.getElementById("panel-body").appendChild(elem);

    showFlies("all");

    //Handler for change of fly type
    let flyTypeSelector = $('#flyTypeSelector');
    flyTypeSelector.change(function() {
        //TODO: Close open accordions
        $(".panel-collapse").collapse("hide");

         $('#container').empty();
        console.log("Fly type changed");
        let flyType = flyTypeSelector.children("option:selected").val();
        showFlies(flyType);

    });

    //Function for getting patterns from DB via backend
    function showFlies (keyword) {
        var myUrl;

        //if "all" is selected use api end point for getting all patterns
        if(keyword == "all") {
            myUrl = "http://localhost:8080/pattern/getpatterns";
        //else use endpoint for finding pattern by keyword
        } else if (keyword == "other") {
            myUrl = "http://localhost:8080/pattern/findother?keyword=other";

        }
        else {
            myUrl = "http://localhost:8080/pattern/findbykey?keyword="+keyword+"";
        }

    $.ajax({
        url: myUrl,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            //Check if res is empty (i.e. no such flies in DB)
            if (!$.trim(res)){
                //hide patternDiv0 and show text
                $('#patternDiv0').hide();
                $('#container').text("No flies of this kind has been added to the library");
            }
            else {

            //show patternDiv0
            $('#patternDiv0').show();

           //Add each found pattern to a new div in container
            for (let i = 0; i < res.length; i++) {
                let cloneNo = (i-1);
                //Clone the patternDiv and change id
                let clone = $("#patternDiv"+cloneNo).clone();
                clone.attr("id", "patternDiv"+i);

                /**Change id of all elements in clone */
                clone.find("#collapse"+cloneNo+"").attr("id", "#collapse"+i+"");
                //change name of clone a title
                let cloneTitle = "title"+cloneNo;
                clone.find("[name="+cloneTitle+"]").attr("name", "title"+i+"");
                //change name of clone collapsePanel
                let cloneCollapsePanel = "collapsePanel"+cloneNo;
                clone.find("[name="+cloneCollapsePanel+"]").attr("name", "collapsePanel"+i+"");
                //change id for patternName
                clone.find('#patternName'+cloneNo).attr("id", "patternName"+i);
                 //change id for hookType
                 clone.find('#hookType'+cloneNo).attr("id", "hookType"+i);
                //change id for patternImage
                clone.find('#patternImage'+cloneNo).attr("id", "patternImage"+i);
                 //change id for tyingInstruction
                 clone.find('#tyingInstruction'+cloneNo).attr("id", "tyingInstruction"+i);
                  //change id for material
                clone.find('#material'+cloneNo).attr("id", "material"+i);
                /** */

                //Append clone to container
                clone.appendTo('#container');

                //Change title and href of accordion panel
               let newTitle = "title"+i;
               let title = $("[name="+newTitle+"]");
               title.text(res[i].pattern_name);
               title.attr("href", "#collapse"+i+"");
               //Change id of collapsing panel for each iteration
               let newCollapsePanel = "collapsePanel"+i;
               let collapsePanel = $("[name="+newCollapsePanel+"]");
               collapsePanel.attr("id", "collapse"+i+"");
               //Change content of panel body
               $('#patternName'+i+'').text(res[i].pattern_name);
               $('#hookType'+i+'').text(res[i].hook_type);
               $('#patternImage'+i+'').attr("src", "."+res[i].image_url)+"";
               $('#tyingInstruction'+i+'').text(res[i].instruction);
               $('#material'+i+'').text(res[i].material);



            }
        }
        }
    });
}


    });