const submitBtn = document.getElementById("submit");
const deleteBtn = document.getElementById('delete');
const lvlCounter = document.getElementById("level-counter");
const title = document.getElementById('title');
const playerBar = document.getElementById('player-bar')
const btnArray = [...document.getElementsByClassName('colors')];
let simonArray = [];
let playerArray = [];
let level = 0;
let isCorrect = false;

const colorOn = (btn) => {
        setTimeout(() => {
            btn.classList.remove('hide');
            setTimeout(() => {
                btn.classList.add('hide');
            }, 700);
        }, 1000);
};

function setOrder(quantity) {
    let i = 0;
    const loop = () => {
        const randomIndex = Math.floor(Math.random() * 5);
        colorOn(btnArray[randomIndex]);
        simonArray.push(btnArray[randomIndex]);
        i++;
        if(i < quantity){
            setTimeout(() => {
                loop();
            }, 1000);
        };
    };
    loop();       
};

function checkCorrect(sArr, pArr) {
    const oldArr = [];
    const newArr = [];
    sArr.forEach((color) => {
        oldArr.push(color.id);
    });
    pArr.forEach((color) => {
        newArr.push(color.id);
    });
    if (oldArr.toString() === newArr.toString()){
        return true;
    } else {
        return false;
    }
};

const resetUI = (timingLvl) => {
    btnArray.forEach((btn) => {
        btn.classList.add('hide');
    });
    title.innerText = 'Simon Says...';
    submitBtn.classList.add('no-click');
    submitBtn.classList.add('hide');
    deleteBtn.classList.add('hide');
    deleteBtn.classList.add('no-click');
    playerBar.classList.add('hide');
    setTimeout(() => {
        btnArray.forEach((btn) => {
            btn.classList.remove('no-click');
            btn.classList.remove('hide');
            btn.classList.add('pointer');
        });
        title.innerText = 'Simon said?';
        submitBtn.innerText = 'Submit';
    }, (timingLvl * 1000) + 3000);
};

btnArray.forEach((btn) => {
    btn.addEventListener('click', () => {
        deleteBtn.classList.remove('hide');
        deleteBtn.classList.remove('no-click');
        deleteBtn.classList.add('pointer');
        submitBtn.classList.remove('no-click'); 
        submitBtn.classList.remove('hide');
        playerBar.classList.remove('hide');
        playerArray.push(btn);
        playerBar.innerHTML += `<div class="player-button" id="${btn.id}"></div>`;
    });
});

deleteBtn.addEventListener('click', () => {
    playerArray.pop();
    playerBar.removeChild(playerBar.lastElementChild);
});

submitBtn.addEventListener('click', () => {
    if (isCorrect){
        lvlCounter.innerText = `Level ${level}`;
        isCorrect = false;
        resetUI(level);
        setOrder(level + 2);
    } else if(checkCorrect(simonArray, playerArray) && level > 0){
        title.innerText = 'Success!'
        level += 1;
        btnArray.forEach((btn) => {
            btn.classList.add('no-click');
            btn.classList.remove('pointer');
        });
        submitBtn.innerText = 'Next Level';
        submitBtn.classList.remove('no-click');
        deleteBtn.classList.add('hide');
        deleteBtn.classList.add('no-click');
        playerBar.classList.add('hide');
        simonArray = [];
        playerArray = [];
        while (playerBar.lastElementChild){    
            playerBar.removeChild(playerBar.lastElementChild);
        };
        isCorrect = true;
    } else if (playerArray !== simonArray && level > 0){
        level = 0;
        btnArray.forEach((btn) => {
            btn.classList.add('no-click');
            btn.classList.remove('pointer');
        });
        lvlCounter.innerText = `Level ${level}`;
        title.innerText = 'You Fail!';
        submitBtn.innerText = 'Try Again?'  
        submitBtn.classList.remove('no-click');
        deleteBtn.classList.add('hide');
        deleteBtn.classList.add('no-click');
        playerBar.classList.add('hide');
        simonArray = [];
        playerArray = [];
        while (playerBar.lastElementChild){    
            playerBar.removeChild(playerBar.lastElementChild);
        };
    } else {
        level += 1;
        lvlCounter.innerText = `Level ${level}`;
        lvlCounter.classList.remove('hide');
        simonArray = [];
        playerArray = [];
        resetUI(level);
        setOrder(3); 
    };        
});