var drink = e => {
    chrome.notifications.create(null, {
        type: 'image',
        iconUrl: 'img/icon.png',
        title: '🐶狗头提示',
        message: '萌萌哒该喝水了😘',
        imageUrl: 'img/beizi.png'
    });
}

var newChat = e => {
    chrome.notifications.create(null, {
        type: 'image',
        iconUrl: 'img/icon.png',
        title: '🐶狗头提示',
        message: '有新消息！！！',
        imageUrl: 'img/beizi.png'
    });
}
var isOpen = false;
var b = setInterval(function () {
    var date = new Date();
    if (parseInt(date.getHours()) >= 9 && parseInt(date.getHours()) <= 19) {
        isOpen = true;
    } else {
        isOpen = false;
    }
}, 1000 * 60);

var d = setInterval(function () {
    if (isOpen) {
        drink();
    }
}, 1000 * 60 * 20);

var lastTime = 0;
setInterval(function () {
    $.ajax({
        url:'http://guolifu.pw/home/Chat/getLastTime',
        success:function (res) {
            if (lastTime != 0 && res > lastTime) {
                newChat()
            }
            lastTime = res
        },
        error:function (res) {
            
        }
    })

},5000)
