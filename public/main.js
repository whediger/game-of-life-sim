var sideLength = 10;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var cellHeight = sideLength; 
var cellWidth = sideLength;

function drawGrid() {

    for(var v = Math.floor(window.innerHeight * .01); v < windowHeight; v += cellHeight) {
        var content = document.getElementById("content");
        for(var h = 0; h < windowWidth; h += cellWidth) {
            var cell = document.createElement("div");
            cell.style.height = cellHeight + "px";
            cell.style.width = cellWidth + "px";
            cell.style.marginLeft = h + "px";
            cell.style.marginTop = v + "px";
            cell.style.borderRadius = "50%";
            cell.style.border = "solid 1px yellow";
            cell.style.backgroundColor = "green";
            cell.setAttribute("class", "cell");
            cell.setAttribute("data-x", h);
            cell.setAttribute("data-y", v);
            cell.setAttribute("id", v + "-" + h); 
            cell.setAttribute("onclick", 'toggleShow("' + v + "-" + h + '")');
            content.appendChild(cell);
            if(Math.floor(Math.random() * 100) > 30){
                cell.style.opacity = "0";
            } else {
                cell.style.opacity = "1";
            }
        }
    }
}

// show hide life div on click +===}========>

function toggleShow(element) {
    var thisLife = document.getElementById(element);
    if(thisLife.style.opacity == "0") thisLife.style.opacity = "1";
    else thisLife.style.opacity = "0";
}

// start and stop animation +===}========>

var isMoving = false;

function pause() {
    isMoving = false;
}

function step() {
    isMoving = true;
    setInterval(function(){ 
    if(isMoving){
        move() 
    }
    }, 50);
}

// logic for life and death +===}========>

function move(){
    var cells = [];
    var life = [];
    cells = document.getElementsByClassName("cell");

    for(var i = 0; i < cells.length; i++) {
            var neighbors = 0; 

            var north = (parseInt(cells[i].dataset.y) - parseInt(cellHeight)) 
                + "-" + cells[i].dataset.x; 
            if(document.getElementById(north))
                if(document.getElementById(north).style.opacity == "1")
                    neighbors += 1; 
            var northEast = (parseInt(cells[i].dataset.y) - parseInt(cellHeight)) 
                + "-" + (parseInt(cells[i].dataset.x) + parseInt(cellWidth));
            if(document.getElementById(northEast))
                if(document.getElementById(northEast).style.opacity == "1")
                    neighbors += 1; 
            var east = parseInt(cells[i].dataset.y)
                + "-" + (parseInt(cells[i].dataset.x) + parseInt(cellWidth));
            if(document.getElementById(east))
                if(document.getElementById(east).style.opacity == "1")
                    neighbors += 1; 
            var southEast = (parseInt(cells[i].dataset.y) + parseInt(cellWidth))
                + "-" + (parseInt(cells[i].dataset.x) + parseInt(cellWidth));
            if(document.getElementById(southEast))
                if(document.getElementById(southEast).style.opacity == "1")
                    neighbors += 1; 
            var south = (parseInt(cells[i].dataset.y) + parseInt(cellWidth))
                + "-" + parseInt(cells[i].dataset.x);
            if(document.getElementById(south))
                if(document.getElementById(south).style.opacity == "1")
                    neighbors += 1; 
            var southWest = (parseInt(cells[i].dataset.y) + parseInt(cellWidth))
                + "-" + (parseInt(cells[i].dataset.x) - parseInt(cellWidth));
            if(document.getElementById(southWest))
                if(document.getElementById(southWest).style.opacity == "1")
                    neighbors += 1;
            var west = parseInt(cells[i].dataset.y)
                + "-" + (parseInt(cells[i].dataset.x) - parseInt(cellWidth));
            if(document.getElementById(west))
                if(document.getElementById(west).style.opacity == "1")
                    neighbors += 1;       
            var northWest = (parseInt(cells[i].dataset.y) - parseInt(cellWidth))
                + "-" + (parseInt(cells[i].dataset.x) - parseInt(cellWidth));
            if(document.getElementById(northWest))
                if(document.getElementById(northWest).style.opacity == "1")
                    neighbors += 1;   

        if(cells[i].style.opacity == "0"){
            if(neighbors == 3) life[i] = "1";
            //else life[i] = "0";
        } else {
            if(neighbors == 3) life[i] = "1";
            else if(neighbors == 2) life[i] = "1";
            else if(neighbors < 2) life[i] = "0";
            else if(neighbors > 3) life[i] = "0";
        }

    }
    
    for(var i = 0; i < cells.length; i++){
        cells[i].style.opacity = life[i];
    }

}
