currentActor = "actor1.jpg";
currentNumOfActor = 5;
currentSolutionSpeed = 1000;
Persons = [];
Positions = [];
totalChat = 0;
lineElements = [];
Pairs = []
labelElements = []

imagewidth = 10;
imageheight = 20;
imagexoffset = imagewidth / 2;
imageyoffset = imageheight / 2;
delaymsecs = 10;
positionxoffset = 0;

lineLabelElements = [];
Elapsed = 0;
var mytimer;

chatedElements = [];
timeidlist = [];

state = 0 //0: Reset 1: solution

language = "en"

function SetLanguage(lang) {
    if (language == lang) {
        return;
    }

    language = lang;

    if (lang == 'en') {
        url = 'index.html#' + language;
        window.open(url);
    } else {
        Localize();
    }
}

function StartGame() {
    url = 'html/game.html#' + language;
    window.open(url, '_self');
}

function getImageWidthHeight() {
    const element = document.querySelector('.actorimg');
    style = window.getComputedStyle(element, null);
    console.log("style", style);
    imagewidth = parseInt(style.width);
    imageheight = parseInt(style.height);
    imagexoffset = imagewidth / 2;
    imageyoffset = imageheight / 2;
}

function setSolutionSpeed(SolutionSpeed) {
    currentSolutionSpeed = SolutionSpeed
}


colors = ['#0048BA', 'yellow', 'red', 'blue', 'white', 'Orange', 'Pink', 'Purple',
    'brown', '#007FFF', 'black', 'magenta', '#7C0A02', '#3B2F2F', '#FAF0BE', 'cyber'
];

function generateColorLabels() {
    return;
    for (i = 0; i < colors.length; i++) {
        var lb = document.createElement("label");
        var t = document.createTextNode("Talk" + (i + 1).toString() + " ");
        lb.appendChild(t);
        lb.style.color = colors[i];
        lb.style.backgroundColor = "green";
        lb.style.position = "relative";
        xoffset = 26 * (i + 1);
        lb.style.left = xoffset.toString() + "px";
        document.body.appendChild(lb);
        labelElements.push(lb);
    }
}

function getcurrentactor() {
    return currentActor;
}

function getcurrentactorNum() {
    return currentNumOfActor;
}

function setcurrentactor(actor) {
    currentActor = actor;
}

function setcurrentactorNum(num) {
    currentNumOfActor = num;
}


function generateGame(num, actor) {
    persons = [];
    for (i = 0; i < num; ++i) {
        var person = {
            name: "Person_" + i,
            image: "../images/" + actor,
            message: "Message_" + i,
            messagenum: 1,
            chated: [],
            history: [],
            messageGot: [i],
            messageGotHistory: [
                [i]
            ]
        };
        persons.push(person);
    }

    return persons;
}


function getRandom(lim) {
    return Math.floor(Math.random() * lim)
}


function generateOne_TwoPositon(num, left, top, width, height, align = 0) {
    if (num == 1) {
        ////////alert(((num);
        xo = getRandom(width);
        yo = getRandom(height);
        if (xo < width / 4) {
            xo = width / 4;
        }

        if (yo < height / 4) {
            xo = height / 4;
        }
        xo += positionxoffset;
        console.log("xo", xo);
        console.log("yo", yo);
        console.log("left", left);
        console.log("top", top);
        position = {
            x: left + xo,
            y: top + yo
        };
        console.log(position);
        Positions.push(position)
    } else {
        hw = width / 2;
        hh = height / 2;
        xo = getRandom(hw);
        xo += positionxoffset;
        yo = getRandom(hh);
        if (align == 0) {
            position = {
                x: left + hw + xo,
                y: top + yo
            };
            Positions.push(position);
            position = {
                x: left + xo,
                y: top + hh + yo
            };
            Positions.push(position);
        } else {
            position = {
                x: left + xo,
                y: top + yo
            };
            Positions.push(position);
            position = {
                x: left + hw + xo,
                y: top + hh + yo
            };
            Positions.push(position);
        }
    }
}

