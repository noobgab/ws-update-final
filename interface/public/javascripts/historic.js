function updateRTdata() {
  $.get('/data', (data) => {
      if(data != "0") {
          // Update reading fields
          $(".location-display").html("@ " + data.reading_location);
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

    $.get('/data/all', (data) => {
        if(data != "0") {
            let dates = [];
            let temps = [];

            for(let i = 0; i < data.length; i++) {
                dates.push(data[i].reading_date.substr(0, data[i].reading_date.length - 5));
                temps.push(data[i].temperature);
            }

            console.log(dates);
            console.log(temps);

            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                  labels: dates,
                  datasets: [{ 
                      data: temps,
                      label: "Temperature",
                      borderColor: "#fff",
                      fill: false
                    }
                  ]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Recorded Temperature (in degrees Celsius)'
                  }
                }
              });
		}
    });

    updateRTdata();
    setInterval(updateRTdata, 2000);
});

