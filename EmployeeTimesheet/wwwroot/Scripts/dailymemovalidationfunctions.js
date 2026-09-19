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