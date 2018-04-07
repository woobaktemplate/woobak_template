(function($) {

String.prototype.format = function() {
  var formatted = this
  for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi')
      formatted = formatted.replace(regexp, arguments[i])
  }
  return formatted;
}

var tmp_check_modal = `
<i class="close icon"></i>
<div class="header">
  영어 템플릿 문장 수정 - {0}
</div>
<div class="content">
  <div class="ui form">
    <div class="field" style="margin-top: 2%;">
      <label>카테고리</label>
      <textarea id="check-category-input" rows="1">{1}</textarea>
    </div>
    <div class="field">
      <label>주제</label>
      <textarea id="check-topic-input" rows="1">{2}</textarea>
    </div>
    <div class="field">
      <label>제목</label>
      <textarea id="check-title-input" rows="1">{3}</textarea>
    </div>
    <div class="field">
      <label>템플릿</label>
      <textarea id="check-template-input">{4}</textarea>
    </div>
  </div>
</div>
<div class="actions">
  <div id="check-delete" class="ui black deny button" api-id="{5}">
    삭제
  </div>
  <div id="check-update" class="ui positive right labeled icon button" api-id="{6}">
    수정완료
    <i class="checkmark icon"></i>
  </div>
</div>
`

var tmp_translate_modal = `
<i class="close icon"></i>
<div class="header">
  템플릿 번역
</div>
<div class="content">
  <div class="description">
    <div class="ui header">We've auto-chosen a profile image for you.</div>
    <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
    <p>Is it okay to use this photo?</p>
  </div>
</div>
<div class="actions">
  <div class="ui black deny button">
    삭제
  </div>
  <div class="ui positive right labeled icon button">
    수정완료
    <i class="checkmark icon"></i>
  </div>
</div>
`

var tmp_save_html = `
<div class="ui form">
  <div class="ui sub header">분류</div>
  <select id="tmp-type-select" name="skills" class="ui fluid search dropdown">
    <option value="이메일">이메일</option>
    <option value="프레젠테이션">프레젠테이션</option>
  </select>
  <div class="field" style="margin-top: 2%;">
    <label>카테고리</label>
    <textarea id="category-input" rows="1"></textarea>
  </div>
  <div class="field">
    <label>주제</label>
    <textarea id="topic-input" rows="1"></textarea>
  </div>
  <div class="field">
    <label>제목</label>
    <textarea id="title-input" rows="1"></textarea>
  </div>
  <div class="field">
    <label>템플릿</label>
    <textarea id="template-input"></textarea>
  </div>
</div>
<button id="tmp-save-api-btn" class="fluid teal ui button" style="margin-top: 1rem;">저장하기</button>
`

var tmp_section = `
<table class="ui padded table">
  <thead>
    <tr>
      <th>분류</th>
      <th>카테고리</th>
      <th>생성시간</th>
      <th>편집/승인</th>
    </tr>
  </thead>
  <tbody>
    {0}
  </tbody>
</table>
`

var tmp_row = `
<tr>
  <td>{0}</td>
  <td>{1}</td>
  <td>{2}</td>
  <td>
    <div class="ui small basic icon buttons">
      <button id="check-edit" class="ui button" api-id="{3}"><i class="edit icon"></i></button>
      <button id="check-approve" class="ui button"><i class="save icon"></i></button>
    </div>
  </td>
</tr>
`

var starting_tmp_pagination = `
<div class="ui center aligned grid" style="margin-top: 1rem;">
  <div id="check-paginator" class="ui pagination menu">
    <a class="disabled item" value="first">
      <i class="angle double left icon"></i>
    </a>
    <div class="active item" value="1">
      1
    </div>
    {0}
    <a class="item" value="end">
      <i class="angle double right icon"></i>
    </a>
  </div>
</div>
<div class="ui center aligned grid" style="margin-top: 1.5rem;">
  <h4>(1/{1})</h4>
</div>
`

// var tmp_pagination = `
// <div class="ui center aligned grid" style="margin-top: 1rem;">
//   <div id="check-paginator" class="ui pagination menu">
//     <a class="disabled item" value="first">
//       <i class="angle double left icon"></i>
//     </a>
//     <div class="active item" value="1">
//       1
//     </div>
//     <a class="item" value="2">
//       2
//     </a>
//     <a class="item" value="3">
//       3
//     </a>
//     <a class="item" value="end">
//       <i class="angle double right icon"></i>
//     </a>
//   </div>
// </div>
// <div class="ui center aligned grid" style="margin-top: 1.5rem;">
//   <h4>(1/3)</h4>
// </div>
// `


HTMLManipulator = function() {
  return {

    edit_tmp_msg: function(msg_title, msg_content) {
      var tmp_edit_msg = `
      <div class="header">
        {0}
      </div>
      <p>{1}</p>
      `.format(msg_title, msg_content)
      return tmp_edit_msg
    },

    make_first_pagination: function(total_page_nums) {
      if (total_page_nums <= 1) {
        return starting_tmp_pagination.format('', 1)
      } else if (total_page_nums >= 3) {
        var addon_paginator = `
        <a class="item" value="2">
          2
        </a>
        <a class="item" value="3">
          3
        </a>
        `
        return starting_tmp_pagination.format(addon_paginator, total_page_nums)
      } else {
        var addon_paginator = `
        <a class="item" value="2">
          2
        </a>
        `
        return starting_tmp_pagination.format(addon_paginator, total_page_nums)
      }
    },

  }
}

var h = HTMLManipulator()


WebpageTracker = function() {
  return {

    /// Template Editing Main Section
    change_template_action_section: function(tmp_action_to) {
      $('#tmp-save-btn').removeClass('active teal')
      $('#tmp-check-btn').removeClass('active teal')
      $('#tmp-translate-btn').removeClass('active teal')
      $('#tmp_saved_menu').removeClass('left pointing teal')
      $('#tmp_checked_menu').removeClass('left pointing teal')

      var section = $('#tmp-action-section')
      var msg = $('#tmp-edit-msg')
      if (tmp_action_to == 'TMP_SAVE') {

        section.html(tmp_save_html)
        $('#tmp-save-btn').addClass('active teal')
        var tmp_edit_msg = h.edit_tmp_msg('템플릿 입력하기',
                                          '템플릿의 카테고리 (이메일, 프레젠테이션 등)을 입력하신 후 그 템플릿의 주제와 내용만 저장하여 주세요.')
        msg.html(tmp_edit_msg)

      } else if (tmp_action_to == 'TMP_CHECK') {

        a.create_just_saved_table(1)
        $('#tmp-check-btn').addClass('active teal')
        $('#tmp_saved_menu').addClass('left pointing teal')
        var tmp_edit_msg = h.edit_tmp_msg('템플릿 문장 수정하기',
                                          '템플릿의 문장을 다시 읽어봐주시고 어색한 영문 표현법이나 잘못된 표현법은 한 번 수정해주세요.')
        msg.html(tmp_edit_msg)


      } else if (tmp_action_to == 'TMP_TRANSLATE') {

        a.create_just_checked_table(1)
        $('#tmp-translate-btn').addClass('active teal')
        $('#tmp_checked_menu').addClass('left pointing teal')
        var tmp_edit_msg = h.edit_tmp_msg('템플릿 번역하기',
                                          '템플릿을 한글로 번역하여 주세요 (구글이나 네이버를 사용하셔서 번역하시면 편합니다).')
        msg.html(tmp_edit_msg)


      }
    },

    update_template_nums: function(tmp_total_num) {
      if (tmp_total_num > 1) {
        var tmp_tag = 'Templates'
      } else {
        var tmp_tag = 'Template'
      }
      $('#tmp-total-num-stats').text(tmp_total_num)
      $('#tmp-tmps').text(tmp_tag)
    },

    update_template_in_progress_nums: function(tmp_in_progress_num) {
      $('#tmp-in-progress-num-stats').text(tmp_in_progress_num)
    },

    update_template_done_nums: function(tmp_done_num) {
      $('#tmp-done-num-stats').text(tmp_done_num)
    },

    update_template_just_saved_nums: function(tmp_saved) {
      $('#tmp_saved_menu').text(tmp_saved)
    },

    update_template_just_checked_nums: function(tmp_checked) {
      $('#tmp_checked_menu').text(tmp_checked)
    }

  }
}

var wt = WebpageTracker()


AjaxFunctions = function() {
  return {

    get_template_stats: function() {
      $.ajax({
        method: "GET",
        url: '/api/template-admin/1/',
        success: function(data){
          if (data.total_number > 0) {
            wt.update_template_nums(data.total_number)
            wt.update_template_in_progress_nums(data.in_progress_number)
            wt.update_template_done_nums(data.done_number)
          }
          if (data.template_saved != 0) {
            wt.update_template_just_saved_nums(data.template_saved)
            wt.update_template_just_checked_nums(data.template_checked)
          }
        },
        error: function(data){
          console.log(data.status)
        }
      })
    },

    save_template: function(template_type, category, topic, title, template) {
      $.ajax({
        method: "POST",
        url: '/api/template/',
        data: {
            'template_type': template_type,
            'category': category,
            'topic': topic,
            'title': title,
            'template': template
        },
        success: function(data){
          // pass
        },
        error: function(data){
          console.log(data.status)
        }
      })
    },

    create_just_saved_table: function(page_num) {
      $.ajax({
        method: "GET",
        url: '/api/template/?saved=1&page=' + page_num,
        success: function(data){
          var section = $('#tmp-action-section')

          var res = data.results
          var addon_html = ''
          for (var i=0; i<res.length; i++) {
            var row = tmp_row.format(res[i].template_type, res[i].category, res[i].created, res[i].id)
            addon_html = addon_html + row
          }
          var table_html = tmp_section.format(addon_html)
          var total_page_nums = Math.ceil(Number($('#tmp_saved_menu').text())/6)
          var pagination = h.make_first_pagination(total_page_nums)
          section.html(table_html + pagination)
        },
        error: function(data){
          console.log(data.status)
        }
      })
    },

    create_just_checked_table: function(page_num) {
      $.ajax({
        method: "GET",
        url: '/api/template/?checked=1&page=' + page_num,
        success: function(data){
          var section = $('#tmp-action-section')

          var res = data.results
          var addon_html = ''
          for (var i=0; i<res.length; i++) {
            var row = tmp_row.format(res[i].template_type, res[i].category, res[i].created, res[i].id)
            addon_html = addon_html + row
          }
          var table_html = tmp_section.format(addon_html)
          var total_page_nums = Math.ceil(Number($('#tmp_checked_menu').text())/6)
          var pagination = h.make_first_pagination(total_page_nums)
          section.html(table_html + pagination)
        },
        error: function(data){
          console.log(data.status)
        }
      })
    },

    create_tmp_check_modal: function(tmp_id) {
      $.ajax({
        method: "GET",
        url: '/api/template/' + tmp_id + '/',
        success: function(data){
          var modal_html = tmp_check_modal.format(data.template_type, data.category, data.topic, data.title, data.template, data.id, data.id)
          $('#tmp-modal').html(modal_html)
          $('#tmp-modal').modal('show')
        },
        error: function(data){
          console.log(data.status)
        }
      })
    },

    save_check_tmp: function(tmp_id, category, topic, title, template) {
      $.ajax({
        type: "PUT",
        dataType: "json",
        url: '/api/template/' + tmp_id + '/',
        data: {
            'category': category,
            'topic': topic,
            'title': title,
            'template': template
        },
        success: function(data){
          console.log(data)
        },
        error: function(data){
          console.log('error')
          console.log(data)
        }
      })
    },

    delete_check_tmp: function(tmp_id, after_effect_func1, after_effect_func2) {
      $.ajax({
        type: "DELETE",
        url: '/api/template/' + tmp_id + '/',
        success: function(data){
          console.log('data delete success')
          after_effect_func1('TMP_CHECK')
          after_effect_func2()
        },
        error: function(data){
          console.log('error')
          console.log(data)
        }
      })
    }

  }
}

var a = AjaxFunctions()


TemplateActionTracker = function() {
  return {

    save_template: function() {
      var template_type = $('#tmp-type-select').val()
      var category = $('#category-input').val()
      var topic = $('#topic-input').val()
      var title = $('#title-input').val()
      var template = $('#template-input').val()
      a.save_template(template_type, category, topic, title, template)
      $('#category-input').val('')
      $('#topic-input').val('')
      $('#title-input').val('')
      $('#template-input').val('')
    }

  }
}

var ta = TemplateActionTracker()

// onClick events handling

$(document).on('click', '#tmp-save-btn', function () {
    wt.change_template_action_section('TMP_SAVE')
})

$(document).on('click', '#tmp-check-btn', function () {
    wt.change_template_action_section('TMP_CHECK')
})

$(document).on('click', '#tmp-translate-btn', function () {
    wt.change_template_action_section('TMP_TRANSLATE')
})

$(document).on('click', '#tmp-save-api-btn', function () {
    ta.save_template()
    var counter = 0;
    var i = setInterval(function() {
      a.get_template_stats()
      counter++;
      if (counter === 5) {
          clearInterval(i);
      }
    }, 300);
})

$(document).on('click', '#check-paginator .item', function () {
    console.log($(this).attr('value'))
})

// check edit modal

$(document).on('click', '#check-edit', function () {
    var tmp_id = $(this).attr('api-id')
    a.create_tmp_check_modal(tmp_id)
})

$(document).on('click', '#check-delete', function () {
    var tmp_id = $(this).attr('api-id')
    a.delete_check_tmp(tmp_id, wt.change_template_action_section, a.get_template_stats)
})

$(document).on('click', '#check-update', function () {
    var tmp_id = $(this).attr('api-id')
    var category = $('#check-category-input').val()
    var topic = $('#check-topic-input').val()
    var title = $('#check-title-input').val()
    var template = $('#check-template-input').val()
    a.save_check_tmp(tmp_id, category, topic, title, template)
})

})(jQuery);