function generatePositions(num) {
    element = document.getElementById("playarea");
    rect = element.getBoundingClientRect();
    left_ = rect.left;
    top_ = rect.top;
    width_ = rect.right - rect.left - imagewidth;
    height_ = rect.bottom - rect.top - imageheight;
    console.log("left:", left_);
    console.log("top:", top_);
    console.log("right:", rect.right);
    console.log("bottom:", rect.bottom);

    halfwidth = width_ / 2;
    halfheight = height_ / 2;
    console.log("halfwidth", halfwidth);
    console.log("halfheight", halfheight);

    xo = getRandom(width_ / 2);
    yo = getRandom(height_ / 2);

    console.log("num", num);
    num_ = parseInt(num);
    switch (num_) {
        case 2:
            generateOne_TwoPositon(1, left_, top_, halfwidth, halfheight);
            generateOne_TwoPositon(1, left_ + halfwidth, top_ + halfheight, halfwidth, halfheight);
            return;

        case 3:
            generateOne_TwoPositon(1, left_, top_, halfwidth, halfheight);
            generateOne_TwoPositon(1, left_ + halfwidth, top_, halfwidth, halfheight);
            generateOne_TwoPositon(1, left_, top_ + halfheight, halfwidth, halfheight);
            return;

        case 4:
            generateOne_TwoPositon(1, left_, top_, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_, top_ + halfheight, halfwidth, halfheight);
            generateOne_TwoPositon(1, left_ + halfwidth, top_ + halfheight, halfwidth, halfheight);
            generateOne_TwoPositon(1, left_ + halfwidth, top_, halfwidth, halfheight, 0);
            return;

        case 5:
            generateOne_TwoPositon(2, left_, top_, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_ + halfwidth, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_ + halfwidth, top_, halfwidth, halfheight, 0);
            return;

        case 6:
            generateOne_TwoPositon(2, left_, top_, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_ + halfwidth, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(2, left_ + halfwidth, top_, halfwidth, halfheight, 1);
            return;

        case 7:
            generateOne_TwoPositon(2, left_, top_, halfwidth, halfheight, 0);
            generateOne_TwoPositon(2, left_, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(1, left_ + halfwidth, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(2, left_ + halfwidth, top_, halfwidth, halfheight, 1);
            return;

        case 8:
            generateOne_TwoPositon(2, left_, top_, halfwidth, halfheight, 0);
            generateOne_TwoPositon(2, left_, top_ + halfheight, halfwidth, halfheight, 0);
            generateOne_TwoPositon(2, left_ + halfwidth, top_ + halfheight, halfwidth, halfheight, 1);
            generateOne_TwoPositon(2, left_ + halfwidth, top_, halfwidth, halfheight, 1);
            return;

        default:
            //alert(("default");
    }
}

function generateHTML(persons) {
    len = persons.length;

    htmltext = "";
    for (i = 0; i < len; i++) {
        htmltext += "<img class = \"actorimg\" src = " + persons[i].image + " id = " + persons[i].name + "  draggable=\"true\"" + " ondragstart=\"drag(event)\"" + " ondrop=\"drop(event)\"  " + " ondragover=\"allowDrop(event)\" " + "onmouseover='ShowChats(this.id)' onmouseout='HideChats(this.id)' ondragenter='DragEnter(event)' ondragleave='DragLeave(event)' ondragover='DragOver(event)' ondragexit='DragExit(event)' " + "/>"
        //htmltext += "<img class = \"actorimg\" src = " + persons[i].image  + " id = " + persons[i].name + "  draggable=\"true\"" + " ondragstart=\"drag(event)\"" + " ondrop=\"drop(event)\"  " + " ondragover=\"allowDrop(event)\" />"
        htmltext += "<label class = \"actorlabel\" id = \"label_" + i + "\">1</label>";
    }

    return htmltext;
}

function ReLocatePersons(num) {
    for (i = 0; i < num; i++) {
        console.log("Positions.length", Positions.length);
        console.log("i", i);
        x = Positions[i].x;
        y = Positions[i].y;
        id = "Person_" + i;
        element = document.getElementById(id);
        xpos = x.toString() + "px";
        ypos = y.toString() + "px";
        element.style.left = xpos;
        element.style.top = ypos;

        id = "label_" + i;
        element = document.getElementById(id);
        x -= 18;
        x += imagewidth;
        y -= 10;
        xpos = x.toString() + "px";
        ypos = y.toString() + "px";
        element.style.left = xpos;
        element.style.top = ypos;

    }
}

function geneartePersons(num, actor) {
    Persons = [];
    Positions = [];
    //debugger();
    persons = generateGame(num, actor);
    htmltext = generateHTML(persons);
    document.getElementById("playarea").innerHTML = htmltext;
    getImageWidthHeight();
    generatePositions(num);
    for (i = 0; i < Positions.length; i++) {
        console.log("position:x", Positions[i].x);
        console.log("position y", Positions[i].y);
    }

    Persons = persons;
    ReLocatePersons(num);
}

function UpdateElapsed() {
    Elapsed += 1;
    UpdateLabelText("HowLong", Elapsed, "red");
    mytimer = setTimeout(UpdateElapsed, 1000);
}

function DisplayMessageGot() {
    for (i = 0; i < Persons.length; i++) {
        console.log(i, " messageGot", Persons[i].messageGot);
    }
}

function AlertMessageGot() {
    for (i = 0; i < Persons.length; i++) {
        alert(Persons[i].messageGot);
    }
}

function Reset() {

    state = 0;
    ClearAllTimers();
    for (i = 0; i < lineElements.length; i++) {
        element = lineElements[i];
        element.parentNode.removeChild(element);
        //element.outerHTML = "";
    }

    for (i = 0; i < labelElements.length; i++) {
        element = labelElements[i];
        element.parentNode.removeChild(element);
    }


    for (i = 0; i < lineLabelElements.length; i++) {
        element = lineLabelElements[i];
        element.parentNode.removeChild(element);
    }

    Elapsed = 0;
    Pairs = [];
    lineElements = [];
    labelElements = [];
    lineLabelElements = [];
    Persons = [];
    Positions = [];
    totalChat = 0;
    UpdateLabelText("Counter", totalChat, "red");

    actor = getcurrentactor();
    num = getcurrentactorNum();
    console.log("num/actor", num, actor)
    geneartePersons(num, actor);

    generateColorLabels();

    mytimer = setTimeout(UpdateElapsed, 1000);

    console.log("on load");
    DisplayMessageGot();

    Localize();
    updateGossipNum(num);
}

function fetchVideoAndPlay() {
    fetch('../contents/music.mp3')
        .then(response => response.blob())
        .then(blob => {
            var x = document.getElementById("backaudio");
            x.srcObject = blob;
            return x.play();
        })
        .then(_ => {
            // Video playback started ;)
        })
        .catch(e => {
            // Video playback failed ;(
        })
}

function PlayMusic() {
    var media = document.getElementById("backaudio");
    //alert(media);
    media.load();
    setTimeout(function () {
        media.play();
    }, 2000);

}

function onLoadHome() {
    var passhash = md5(language);
    console.log("test md5 function:", passhash);
    console.log("Language:", language);
    language = window.location.hash;
    if (language == "") {
        language = 'en';
    } else {
        language = language.substr(1);
    }
    Localize();
}

function onLoad() {
    language = window.location.hash;
    if (language == "") {
        language = 'en';
    } else {
        language = language.substr(1);
    }

    Translate(language, "good morning");

    var passhash = md5(language);
    console.log("test md5 function:", passhash);
    console.log("Language:", language);
    currentNumOfActor = parseInt(document.getElementById("myRange").value);
    updateGossipNum(currentNumOfActor);

    currentSolutionSpeed = parseInt(document.getElementById("mysolution").value);
    updateSolutionSpeed(currentSolutionSpeed);

    Reset();
}

function updateGossipNum(num) {
    //alert(num);
    //alert(document.getElementById("gossip_num").innerHTML);
    currentNumOfActor = parseInt(document.getElementById("myRange").value);
    //alert(currentNumOfActor);
    document.getElementById("gossip_num").textContent = currentNumOfActor.toString();
    //alert(document.getElementById("gossip_num").textContent);
}

function updateSolutionSpeed(num) {
    document.getElementById("solutionspeed").innerHTML = num.toString();
}

function updateSlider(slideAmount) {
    setcurrentactorNum(slideAmount);
    updateGossipNum(slideAmount);
    Reset();
}

function updateSolutionSlider(slideAmount) {
    //alert(slideAmount);
    setSolutionSpeed(slideAmount);
    //alert(currentSolutionSpeed);
    updateSolutionSpeed(slideAmount);
}

function UpdateActor() {
    var actor = document.getElementById("mySelect").value;
    actor = actor + ".jpg";
    setcurrentactor(actor);
    Reset();
}


function createLineElement(x, y, length, angle, color) {
    var line = document.createElement("div");
    var styles = 'border: 2px solid ' + color + ';' //red; '
        +
        'width: ' + length + 'px; ' +
        'height: 0px; ' +
        '-moz-transform: rotate(' + angle + 'rad); ' +
        '-webkit-transform: rotate(' + angle + 'rad); ' +
        '-o-transform: rotate(' + angle + 'rad); ' +
        '-ms-transform: rotate(' + angle + 'rad); ' +
        'position: absolute; ' +
        'top: ' + y + 'px; ' +
        'left: ' + x + 'px; ';
    line.setAttribute('style', styles);
    return line;
}


function CreateLabelForChat(x, y) {
    console.log("label x/y/totalChat", x, y, totalChat);
    var lb = document.createElement("label");
    var t = document.createTextNode(_("Talk") + (totalChat + 1).toString() + " ");
    lb.appendChild(t);
    color = "red";
    if (totalChat < colors.length) {
        color = colors[totalChat];
    }

    lb.style.color = color;
    //lb.style.backgroundColor = "green";
    lb.style.position = "fixed";
    xoffset = x;
    lb.style.left = xoffset.toString() + "px";
    lb.style.top = y.toString() + "px";
    lb.style.fontsize = "larger";
    document.body.appendChild(lb);
    lineLabelElements.push(lb);
}


function createLine(x1, y1, x2, y2) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    if (totalChat > 16) {
        color = 'red';
    } else {
        color = colors[totalChat];
    }

    CreateLabelForChat(sx, sy);

    return createLineElement(x, y, c, alpha, color);
}


function allowDrop(ev) {
    ev.preventDefault();
}

function getElementRect(id) {
    console.log("Get rect", id);
    element = document.getElementById(id);
    rect = element.getBoundingClientRect();
    return rect;
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("on drag");
    DisplayMessageGot();
}


function getPersonIndex(personid) {
    id = personid.substr(7); // ("Person_"
    return parseInt(id)
}

function UpdateLabelText(id, value, color) {
    ele = document.getElementById(id);
    ele.textContent = value.toString();
    ele.style.color = color;
}

function UpdateCounter(personid) {
    id = "label_" + personid;
    counter = Persons[personid].messagenum;
    color = "green";
    if (counter < currentNumOfActor) {
        color = "red";
    }

    UpdateLabelText(id, counter, color);
}

union = []

function GetUnion(messageArr1, messageArr2) {
    union = []

    //union = messageArr1;
    for (i = 0; i < messageArr1.length; i++) {
        union.push(messageArr1[i]);
    }

    for (i = 0; i < messageArr2.length; i++) {
        if (!union.includes(messageArr2[i])) {
            union.push(messageArr2[i]);
        }
    }

    return union;
}

function UpdatePersonChat(srcpersonid, trgpersonid) {
    srcperson = getPersonIndex(srcpersonid);
    trgperson = getPersonIndex(trgpersonid);


    Persons[srcperson].history.push(Persons[srcperson].messagenum);
    Persons[trgperson].history.push(Persons[trgperson].messagenum);


    Persons[trgperson].messageGotHistory.push(Persons[trgperson].messageGot);
    Persons[srcperson].messageGotHistory.push(Persons[srcperson].messageGot);
    //messagenum = parseInt(Persons[srcperson].messagenum) + parseInt(Persons[trgperson].messagenum);


    //union = GetUnion(Persons[srcperson].messageGot, Persons[trgperson].messageGot);


    var union = Persons[srcperson].messageGot.concat(Persons[trgperson].messageGot.filter(function (item) {
        return Persons[srcperson].messageGot.indexOf(item) < 0;
    }));


    console.log("uniuon", union);
    messagenum = union.length;


    if (messagenum > currentNumOfActor) {
        messagenum = currentNumOfActor;
    }

    Persons[srcperson].messagenum = messagenum;
    Persons[srcperson].messageGot = union;
    UpdateCounter(srcperson);

    Persons[trgperson].messagenum = messagenum;
    Persons[trgperson].messageGot = union;
    UpdateCounter(trgperson);

    Persons[srcperson].chated.push(trgpersonid);
    Persons[trgperson].chated.push(srcpersonid);

    union = []

}

function AlreadyChatted(srcpersonid, trgpersonid) {
    console.log("AlreadyChatted");
    //AlertMessageGot();

    srcperson = getPersonIndex(srcpersonid);
    trgperson = getPersonIndex(trgpersonid);
    console.log("Pairs", Pairs);
    for (i = 0; i < Pairs.length; i++) {
        if (Pairs[i].src == srcperson && Pairs[i].trg == trgperson) {
            console.log(Pairs.length);
            console.log(srcperson);
            console.log(trgperson);
            console.log(Pairs[i].src);
            console.log(Pairs[i].trg);
            console.log(srcperson);
            return true;
        }
        if (Pairs[i].src == trgperson && Pairs[i].trg == srcperson) {
            //alert(("beep")
            return true;
        }
    }

    pair = {
        src: srcperson,
        trg: trgperson
    };
    Pairs.push(pair);
    return false;
}

function MakeAChat(src, trg) {
    console.log("AlreadyChatted");

    srcRect = getElementRect(src);
    trgRect = getElementRect(trg);
    left_ = srcRect.left + imagexoffset;
    top_ = srcRect.top + imageyoffset;
    right_ = trgRect.left + imagexoffset;
    bottom_ = trgRect.top + imageyoffset;

    lineele = createLine(left_, top_, right_, bottom_);
    document.body.appendChild(lineele);

    lineElements.push(lineele);

    console.log("AlreadyChatted-1");

    UpdatePersonChat(src, trg);
    totalChat += 1;
    console.log("Update Counter!");
    UpdateLabelText("Counter", totalChat, "red");

}

//Added format function for string
String.prototype.format = function () {
    var args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a) {
        return args[+(a.substr(1, a.length - 2)) || 0];
    });
};


