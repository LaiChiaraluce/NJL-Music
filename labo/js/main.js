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
  search();
})

// ---- FUNCTIONS ----
function switchNav(ActualBtn, OtherBtn1, OtherBtn2) {
  ActualBtn.classList.add("i-click");
  OtherBtn1.classList.remove("i-click");
  OtherBtn2.classList.remove("i-click");
}