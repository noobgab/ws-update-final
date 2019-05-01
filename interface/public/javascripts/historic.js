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
                      borderColor: "#beed12",
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
});

