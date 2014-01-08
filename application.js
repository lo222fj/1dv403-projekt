"use strict";
var backgroundChanger = {

    init : function() {
        this.initializeBackgroundChangerIcon();
    },

    initializeBackgroundChangerIcon : function() {
        var aOpenWindow = $("#chooseBackgroundIcon");

        var that = this;
        aOpenWindow.click(function() {
            that.openWindow();
        });
    },

    openWindow : function() {
        //skapar element för fönster och dess delar
        var divChooseBackground = $("<div class='chooseBackgroundWindow'></div>");
        var headerChooseBackground = $("<header class='headerChooseBackgroundWindow'></header>");
        var iconChooseBackground = $("<img class='iconChooseBackgroundWindow' src='icon_DSC00846.png'/>");
        var headerTextChooseBackground = $("<span class='headerTextChoosenBackgroundWindow'>Välj bakgrundsbild</span>");
        var aCloseChooseBackground = $("<a class='aClose' href='#' titel='Stäng'></a>");
        var imgCloseChooseBackground = $("<img class='imgClose' src='fileclose.png'/>");
        var mainChooseBackground = $("<main class ='mainChooseBackgroundWindow'></main>");
        var footerChooseBackground = $("<footer class='footerChooseBackgroundWindow'></footer>");

        //lägger ut elementen i DOMen
        $("#masterMain").append(divChooseBackground);
        divChooseBackground.append(headerChooseBackground);
        divChooseBackground.append(mainChooseBackground);
        divChooseBackground.append(footerChooseBackground);
        headerChooseBackground.append(iconChooseBackground);
        headerChooseBackground.append(headerTextChooseBackground);
        headerChooseBackground.append(aCloseChooseBackground);
        aCloseChooseBackground.append(imgCloseChooseBackground);

        var that = this;
        aCloseChooseBackground.click(function() {
            that.closeBackgroundWindow(divChooseBackground);
        })
        //Läser in json-sträng, parsar och presenterar tumnagelbilder i fönstret
        var callback = function(respons) {
            var images = JSON.parse(respons);
            var i;

            //Hittar högsta höjd och bredd bland tumnagelbilderna
            var heights = images.map(function(image) {
                return image.thumbHeight;
            });
            var highestImg = Math.max.apply(Math, heights);

            var widths = images.map(function(image) {
                return image.thumbWidth;
            });
            var widestImg = Math.max.apply(Math, widths);

            /*Skapar en img-tag i en a-tag för varje tumnagebild som lästs in med json
             Varje a-tag läggs i en div*/
            for ( i = 0; i < images.length; i += 1) {
                var thumbSrc = images[i].thumbURL;
                var picture = images[i].URL;
                var a = $("<a class ='aAroundImgsToChoose' href='#' title='Välj som bakgrund'></a>");
                var string = "<img class='imgsToChoose' src='" + thumbSrc + "' data-bigImg ='" + picture + "'  />";
                var img = $(string);
                var divString = "<div class='imageDivs' style='height: " + highestImg + "px ;width: " + widestImg + "px' ></div>";
                var thumbDiv = $(divString);

                thumbDiv.append(a);
                a.append(img);
                mainChooseBackground.append(thumbDiv);
                
                /*Här inne är "this" beroende på vem som anropar funktionen callback. Vill att det ska vara samma som där jag 
                tidigare deklarerade "that" tidigare i funktionen*/
                a.click(function(e) {
                    that.changeBackgroundImage(e);
                });
            }
            /*Tar bort ladda-symbol om det finns */
            /*Här inne är "this" beroende på vem som anropar funktionen callback. Vill att det ska vara samma som där jag 
                tidigare deklarerade "that" tidigare i funktionen*/
            that.deleteLoadingIcon(footerChooseBackground);
        };
        new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", callback, footerChooseBackground);
    },

    deleteLoadingIcon : function(footerChooseBackground) {
        footerChooseBackground.children().remove();
    },
    changeBackgroundImage : function(e) {
        var background = $("html");
        var imgTag = e.currentTarget.firstChild;
        var jQImgTag = $(imgTag);
        var newSrc = jQImgTag.attr("data-bigImg");
        background.css("background-image", "url(" + newSrc + ")");
        background.css("background-size", "inherit");
        background.css("background-repeat", "repeat");
    },
    closeBackgroundWindow : function(divChooseBackground) {
        divChooseBackground.remove();
    }
};
window.onload = function() {
    backgroundChanger.init();
}