function showResult() {
    //alert("Show redult");
    messid = 1;
    if (currentNumOfActor == 2) {
        if (totalChat > 2) {
            messid = 1;
        } else {
            messid = 2;
        }
    } else if (currentNumOfActor == 3) {
        if (totalChat > 3) {
            messid = 1;
        } else {
            messid = 2;
        }
    } else {
        if (totalChat > currentNumOfActor * 2 - 4) {
            messid = 1;
        } else {
            messid = 2;
        }
    }

    if (messid == 1) {
        alert(_("You are done, But not good enough!"))
    } else {
        message = _("Congratulations, you made it in {0} seconds!").format(Elapsed);
        alert(message);
    }
}

function MakeJudge() {
    for (i = 0; i < currentNumOfActor; i++) {
        if (Persons[i].messagenum < currentNumOfActor) {
            return;
        }
    }

    clearTimeout(mytimer);
    setTimeout(showResult, 200);
}


function drop(ev) {
    console.log("on drop");
    //AlertMessageGot();

    ev.preventDefault();
    ev.stopPropagation();

    var data = ev.dataTransfer.getData("text");
    srcpersonid_ = data;
    console.log("srcperson", srcpersonid_);
    trgpersonid_ = ev.target.id;
    playSound();
    console.log("play sound");
    //AlertMessageGot();

    if (srcpersonid_ == trgpersonid_) {
        console.log("Cannot chat with self!");
        return;
    }

    if (!AlreadyChatted(srcpersonid_, trgpersonid_)) {
        srcperson = data;
        console.log("srcperson", srcperson);
        trgperson = ev.target.id;
        MakeAChat(srcpersonid_, trgpersonid_);
        MakeJudge();
    } else {
        console.log(srcpersonid_, trgpersonid_, "Already chated!");
    }
}

