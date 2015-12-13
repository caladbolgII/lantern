// add the animation to the popover
  $('a[rel=popover]').popover().click(function(e) {
      e.preventDefault();
       var open = $(this).attr('data-easein');
      if(open == 'shake') {
                $(this).next().velocity('callout.' + open);
          } else if(open == 'pulse') {
            $(this).next().velocity('callout.' + open);
          } else if(open == 'tada') {
              $(this).next().velocity('callout.' + open);
          } else if(open == 'flash') {
                $(this).next().velocity('callout.' + open);
          }  else if(open == 'bounce') {
               $(this).next().velocity('callout.' + open);
          } else if(open == 'swing') {
               $(this).next().velocity('callout.' + open);
          }else {
           $(this).next().velocity('transition.' + open);
          }



  });


 // add the animation to the modal
function anmt() {
$("#myModal5").modal()
}
$(document).ready(anmt);

function anmt2() {
$("#myModal5").modal()
}

var socket = io.connect('http://192.168.100.2:8000');

socket.on('tweet_without_image_follow', function(data){
$(".body-img2").empty();
$(".body-text2").empty();
// $(".body-img").append(
//   $("<h1 class=\"tweet_text\">" + data.post.text + "</h1>")
// );
$(".body-text2").append(
  $("<h3 class=\"tweet_text2\">" + data.post.text + "</h3>")
);
$(".user2").text(data.post.user.name)
$(".user_img2").attr('src', data.post.user.profile_image_url)
anmt();
//console.log(data.post)

});

socket.on('tweet_with_image_follow', function(data){
$(".body-img2").empty();
$(".body-text2").empty();
$(".body-img2").append(
  $("<img class= \"tweet_img2\" src=\"" + data.post.entities.media[0].media_url + "\">")
);
$(".body-text2").append(
  $("<h3 class=\"tweet_text2\">" + data.post.text + "</h3>")
);
$(".user2").text(data.post.user.name)
$(".user_img2").attr('src', data.post.user.profile_image_url)
anmt();
});



// setInterval(function() {
//   $(".tweet_text").text("EE @ 100");
//   $(".tweet_img").attr("src", "http://www.cute-lovequotes.com/wp-content/uploads/2015/08/inspirational-quotes-about-life-and-lesson.jpg")
//   $("#myModal5").modal()
// }, 3000);
$( ".modal" ).each(function(index) {
 $(this).on('show.bs.modal', function (e) {
var open = $(this).attr('data-easein');
   if(open == 'shake') {
               $('.modal-dialog').velocity('callout.' + open);
          } else if(open == 'pulse') {
               $('.modal-dialog').velocity('callout.' + open);
          } else if(open == 'tada') {
               $('.modal-dialog').velocity('callout.' + open);
          } else if(open == 'flash') {
               $('.modal-dialog').velocity('callout.' + open);
          }  else if(open == 'bounce') {
               $('.modal-dialog').velocity('callout.' + open);
          } else if(open == 'swing') {
               $('.modal-dialog').velocity('callout.' + open);
          }else {
            $('.modal-dialog').velocity('transition.' + open);
          }

});
});
