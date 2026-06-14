let time = 60;
let timer;

const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const game = document.getElementById("game");

const players = [
{
    element: document.getElementById("player1"),
    score: 0,
    question: null
},
{
    element: document.getElementById("player2"),
    score: 0,
    question: null
},
{
    element: document.getElementById("player3"),
    score: 0,
    question: null
},
{
    element: document.getElementById("player4"),
    score: 0,
    question: null
}
];


// 문제 출제
function giveQuestion(player){

    const question =
        questions[Math.floor(Math.random()*questions.length)];

    player.question = question;

    player.element.querySelector(".hanja").innerText =
        question.hanja;


    // 보기 만들기
    let choices = [question.answer];

    while(choices.length < 4){

        let randomAnswer =
            questions[Math.floor(Math.random()*questions.length)].answer;

        if(!choices.includes(randomAnswer)){
            choices.push(randomAnswer);
        }

    }

    choices.sort(()=>Math.random()-0.5);

    const buttons =
        player.element.querySelectorAll(".choice");

    buttons.forEach((button,index)=>{

        button.disabled = false;

        button.innerText = choices[index];

        button.style.backgroundColor = "";

        button.onclick = function(){

            if(time <= 0) return;

            // 정답
            if(button.innerText === player.question.answer){

                button.style.backgroundColor = "lightgreen";

                player.score++;

                player.element
                .querySelector(".score")
                .innerText =
                player.score + "점";

                setTimeout(function(){

                    giveQuestion(player);

                },200);

            }

            // 오답
            else{

                button.style.backgroundColor = "tomato";

                buttons.forEach(btn=>{
                    btn.disabled = true;
                });

                setTimeout(function(){

                    button.style.backgroundColor = "";

                    buttons.forEach(btn=>{
                        btn.disabled = false;
                    });

                },500);

            }

        };

    });

}


// 게임 시작
document.getElementById("startButton").onclick = function(){

    startScreen.style.display = "none";

    game.style.display = "block";

    players.forEach(player=>{

        giveQuestion(player);

    });

    timer = setInterval(updateTimer,1000);

};


// 타이머
function updateTimer(){

    time--;

    document.getElementById("timer").innerText =
        time;

    if(time <= 0){

        clearInterval(timer);

        game.style.display = "none";

        endScreen.style.display = "flex";


        // 순위 계산
        let rank = [...players];

        rank.sort((a,b)=>b.score-a.score);

        let text = "";

        rank.forEach((player,index)=>{

            let medal = "";

            if(index === 0) medal = "🥇";
            else if(index === 1) medal = "🥈";
            else if(index === 2) medal = "🥉";
            else medal = "4️⃣";

            text +=
                medal +
                " 플레이어 " +
                (players.indexOf(player)+1) +
                " : " +
                player.score +
                "점<br><br>";

        });

        document.getElementById("result").innerHTML =
            text;

    }

}


// 다시 하기 버튼
document.getElementById("restartButton").onclick =
function(){

    location.reload();

};