// Move history tracking
let moveHistory = [];
let currentMove = -1;

// Function to save move to history
function saveMove(fromId, toId, fromPiece, toPiece) {
    moveHistory.push({
        fromId: fromId,
        toId: toId,
        fromPiece: fromPiece,
        toPiece: toPiece
    });
    currentMove++;
    document.getElementById('undoButton').disabled = false;
}

// Function to undo last move
function undoMove() {
    if (currentMove >= 0) {
        const move = moveHistory[currentMove];
        const fromBox = document.getElementById(move.fromId);
        const toBox = document.getElementById(move.toId);
        
        // Restore the pieces
        fromBox.innerText = move.fromPiece;
        toBox.innerText = move.toPiece;
        
        // Update the display
        coloring();
        insertImage();
        
        // Update turn counter and display
        tog--;
        document.getElementById('tog').innerText = tog % 2 === 0 ? "Black's Turn" : "White's Turn";
        
        // Remove the move from history
        moveHistory.pop();
        currentMove--;
        
        // Disable undo button if no moves left
        if (currentMove < 0) {
            document.getElementById('undoButton').disabled = true;
        }
    }
}

// Add event listener for undo button
document.getElementById('undoButton').addEventListener('click', undoMove);

// Inserting the Images
function insertImage() {

    document.querySelectorAll('.box').forEach(image => {

        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'

            }

            else {

                image.innerHTML = `${image.innerText} <img class='allimg' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
    })
}
insertImage()


//Coloring

function coloring() {
    const color = document.querySelectorAll('.box')

    color.forEach(color => {

        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(240, 201, 150)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(100, 75, 43)'
        }
        // if (a % 2 == 0) {
        //     color.style.backgroundColor = 'seagreen'
        // }
        // if (a % 2 !== 0) {
        //     color.style.backgroundColor = 'lime'
        // }

    })
}
coloring()




//function to not remove the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'pink') {

            document.querySelectorAll('.box').forEach(i2 => {

                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {


                    greenText = i2.innerText

                    pinkText = i1.innerText

                    pinkColor = ((Array.from(pinkText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()

                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup

                    if (a % 2 == 0 && pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }
                    if (a % 2 !== 0 && pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(100, 75, 43)'
                    }

                    // if (pinkColor == greenColor) {
                    //     i2.style.backgroundColor = 'rgb(253, 60, 60)'
                    // }
                }
            })
        }
    })
}










tog = 1
whiteCastleChance=true
blackCastleChance=true

document.querySelectorAll('.box').forEach(item => {



    item.addEventListener('click', function () {

        // To delete the opposite element

        if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
            tog = tog + 1
        }
        else if (item.style.backgroundColor == 'aqua' && item.innerText.length == 0) {
            tog = tog + 1
        }

        else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {

            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'pink') {
                    pinkId = i.id
                    pinkText = i.innerText

                    // Save the move before making it
                    saveMove(pinkId, item.id, pinkText, item.innerText);

                    document.getElementById(pinkId).innerText = ''
                    item.innerText = pinkText
                    coloring()
                    insertImage()
                    tog = tog + 1

                }
            })
        }



        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup



        // Function to display the available paths for all pieces

        function whosTurn(toggle) {

            // PAWN

            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'pink'

                if (tog % 2 !== 0 && aup < 800) {

                    if (aup == 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                        if (aup == 200 && document.getElementById(`b${a + 200}`).innerText.length == 0) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = 'green'
                        }
                    }

                    if (aup !== 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    }

                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                    }

                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'

                    }
                    // if (aup == 800) {
                    //     document.getElementById(`b${a}`).innerText = 'Wqueen'
                    //     coloring()
                    //     insertImage()
                    // }
                    // if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                    //     document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    // }

                    // if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                    //     document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'

                    // }
                }

                if (tog % 2 == 0 && aup > 100) {

                    if (aup == 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                        if (aup == 700 && document.getElementById(`b${a - 200}`).innerText.length == 0) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = 'green'
                        }
                    }

                    if (aup !== 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'

                    }
                }


            }

            // KING

            if (item.innerText == `${toggle}king`) {


                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'

                }
                if (aside > 1) {

                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800) {

                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                }
                if (aup > 100) {

                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                }

                if (aup > 100 && aside < 8) {

                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                }
                if (aup > 100 && aside > 1) {

                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800 && aside < 8) {

                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800 && aside > 1) {

                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
                }
                
                if(whiteCastleChance==true && a==105 && document.getElementById('b106').innerText== '' && document.getElementById('b107').innerText== '' && document.getElementById('b108').innerText== 'Wrook'){
                    document.getElementById(`b107`).style.backgroundColor = 'aqua'

                }
                if(whiteCastleChance==true && a==105 && document.getElementById('b104').innerText== '' && document.getElementById('b103').innerText== '' && document.getElementById('b102').innerText== '' && document.getElementById('b101').innerText== 'Wrook'){
                    document.getElementById(`b103`).style.backgroundColor = 'aqua'

                }
                if(blackCastleChance==true && a==805 && document.getElementById('b806').innerText== '' && document.getElementById('b807').innerText== '' && document.getElementById('b808').innerText== 'Brook'){
                    document.getElementById(`b807`).style.backgroundColor = 'aqua'

                }
                if(blackCastleChance==true && a==805 && document.getElementById('b804').innerText== '' && document.getElementById('b803').innerText== '' && document.getElementById('b802').innerText== '' && document.getElementById('b801').innerText== 'Brook'){
                    document.getElementById(`b803`).style.backgroundColor = 'aqua'

                }

                item.style.backgroundColor = 'pink'

            }


            // ROOK

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                item.style.backgroundColor = 'pink'
            }



            // BISHOP

            if (item.innerText == `${toggle}bishop`) {


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                item.style.backgroundColor = 'pink'

            }



            // QUEEN

            if (item.innerText == `${toggle}queen`) {


                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }



                item.style.backgroundColor = 'pink'

            }

            // KNIGHT

            if (item.innerText == `${toggle}knight`) {


                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green'
                }

                item.style.backgroundColor = 'pink'

            }
        }


        // Toggling the turn

        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }

        reddish()



        // Check for checkmate
        if (isCheckmate(tog % 2 === 0 ? 'W' : 'B')) {
            setTimeout(() => {
                const winner = tog % 2 === 0 ? 'Black' : 'White';
                alert(`${winner} Wins by Checkmate!`);
                location.reload();
            }, 100);
        }
        // Check if king is captured (traditional win condition)
        else {
            numOfKings = 0;
            document.querySelectorAll('.box').forEach(win => {
                if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                    numOfKings += 1;
                }
            });

            if (numOfKings == 1) {
                setTimeout(() => {
                    if (tog % 2 == 0) {
                        alert('White Wins!');
                        location.reload();
                    }
                    else if (tog % 2 !== 0) {
                        alert('Black Wins!');
                        location.reload();
                    }
                }, 100);
            }
        }



    })

})





// Moving the element
document.querySelectorAll('.box').forEach(item => {

    item.addEventListener('click', function () {


        if (item.style.backgroundColor == 'pink') {

            pinkId = item.id
            pinkText = item.innerText

            document.querySelectorAll('.box').forEach(item2 => {

                item2.addEventListener('click', function () {

                    getId = item2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup

                    if (item2.style.backgroundColor == 'green' && item2.innerText.length == 0) {

                        if (pinkText == `Wpawn` && aup == 800) {

                            document.getElementById(`b${a}`).innerText = 'Wqueen'
                            document.getElementById(pinkId).innerText = ''
                            coloring()
                            insertImage()

                        }
                        else if (pinkText == `Bpawn` && aup == 100) {

                            document.getElementById(`b${a}`).innerText = 'Bqueen'
                            document.getElementById(pinkId).innerText = ''
                            coloring()
                            insertImage()

                        }
                        else {



                            document.getElementById(pinkId).innerText = ''
                            item2.innerText = pinkText
                            coloring()
                            insertImage()
                        }

                    }

                    else if (item2.style.backgroundColor == 'aqua') {
                        if(item2.id=='b103'){
                            document.getElementById('b101').innerText = ''
                            document.getElementById('b102').innerText = ''
                            document.getElementById('b103').innerText = 'Wking'
                            document.getElementById('b104').innerText = 'Wrook'
                            document.getElementById('b105').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            whiteCastleChance=false
                            coloring()
                            insertImage()
                            
                        }
                        else if(item2.id=='b107'){
                            document.getElementById('b105').innerText = ''
                            document.getElementById('b106').innerText = 'Wrook'
                            document.getElementById('b107').innerText = 'Wking'
                            document.getElementById('b108').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            whiteCastleChance=false
                            coloring()
                            insertImage()

                        }
                        else if(item2.id=='b803'){
                            document.getElementById('b801').innerText = ''
                            document.getElementById('b802').innerText = ''
                            document.getElementById('b803').innerText = 'Bking'
                            document.getElementById('b804').innerText = 'Brook'
                            document.getElementById('b805').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            blackCastleChance=false
                            coloring()
                            insertImage()
                            
                        }
                        else if(item2.id=='b807'){
                            document.getElementById('b805').innerText = ''
                            document.getElementById('b806').innerText = 'Brook'
                            document.getElementById('b807').innerText = 'Bking'
                            document.getElementById('b808').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            blackCastleChance=false
                            coloring()
                            insertImage()

                        }
                    }

                })
            })

        }

    })

})






// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function () {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green' && ee.style.backgroundColor !== 'aqua') {
            coloring()
        }
    })
})

// Function to check if a king is in check
function isKingInCheck(kingColor) {
    const king = document.querySelector(`.box[id^="b"]:contains("${kingColor}king")`);
    if (!king) return false;
    
    const kingId = king.id;
    const kingArr = Array.from(kingId);
    kingArr.shift();
    const kingSide = eval(kingArr.pop());
    kingArr.push('0');
    const kingUp = eval(kingArr.join(''));
    const kingPos = kingSide + kingUp;
    
    // Check if any opponent piece can capture the king
    const opponentColor = kingColor === 'W' ? 'B' : 'W';
    const allPieces = document.querySelectorAll('.box');
    
    for (const piece of allPieces) {
        if (piece.innerText.startsWith(opponentColor)) {
            // Temporarily set the piece's position to pink to check its moves
            const originalColor = piece.style.backgroundColor;
            piece.style.backgroundColor = 'pink';
            
            // Get all possible moves for this piece
            const moves = getPossibleMoves(piece);
            
            // Check if any move can capture the king
            if (moves.includes(kingPos)) {
                piece.style.backgroundColor = originalColor;
                return true;
            }
            
            piece.style.backgroundColor = originalColor;
        }
    }
    return false;
}

// Function to get all possible moves for a piece
function getPossibleMoves(piece) {
    const moves = [];
    const pieceId = piece.id;
    const pieceArr = Array.from(pieceId);
    pieceArr.shift();
    const pieceSide = eval(pieceArr.pop());
    pieceArr.push('0');
    const pieceUp = eval(pieceArr.join(''));
    const piecePos = pieceSide + pieceUp;
    
    // Get all green squares for this piece
    const originalColor = piece.style.backgroundColor;
    piece.style.backgroundColor = 'pink';
    
    // Call the appropriate movement function based on piece type
    const pieceType = piece.innerText.substring(1);
    switch(pieceType) {
        case 'pawn':
            getPawnMoves(piecePos, pieceUp, pieceSide, moves);
            break;
        case 'rook':
            getRookMoves(piecePos, pieceUp, pieceSide, moves);
            break;
        case 'knight':
            getKnightMoves(piecePos, pieceUp, pieceSide, moves);
            break;
        case 'bishop':
            getBishopMoves(piecePos, pieceUp, pieceSide, moves);
            break;
        case 'queen':
            getQueenMoves(piecePos, pieceUp, pieceSide, moves);
            break;
        case 'king':
            getKingMoves(piecePos, pieceUp, pieceSide, moves);
            break;
    }
    
    piece.style.backgroundColor = originalColor;
    return moves;
}

// Function to check if a move would put or leave the king in check
function wouldBeInCheck(fromId, toId, pieceColor) {
    // Save current state
    const fromBox = document.getElementById(fromId);
    const toBox = document.getElementById(toId);
    const fromPiece = fromBox.innerText;
    const toPiece = toBox.innerText;
    
    // Make the move
    fromBox.innerText = '';
    toBox.innerText = fromPiece;
    
    // Check if king is in check
    const inCheck = isKingInCheck(pieceColor);
    
    // Restore the state
    fromBox.innerText = fromPiece;
    toBox.innerText = toPiece;
    
    return inCheck;
}

// Function to check for checkmate
function isCheckmate(kingColor) {
    if (!isKingInCheck(kingColor)) return false;
    
    // Get the king's position
    const king = document.querySelector(`.box[id^="b"]:contains("${kingColor}king")`);
    const kingId = king.id;
    
    // Try all possible moves for all pieces of the same color
    const allPieces = document.querySelectorAll('.box');
    for (const piece of allPieces) {
        if (piece.innerText.startsWith(kingColor)) {
            const moves = getPossibleMoves(piece);
            for (const move of moves) {
                if (!wouldBeInCheck(piece.id, `b${move}`, kingColor)) {
                    return false; // Found a legal move that gets out of check
                }
            }
        }
    }
    
    return true; // No legal moves found to get out of check
}

// Helper functions for getting possible moves
function getPawnMoves(pos, up, side, moves) {
    const isWhite = document.getElementById(`b${pos}`).innerText.startsWith('W');
    
    if (isWhite) {
        if (up < 800) {
            if (document.getElementById(`b${pos + 100}`).innerText.length === 0) {
                moves.push(pos + 100);
                if (up === 200 && document.getElementById(`b${pos + 200}`).innerText.length === 0) {
                    moves.push(pos + 200);
                }
            }
        }
        if (side < 8 && document.getElementById(`b${pos + 100 + 1}`).innerText.startsWith('B')) {
            moves.push(pos + 100 + 1);
        }
        if (side > 1 && document.getElementById(`b${pos + 100 - 1}`).innerText.startsWith('B')) {
            moves.push(pos + 100 - 1);
        }
    } else {
        if (up > 100) {
            if (document.getElementById(`b${pos - 100}`).innerText.length === 0) {
                moves.push(pos - 100);
                if (up === 700 && document.getElementById(`b${pos - 200}`).innerText.length === 0) {
                    moves.push(pos - 200);
                }
            }
        }
        if (side < 8 && document.getElementById(`b${pos - 100 + 1}`).innerText.startsWith('W')) {
            moves.push(pos - 100 + 1);
        }
        if (side > 1 && document.getElementById(`b${pos - 100 - 1}`).innerText.startsWith('W')) {
            moves.push(pos - 100 - 1);
        }
    }
}

function getRookMoves(pos, up, side, moves) {
    // Vertical moves
    for (let i = 1; i < 9; i++) {
        if ((pos + i * 100) < 900) {
            const target = document.getElementById(`b${pos + i * 100}`);
            if (target.innerText.length === 0) {
                moves.push(pos + i * 100);
            } else {
                if (target.innerText[0] !== document.getElementById(`b${pos}`).innerText[0]) {
                    moves.push(pos + i * 100);
                }
                break;
            }
        }
    }
    
    for (let i = 1; i < 9; i++) {
        if ((pos - i * 100) > 100) {
            const target = document.getElementById(`b${pos - i * 100}`);
            if (target.innerText.length === 0) {
                moves.push(pos - i * 100);
            } else {
                if (target.innerText[0] !== document.getElementById(`b${pos}`).innerText[0]) {
                    moves.push(pos - i * 100);
                }
                break;
            }
        }
    }
    
    // Horizontal moves
    for (let i = 1; i < 9; i++) {
        if ((pos + i) < (up + 9)) {
            const target = document.getElementById(`b${pos + i}`);
            if (target.innerText.length === 0) {
                moves.push(pos + i);
            } else {
                if (target.innerText[0] !== document.getElementById(`b${pos}`).innerText[0]) {
                    moves.push(pos + i);
                }
                break;
            }
        }
    }
    
    for (let i = 1; i < 9; i++) {
        if ((pos - i) > up) {
            const target = document.getElementById(`b${pos - i}`);
            if (target.innerText.length === 0) {
                moves.push(pos - i);
            } else {
                if (target.innerText[0] !== document.getElementById(`b${pos}`).innerText[0]) {
                    moves.push(pos - i);
                }
                break;
            }
        }
    }
}

function getKnightMoves(pos, up, side, moves) {
    const pieceColor = document.getElementById(`b${pos}`).innerText[0];
    
    if (side < 7 && up < 800) {
        const target = document.getElementById(`b${pos + 100 + 2}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 100 + 2);
        }
    }
    if (side < 7 && up > 200) {
        const target = document.getElementById(`b${pos - 100 + 2}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 100 + 2);
        }
    }
    if (side < 8 && up < 700) {
        const target = document.getElementById(`b${pos + 200 + 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 200 + 1);
        }
    }
    if (side > 1 && up < 700) {
        const target = document.getElementById(`b${pos + 200 - 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 200 - 1);
        }
    }
    if (side > 2 && up < 800) {
        const target = document.getElementById(`b${pos - 2 + 100}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 2 + 100);
        }
    }
    if (side > 2 && up > 100) {
        const target = document.getElementById(`b${pos - 2 - 100}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 2 - 100);
        }
    }
    if (side < 8 && up > 200) {
        const target = document.getElementById(`b${pos - 200 + 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 200 + 1);
        }
    }
    if (side > 1 && up > 200) {
        const target = document.getElementById(`b${pos - 200 - 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 200 - 1);
        }
    }
}

function getBishopMoves(pos, up, side, moves) {
    const pieceColor = document.getElementById(`b${pos}`).innerText[0];
    
    // Diagonal moves
    for (let i = 1; i < 9; i++) {
        if (i < (900 - up) / 100 && i < 9 - side) {
            const target = document.getElementById(`b${pos + i * 100 + i}`);
            if (target.innerText.length === 0) {
                moves.push(pos + i * 100 + i);
            } else {
                if (target.innerText[0] !== pieceColor) {
                    moves.push(pos + i * 100 + i);
                }
                break;
            }
        }
    }
    
    for (let i = 1; i < 9; i++) {
        if (i < up / 100 && i < 9 - side) {
            const target = document.getElementById(`b${pos - i * 100 + i}`);
            if (target.innerText.length === 0) {
                moves.push(pos - i * 100 + i);
            } else {
                if (target.innerText[0] !== pieceColor) {
                    moves.push(pos - i * 100 + i);
                }
                break;
            }
        }
    }
    
    for (let i = 1; i < 9; i++) {
        if (i < (900 - up) / 100 && i < side) {
            const target = document.getElementById(`b${pos + i * 100 - i}`);
            if (target.innerText.length === 0) {
                moves.push(pos + i * 100 - i);
            } else {
                if (target.innerText[0] !== pieceColor) {
                    moves.push(pos + i * 100 - i);
                }
                break;
            }
        }
    }
    
    for (let i = 1; i < 9; i++) {
        if (i < up / 100 && i < side) {
            const target = document.getElementById(`b${pos - i * 100 - i}`);
            if (target.innerText.length === 0) {
                moves.push(pos - i * 100 - i);
            } else {
                if (target.innerText[0] !== pieceColor) {
                    moves.push(pos - i * 100 - i);
                }
                break;
            }
        }
    }
}

function getQueenMoves(pos, up, side, moves) {
    // Queen combines rook and bishop moves
    getRookMoves(pos, up, side, moves);
    getBishopMoves(pos, up, side, moves);
}

function getKingMoves(pos, up, side, moves) {
    const pieceColor = document.getElementById(`b${pos}`).innerText[0];
    
    // Regular moves
    if (side < 8) {
        const target = document.getElementById(`b${pos + 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 1);
        }
    }
    if (side > 1) {
        const target = document.getElementById(`b${pos - 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 1);
        }
    }
    if (up < 800) {
        const target = document.getElementById(`b${pos + 100}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 100);
        }
    }
    if (up > 100) {
        const target = document.getElementById(`b${pos - 100}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 100);
        }
    }
    
    // Diagonal moves
    if (up > 100 && side < 8) {
        const target = document.getElementById(`b${pos - 100 + 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 100 + 1);
        }
    }
    if (up > 100 && side > 1) {
        const target = document.getElementById(`b${pos - 100 - 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos - 100 - 1);
        }
    }
    if (up < 800 && side < 8) {
        const target = document.getElementById(`b${pos + 100 + 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 100 + 1);
        }
    }
    if (up < 800 && side > 1) {
        const target = document.getElementById(`b${pos + 100 - 1}`);
        if (target.innerText.length === 0 || target.innerText[0] !== pieceColor) {
            moves.push(pos + 100 - 1);
        }
    }
    
    // Castling moves (if implemented)
    // ... existing castling code ...
}
