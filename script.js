function toggleMenu() {
    const menuIcon = document.querySelector(".menu-icon i");
    const menuList = document.querySelector(".menu");

    if (menuList.style.display === "none" || menuList.style.display === "") {
        menuList.style.display = "block";

        menuList.classList.add("menu--show");

        const menuItems = document.querySelectorAll(".menu li");
        menuItems.forEach(function (item) {
            item.style.display = "block";
        });

        menuIcon.classList.remove("fas", "fa-bars");
        menuIcon.classList.add("fa-solid", "fa-x");

        console.log(menuIcon);

    } else {
        menuList.style.display = "none";
        menuIcon.classList.remove("fa-solid", "fa-x");
        menuIcon.classList.add("fas", "fa-bars");
        const menuItems = document.querySelectorAll(".menu li");
        menuItems.forEach(function (item) {
            item.style.display = "none";
        });
    }
}

function setChannel(channelName){
    const channelHeading = document.getElementById('js-title');
console.log(channelName);
console.log(channelHeading);

switch(channelName){
case "SVT 1": channelHeading.innerHTML="SVT 1";
break;
case "SVT 2": channelHeading.innerHTML="SVT 2";
break;
case "SVT Barn": channelHeading.innerHTML="SVT Barn";
break;
case "Kunskapskanalen": channelHeading.innerHTML="Kunskapskanalen";
break;
case "SVT 24": channelHeading.innerHTML="SVT 24" ;
break;
}


}