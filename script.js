const menuIconElem = document.querySelector(".menu-icon i");
const menuListElem = document.querySelector(".menu");
const menuItemsElem = document.querySelectorAll(".menu li");
const channelHeadingElem = document.getElementById('js-title');
const programTableElem = document.querySelector('#js-schedule');
const loadingImageElem = document.querySelector(".hidden");

function clear() {
    programTableElem.innerHTML = "";
}

let isMenuOpen = false;

function toggleMenu() {
    if (!isMenuOpen) {
        menuListElem.classList.add("menu--show");
        isMenuOpen = true;
        menuIconElem.classList.remove("fa-bars");
        menuIconElem.classList.add("fa-times");

        transitionOpenMenu();

        menuItemsElem.forEach(function (listItem) {
            listItem.style.display = "block";
        });

    } else {
        isMenuOpen = false;
        menuIconElem.classList.remove("fa-times");
        menuIconElem.classList.add("fa-bars");

        transitionCloseMenu();

        menuItemsElem.forEach(function (listItem) {
            listItem.style.display = "none";
        });
        channelHeadingElem.innerHTML = "";
        clear();
    }
}

function transitionOpenMenu() {
    menuListElem.style.transition = "left 0.5s ease-in-out";
    menuListElem.style.left = "0";
}

function transitionCloseMenu() {
    menuListElem.style.transition = "left 0.5s ease-in-out";
    menuListElem.style.left = "-100%";
}

function setChannel(channelName) {
    switch (channelName) {
        case "SVT 1": {
            channelHeadingElem.innerHTML = "SVT 1";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "SVT 2": {
            channelHeadingElem.innerHTML = "SVT 2";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "SVT Barn": {
            channelHeadingElem.innerHTML = "SVT Barn";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "Kunskapskanalen": {
            channelHeadingElem.innerHTML = "Kunskapskanalen";
            getChannelSchedule(channelName);
            clear();
            break;
        }
        case "SVT 24": {
            channelHeadingElem.innerHTML = "SVT 24";
            getChannelSchedule(channelName);
            clear();
            break;
        }
    }
}

async function getChannelSchedule(channelName) {
    loadingImageElem.classList.remove('hidden');

    await fetch(`data/${channelName}.json`)
        .then((response) => response.json())
        .then((data) => renderData(data));

    loadingImageElem.classList.add('hidden');
}

function renderData(scheduleData) {
    const myTimeNow = new Date();

    scheduleData.sort((itemA, itemB) => {
        const timeA = new Date(itemA.start);
        const timeB = new Date(itemB.start);

        return timeA - timeB;
    });

    const filteredData = scheduleData.filter(item => {
        const programTime = new Date(item.start);
        programTime.setFullYear(myTimeNow.getFullYear());
        programTime.setMonth(myTimeNow.getMonth());
        programTime.setDate(myTimeNow.getDate());

        return programTime >= myTimeNow;
    });

    let myData = filteredData.map((item) => {
        const programTime = new Date(item.start);
        const hours = programTime.getHours().toString().padStart(2, '0');
        const minutes = programTime.getMinutes().toString().padStart(2, '0');
        const newTime = `${hours}:${minutes}`;
        item.newTime = newTime;

        return `<li class='list-group-item'><strong>${item.newTime}</strong><div>${item.name}</div></li>`;
    })
        .join("");

    programTableElem.innerHTML = "<ul class ='list-group list-group-flush'><li class='list-group-item show-previous'>Visa tidigare program</li>" + myData + "</ul>";

    const prevProgramsElem = document.querySelector(".show-previous");
    prevProgramsElem.addEventListener("click", renderAllData);
}

function renderAllData() {
    alert("du kommer i alla fall åt klicket");
    // Här hade jag tänkt skriva en metod för att hämta
    // ursprunglig data som ska sorteras
}