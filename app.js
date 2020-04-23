$(document).ready(function () {
    var animallist = ["cat", "dog", "lion", "bat", "tiger", "bear"]
    function createbutton() {
        console.log("Create buttons from array")
        $("#buttoncontainer").empty()
        for (let i = 0; i < animallist.length; i++) {
            $("#buttoncontainer").append(`<button class="getgiphy" data-animal="${animallist[i]}" >${animallist[i]}</button>`)
        }
    }
    createbutton()
    $("#addsearch").on("click", function (event) {
        event.preventDefault();
        var usertext = $("#userinput").val().trim();
        animallist.push(usertext);
        createbutton()
    })
    $("#buttoncontainer").on("click", ".getgiphy", function () {
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");

        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=g";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var animalDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var animalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    animalImage.attr("src", results[i].images.fixed_height.url);
                    animalImage.attr("src-animate", results[i].images.fixed_height.url);
                    animalImage.attr("img-state", "animate");
                    animalImage.attr("src-pic", results[i].images.fixed_height_still.url);
                    animalImage.addClass("gifimages")
                    // Appending the paragraph and image tag to the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifsappearhere").prepend(animalDiv);
                }
            });
    });


    $("#gifsappearhere").on("click", ".gifimages", function (event) {
        var state = $(this).attr("img-state")
        var videourl = $(this).attr("src-animate")
        var imagurl = $(this).attr("src-pic")
        if (state === "animate") {
            $(this).attr("src", imagurl)
            $(this).attr("img-state", "still")
        }
        else {
            $(this).attr("src", videourl)
            $(this).attr("img-state", "animate")
        }
    }) 


})
