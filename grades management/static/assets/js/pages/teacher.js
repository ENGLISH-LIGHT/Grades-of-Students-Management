$(document).ready(function () {
    // 写一个用于全局的翻页函数
    // obj = {
    //     curPage:0,
    //     allPages:4,//总页数
    //     ii:3,//每一页的数据条数
    //     tBody:arrPages[3],//tBOdy结构
    // }
    var turnPage = function(obj){
        $('.panel-body>.display').empty()
            .append('<thead><tr><th>教师编号</th><th>姓名</th><th>性别</th><th>电话</th><th>邮箱</th></tr></thead>')
            .append(obj.tBody)
            .append('<tfoot><tr><th>教师编号</th><th>姓名</th><th>性别</th><th>电话</th><th>邮箱</th></tr></tfoot>');
        var dataShowStr = '<div class="data-show">' + '第 ' + obj.curPage + ' 页：' + '第 ' + (obj.ii * (obj.curPage-1) + 1) + '~' + (obj.ii * (obj.curPage-1) + obj.tBody.context.children.length) + ' 条数据' + '</div>';
        $('.data-record-wrapper').empty().append(dataShowStr);
    }
    
    // 清除welcome 字体中所有的样式
    // alert(1)
    $('#all-content').empty().append('<div class="welcome"> welcome </div>');
    // console.log($welcome);
    // 先注册导航栏上‘教师信息’的点击事件
    $('#nav-teacher').click(function () {
        // alert('teacher');
        /*****************创建表结构开始***********************/
        var $allContent = $('#all-content').empty();
        //清空欢迎的div
        //  添加小标题div 和 表主体div
        $allContent.empty().addClass('out-border')
            .append('<div id="main-title" class="panel-heading white-bg"></div>')
            .append('<div class="panel-body"></div>');
        var $titleDiv = $('#all-content>.panel-heading');
        var $bodyDiv = $('#all-content>.panel-body');
        // 给头div添加内容<h4>
        $titleDiv.empty().append('<h4 class="panel-title">老师基本信息</h4>')
        // 添加显示数据条数
        $titleDiv.append('<div><div class="mydata_count"><label><span><select id="sel" size="1" name="datatable_length"><option value="3" selected="selected">3</option><option value="5">5</option><option value="10">10</option><option value="50">50</option></select></span>条数据</label></div><div><div id="datatable_filter"><label><input type="text" class="form-control input-large" placeholder="Search"></label></div></div></div>')

        //添加表格头部
        $bodyDiv.empty().append('<table class="table display" id="datatable1"></table>')
        var $table = $('.panel-body>.display');
        /*****************创建表结构结束***********************/
        /*****************ajax请求数据开始*********************/
        $.get('/teacher/info', function (data, error) {
            if (!error) {
                console.log(error);
                console.log(2);
            } else {
                var arrPages = [];
                var count = 0;
                var ii = Number($('#sel option:selected').val());
                console.log(ii);
                var  $page = $(document.createElement('tbody'));
                // 分组
                var divGroup =function(){
                    arrPages = [];
                    for (var i = 0; i < data.length; i++ , count++) {
                        if (ii === count) {
                            count = 0;
                            arrPages.push($page);
                            $page = $(document.createElement('tbody'));
                        }
                        var strTds = '<td>' + data[i].Tno + '</td>'
                            + '<td>' + data[i].Tname + '</td>'
                            + '<td>' + data[i].Tsex + '</td>'
                            + '<td>' + data[i].Ttel + '</td>'
                            + '<td>' + data[i].Temail + '</td>';
                        var newTr = document.createElement('tr');
                        $(newTr).append(strTds).appendTo($page);
                    }
                    if (0 < $page.length ) {
                        arrPages.push($page);
                    }
                }
                divGroup();
                // 对#sel 进行监视，检查值变化
                $('#sel').change(function(){
                    ii = Number($('#sel option:selected').val());
                    divGroup();
                })
                console.log(arrPages);
                $table.empty()
                    .append('<thead><tr><th>教师编号</th><th>姓名</th><th>性别</th><th>电话</th><th>邮箱</th></tr></thead>')
                    .append(arrPages[0])
                    .append('<tfoot><tr><th>教师编号</th><th>姓名</th><th>性别</th><th>电话</th><th>邮箱</th></tr></tfoot>');
                // 写翻页按钮和数据显示条数
                $allContent.append('<div class="show-data"></div>');
                var $dataCount = $allContent.children('.show-data');
                var $dataRecord = $dataCount.append('<div class="data-record-wrapper"></div>').children('.data-record-wrapper');    /* width: 100%; */
                // 数据操作按钮div
                var $btnHandle = $dataCount.append('<div class="btn-handle"></div>').children(".btn-handle");               
                var $pageTurn = $dataCount.append('<div class="page-turn-wrapper"></div>').children('.page-turn-wrapper');
                
                // 显示文本
                var dataShowStr ='<div class="data-show">' + '第 ' + 1 + ' 页：'+ '第 ' + (ii * 0 + 1) + '~' + (ii * 0 + arrPages[0].length) + ' 条数据' + '</div>';
                $dataRecord.append(dataShowStr);
                // 操作按钮
                $btnHandle.append('<button id="btn-update" class="btn btn-primary">修改</button><button id="btn-delete" class="btn btn-danger">删除</button><button id="btn-insert" class="btn btn-primary">添加</button>');
                // 翻页按钮
                var $turnPageBtnUl = $pageTurn.append('<ul class="pageTurnBtn-wrapper"></ul>').children('.pageTurnBtn-wrapper');
                var $firstPageBtnLi = $turnPageBtnUl.append('<li class="first-page-btn">First</li>').children('.first-page-btn');
                var $previousPageBtnLi = $turnPageBtnUl.append('<li class="previous-page-btn">< <</li>').children('.previous-page-btn');
                var $nextPageBtnLi = $turnPageBtnUl.append('<li class="next-page-btn">> ></li>').children('.next-page-btn');
                var $lastPageBtnLi = $turnPageBtnUl.append('<li class="last-page-btn">Last</li>').children('.last-page-btn');

                // 在翻页按钮上注册事件
                // 点击事件
                var curPage = 1,pageBody = arrPages[curPage-1];//默认配置
                // 禁用判断函数
                var forbidBtn = function () {
                    if (curPage === 1) {
                        $firstPageBtnLi.addClass('forbid-btn');
                        $previousPageBtnLi.addClass('forbid-btn');
                    }
                    else if (curPage === arrPages.length) {
                        $nextPageBtnLi.addClass('forbid-btn');
                        $lastPageBtnLi.addClass('forbid-btn');
                    }
                     else if(1<curPage&&curPage<arrPages.length)
                    {
                        $firstPageBtnLi.removeClass('forbid-btn');
                        $previousPageBtnLi.removeClass('forbid-btn');
                        $nextPageBtnLi.removeClass('forbid-btn');
                        $lastPageBtnLi.removeClass('forbid-btn');
                    }
                }
                forbidBtn();
                 // 添加表格的点击事件
                 var $trs = $('tbody>tr');
                $trs.click(function(){
                     if($(this).hasClass('delete-info')){
                         $(this).removeClass('delete-info');
                     }else{
                         $(this).addClass('delete-info');    
                     }
                     console.log(this);
                 })
                $firstPageBtnLi.click(function(){
                    curPage = 1;
                    forbidBtn();
                    pageBody = arrPages[curPage-1];
                    turnPage({
                        curPage:curPage,
                        allPages:arrPages.length,
                        ii:ii,
                        tBody:pageBody
                    });
                    $trs = $('tbody>tr');
                    $trs.click(function(){
                        if($(this).hasClass('delete-info')){
                            $(this).removeClass('delete-info');
                        }else{
                            $(this).addClass('delete-info');    
                        }
                        console.log(this);
                    })
                });
                $previousPageBtnLi.click(function(){
                    if(curPage === 1)return;
                    curPage--;
                    forbidBtn();
                    pageBody = arrPages[curPage-1];
                    turnPage({
                        curPage:curPage,
                        allPages:arrPages.length,
                        ii:ii,
                        tBody:pageBody
                    });
                    $trs = $('tbody>tr');
                    $trs.click(function(){
                        if($(this).hasClass('delete-info')){
                            $(this).removeClass('delete-info');
                        }else{
                            $(this).addClass('delete-info');    
                        }
                        console.log(this);
                    })
                    
                });
                $nextPageBtnLi.click(function(){
                    if(curPage === arrPages.length)return;
                    curPage++;
                    forbidBtn();
                    pageBody = arrPages[curPage-1];
                    turnPage({
                        curPage:curPage,
                        allPages:arrPages.length,
                        ii:ii,
                        tBody:pageBody
                    });
                    $trs = $('tbody>tr');
                    $trs.click(function(){
                        if($(this).hasClass('delete-info')){
                            $(this).removeClass('delete-info');
                        }else{
                            $(this).addClass('delete-info');    
                        }
                        console.log(this);
                    })
                    
                });
                $lastPageBtnLi.click(function(){
                    curPage = arrPages.length;
                    forbidBtn();
                    pageBody = arrPages[curPage-1];
                    turnPage({
                        curPage:curPage,
                        allPages:arrPages.length,
                        ii:ii,
                        tBody:pageBody
                    });
                    $trs = $('tbody>tr');
                    $trs.click(function(){
                        if($(this).hasClass('delete-info')){
                            $(this).removeClass('delete-info');
                        }else{
                            $(this).addClass('delete-info');    
                        }
                        console.log(this);
                    })
                    
                });
               
                // 添加按钮
                var $btnInsert = $('.btn-handle>#btn-insert');
                //  删除按钮
                var $btnDelete = $('.btn-handle>#btn-delete');
                // 修改按钮
                var $btnUpdate = $('.btn-handle>#btn-update');
                var addForm = function(){
                     // 清除客户区内容
                     $allContent.empty().removeClass('out-border');
                     // var $clientSite = $('#all-context');
                     var $formWrapper = $allContent.append('<div class="form-wrapper"></div>')
                         .children('.form-wrapper');
                     var $formTitle = $formWrapper.append('<div class="form-title">教师基本信息</div>')
                         .children('.form-title');
                     var $formBody = $formWrapper.append('<div class="form-body"></div>')
                         .children('.form-body');
                     // 往body中添加,一个一个的需要写入数据的 div
                     var $teacherForm = $formBody.append('<form id="teacher-form" target="_self" action="teacher/insertInfo" method="POST">')
                         .children('#teacher-form');
                     $teacherForm.append('<div class="form-li" id="form-li1"><label class="col-lg-2 col-md-2 col-sm-12 control-label">教师编号:</label><div class="col-lg-10 col-md-10"><input type="text" name="Tno" class="form-control" placeholder="字符长度 < 10且不含有中文" autofocus="autofocus"></div></div>')
                                 .append('<div class="form-li" id="form-li2"><label class="col-lg-2 col-md-2 col-sm-12 control-label">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:</label><div class="col-lg-10 col-md-10"><input name="Tname" type="text" class="form-control" placeholder="" autofocus="autofocus"></div></div>')
                                 .append('<div class="form-li" id="form-li3"><label class="col-lg-2 col-md-2 col-sm-12 control-label">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别:</label><div class="col-lg-10 col-md-10"><input name="Tsex" type="text" class="form-control" placeholder="输入"男"或"女",其他输入无效" autofocus="autofocus"></div></div>')
                                 .append('<div class="form-li" id="form-li4"><label class="col-lg-2 col-md-2 col-sm-12 control-label">电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话:</label><div class="col-lg-10 col-md-10"><input name="Ttel" type="text" class="form-control" placeholder="请输入11位的电话号码，其他输入无效" autofocus="autofocus"></div></div>')
                                 .append('<div class="form-li" id="form-li5"><label class="col-lg-2 col-md-2 col-sm-12 control-label">邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱:</label><div class="col-lg-10 col-md-10"><input name="Temail" type="text" class="form-control" placeholder="请输入邮箱，不含有中文且长度不能超过30" autofocus="autofocus"></div></div>')
                                 .append('<div class="form-li" id="form-li6"><label class="col-lg-2 col-md-2 col-sm-12 control-label">评&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp价:</label><div class="col-lg-10 col-md-10"><input name="Tremarks" type="text" class="form-control" placeholder="请输入老师评价，长度不能超过500" autofocus="autofocus"></div></div>')
                     $teacherForm.append('<input type="submit" value="添  加" class="btn btn-success btn-block">')
                }
                $btnInsert.click(function(){
                   addForm();
                });
                $btnDelete.click(function(){
                    var $clidkedTrs = $('.delete-info');
                    console.log($clidkedTrs);
                    var Tnos = [];
                    var tips = "确认要删除教师编号为：";
                    for(var i = 0; i < $clidkedTrs.length; i++){
                        Tnos.push($clidkedTrs[i].childNodes[0].innerHTML);
                        tips += (Tnos[i] + '、');
                    }
                    tips += "的数据吗？"
                    console.log(tips);
                    console.log(Tnos);
                    alert(tips)
                    var obj = {data:Tnos};
                    $.get('/teacher/deleteInfo',obj);
                    // 删除页面上的数据
                    $clidkedTrs.empty();
                });
                $btnUpdate.click(function(){
                    // 填充数据
                    var $selectedTrs = $('.delete-info');
                    var firstTr = $($selectedTrs[0]);
                    addForm();
                    // 修改表单提交的接口 和方式
                    $('form').attr("action","/teacher/updateInfo");
                    $('#form-li1 input').attr("value",firstTr.context.childNodes[0].innerHTML);
                    $('#form-li2 input').attr("value",firstTr.context.childNodes[1].innerHTML);
                    $('#form-li3 input').attr("value",firstTr.context.childNodes[2].innerHTML);
                    $('#form-li4 input').attr("value",firstTr.context.childNodes[3].innerHTML);
                    $('#form-li5 input').attr("value",firstTr.context.childNodes[4].innerHTML);
                    // 修改按钮值
                    $('form .btn-success').attr("value","修  改");
                })
            }
        }, 'json');
        /*****************ajax请求数据结束*********************/
    })
});