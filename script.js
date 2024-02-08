// config map
let config = {
  minZoom: 1,
  maxZoom: 18,
};
const zoom = 11;
const lat = 36.40;
const lng = 29.30;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// ------------------------------------------------------------
// async function to get data from json
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}


let featureGroups = [];
let latlngs = [];

// Antik Kentler ve Plaj Iconları
const LeafIcon = L.Icon.extend({
  options: {
    className: "poi-icon",
    iconSize: [24, 24],
  }
});
const antinKent = new LeafIcon({ iconUrl: './assets/icons/ancient.png' });
const plaj = new LeafIcon({ iconUrl: './assets/icons/beach.png' });
const startIcon = L.Icon.extend({
  options: {
    iconSize: [36, 36],
  }
});
const start = new startIcon({ iconUrl: './assets/icons/start.png' });

const pydnai = L.marker([36.33391422017312, 29.231576038618954], { icon: antinKent }).bindPopup('Pydnai Antik Kenti').addTo(map);
const xanthos = L.marker([36.357056960702074, 29.318241969309476], { icon: antinKent }).bindPopup('Xanthos Antik Kenti').addTo(map);
const letoon = L.marker([36.332108591674796, 29.289743654675846], { icon: antinKent }).bindPopup('Xanthos Antik Kenti').addTo(map);
const kabak = L.marker([36.46122150548804, 29.125038539130568], { icon: plaj }).bindPopup('Kabak Koyu').addTo(map);





fetchData("./assets/routes/all.json")
  .then((data) => {
    L.polyline(data, {
      color: "black",
      weight: 5
    }).addTo(map);
    return data;
  })
  fetchData("./assets/routes/day9.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })
fetchData("./assets/routes/day8.json")
  .then((data) => {
    L.polyline(data, {
      color: "orange",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day7.json")
  .then((data) => {
    L.polyline(data, {
      color: "orange",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day6.json")
  .then((data) => {
    L.polyline(data, {
      color: "orange",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day5.json")
  .then((data) => {
    L.polyline(data, {
      color: "orange",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day4.json")
  .then((data) => {
    L.polyline(data, {
      color: "orange",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day3.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day2.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/routes/day1.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })







// L.marker([50.0616, 19.9373], {
//   icon: funny,
// })
//   .bindPopup(customPopup)
//   .addTo(map);





fetchData("./assets/titles.json")
  .then((data) => {
    data.map((marker) => {
      featureGroups.push(
        L.marker(marker.coords, {
          icon: marker.type == "startPoint" ? start :  L.divIcon({
            className: "waypoint-icon",
            html: `${marker.id}`,
            iconSize: L.point(30, 30),
            popupAnchor: [3, -5],
          }),
          "marker-options-id": marker.id,
          "day": marker.day,
          "image": marker.img.src,
          "description": marker.description,
          "place": marker.place,
          "title":marker.title
        }

        )
      );
    });
    return data;
  })
  .then((data) => {
    featureGroups.map((marker) => {
      marker.addTo(map).bindPopup(`<div class="customPopup"><h4>${marker.options.place + " / " + marker.options.title}</h4><figure><img src="${marker.options.image}"><h5>${marker.options.day}</h5></figure><div>${marker.options.description}</div></div>`)
    });
  });


