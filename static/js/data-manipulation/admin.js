(function($) {

String.prototype.format = function() {
  var formatted = this
  for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi')
      formatted = formatted.replace(regexp, arguments[i])
  }
  return formatted;
}

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
var tmp_check_section = `
<table class="ui padded table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>Approved</td>
      <td>He is a very nice guy and I enjoyed talking to him on the telephone. I hope we get to talk again.</td>
    </tr>
    <tr>
      <td>Jamie</td>
      <td>Approved</td>
      <td>Jamie was not interested in purchasing our product.</td>
    </tr>
  </tbody>
</table>
`

WebpageTracker = function() {
  return {

    change_template_action_section: function(tmp_action_to) {
      $('#tmp-save-btn').removeClass('active teal')
      $('#tmp-check-btn').removeClass('active teal')
      $('#tmp-translate-btn').removeClass('active teal')
      $('#tmp_saved_menu').removeClass('left pointing teal')
      $('#tmp_checked_menu').removeClass('left pointing teal')

      var section = $('#tmp-action-section')
      if (tmp_action_to == 'TMP_SAVE') {
        section.html(tmp_save_html)
        $('#tmp-save-btn').addClass('active teal')
      } else if (tmp_action_to == 'TMP_CHECK') {
        section.html(tmp_check_section)
        $('#tmp-check-btn').addClass('active teal')
        $('#tmp_saved_menu').addClass('left pointing teal')
      } else if (tmp_action_to == 'TMP_TRANSLATE') {
        section.html('hello')
        $('#tmp-translate-btn').addClass('active teal')
        $('#tmp_checked_menu').addClass('left pointing teal')
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

  }
}

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

var a = AjaxFunctions()
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

})(jQuery);
