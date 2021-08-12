(function () {
    init()

    function init() {
        var init_timestamp = Date.parse(new Date()) / 1000;
        $('#one_timestamp').val(init_timestamp);

        var timestamp = new Date(init_timestamp * 1000);
        $('#two_date').val(formatDate(timestamp))
    }

    $('#one_change').click(function () {
        setOneDate()
    });

    $('#one_select').change(function () {
        setOneDate()
    });

    $('#two_change').click(function () {
        setTwoDate()
    });

    $('#two_select').change(function () {
        setTwoDate()
    });

    function setOneDate() {
        var input_val = $('#one_select').val() == 1 ? $('#one_timestamp').val() * 1000 : $('#one_timestamp').val() * 1;
        var timestamp = new Date(input_val);
        if (timestamp == 'Invalid Date'){
            alert('请输入标准时间戳');
            return false
        }
        $('#one_date').val(formatDate(timestamp))
    }

    function setTwoDate() {
        var input_val = $('#two_date').val();
        var timestamp = new Date(input_val);
        if (timestamp == 'Invalid Date'){
            alert('请输入正确的日期格式');
            return false
        }
        var val = $('#two_select').val() == 1 ? timestamp.getTime() / 1000 : timestamp.getTime();
        $('#two_timestamp').val(val)
    }

    function formatDate(now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    $("#one_timestamp").keydown(function(e){
        if (e.which == 86) {
            setTimeout(function () {
                setOneDate()
            },5)
        }
    });

    $("#two_date").keydown(function(e){
        if (e.which == 86) {
            setTimeout(function () {
                setTwoDate()
            },5)
        }
    });

    function flushList(){
        $('#chat-ul').html('');
        $.ajax({
            url:'http://guolifu.pw/home/Chat/getChat',
            success:function (res) {
                for (var i=0;i<res.data.length;i++){
                    $('#chat-ul').append('<li>'+res.data[i].content+'---'+res.data[i].add_time+'</li>')
                }
            }
        })
    }

    function send(){
        var data = $('#chat-val').val();
        $.ajax({
            url:'http://guolifu.pw/home/Chat/addChat',
            data:{
                content:data
            },
            success:function (res) {
                flushList()
            }
        })

    }

    $('#chat-send').click(function () {
        send()
    });
    $('#f5').click(function () {
        flushList()
    });

    flushList();

    $("#chat-val").keydown(function(e){
        if (e.which == 13) {
            send()
        }
    });

})();
