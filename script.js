const menuIcon = document.querySelector(".menu-icon i");
const menuList = document.querySelector(".menu");
const channelHeading = document.getElementById('js-title');
const channelSchedule = document.getElementById('js-schedule');
const programTable = document.querySelector('#js-schedule');
const loadingImage = document.querySelector(".hidden");


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

//test-metod för att plocka ut timme och minut
// function formatDate(dateFromAPI){
// const newTime= new Date(dateFromAPI);
// const hour=newTime.getHours();
// const minute=newTime.getMinutes();

// return `${hour}-${minute}`;
// }


//jag vill ha en funktion som formaterar start-strängen till att datum-objekt så att jag sedan kan plocka ut timme och minut


function renderData(scheduleData) {
    //console.log(scheduleData);//detta är min array

    let myData = scheduleData.map((item) => {

        const dateObj=new Date(item.start);
        const hours=dateObj.getHours().toString().padStart(2, '0');
        const minutes=dateObj.getMinutes().toString().padStart(2, '0');
        const newTime=`${hours}:${minutes}`;
        item.newTime=newTime;

    console.log(newTime);

        return `<li class='list-group-item'><strong>${item.newTime}</strong><div>${item.name}</div></li>`;
    })
        .join("");

    programTable.innerHTML = "<ul class ='list-group list-group-flush'><li class='list-group-item show-previous'>Visa tidigare program</li>" + myData + "</ul>";
}