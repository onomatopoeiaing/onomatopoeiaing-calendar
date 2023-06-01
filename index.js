/**
 * 获取数组中的最大值/最小值
 * @param type 最大还是最小 {string}
 */
Array.prototype.getExtreme = (function(type = "max") {
    if (type == "max") {
        value = this[0];
        for (var k = 1; k < this.length; k++) {
            if (this[k] > value) {
                value = this[k];
            };
        };
        return value;
    } else if (type == "min") {
        value = this[0];
        for (var k = 1; k < this.length; k++) {
            if (this[k] < value) {
                value = this[k];
            };
        };
        return value;
    } else {
        return NaN;
    };
});
/**
 * 获取数组中所有元素的平均值
 * @returns average 平均值 {number}
 */
Array.prototype.average = (function() {
    sum = 0;
    for (var k = 0; k < this.length; k++) {
        sum += this[k];
    };
    return sum / (this.length - 1);
});
/**
 * 截取字符串位置a到位置b之间的字符
 * @param posa 位置a {number}
 * @param posb 位置b {number}
 * @returns response 截取后的字符传 {string}
 */
String.prototype.intercept = (function(posa = 0, posb = 0) {
    response = "";
    for (var k = posa; k <= posb; k++) {
        response += this[k];
    };
    return response;
});
/**
 * 提取字符串中字符之前/之后的字符
 * @param character 分界符 {string}
 * @param area 区域 {string}
 * @returns string 字符 {string}
 */
String.prototype.areaIntercept = (function (character = "", area = "before") {
    if (area == "before") {
        return this.intercept(0, this.indexOf(character) - 1);
    } else if (area == "after") {
        return this.intercept(this.indexOf(character) + 1, this.length - 1);
    };
});
/**
 * 对于不满足指定长度的数字进行修补
 * @param string 传入字符 {string}
 * @param length 指定长度 {number}
 * @param character 指定字符 {string}
 * @param direction 从前插入/从后插入 {string}
 * @returns string 处理后的字符串 {string}
 */
function repair(string, length, character = "0", direction = "front") {
    if (typeof string != "undefined") {
        string = string.toString();
        if (direction == "front") {
            while (length - string.length > 0) {
                string = character + string;
            };
        } else if (direction == "behind") {
            while (length - string.length > 0) {
                string += character;
            };
        };
        return string;
    } else {
        return "Empty";
    };
};
/**
 * 对两个数字执行整除操作
 * @param a 数字a {number}
 * @param b 数字b {number}
 * @returns c 结果 {number}
 */
function IntegerDivision(a, b) {
    return (a - a % b)/b;
};
/**
 * 格式化时间
 * @param expression 内容表达式 {string}
 * @param offest 是否计算时间偏移量带来的影响 {boolean}
 * @return result 返回内容 {any}
 */
function getTime(expression = "", offest = true) {
    //Examples of Mapping: {{时间key, 期望长度, 补齐字符, 补齐方向}}
    TimeOffestTemp = offest ? TimeOffest * 1000 : 0;
    timestamp = new Date().getTime();
    date = new Date(timestamp + TimeOffestTemp);
    map = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        week: date.getDay(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    };
    preset = {
        "preset0001": "{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}:{{second}}.{{millisecond, 3, 0, behind}}"
    };
    presetlist = Object.keys(preset);
    for (var k = 0; k < presetlist.length; k++) {
        if (presetlist[k] == expression) {
            expression = preset[presetlist[k]];
            break;
        };
    };
    keywordreg = /\{\{[^\}]{1,}\}\}/g;
    list = expression.match(keywordreg);
    for (var k = 0; k < list.length; k++) {
        temp = list[k];
        parameter = temp.replace(/\{|\}| /g, "").split(",");
        variable = repair(map[parameter[0]], parameter[1] || 2, parameter[2] || "0", parameter[3] || "front");
        expression = expression.replace(temp, variable == NaN ? "Empty" : variable)
    };
    return expression;
};
/**
 * (通过时间戳)格式化时间
 * @param expression 内容表达式 {string}
 * @param timestamp 时间戳 {number}
 * @param accuracy 时间戳精确度 {string}
 * @param offest 是否计算时间偏移量带来的影响 {boolean}
 * @return result 返回内容 {any}
 */
function getTimeUseTimestamp(expression = "", timestamp = 0, accuracy = "ms" , offest = true) {
    //Examples of Mapping: {{时间key, 期望长度, 补齐字符, 补齐方向}}
    timestamp = parseInt(timestamp);
    TimeOffestTemp = offest ? TimeOffest : 0;
    date = new Date(accuracy == "ms" ? timestamp + TimeOffestTemp * 1000 : (timestamp + TimeOffestTemp) * 1000);
    map = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        week: date.getDay(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    };
    preset = {
        "preset0001": "{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}:{{second}}.{{millisecond, 3, 0, behind}}"
    };
    presetlist = Object.keys(preset);
    for (var k = 0; k < presetlist.length; k++) {
        if (presetlist[k] == expression) {
            expression = preset[presetlist[k]];
            break;
        };
    };
    keywordreg = /\{\{[^\}]{1,}\}\}/g;
    list = expression.match(keywordreg);
    for (var k = 0; k < list.length; k++) {
        temp = list[k];
        parameter = temp.replace(/\{|\}| /g, "").split(",");
        variable = repair(map[parameter[0]], parameter[1] || 2, parameter[2] || "0", parameter[3] || "front");
        expression = expression.replace(temp, variable == NaN ? "Empty" : variable)
    };
    return expression;
};
/**
 * (通过秒数)格式化时间
 * @param second 秒钟 {number}
 * @param expression 内容表达式 {string}
 * @returns result 格式化时间 {string}
 */
