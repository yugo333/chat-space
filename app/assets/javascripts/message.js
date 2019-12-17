$(function() {
  var buildHTML = function(message) {
    image=(message.image) ? `<img src=${message.image} class="lower-message__image" >` :"";
    var html = `
    <div class="message" data-id= ${message.id} >
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name} 
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
          ${image}
      </div>
    </div>
    `
    return html;
  };



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
  



    var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        last_message_id = $(".message:last").data("id");
        $.ajax({
          //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
          url: "api/messages",
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(messages) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i,message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $(".main__chat_message").append(insertHTML);
        })
        .fail(function() {
          alert('error');
        });
      }
    };
  setInterval(reloadMessages, 7000);
});




