(function($) {

// String formatting function
String.prototype.format = function() {
  var formatted = this
  for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi')
      formatted = formatted.replace(regexp, arguments[i])
  }
  return formatted;
}

// HTML codes
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

// var starting_tmp_pagination = `
// <div class="ui center aligned grid" style="margin-top: 1rem;">
//   <div id="check-paginator" class="ui pagination menu">
//     <a id="go-first-paginator" class="disabled item" value="first">
//       <i class="angle double left icon"></i>
//     </a>
//     <div id="first-btn-paginator" class="active item" value="1">
//       1
//     </div>
//     {0}
//     <a id="go-end-paginator" class="item" value="end">
//       <i class="angle double right icon"></i>
//     </a>
//   </div>
// </div>
// <div id="page-tracker" class="ui center aligned grid" style="margin-top: 1.5rem;">
//   <h4>(1/{1})</h4>
// </div>
// `

var tmp_paginator = `
<div class="ui center aligned grid" style="margin-top: 1rem;">
  <div id="check-paginator" class="ui pagination menu">
    <a id="go-first-paginator" class="item" value="first">
      <i class="angle double left icon"></i>
    </a>
    {0}
    <a id="go-end-paginator" class="item" value="end">
      <i class="angle double right icon"></i>
    </a>
  </div>
</div>
<div id="page-tracker" class="ui center aligned grid" style="margin-top: 1.5rem;">
  <h4>({1}/{2})</h4>
</div>
`

function edit_tmp_msg(msg_title, msg_content) {
  var tmp_edit_msg = `
  <div class="header">
    {0}
  </div>
  <p>{1}</p>
  `.format(msg_title, msg_content)
  return tmp_edit_msg
}

function make_paginator(current_page, total_page_nums) {
  var current_page = Number(current_page)
  var total_page_nums = Number(total_page_nums)
  var leftover_page_nums = total_page_nums - current_page
  if (leftover_page_nums < 0) {
    leftover_page_nums = 0
  }
  if ((current_page == 1) && (leftover_page_nums == 0)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="active item" value="1">
      1
    </a>
    `
  } else if ((current_page == 1) && (leftover_page_nums >= 2)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="active item" value="1">
      1
    </a>
    <a id="second-btn-paginator" class="item" value="2">
      2
    </a>
    <a id="third-btn-paginator" class="item" value="3">
      3
    </a>
    `
  } else if ((current_page == 1) && (leftover_page_nums < 2)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="active item" value="1">
      1
    </a>
    <a id="second-btn-paginator" class="item" value="2">
      2
    </a>
    `
  } else if ((current_page == 2) && (leftover_page_nums == 0)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="item" value="1">
      1
    </a>
    <a id="second-btn-paginator" class="active item" value="2">
      2
    </a>
    `
  } else if ((current_page == 2) && (leftover_page_nums >= 1)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="item" value="1">
      1
    </a>
    <a id="second-btn-paginator" class="active item" value="2">
      2
    </a>
    <a id="third-btn-paginator" class="item" value="3">
      3
    </a>
    `
  } else if ((current_page >= 3) && (leftover_page_nums >= 1)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="item" value="{0}">
      {1}
    </a>
    <a id="second-btn-paginator" class="active item" value="{2}">
      {3}
    </a>
    <a id="third-btn-paginator" class="item" value="{4}">
      {5}
    </a>
    `.format(current_page-1, current_page-1, current_page, current_page, current_page+1, current_page+1)
  } else if ((current_page >= 3) && (leftover_page_nums == 0)) {
    var addon_paginator = `
    <a id="first-btn-paginator" class="item" value="{0}">
      {1}
    </a>
    <a id="second-btn-paginator" class="item" value="{2}">
      {3}
    </a>
    <a id="third-btn-paginator" class="active item" value="{4}">
      {5}
    </a>
    `.format(current_page-2, current_page-2, current_page-1, current_page-1, current_page, current_page)
  }
  return tmp_paginator.format(addon_paginator, current_page, total_page_nums)
}

function create_just_saved_table(page_num) {
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
      var pagination = make_paginator(page_num, total_page_nums)
      section.html(table_html + pagination)
    },
    error: function(data){
      console.log(data.status)
    }
  })
}

function create_just_checked_table(page_num) {
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
      var pagination = make_paginator(page_num, total_page_nums)
      section.html(table_html + pagination)
    },
    error: function(data){
      console.log(data.status)
    }
  })
}

var tab_type = 'save_tab'

function change_template_action_section(tmp_action_to) {
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
    var tmp_edit_msg = edit_tmp_msg('템플릿 입력하기',
                                    '템플릿의 카테고리 (이메일, 프레젠테이션 등)을 입력하신 후 그 템플릿의 주제와 내용만 저장하여 주세요.')
    msg.html(tmp_edit_msg)

  } else if (tmp_action_to == 'TMP_CHECK') {

    create_just_saved_table(1)
    $('#tmp-check-btn').addClass('active teal')
    $('#tmp_saved_menu').addClass('left pointing teal')
    var tmp_edit_msg = edit_tmp_msg('템플릿 문장 수정하기',
                                    '템플릿의 문장을 다시 읽어봐주시고 어색한 영문 표현법이나 잘못된 표현법은 한 번 수정해주세요.')
    msg.html(tmp_edit_msg)
    tab_type = 'check_tab'

  } else if (tmp_action_to == 'TMP_TRANSLATE') {

    create_just_checked_table(1)
    $('#tmp-translate-btn').addClass('active teal')
    $('#tmp_checked_menu').addClass('left pointing teal')
    var tmp_edit_msg = edit_tmp_msg('템플릿 번역하기',
                                    '템플릿을 한글로 번역하여 주세요 (구글이나 네이버를 사용하셔서 번역하시면 편합니다).')
    msg.html(tmp_edit_msg)
    tab_type = 'translate_tab'

  }
}

