$(function () {
  // 一打开这个页面的时候，就要发送请求
  $.ajax({
    type: 'get',
    url: BigNew.user_detail,
    success: function (res) {
      // console.log(res)
      // console.log(typeof res)

      // 渲染页面
      if (res.code == 200) {
        $('#form .username').val(res.data.username)
        $('#form .nickname').val(res.data.nickname)
        $('#form .email').val(res.data.email)
        $('#form .password').val(res.data.password)
        $('#form .user_pic').attr('src', res.data.userPic)
      }
    }
  })

  // 图片预览功能 
  $('#exampleInputFile').on('change', function () {
    var file = this.files[0]
    var url = URL.createObjectURL(file)
    console.log(url)
    $('#form .user_pic').attr('src', url)
  })

  // 提交数据
  $('#form').on('submit', function (e) {

    e.preventDefault()
    var data = new FormData(this)
    console.log(data)
    $.ajax({
      type: 'post',
      url: BigNew.user_edit,
      // data:$(this).serialize(),
      data: data,
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res)
        console.log(typeof res)
        // parent.window.location.reload()// 这个会刷新页面
        if (res.code == 200) {
          $.ajax({
            type: 'get',
            // url: 'http://localhost:8080/api/v1/admin/user/info',
            url: BigNew.user_info,
            // headers: {
            //   'Authorization': localStorage.getItem('token')
            // },
            success: function (res) {
              console.log(res)
              parent.$('.user_info span i').text(res.data.nickname)
              parent.$('.user_info img').attr('src', res.data.userPic)
              // 右上角的那个图片也要改一下
              parent.$('.header_bar img').attr('src', res.data.userPic)
            }
          })
        }

      }
    })
  })
})