String.prototype.format = function() {
  var formatted = this
  for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi')
      formatted = formatted.replace(regexp, arguments[i])
  }
  return formatted;
}

var step_two_code = `
<section class="index-header">
  <h1>Business E-mail Templates</h1>
</section>
<section class="row step-one-section">
  <div class="col-12">
    <h3 class="mt-4 mb-4"><strong>STEP 2:</strong> 이메일을 이런 식으로 작성해보는건 어떤가요?</h3>
  </div>

  <div class="col-lg-8 mb-4">
    <div class="card">

      <div class="card-block">
        <h4 class="card-title text-center">기본 이메일 템플렛</h4>
        <div class="dropdown card-title-btn-container">
          <button class="btn btn-sm btn-subtle dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><em class="fa fa-clone"></em></button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" href="#"><em class="fa fa-search mr-1"></em> More info</a>
            <a class="dropdown-item" href="#"><em class="fa fa-thumb-tack mr-1"></em> Pin Window</a>
            <a class="dropdown-item" href="#"><em class="fa fa-remove mr-1"></em> Close Window</a></div>
        </div>
        <hr>

        <p class="card-text">To Phillip,</p>
        <p class="card-text">Hello, Phillip. This is Holly from marketing department.
        How have you been? I just wanted to thank you again for your help today.
        If it weren't for your help, I wouldn't have been able to finish today's annual report.</p>
      </div>
    </div>
  </div>

  <div class="col-lg-4 mb-4 hvr-float">
    <div class="card text-center">
      <div class="card-header">
        <!-- <ul class="nav nav-pills card-header-pills">
          <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
        </ul> -->
      </div>

      <div class="card-block">
        <h4 class="card-title">Presentation</h4>

        <p class="card-text">발표에 필요한 영어 스크립트를 찾아보세요.</p>
        <a id="start-presentation" href="#" class="btn btn-primary">START</a>
      </div>
    </div>
  </div>
</section>
`

// function to plug in different step html code
// requests /api/sentence/ API
function get_template_sentences(category, usage, topic) {
  $.ajax({
  method: "GET",
  url: '/api/sentence/?category=' + category + '&usage=' + usage + '&topic=' + topic,
  success: function(data){
    console.log(data)
  },
  error: function(data){
    console.log(data)
  }
})
}

$('#start-email').click(function(){
  $('.index-header').fadeOut()
  $('.step-one-section').fadeOut()

  setTimeout(function() {
    get_template_sentences('이메일 및 기타문서')
    $('#main').hide().html(step_two_code).fadeIn()
  }, 400)
})

$('#start-presentation').click(function(){
  $('.step-one-section').fadeOut()
  $('.step-one-section').fadeOut()

  setTimeout(function() {
    $('#main').hide().html(step_two_code).fadeIn()
  }, 400)
})
