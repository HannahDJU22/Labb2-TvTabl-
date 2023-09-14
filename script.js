const menuIcon = document.querySelector(".menu-icon i");
const menuList = document.querySelector(".menu");
const channelHeading = document.getElementById('js-title');
const channelSchedule = document.getElementById('js-schedule');

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
    }
}

function setChannel(channelName) {

    switch (channelName) {
        case "SVT 1": {
            channelHeading.innerHTML = "SVT 1";
            getChannelSchedule(channelName);
            //channelSchedule.innerHTML="<ul>";
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
        case "SVT 24": {channelHeading.innerHTML = "SVT 24";
        getChannelSchedule(channelName);    
        break;
        }
    }

}
function getChannelSchedule(channelName) {
    fetch(`data/${channelName}.json`)
        //fetch('data/SVT 1.json')
        .then((response) => response.json())
        .then((data) => renderData(data));
}

function renderData(scheduleData) {
    channelSchedule.innerHTML = JSON.stringify(scheduleData);
}

