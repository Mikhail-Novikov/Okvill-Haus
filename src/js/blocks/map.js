export default mapGoogle;

function mapGoogle() {

    var cartAdress = $('#map'),
        markerIcon = $('#map').data('marker');

    setTimeout(function () {

        cartAdress.css({
            opacity: '1'
        });
    }, 3600)

    var map,
        popupContent = '<p class="content">198320, С-Пб, г. Красное село,<br>ул. Киевская, д. 2, корп. ЛИТ А, Пб.</p>';
    initMap();

    function initMap() {

        var uluru_center = { lat: cartAdress.data('lat-center'), lng: cartAdress.data('lng-center') };

        var setMap = {
            zoom: 14,
            center: uluru_center,
            zoomControl: false,
            scaleControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }
        map = new google.maps.Map(document.getElementById('map'), setMap);
        var marker = new google.maps.Marker({
            position: uluru_center,
            map: map,
            icon: markerIcon,
            disableDefaultUI: true,
            animation: google.maps.Animation.DROP
        });

        var infowindow = new google.maps.InfoWindow({
            content: popupContent
        });


        var cartAdressItem = $('#map');
        var uluru_item = { lat: cartAdress.data('lat-center'), lng: cartAdress.data('lng-center') };

        var latLng = new google.maps.LatLng(uluru_item);
        map.panTo(latLng);

        marker = new google.maps.Marker({
            position: uluru_item,
            map: map,
            icon: markerIcon,
            disableDefaultUI: true
        });

        infowindow.open(map, marker);
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        var styledMapType = new google.maps.StyledMapType(
            [{
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                    { visibility: "on" },
                    { hue: "#ff0000" }
                ]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    { visibility: "on" },
                    { hue: "#0800ff" },
                    { lightness: -10 }
                ]
            }], { name: 'Styled Map' });

        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

    }
  }