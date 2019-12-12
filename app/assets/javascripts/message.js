$(function(){
  function buildHTML(message) {
    if (message.image) {
      img = `<img class="lower-message__image" src="${message.image}">`
    }else{
      var img = ""
    }
    var html = `<div class="message" data-message-id="${message.user_id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${ message.content }
                    ${ img }
                    </p>
                  </div>
              </div>`
    return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url =$(this).attr("action");
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html =  buildHTML(message);
      $(".main__chat_message").append(html)
      $("#message_content").val('')
      $('.box').animate({'height' : '200px'});
      $('.main__chat').animate({scrollTop: $('.main__chat')[0].scrollHeight}); 
      $('form')[0].reset();  
    })
    .fail(function(){
      alert("エラー");
    })
    .always(function(){
      $(".submit").prop("disabled",false);
    })
  })
});