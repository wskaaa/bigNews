
$(function () {
  $.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/info',
    headers: {
      'Authorization': localStorage.getItem('token')
    },
    success: function (res) {
      console.log(res)
      $('.user_info span i').text(res.data.nickname)
      $('.user_info img').attr('src', res.data.userPic)
    }
  })
  // 登出的操作
  $('.logout').on('click', function () {
    // 退出，删除 token 跳转到登陆页面
    localStorage.removeItem('token')
    window.location.href = './login.html'
  })
})
