function updateRTdata() {
    $.get('/data', (data) => {
        if(data != "0") {
            // Update reading fields
            $(".location-display").html("@ " + data.reading_location);
            $(".temp-reading").html(data.temperature + "&deg;C");
            $(".hum-reading").html(data.humidity + "%");
            $(".prediction-min").html(data.prediction_min);
            $(".prediction-max").html(data.prediction_max);
            
            // Change background colour depending on the temperature reading
            let colour1 = '#6fe495';
            let colour2 = '#2dcc83';

            if(data.temperature >= 20) {
                colour1 = '#fbbf09';
                colour2 = '#f2561b';
            } else if(data.temperature <= 5) {
                colour1 = '#c2ddf0';
                colour2 = '#0072bb';
            }

            $("body").css({
                background: "-webkit-gradient(linear, left top, left bottom, from("+colour1+"), to("+colour2+"))" 
            });
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