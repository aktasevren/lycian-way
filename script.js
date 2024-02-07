/* eslint-disable no-undef */
/**
 * sidebar replacing popup
 */

// config map
let config = {
  minZoom: 1,
  maxZoom: 18,
};
const zoom = 7;
const lat = 32.80;
const lng = 30.40;

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

/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Legend</h4>";
  div.innerHTML += '<span><b>B </b></span><span>Başlangıç / Bitiş</span><br>';
  div.innerHTML += '<hr class="new5"><span>Yürünen Yollar</span><br>';
  div.innerHTML += '<hr class="new4"><span>Yürünecek Yollar</span><br>';

  
  

  return div;
};

legend.addTo(map);

// --------------------------------------------------
// button to close sidebar
const buttonClose = document.querySelector(".close-button");

let featureGroups = [];
let groupBounds;
let latlngs = [];

const LeafIcon = L.Icon.extend({
  options: {
    iconSize:     [24, 24],
  }
});


const antinKent = new LeafIcon({iconUrl: './assets/ancient.png'});
const plaj = new LeafIcon({iconUrl: './assets/beach.png'});

const xanthos = L.marker([36.357056960702074, 29.318241969309476], {icon: antinKent}).bindPopup('Xanthos Antik Kenti').addTo(map);
const letoon = L.marker([36.332108591674796, 29.289743654675846], {icon: antinKent}).bindPopup('Xanthos Antik Kenti').addTo(map);

const kabak = L.marker([36.46122150548804, 29.125038539130568], {icon: plaj}).bindPopup('Kabak Koyu').addTo(map);





fetchData("./assets/all.json")
  .then((data) => {
    L.polyline(data, {
      color: "black",
      weight: 5
    }).addTo(map);
    return data;
  })

fetchData("./assets/day8.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/day7.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/day6.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/day5.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/day4.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/day3.json")
  .then((data) => {
    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);
    return data;
  })

fetchData("./assets/titles.json")
  .then((data) => {
    data.map((marker) => {
      featureGroups.push(
        L.marker(marker.coords, {
          icon: L.divIcon({
            className: "leaflet-marker-icon",
            html: `${marker.id}`,
            iconSize: L.point(30, 30),
            popupAnchor: [3, -5],
          }),
          "marker-options-id": marker.id,
        })
      );
    });
    return data;
  })

  .then((data) => {
    // create feature group
    // add markers to map
    featureGroups.map((marker) => {
      marker.addTo(map);
    });

    // create feature group with markers
    groupBounds = new L.featureGroup(featureGroups);

    // fitBounds of feature group to map
    map.fitBounds(groupBounds.getBounds(), {
      padding: [50, 50],
    });

    // add event listener to markers to open sidebar
    groupBounds.on("click", function (e) {
      if (e.layer instanceof L.Marker) {
        showSidebarWidthText(e.layer.options["marker-options-id"]);
      }
    });

    // add comment to sodebar depending on marker id
    function showSidebarWidthText(id) {
      data.filter((marker) => {
        if (marker.id === id) {
          document.body.classList.add("active-sidebar");
          addContentToSidebar(marker);
        }
      });
    }
  });
fetchData("./assets/day2.json")
  .then((data) => {

    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);

    return data;
  })


// function to add markers to map
fetchData("./assets/day1.json")
  .then((data) => {

    L.polyline(data, {
      color: "#0BDA51",
      weight: 6,
    }).addTo(map);

    return data;
  })
  .then((data) => {
    // create feature group
    // add markers to map
    featureGroups.map((marker) => {
      marker.addTo(map);
    });

    // create feature group with markers
    groupBounds = new L.featureGroup(featureGroups);

    // fitBounds of feature group to map
    map.fitBounds(groupBounds.getBounds(), {
      padding: [50, 50],
    });

    // add event listener to markers to open sidebar
    groupBounds.on("click", function (e) {
      if (e.layer instanceof L.Marker) {
        showSidebarWidthText(e.layer.options["marker-options-id"]);
      }
    });

    // add comment to sodebar depending on marker id
    function showSidebarWidthText(id) {
      data.filter((marker) => {
        if (marker.id === id) {
          document.body.classList.add("active-sidebar");
          addContentToSidebar(marker);
        }
      });
    }
  });

// --------------------------------------------------
// close when click esc
document.addEventListener("keydown", function (event) {
  // close sidebar when press esc
  if (event.key === "Escape") {
    closeSidebar();
  }
});

// close sidebar when click on close button
buttonClose.addEventListener("click", () => {
  // close sidebar when click on close button
  closeSidebar();
});

// close sidebar when click outside
// document.addEventListener("click", (e) => {
//   const target = e.target;
//   if (
//     !target.closest(".sidebar") &&
//     !target.classList.contains("leaflet-marker-icon")
//   ) {
//     closeSidebar();
//   }
// });

// --------------------------------------------------
// close sidebar

function closeSidebar() {
  // remove class active-sidebar
  document.body.classList.remove("active-sidebar");

  // bounds map to default
  boundsMap();
}

// --------------------------------------------------
// add content to sidebar

function addContentToSidebar(marker) {
  const { id, title, small, distance, img, coords, day, totaltime, walktime, description } = marker;
  const smallInfo = small !== undefined ? `<small>${small}</small>` : "";

  // create sidebar content
  const sidebarTemplate = `
      <article class="sidebar-content">
        <h3>${title}</h3>
        <div class="marker-id">${id}</div>
        <div class="info-content">
          <img class="img-zoom" src="${img.src}" alt="${img.alt}">
          ${smallInfo}
          <h3 style='margin:12px'>${day}</h3>
          <div class="info-description">${description}</div>
          <div class="info-description">Tamamlanan Yürüyüş : ${distance}</div>
          <div class="info-description">Toplam Zaman : ${totaltime}</div>
          <div class="info-description">Hareket Edilen Zaman : ${walktime}</div>

        </div>
      </article>
    `;

  const sidebar = document.querySelector(".sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");

  // always remove content before adding new one
  sidebarContent?.remove();

  // add content to sidebar
  sidebar.insertAdjacentHTML("beforeend", sidebarTemplate);

  // set bounds depending on marker coords
  boundsMap(coords);
}

// --------------------------------------------------
// bounds map when sidebar is open
function boundsMap(coords) {
  const sidebar = document.querySelector(".sidebar").offsetWidth;

  const marker = L.marker(coords);
  const group = L.featureGroup([marker]);

  // bounds depending on whether we have a marker or not
  const bounds = coords ? group.getBounds() : groupBounds.getBounds();

  // set bounds of map depending on sidebar
  // width and feature group bounds
  map.fitBounds(bounds, {
    paddingTopLeft: [coords ? sidebar : 0, 10],
  });


  
}