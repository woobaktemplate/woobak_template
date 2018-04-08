/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

  String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{' + i + '\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
  };

  var tmp_check_modal = '\n<i class="close icon"></i>\n<div class="header">\n  \uC601\uC5B4 \uD15C\uD50C\uB9BF \uBB38\uC7A5 \uC218\uC815 - {0}\n</div>\n<div class="content">\n  <div class="ui form">\n    <div class="field" style="margin-top: 2%;">\n      <label>\uCE74\uD14C\uACE0\uB9AC</label>\n      <textarea id="check-category-input" rows="1">{1}</textarea>\n    </div>\n    <div class="field">\n      <label>\uC8FC\uC81C</label>\n      <textarea id="check-topic-input" rows="1">{2}</textarea>\n    </div>\n    <div class="field">\n      <label>\uC81C\uBAA9</label>\n      <textarea id="check-title-input" rows="1">{3}</textarea>\n    </div>\n    <div class="field">\n      <label>\uD15C\uD50C\uB9BF</label>\n      <textarea id="check-template-input">{4}</textarea>\n    </div>\n  </div>\n</div>\n<div class="actions">\n  <div id="check-delete" class="ui black deny button" api-id="{5}">\n    \uC0AD\uC81C\n  </div>\n  <div id="check-update" class="ui positive right labeled icon button" api-id="{6}">\n    \uC218\uC815\uC644\uB8CC\n    <i class="checkmark icon"></i>\n  </div>\n</div>\n';

  var tmp_translate_modal = '\n<i class="close icon"></i>\n<div class="header">\n  \uD15C\uD50C\uB9BF \uBC88\uC5ED\n</div>\n<div class="content">\n  <div class="description">\n    <div class="ui header">We\'ve auto-chosen a profile image for you.</div>\n    <p>We\'ve grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>\n    <p>Is it okay to use this photo?</p>\n  </div>\n</div>\n<div class="actions">\n  <div class="ui black deny button">\n    \uC0AD\uC81C\n  </div>\n  <div class="ui positive right labeled icon button">\n    \uC218\uC815\uC644\uB8CC\n    <i class="checkmark icon"></i>\n  </div>\n</div>\n';

  var tmp_save_html = '\n<div class="ui form">\n  <div class="ui sub header">\uBD84\uB958</div>\n  <select id="tmp-type-select" name="skills" class="ui fluid search dropdown">\n    <option value="\uC774\uBA54\uC77C">\uC774\uBA54\uC77C</option>\n    <option value="\uD504\uB808\uC820\uD14C\uC774\uC158">\uD504\uB808\uC820\uD14C\uC774\uC158</option>\n  </select>\n  <div class="field" style="margin-top: 2%;">\n    <label>\uCE74\uD14C\uACE0\uB9AC</label>\n    <textarea id="category-input" rows="1"></textarea>\n  </div>\n  <div class="field">\n    <label>\uC8FC\uC81C</label>\n    <textarea id="topic-input" rows="1"></textarea>\n  </div>\n  <div class="field">\n    <label>\uC81C\uBAA9</label>\n    <textarea id="title-input" rows="1"></textarea>\n  </div>\n  <div class="field">\n    <label>\uD15C\uD50C\uB9BF</label>\n    <textarea id="template-input"></textarea>\n  </div>\n</div>\n<button id="tmp-save-api-btn" class="fluid teal ui button" style="margin-top: 1rem;">\uC800\uC7A5\uD558\uAE30</button>\n';

  var tmp_section = '\n<table class="ui padded table">\n  <thead>\n    <tr>\n      <th>\uBD84\uB958</th>\n      <th>\uCE74\uD14C\uACE0\uB9AC</th>\n      <th>\uC0DD\uC131\uC2DC\uAC04</th>\n      <th>\uD3B8\uC9D1/\uC2B9\uC778</th>\n    </tr>\n  </thead>\n  <tbody>\n    {0}\n  </tbody>\n</table>\n';

  var tmp_row = '\n<tr>\n  <td>{0}</td>\n  <td>{1}</td>\n  <td>{2}</td>\n  <td>\n    <div class="ui small basic icon buttons">\n      <button id="check-edit" class="ui button" api-id="{3}"><i class="edit icon"></i></button>\n      <button id="check-approve" class="ui button"><i class="save icon"></i></button>\n    </div>\n  </td>\n</tr>\n';

  var starting_tmp_pagination = '\n<div class="ui center aligned grid" style="margin-top: 1rem;">\n  <div id="check-paginator" class="ui pagination menu">\n    <a class="disabled item" value="first">\n      <i class="angle double left icon"></i>\n    </a>\n    <div class="active item" value="1">\n      1\n    </div>\n    {0}\n    <a class="item" value="end">\n      <i class="angle double right icon"></i>\n    </a>\n  </div>\n</div>\n<div class="ui center aligned grid" style="margin-top: 1.5rem;">\n  <h4>(1/{1})</h4>\n</div>\n';

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


  HTMLManipulator = function HTMLManipulator() {
    return {

      edit_tmp_msg: function edit_tmp_msg(msg_title, msg_content) {
        var tmp_edit_msg = '\n      <div class="header">\n        {0}\n      </div>\n      <p>{1}</p>\n      '.format(msg_title, msg_content);
        return tmp_edit_msg;
      },

      make_first_pagination: function make_first_pagination(total_page_nums) {
        if (total_page_nums <= 1) {
          return starting_tmp_pagination.format('', 1);
        } else if (total_page_nums >= 3) {
          var addon_paginator = '\n        <a class="item" value="2">\n          2\n        </a>\n        <a class="item" value="3">\n          3\n        </a>\n        ';
          return starting_tmp_pagination.format(addon_paginator, total_page_nums);
        } else {
          var addon_paginator = '\n        <a class="item" value="2">\n          2\n        </a>\n        ';
          return starting_tmp_pagination.format(addon_paginator, total_page_nums);
        }
      }

    };
  };

  var h = HTMLManipulator();

  WebpageTracker = function WebpageTracker() {
    return {

      /// Template Editing Main Section
      change_template_action_section: function change_template_action_section(tmp_action_to) {
        $('#tmp-save-btn').removeClass('active teal');
        $('#tmp-check-btn').removeClass('active teal');
        $('#tmp-translate-btn').removeClass('active teal');
        $('#tmp_saved_menu').removeClass('left pointing teal');
        $('#tmp_checked_menu').removeClass('left pointing teal');

        var section = $('#tmp-action-section');
        var msg = $('#tmp-edit-msg');
        if (tmp_action_to == 'TMP_SAVE') {

          section.html(tmp_save_html);
          $('#tmp-save-btn').addClass('active teal');
          var tmp_edit_msg = h.edit_tmp_msg('템플릿 입력하기', '템플릿의 카테고리 (이메일, 프레젠테이션 등)을 입력하신 후 그 템플릿의 주제와 내용만 저장하여 주세요.');
          msg.html(tmp_edit_msg);
        } else if (tmp_action_to == 'TMP_CHECK') {

          a.create_just_saved_table(1);
          $('#tmp-check-btn').addClass('active teal');
          $('#tmp_saved_menu').addClass('left pointing teal');
          var tmp_edit_msg = h.edit_tmp_msg('템플릿 문장 수정하기', '템플릿의 문장을 다시 읽어봐주시고 어색한 영문 표현법이나 잘못된 표현법은 한 번 수정해주세요.');
          msg.html(tmp_edit_msg);
        } else if (tmp_action_to == 'TMP_TRANSLATE') {

          a.create_just_checked_table(1);
          $('#tmp-translate-btn').addClass('active teal');
          $('#tmp_checked_menu').addClass('left pointing teal');
          var tmp_edit_msg = h.edit_tmp_msg('템플릿 번역하기', '템플릿을 한글로 번역하여 주세요 (구글이나 네이버를 사용하셔서 번역하시면 편합니다).');
          msg.html(tmp_edit_msg);
        }
      },

      update_template_nums: function update_template_nums(tmp_total_num) {
        if (tmp_total_num > 1) {
          var tmp_tag = 'Templates';
        } else {
          var tmp_tag = 'Template';
        }
        $('#tmp-total-num-stats').text(tmp_total_num);
        $('#tmp-tmps').text(tmp_tag);
      },

      update_template_in_progress_nums: function update_template_in_progress_nums(tmp_in_progress_num) {
        $('#tmp-in-progress-num-stats').text(tmp_in_progress_num);
      },

      update_template_done_nums: function update_template_done_nums(tmp_done_num) {
        $('#tmp-done-num-stats').text(tmp_done_num);
      },

      update_template_just_saved_nums: function update_template_just_saved_nums(tmp_saved) {
        $('#tmp_saved_menu').text(tmp_saved);
      },

      update_template_just_checked_nums: function update_template_just_checked_nums(tmp_checked) {
        $('#tmp_checked_menu').text(tmp_checked);
      }

    };
  };

  var wt = WebpageTracker();

  AjaxFunctions = function AjaxFunctions() {
    return {

      get_template_stats: function get_template_stats() {
        $.ajax({
          method: "GET",
          url: '/api/template-admin/1/',
          success: function success(data) {
            if (data.total_number > 0) {
              wt.update_template_nums(data.total_number);
              wt.update_template_in_progress_nums(data.in_progress_number);
              wt.update_template_done_nums(data.done_number);
            }
            if (data.template_saved != 0) {
              wt.update_template_just_saved_nums(data.template_saved);
              wt.update_template_just_checked_nums(data.template_checked);
            }
          },
          error: function error(data) {
            console.log(data.status);
          }
        });
      },

      save_template: function save_template(template_type, category, topic, title, template) {
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
          success: function success(data) {
            // pass
          },
          error: function error(data) {
            console.log(data.status);
          }
        });
      },

      create_just_saved_table: function create_just_saved_table(page_num) {
        $.ajax({
          method: "GET",
          url: '/api/template/?saved=1&page=' + page_num,
          success: function success(data) {
            var section = $('#tmp-action-section');

            var res = data.results;
            var addon_html = '';
            for (var i = 0; i < res.length; i++) {
              var row = tmp_row.format(res[i].template_type, res[i].category, res[i].created, res[i].id);
              addon_html = addon_html + row;
            }
            var table_html = tmp_section.format(addon_html);
            var total_page_nums = Math.ceil(Number($('#tmp_saved_menu').text()) / 6);
            var pagination = h.make_first_pagination(total_page_nums);
            section.html(table_html + pagination);
          },
          error: function error(data) {
            console.log(data.status);
          }
        });
      },

      create_just_checked_table: function create_just_checked_table(page_num) {
        $.ajax({
          method: "GET",
          url: '/api/template/?checked=1&page=' + page_num,
          success: function success(data) {
            var section = $('#tmp-action-section');

            var res = data.results;
            var addon_html = '';
            for (var i = 0; i < res.length; i++) {
              var row = tmp_row.format(res[i].template_type, res[i].category, res[i].created, res[i].id);
              addon_html = addon_html + row;
            }
            var table_html = tmp_section.format(addon_html);
            var total_page_nums = Math.ceil(Number($('#tmp_checked_menu').text()) / 6);
            var pagination = h.make_first_pagination(total_page_nums);
            section.html(table_html + pagination);
          },
          error: function error(data) {
            console.log(data.status);
          }
        });
      },

      create_tmp_check_modal: function create_tmp_check_modal(tmp_id) {
        $.ajax({
          method: "GET",
          url: '/api/template/' + tmp_id + '/',
          success: function success(data) {
            var modal_html = tmp_check_modal.format(data.template_type, data.category, data.topic, data.title, data.template, data.id, data.id);
            $('#tmp-modal').html(modal_html);
            $('#tmp-modal').modal('show');
          },
          error: function error(data) {
            console.log(data.status);
          }
        });
      },

      save_check_tmp: function save_check_tmp(tmp_id, category, topic, title, template) {
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
          success: function success(data) {
            console.log(data);
          },
          error: function error(data) {
            console.log('error');
            console.log(data);
          }
        });
      },

      delete_check_tmp: function delete_check_tmp(tmp_id, after_effect_func1, after_effect_func2) {
        $.ajax({
          type: "DELETE",
          url: '/api/template/' + tmp_id + '/',
          success: function success(data) {
            console.log('data delete success');
            after_effect_func1('TMP_CHECK');
            after_effect_func2();
          },
          error: function error(data) {
            console.log('error');
            console.log(data);
          }
        });
      }

    };
  };

  var a = AjaxFunctions();

  TemplateActionTracker = function TemplateActionTracker() {
    return {

      save_template: function save_template() {
        var template_type = $('#tmp-type-select').val();
        var category = $('#category-input').val();
        var topic = $('#topic-input').val();
        var title = $('#title-input').val();
        var template = $('#template-input').val();
        a.save_template(template_type, category, topic, title, template);
        $('#category-input').val('');
        $('#topic-input').val('');
        $('#title-input').val('');
        $('#template-input').val('');
      }

    };
  };

  var ta = TemplateActionTracker();

  // onClick events handling

  $(document).on('click', '#tmp-save-btn', function () {
    wt.change_template_action_section('TMP_SAVE');
  });

  $(document).on('click', '#tmp-check-btn', function () {
    wt.change_template_action_section('TMP_CHECK');
  });

  $(document).on('click', '#tmp-translate-btn', function () {
    wt.change_template_action_section('TMP_TRANSLATE');
  });

  $(document).on('click', '#tmp-save-api-btn', function () {
    ta.save_template();
    var counter = 0;
    var i = setInterval(function () {
      a.get_template_stats();
      counter++;
      if (counter === 5) {
        clearInterval(i);
      }
    }, 300);
  });

  $(document).on('click', '#check-paginator .item', function () {
    console.log($(this).attr('value'));
  });

  // check edit modal

  $(document).on('click', '#check-edit', function () {
    var tmp_id = $(this).attr('api-id');
    a.create_tmp_check_modal(tmp_id);
  });

  $(document).on('click', '#check-delete', function () {
    var tmp_id = $(this).attr('api-id');
    a.delete_check_tmp(tmp_id, wt.change_template_action_section, a.get_template_stats);
  });

  $(document).on('click', '#check-update', function () {
    var tmp_id = $(this).attr('api-id');
    var category = $('#check-category-input').val();
    var topic = $('#check-topic-input').val();
    var title = $('#check-title-input').val();
    var template = $('#check-template-input').val();
    a.save_check_tmp(tmp_id, category, topic, title, template);
  });
})(jQuery);

/***/ })
/******/ ]);