$('.list-lecture').click(function (e) {
    const tag = e.target.tagName;
    const whitelist = ['LI','SPAN','H6','A']
    if(!whitelist.includes(tag)) return;
    else{
      const code = $(e.target).closest('li.card-lecture').attr('data-code');
      const url = `/courses/course/${code}`;
      fetch(url)
      .then(res => res.json())
      .then(res =>{
        const course = res.course;
        $('.modal-body > .lecture-title').text(course.lecture);
        
        $('#time').attr('data-startTime', course.start_time)
        $('#time').attr('data-dayofweek', course.dayofweek)
        $('#time').text(`강의 시간 : ${course.start_time}:00 - ${course.end_time}:00 | (${course.dayofweek})`);
        
        $('#code').attr('data-code', course.code);
        $('#code').text(`교과목 코드 : ${course.code}`);
        
        $('#professor').text(`담당 교수 : ${course.professor}`);
        $('#location').text(`강의실 : ${course.location}`);
        $('#modal-lecture-info').modal('show');
      });
    }
});

$('.lecture-time > a').click(function () {
  $('#modal-lecture-task').modal('show');
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body',
    html: true,
    placement: 'right',
    sanitize: false,
    content: function () {
    return $("#PopoverContent").html();
    }
  });
});


$('.form-control').on("propertychange change keyup paste input", function(){
  const inputData = $('.form-control').val();
  const url = `/courses/search?q=${inputData}`;
  fetch(url)
  .then( res => res.json())
  .then( res => {
    const searchData = res.searchData;
    $('.list-lecture *').remove()
    $.each(searchData, function(index, item){
      $('.list-lecture').append(`
        <li class='card-lecture' data-code=${item.code}>
          <a class='lecture-title' href='#'> ${item.lecture}</a>
          <h6 class='lecture-time'>
            <i class='material-icons ic-lecture-info'> access_time </i>
            <span> ${item.start_time}:00 - ${item.end_time}:00 | (${item.dayofweek})</span>
          </h6>
          <ul class='list-lecture-info'>
            <li> 교과목 코드 : ${item.code} </li>
            <li> 담당 교수 : ${item.professor}</li>
            <li> 강의실 : ${item.location}</li>
          </ul>
        </li>`)
    })
  })
});

$('.submit').click(function(){
  const course_code = $('#code').attr('data-code');
  const start_time = $('#time').attr('data-startTime');
  const dayofweek =$('#time').attr('data-dayofweek')
  const url = `/timetable`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      { 
        code: course_code,
        course_start: start_time,
        course_day: dayofweek
      }
    )
  })
  .then(res=> res.json())
  .then(res => {
    alert(res.message);
  })
});