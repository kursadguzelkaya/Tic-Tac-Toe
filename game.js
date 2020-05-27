
const boxes = document.getElementById('board-boxes');


class Styling{

    //Change style when hover event

    //change style of box to hovered
    static overBox(player){

        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target

            //append a text 
            box.appendChild(document.createTextNode(player));

            //add hover class
            box.className = 'box hover-box';
        }
        
    }

    //reverse the changes
    static outBox(){
        
        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target;
            const h1 = event.target.firstChild;

            //remove text
            box.textContent = '';    
        }
    }

    static clickedBox(player){

        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target;
            const next = player =='X' ? 'O' : 'X';

            const playerName = document.getElementById(`name-${player}`);
            const nextPlayer = document.getElementById(`name-${next}`);

            //change current player
            playerName.className ='player';
            nextPlayer.className = `player player-${next}`;
            console.log(playerName);
            

            //add clicked class
            box.className = `box clicked-box clicked-box-${player}`;
    
        }
    }
}

class Game {

    while (True) {
        
    }
}


//Add hover event
boxes.addEventListener('mouseover', e => Styling.overBox('O'));
boxes.addEventListener('mouseout', Styling.outBox);
boxes.addEventListener('click', e => Styling.clickedBox('O'));