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

            //Läser in json-sträng, parsar och presenterar tumnagelbilder i fönstret
            var callback = function(respons) {
                var images = JSON.parse(respons);
                var i;

                /*Skapar en img-tag i en a-tag för varje tumnagebild som lästs in med json
                 Varje a-tag läggs i en div*/
                for ( i = 0; i < images.length; i += 1) {
                    var thumbSrc = images[i].thumbURL;
                    var a = $("<a class ='aAroundImgsToChoose' href='#' title='Välj som bakgrund'></a>");
                    var img = $("<img class='imgsToChoose' src='" + thumbSrc + "' />");
                    var thumbDiv = $("<div class='imageDivs'></div>");

                    thumbDiv.append(a);
                    a.append(img);
                    mainChooseBackground.append(thumbDiv);
                }
                //Hittar högsta höjd och bredd bland tumnagelbilderna
                var heights = images.map(function(image) {
                    return image.thumbHeight;
                });
                var highestImg = Math.max.apply(Math, heights);
                console.log(heights);
                console.log(highestImg);
                
                var widths = images.map(function(image) {
                    return image.thumbWidth;
                });
                var widestImg = Math.max.apply(Math, widths)
                console.log(widths);
                console.log(widestImg);
                
            };

            new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", callback);
        });

    }
};
window.onload = function() {
    backgroundChanger.init();
}
