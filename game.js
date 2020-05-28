
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
            const h1 = event.target.firstChild;

            //remove text
            box.textContent = '';    
        }
    }

    //when box is clicked change box style and turned game to next player
    static clickedBox(){

        //if box not clicked yet
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
                
        }
    }
}

boxes.addEventListener('mouseover', Styling.overBox);
boxes.addEventListener('mouseout', Styling.outBox);
boxes.addEventListener('click', Styling.clickedBox);
