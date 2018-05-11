$(function(){
    // 先将预先设置好的值清除掉
    $('.btn-success').click(function(){
        var userName = $('#email').attr("value");
        var pass = $('#password').attr("value");
        console.log(userName,pass);
    })

})