/// <reference path="jquery-3.1.1.min.js" />

var timerAutoSave;
var autosaveseconds = 0;
var timerSeconds;
var currentRow;
var currentCell;
var focusStartCount = 0;


function initalTaskLoad() {

    var selectedWorkId = $('#DailyMemoHeader_WorkId').val();
    workHours(selectedWorkId);

    $('.taskDropDown').each(function () {
        var taskDropDownId = $(this).attr('id');
        var departmentId = $("#" + taskDropDownId).parent().prev().find('.departmentDropDown').val();
        var loadId = taskDropDownId.match(/\d+$/);
        $('#loading' + loadId).show();
        $.getJSON(tasksURL, { "departId": departmentId }, function (data) {
            $('#' + taskDropDownId).empty();
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html += '<option value = ' + data.data[i].taskId + '>' + data.data[i].taskDescr + '</option>';
            }
            $('#' + taskDropDownId).append(html);
            var selectedTaskId = $('#' + taskDropDownId).next().val();
            $('#' + taskDropDownId).val(selectedTaskId);

            var taskDescr = $('#' + taskDropDownId).closest('td').next().find('.taskDescr').attr('id');
            var taskDropDownSelectedText = $('#' + taskDropDownId + ' option:selected').text();

            if (taskDropDownSelectedText == " Free-form Text") {
                $('#' + taskDescr).attr('readonly', false);
            }
            else {
                $('#' + taskDescr).attr('readonly', true);
            }
            $('#loading' + loadId).hide();
        });
    });
};

function updateTaskTotals(memodisplay) {
    var grandMinTotal = 0;
    var grandBreakMinTotal = 0;
    var grandLunchMinTotal = 0;
    var orgTotalWorkingMinutes = $('#TotMins').text();
    var totalWorkingMinutes = 0;

    $('table > tbody > tr').each(function () {

        var qtys = 0;
        $(this).find('.qty').each(function () {
            var qty;
            if (memodisplay == "edit")
            {
                qty = $(this).val();
            }
            else if (memodisplay == "detail")
            {
                qty = $(this).text();
            }

            if (!qty) {
                qty = 0;
            }
            qty = parseInt(qty);
            qtys += qty;
        });
        $(this).find('.qtyTotal').text(qtys);

        var mins = 0;
        $(this).find('.min').each(function () {
            var min;
            if (memodisplay == "edit") {
                min = $(this).val();
            }
            else if (memodisplay == "detail") {
                min = $(this).text();
            }

            if (!min) {
                min = 0;
            }
            min = parseInt(min);
            mins += min;
        });
        $(this).find('.minTotal').text(mins);

        grandMinTotal += mins;

        var breakmins = 0;
        $(this).find('.breakmin').each(function () {
            var breakmin;
            if (memodisplay == "edit") {
                breakmin = $(this).val();
            }
            else if (memodisplay == "detail") {
                breakmin = $(this).text();
            }

            if (!breakmin) {
                breakmin = 0;
            }
            breakmin = parseInt(breakmin);
            breakmins += breakmin
        })

        grandBreakMinTotal += breakmins;

        var lunchmins = 0;
        $(this).find('.lunchmin').each(function () {
            var lunchmin;
            if (memodisplay == "edit") {
                lunchmin = $(this).val();
            }
            else if (memodisplay == "detail") {
                lunchmin = $(this).text();
            }

            if (!lunchmin) {
                lunchmin = 0;
            }
            lunchmin = parseInt(lunchmin);
            lunchmins += lunchmin
        })

        grandLunchMinTotal += lunchmins;

    });

    orgTotalWorkingMinutes = parseInt(orgTotalWorkingMinutes);
    totalWorkingMinutes = orgTotalWorkingMinutes - (grandBreakMinTotal + grandLunchMinTotal);
    var totalMinutesWorked = grandMinTotal;
    $('.totWorkingMins').text(totalWorkingMinutes);

    $('.totMinsWorked').text(totalMinutesWorked);

    var totalnumber = totalMinutesWorked / totalWorkingMinutes;
    var percent = Math.round(totalnumber * 100);
    $('.totPercentageWorked').text(percent + '%');
}

