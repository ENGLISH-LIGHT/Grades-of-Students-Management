$(function () {
    // 欢迎
    $('#all-content').empty().append('<div class="welcome"> welcome </div>');

    // 点击个人信息导航栏
    $('#nav-my-info').click(function () {
        var $allContent = $('#all-content').empty();
        // 添加表单
        // var $clientSite = $('#all-context');
        var $formWrapper = $allContent.append('<div class="form-wrapper"></div>')
            .children('.form-wrapper');
        var $formTitle = $formWrapper.append('<div class="form-title">个人信息</div>')
            .children('.form-title');
        var $formBody = $formWrapper.append('<div class="form-body"></div>')
            .children('.form-body');
        // 往body中添加,一个一个的需要写入数据的 div
        var $teacherForm = $formBody.append('<form id="teacher-form" target="_self" action="student/detailInfo/insertInfo" method="POST">')
            .children('#teacher-form');
        $.get('student/detailInfo', function (data) {
            var d = data[0];
            $teacherForm.append(`<div class="form-li" id="form-li1"><label class="col-lg-2 col-md-2 col-sm-12 control-label">学&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号:</label><div class="col-lg-10 col-md-10"><input readonly value='${d.Sno}' type="text" name="Sno" class="form-control" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li2" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">班&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.Cno}' name="Cno" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li4" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.Ssex}' name="Ssex" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li5" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.Sname}' name="Sname" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li3" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">身&nbsp&nbsp&nbsp份&nbsp&nbsp证:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.Sidenti}' name="Sidenti" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li6" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp龄:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.Sage}' name="Sage" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li7" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">绩&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp点:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.SGPA}' name="SGPA" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li8" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">学&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp分:</label> <div class="col-lg-10 col-md-10"><input readonly value='${d.ShaveScore}' name="ShaveScore" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li9" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话:</label> <div class="col-lg-10 col-md-10"><input value='${d.Stel}' name="Stel" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li10" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">Q&nbsp&nbsp&nbsp&nbsp&nbsp&nbspQ:</label> <div class="col-lg-10 col-md-10"><input value='${d.SQQ}' name="SQQ" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li11" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp微:</label> <div class="col-lg-10 col-md-10"><input value='${d.Swechat}' name="Swechat" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li12" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱:</label> <div class="col-lg-10 col-md-10"><input value='${d.Semail}' name="Semail" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class="form-li" id = "form-li13" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">家庭地址:</label> <div class="col-lg-10 col-md-10"><input value='${d.Saddr}' name="Saddr" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li14" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">籍&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp贯:</label> <div class="col-lg-10 col-md-10"><input value='${d.SnativePlace}' name="SnativePlace" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li15" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">父&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp亲:</label> <div class="col-lg-10 col-md-10"><input value='${d.SdadName}' name="SdadName" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li16" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">母&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp亲:</label> <div class="col-lg-10 col-md-10"><input value='${d.SmumName}' name="SmumName" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li17" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">父亲电话:</label> <div class="col-lg-10 col-md-10"><input value='${d.SdadTel}' name="SdadTel" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li18" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">母亲电话:</label> <div class="col-lg-10 col-md-10"><input value='${d.SmumTel}' name="SmumTel" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li18" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">自我评价:</label> <div class="col-lg-10 col-md-10"><input value='${d.Sremarks}' name="Sremarks" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)
                .append(`<div class= "form-li" id = "form-li20" > <label class="col-lg-2 col-md-2 col-sm-12 control-label">头像地址:</label> <div class="col-lg-10 col-md-10"><input value='${d.SheadImg}' name="SheadImg" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>`)

            $teacherForm.append('<input type="submit" value="保  存" class="btn btn-success btn-block">')

        })

    })
})