function update_template_nums(tmp_total_num) {
  if (tmp_total_num > 1) {
    var tmp_tag = 'Templates'
  } else {
    var tmp_tag = 'Template'
  }
  $('#tmp-total-num-stats').text(tmp_total_num)
  $('#tmp-tmps').text(tmp_tag)
}

function update_template_in_progress_nums(tmp_in_progress_num) {
  $('#tmp-in-progress-num-stats').text(tmp_in_progress_num)
}

function update_template_done_nums(tmp_done_num) {
  $('#tmp-done-num-stats').text(tmp_done_num)
}

function update_template_just_saved_nums(tmp_saved) {
  $('#tmp_saved_menu').text(tmp_saved)
}

function update_template_just_checked_nums(tmp_checked) {
  $('#tmp_checked_menu').text(tmp_checked)
}

function get_template_stats_ajax(new_tmp_id) {
  $.ajax({
    method: "GET",
    url: '/api/template-admin/' + new_tmp_id + '/',
    success: function(data){
      if (data.total_number > 0) {
        update_template_nums(data.total_number)
        update_template_in_progress_nums(data.in_progress_number)
        update_template_done_nums(data.done_number)
      }
      if (data.template_saved != 0) {
        update_template_just_saved_nums(data.template_saved)
        update_template_just_checked_nums(data.template_checked)
      }
    },
    error: function(data){
      console.log(data.status)
    }
  })
}

function get_template_stats() {
  $.ajax({
    method: "GET",
    url: '/api/template/',
    success: function(data){
      var id_val = data.results[0].id
      get_template_stats_ajax(id_val)
    },
    error: function(data){
      console.log(data.status)
    }
  })
}

function save_template_ajax(template_type, category, topic, title, template) {
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
      get_template_stats(data.id)
    },
    error: function(data){
      console.log(data.status)
    }
  })
}

function save_template() {
  var template_type = $('#tmp-type-select').val()
  var category = $('#category-input').val()
  var topic = $('#topic-input').val()
  var title = $('#title-input').val()
  var template = $('#template-input').val()
  save_template_ajax(template_type, category, topic, title, template)
  $('#category-input').val('')
  $('#topic-input').val('')
  $('#title-input').val('')
  $('#template-input').val('')
}

function create_tmp_check_modal(tmp_id) {
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
}

function delete_check_tmp(tmp_id, after_effect_func1, after_effect_func2) {
  $.ajax({
    type: "DELETE",
    url: '/api/template/' + tmp_id + '/',
    success: function(data){
      after_effect_func1('TMP_CHECK')
      after_effect_func2()
    },
    error: function(data){
      console.log('error')
      console.log(data)
    }
  })
}

function save_check_tmp(tmp_id, category, topic, title, template) {
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
      create_just_saved_table(1)
    },
    error: function(data){
      console.log('error')
      console.log(data)
    }
  })
}

function handle_change_page(paginator_btn_id) {
  var btn_page_num = $(paginator_btn_id).attr('value')

  if (tab_type == 'check_tab') {
    create_just_saved_table(btn_page_num)
  } else if (tab_type == 'translate_tab') {
    create_just_checked_table(btn_page_num)
  }
}


$(document).on('click', '#tmp-save-btn', function () {
    change_template_action_section('TMP_SAVE')
})

$(document).on('click', '#tmp-check-btn', function () {
    change_template_action_section('TMP_CHECK')
})

$(document).on('click', '#tmp-translate-btn', function () {
    change_template_action_section('TMP_TRANSLATE')
})

$(document).on('click', '#tmp-save-api-btn', function () {
    save_template()
})

$(document).on('click', '#check-edit', function () {
    var tmp_id = $(this).attr('api-id')
    create_tmp_check_modal(tmp_id)
})

$(document).on('click', '#check-delete', function () {
    var tmp_id = $(this).attr('api-id')
    delete_check_tmp(tmp_id, change_template_action_section, get_template_stats)
})

$(document).on('click', '#check-update', function () {
    var tmp_id = $(this).attr('api-id')
    var category = $('#check-category-input').val()
    var topic = $('#check-topic-input').val()
    var title = $('#check-title-input').val()
    var template = $('#check-template-input').val()
    save_check_tmp(tmp_id, category, topic, title, template)
})

$(document).on('click', '#go-first-paginator', function () {
    if (tab_type == 'check_tab') {
      create_just_saved_table(1)
    } else if (tab_type == 'translate_tab') {
      create_just_checked_table(1)
    }
})

$(document).on('click', '#go-end-paginator', function () {
    var page_tracker = $('#page-tracker').text()
    var page_list = page_tracker.split('/')
    var last_page = page_list[1].split(')')[0]

    if (tab_type == 'check_tab') {
      create_just_saved_table(last_page)
    } else if (tab_type == 'translate_tab') {
      create_just_checked_table(last_page)
    }
})

$(document).on('click', '#first-btn-paginator', function () {
    handle_change_page('#first-btn-paginator')
})

$(document).on('click', '#second-btn-paginator', function () {
    handle_change_page('#second-btn-paginator')
})

$(document).on('click', '#third-btn-paginator', function () {
    handle_change_page('#third-btn-paginator')
})

})(jQuery);
