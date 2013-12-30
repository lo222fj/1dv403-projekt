"use strict";
var backgroundChanger = {

    init : function() {
        var aOpenWindow = $("#chooseBackgroundIcon");

        console.log(aOpenWindow);
        aOpenWindow.click(function() {
            //skapar element för fönster och dess delar
            var divChooseBackground = $("<div id='chooseBackgroundWindow'></div>");
            var headerChooseBackground = $("<header class='headerChooseBackgroundWindow'></header>");
            var mainChooseBackground = $("<main class ='mainChooseBackgroundWindow'></main>");
            var footerChooseBackground = $("<footer class='footerChooseBackgroundWindow'></footer>");
            var iconChooseBackground = $("<img class='iconChooseBackgroundWindow' src='icon_DSC00846.png'/>");
            var headerTextChooseBackground = $("<span class='headerTextChoosenBackgroundWindow'>Välj bakgrundsbild</span>");

            //lägger ut elementen i DOMen  
            $("main").append(divChooseBackground);
            divChooseBackground.append(headerChooseBackground);
            headerChooseBackground.append(iconChooseBackground);
            headerChooseBackground.append(headerTextChooseBackground);
            divChooseBackground.append(mainChooseBackground);
            divChooseBackground.append(footerChooseBackground);
            
            var callback = function(respons){
                var jsonStr = respons;
                var images = JSON.parse(jsonStr);
                var i;
                
                for(i = 0; i<images.length; i +=1){
                var thumbSrc = images[i].thumbURL;
                console.log(thumbSrc);
                var img = $("<img class='imgsToChoose' src='"+thumbSrc+"' />");
                
                var thumbDiv = $("<div class='imageDivs'></div>");
                thumbDiv.append(img);
                mainChooseBackground.append(thumbDiv);
                }
                
             };
            
            new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", callback);
        });
        
    }
};
window.onload = function() {
    backgroundChanger.init();
}
