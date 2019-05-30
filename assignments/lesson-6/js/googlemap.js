// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: 42.0970234, lng: -111.875773};
    // The map, centered at Uluru
    var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 8, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}