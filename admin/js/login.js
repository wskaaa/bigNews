$(function(){
  // 1. 给按钮注册事件，发送 请求
  $('.login_form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      type:'post',
      url:'http://localhost:8080/api/v1/admin/user/login',
      data:$(this).serialize(),
      beforeSend:function(){
        var flag = false
        $('input[name]').each(function(index,ele){
          
          if(!$.trim($(ele).val())){
            flag = true
          }
        })
        if(flag){
          // alert('账号或密码不能为空,请重新填写...')
          $('.modal-body p').text('用户名或密码不能为空');
          $('.modal').modal('show');
          var timeId = setTimeout(() => {
            $('.modal').modal('hide');
            clearTimeout(timeId)
          }, 3000);
          return false;
        }
      },
      success:function(res){
        $('.modal').modal('show');
        $('.modal-body p').text(res.msg);
        // if(res.code==0){
        if(res.code==200){
          console.log(123)
          // 将数据保存到本地仓储
          $('.modal') .on('hidden.bs.modal',function(){
            window.location.href = './index.html'; // 跳转到主页面
             // 将token存储到本地存储当中
             localStorage.setItem('token',res.token)
          })
        }  

      }
    })
  })
});

