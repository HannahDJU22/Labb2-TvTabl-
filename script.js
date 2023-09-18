const menuIcon = document.querySelector(".menu-icon i");
const menuList = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu li");
const channelHeading = document.getElementById('js-title');
const channelSchedule = document.getElementById('js-schedule');
const programTable = document.querySelector('#js-schedule');
const loadingImage = document.querySelector(".hidden");
const prevPrograms = document.querySelector(".show-previous");

function clear() {
    channelSchedule.innerHTML = "";
}

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

async function getChannelSchedule(channelName) {

    loadingImage.classList.remove('hidden');

    await fetch(`data/${channelName}.json`)
        .then((response) => response.json())
        .then((data) => renderData(data));

    loadingImage.classList.add('hidden');
}

function renderData(scheduleData) {
    //console.log(scheduleData);//detta är min array
    const myTimeNow = new Date();
    
    //sorterar min array i tidsordning
    scheduleData.sort((itemA, itemB) => {
        const timeA = new Date(itemA.start);
        const timeB = new Date(itemB.start);

        return timeA - timeB;
    });

    //filtrerar fram tider som är senare än NU.
    //Gör om tablå-datumen till att matcha datumen NU
    const filteredData = scheduleData.filter(item => {
        const programTime = new Date(item.start);
        programTime.setFullYear(myTimeNow.getFullYear());
        programTime.setMonth(myTimeNow.getMonth());
        programTime.setDate(myTimeNow.getDate());
        
        return programTime >= myTimeNow;
    });

    console.log(filteredData);

    let myData = filteredData.map((item) => {
        //formaterar om tiden till timmar+minuter
        const programTime = new Date(item.start);
        const hours = programTime.getHours().toString().padStart(2, '0');
        const minutes = programTime.getMinutes().toString().padStart(2, '0');
        const newTime = `${hours}:${minutes}`;
        item.newTime = newTime;

        //mappar in datan i min tabell
        return `<li class='list-group-item'><strong>${item.newTime}</strong><div>${item.name}</div></li>`;
    })
        .join("");

    //skriver ut datan till html-sidan
    programTable.innerHTML = "<ul class ='list-group list-group-flush'><li class='list-group-item show-previous'>Visa tidigare program</li>" + myData + "</ul>";
}



//så ska min ursprungliga array visas, den som heter scheduleData
//skriv funktionen till fullo, hämta schedulaData och lägg en sort, även printen av ul och li
//därefter kan jag testa att bryta ut dessa som egna metoder och sen kalla på dem i renderData samt nedan funktion

function renderAllData() {


}

function showPreviousPrograms() {
    //prevPrograms är mitt element för Visa tidigare program
    //lägg till en addEventListener för knapptrycket på klassen .show-previous
    prevPrograms.addEventListener('click', renderAllData);
    console.log(prevPrograms);


}