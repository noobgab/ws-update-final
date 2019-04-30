function updateRTdata() {
    $.get('/data', (data) => {
        if(data != "0") {
            // Update reading fields
            $(".location-display").html("@ " + data.reading_location);
            $(".temp-reading").html(data.temperature + "&deg;C");
            $(".hum-reading").html(data.humidity + "%");
        }
    });
}

$(document).ready(() => {
    let logo = $(".icon");
    logo.html('<ion-icon name="cloud"></ion-icon>');

    logo.hover(() => {
        logo.html('<ion-icon name="rainy"></ion-icon>');
    }, () => {
        logo.html('<ion-icon name="cloud"></ion-icon>');
    });

    updateRTdata();
    setInterval(updateRTdata, 2000);
});