function DelayedMakeAChat(delayed, src, trg) {
    console.log("DelayedMakeAChat", delayed);
    timid = setTimeout(MakeAChat, delayed, src, trg);
    timeidlist.push(timid);
}

function ClearAllTimers() {
    clearTimeout(mytimer);
    for (i = 0; i < timeidlist.length; i++) {
        clearTimeout(timeidlist[i]);
    }
    timeidlist = [];
}

function Solution() {
    state = 1;
    console.log("1111");
    Elapsed = 0;
    ClearAllTimers();

    UpdateLabelText("HowLong", Elapsed, "red");

    console.log("2222");
    for (i = 0; i < lineElements.length; i++) {
        element = lineElements[i];
        element.parentNode.removeChild(element);
        //element.outerHTML = "";
    }

    console.log("3333");
    for (i = 0; i < lineLabelElements.length; i++) {
        element = lineLabelElements[i];
        element.parentNode.removeChild(element);
        //element.outerHTML = "";
    }


    for (i = 0; i < Persons.length; i++) {
        Persons[i].messageGot = [i];
        Persons[i].messageGotHistory = [];
        Persons[i].history = [];
        Persons[i].messagenum = 1;
        UpdateCounter(i);
    }

    console.log("4444");
    totalChat = 0;
    lineElements = [];
    lineLabelElements = [];
    Pairs = []

    offsetdelayed = parseInt(currentSolutionSpeed);
    delayed = 300; //offsetdelayed;    //1 * 1000;

    console.log("5555");
    console.log("currentNumOfActor", currentNumOfActor);
    if (currentNumOfActor == 2) {
        DelayedMakeAChat(delayed, "Person_0", "Person_1");
    } else if (currentNumOfActor == 3) {
        DelayedMakeAChat(delayed, "Person_0", "Person_1");
        delayed += offsetdelayed;

        DelayedMakeAChat(delayed, "Person_2", "Person_1");
        delayed += offsetdelayed;

        DelayedMakeAChat(delayed, "Person_0", "Person_2");
        delayed += offsetdelayed;
    } else {
        console.log("6666");
        if (currentNumOfActor > 4) {
            console.log("7777");
            for (i = currentNumOfActor - 1; i > 3; i--) {
                console.log("8888", i);

                srcperson = "Person_" + i.toString();
                trgperson = "Person_" + (i - 1).toString();

                DelayedMakeAChat(delayed, srcperson, trgperson);
                delayed += offsetdelayed;
            }
        }

        console.log("9999");
        DelayedMakeAChat(delayed, "Person_3", "Person_2");
        delayed += offsetdelayed;

        DelayedMakeAChat(delayed, "Person_1", "Person_0");
        delayed += offsetdelayed;

        DelayedMakeAChat(delayed, "Person_1", "Person_2");
        delayed += offsetdelayed;

        DelayedMakeAChat(delayed, "Person_0", "Person_3");
        delayed += offsetdelayed;

        console.log("AAAA");

        if (currentNumOfActor > 4) {
            for (i = currentNumOfActor - 1; i > 3; i--) {
                console.log("AAAA", i);
                srcperson = "Person_" + i.toString();
                DelayedMakeAChat(delayed, srcperson, "Person_0");
                delayed += offsetdelayed;
            }
        }

        console.log("BBBB");
    }

}


