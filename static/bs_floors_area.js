var mallTitleInfo = {};
var svg = "";

var option = {
    dataYear : [],
    init : function(dataYear, dataRentBase, dataRentMust, dataRentFact, maxY){
        if(maxY>0){
            var yy = (parseFloat(maxY)*parseFloat(1.4)).toFixed(0);
            this.yAxis[0].max= (parseFloat(yy) + 6- yy%6);
        }
        this.xAxis[0].data = dataYear;  //['年 13', '14', '15', '16', '17','18']
        this.series[0].data = dataRentBase; //[80, 90, 120, 140, 165,180]
        this.series[1].data = dataRentMust; //[140, 155, 170, 200, 220,260]
        this.series[2].data = dataRentFact; //[120,130,98,160]
    },
    color: ["#1ab1e1", "#ea7644", "#18bf9e"],
    grid: {
        x: 40,
        y: 50,
        x1: 0,
        y1: 0,
        width: "85%",
        height: "200px"
    },

    title: {
        subtext: '万元',
        subtextStyle: {
            fontSize: 12
        }
    },
    legend: {
        data: ['租金包', '合同应收','实际收租'],
        x: "center",
        y: 30,
        itemWidth:20,
        itemGap:5
    },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            crossStyle: {
                color: "red"
            }
        }
    },
    calculable: false,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: {
                lineStyle: {
                    color: "#CCCCCC",
                    width: 0.5,
                    type: "solid"
                }
            },
            axis: {
                show: true
            },
            axisLabel: {
                textStyle: {
                    align: "right",
                    fontSize: 12,
                    color: "#757575"
                }

            },
            axisTick:{
                show:false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true,
            min: 0,
            max: 300,
            splitNumber: 6,
            axisLine: {
                lineStyle: {
                    color: "#CCCCCC",
                    width: 1,
                    type: "solid"
                }
            },
            splitLine: {
                show: true
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                show: true,
                formatter: function (value) {
                    if (value == 0) {
                        return "";
                    }
                    return value;
                },
                textStyle: {
                    align: "right",
                    fontSize: 12,
                    color: "#757575"
                }
            }
        }
    ],
    series: [
        {

            name: '租金包',
            type: 'line',
            data: [],
            symbol: "emptyCircle",
            symbolSize: 4

        },

        {

            name: '合同应收',
            type: 'line',
            data: [],
            symbol: "emptyCircle",
            symbolSize: 4

        },
        {
            itemStyle: {normal: {areaStyle: {type: 'default',color:"rgba(231, 249, 244,0.5)"}}},
            name: '实际收租',
            type: 'line',
            data: [],
            symbol: "emptyCircle",
            symbolSize: 4

        }
    ]
};

$(function(){
    var minHeightContent = $(window).height()-116-41;
    $(".ys-content-left").css("min-height",minHeightContent+"px");

    function adaptSearchResultWrapperHeight(){
        var totalHeight = parseInt($(".ys-content-left").css("height"));

        var searchBarHeight = parseInt($("#ys-floor-ichnography .ys-content>.ys-content-right .ys-search-bar-grey").css("height"));
        var searchResultStatement = parseInt($("#ys-floor-ichnography .ys-content>.ys-content-right .ys-search-result .ys-search-result-statement").css("height"));
        var searchResultFirstDiv = parseInt($("#ys-floor-ichnography .ys-content>.ys-content-right .ys-search-result>div:first-child").css("height"));

        var height = totalHeight-searchBarHeight-searchResultStatement-searchResultFirstDiv-40;
        $(".ys-search-result-wrapper").height(height);
    }



    $("#ys-floor-ichnography .ys-content-right .ys-search-result ul.ys-search-result-list li").click(function(e){
        e.stopPropagation();
        e.preventDefault();

        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $("#ys-floor-ichnography .ys-content-right .ys-search-result ul.ys-search-result-list").css("top","0");
            $(".ys-search-result-detail").fadeOut();
        }else{
            $("#ys-floor-ichnography .ys-content-right .ys-search-result ul.ys-search-result-list li.active").removeClass("active");
            $(this).addClass("active");
            var index = $("#ys-floor-ichnography .ys-content-right .ys-search-result ul.ys-search-result-list li").index($(this));
            $("#ys-floor-ichnography .ys-content-right .ys-search-result ul.ys-search-result-list").css("top","-"+index*82+"px");


            $(".ys-search-result-detail").fadeIn();
            echarts.init($(".ys-chart").get(1)).setOption(option);
        }
    });
    /* ============================== echarts ============================== */



    $(".ys-search-bar-grey span").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(".model-info").hide();
        $(".ys-search-result").show();
        adaptSearchResultWrapperHeight();
    });


