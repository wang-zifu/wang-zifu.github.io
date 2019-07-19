function UpdatePlayArea() {
    newHTML = generateHTMLTags();
    document.getElementById("playArea").innerHTML = newHTML;
    setTimeout(setCSSPosition(), 100);
    isActiveArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}

function generateHTMLTags() {
    html = "";
    for (i = 0; i < 16; i++) {
        oneEleHtml = "<button id=\"" + "token" + i + "\" style=\"background-color:"
            + colorWheel(i) + "\"" + " onclick=\"tokenClick(" + i + ")\" ></button>" + "\n";
        html += oneEleHtml;
    }
    return html;
}

function setCSSPosition() {
    rect = document.getElementById("playArea").getBoundingClientRect();
    for (i = 0; i < 16; i++) {
        coords = calculateCSSPosition(i, rect.left, rect.top, rect.right, rect.bottom);
        ele = document.getElementById("token" + i);
        ele.style.left = coords['xValue'] + "px";
        ele.style.top = coords['yValue'] + "px";
        ele.style.width = coords['w'] + "px";
        ele.style.height = coords['h'] + "px";
        ele.style.position = "fixed";
    }
}

function colorWheel(id) {
    var colors = ["#4285F4", "#FBBC05", "#FBBC05", "#FBBC05", "#34A853", "#34A853",
        "#34A853", "#34A853", "#34A853", "#EA4335", "#EA4335", "#EA4335", "#EA4335",
        "#EA4335", "#EA4335", "#EA4335"];
    return colors[id];
}

var isActiveArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var isLockArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function tokenClick(index) {
    ele = document.getElementById("token" + index);
    ele.style.display = "none";
    ele.disabled = true;
    isActiveArray[index] = 0;
    toLock = getToLockButtons(index);
    console.log('toLock', toLock);
    for(i = 0; i < toLock.length; i++){
        ele = document.getElementById("token" + toLock[i]); 
        if(isActiveArray[toLock[i]] == 1){
            ele.disabled = true;
            isLockArray[toLock[i]] = 1;
        }
    }
    setTimeout(isGameOver(), 500);
    console.log('isLockArray', isLockArray);
    console.log('clicked');
}

function machineClick(index){
    ele = document.getElementById("token" + index);
    ele.style.display = "none";
    ele.disabled = true;
    isActiveArray[index] = 0;
}

function getToLockButtons(index){
    if(index > 8){
        return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }else if(index > 3){
        return [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15];
    }else if(index > 0){
        return [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    }else{
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    }
}

function unLock(){
    for(i = 0; i < 16; i++){
        ele = document.getElementById("token" + i); 
        ele.disabled = false;
        console.log("token", i, "ele.disabled",ele.disabled);
    }
}


function isActive(index) {
    return isActiveArray[index];
}

function updateTokens(row, amnt){
    var start = (Math.pow((row - 1), 2));
    console.log('start', start);
    var end = (start + amnt);
    var disabled = [];
    var increase = 0;
    for(i = start; i < end; i++){
        if(isActive(i) == 0){
            disabled.push(i);
            end++;
            increase++;
        }
    }
    console.log('disabled', disabled);
    var trueEnd = (disabled.length + end - increase);
    var count = 0;
    for(i = start; i < trueEnd; i++){
        if(disabled.includes(i) == false){
            count++;
            setTimeout(machineClick, 300*count, i);
        }
    }
    console.log('isLockArray 1', isLockArray);
}

function countReturn() {
    var aCount1;
    aCount1 = isActive(0);
    var aCount2 = 0;
    for (i = 1; i < 4; i++) {
        aCount2 += isActiveArray[i];
    }
    var aCount3 = 0;
    for (i = 4; i < 9; i++) {
        aCount3 += isActiveArray[i];
    }
    var aCount4 = 0;
    for (i = 9; i < 16; i++) {
        aCount4 += isActiveArray[i];
    }

    var counters = {
        row1: aCount1,
        row2: aCount2,
        row3: aCount3,
        row4: aCount4
    };

    return counters;
}

var turnNum = 1;
var turnNum2 = 3;
var subturn = 0;

function onClick(){
    subturn++;
    ele = document.getElementById("turnButton");
    ele2 = document.getElementById("newGameButton");
    color = getColorings(turnNum);
    console.log('turn num 1', turnNum);
    console.log("new color", color);
    console.log("this", this);
    console.log('ele', ele);
    ele.style.color = getColorings(turnNum);
    ele.style.backgroundColor = "white";
    ele.style.borderColor = getColorings(turnNum);
    ele2.style.color = getColorings(turnNum2);
    ele2.style.backgroundColor = "white";
    ele2.style.borderColor = getColorings(turnNum2);
    nextMove();
}

function getColorings(index){
    var colors = ["#4285F4", "#FBBC05", "#34A853", "#EA4335"];
    return colors[index % 4];
}

function isGameOver(){
    var count = 0;
    for(i = 0; i< 16; i++){
        if(isActive(i) == 1){
            count++;
        }
    }
    console.log('count', count);
    if(count == 0){
        alert("You Lost!")
    }
}

function nextMove() {
    isGameOver();
    unLock();
    console.log('turn num 2', turnNum);
    subturn++;
    turnNum++;
    turnNum2++;
    console.log('turn num', turnNum);
    var counters = countReturn();
    bCount1 = (counters['row1'] + 8).toString(2);
    bCount2 = (counters['row2'] + 8).toString(2);
    bCount3 = (counters['row3'] + 8).toString(2);
    bCount4 = (counters['row4'] + 8).toString(2);
    var cArray = [bCount1, bCount2, bCount3, bCount4];
    console.log('cArray1', cArray);
    var chars = [0, 0, 0, 0];
    var turn = balanceGame(cArray, chars);
    console.log('turn', turn);
    targetRow = (turn['row'] + 1);
    toRemove = turn['amnt'];
    console.log("Please remove " + toRemove +  " counters from row " + targetRow + ".");
    updateTokens(targetRow, toRemove);
}

function checkBalance(cArray, chars) {
    for (i = 1; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if ((cArray[j]).charAt(i) == 1) {
                chars[i]++;
            }
        }
    }
    console.log('cArray2', cArray);
    console.log('chars', chars);
    isBalanceArray = [1, 1, 1];
    for (i = 0; i < 3; i++) {
        if (chars[i+1] % 2 == 1) {
            isBalanceArray[i] = 0;
        }
    }
    console.log('isBalanceArray', isBalanceArray);
    return isBalanceArray;
}

