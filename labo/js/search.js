import { input } from "./main";
import { select } from "./main";
import { searchContainer } from "./main";

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
      "X-RapidAPI-Key": "77c026d879mshb740ae069f014a5p1db1dcjsn462174ccb321",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();



  function generateDiv(href, src, name, type, imgClass=""){
    if(src === null){
      src = "../assets/default_user.png";
    }
    searchContainer.innerHTML += `<div class="results-container">
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
                                    </div>`;
  }

}