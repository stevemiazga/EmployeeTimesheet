/// <reference path="jquery-3.1.1.min.js" />
/// <reference path="dailymemobundlefunctions.js" />

$(document).ready(function () {

    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30);
    var startmonth = startTime.getMonth() + 1;
    var startday = startTime.getDate();
    var startyear = startTime.getFullYear();
    var startDate = startmonth + '/' + startday + '/' + startyear;
    var currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - 1);
    var endmonth = currentTime.getMonth() + 1;
    var endday = currentTime.getDate();
    var endyear = currentTime.getFullYear();
    var endDate = endmonth + '/' + endday + '/' + endyear;

    getDailyMemoDates(startDate, endDate);

    $('#dailymemoDates').on('click', '.detailDailyMemo', function () {
        var id = $(this).data('headerid');
        var date = $(this).text();
        $('#SelectedHeaderId').val(id);
        $('.detailDailyMemo').removeClass('activeMemoDateLink');
        $('.detailDailyMemo').parents().removeClass('activeMemoDate');
        $(this).parent().addClass('activeMemoDate');
        $(this).addClass('activeMemoDateLink');

        $.ajax({
            url: dailymemohistorydetailURL,
            data: { 'id': id },
            cache: false,
            contentType: 'application/html; charset=utf-8',
            beforeSend: function () {
                $("#loading").show();
            },
            type: 'Get',
            dataType: 'html',
            success: function (result) {
                $('#detailsPartial').html(result);
                $('#detailtext').remove();
                $('h2').text('Previous Employee Timesheet');
                $('textarea').textareaAutoSize();
                checkWorkHourHeading();
                updateTaskTotals("detail");
            },
            error: function (xhr, status) {
                alert(status);
            }
        });
        return false;
    });


    $('#detailsPartial').on('click', '.taskHistory', function () {
        var id = $(this).data('transid');
        var task = $(this).text();
        $('#dailymemoDateTasks ul').append('<li data-transid=' + id + '>' + task + '</li>');
        return false;
    });

    $('#replaceDailyMemo').on('click', function () {
        var selectedHeaderId = $('#SelectedHeaderId').val();
        if (!selectedHeaderId) {
            alert('Please select a date.');
            return;
        }
        else {
            var result = confirm("Are you sure you want to use these tasks in your current timesheet? This will overwrite what you have on your current timesheet.");
            if (result) {
                $('#replacememoform').submit();
            }
        }

    });

});