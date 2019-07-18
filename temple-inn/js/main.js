function showMenu() {
    let isShowing = document.getElementById("nav").getAttribute("data-showing") == 'true';
    let vWidth = (isShowing==false) ? '210px' : '0px';
    document.getElementById("nav").setAttribute("data-showing", (isShowing==false) ? true : false);
    document.getElementById("nav").style.width = vWidth;
}

// window.onscroll = function() {myFunction()};

// var header = document.getElementById("mainHeader");
// var sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }