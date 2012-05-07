var listOfCharacters, lsName;
listOfCharacters = [];
lsName = "characters";

function Char(name, used, wins, losses, superMove, ultraMove) {
    var self = this;
    self.name = name;
    self.used = used || 0;
    self.wins = wins || 0;
    self.losses = losses || 0;
    self.superMove = superMove || "";
    self.ultraMove = ultraMove || "";
}

Char.prototype.display = function() {

};

function save() {
    localStorage.setItem(lsName, JSON.stringify(listOfCharacters));
}

function load() {
    if (localStorage.getItem(lsName)) {
        console.log(localStorage.getItem(lsName));
        listOfCharacters = JSON.parse(localStorage.getItem(lsName));
    }
    else {
        listOfCharacters.push(new Char('Ryu'));
        listOfCharacters.push(new Char('Ken'));
        listOfCharacters.push(new Char('Chun Li'));
        listOfCharacters.push(new Char('Zangief'));
        listOfCharacters.push(new Char('Gouken'));
    }
}

function displayCharacterNames() {
    var $used, $not_used;
    $used = $("#used");
    $not_used = $("#not_used");

    $used.html("");
    $not_used.html("");

    for (var index = 0; index < listOfCharacters.length; ++index) {
        var char = listOfCharacters[index];
        if (char.used) {
            $used.append("<span>" + char.name + "</span>");
        } else {
            $not_used.append("<span>" + char.name + "</span>");
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$("#random").click(function() {
    var rand_choice, $all_used_spans, $rand_span;

    $all_used_spans = $("#used span");
    rand_choice = getRandomInt(0, $all_used_spans.size() - 1);
    $rand_span = $all_used_spans.eq(rand_choice);

    $("#play_with").html($rand_span.text()).show();
});

$("body").on("click", "span", function() {
    for (var index = 0; index < listOfCharacters.length; ++index) {
        var char = listOfCharacters[index];
        if (char.name === $(this).text()) {
            char.used = !char.used;
            break;
        }
    }

    displayCharacterNames();
    save();
});

load();
displayCharacterNames();

