let baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdowns, select");
let btn = document.querySelector(".btn");
let fromcurr =  document.querySelector(".from select");
let tocurr =  document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {

    for (let code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if (select.name === "from" && code === "USD"){
            newoption.selected = "selected"
        }else if(select.name === "to" && code === "PKR"){
            newoption.selected = "selected"
        }
       
        select.append(newoption)

    }

   select.addEventListener("change", (evt)=> {
    updateflag(evt.target)
   })

}

const updateflag = (element)=>{
    let currcode = element.value;
    let countrycode =  countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src =  newsrc;
    
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault()
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if (amval < 1){
        amval = 1;
        amount.value = amval;
    }
   
    

    let url = `${baseurl}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json()
   let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finamount = amval * rate;
    

    msg.innerText = ` ${amval} ${fromcurr.value} = ${finamount} ${tocurr.value}` 
    
    
    
})
