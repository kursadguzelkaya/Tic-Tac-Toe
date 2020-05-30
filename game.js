
const boxes = document.getElementById('board-boxes');


class Styling{

    //Change style when hover event

    //change style of box to hovered
    static overBox(){

        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target
            const oNameBox = document.getElementById(`name-O`);
            
            //find current player
            let current = oNameBox.classList.contains('player-O') ? 'O' : 'X';

            //append a text 
            box.appendChild(document.createTextNode(current));

            //add hover class
            box.className = 'box hover-box';
        }
        
    }

    //reverse the changes
    static outBox(){
        
        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target;

            //remove text
            box.textContent = '';  
            
            //delete hover class
            box.className = 'box';
        }
    }

    //when box is clicked change box style and turned game to next player
    static clickedBox(){
        
        //if box not clicked yet convert box to clicked box until game finish
        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target;
            const oNameBox = document.getElementById(`name-O`);
            
            //find current player
            let current = oNameBox.classList.contains('player-O') ? 'O' : 'X';

            //find next player according to current player
            var next = current =='X' ? 'O' : 'X';


            const currentplayer = document.getElementById(`name-${current}`);
            const nextPlayer = document.getElementById(`name-${next}`);

            //change current player box
            currentplayer.className ='player';
            nextPlayer.className = `player player-${next}`;

            //add clicked class
            box.className = `box clicked-box clicked-box-${current}`;

            //if game finish go to finish page
            if(checkBoard(current)){
                window.location.href = 'index.html' ;
            }

        }
    }
}

//return true if given box clicked by given player
function isClickedBy(row,col,player){
    if(board[row][col].classList.contains(`clicked-box-${player}`)){
        return true;
    }
}

//return true if given player finishes the game
function checkBoard(player){
    var numClicked = 0;

    for(var i=0;i<3;i++){
        for(var b=0;b<3;b++){

            if(isClickedBy(i,0,player) && isClickedBy(i,1,player) && isClickedBy(i,2,player)){
                return true;
            }else if(isClickedBy(0,b,player) &&isClickedBy(1,b,player) && isClickedBy(2,b,player)){
                return true;
            }else if(isClickedBy(1,1,player)){
                if(isClickedBy(0,0,player) && isClickedBy(2,2,player)){
                    return true;
                }else if(isClickedBy(0,2,player) && isClickedBy(2,0,player)){
                    return true;
                }
            }else if(isClickedBy(i,b,'X') || isClickedBy(i,b,'O')){
                numClicked+=1;
            }

        }
    }
    //if all boxes've been clicked return true
    if(numClicked==9){
        return true;
    }

}

//CREATE BOARD
//get all boxes
const boxList = Array.from(document.getElementsByClassName('box'));
console.log(boxList);

//create board forom boxes' list
line1 = [boxList[0],boxList[1],boxList[2]];
line2 = [boxList[3],boxList[4],boxList[5]];
line3 = [boxList[6],boxList[7],boxList[8]];
board = [line1,line2,line3]

//ADD EVENTS
boxes.addEventListener('mouseover', Styling.overBox);
boxes.addEventListener('mouseout', Styling.outBox);
boxes.addEventListener('click', Styling.clickedBox);








