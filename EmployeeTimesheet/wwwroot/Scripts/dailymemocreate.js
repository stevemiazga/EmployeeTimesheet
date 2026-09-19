/// <reference path="jquery-3.1.1.min.js" />
/// <reference path="dailymemobundlefunctions.js" />

$(document).ready(function () {

    $('textarea').textareaAutoSize();

    initalTaskLoad();
    checkAllTaskTotal();

    if ($('#notification').val() != "")
    {
        var notification = $('#notification').val();

        $('#messageText').append('<div class="successmessage">'+ notification + '</div>').delay(5000).fadeOut('slow');
    }

    if ($('#activecell').val() != "")
    {
        var focusItem = $('#activecell').val();
        $('#' + focusItem).focus();
        getCurrentCellFocus();
    }
    else
    {
        $('#DailyMemoTransactions_0__TaskDescr').focus();
        storeFocusItem();
    }

    $('#addTask').on('click', function () {
        resetAutoSave();
        var dailymemoHeaderId = $('#DailyMemoHeader_DailyMemoHeaderId').val();

        var task = ($('table tbody tr.taskdata').length) - 1;
        var breaks = ($('table tbody tr.breakdata').length);
        var lunch = ($('table tbody tr.lunchdata').length);
        var i = task + breaks + lunch + 1;

        var lastDepartmentDropDown = $('select.departmentDropDown:last').html();
        var lastTaskDropDown = $('select.taskDropDown:last').html();

        var lastDepartmentDropDownValue = $('select.departmentDropDown:last').val();
        var lastTaskDropDownValue = $('select.taskDropDown:last').children(0).val();

        var markup = '<tr class="taskdata additionaltask">' +
            '<td>' +
                '<div>' +
                    '<button title="Delete Task" id="deleteTask' + i + '" class="btnDelete deleteTask" type="button"></button>' +
                    '<input name="DailyMemoTransactions[' + i + '].DailyMemoHeaderId" id="DailyMemoTransactions_' + i + '__DailyMemoHeaderId" type="hidden" value=' + dailymemoHeaderId + '>' +
                '</div>' +
                '<div id="loadingId' + i + '" style="display:none;">' +
                    '<img alt="" style="height:16px;width:16px;" src="' + ajaxloadingURL + '" />' +
                '</div>' +
            '</td>' +
            '<td style="padding-right:0">' +
                '<div style="margin-bottom:4px;">' +
                    '<select name="DailyMemoTransactions[' + i + '].TransDepartmentId" class="departmentDropDown" id="DailyMemoTransactions_' + i + '__TransDepartmentId">' + lastDepartmentDropDown + '</select>' +
                '</div>' +
                '<div>' +
                    '<select id ="taskDropDown' + i + '" class="taskDropDown">' + lastTaskDropDown + '</select>' +
                    '<input name="DailyMemoTransactions[' + i + '].TaskId" id="DailyMemoTransactions_' + i + '__TaskId" type="hidden" value="" />' +  
                '</div>' +
            '</td>' +
            '<td>' +
                '<input name="DailyMemoTransactions[' + i + '].TaskType" id="DailyMemoTransactions_' + i + '__TaskType" type="hidden" value="Task" />' +
                '<textarea cols="20" rows="3" name="DailyMemoTransactions[' + i + '].TaskDescr" class="taskDescr" id="DailyMemoTransactions_' + i + '__TaskDescr" type="text" value="" />' +
            '</td>' +
            '<td>' +
                '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty1" class="task qty colqty1" id="DailyMemoTransactions_' + i + '__DailyMemoQty1" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes1" class="task min colmin1" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes1" type="number" maxlength="2" min="1" max="60"  value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty2" class="task qty colqty2" id="DailyMemoTransactions_' + i + '__DailyMemoQty2" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes2" class="task min colmin2" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes2" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty3" class="task qty colqty3" id="DailyMemoTransactions_' + i + '__DailyMemoQty3" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes3" class="task min colmin3" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes3" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty4" class="task qty colqty4" id="DailyMemoTransactions_' + i + '__DailyMemoQty4" type="number" maxlength="3" min="1"  value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes4" class="task min colmin4" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes4" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty5" class="task qty colqty5" id="DailyMemoTransactions_' + i + '__DailyMemoQty5" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes5" class="task min colmin5" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes5" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty6" class="task qty colqty6" id="DailyMemoTransactions_' + i + '__DailyMemoQty6" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes6" class="task min colmin6" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes6" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty7" class="task qty colqty7" id="DailyMemoTransactions_' + i + '__DailyMemoQty7" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes7" class="task min colmin7" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes7" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoQty8" class="task qty colqty8" id="DailyMemoTransactions_' + i + '__DailyMemoQty8" type="number" maxlength="3" min="1" value="" />' +
            '</td>' +
            '<td>' +
            '<input name="DailyMemoTransactions[' + i + '].DailyMemoMinutes8" class="task min colmin8" id="DailyMemoTransactions_' + i + '__DailyMemoMinutes8" type="number" maxlength="2" min="1" max="60" value="" />' +
            '</td>' +
            '<td>' +
                '<div class="qtyTotal"></div>' +
            '</td>' +
            '<td>' +
                '<div class="minTotal"></div>' +
            '</td>' +
            '</tr>';

        $('table tbody tr.taskdata').last().after(markup);

        $('#DailyMemoTransactions_' + i + '__TransDepartmentId').val(lastDepartmentDropDownValue);
        $('#DailyMemoTransactions_' + i + '__TaskId').val(lastTaskDropDownValue);
        
        updateTaskTotals("edit");
        checkWorkhours();
        $('textarea').textareaAutoSize();

    });

    $('table tbody').on('click', '.deleteTask', function (event) {
        resetAutoSave();
        var id = $(event.target).attr('id');
        var removeNum = parseInt(id.match(/\d+$/));
        $("#" + id).closest('tr').remove();
        renumberTasks(removeNum);
        updateTaskTotals("edit");
        checkWorkhours();
        if ($('#errorText').text() != "") {
            validateSubmitErrors();
        }
        return false;
    });

    $('table tbody').on('change', '.departmentDropDown', function (event) {
        resetAutoSave();
        var departmentDropDownId = $(event.target).attr('id');
        var departmentId = $("#" + departmentDropDownId).val();
        var taskDropDownId = $("#" + departmentDropDownId).parent().next().find('.taskDropDown').attr('id');
        var loadId = taskDropDownId.match(/\d+$/);
        $('#loading' + loadId).show();
        $.getJSON(tasksURL, { "departId": departmentId }, function (data) {
            $('#' + taskDropDownId).empty();
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html += '<option value = ' + data.data[i].taskId + '>' + data.data[i].taskDescr + '</option>';
            }
            $('#' + taskDropDownId).append(html);
            $('#loading' + loadId).hide();
        }).done(function () {
            $('#' + taskDropDownId + ' option:selected').text(" Free-form Text");
            $('#' + taskDropDownId).trigger("change");
        });

        return false;
    });

    $('table tbody').on('change', '.taskDropDown', function (event) {
        clearTimeout(timerAutoSave);
        clearTimeout(timerSeconds);
        autosaveseconds = 0;

        var taskDropDownId = $(event.target).attr('id');
        var taskDescr = $('#' + taskDropDownId).closest('td').next().find('.taskDescr').attr('id');
        var taskDropDownSelectedText = $('#' + taskDropDownId +' option:selected').text().trim();

        if (taskDropDownSelectedText == "Free-form Text") {
            $('textarea').textareaAutoSize();
            $('#' + taskDescr).val('');
            $('#' + taskDescr).attr('readonly', false);
            $('#' + taskDescr).trigger('keyup');
        }
        else {
            $('textarea').textareaAutoSize();
            $('#' + taskDescr).val(taskDropDownSelectedText);
            $('#' + taskDescr).attr('readonly', true);
            $('#' + taskDescr).trigger('keyup');
        }

        var selectedTaskId = $('#' + taskDropDownId + ' option:selected').val();
         $('#' + taskDropDownId).next().val($('#' + taskDropDownId + ' option:selected').val());

        if ($('#errorText').text() != "") {
            validateSubmitErrors();
         }

        processAutoSaveTimer();
        processAutoSave();

        return false;
    });

    $('#DailyMemoHeader_WorkId').on('change', function () {
        resetAutoSave();
        var selectedWorkId = $(this).val();
        workHours(selectedWorkId);
        $('#DailyMemoTransactions_0__TaskDescr').focus();
        storeFocusItem();
    });

    //change after submit
    $('table tbody').on('change', '.task, .taskDescr', function (event) {
        clearTimeout(timerAutoSave);
        clearTimeout(timerSeconds);
        autosaveseconds = 0;

        var x = $(this).attr('id');
        if (document.getElementById(x).checkValidity() == false)
        {
            if (document.getElementById(x).validity.rangeUnderflow)
            {
                event.target.setCustomValidity("Please enter a value at least 1.");
            }
            else {
                event.target.setCustomValidity("");
            }

            $('#btnSave').trigger('click');
        }

        var taskChangeClasses = $(event.target).attr('class').split(' ');
        checkTaskTotal(taskChangeClasses,true);

        updateTaskTotals("edit");

        if ($(this).attr('class') != "taskDescr")
        {
            $(this).val(parseInt($(this).val()));
        }
        storeFocusItem();
        
        if ($('#errorText').text() != "") {
            validateSubmitErrors();
        }

        processAutoSaveTimer();
        processAutoSave();

    });

    $('#dailyMemoTable').keydown(function (e) {
       
        var enableEnterDefault = false;

        if (e.target.type == "number" && (e.keyCode == 190 || e.keyCode == 110 || e.keyCode == 189 || e.keyCode == 109))
        {
            resetAutoSave();
            e.preventDefault();
        }

        if (e.target.type == "textarea" && e.target.readOnly == false)
        {
            resetAutoSave();
            enableEnterDefault  = true;
        }
       
        if (e.which == "13" && enableEnterDefault == false) {
            resetAutoSave();
            e.preventDefault();
        }

        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
        {
            e.preventDefault();
            resetAutoSave();
            arrowCellNavigation(e);
            focusStartCount++;
        }
        else if (e.keyCode == 9) {
            resetAutoSave();
            focusStartCount = 0;
        }

    });

    $('input[type=number],textarea').click(function () {
        resetAutoSave();
        focusStartCount = 0;
    });

    $('#btnSave').click(function () {
        if (autosaveseconds == 0)
        {
            $('#notification').val("save");
        }
        else
        {
            $('#notification').val("autosave");
        }
        clearTimeout(timerAutoSave);
        clearTimeout(timerSeconds);
        autosaveseconds = 0;

    });

    $('#btnSubmit').click(function () {
        $('#dailymemoform').submit(function () {
            clearTimeout(timerAutoSave);
            clearTimeout(timerSeconds);
            autosaveseconds = 0;

            $('#messageText').text('');
            $('#notification').val("submit");
            validateSubmitErrors();
            //var isFormValid = false;
            //alert("submitted! (skipping validation for cancel button)");

            return isFormValid;
        });
    });

});
