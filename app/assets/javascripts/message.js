$(function(){
  function buildHTML(message){
      if (message.content && message.image) {
        //data-idが反映されるようにしている
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="message__box">` +
            `<div class="message__box__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="message__box__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="message__box">` +
            `<div class="message__box__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="message__box__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        //同様に、data-idが反映されるようにしている
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="message__box">` +
            `<div class="message__box__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="message__box__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
}
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('form')[0].reset();
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $('.submit__btn').prop( 'disabled', false )
  })
});

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
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
        messages.forEach(function (message) {
          insertHTML += buildHTML(message)
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        });
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