function workHours(selectedWorkId) {

    function splitWorkHours(workhour) {
        var x = workhour.split('-');
        x = "<span>" + x[0].trim() + " -" + "</span><br/><span>" + x[1].trim() + "</span>";
        return x;
    }

    $.getJSON(workhoursURL, { "workId": selectedWorkId }, function (data) {
        {

            if (selectedWorkId == 4 || selectedWorkId == 5) {
                $('#WorkHours1').text('').append(splitWorkHours(data.data.workHours1));
                $('#WorkHours2').text('').append(splitWorkHours(data.data.workHours2));
                $('#WorkHours3').text('').append(splitWorkHours(data.data.workHours3));
                $('#WorkHours4').text('').append(splitWorkHours(data.data.workHours4));
                $('#WorkHours5').text('').append(splitWorkHours(data.data.workHours5));
                $('#WorkHours6').text('').append(splitWorkHours(data.data.workHours6));
                $('#WorkHours7').text('').append(splitWorkHours(data.data.workHours7));
                $('#WorkHours8').text('').append(splitWorkHours(data.data.workHours8));
                $('#TotMins').text(data.data.totMins);
                $('.totWorkingMins').text(data.data.totMins);
            }
            else {
                $('#WorkHours1').text(data.data.workHours1);
                $('#WorkHours2').text(data.data.workHours2);
                $('#WorkHours3').text(data.data.workHours3);
                $('#WorkHours4').text(data.data.workHours4);
                $('#WorkHours5').text(data.data.workHours5);
                $('#WorkHours6').text(data.data.workHours6);
                $('#WorkHours7').text(data.data.workHours7);
                $('#WorkHours8').text(data.data.workHours8);
                $('#TotMins').text(data.data.totMins);
                $('.totWorkingMins').text(data.data.totMins);
            }

            if (data.data.workHours1 == "") {
                $('.headerqtymin1').css("color","transparent");
                $('.colqty1, .colmin1').val("");
                $('.mincheck1').text('');
                clearSelectedValidation('.colqty1, .colmin1');
                $('.colqty1, .colmin1').hide();
            } else {
                $('.headerqtymin1').css("color", "#000000");
                $('.colqty1, .colmin1').show();
            }
            if (data.data.workHours2 == "") {
                $('.headerqtymin2').css("color", "transparent");
                $('.colqty2, .colmin2').val("");
                $('.mincheck2').text('');
                clearSelectedValidation('.colqty2, .colmin2');
                $('.colqty2, .colmin2').hide();
            } else {
                $('.headerqtymin2').css("color", "#000000");
                $('.colqty2, .colmin2').show();
            }
            if (data.data.workHours3 == "") {
                $('.headerqtymin3').css("color", "transparent");
                $('.colqty3, .colmin3').val("");
                $('.mincheck3').text('');
                clearSelectedValidation('.colqty3, .colmin3');
                $('.colqty3, .colmin3').hide();
            } else {
                $('.headerqtymin3').css("color", "#000000");
                $('.colqty3, .colmin3').show();
            }
            if (data.data.workHours4 == "") {
                $('.headerqtymin4').css("color", "transparent");
                $('.colqty4, .colmin4').val("");
                $('.mincheck4').text('');
                clearSelectedValidation('.colqty4, .colmin4');
                $('.colqty4, .colmin4').hide();
            } else {
                $('.headerqtymin4').css("color", "#000000");
                $('.colqty4, .colmin4').show();
            }
            if (data.data.workHours5 == "") {
                $('.headerqtymin5').css("color", "transparent");
                $('.colqty5, .colmin5').val("");
                $('.mincheck5').text('');
                clearSelectedValidation('.colqty5, .colmin5');
                $('.colqty5, .colmin5').hide();
            } else {
                $('.headerqtymin5').css("color", "#000000");
                $('.colqty5, .colmin5').show();
            }
            if (data.data.workHours6 == "") {
                $('.headerqtymin6').css("color", "transparent");
                $('.colqty6, .colmin6').val("");
                $('.mincheck6').text('');
                clearSelectedValidation('.colqty6, .colmin6');
                $('.colqty6, .colmin6').hide();
            } else {
                $('.headerqtymin6').css("color", "#000000");
                $('.colqty6, .colmin6').show();
            }
            if (data.data.workHours7 == "") {
                $('.headerqtymin7').css("color", "transparent");
                $('.colqty7, .colmin7').val("");
                $('.mincheck7').text('');
                clearSelectedValidation('.colqty7, .colmin7');
                $('.colqty7, .colmin7').hide();
            } else {
                $('.headerqtymin7').css("color", "#000000");
                $('.colqty7, .colmin7').show();
            }
            if (data.data.workHours8 == "") {
                $('.headerqtymin8').css("color", "transparent");
                $('.colqty8, .colmin8').val("");
                $('.mincheck8').text('');
                clearSelectedValidation('.colqty8, .colmin8');
                $('.colqty8, .colmin8').hide();
            } else {
                $('.headerqtymin8').css("color", "#000000");
                $('.colqty8, .colmin8').show();
            }
        }
    }).done(function () { updateTaskTotals("edit"); }).fail(function (request, status, error) {
        alert("error: " + error + " " + request.responseText);
        return false;

    });
}

function clearSelectedValidation(select) {
    $(select).parents('div').each(function () {
        var x = ($(this).attr('class') == undefined) ? "" : $(this).attr('class');
        if (x.slice(0, 14) == "errorHighlight") {
            $(this).removeClass($(this).attr('class'));
        }
    });
}

function checkWorkhours() {
    if ($('#WorkHours1').text() == "") {
        $('.colqty1, .colmin1').hide();
    } else {
        $('.colqty1, .colmin1').show();
    }
    if ($('#WorkHours2').text() == "") {
        $('.colqty2, .colmin2').hide();
    } else {
        $('.colqty2, .colmin2').show();
    }
    if ($('#WorkHours3').text() == "") {
        $('.colqty3, .colmin3').hide();
    } else {
        $('.colqty3, .colmin3').show();
    }
    if ($('#WorkHours4').text() == "") {
        $('.colqty4, .colmin4').hide();
    } else {
        $('.colqty4, .colmin4').show();
    }
    if ($('#WorkHours5').text() == "") {
        $('.colqty5, .colmin5').hide();
    } else {
        $('.colqty5, .colmin5').show();
    }
    if ($('#WorkHours6').text() == "") {
        $('.colqty6, .colmin6').hide();
    } else {
        $('.colqty6, .colmin6').show();
    }
    if ($('#WorkHours7').text() == "") {
        $('.colqty7, .colmin7').hide();
    } else {
        $('.colqty7, .colmin7').show();
    }
    if ($('#WorkHours8').text() == "") {
        $('.colqty8, .colmin8').hide();
    } else {
        $('.colqty8, .colmin8').show();
    }
}

