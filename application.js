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
        });
        this.positionWindow();

        divChooseBackground.click(function() {
            that.moveWindowToTop(divChooseBackground);
        })
        //Läser in json-sträng, parsar och presenterar tumnagelbilder i fönstret
        //callback anropas vid "onreadystate" och skickar då in responstext från Ajax-anrop
        var callback = function(respons) {
            /*I callback är "this" beroende på vem som anropar funktionen callback. 
             Använder det "that" som deklarerats i den yttre funktionen eftersom jag vill ha samma this som där */
            var images = JSON.parse(respons);
            
            var imageDivs = that.makeImageDivs(images);
            mainChooseBackground.append(imageDivs);

            //Kopplar klickevent till alla a-taggar
            var as = $(".aAroundImgsToChoose");
            as.click(function(e) {
                that.changeBackgroundImage(e);
            });
            /*Tar bort ladda-symbol om det finns */
            that.deleteLoadingIcon(footerChooseBackground);
        };
        new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", callback, footerChooseBackground);
    },
    /*Skapar en img-tag i en a-tag för varje tumnagebild som lästs in med json
     Varje a-tag läggs i en div*/
    makeImageDivs : function(images) {
        //Hittar den högsta höjden bland tumnagelbilderna...
        var heights = images.map(function(image) {
            return image.thumbHeight;
        });
        var highestImg = Math.max.apply(Math, heights);

        //...och den största bredden bland tumnagelbilderna
        var widths = images.map(function(image) {
            return image.thumbWidth;
        });
        var widestImg = Math.max.apply(Math, widths);
        //skapar array och divar med bilder i a-taggar. Divarna läggs i arrayen som returneras
        var divArray = [];
        var i;
        for ( i = 0; i < images.length; i += 1) {
            var thumbSrc = images[i].thumbURL;
            var picture = images[i].URL;
            var a = $("<a class ='aAroundImgsToChoose' href='#' title='Välj som bakgrund'></a>");
            var jsImg = "<img class='imgsToChoose' src='" + thumbSrc + "' data-bigImg ='" + picture + "'  />";
            var jQImg = $(jsImg);
            var jsDiv = "<div class='imageDivs' style='height: " + highestImg + "px ;width: " + widestImg + "px' ></div>";
            var thumbDiv = $(jsDiv);
            thumbDiv.append(a);
            a.append(jQImg);
            divArray.push(thumbDiv);
        }
        return divArray;
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
    },
    moveWindowToTop : function(divChooseBackground) {
        var divs = $(".chooseBackgroundWindow");

        divs.each(function(index) {
            var divJqIndex = $(divs[index]);
            divJqIndex.removeClass("front");
        });
        divChooseBackground.addClass("front");
    },
    positionWindow : function() {
        var divs = $(".chooseBackgroundWindow");
        var top = 10;
        var left = 10;

        divs.each(function(index) {
            var divJqIndex = $(divs[index]);
            divJqIndex.css({
                top : top,
                left : left
            });
            top += 30;
            left += 30;
        });
    }
};
window.onload = function() {
    backgroundChanger.init();
}
