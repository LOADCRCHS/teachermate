(function($) {
"use strict";

var gTicksLeft = 0;
var duration = 400;
var removeTop = 180;
var digit1 = 0;
var digit2 = 0;
var digit3 = 0;
var digit4 = 0;

var getTicksLeft = function() {
    return gTicksLeft;
};

var decTicksLeft = function() {
    gTicksLeft--;
};

var removeAllDigits = function($element) {
    $element.removeClass("digit0 digit1 digit2 digit3 digit4 digit5 digit6 digit7 digit8 digit9");
};

var setItem = function(itemNumber, digit) {
    var token = "#counter_item" + itemNumber + " :first-child";
    var $element = $(token);

    removeAllDigits($element);
    $element.addClass("digit" + digit).text(digit);
};

var calculateDigits = function(count) {
    var minutesLeft = Math.floor(count / 60);
    var secondsLeft = count - minutesLeft * 60;

    digit1 = Math.floor(minutesLeft / 10);
    digit2 = minutesLeft - digit1 * 10;

    digit3 = Math.floor(secondsLeft / 10);
    digit4 = secondsLeft - digit3 * 10;

};

window.CounterInit = function(ticksCount) {
    gTicksLeft = ticksCount;
    calculateDigits();
    setItem(1, digit1);
    setItem(2, digit2);
    setItem(4, digit3);
    setItem(5, digit4);
};

var switchItem = function(itemNumber, digit, capacity) {
    var nextDigit = (digit === 0) ? capacity : (digit - 1);
    var token = "#counter_item" + itemNumber + " :first-child";
    var $element = $(token);
    $element.siblings().remove();
    removeAllDigits($element);
    $element.addClass("digit" + digit);
    $element.after('<div class="digit digit' + nextDigit + '" style="opacity:0;">' + nextDigit+ '</div>');

    //animate($element, nextDigit);
};

var animate = function($element, nextDigit) {
    var $newElement = $element.next();
    $element.animate({
        marginTop: -removeTop,
        opacity: 0
    }, duration, function () {
        $(this).remove();
    });

    $newElement.animate({
        opacity: 1
    }, duration);
}

window.ConterTick = function(count) {
    calculateDigits(count);

    if(digit4 === 0) {
        if (digit3 === 0) {
            if (digit2 === 0) {
                switchItem(1, digit1, 5);
            }
            switchItem(2, digit2, 9);
        }
        switchItem(4, digit3, 5);
    }
    setItem(1, digit1);
    setItem(2, digit2);
    setItem(4, digit3);
    setItem(5, digit4);
    switchItem(5, digit4, 9);
};

})(jQuery);