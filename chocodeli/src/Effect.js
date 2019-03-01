$(document).ready(function () {
console.log("thay vui");
      $('#clickmenu').on('click', function () {
      	console.log("witout you");
        $('#content').toggleClass('active');
        $('#sidebar').toggleClass('active');
      });

    });