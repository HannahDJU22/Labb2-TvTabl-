const menuIcon = document.querySelector(".menu-icon i");
const menuList = document.querySelector(".menu");
const channelHeading = document.getElementById('js-title');
const channelSchedule = document.getElementById('js-schedule');
const programTable = document.querySelector('#js-schedule');

function toggleMenu() {
    if (menuList.style.display === "none" || menuList.style.display === "") {
        menuList.style.display = "block";

        menuList.classList.add("menu--show");

        const menuItems = document.querySelectorAll(".menu li");
        menuItems.forEach(function (item) {
            item.style.display = "block";
        });

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");

    } else {
        menuList.style.display = "none";
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        const menuItems = document.querySelectorAll(".menu li");
        menuItems.forEach(function (item) {
            item.style.display = "none";
        });
        channelHeading.innerHTML = "";
        channelSchedule.innerHTML = "";
    }
}

function setChannel(channelName) {
    // createTable();

    switch (channelName) {
        case "SVT 1": {
            channelHeading.innerHTML = "SVT 1";
            getChannelSchedule(channelName);
            break;
        }
        case "SVT 2": {
            channelHeading.innerHTML = "SVT 2";
            getChannelSchedule(channelName);
            break;
        }
        case "SVT Barn": {
            channelHeading.innerHTML = "SVT Barn";
            getChannelSchedule(channelName);
            break;
        }
        case "Kunskapskanalen": {
            channelHeading.innerHTML = "Kunskapskanalen";
            getChannelSchedule(channelName);
            break;
        }
        case "SVT 24": {
            channelHeading.innerHTML = "SVT 24";
            getChannelSchedule(channelName);
            break;
        }
    }

}
function getChannelSchedule(channelName) {
    fetch(`data/${channelName}.json`)
        .then((response) => response.json())
        .then((data) => renderData(data));
}

// function renderData(scheduleData) {
//     console.log("running renderData");
//     channelSchedule.innerHTML = scheduleData;
//     console.log(channelSchedule.innerHTML);
// }

// function createTable(){
//     console.log("running createTable");
//     console.log("programtable:" + programTable);
//     programTable.innerHTML="<ul class='list-group list-group-flush'><li class='list-group-item show-previous'>Item 1</li><li class='list-group-item'>Item 2</li><li class='list-group-item'>Item 3</li></ul>";   
//     console.log(programTable.innerHTML)
// }

function renderData(scheduleData) {
    console.log(scheduleData);//detta är min array

    let myData = scheduleData.map((item) => {
        return `<ul class='list-group list-group-flush'>
    <li class='list-group-item'>${item.name}</li><li class='list-group-item'>${item.start}</li></ul>`;
    })
    .join("");

         programTable.innerHTML = "<li class='list-group-item show-previous'>Visa tidigare program</li>" + myData;

}



