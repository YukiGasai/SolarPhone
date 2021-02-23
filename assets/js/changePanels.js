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


        var changeImg = function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (interval) {
                clearInterval(interval);
            }

            ChangeImg();
        }

        SmallPanel.addEventListener('click', changeImg);

        SmallPanel.addEventListener('keydown', (event) => {
            if (event.key === "Enter")
                changeImg(event)
        });

    }

});