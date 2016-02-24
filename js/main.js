$(document).ready(function () {
    var val;
    var hex;
    var finalHex;
    $('#enterColor').keyup(function (e) {
        val = document.getElementById("enterColor").value;
        val = val ? val : '#fff';
        hex = '#';
        hex += val.toString();
        finalHex = val ? hex : '#fff';
        $(this).css('background-color', finalHex);
        shadeStripes(val);
        console.log(hex);
    });

    $('.stripe').mouseenter(function () {
        var cl = parseInt($(this).attr('id').charAt(3)) % 2 == 0 ? "top" : "bottom";
        $(this).html('<p class="str-' + cl + '">' + $(this).css('background-color') + "</p>");
    });

    $('.stripe').mouseleave(function () {
        $(this).html("");
    })
})

function shadeStripes(hex) {
    var rgb = hexToRgb(hex),
        r = rgb[0],
        g = rgb[1],
        b = rgb[2];
    console.log("R: " + r + " G: " + g + " B: " + b);
    var lowBound = (2 / 3) * (r < g && r < b) ? r : (b < g) ? b : g;
    var highBound = -30 + (r > g && r > b) ? r : (b > g) ? b : g;
    lowBound = (lowBound < 0 ? 0 : lowBound);
    highBound = (highBound > 255 ? 255 : highBound);
    for (i = 1; i <= 6; i++) {
        var step = (lowBound * -1) + (lowBound * (i / 6)); // : highBound - (highBound * (i / 6));
        $('#str' + i).css('background-color', rgbToHex(Math.ceil(r + step), Math.ceil(g + step), Math.ceil(b + step)));
        if (r + g + b < 382) {
            $('.stripe').css('color', '#fff');
            $('#enterColor').css({
                'border-color': "#fff",
                'color': "#fff"
            });
        } else {
            $('.stripe').css('color', '#000');
            $('#enterColor').css({
                'border-color': "#000",
                'color': "#000"
            });
        }
    }
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var col = c.toString(16);
    return col.length == 1 ? "0" + col : col;
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r, g, b];
}