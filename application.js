"use strict";
var backgroundChanger = {

    init : function() {
        var aOpenWindow = $("#chooseBackgroundIcon");

        console.log(aOpenWindow);
        aOpenWindow.click(function() {
            var divChooseBackground = $("<div id='chooseBackgroundWindow'></div>");
            var headerChooseBackground = $("<header class='headerChooseBackgroundWindow'></header>");
            var mainChooseBackground = $("<main class ='mainChooseBackgroundWindow'></main>");
            var footerChooseBackground = $("<footer class='footerChooseBackgroundWindow'></footer>");
            var iconChooseBackground = $("<img class='iconChooseBackgroundWindow' src='icon_DSC00846.png'/>");
            var headerTextChooseBackground = $("<span class='headerTextChoosenBackgroundWindow'>Välj bakgrundsbild</span>");
  
            $("main").append(divChooseBackground);

            divChooseBackground.append(headerChooseBackground);
            headerChooseBackground.append(iconChooseBackground);
            headerChooseBackground.append(headerTextChooseBackground);
            divChooseBackground.append(mainChooseBackground);
            divChooseBackground.append(footerChooseBackground);
        });
    }
};
window.onload = function() {
    backgroundChanger.init();
}
