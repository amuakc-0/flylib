//Handles what the script does after form has been validated after submit
$.validator.setDefaults({
    submitHandler: function() {
        //Creating variables from input fields
        imageToUpload = document.getElementById("fileUpload");
        var patternName = $("#patternName").val();
        var typeFly = $('[name="typeFly"]:checked').val();
        var hookSize = $('#hookSize').val();
        var hookType = $('#hookType').val();
        var materialArray = [];
        ($('.material').each(function(){
            materialArray.push($(this).val());
        }));
        var materials = materialArray.join(", ");
        var instruction = $('#tyingInstruction').val();
        var image_url = "/images/"+imageToUpload.files[0].name;

        //Creating array with above variables
        var pattern = [patternName, typeFly, hookSize, hookType, materials, instruction, image_url];

        //Upload image
        var myUpload = document.getElementById("fileUpload");
        var textLabel = document.getElementById("label");

        //Function for upload called on form submit
        async function uploadFile () {
            let formData = new FormData();
            formData.append("file", myUpload.files[0]);
            let response = await fetch('http://localhost:8080/pattern/upload', {
                method: "POST",
                body: formData
            });

            if (response.status == 200) {
                console.log("File successfully uploaded.");
            }


            textLabel.innerHTML = myUpload.files[0].name + " was uploaded!";
        }

        uploadFile();

        //Send array to DB with ajax
        $.ajax({
            crossDomain: true,
            type: "POST",
            url: "http://localhost:8080/pattern/addpattern",
            data: {
                patternArray: pattern
            },
            success: function(html) {
                alert("Added to library");
            }

        });
    }
});

$(document).ready(function() {


    //Using select menu from JQuery UI
    $( function() {
        $( "#hookSize" ).selectmenu()
            .selectmenu( "menuWidget" )
            .addClass( "overflow" );
    } );

    // jQuery button click event to add another material
    $('#addMaterial').on('click', function () {
        console.log("addMaterial");

        //adding another input-field.
        let patternMaterials = $('#patternMaterials');
        let newMaterial = $('.material:last');
        newMaterial.clone().val("").appendTo(patternMaterials);

    });

    //validator script
    $("#addForm").validate ({
        rules: {
            patternName: "required",
        },
        messages: {
            patternName: "Please enter a pattern name",
        }
    });


    //Script for checking if radio button "other" is checked, if so then show input text field
    var otherFlyLabel = $('#otherFlyLabel').hide();
    var otherFly = $('#otherFly').hide();
    var radio = $('[name="typeFly"]');
    $('#wetFly').click(function() {
        radioCheck();
    });
    $('#dryFly').click(function() {
        radioCheck();
    });
    $('#streamer').click(function() {
        radioCheck();
    });
    $('#other').click(function() {
        radioCheck();
    });

    function radioCheck() {
        var radioVal = $('[name="typeFly"]:checked').val();
        console.log(radioVal);
        if(radioVal === "other") {
            otherFlyLabel.show();
            otherFly.show();
        }
        else {
            otherFlyLabel.hide();
            otherFly.hide();
        }

    }

    /*** 	Upload field ***/
        //Variables
    var myUpload = document.getElementById("fileUpload");
    var textLabel = document.getElementById("label");

    //Function for printing out file name when droped
    function fileToUpload() {
        var myUpload = document.getElementById("fileUpload");
        textLabel.innerHTML = myUpload.files[0].name + " will be uploaded on submit";

    }

    //Event listener for when a file enters the drop area, changes style of dropArea

    //Hover
    myUpload.addEventListener("mouseover", function(e) {
        myUpload.parentNode.className = "onMouseover";
    }, false);
    myUpload.addEventListener("mouseout", function(e) {
        myUpload.parentNode.className = "dropArea";
    }, false);

    //When drag starts
    myUpload.addEventListener("dragenter", function (e) {
        myUpload.parentNode.className = "onDragEnter";
    }, false);

    //When a file is dropped in the drop area
    myUpload.addEventListener("dragdrop", function (e) {
        console.log(myUpload.parentNode.className);

    }, false);
    //When a file is dropped to a input element change is fired, this calls the upload function
    myUpload.addEventListener("change", function (e) {
        fileToUpload();
    }, false);

    //Event listener for when the dragged item leaves the drop area
    myUpload.addEventListener("dragleave", function (e) {
        myUpload.parentNode.className = "dropArea";
    }, false);


});