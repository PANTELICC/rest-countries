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
const flags = document.getElementById('main');

document.addEventListener('DOMContentLoaded', e => {
    fetchData();
})

const fetchData = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        drawFlags(data);
        formCountry(data);
        filterSelect(data);
    } catch (error) {
        console.log(error);
    }
}

const drawFlags = (data) => {
    let ele = '';

    for (let [index, item] of data.entries()){
        console.log(item)
        ele += `
        <div class="card">
            <img src="${item.flags.svg}" alt="Bandera ${item.name.common}" class="img-fluid">
            <div class="card-content">
                <h3>${item.name.common}</h3>
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
        `
}

    flags.innerHTML = ele;
}
$(window).on("load",function(){
    $(".loading-wrapper").fadeOut("slow")
})