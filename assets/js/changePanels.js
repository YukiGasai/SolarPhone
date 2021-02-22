document.addEventListener('DOMContentLoaded', function() {

    var SmallPanel = document.getElementById('SmallPanelPhone');

    if (SmallPanel) {

        function ChangeImg(imageNumber) {
            var randImg;

            if (imageNumber == undefined) {
                randImg = Math.floor(Math.random() * 9) + 1
            } else {
                randImg = imageNumber;
            }

            SmallPanel.src = "assets/icons/ExamplePhones/" + randImg + ".svg"
            SmallPanel.style.opacity = 1;
        }

        function PhoneRotation() {
            SmallPanel.style.opacity = 0;
            setTimeout(ChangeImg, 2500)
        }

        var interval = setInterval(PhoneRotation, 10000);


        SmallPanel.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (interval) {
                clearInterval(interval);
            }

            ChangeImg();
        });

    }



    // window.addEventListener('resize', function(event) {

    //     var infoContainer = document.getElementsByClassName('QuickInfoWrapper');

    //     var maxWidth = 0;
    //     var maxHeight = 0;
    //     for (let index = 0; index < infoContainer.length; index++) {
    //         const element = infoContainer[index];

    //         if (element.clientWidth > maxWidth) maxWidth = element.clientWidth;
    //         if (element.clientHeight > maxHeight) maxHeight = element.clientHeight;
    //     }


    //     for (let index = 0; index < infoContainer.length; index++) {
    //         const element = infoContainer[index];

    //         element.clientWidth = maxWidth;
    //         element.clientHeight = maxHeight;
    //     }


    // })


});