function balanceGame(cArray, chars) {
    var toRemove = 0;
    var targetRow = -1;
    var turn = {
        row: targetRow,
        amnt: toRemove
    };
    var state = checkEndCase();
    var max = 0;
    var row;
    endCase = state['eCase'];
    console.log('endCase', endCase);
    endArray = state['eArray'];
    sizes = state['data'];
    switch (endCase) {
        case 3:
            console.log('endArray 3', endArray);
            for(i = 0; i < sizes.length; i++){
                if(sizes[i] > max){
                    row = i;
                }
            }
            console.log('case3 row', row);
            targetRow = row;
            toRemove = 1;
            turn = {
                row: targetRow,
                amnt: toRemove
            };
            return turn;
        case 2:
            var min;
            if (sizes[0] > sizes[1]) {
                max = sizes[0];
                row = endArray[0];
                min = sizes[1];
            } else {
                max = sizes[1];
                row = endArray[1];
                min = sizes[0];
            }
            targetRow = row;
            toRemove = max - min;
            console.log('max', max);
            console.log('min', min);
            console.log('case2Row', targetRow);
            console.log('case2Remove', toRemove);
            console.log('endArray2', endArray);
            turn = {
                row: targetRow,
                amnt: toRemove
            };
            return turn;
        case 1:
            var oneArray = [];
            for (i = 0; i < endArray.length; i++) {
                if (endArray[i] > max) {
                    max = sizes[i];
                    row = i;
                }
                if(sizes[i] > 0){
                    oneArray.push(i);
                }
            }
            targetRow = row;
            console.log('endArray', endArray);
            console.log('oneArray', oneArray);
            var cleansize = [];
            for(i=0; i<sizes.length; i++){
                if(sizes[i] > 0){
                    cleansize.push(sizes[i]);
                }
            }
            console.log('cleansize', cleansize);
            if(oneArray.length == 1){
                toRemove = (max - 1);
                turn = {
                    row: targetRow,
                    amnt: toRemove
                };
                return turn;
            }
            if (cleansize.length % 2 == 0) {
                toRemove = Math.max(...sizes);
            } else {
                toRemove = (Math.max(...sizes) - 1);
            }
            console.log('case1Row', targetRow);
            console.log('case1Remove', toRemove);
            console.log('endArray1', endArray);
            turn = {
                row: targetRow,
                amnt: toRemove
            };
            return turn;
    }
    var balance = checkBalance(cArray, chars);
    firstUnbalanced = balance.findIndex(isUnbalanced);
    console.log('firstUnbalanced', firstUnbalanced);
    var eligArray = [];
    switch (firstUnbalanced) {
        case 0:
            for (i = 0; i < 4; i++) {
                if (((cArray[i]).charAt(1)) == 1) {
                    eligArray.push(i);
                }
            }
            break;
        case 1:
            for (i = 0; i < 4; i++) {
                if (((cArray[i]).charAt(2)) == 1) {
                    eligArray.push(i);
                }
            }
            break;
        case 2:
            for (i = 0; i < 4; i++) {
                if (((cArray[i]).charAt(3)) == 1) {
                    eligArray.push(i);
                }
            }
            break;
    }
    console.log('eligArray', eligArray);
    targetRow = eligArray[Math.floor(Math.random() * eligArray.length)];
    console.log('row' + targetRow);

    switch (firstUnbalanced) {
        case 0:
            toRemove += (parseInt(cArray[targetRow], 2) - 12);
            break;
        case 1:            
            if ((parseInt(cArray[targetRow], 2)) >= 14) {
                toRemove += ((parseInt(cArray[targetRow], 2)) - 14);
            } else {
                toRemove += ((parseInt(cArray[targetRow], 2)) - 10);
            }
            console.log('toRemove1', toRemove);
            break;
        case 2:
            toRemove = toRemove;
            break;
    }
    toRemove++;
    console.log('toRemove1', toRemove);
    var nArray = cArray;
    var num = ((parseInt(cArray[targetRow], 2) - toRemove));
    console.log('num', num); 
    nArray[targetRow] = num.toString(2);
    console.log('nArray[targetRow]', nArray[targetRow]);
    var nchars = [0, 0, 0, 0];
    var newBalance = checkBalance(nArray, nchars);
    console.log('newBalance', newBalance);
    for (i = 0; i < 3; i++) {
        if (newBalance[i] == 0) {
            toRemove += Math.pow(2,(2 - i));
        }
    }
    console.log('toRemove', toRemove);
    turn = {
        row: targetRow,
        amnt: toRemove
    };
    return turn;
}

