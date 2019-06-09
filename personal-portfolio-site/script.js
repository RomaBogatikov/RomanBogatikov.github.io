document.getElementById("night_mode").onclick = night;

function night() {
    // if it is Night Mode now
    if (document.getElementById("night_mode").innerHTML == "Night Mode") {
        // change button's text to "Day Mode"
        document.getElementById("night_mode").innerHTML = "Day Mode";
        // put a different picture on the background
        document.getElementsByClassName("fixed-background")[0].style.backgroundImage = "url('ocean_night.jpeg')";
        // change text color under photo of Roman to orange
        document.getElementById("photo").style.color = "darkorange";
        // change text color of the "projects" section header
        document.getElementById("projects").style.color = "darkorange";
        // change text color of the captions under the images of projects
        var ancestor = document.getElementsByClassName("project_tile");
        for (let i = 0; i < ancestor[0].children.length; i++) {
            ancestor[0].children[i].style.color = "darkorange";
        }

    }
    // if it is Night Mode now, restore all the settings to default
    else {
        document.getElementById("night_mode").innerHTML = "Night Mode";
        document.getElementsByClassName("fixed-background")[0].style.backgroundImage = "url('aquamarine.png')";
        document.getElementById("photo").style.color = "black";
        document.getElementById("projects").style.color = "black";

        var ancestor = document.getElementsByClassName("project_tile");
        for (let i = 0; i < ancestor[0].children.length; i++) {
            ancestor[0].children[i].style.color = "rgb(2, 73, 73)";
        }
    }
    
}