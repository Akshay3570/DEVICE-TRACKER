const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);

const markers = {};
let hasCenteredMap = false;

function getTooltipOffset() {
    const markerCount = Object.keys(markers).length;
    return [0, -8 - markerCount * 24];
}

socket.on("receive-location", (data) => {
    const { id, label, latitude, longitude } = data;

    if (!hasCenteredMap) {
        map.setView([latitude, longitude], 16);
        hasCenteredMap = true;
    }

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude])
            .addTo(map)
            .bindTooltip(label, {
                permanent: true,
                direction: "top",
                offset: getTooltipOffset(),
            });
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
