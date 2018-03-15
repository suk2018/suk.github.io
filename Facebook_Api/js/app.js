
$(document).ready(function() {
  $(".loader").hide(); 
  $(".profile").hide();
  var myToken = "EAACEdEose0cBAIBgscW2gXcKWx7YhSBmgu3RuCqnr0ZA9BKteVNDaBJnbkNdIxDagnDW4HWxYdZBgsrj7pCLh2K6ZCZAXsn9VYMBgdxyZBGWcZAs9UJ6c1kmcc1ZAyMelBIuId40bMCMw6ZCO7rvb9WLI5tpVVNAlurQulQvvK2YnYvarg6MwzuKKGuIX7So0muOgOhc4w0PNgZDZD";

 
  function getProfile(){
    $.ajax({
        url: "https://graph.facebook.com/me?fields=email%2Chometown%2Cbirthday%2Ceducation%2Cwork&access_token=" + myToken,
        method: "GET",

        success: function(response){
          console.log(response);

          $(".profile").show(500);

          if(response.id !== null && response.id !== undefined){
            $("#myId").text(response.id);
          }
          if(response.email !== null && response.email !== undefined){
            $("#myEmail").text(response.email);
          }
          if(response.hometown !== null && response.hometown !== undefined){
            $("#myHometown").text(response.hometown.name);
          }
          if(response.birthday !== null && response.birthday !== undefined){
            $("#myBirthday").text(response.birthday);
          }
          if(response.education !== null && response.education !== undefined){
            var schoolName = response.education;

            schoolName = $.map(schoolName, function(id, school){
                return id.school.name;
            });

            $("#schoolName").text(schoolName[0]);
            $("#collegeName").text(schoolName[1]);
          }

          var workDescription = response.work;
          workDescription = $.map(workDescription, function(index, description){
            return index.description;
          });

          $("#workDescription").text(workDescription);

          var workPosition = response.work;

          workPosition = $.map(workPosition, function(index, position){
            return index.position.name;
          });

          $("#workPosition").text(workPosition);
        },

        error: function ( request,errType,errMessage) {
					alert ( errMessage + "\n Error !!, Check Console for details") ;
					console.log (errType);
					console.log(request) ;
        },

        timeout: 3000,

        complete : function (){
          $(".loader").hide();
        },

        beforeSend : function(){
          $(".profile").hide();
          $(".loader").show();
        }
      }
    );
   
  }


  function getFeed(){
    $.ajax({
        url: "https://graph.facebook.com/me?fields=posts&access_token=" + myToken,
        method: "GET",
        success: function(response){

          $(".feedsInfo").show(500);

          var postsData = response.posts.data;
          console.log(response.posts.data);
 
         
          for(var i = 0; i < 5; i++){
            var postId = "id"+i;
            var storyId = "story"+i;
            var postTime = "time"+i;
            var messageId = "message"+i;

           
            var posts = '<div class="card text-white bg-dark mb-3"><div class="card-header"> <p class="font-weight-bold"> Post Id : <span id='+postId+'> </span></p> </div> <div class="card-body"> <h4 class="card-title">Posted On : <time class="text-primary font-weight-bold" datetime='+postTime+' id='+postTime+'></time> </h4> <p id='+storyId+'></p> <p class="card-text" id='+messageId+'> </p> </div> </div> </br></br>';

           
            $("#feeds-info-wrapper").append(posts);

            
            $("#"+postId).text(postsData[i].id);
            $("#"+storyId).text(postsData[i].story);
            $("#"+storyId).css({'font-weight' : 'bold'});

            $("#"+postTime).text(postsData[i].created_time);
            $("#"+messageId).text(postsData[i].message);
            $("#"+messageId).css({'font-weight' : 'bold','color' : 'black', 'font-size' : '1.0em'});
          }
          
        },

        error: function ( request,errType,errMessage) {
					alert ( errMessage + "\n Error !!, Check Console for details") ;
					console.log (errType);
					console.log(request) ;
        },

        timeout: 3000,

        complete : function (){
          $(".loader").hide();
          $("#footer").hide();

        },
        beforeSend : function(){
          $(".feedsInfo").hide();
          $(".loader").show();
        }
      }
    );
    
  }
  
  $("#getProfile").on('click', getProfile);
  $("#getFeed").on('click', getFeed);

});

