$(document).ready(function () {
    var val;
    var hex;
    var finalHex;
    $('#enterColor').keyup(function (e) {
        val = document.getElementById("enterColor").value;
        console.log(val);
        hex = '#';
        hex += val.toString();
        finalHex = val != "" ? hex : '#fff';
        $(this).css('background-color', finalHex);
        shadeStripes(val);
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
    var lowest = (r < g && r < b) ? r : (b < g) ? b : g;
    var highest = (r > g && r > b) ? r : (b > g) ? b : g;
    for (i = 1; i <= 6; i++) {
        step = (255 - highest < lowest) ? 255 - highest - ((255 - highest) * (i / 3)) : (-1 * lowest) + (i / 3) * lowest;
        $('#str' + i).css('background-color', rgbToHex(Math.ceil(r + step), Math.ceil(g + step), Math.ceil(b + step)));
        if (r + g + b < 382) {
            $('.stripe').css('color', '#fff');
            $('#enterColor').css('border-color', "#fff");
        } else {
            $('.stripe').css('color', '#000');
            $('#enterColor').css('border-color', "#000");
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