function Undo() {
    if (totalChat == 0) {
        //alert(("Can not Undo any more!")
        return;
    }

    totalChat -= 1;
    UpdateLabelText("Counter", totalChat, "red");

    pair = Pairs[Pairs.length - 1];
    srcperson = "Person_" + pair.src;
    trgperson = "Person_" + pair.trg;
    Persons[pair.src].messagenum = Persons[pair.src].history[Persons[pair.src].history.length - 1];
    UpdateCounter(pair.src);

    Persons[pair.trg].messagenum = Persons[pair.trg].history[Persons[pair.trg].history.length - 1];
    UpdateCounter(pair.trg);

    Persons[pair.src].history.pop();
    Persons[pair.trg].history.pop();

    console.log("length of ", pair.src, Persons[pair.src].messageGotHistory.length)
    Persons[pair.src].messageGot = Persons[pair.src].messageGotHistory[Persons[pair.src].messageGotHistory.length - 1];

    console.log("length of ", pair.trg, Persons[pair.trg].messageGotHistory.length)
    Persons[pair.trg].messageGot = Persons[pair.trg].messageGotHistory[Persons[pair.trg].messageGotHistory.length - 1];

    console.log("src restore to:", Persons[pair.src].messageGot);
    console.log("trg restore to:", Persons[pair.trg].messageGot);


    Persons[pair.src].messageGotHistory.pop();
    Persons[pair.trg].messageGotHistory.pop();

    Pairs.pop()

    lineele = lineElements[lineElements.length - 1];
    lineele.parentNode.removeChild(lineele);
    lineElements.pop();

    lineele = lineLabelElements[lineLabelElements.length - 1];
    lineele.parentNode.removeChild(lineele);
    lineLabelElements.pop();
}


