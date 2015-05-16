$(function() {
    var resetTime = function() {
        $("a[class^=month").css("color", "#888");
        $("a[class^=year").css("color", "#888");
        $("a[class^=month").css("display", "none");
    }

    var changeScrubber = function(top) {
        var items = $('.item');
        var itemsTop = []
        for (var i = 0; i < items.length; ++i) {
            itemsTop.push($(items[i]).offset().top);
        }
        for (var i = 1; i < items.length; ++i) {
            if (top > itemsTop[i - 1] && top < itemsTop[i]) {
                var date = $(items[i]).find('.englishDate').attr('class').substr(29);
                var year = date.substr(0, 4);
                var month = date.substr(5,2);
                var months = "month_" + year;
                resetTime();
                expandTime(months, month);
                $("a[class$='"+ year +"'").css("color", "rgba(17,209,255, 0.8)");
                $("a[class$='"+ month +"'").css("color", "rgba(17,209,255, 0.8)");
                break;
            }
        }
    }

    var expandTime = function(months, month) {
        $("a[class^='"+months+"']").css("display", "block");
        $("a[class$='"+month+"']").css("color", "rgba(17,209,255, 0.8)");
    }

    var jump = function(date) {
        var offsetTop = $("div[class*='"+date+"']").offset().top;
        $('body').animate({scrollTop: $("div[class*='"+date+"']").offset().top - 100}, 1000);
    } 

    $(window).scroll(function() {
        var top = $(window).scrollTop();
        var windowWidth = $(window).width();
        changeScrubber(top);
        if (windowWidth > 640) {
            var tmp = 150;
        } else {
            var tmp = 40;
        }
        if (top > tmp) {
            $(".scrubber").css("position", "fixed")
            var containerWidth = $(".myContainer").width();
            var width = (windowWidth-containerWidth)/2 + "px";
            $(".scrubber").css("left", width);
        } else {
            $(".scrubber").css("position", '')
            $(".scrubber").css("left", "");
        }
    })
    //时序表点击展开高亮
    $(document).on('click', 'a', function() {
        var nameofThis = $(this).attr('class');
        if (nameofThis.indexOf("month") >= 0) {
            $("a[class^='month']").css("color", "#888");
            $(this).css("color", "rgba(17,209,255, 0.8)");
            var date = $(this).attr("class").substr(6);
            date = "content_" +date;
            jump(date);
        } else {
            resetTime();
            $(this).css("color", "rgba(17,209,255, 0.8)");
            var nameOfThis = $(this).attr('class');
            var year = nameOfThis.substr(5);
            var months = "month_" + year;
            var firstMonth = $("a[class^='"+months+"']").eq(0).attr("class")
            var date = firstMonth.substr(6);
            date = "content_" +date;
            var month = firstMonth.substr(11, 2)
            expandTime(months, month);
            if (firstMonth != undefined) {
                jump(date);
            }
        }
    })
});