function getTimeUseSecond(expression = "", second = 0) {
    date = new Date(second * 1000);
    map = {
        year: date.getFullYear() - 1970,
        month: date.getMonth() + 1 == 1 ? 0 : date.getMonth(),
        week: date.getDay(),
        day: date.getDate() - 1,
        hour: second <= 8 * 60 * 60 ? date.getHours() - 8 : date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    };
    preset = {
        "preset0001": "{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}:{{second}}.{{millisecond, 3, 0, behind}}"
    };
    presetlist = Object.keys(preset);
    for (var k = 0; k < presetlist.length; k++) {
        if (presetlist[k] == expression) {
            expression = preset[presetlist[k]];
            break;
        };
    };
    keywordreg = /\{\{[^\}]{1,}\}\}/g;
    list = expression.match(keywordreg);
    for (var k = 0; k < list.length; k++) {
        temp = list[k];
        parameter = temp.replace(/\{|\}| /g, "").split(",");
        variable = repair(map[parameter[0]], parameter[1] || 2, parameter[2] || "0", parameter[3] || "front");
        expression = expression.replace(temp, variable == NaN ? "Empty" : variable)
    };
    return expression;
};
/**
 * 获取当前时间戳
 * @param accuracy 时间戳精确度 {string}
 * @param offest 是否计算时间偏移量带来的影响 {boolean}
 * @returns timestamp 时间戳 {number}
 */
function getTimestamp(accuracy = "ms", offest = true, round = true) {
    date = new Date();
    TimeOffestTemp = offest ? TimeOffest * 1000 : 0;
    if (accuracy == "ms") {
        return date.getTime() + TimeOffestTemp;
    };
    return ((date.getTime() + TimeOffestTemp)/1000).toFixed(round ? 0 : 3);
};
/**
 * 设置数值阈值
 * @param number 数字 {number}
 * @param setting 阈值设置 {object}
 * @returns number 数字 {number}
 */
function threshold(number = 0, setting = {}) {
    if (typeof number != "number") {
        try {
            number = parseFloat(number);
        } catch (e) {
            return number;
        };
    };
    if (number > setting.max) {
        number = setting.max;
    };
    if (number < setting.min) {
        number = setting.min;
    };
    return number;
};
/**
 * 解析时间
 * @param timestring 时间字符串 {string}
 * @returns time 时间对象 {string}
 */
function TimeParse(timestring = "0") {
    list = timestring.match(/[0-9]{1,}/g) || [];
    timestring = "";
    timestring += repair(threshold(list[0], {
        max: 3000,
        min: 1970
    }) || "1970", 4) + "-";
    timestring += repair(threshold(list[1], {
        max: 12,
        min: 1
    }) || "01", 2) + "-";
    timestring += repair(threshold(list[2], {
        max: 31,
        min: 1
    }) || "01", 2) + " ";
    timestring += repair(threshold(list[3], {
        max: 23,
        min: 0
    }) || "08", 2) + ":";
    timestring += repair(threshold(list[4], {
        max: 59,
        min: 0
    }) || "00", 2) + ":";
    timestring += repair(threshold(list[5], {
        max: 59,
        min: 0
    }) || "00", 2) + ".";
    timestring += repair(threshold(list[6], {
        max: 999,
        min: 0
    }) || "000", 3, "0", "behind");
    date = new Date(timestring);
    return {
        time: timestring,
        timestamp: date.getTime()
    };
};
/**
 * 检测输入框数据是否合法
 * @param rule 规则 {array}
 * @param restriction 限制 {object}
 * @parse demo 实例对象 {HTMLElement}
 */
function examine(rule, restriction, demo) {
    rule.forEach((value) => {
        switch (value) {
            case "number":
                valuedemo.value;
                number = parseFloat(value);
                min = restriction.min;
                max = restriction.max;
                if (number < min) {
                    demo.value = min.toString();
                } else if (number > max) {
                    demo.value = max.toString();
                };
            case "length":
                value = demo.value;
                length = value.length;
                max = restriction.length;
                if (length > max) {
                    demo.value = value.intercept(0, max - 1);
                };
            case "type":
                value = demo.value;
                type = restriction.type;
                rule = restriction.rule == "" ? "float" : restriction.rule;
                if (type == "number") {
                    if (isFinite(value)) {
                        if (rule == "integer") {
                            if (value.indexOf(".") == -1) {
                                demo.setAttribute("lastInput", value);
                            } else {
                                demo.value = demo.getAttribute("lastInput") == undefined ? "" : demo.getAttribute("lastInput");
                            };
                        };
                        demo.setAttribute("lastInput", value);
                    } else {
                        demo.value = demo.getAttribute("lastInput") == undefined ? "" : demo.getAttribute("lastInput");
                    };
                };
        };
    });
};
//获取储存在本地储存中储存的时间偏移数据
TimeOffest = parseFloat(localStorage.getItem("TimeOffestFromCalendar") || 0);
