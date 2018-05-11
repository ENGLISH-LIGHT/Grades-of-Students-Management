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
            .append('<thead><tr><th>学号</th><th>课程号</th><th>分数</th></tr></thead>')
            .append(obj.tBody)
            .append('<tfoot><th>学号</th><th>课程号</th><th>分数</th></tr></tfoot>');
        var dataShowStr = '<div class="data-show">' + '第 ' + obj.curPage + ' 页：' + '第 ' + (obj.ii * (obj.curPage-1) + 1) + '~' + (obj.ii * (obj.curPage-1) + obj.tBody.context.children.length) + ' 条数据' + '</div>';
        $('.data-record-wrapper').empty().append(dataShowStr);
    }
    
    // 清除welcome 字体中所有的样式
    // alert(1)
    $('#all-content').empty().append('<div class="welcome"> welcome </div>');
    // console.log($welcome);
    // 先注册导航栏上‘教师信息’的点击事件
    $('#nav-grade').click(function () {
        // alert('teacher');
        /*****************创建表结构开始***********************/
        var $allContent = $('#all-content');
        //清空欢迎的div
        //  添加小标题div 和 表主体div
        $allContent.empty().addClass('out-border')
            .append('<div id="main-title" class="panel-heading white-bg"></div>')
            .append('<div class="panel-body"></div>');
        var $titleDiv = $('#all-content>.panel-heading');
        var $bodyDiv = $('#all-content>.panel-body');
        // 给头div添加内容<h4>
        $titleDiv.empty().append('<h4 class="panel-title">学生成绩信息</h4>')
        // 添加显示数据条数
        $titleDiv.append('<div><div class="mydata_count"><label><span><select id="sel" size="1" name="datatable_length"><option value="3" selected="selected">3</option><option value="5">5</option><option value="10">10</option><option value="50">50</option></select></span>条数据</label></div><div><div id="datatable_filter"><label><input type="text" class="form-control input-large" placeholder="Search"></label></div></div></div>')

        //添加表格头部
        $bodyDiv.empty().append('<table class="table display" id="datatable1"></table>')
        var $table = $('.panel-body>.display');
        /*****************创建表结构结束***********************/
        /*****************ajax请求数据开始*********************/
        $.get('/grade/info', function (data, error) {
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
                        var strTds = '<td>' + data[i].Sno + '</td>'
                            + '<td>' + data[i].Lno + '</td>'
                            + '<td>' + data[i].Gscore + '</td>'

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
                    .append('<thead><tr><th>学号</th><th>课程号</th><th>分数</th></tr></thead>')
                    .append(arrPages[0])
                    .append('<tfoot><th>学号</th><th>课程号</th><th>分数</th></tr></tfoot>');
                // 写翻页按钮和数据显示条数
                $allContent.append('<div class="show-data"></div>');
                var $dataCount = $allContent.children('.show-data');
                var $dataRecord = $dataCount.append('<div class="data-record-wrapper"></div>').children('.data-record-wrapper');    /* width: 100%; */
                // 数据操作按钮div
                var $btnHandle = $dataCount.append('<div class="btn-handle"></div>').children(".btn-handle");  
                var $pageTurn = $dataCount.append('<div class="page-turn-wrapper"></div>').children('.page-turn-wrapper');
                // var ii = 3;
                var dataShowStr ='<div class="data-show">' + '第 ' + 1 + ' 页：'+ '第 ' + (ii * 0 + 1) + '~' + (ii * 0 + arrPages[0].length) + ' 条数据' + '</div>';
                $dataRecord.append(dataShowStr);
                 // 操作按钮
                 $btnHandle.append('<button class="btn btn-primary">修改</button><button class="btn btn-danger">删除</button><button class="btn btn-primary">添加</button>');
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
                })
                
            }
        }, 'json');
        /*****************ajax请求数据结束*********************/
    })
});