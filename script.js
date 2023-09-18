const menuIcon = document.querySelector(".menu-icon i");
const menuList = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu li");
const channelHeading = document.getElementById('js-title');
const channelSchedule = document.getElementById('js-schedule');
const programTable = document.querySelector('#js-schedule');
const loadingImage = document.querySelector(".hidden");


function toggleMenu() {
    if (menuList.style.display === "none" || menuList.style.display === "") {
        menuList.style.display = "block";
        menuList.classList.add("menu--show");

        menuItems.forEach(function (listItem) {
            listItem.style.display = "block";
        });

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");

    } else {
        menuList.style.display = "none";
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        
        menuItems.forEach(function (listItem) {
            listItem.style.display = "none";
        });
        channelHeading.innerHTML = "";
        clear();
    }
}

function setChannel(channelName) {
    switch (channelName) {
        case "SVT 1": {
            channelHeading.innerHTML = "SVT 1";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "SVT 2": {
            channelHeading.innerHTML = "SVT 2";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "SVT Barn": {
            channelHeading.innerHTML = "SVT Barn";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "Kunskapskanalen": {
            channelHeading.innerHTML = "Kunskapskanalen";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "SVT 24": {
            channelHeading.innerHTML = "SVT 24";
            getChannelSchedule(channelName);
            clear();
            break;
        }
    }

}

function clear(){
    channelSchedule.innerHTML = "";
}

async function getChannelSchedule(channelName) {

    console.log(loadingImage);

    loadingImage.classList.remove('hidden');

    //Laddningsbilden visas bara vid första knapptrycket, när jag väljer ny kanal ser man att det dröjer men bilden visas inte

    await fetch(`data/${channelName}.json`)
        .then((response) => response.json())
        .then((data) => renderData(data));

    loadingImage.classList.add('hidden');
    console.log(loadingImage);
}

function renderData(scheduleData) {
    //console.log(scheduleData);//detta är min array
    const myTimeNow= new Date();
    
    //sorterar min array i tidsordning
    scheduleData.sort((itemA, itemB) => {
        const timeA = new Date(itemA.start);
        const timeB = new Date(itemB.start);
        
        return timeA - timeB;
    });

    //jag vill filtrera min array nu för att matcha mot dagens tid
    //måste jämföra objekt mot objekt...

    const filteredData = scheduleData.filter(item =>{
        const programTime = new Date(item.start);
        console.log(typeof programTime);
        console.log(typeof myTimeNow);
        
        return programTime<myTimeNow;
    });

    let myData = filteredData.map((item) => {
        //formaterar om tiden till timmar+minuter
        const programTime = new Date(item.start);
        const hours = programTime.getHours().toString().padStart(2, '0');
        const minutes = programTime.getMinutes().toString().padStart(2, '0');
        const newTime = `${hours}:${minutes}`;
        item.newTime = newTime;
        console.log(typeof newTime);//ligger nu som sträng
        
        
        //mappar in datan i min tabell
        return `<li class='list-group-item'><strong>${item.newTime}</strong><div>${item.name}</div></li>`;
    })
        .join("");
    
        //skriver ut datan till html-sidan
    programTable.innerHTML = "<ul class ='list-group list-group-flush'><li class='list-group-item show-previous'>Visa tidigare program</li>" + myData + "</ul>";
}