let btn_left =document.getElementById('left-btn');
let btn_right =document.getElementById('right-btn');
const game =document.getElementById('gmcont');
const char =document.getElementById('char');
let interval;
let keyDown = false;

//ball movement//
const moveLeft = ()=>{
  let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
  if(leftPos > 0){
    char.style.left = leftPos -5+"px";
  }
};
const moveRight = ()=>{
  let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
  if(leftPos < 330){
    char.style.left = leftPos +5+"px";
  }
};
//event button//
btn_left.ontouchstart =function(){
      interval = setInterval(moveLeft,15);
    }
btn_left.onclick =function(){
      interval = moveLeft();
    }
btn_left.ontouchend =function(){
      clearInterval(interval);
    }
btn_right.ontouchstart =function(){
      interval = setInterval(moveRight,15);
    }
btn_right.onclick =function(){
      interval = moveRight();
    }
btn_right.ontouchend =function(){
      clearInterval(interval);
    }
//block movement//
const generateobstacle =() =>{ 
let block = document.createElement("div");
let hole = document.createElement("div");
block.setAttribute("class","block");
hole.setAttribute("class","hole");
let randHolePos =Math.floor(Math.random()*320);
hole.style.left=randHolePos + "px";
game.appendChild(block);
game.appendChild(hole);


    // to remove these elements at the end of Animation
    $('.block').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) { $(this).remove(); });
    $('.hole').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) { $(this).remove(); });
}

setInterval(generateobstacle,1500);

const checkCollisions = () => {
    const allBlocks = document.querySelectorAll(".block")
    const allHoles = document.querySelectorAll(".hole")

    allBlocks.forEach(b => {
        let hitObstacle = false

        if (collision(b, char)) {
            hitObstacle = true

            allHoles.forEach(h => {
                if (holeCollision(h, char)) {
                    hitObstacle = false
                }
            })
        }

        if (hitObstacle) {
            alert(" game over ")
            location.reload()
        }
    })
}
setInterval(checkCollisions, 1)

// Check Obstacle Collisions
function collision(a, b) {
    let a_top = parseInt(window.getComputedStyle(a).getPropertyValue("top"));

    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

    return (
        a_top + 20 > b_top && a_top < b_top + 20
    );
}

// Check Hole Collisions
function holeCollision(h, b) {
    let h_left = parseInt(window.getComputedStyle(h).getPropertyValue("left"));
    let h_top = parseInt(window.getComputedStyle(h).getPropertyValue("top"));

    let b_left = parseInt(window.getComputedStyle(b).getPropertyValue("left"));
    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top"));

    return (
        b_left > h_left && b_left < h_left + 50 &&
        h_top + 20 > b_top && h_top < b_top + 20
    );
}