function renumberTasks(removeNum) {
    $(".additionaltask").each(function (index, item) {
        if (index != 0) {
            var itemNumId = $(item).find('button').attr('id');
            var itemNum = parseInt(itemNumId.match(/\d+$/));
            if (itemNum > removeNum) {
                itemNum--;
                $(item).find('.deleteTask').attr({ 'id': 'deleteTask' + itemNum });
                $(item).find('input[name*="DailyMemoHeader"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoHeaderId', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoHeaderId' });
                $(item).find('input[name*="DailyMemoTransId"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoTransId', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoTransId' });
                $(item).find('select[name*="TransDepartmentId"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].TransDepartmentId', 'id': 'DailyMemoTransactions_' + itemNum + '__TransDepartmentId' });
                $(item).find('.taskDropDown').attr({ 'id': 'taskDropDown' + itemNum });
                $(item).find('input[name*="TaskId"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].TaskId', 'id': 'DailyMemoTransactions_' + itemNum + '__TaskId' });
                $(item).find('input[name*="TaskType"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].TaskType', 'id': 'DailyMemoTransactions_' + itemNum + '__TaskType' });
                $(item).find('textarea[name*="TaskDescr"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].TaskDescr', 'id': 'DailyMemoTransactions_' + itemNum + '__TaskDescr' });
                $(item).find('input[name*="DailyMemoQty1"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty1', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty1' });
                $(item).find('input[name*="DailyMemoMinutes1"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes1', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes1' });
                $(item).find('input[name*="DailyMemoQty2"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty2', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty2' });
                $(item).find('input[name*="DailyMemoMinutes2"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes2', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes2' });
                $(item).find('input[name*="DailyMemoQty3"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty3', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty3' });
                $(item).find('input[name*="DailyMemoMinutes3"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes3', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes3' });
                $(item).find('input[name*="DailyMemoQty4"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty4', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty4' });
                $(item).find('input[name*="DailyMemoMinutes4"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes4', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes4' });
                $(item).find('input[name*="DailyMemoQty5"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty5', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty5' });
                $(item).find('input[name*="DailyMemoMinutes5"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes5', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes5' });
                $(item).find('input[name*="DailyMemoQty6"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty6', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty6' });
                $(item).find('input[name*="DailyMemoMinutes6"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes6', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes6' });
                $(item).find('input[name*="DailyMemoQty7"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty7', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty7' });
                $(item).find('input[name*="DailyMemoMinutes7"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes7', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes7' });
                $(item).find('input[name*="DailyMemoQty8"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoQty8', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoQty8' });
                $(item).find('input[name*="DailyMemoMinutes8"]').attr({ 'name': 'DailyMemoTransactions[' + itemNum + '].DailyMemoMinutes8', 'id': 'DailyMemoTransactions_' + itemNum + '__DailyMemoMinutes8' });

            }
        }

    });
}

function checkAllTaskBlank(value, index, arr) {
    if (value == "") {
        return true;
    }
    else {
        return false;
    }
}

function checkAllTaskTotal() {
    $('[class*="colmin"]').each(function () {
        var taskChangeClasses = $(this).attr('class').split(' ');
        checkTaskTotal(taskChangeClasses, false);
    });
}

function checkTaskTotal(taskChangeClasses,isFlash) {

    var colMinClass = null;

    for (var i = 0; i < taskChangeClasses.length; i++) {
        if (taskChangeClasses[i].slice(0, 6) == 'colmin') {
            colMinClass = taskChangeClasses[i];
            break;
        }
    }

    if (colMinClass == null) {
        return;
    }

    var colNo = colMinClass.match(/\d+$/);
    var taskCheckMinTotal = 0
    var taskmins = 0;
    var checkTaskBlank = [];
    $('.' + colMinClass).each(function () {
        var taskmin = $(this).val();
        checkTaskBlank.push(taskmin);
        if (!taskmin) {
            taskmin = 0;
        }
        taskmin = parseInt(taskmin);
        taskmins += taskmin;
    });

    taskCheckMinTotal += taskmins;
    var remainingMins = 60 - taskCheckMinTotal;
    if (checkTaskBlank.every(checkAllTaskBlank)) {
        $('.mincheck' + colNo).text('');
    }
    else if (remainingMins != 0) {
        if (isFlash) {
            $('.mincheck' + colNo).text(remainingMins).css('color', 'red').fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
        }
        else {
            $('.mincheck' + colNo).text(remainingMins).css('color', 'red');
        }
    }
    else if (remainingMins == 0) {
        $('.mincheck' + colNo).text('60').css('color','green');
    }
    else {
        if (isFlash) {
            $('.mincheck' + colNo).text(remainingMins).css('color', 'red').fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
        }
        else {
            $('.mincheck' + colNo).text(remainingMins).css('color', 'red');
        }
    }
}

function processAutoSave() {
    timerAutoSave = setTimeout(function () {
        $('#btnSave').trigger("click");
        updateTaskTotals("edit");
    }, 10000);
}

function processAutoSaveTimer() {
    autosaveseconds++;
    timerSeconds = setTimeout(function () {
        processAutoSaveTimer();
    }, 1000);
}

function resetAutoSave() {
    if (autosaveseconds > 0 && autosaveseconds < 10) {
        clearTimeout(timerAutoSave);
        clearTimeout(timerSeconds);
        autosaveseconds = 0;
        processAutoSaveTimer();
        processAutoSave();
    }
    else {
        clearTimeout(timerAutoSave);
        clearTimeout(timerSeconds);
        autosaveseconds = 0;
    }
}

function storeFocusItem() {
    var focusItem = $(":focus").attr('id');
    $('#activecell').val(focusItem);
}

function getCurrentCellFocus() {
    var focusItem = $(":focus").attr('id');
    currentCell = $('#' + focusItem).closest('td').index();
    var t = $('#' + focusItem).closest('td').closest('tr').attr('class');

    currentRow = $('#' + focusItem).closest('td').closest('tr').index();
    if (t == "lunchdata" || t == "breakdata") {
        currentRow--;
    }
}

function arrowCellNavigation(e) {
    var $trdata = null;
    $trdata = $('tr.taskdata,tr.breakdata,tr.lunchdata');

    if (focusStartCount == 0) {
        $('.active').removeClass();
        getCurrentCellFocus();
        ChangeCurrentCell();
    }

    function ChangeCurrentCell() {
        var $tableRow = $trdata.eq(currentRow);
        var $tableCell = $tableRow.find('td').eq(currentCell);

        $tableCell.focus();
        $tableCell.addClass('active');

        $tableCell.find('input[type=number],textarea').focus();
        storeFocusItem();
    }

    function SetCurrentCellPosition(direction) {

        var trcurrent = $trdata.find('.active').closest('tr').attr('class');
        var trnext = $trdata.find('.active').closest('tr').next().attr('class');
        var trprev = $trdata.find('.active').closest('tr').prev().attr('class');

        if (trcurrent == "taskdata additionaltask") {
            trcurrent = (trcurrent == undefined) ? null : trcurrent.match(/taskdata/g);
        }
        if (trnext == "taskdata additionaltask") {
            trnext = (trnext == undefined) ? null : trnext.match(/taskdata/g);
        }
        if (trprev == "taskdata additionaltask") {
            trprev = (trprev == undefined) ? null : trprev.match(/taskdata/g);
        }


        if (direction == "up") {
            if ((trcurrent == "lunchdata" || trcurrent == "breakdata") && trprev == "taskdata") {
                switch (currentCell) {
                    case 1:
                        currentCell = 3;
                        break;
                    case 2:
                        currentCell = 5;
                        break;
                    case 3:
                        currentCell = 7;
                        break;
                    case 4:
                        currentCell = 9;
                        break;
                    case 5:
                        currentCell = 11;
                        break;
                    case 6:
                        currentCell = 13;
                        break;
                    case 7:
                        currentCell = 15;
                        break;
                    default:
                        currentCell
                        break;
                }
            }
        }

        if (direction == "down") {
            if (trcurrent == "taskdata" && (trnext == "lunchdata" || trnext == "breakdata")) {
                switch (currentCell) {
                    case 2:
                    case 3:
                    case 4:
                        currentCell = 1;
                        break;
                    case 5:
                    case 6:
                        currentCell = 2;
                        break;
                    case 7:
                    case 8:
                        currentCell = 3;
                        break;
                    case 9:
                    case 10:
                        currentCell = 4;
                        break;
                    case 11:
                    case 12:
                        currentCell = 5;
                        break;
                    case 13:
                    case 14:
                        currentCell = 6;
                        break;
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        currentCell = 7;
                        break;
                    default:
                        currentCell
                        break;
                }
            }
        }

        if (direction == "left") {
            if (trcurrent == "taskdata") {
                if (currentCell <= 2) {
                    currentCell = 2;
                }
                else {
                    currentCell--;
                }

            }
            if (trcurrent == "lunchdata" || trcurrent == "breakdata") {
                if (currentCell <= 1) {
                    currentCell = 1;
                }
                else {
                    currentCell--;
                }
            }
        }

        if (direction == "right") {
            if (trcurrent == "taskdata") {
                if (currentCell >= 18) {
                    currentCell = 18;
                } else {
                    currentCell++;
                }
            }
            if (trcurrent == "lunchdata" || trcurrent == "breakdata") {
                if (currentCell >= 7) {
                    currentCell = 7;
                }
                else {
                    currentCell++;
                }
            }
        }
    }

    function SetCurrentCellPositionHalfDay(direction) {

        var trcurrent = $trdata.find('.active').closest('tr').attr('class');
        var trnext = $trdata.find('.active').closest('tr').next().attr('class');
        var trprev = $trdata.find('.active').closest('tr').prev().attr('class');

        if (trcurrent == "taskdata additionaltask") {
            trcurrent = (trcurrent == undefined) ? null : trcurrent.match(/taskdata/g);
        }
        if (trnext == "taskdata additionaltask") {
            trnext = (trnext == undefined) ? null : trnext.match(/taskdata/g);
        }
        if (trprev == "taskdata additionaltask") {
            trprev = (trprev == undefined) ? null : trprev.match(/taskdata/g);
        }


        if (direction == "up") {
            if ((trcurrent == "lunchdata" || trcurrent == "breakdata") && trprev == "taskdata") {
                switch (currentCell) {
                    case 1:
                        currentCell = 3;
                        break;
                    case 2:
                        currentCell = 5;
                        break;
                    case 3:
                        currentCell = 7;
                        break;
                    case 4:
                        currentCell = 9;
                        break;
                    //case 5:
                    //    currentCell = 11;
                    //    break;
                    //case 6:
                    //    currentCell = 13;
                    //    break;
                    //case 7:
                    //    currentCell = 15;
                    //    break;
                    default:
                        currentCell
                        break;
                }
            }
        }

        if (direction == "down") {
            if (trcurrent == "taskdata" && (trnext == "lunchdata" || trnext == "breakdata")) {
                switch (currentCell) {
                    case 2:
                    case 3:
                    case 4:
                        currentCell = 1;
                        break;
                    case 5:
                    case 6:
                        currentCell = 2;
                        break;
                    case 7:
                    case 8:
                        currentCell = 3;
                        break;
                    case 9:
                    case 10:
                        currentCell = 4;
                        break;
                    //case 11:
                    //case 12:
                    //    currentCell = 5;
                    //    break;
                    //case 13:
                    //case 14:
                    //    currentCell = 6;
                    //    break;
                    //case 13:
                    //case 14:
                    //case 15:
                    //case 16:
                    //case 17:
                    //case 18:
                    //    currentCell = 7;
                    //    break;
                    default:
                        currentCell
                        break;
                }
            }
        }

        if (direction == "left") {
            if (trcurrent == "taskdata") {
                if (currentCell <= 2) {
                    currentCell = 2;
                }
                else {
                    currentCell--;
                }

            }
            if (trcurrent == "lunchdata" || trcurrent == "breakdata") {
                if (currentCell <= 1) {
                    currentCell = 1;
                }
                else {
                    currentCell--;
                }
            }
        }

        if (direction == "right") {
            if (trcurrent == "taskdata") {
                if (currentCell >= 10) {
                    currentCell = 10;
                } else {
                    currentCell++;
                }
            }
            if (trcurrent == "lunchdata" || trcurrent == "breakdata") {
                if (currentCell >= 4) {
                    currentCell = 4;
                }
                else {
                    currentCell++;
                }
            }
        }
    }

    function SetCurrentCellPositionHalfDay2(direction) {

        var trcurrent = $trdata.find('.active').closest('tr').attr('class');
        var trnext = $trdata.find('.active').closest('tr').next().attr('class');
        var trprev = $trdata.find('.active').closest('tr').prev().attr('class');

        if (trcurrent == "taskdata additionaltask") {
            trcurrent = (trcurrent == undefined) ? null : trcurrent.match(/taskdata/g);
        }
        if (trnext == "taskdata additionaltask") {
            trnext = (trnext == undefined) ? null : trnext.match(/taskdata/g);
        }
        if (trprev == "taskdata additionaltask") {
            trprev = (trprev == undefined) ? null : trprev.match(/taskdata/g);
        }


        if (direction == "up") {
            if ((trcurrent == "lunchdata" || trcurrent == "breakdata") && trprev == "taskdata") {
                switch (currentCell) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        currentCell = 11;
                        break;
                    case 6:
                        currentCell = 13;
                        break;
                    case 7:
                        currentCell = 15;
                        break;
                    default:
                        currentCell
                        break;
                }
            }
        }

        if (direction == "down") {
            if (trcurrent == "taskdata" && (trnext == "lunchdata" || trnext == "breakdata")) {
                switch (currentCell) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        currentCell = 5;
                        break;
                    case 13:
                    case 14:
                        currentCell = 6;
                        break;
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        currentCell = 7;
                        break;
                    default:
                        currentCell
                        break;
                }
            }
        }

        if (direction == "left") {
            if (trcurrent == "taskdata") {
                if (currentCell <= 2) {
                    currentCell = 2;
                }
                else if (currentCell > 2 && currentCell < 11) {
                    currentCell = 11;
                }
                else if (currentCell == 11) {
                    currentCell = 2;
                }
                else {
                    currentCell--;
                }

            }
            if (trcurrent == "lunchdata" || trcurrent == "breakdata") {
                if (currentCell <= 5) {
                    currentCell = 5;
                }
                else {
                    currentCell--;
                }
            }
        }

        if (direction == "right") {
            if (trcurrent == "taskdata") {
                if (currentCell >= 18) {
                    currentCell = 18;
                } else if (currentCell >= 2 && currentCell < 11) {
                    currentCell = 11;
                } else {
                    currentCell++;
                }
            }
            if (trcurrent == "lunchdata" || trcurrent == "breakdata") {
                if (currentCell < 5) {
                    currentCell = 5;
                } else if (currentCell == 7) {
                    currentCell = 7;
                }
                else {
                    currentCell++;
                }
            }
        }
    }

    //left
    if (e.keyCode == 37) {
        if ($('#TotMins').text() == 240) {
            if ($('#WorkHours1').text() != "") {
                SetCurrentCellPositionHalfDay("left");
            }
            else if ($('#WorkHours5').text() != "") {
                SetCurrentCellPositionHalfDay2("left");
            }
        }
        else {
            SetCurrentCellPosition("left");
        }
        $('.active').removeClass();
        //currentCell--;
        ChangeCurrentCell();
        return false;
    }
    //up
    if (e.keyCode == 38) {
        if ($('#TotMins').text() == 240) {
            if ($('#WorkHours1').text() != "") {
                SetCurrentCellPositionHalfDay("up");
            }
            else if ($('#WorkHours5').text() != "") {
                SetCurrentCellPositionHalfDay2("up");
            }
        }
        else {
            SetCurrentCellPosition("up");
        }
        $('.active').removeClass();
        currentRow--;
        ChangeCurrentCell();
        return false;
    }
    //right
    if (e.keyCode == 39) {
        if ($('#TotMins').text() == 240) {
            if ($('#WorkHours1').text() != "") {
                SetCurrentCellPositionHalfDay("right");
            }
            else if ($('#WorkHours5').text() != "") {
                SetCurrentCellPositionHalfDay2("right");
            }
        }
        else {
            SetCurrentCellPosition("right");
        }
        $('.active').removeClass();
        //currentCell++;
        ChangeCurrentCell();
        return false;
    }
    //down
    if (e.keyCode == 40) {
        if ($('#TotMins').text() == 240) {
            if ($('#WorkHours1').text() != "") {
                SetCurrentCellPositionHalfDay("down");
            }
            else if ($('#WorkHours5').text() != "") {
                SetCurrentCellPositionHalfDay2("down");
            }
        }
        else {
            SetCurrentCellPosition("down");
        }
        $('.active').removeClass();
        currentRow++;
        ChangeCurrentCell();
        return false;
    }
};

function checkWorkHourHeading() {

    var splitHour;

    function splitWorkHours(workhour) {
        var x = workhour.split('-');
        x = "<span>" + x[0].trim() + " -" + "</span><br/><span>" + x[1].trim() + "</span>";
        return x;
    }

    if ($("#workId").val() == 4 || $("#workId").val() == 5) {

        splitHour = splitWorkHours($('#WorkHours1').text());
        $('#WorkHours1').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours2').text());
        $('#WorkHours2').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours3').text());
        $('#WorkHours3').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours4').text());
        $('#WorkHours4').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours5').text());
        $('#WorkHours5').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours6').text());
        $('#WorkHours6').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours7').text());
        $('#WorkHours7').text('').append(splitHour);
        splitHour = splitWorkHours($('#WorkHours8').text());
        $('#WorkHours8').text('').append(splitHour);
    }

    if ($('#WorkHours1').text() == "") {
        $('.headerqtymin1').css("color", "transparent");
    }
    else {
        $('.headerqtymin1').css("color", "#000000");
    }
    if ($('#WorkHours2').text() == "") {
        $('.headerqtymin2').css("color", "transparent");
    }
    else {
        $('.headerqtymin2').css("color", "#000000");
    }
    if ($('#WorkHours3').text() == "") {
        $('.headerqtymin3').css("color", "transparent");
    }
    else {
        $('.headerqtymin3').css("color", "#000000");
    }
    if ($('#WorkHours4').text() == "") {
        $('.headerqtymin4').css("color", "transparent");
    }
    else {
        $('.headerqtymin4').css("color", "#000000");
    }
    if ($('#WorkHours5').text() == "") {
        $('.headerqtymin5').css("color", "transparent");
    }
    else {
        $('.headerqtymin5').css("color", "#000000");
    }
    if ($('#WorkHours6').text() == "") {
        $('.headerqtymin6').css("color", "transparent");
    }
    else {
        $('.headerqtymin6').css("color", "#000000");
    }
    if ($('#WorkHours7').text() == "") {
        $('.headerqtymin7').css("color", "transparent");
    }
    else {
        $('.headerqtymin7').css("color", "#000000");
    }
    if ($('#WorkHours8').text() == "") {
        $('.headerqtymin8').css("color", "transparent");
    }
    else {
        $('.headerqtymin8').css("color", "#000000");
    }

}

//daily memo history
function getDailyMemoDates(startDate, endDate) {
    $.ajax({
        type: 'GET',
        url: dailymemodatesURL,
        data: { 'startDate': startDate, 'endDate': endDate },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.memoDates.length == 0) {
                $('#replaceDailyMemo').hide();
                $('#dailymemoDates').hide();
                $('.infomessage').text('');
                $('.infomessage').after("<div>You have no previous timesheets for the past 30 days.</div>");
            }
            else {
                $('#dailymemoDates').empty();
                var html = "";
                $(data.memoDates).each(function () {
                    html += "<div><a class='detailDailyMemo' href='#' data-headerid=" + this.dailyMemoHeaderId + ">" + this.createDate + "</a></div>";
                });
                $('#dailymemoDates').append(html);

                //default last previous
                $('.detailDailyMemo:first').trigger('click');
            }
        },
        error: function (xhr, status) {
            alert('Dates not set.');
        }
    });
}
/// <reference path="jquery-3.1.1.min.js" />

//demo validation rules 1-7
//1 check 60 mins all tasks
//2 check 60 mins lunch 
//2 allowed only lunch 60 minutes
//3 no lunch for half day
//4 one break for half day
//5 allowed only two 15 minutes breaks
//6 task, qty, and minutes are required
//7 duplicate task not allowed
//8 one 60 lunch not split

// global variable
var isFormValid;

//objects
function CustomError(ruleNum, isError) {
    this.ruleNum = ruleNum;
    this.isError = isError;
}

function TaskRequired(checkItem, checkNum, checkValue) {
    this.checkItem = checkItem;
    this.checkNum = checkNum;
    this.checkValue = checkValue;
}

//messages
function getCustomErrorMessage(ruleNum) {
    var message;
    switch (ruleNum) {
        case 1:
            message = "You entered less or greater than 60 minutes.";
            break;
        case 2:
            message = "You are only allowed to enter up to 60 minutes for lunch.";
            break;
        case 3:
            message = "No lunch allowed for half-day work.";
            break;
        case 4:
            message = "You are only allowed to enter one 15 minute break on a half-day.";
            break;
        case 5:
            message = "You are only allowed to enter two 15 minute breaks.";
            break;
        case 6:
            message = "Task, Quantity and Time are required, please enter corresponding values.";
            break;
        case 7:
            message = "Duplicate task not allowed.";
            break;
        case 8:
            message = "You are allowed only one 60 minute lunch not split up at separate times.";
            break;
        default:
            message = "";
    }

    return message;
}

//utility functions
function getUnique(inputArray) {
    var outputArray = [];

    for (var i = 0; i < inputArray.length; i++) {
        if (($.inArray(inputArray[i], outputArray)) == -1) {
            outputArray.push(inputArray[i]);
        }
    }

    return outputArray;
}

function isDuplicateTask(inputArray) {
    var isDuplicateTask = inputArray.some(function (item, idx) {
        return inputArray.indexOf(item) != idx;
    });

    return isDuplicateTask;
}

function returnDuplicates(inputArray) {
    return inputArray.reduce(function (dupes, val, i) {
        if (inputArray.indexOf(val) !== i && dupes.indexOf(val) === -1) {
            dupes.push(val);
        }
        return dupes;
    }, []);
}

function checkAllFalse(value, index, ar) {
    if (value.isError == true) {
        return false
    }
    else {
        return true
    }
}

function checkAllBlank(value, index, arr) {
    if (value.checkValue == "") {
        return true;
    }
    else {
        return false;
    }
}


var colors = [1, 2, 3, 4, 5, 6, 7, 8];
var assignColors = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//main submit errors function for rules 1-7
function validateSubmitErrors() {
    var errors = [];
    var $allTaskBreakLunch = $('.task');

    //workhours for rule 6 to not mark required
    var workHoursBlank = [];
    if ($('#TotMins').text() == 240) {
        for (var i = 1; i < 9; i++) {
            workHoursBlank.push(new TaskRequired("workhour" + i, i, $('#WorkHours' + i).text()));
        }
    }

    //functions to call from main rule check
    function assignHighlightColor(ruleNum) {
        var i = colors[0];
        colors.shift();
        assignColors[ruleNum] = i;
        return;
    }

    function errorDisplay() {
        if (errors.every(checkAllFalse)) {
            $('#errorText').text("");
            isFormValid = true;
        }
        else {
            isFormValid = false;
            var errorMessages = [];
            for (var i = 0; i < errors.length; i++) {
                if (errors[i].isError == true) {
                    errorMessages.push(errors[i].ruleNum);
                }
            }

            errorMessages = getUnique(errorMessages);

            //reset colors
            if (errorMessages.length < 0) {
                colors = [1, 2, 3, 4, 5, 6, 7];
                assignColors = [0, 0, 0, 0, 0, 0, 0, 0];
            }

            var displayMessage = "";
            for (var i = 0; i < errorMessages.length; i++) {
                if (i == 0) {
                    displayMessage = displayMessage + "<div class='errorRow'><div class='errorCell'><div class='errorMessage" + assignColors[errorMessages[i]] + "'>" + getCustomErrorMessage(errorMessages[i]) + "</div>";
                }
                else if (i == 3) {
                    displayMessage = displayMessage + "</div><div class='errorCell'><div class='errorMessage" + assignColors[errorMessages[i]] + "'>" + getCustomErrorMessage(errorMessages[i]) + "</div>";
                }
                else {
                    displayMessage = displayMessage + "<div class='errorMessage" + assignColors[errorMessages[i]] + "'>" + getCustomErrorMessage(errorMessages[i]) + "</div>";
                }
            }
            displayMessage = displayMessage + "</div></div>"

            $('#errorText').text("");
            $('#errorText').html(displayMessage);
        }
    }

    //main call to checkTaskSlot for each rule
    $allTaskBreakLunch.each(function () {
        var colMinClass = null;

        var classes = $(this).attr('class');

        //1 check 60 mins all tasks
        if (classes.match(/colmin/g)) {
            var taskClasses = classes.split(' ');
            for (var i = 0; i < taskClasses.length; i++) {
                if (taskClasses[i].slice(0, 6) == 'colmin') {
                    colMinClass = taskClasses[i];
                    break;
                }
            }

            switch (colMinClass) {
                case 'colmin1':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin2':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin3':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin4':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin5':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin6':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin7':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                case 'colmin8':
                    checkTaskSlot('.' + colMinClass, 1);
                    break;
                default:
                    return;
            }
        }

        //2 check 60 mins lunch 
        if (classes.match(/lunchmin/g)) {
            var taskClasses = classes.split(' ');
            for (var i = 0; i < taskClasses.length; i++) {
                if (taskClasses[i].slice(0, 6) == 'colmin') {
                    colMinClass = taskClasses[i];
                    break;
                }
            }

            switch (colMinClass) {
                case 'colmin1':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                case 'colmin2':
                    checkTaskSlot('.lunchmin .' + colMinClass, 2);
                    break;
                case 'colmin3':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                case 'colmin4':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                case 'colmin5':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                case 'colmin6':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                case 'colmin7':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                case 'colmin8':
                    checkTaskSlot('.lunchmin.' + colMinClass, 2);
                    break;
                default:
                    return;
            }
        }

        //3 no lunch for half day
        //4 one break for half day
        if ($('#TotMins').text() == 240) {
            if (classes.match(/lunchmin/g)) {
                checkTaskSlot('.lunchmin', 3);
            }

            if (classes.match(/breakmin/g)) {
                checkTaskSlot('.breakmin', 4);
            }
        }

        //5 allowed only two 15 minutes breaks
        if ($('#TotMins').text() == 480) {
            if (classes.match(/breakmin/g)) {
                checkTaskSlot('.breakmin', 5);
            }
        }

    });

    //2 allowed only lunch 60 minutes
    checkTaskSlot('.lunchmin', 2);

    //8 one 60 lunch not split
    checkTaskSlot('.lunchmin', 8);

    //6 task, qty, and minutes are required
    //7 duplicate task not allowed
    var allTaskDescr = [];
    $('.taskDescr').each(function () {
        if ($(this).val() != 'Break' || $(this).val() != 'Lunch') {
            var id = $(this).attr('id');
            checkTaskSlot(id, 6);

            allTaskDescr.push($(this).val().trim());
        }
    });
    checkTaskSlot(null, 7);

    //after all rules check display errors
    errorDisplay();

    //check each time slot for each rule
    function checkTaskSlot(selectData, ruleNum) {
        var $selectData = "";

        if (ruleNum == 1 || ruleNum == 2 || ruleNum == 3 || ruleNum == 4 || ruleNum == 5 || ruleNum == 8) {
            $selectData = $allTaskBreakLunch.filter(selectData);
        }

        var mins = 0;
        var count = 0;
        //cummulative mins and counts
        if (ruleNum == 1 || ruleNum == 2 || ruleNum == 3) {
            $selectData.each(function () {
                var min = $(this).val();
                if (!min) {
                    min = 0;
                }
                min = parseInt(min);
                mins += min;
            });
        }

        if (ruleNum == 4 || ruleNum == 5) {
            $selectData.each(function () {
                var min = $(this).val();
                if (!min) {
                    min = 0;
                }
                else if (min > 0) {
                    count++;
                }
                min = parseInt(min);
                mins += min;
            });
        }

        //process rules and add error highlights
        ///////
        if (ruleNum == 1) {
            if (mins == 0) {
                var idNum = selectData.match(/\d+/)[0];
                if ($('#TotMins').text() == 240) {
                    if (workHoursBlank[idNum - 1].checkValue != "") {
                        addErrorHighlight4(ruleNum);
                    }
                }
                else {
                    addErrorHighlight4(ruleNum);
                }

            }
            if (mins != 60) {
                addErrorHighlight(ruleNum);
            }
            else if (mins == 60) {
                removeErrorHighlight(ruleNum);
            }
        }
        ///////
        if (ruleNum == 2) {
            if (mins > 60) {
                addErrorHighlight(ruleNum);
            }
            else {
                removeErrorHighlight(ruleNum);
            }
        }
        ///////
        if (ruleNum == 3) {
            if (mins > 0) {
                addErrorHighlight(ruleNum);
            }
            else {
                removeErrorHighlight(ruleNum);
            }
        }
        //////
        if (ruleNum == 4) {
            if (mins > 15 || count > 1) {
                addErrorHighlight(ruleNum);
            }
            else {
                removeErrorHighlight(ruleNum);
            }
        }
        //////
        if (ruleNum == 5) {
            if (mins > 30 || count > 2) {
                addErrorHighlight(ruleNum);
            }
            else {
                removeErrorHighlight(ruleNum);
            }
        }
        /////
        if (ruleNum == 6) {
            var taskDescr = $('#' + selectData).val();
            var idNum = selectData.match(/\d+/)[0];
            var checkBlank = [];
            if (taskDescr == "") {
                addErrorHighlight2(ruleNum);
            }
            else if (taskDescr != "") {
                removeErrorHighlight2(ruleNum);
            }

            requiredTaskQtyMin();

            function requiredTaskQtyMin() {
                //taskqty
                checkBlank.push(new TaskRequired("qty1", 1, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty1').val()));
                checkBlank.push(new TaskRequired("qty2", 2, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty2').val()));
                checkBlank.push(new TaskRequired("qty3", 3, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty3').val()));
                checkBlank.push(new TaskRequired("qty4", 4, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty4').val()));
                checkBlank.push(new TaskRequired("qty5", 5, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty5').val()));
                checkBlank.push(new TaskRequired("qty6", 6, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty6').val()));
                checkBlank.push(new TaskRequired("qty7", 7, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty7').val()));
                checkBlank.push(new TaskRequired("qty8", 8, $('#DailyMemoTransactions_' + idNum + '__DailyMemoQty8').val()));

                //taskmin
                checkBlank.push(new TaskRequired("min1", 1, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes1').val()));
                checkBlank.push(new TaskRequired("min2", 2, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes2').val()));
                checkBlank.push(new TaskRequired("min3", 3, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes3').val()));
                checkBlank.push(new TaskRequired("min4", 4, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes4').val()));
                checkBlank.push(new TaskRequired("min5", 5, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes5').val()));
                checkBlank.push(new TaskRequired("min6", 6, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes6').val()));
                checkBlank.push(new TaskRequired("min7", 7, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes7').val()));
                checkBlank.push(new TaskRequired("min8", 8, $('#DailyMemoTransactions_' + idNum + '__DailyMemoMinutes8').val()));

                var checkBlankQty = checkBlank.filter(function (item) { return item.checkItem.substr(0, 3) == "qty" });
                var checkBlankMin = checkBlank.filter(function (item) { return item.checkItem.substr(0, 3) == "min" })
                //var checkBlankQtyMin = checkBlank.sort(function (item1, item2) { return item1.checkNum - item2.checkNum });
                var checkQtyMissingMin = [];
                var checkMinMissingQty = [];

                for (var item in checkBlankQty) {
                    for (var item2 in checkBlankMin) {
                        if (checkBlankQty[item].checkNum === checkBlankMin[item2].checkNum) {
                            if (checkBlankQty[item].checkValue != "" && checkBlankMin[item2].checkValue == "") {
                                checkQtyMissingMin.push(new TaskRequired(checkBlankMin[item2].checkItem, checkBlankMin[item2].checkNum, checkBlankMin[item2].checkValue));
                            }
                            if (checkBlankQty[item].checkValue == "" && checkBlankMin[item2].checkValue != "") {
                                checkMinMissingQty.push(new TaskRequired(checkBlankQty[item].checkItem, checkBlankQty[item].checkNum, checkBlankQty[item].checkValue));
                            }
                        }
                    }
                }

                if (workHoursBlank.length > 0) {

                    checkBlankQty = checkBlankQty.filter(function (item1) {
                        return workHoursBlank.some(function (item2) { return (item1.checkNum === item2.checkNum) && (item1.checkValue != item2.checkValue) });
                    });

                    checkBlankMin = checkBlankMin.filter(function (item1) {
                        return workHoursBlank.some(function (item2) { return (item1.checkNum === item2.checkNum) && (item1.checkValue != item2.checkValue) });
                    });

                    checkBlankQtyMin = checkBlank.filter(function (item1) {
                        return workHoursBlank.some(function (item2) { return (item1.checkNum === item2.checkNum) && (item1.checkValue != item2.checkValue) });
                    });
                }


                if (checkBlank.every(checkAllBlank)) {
                    addErrorHighlight3(checkBlankQty, "Qty", ruleNum);
                    addErrorHighlight3(checkBlankMin, "Minutes", ruleNum);
                }
                else {
                    removeErrorHighlight3(checkBlankQty, "Qty", ruleNum);
                    removeErrorHighlight3(checkBlankMin, "Minutes", ruleNum);
                }

                if (checkMinMissingQty.length && checkBlank.every(checkAllBlank) == false) {
                    addErrorHighlight3(checkMinMissingQty, "Qty", ruleNum);
                }
                else {
                    removeErrorHighlight3(checkMinMissingQty, "Qty", ruleNum);
                }

                if (checkQtyMissingMin.length && checkBlank.every(checkAllBlank) == false) {
                    addErrorHighlight3(checkQtyMissingMin, "Minutes", ruleNum);
                }
                else {
                    removeErrorHighlight3(checkQtyMissingMin, "Minutes", ruleNum);
                }
            }
        }
        //////
        if (ruleNum == 7) {
            if (isDuplicateTask(allTaskDescr)) {
                allTaskDescr = returnDuplicates(allTaskDescr);
                if (assignColors[ruleNum] == 0) {
                    assignHighlightColor(ruleNum);
                }
                $.each(allTaskDescr, function (index, value) {
                    var taskDupDescr = value.trim();
                    $('.taskDescr').each(function () {
                        if ($(this).val().trim() == taskDupDescr) {
                            var errorDivExists = $(this).closest($('div.errorHighlight' + assignColors[ruleNum])).length;
                            if (errorDivExists == 0) {
                                var newElem = $("<div/>").addClass('errorHighlight' + assignColors[ruleNum]);
                                $(this).wrap(newElem);
                            }
                            errors.push(new CustomError(ruleNum, true));
                            return;
                        }
                    });
                });
            }
            else {
                if (assignColors[ruleNum] != 0) {
                    $.each(allTaskDescr, function (index, value) {
                        var taskDupDescr = value.trim();
                        $('.taskDescr').each(function () {
                            if ($(this).val().trim() == taskDupDescr) {
                                $(this).closest($('div.errorHighlight' + assignColors[ruleNum])).removeClass('errorHighlight' + assignColors[ruleNum]);
                                return;
                            }
                        });
                    });
                }
            }
        }

        //////
        if (ruleNum == 8) {
            var lunchindexes = [];
            var isLunchSplit = false;
            $selectData.each(function (index, value) {
                if ($(value).val() != "") {
                    lunchindexes.push(index);
                }

            });

            if (lunchindexes.length > 1) {
                var multiples = 0;
                for (var i = 0; i < lunchindexes.length; i++) {
                    var previous = lunchindexes[i - 1];
                    var current = lunchindexes[i];
                    var next = lunchindexes[i + 1];

                    if (current - previous == 1) {
                        multiples++;

                        if (multiples > 2) {
                            isLunchSplit = true;
                            break;
                        }
                    }
                    if (next - current == 1) {
                        multiples++;
                        if (multiples > 2) {
                            isLunchSplit = true;
                            break;
                        }
                    }
                }

                if (isLunchSplit == false) {
                    for (var i = 0; i < lunchindexes.length - 1; i++) {
                        if (lunchindexes[i] + 1 != lunchindexes[i + 1]) {
                            isLunchSplit = true;
                            break;
                        }
                    }
                }
            }

            if (isLunchSplit == true) {
                addErrorHighlight(ruleNum);
            }
            else {
                removeErrorHighlight(ruleNum);
            }
        }

        /////////////////

        function addErrorHighlight(ruleNum) {
            var errorTrue = false;
            if (assignColors[ruleNum] == 0) {
                assignHighlightColor(ruleNum);
            }
            $selectData.each(function () {
                var min = $(this).val();
                if (min > 0) {
                    var errorDivExists = $(this).closest($('div.errorHighlight' + assignColors[ruleNum])).length;
                    if (errorDivExists == 0) {
                        var newElem = $("<div/>").addClass('errorHighlight' + assignColors[ruleNum]);
                        $(this).wrap(newElem);
                    }
                    errorTrue = true;
                }
            });
            if (errorTrue == true) {
                errors.push(new CustomError(ruleNum, true));
            }
        }

        function addErrorHighlight2(ruleNum) {
            if (assignColors[ruleNum] == 0) {
                assignHighlightColor(ruleNum);
            }
            var errorDivExists = $('#' + selectData).closest($('div.errorHighlight' + assignColors[ruleNum])).length;
            if (errorDivExists == 0) {
                var newElem = $("<div/>").addClass('errorHighlight' + assignColors[ruleNum]);
                $('#' + selectData).wrap(newElem);
            }
            errors.push(new CustomError(ruleNum, true));
        }

        function removeErrorHighlight(ruleNum) {
            $selectData.each(function () {
                $(this).closest($('div.errorHighlight' + assignColors[ruleNum])).removeClass('errorHighlight' + assignColors[ruleNum]);
            });
        }

        function removeErrorHighlight2(ruleNum) {
            $('#' + selectData).closest($('div.errorHighlight' + assignColors[ruleNum])).removeClass('errorHighlight' + assignColors[ruleNum]);
        }

        function addErrorHighlight3(array, slotType, ruleNum) {
            if (assignColors[ruleNum] == 0) {
                assignHighlightColor(ruleNum);
            }
            $.each(array, function (key, value) {
                var errorDivExists = $('#DailyMemoTransactions_' + idNum + '__DailyMemo' + slotType + value.checkNum).closest($('div.errorHighlight' + assignColors[ruleNum])).length;
                if (errorDivExists == 0) {
                    var newElem = $("<div/>").addClass('errorHighlight' + assignColors[ruleNum]);
                    $('#DailyMemoTransactions_' + idNum + '__DailyMemo' + slotType + value.checkNum).wrap(newElem);
                }
            });
            errors.push(new CustomError(ruleNum, true));
        }

        function removeErrorHighlight3(array, slotType, ruleNum) {
            $.each(array, function (key, value) {
                $('#DailyMemoTransactions_' + idNum + '__DailyMemo' + slotType + value.checkNum).closest($('div.errorHighlight' + assignColors[ruleNum])).removeClass('errorHighlight' + assignColors[ruleNum]);
            });
        }

        function addErrorHighlight4(ruleNum) {
            var errorTrue = false;
            if (assignColors[ruleNum] == 0) {
                assignHighlightColor(ruleNum);
            }
            $selectData.each(function () {
                var min = $(this).val();
                var workHour = selectData;
                if (min == 0) {
                    var errorDivExists = $(this).closest($('div.errorHighlight' + assignColors[ruleNum])).length;
                    if (errorDivExists == 0) {
                        var newElem = $("<div/>").addClass('errorHighlight' + assignColors[ruleNum]);
                        $(this).wrap(newElem);
                    }
                    errorTrue = true;
                }
            });
            if (errorTrue == true) {
                errors.push(new CustomError(ruleNum, true));
            }
        }

        function removeErrorHighlight4(ruleNum) {
            $selectData.each(function () {
                $(this).closest($('div.errorHighlight' + assignColors[ruleNum])).removeClass('errorHighlight' + assignColors[ruleNum]);
            });
        }


    }

}