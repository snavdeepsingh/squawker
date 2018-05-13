$(function() {

    function postImageToPage(fileList) {
        // console.log("postImageToPage fired!");

        let file = null;
    
        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].type.match(/^image\//)) {
                file = fileList[i];
                break;
            }
        }
        console.log("-file-");
        console.log(file);
    
        if (file !== null) {
            console.log("-URL.createObjectURL(file)-");            
            console.log(URL.createObjectURL(file));

            // post pic to: <img id="output" />
            // $("#output")
            //     .attr("src", URL.createObjectURL(file))
            //     .width("150px")
            //     .height("150px");
        }
    // END OF: function postImageToPage(fileList) {
    };

    $("#image-capture-button").change(function(event) {
        // console.log("image-capture fired!");
        
        var fileList  = event.target.files;

        console.log("-fileList-");
        console.log(fileList);


        postImageToPage(fileList);
    //END OF: $("#image-capture-input").change(function(event) {
    });

// END OF: $(function() {
});