// ========================================================================
//    echarts.init($(".ys-chart").get(0)).setOption(option);

    $(".tab").on("click", function(){
        $(".tab.active").removeClass("active");
        $(this).addClass("active");

        $(".model-info").hide();
        $(".ys-sel-blank").show();  //空态
        svg_editor.reload(svg, $(this).attr("data"));

    });

    //加载项目
    $.ajax({
        url: enrolmentWeb_Path + "common/getUserMallSelect.htm",
        type: "post",
        dataType: "json",
        data:{userId:_uid},
        success: function(responseText){
            $(".btn-ys-mall-select").ysBisProjectSelect({
                source:responseText,
                selectedCallback:function(mallId, mallName){
                    var url = enrolmentWeb_Path + "store/getStoreMap.htm";
                    formPost(url,{mallId:mallId});
                }
            });
        }
    });

    //加载项目选择
    $.ajax( {
            url: "./project_list_tree.json",
            dataType:"json",
            success: function( data ) {
                console.log(data);
                var dataList=data.list_tree;
                $(".ys-dropdown-project-select").ysProjectSelect(
                    {
                        callback:function(value){
                            console.log(value);
                        },
                        listData:dataList
                    }
                )
            }
        } );

    //初始化项目所有楼层的title数据
    initMallTitleInfo();

});

//加载svg group1/M00/00/71/wKh59FfEI6yAMpAlAAAz73QKrhQ494.svg
function initSvgMap(){
    $.ajax({
        url: enrolmentWeb_Path + "svg/getSvgFile.htm",
        type: "post",
        dataType: "html",
        data:{path:$("#svgPath").val()},
        success: function(responseText){
            console.log("success---------------");
            svg = responseText;
            console.log("svg=" + svg);
            svg_editor.reload(svg);
        },
        error: function(responseText){
            console.log("error---------------");
            svg = responseText.responseText;
            svg_editor.reload(svg);
        },
        complete: function(){
            hideLoading();
        }

    });
}

//初始化项目所有楼层的title数据
function initMallTitleInfo(){
    $.ajax({
        url: enrolmentWeb_Path + "svg/getSvgTitleInfo.htm",
        type: "post",
        dataType: "json",
        data:{mallId:$("#mallId").val()},
        success: function(responseText){
            mallTitleInfo = responseText;
            initFloorData();
        },
        beforeSend:function(){
            mallTitleInfo = {};
        }
    });
}


//加载楼层数据
function initFloorData(){
   var curFloorData = mallTitleInfo[$("#floorId").val()];

    if(curFloorData && $("#floorId").val()){
        $("#data-store-num").html(curFloorData.storeNum);
        $("#data-brand-num").html(curFloorData.brandList.length);
        $("#svgPath").val(curFloorData.svgPath);

        var openRate = 0;
        if(curFloorData.openArea!=null && curFloorData.openArea!=0 && curFloorData.allArea!=null && curFloorData.allArea!=0){
            openRate = parseFloat(curFloorData.openArea/curFloorData.allArea*100).toFixed(2);
        }
        $("#data-open-rate").html(openRate +"%");

    }

    //加载svg
    initSvgMap();

}

function changeFloor(obj){
    showLoading();
    $("#floorId").val($(obj).attr("key"));
    $(".tab.active").removeClass("active");
    $(".tab:eq(0)").addClass("active");
    $("div.ys-content-info").empty().append($("#ys-sel-blank").tmpl()); //空态
    $(obj).closest("div.ys-dropdown").find(".btn.dropdown-toggle span").html($(obj).html());

    initFloorData();
}