function playSound() {
    var x = document.getElementById("dropAudio");
    x.play();
}

function basicPopup(url, width, height) {
    wh = 'width=' + width + ', height=' + height + ',';
    style = wh + 'left=100,top=100,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no, status=no,location=no';
    popupWindow = window.open(url, 'popUpWindow', style);
}

function SolutionExplanation() {
    url = "solution.html";
    if (window.showModelessDialog) {
        showModelessDialog(url, window, "dialogWidth:600px; dialogHeight:750px");
    } else {
        //popupWindow = window.open(url,'_blank');
        //window.open(url);
        //popupWindow.focus();
        basicPopup(url, 1270, 800);
    }
}


function GetInstructions() {
    url = 'instruction.html#' + language;
    basicPopup(url, 1000, 750);
}


function ShowChats(personid) {
    index = getPersonIndex(personid);

    len = Persons[index].messageGot.length;

    for (i = 0; i < len; i++) {
        var lb = document.createElement("label");
        var t = document.createTextNode("Gossip " + Persons[index].messageGot[i]);
        lb.appendChild(t);
        lb.style.color = 'yellow';
        lb.style.backgroundColor = "green";
        lb.style.position = "fixed";
        x = Positions[index].x + imagewidth + 10;
        lb.style.left = x.toString() + "px";
        y = Positions[index].y + 10 + imageheight + i * 30;
        lb.style.top = y.toString() + "px";
        console.log("x/y", x, y);
        document.body.appendChild(lb);
        chatedElements.push(lb);
    }
}

