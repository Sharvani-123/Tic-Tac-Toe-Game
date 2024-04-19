let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO=true;
    enabledboxes();
    msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            //playerO
            box.innerText= "O";
            turnO=false;
        }
        else{
            //playerX
            box.innerText="X";
            turnO= true;
        }
        box.disabled= true;

        checkWinner();
    });
});

const disabledboxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enabledboxes =() =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
};

const showWinner = (winner) => {
    msg.innerText =`Congratulations ! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledboxes();
}

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disabledboxes();
};

const checkWinner = () =>{
    let filledCount=0;
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val!= "" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return;

            }
        }
    }
        for (let box of boxes) {
    if (box.innerText !== "") {
        filledCount++;
    }
        }
//Check for draw (all boxes filled and no winner)
if (filledCount === 9) {
    console.log("It's a draw!");
    showDraw();
}
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);