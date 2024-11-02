const homePage = document.querySelector('.home-page');
        const pausePage = document.querySelector('.pause-page');
        const overPage = document.querySelector('.over-page');
        const gamePage = document.querySelector('.game-page');
        const startBtn = document.querySelector('.start');
        const pauseBtn = document.querySelector('.pause');
        const continueBtn = document.querySelector('.continue');
        const restartBtn = document.querySelector('.restart');
        const homeBtn = document.querySelector('.to-home');
        const timerText = document.querySelector('.timer');
        const scoreText = document.querySelector('.score');
        const fScoreText = document.querySelector('.final-score');

        // ========================================================
        // 計時器設定
        // ========================================================
        let oneSecCounting;
        let timer;
        timerText.textContent = timer;

        function resetTimer() {
            timer = 30;
            timerText.textContent = timer;
        }
        function showTimer() {
            timer--;
            timerText.textContent = timer;

            if (timer < 6) {
                timerText.classList.add('five-sec');
            }
            if (timer === 0) {
                // console.log('time out');
                timerText.classList.remove('five-sec');
                fScoreText.textContent = `${scoreCount}`;
                gameOver();
            }
        }
        // ========================================================
        // 頁面切換及按鈕動作
        // ========================================================
        showHome()
        // 開始遊戲
        startBtn.addEventListener('click', () => {
            gameStart()
        })
        // 暫停遊戲
        pauseBtn.addEventListener('click', () => {
            homePage.classList.add('hide');
            pausePage.classList.remove('hide');
            overPage.classList.add('hide');
            gamePage.classList.add('hide');
            clearInterval(oneSecCounting);
        })
        // 繼續遊戲
        continueBtn.addEventListener('click', () => {
            homePage.classList.add('hide');
            pausePage.classList.add('hide');
            overPage.classList.add('hide');
            gamePage.classList.remove('hide');
            clearInterval(oneSecCounting);
            oneSecCounting = setInterval(showTimer, 1000);
        })
        // 重新開始
        restartBtn.addEventListener('click', () => {
            gameStart()
        })
        // 回到首頁
        homeBtn.addEventListener('click', () => {
            showHome();
        })

        function showHome() {
            homePage.classList.remove('hide');
            pausePage.classList.add('hide');
            overPage.classList.add('hide');
            gamePage.classList.add('hide');
            // 計時器歸零
            clearInterval(oneSecCounting);
        }

        function gameStart() {
            homePage.classList.add('hide');
            pausePage.classList.add('hide');
            overPage.classList.add('hide');
            gamePage.classList.remove('hide');
            resetTimer();
            clearInterval(oneSecCounting);
            oneSecCounting = setInterval(showTimer, 1000);
            scoreCount = 0;
            scoreText.textContent = `${scoreCount}`;
            passCount = 0;
            level = 2;
            runGame()
        }

        function gameOver() {
            homePage.classList.add('hide');
            pausePage.classList.add('hide');
            overPage.classList.remove('hide');
            gamePage.classList.add('hide');
            clearInterval(oneSecCounting);
        }

        // ========================================================
        // game setting
        // ========================================================
        const boxBig = document.querySelector('.box-big');
        let level = 2;
        let passCount = 0;
        let scoreCount = 0;



        function getColor(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function runGame() {
            // 1.歸零
            boxBig.innerHTML = '';
            // 2.產level二次方數量的盒子 
            for (let i = 0; i < level ** 2; i++) {
                boxBig.innerHTML += `<div class="box"></div>`
            }

            // 3.取產生後的盒子+平均寬高+隨機變色
            boxAll = document.querySelectorAll('.box');
            let color = `rgb(${getColor(1, 255)},${getColor(1, 255)},${getColor(1, 255)})`;
            for (let i = 0; i < level ** 2; i++) {
                let boxs = boxAll[i];
                let size = 100 / level;
                boxs.style.width = `${size}%`;
                boxs.style.height = `${size}%`;
                boxs.style.backgroundColor = color;
            }

            // 4.產生答案盒：取得亂數+將亂數設為陣列index 指定隨機box為答案盒 再將其透明度下降
            let answerIndex = Math.floor(Math.random() * (level ** 2));
            let answerBox = boxAll[answerIndex];
            answerBox.style.opacity = `${0.7 + level * 0.005 + passCount * 0.001}`;

            // 5.偵測答案盒被按下後動作
            answerBox.addEventListener('click', function () {
                // 分數計算和顯示
                scoreCount++;
                scoreText.textContent = `${scoreCount}`;
                console.log('分數:', scoreCount);
                console.log(scoreText.textContent);


                // 過關次數+1
                passCount++;

                // 當過關次數 = 關卡等級　例如level3要過三次=>才換下一level
                if (passCount == level) {
                    level++;
                    passCount = 0;
                    size = 100 / level;
                    console.log('next level');
                }

                // 設定關卡上限
                if (level < 30) {
                    runGame(); //遞迴 => 自己呼叫自己
                    console.log('next play');
                } else {
                    fScoreText.textContent = `${scoreCount}`;
                    gameOver();
                }
            });

        }