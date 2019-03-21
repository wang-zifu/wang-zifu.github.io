var TranslationTable = {
    "cn": { "translateId-1" : "八卦问题", 
            "translateId-2" : "八卦数学问题",
            "translateId-3": "欢迎来到北岸中学数学日活动",
        },
    "fr": { "translateId-1" : "八卦问题", 
            "translateId-2" : "八卦数学问题",
            "translateId-3": "欢迎来到北岸中学数学日活动",
    },
};

function i18nTranslate(language, text)
{
    if(TranslationTable[language] == undefined ||  TranslationTable[language][text] == undefined) {
        return "";
    }

    return TranslationTable[language][text];
}

function Localize()
{
    var itemsToTranslate = document.getElementsByClassName('toTranslate');

    for(var i = 0; i < itemsToTranslate.length; i++) {
        i18nid = itemsToTranslate[i].getAttribute("i18nid");
        //alert(i18nid);
        html = itemsToTranslate[i].innerHTML;
        text = itemsToTranslate[i].textContent;
        txt = Translate(language, i18nid);
        //alert(text);
        if(txt == "") {
            continue;
        }

        if(text == html) {
            itemsToTranslate[i].textContent = txt;
            //alert(txt);
        } else {
            itemsToTranslate[i].innerHTML = txt;
            //alert(htm);
        }
    }
}
