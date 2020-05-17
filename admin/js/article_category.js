// 显示模态框 
//给新增按钮 注册事件，要显示模态框 
$(function () {

  // console.log(123)
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: BigNew.category_list,
      success: function (res) {
        if (res.code == 200) {
          var htmlStr = template('categoryList', res)
          $('tbody').html(htmlStr)
        }
      }
    })
  }

  $('#xinzengfenlei').on('click', function () {
    $('.addModal').modal('show')

    $('.addModal h4').text('新增文章分类')
    // 清空内容 
    $('#myForm')[0].reset()
  })

  // 单击编辑按钮的时候 ，也要弹出来 
  $('tbody').on('click', ".btn-edit", function () {
    $('.addModal').modal('show')
    $('.addModal h4').text('更新文章分类')
    //发送ajax请求
    $.ajax({
      type: 'get',
      url: BigNew.category_search,
      data: {
        id: $(this).data('id')
      },
      success: function (res) {
        if (res.code == 200) {
          // 渲染页面
          $('#myForm input[name=id]').val(res.data[0].id)
          $('#myForm input[name=name]').val(res.data[0].name)
          $('#myForm input[name=slug]').val(res.data[0].slug)
        }
      }
    })
  })

  // 给模态框的确定按钮 注册事件
  $(".addModal .btn-sure").on('click', function () {
    // 向服务 器端发送请求
    var id = $('#myForm input[name=id]').val()
    $.ajax({
      type: 'post',
      url: id ? BigNew.category_edit : BigNew.category_add,
      data: $('#myForm').serialize(),
      success: function (res) {
        if (res.code == 201||res.code==200) {
          // 隐藏模态框 
          $('.modal').modal('hide')
          // 刷新页面
          render()
        }
      }
    })
  })

  // 删除分类 弹出模态框 
  $('tbody').on('click','.btn-del',function(){
    $('.delModal').modal('show')
    window.id = $(this).data('id')
  })

  // 给删除的模态框的按钮注册事件
  $('.delModal .btnSure').on('click',function(){
    $.ajax({
      type:'post',
      url:BigNew.category_delete,
      data:{
        id:id
      },
      success:function(res){
        if(res.code==204){
          // 隐藏模态框 
          $('.delModal').modal('hide')
          render() // 刷新页面
        }
      }
    })
  })
})