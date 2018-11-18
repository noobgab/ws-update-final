function updateRTdata() {
    $.get('/data', function(data) {
        $(".rt-humidity").html(data['hr'] + "%");
        $(".rt-temperature").html(data['tr'] + "*C");
    });
}

$(document).ready(function() {
    $(".real-time-btn").click(function() {
        console.log("Real time btn clicked");
    });

    $(".historic-data-btn").click(function() {
        console.log("Historic data btn clicked");
    });

    $.get('/location', function(data) {
        $(".latest-loc").html("<span style=\"color:#565656;\">@</span><span style=\"color:#76323f;\"><u>" + data + "</u></span>");
    });

    updateRTdata();
    setInterval(updateRTdata, 2000);    
});