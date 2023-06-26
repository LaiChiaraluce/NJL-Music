import { input } from "./main.js";
import { select } from "./main.js";
import { searchContainer } from "./main.js";

try {
} catch (error) {
  console.error(error);
}

export async function search() {
  const toSearch = input.value;
  const selectedType = select.value;

  const url = `https://spotify23.p.rapidapi.com/search/?q=${toSearch}&type=${selectedType}&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d31ed2fd59mshb6f5be2388ff664p19035djsn02abe2e8ce65",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();

  if (toSearch === "") {
    return;
  } else {
    let limit;
    let itemsCount;
    switch (selectedType) {
      case "tracks":
        itemsCount = result.tracks.totalCount;
        break;
      case "artists":
        itemsCount = result.artists.totalCount;
        break;
      case "albums":
        itemsCount = result.albums.totalCount;
        break;
      case "playlists":
        itemsCount = result.playlists.totalCount;
        break;
      case "users":
        itemsCount = result.users.totalCount;
        break;
    }
    if (itemsCount < 5) {
      limit = itemsCount;
    } else {
      limit = 5;
    }
    if (limit === 0) {
      generateNotFound();
    } else {
      for (let i = 0; i < limit; i++) {
        if (selectedType === "tracks") {
          let href =
            result.tracks.items[i].data.albumOfTrack.sharingInfo.shareUrl;
          let src =
            result.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url;
          let name = result.tracks.items[i].data.name;

          generateDiv(href, src, name, "Song");
        }
        if (selectedType === "artists") {
          let href = result.artists.items[i].data.uri;
          let src =
            result.artists.items[i].data.visuals.avatarImage.sources[0].url;
          let name = result.artists.items[i].data.profile.name;
          generateDiv(href, src, name, "Artist", "rounded-full h-24");
        }
        if (selectedType === "albums") {
          let href = result.albums.items[i].data.uri;
          let src = result.albums.items[i].data.coverArt.sources[0].url;
          let name = result.albums.items[i].data.name;
          generateDiv(href, src, name, "Album");
        }
        if (selectedType === "playlists") {
          let href = result.playlists.items[i].data.uri;
          let src =
            result.playlists.items[i].data.images.items[0].sources[0].url;
          let name = result.playlists.items[i].data.name;
          generateDiv(href, src, name, "Playlist");
        }
        if (selectedType === "users") {
          let name = result.users.items[i].data.displayName;
          console.log(name);
          let href = result.users.items[i].data.uri;
          let src = result.users.items[i].data.image.largeImageUrl;
          let btn = `<button id=${result.users.items[i].data.id} class="search-user btn-search p-2 bg-sky-600 rounded-lg mr-2">Show Playlists</button>`;
          generateDiv(href, src, name, "User", "rounded-full h-24", btn);
        }
      }
    }
  }

  function generateDiv(href, src, name, type, imgClass = "", btn = "") {
    if (src === null) {
      src = "../assets/default_user.png";
    }
    searchContainer.innerHTML += `<div class="results-container">
                                      <div class="flex items-center">
                                        <a href="${href}" target="_blank" draggable='false'>
                                          <img
                                            src="${src}"
                                            alt="logo-${name}"
                                            class="result-img w-24 justify-center items-center ${imgClass}"
                                            draggable='false'
                                          />
                                        </a>
                                        <div class="ml-2">
                                          <h5 class="result-name">${name}</h5>
                                          <h6 class="result-type text-gray-400">${type}</h6>
                                        </div>
                                      </div>
                                      ${btn}
                                    </div>`;
  }

  function generateNotFound() {
    searchContainer.innerHTML = `<div class="flex items-center justify-center w-60 mt-4">
                                  <img src="../assets/not_found.png" alt="not-found" />
                                </div>`;
  }
}
