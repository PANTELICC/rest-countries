//theme switcher
const themebtt = document.querySelector(".theme");
var ind = true;
themebtt.addEventListener("click",function(){
    if(ind === true){
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        ind = false;
    }
    else{
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        ind = true;
    }
});
//return all countruies on load
const flags = document.getElementById('main');
document.addEventListener('DOMContentLoaded', e => {
    fetchData('https://restcountries.com/v3.1/all');
})

//filter by region
const region = document.querySelector("#region");
region.addEventListener("click",function(){
    if(region.value == "Africa") {
        fetchData('https://restcountries.com/v3.1/region/africa');
    }
    else if(region.value == "Americas") {
        fetchData('https://restcountries.com/v3.1/region/americas');
    }
    else if(region.value == "Asia") {
        fetchData('https://restcountries.com/v3.1/region/asia');
    }
    else if(region.value == "Europe") {
        fetchData('https://restcountries.com/v3.1/region/europe');
    }
    else if(region.value == "Oceania") {
        fetchData('https://restcountries.com/v3.1/region/oceania');
    }
    else if(region.value == "All") {
        fetchData('https://restcountries.com/v3.1/all');
    }
    
});

//loading from api
async function fetchData(api) {
    try {
        const res = await fetch(api);
        const data = await res.json();
        drawFlags(data);
    } catch (error) {
        console.log(error);
    }
}

async function fetchDetails(name) {
    try {
        const res = await fetch('https://restcountries.com/v3.1/name/'+name);
        const data = await res.json();

        function borders() {
            const border = document.querySelector(".border");
            
            Object.values(data[0].borders).forEach(element => {
                border.innerHTML += `
                    <p>${element}</p>
                `
            });
        }

        $(".details").html(
            `<div class="detail">
            <div class="sel">
                <div class="back">
                    <i class="fa-solid fa-arrow-left-long"></i>
                    Back
                </div>
                <img src="${data[0].flags.svg}" alt="">
            </div>
            <div class="text">
                <h1>${data[0].name.common}</h1>
                <div class="row">
                    <ul>
                        <li><span>Native Name : </span>${data[0].name.common}</li>
                        <li><span>Population: </span>${data[0].population}</li>
                        <li><span>Region: </span>${data[0].region}</li>
                        <li><span>Sub Region : </span>${data[0].subregion}</li>
                        <li><span>Capital: </span>${data[0].capital}</li>
                    </ul>
                    <ul>
                        <li><span>Top Level Domain : </span>${data[0].tld[0]}</li>
                        <li><span>Currencies : </span>${Object.values(data[0].currencies)[0].name}</li>
                        <li><span>Languages : </span> ${Object.values(data[0].languages) }</li>
                    </ul>
                </div>
                <div class="row2">
                    <h3>Border Countries: </h3>
                    <div class="border">
                    </div>
                </div>
            </div>
        </div>`);

        $(".back").click(function () {
            $(".container").css("display", "block");
            $(".details").css("display", "none");
        });

    } catch (error) {
        console.log(error);
    }

    borders();
}

function drawFlags(data) {
    let ele = '';
    for (let [index, item] of data.entries()) {
        ele += `
        <div class="card ${item.name.common}" id = "card${item.name.common}">
            <img src="${item.flags.svg}" alt="Bandera ${item.name.common}" class="img-fluid">
            <div class="card-content">
                <h3 class="country-name">${item.name.common}</h3>
                <p>
                    <b>Population: </b>
                    ${item.population}
                </p>
                <p>
                    <b>Region: </b>
                    ${item.region}
                </p>
                <p>
                    <b>Capital: </b>
                    ${item.capital}
                </p>
            </div>
        </div>
        `;
    }
    flags.innerHTML = ele;

    $(".card").click(function () {
        var id = this.getAttribute('id');
        var cname = id.split("d")[1];

        $(".container").css("display", "none");
        $(".details").css("display", "block");
        fetchDetails(cname);


    });
}

//serarch by name of country
const searchInput = document.querySelector(".input");
searchInput.addEventListener("input", e => {
    const value = e.target.value;
    const countryname = document.querySelectorAll(".country-name");

    countryname.forEach(name =>{
        if(name.innerText.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.style.display= "flex";
        }else{
            name.parentElement.parentElement.style.display="none";
        }
    });
});

//loader
$(window).on("load",function(){
    $(".loading-wrapper").fadeOut("slow")
})
