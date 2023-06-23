import { boxHome } from "./main";

const url =
  "https://spotify23.p.rapidapi.com/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=12&limit=20";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d43be08cccmsh4c36870c9e7bfb6p158fccjsn53f6a83fec0b",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export async function home() {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
  for (let i = 0; i < 12; i++) {
    boxHome.innerHTML += `<div class="card">
                            <div class="flex justify-center">
                              <a href="${result.content.items[13].content.items[i].external_urls.spotify}" class="anchor-home" target="_blank" draggable='false'>
                                <img class="song-img-home w-full rounded-md" src='${result.content.items[13].content.items[i].images[0].url}' draggable='false'/>
                              </a>
                            </div>
                          </div>`;
  }
}