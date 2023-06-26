/* eslint-disable */

import { home } from "./home.js";
import { search } from "./search.js";

const homeBtn = document.querySelector("#home");
const searchBtn = document.querySelector("#search");
const exitBtn = document.querySelector("#exit");

const defaultPage = document.querySelector("#default-page")
const homePage = document.querySelector("#home-page")
const searchPage = document.querySelector("#search-page")

export const boxHome = document.querySelector(".box");
export const songImgHome = document.querySelectorAll(".song-img-home")
export const anchorImgHome = document.querySelectorAll(".anchor-home")

export const input = document.querySelector("input")
export const select = document.querySelector("select")
export const searchContainer = document.querySelector(".search-container")
const searchBtnSearch = document.querySelector("button")


homeBtn.addEventListener("click", () => switchNav(homeBtn, searchBtn, exitBtn));
homeBtn.addEventListener("click", () => {
  defaultPage.style.display = "none"
  searchPage.style.display = "none"
  homePage.style.display = "block"

  boxHome.innerHTML = "";
  searchContainer.innerHTML = "";
  input.value = "";
  select.selectedIndex = 0;
  home();
})

searchBtn.addEventListener("click", () => switchNav(searchBtn, homeBtn, exitBtn));
searchBtn.addEventListener("click", () => {
  defaultPage.style.display = "none"
  homePage.style.display = "none"
  searchPage.style.display = "block"
})

exitBtn.addEventListener("click", () => switchNav(exitBtn, homeBtn, searchBtn));
exitBtn.addEventListener("click", () => {
  homePage.style.display = "none"
  searchPage.style.display = "none"
  defaultPage.style.display = "flex"

  searchContainer.innerHTML = "";
  input.value = "";
  select.selectedIndex = 0;
})

searchBtnSearch.addEventListener("click", () => {
  searchContainer.style.display = "flex";
  searchContainer.innerHTML = "";
  search().then(()=>{
    const btnUserSearch = document.querySelectorAll(".search-user")
    btnUserSearch.forEach(btn => {
      btn.addEventListener("click", ()=> {
        searchPlaylists(btn.id);
      })
    })
  });
})

// ---- FUNCTIONS ----
function switchNav(ActualBtn, OtherBtn1, OtherBtn2) {
  ActualBtn.classList.add("i-click");
  OtherBtn1.classList.remove("i-click");
  OtherBtn2.classList.remove("i-click");
}


async function searchPlaylists(id){
  const url = `https://spotify23.p.rapidapi.com/user_profile/?id=${id}&playlistLimit=10&artistLimit=10`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd31ed2fd59mshb6f5be2388ff664p19035djsn02abe2e8ce65',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let Container = document.createElement("div");

    let playlists = result.public_playlists;

    Container.classList.add("userPlaylists-container");
    let userPlaylists = document.createElement("div");
    userPlaylists.classList.add("userPlaylists");
    userPlaylists.innerHTML += `<i class="fa-solid fa-circle-xmark closebtn"></i>`;
    Container.appendChild(userPlaylists);


    for (let index = 0; index < playlists.length; index++) {
      let url = playlists[index].uri;
      let name = playlists[index].name;

      userPlaylists.innerHTML += `
      <div class="playlist">
        <a href="${url}">
          ${name}
        </a>
      </div>
      `
    }
    searchPage.appendChild(Container);
    const closebtn = document.querySelector(".closebtn");
    closebtn.addEventListener("click", () =>{
      searchPage.removeChild(Container);
    }) 
  } catch (error) {
    console.error(error);
  }

}