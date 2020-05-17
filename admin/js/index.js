
$(function () {
  $.ajax({
    type: 'get',
    // url: 'http://localhost:8080/api/v1/admin/user/info',
    url: BigNew.user_info,
    // headers: {
    //   'Authorization': localStorage.getItem('token')
    // },
    success: function (res) {
      console.log(res)
      $('.user_info span i').text(res.data.nickname)
      $('.user_info img').attr('src', res.data.userPic)
      // 右上角的那个图片也要改一下
      $('.header_bar img').attr('src',res.data.userPic)
    }
  })
  // 登出的操作
  $('.logout').on('click', function () {
    // 退出，删除 token 跳转到登陆页面
    localStorage.removeItem('token')
    window.location.href = './login.html'
  })

  // 3. 给左侧按钮 注册事件
  // 3.1 给左侧所有的按钮注册单击事件
  $('.menu .level01').on('click', function () {
    // 3.2 让每一个被单击的按钮都 高亮显示 
    $(this).addClass('active').siblings().removeClass('active')

    // 3.2 当单击到文章管理的时候 要展示出来 
    if($(this).index()==1){
      $('.menu .level02').slideToggle()
      // 让右侧的小按钮有旋转
      $(this).find('b').toggleClass('rotate0')

      // 让第1个默认被选中
      $('.menu .level02>li:eq(0)').trigger('click')
    }
  })

  // 给每一个li标签 注册样式 
  $('.menu .level02>li').on('click',function(){
      $(this).addClass('active').siblings().removeClass('active')
  })
})
