
//INDEX HTML PAGE//


//create a store class to be able to use some informations in different pages
class Store{

    //get names from storage
    static getNames(){
        let names;
        if(localStorage.getItem('names') === null) {
            names = [];
        }else{
            names = JSON.parse(localStorage.getItem('names'));
        }
        return names;
    }

    //add new name to storage
    static addName(name){
        const names = Store.getNames();
        names.push(name);
        localStorage.setItem('names',JSON.stringify(names));
    }

    //clear the storage
    static removeAll(){
        let names =[];
        localStorage.setItem('names',JSON.stringify(names));

    }
}

//if current page is starting page
if(window.location.href=='https://kursadguzelkaya.github.io/Tic-Tac-Toe/'){
    const form = document.getElementById('input-form');
    
    //Add Start Game event
    form.addEventListener('submit', e =>{
        e.preventDefault();
    
        //Get names from inputs
        const nameOne = document.getElementById('first-name').value;
        const nameSec = document.getElementById('second-name').value;
    
        //check names are empty or not
        if(nameOne==='' || nameSec===''){
            alert('Please fill the blanks');
        }else{
            //clear the storage
            Store.removeAll();

            //add new names
            Store.addName(nameOne);
            Store.addName(nameSec);

            //change current page to the game page 
            window.location.href = 'https://kursadguzelkaya.github.io/Tic-Tac-Toe/game.html';
        }
    });
}



//GAME HTML PAGE

class Styling{

    //Change style when hover event

    //change style of box when it is hovered
    static overBox(){

        if(event.target.classList.contains('box') && !event.target.classList.contains(`clicked-box`)){
            const box = event.target
            const oNameBox = document.getElementById(`name-O`);
            
            //find current player
            let current = oNameBox.classList.contains('player-O') ? 'O' : 'X';

            //append a text which is current player's char 
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
    //and if game finish, store the winner's info and change the page
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

            //create a list to store winners info [name,char]
            let currentInfo = [`${currentplayer.lastElementChild.textContent} Won!!`,currentplayer.firstElementChild.textContent]

            //get number of box which is clicked
            let numClicked = document.getElementsByClassName('clicked-box').length;
            
            //if game finish, add winner info to loacl storeage and go to finish page
            //else if numer of clicked box equals to 9, add tie info and go to finish page
            if(checkBoard(current)){

                //add winners info to local storage
                Store.addName(currentInfo)
                
                //change current page to result page
                window.location.href = 'https://kursadguzelkaya.github.io/Tic-Tac-Toe/result.html' ;
            }else if(numClicked == 9){
                console.log(1)

                //add tie ifo
                Store.addName(["It's A Tie!!",''])
                
                //change current page to result page
                window.location.href = 'https://kursadguzelkaya.github.io/Tic-Tac-Toe/result.html' ;

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
            }
        }
    }
}

//if current page is game page
if(window.location.href=='https://kursadguzelkaya.github.io/Tic-Tac-Toe/game.html'){
    const boxes = document.getElementById('board-boxes');

    //Return box names to given names
    document.getElementById('name-one').innerHTML=Store.getNames()[0];
    document.getElementById('name-sec').innerHTML=Store.getNames()[1];

    //CREATE BOARD
    //get all boxes
    const boxList = Array.from(document.getElementsByClassName('box'));

    //create board forom boxes' list
    line1 = [boxList[0],boxList[1],boxList[2]];
    line2 = [boxList[3],boxList[4],boxList[5]];
    line3 = [boxList[6],boxList[7],boxList[8]];
    board = [line1,line2,line3];

    //ADD EVENTS
    boxes.addEventListener('mouseover', Styling.overBox);
    boxes.addEventListener('mouseout', Styling.outBox);
    boxes.addEventListener('click', Styling.clickedBox);
}

//RESULT HTML PAGE

//if current page is result page
if(window.location.href=='https://kursadguzelkaya.github.io/Tic-Tac-Toe/result.html'){

    //Return name to name of the winner
    document.getElementById('winner-name').innerHTML = Store.getNames()[Store.getNames().length-1][0];

    //Return char to char of the winner
    document.getElementById('player-char').innerHTML = Store.getNames()[Store.getNames().length-1][1];

    //if x is the winner, change style according to X
    //else if it is at tie, change style according to tie
    //else o is the default winner 
    if(Store.getNames()[Store.getNames().length-1][1]=='X'){

        //change body background to blue
        document.getElementById('result-page').style.backgroundColor='#4b9dc3';

        //change button color to dark orange
        document.getElementsByClassName('btn')[0].style.color='#fe9b00';
    }else if(Store.getNames()[Store.getNames().length-1][1]==''){

        //change body background to green
        document.getElementById('result-page').style.backgroundColor='#18e083';

        //change button color to dark purple
        document.getElementsByClassName('btn')[0].style.color='#8d00c2';
    }

}



