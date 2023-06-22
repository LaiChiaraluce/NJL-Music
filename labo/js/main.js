const homeBtn = document.querySelector("#home");
const searchBtn = document.querySelector("#search");
const exitBtn = document.querySelector("#exit");

const defaultPage = document.querySelector("#default-page")
const homePage = document.querySelector("#home-page")
const searchPage = document.querySelector("#search-page")

homeBtn.addEventListener("click", () => switchNav(homeBtn, searchBtn, exitBtn));
homeBtn.addEventListener("click", () => {
  defaultPage.style.display = "none"
  searchPage.style.display = "none"
  homePage.style.display = "block"
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
})

// ---- FUNCTIONS ----
function switchNav(ActualBtn, OtherBtn1, OtherBtn2) {
  ActualBtn.classList.add("i-click");
  OtherBtn1.classList.remove("i-click");
  OtherBtn2.classList.remove("i-click");
}