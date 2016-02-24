$(document).ready(function () {
    var val, hex, finalHex;
    var mode = 0;
    $('#enterColor').keyup(function (e) {
        val = document.getElementById("enterColor").value;
        hex = '#';
        hex += val.toString();
        finalHex = val != "" ? hex : '#fff';
        $(this).css('background-color', finalHex);
        console.log(mode);
        switch (mode) {
        case 0:
            $('#container').css('background-color', finalHex);
            break;

        case 1:
            complementary(finalHex);
            break;

        case 2:
            shadeStripes(val);
            break;
        };

    });

    if (mode === 2) {
        $('.stripe').mouseenter(function () {
            var cl = parseInt($(this).attr('id').charAt(3)) % 2 == 0 ? "top" : "bottom";
            $(this).html('<p class="str-' + cl + '">' + $(this).css('background-color') + "</p>");
        });
    }

    $('.stripe').mouseleave(function () {
        $(this).html("");
    })

    $('#norm').click(function () {
        mode = 0;
        $('#container').children().css('background-color', 'transparent');
    })

    $('#comp').click(function () {
        mode = 1;
    })

    $('#pick').click(function () {
        mode = 2;
        $('#container').children().css('background-color', 'transparent');
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

function complementary(hex) {
    var rgb = hexToRgb(hex),
        r = complement(rgb[0]),
        g = complement(rgb[1]),
        b = complement(rgb[2]);
    $('#container').css('background-color', rgbToHex(r, g, b));

}

function complement(i) {
    return 255 - i;
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