function HideChats(persionid) {
    for (i = 0; i < chatedElements.length; i++) {
        element = chatedElements[i];
        element.parentNode.removeChild(element);

    }

    chatedElements = [];
}


function DragEnter(event) {
    event.preventDefault();
    event.stopPropagation(); // stop it here to prevent it bubble up

    event.target.style.border = "5px dotted red";
}


function DragLeave(event) {
    event.stopPropagation(); // stop it here to prevent it bubble up

    event.target.style.border = "";
}

function DragOver(event) {
    event.stopPropagation(); // stop it here to prevent it bubble up
    event.preventDefault(); // allows us to drop
    event.dataTransfer.dropEffect = 'link'; // we have to set it for firefox to be happy      
}

function DragExit(event) {
    event.stopPropagation(); // stop it here to prevent it bubble up
}

function Translate(language, text) {
    /*
    try {
        const res = translate(text, {from: 'en', to: language});
    } catch(err) {

    }
    */
    return i18nTranslate(language, text);
}


function GetLocalizedText(text) {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        textmd5 = md5(text);
        lsname = language + '.' + textmd5;
        if (localStorage.lsname) {
            return localStorage.getItem(lsname);
        } else {
            t_text = Translate(language, text);
            localStorage.lsname = t_text;
            return t_text;
        }
    } else {
        // Sorry! No Web Storage support..
        return text;
    }
}

function ToHome() {
    url = '../index.html#' + language;
    window.open(url, '_self')
}