function isUnbalanced(bin) {
    return bin == 0;
}

function checkEndCase() {
    var counters = countReturn();
    eCount1 = counters['row1'];
    eCount2 = counters['row2'];
    eCount3 = counters['row3'];
    eCount4 = counters['row4'];
    var countArray = [eCount1, eCount2, eCount3, eCount4];
    console.log('countArray1', countArray);
    var case1 = [];
    var sizes1 = [];
    var sizes2 = [];
    var case2 = [];
    var posCase1 = [];
    var negCase1 = [];
    for (i = 0; i < 4; i++) {
        if (countArray[i] != 0) {
            case2.push(i);
            sizes2.push(countArray[i]);
        }else{
            case1.push(0);
            sizes1.push(0);
        }
        if (countArray[i] > 1) {
            case1.push(i);
            posCase1.push(i);
            sizes1.push(countArray[i]);
        }else if (countArray[i] == 1) {
            case1.push(-i);
            negCase1.push(-i);
            sizes1.push(countArray[i]);
        }
    }
    console.log('countArray', countArray);
    var endCase;
    var endArray = [];
    var sizes = [];
    if(posCase1.length == 0 && negCase1.length > 0){
        endCase = 3;
        endArray = case1;
        sizes = sizes1;
    }else if (posCase1.length == 1){ 
        endCase = 1;
        endArray = case1;
        sizes = sizes1;
    }else if (case2.length == 2) {
        endCase = 2;
        endArray = case2;
        sizes = sizes2;
    } else {
        endCase = 0;
    }
    console.log('case1', case1);
    console.log('case2', case2);
    console.log('sizes1', sizes1);
    console.log('sizes2', sizes2);
    var state = {
        eCase: endCase,
        eArray: endArray,
        data: sizes
    };
    return state;
}

function positionReturn(index) {
    var rows = [1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4];
    var d = rows[index];
    var v = 0;
    switch (d) {
        case 1:
            v = 4;
            break;
        case 2:
            v = index + 2;
            break;
        case 3:
            v = index - 2;
            break;
        case 4:
            v = index - 8;
            break;
    }

    var position = {
        row: d,
        place: v
    };
    return position;
}

function calculateCSSPosition(index, x1, y1, x2, y2) {
    var book = positionReturn(index);
    row = book['row'];
    place = book['place'];
    xDist = 20;
    yDist = 30;
    xSpacing = 20;
    ySpacing = 20;
    xSpan = x2 - x1;
    ySpan = y2 - y1;
    width = ((xSpan - 2 * xDist) - (6 * xSpacing)) / 7;
    height = ((ySpan - 2 * yDist) - (3 * ySpacing)) / 4;
    var x = width * (place - 1) + xSpacing * (place - 1) + xDist;
    var y = height * (row - 1) + ySpacing * (row - 1) + yDist;
    var coords = {
        xValue: x,
        yValue: y,
        w: width,
        h: height
    };
    return coords;
}