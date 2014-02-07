var result;
$(function() {
  result = $('#drop_result_ul');
  window.addEventListener('dragover', function (event) {
    event.preventDefault();
  }, false);
  $(".drop-area").get(0).addEventListener('drop', function(event) {
    event.preventDefault();
    var dt = event.dataTransfer;
    for (var i = 0; i < dt.files.length; i++) {
      upload(dt.files[i], new FileReader());
    }
  }, false);

  function upload(file, reader) {
    $('.dnd_error').remove();
    var name = file.name;
    if (!name.match(/(\.|\/)(gif|jpe?g|png)$/i)) {
      result.append('<li class="dnd_error">'+ name + 'のアップロードに失敗しました。<br>アップロード可能ファイル「gif/png/jpg」<span class="sortable-close"><i class="icon-close"></i>削除</span></li>');
      return false;
    }
    reader.onload = function() {
      // //Ajaxを実行する
      // $.ajax({
      //   async: true,
      //   type: "POST",
      //   url: "index.html",
      //   data: {
      //     "name" : name,
      //     "file" : reader.result
      //   },
      //   success:function() {
      //     //result.html(name + 'をアップロードしました。<br>');
          result.append('<li class="sortable-item"><img src="'+ reader.result +'" alt="'+ name +'"><span class="sortable-close"><i class="icon-close"></i>削除</span><input type="hidden" name="" value=""></li>');
      //   },
      //   error: function(XMLHttpRequest, textStatus, errorThrown) {
      //     result.append('<li class="dnd_error">'+ name + 'のアップロードに失敗しました。<span class="sortable-close"><i class="icon-close"></i>削除</span></li>');
      //     return false;
      //   }
      // });
    };
    reader.readAsDataURL(file, 'UTF-8');
  }
});