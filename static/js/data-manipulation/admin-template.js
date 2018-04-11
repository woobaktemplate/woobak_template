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

HTMLcode = function() {

  this.tmpCheckModal = `
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

  this.tmpTranslateModal = `
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

  this.tmpSaveHTML = `
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

  this.tmpSection = `
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

  this.tmpRow = `
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

  this.tmpPaginator = `
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
    <h4>(1/{1})</h4>
  </div>
  `

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

})(jQuery);
