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
        $('.lecture-title').attr('data-lecture', course.lecture)
        $('#time').attr('data-startTime', course.start_time)
        $('#time').attr('data-endTime', course.end_time)
        $('#time').attr('data-dayofweek', course.dayofweek)
        $('#time').text(`강의 시간 : ${course.start_time}:00 - ${course.end_time}:00 | (${course.dayofweek})`);
        
        $('#code').attr('data-code', course.code);
        $('#code').text(`교과목 코드 : ${course.code}`);
        
        $('#professor').attr('data-professor', course.professor);
        $('#professor').text(`담당 교수 : ${course.professor}`);
        $('#location').attr('data-location', course.location);
        $('#location').text(`강의실 : ${course.location}`);
        $('#modal-lecture-info').modal('show');
      });
    }
});

$('.lecture-time > a').click(function (e) {
  const table_id = $(e.target).closest('li.lecture-time').attr('data-code');
  const url = `/timetable/${table_id}`
  fetch(url)
  .then(res => res.json())
  .then(res => {
    const course = res.course;
    console.log(course);
    $('.modal-body > .lecture-title').text(course.lecture);
    $('#lecture-time').text(`강의 시간 : ${course.start_time}:00 - ${course.end_time}:00 | (${course.dayofweek})`);
      
    $('#lecture-code').attr('data-lecture', course.id);
    $('#lecture-code').text(`교과목 코드 : ${course.code}`);
      
    $('#lecture-professor').text(`담당 교수 : ${course.professor}`);
    $('#lecture-location').text(`강의실 : ${course.location}`);

    
    

    $('#modal-lecture-task').modal('show');
  })
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
$('.delete-lecture').click(function(e){
  const tableId = $('#lecture-code').attr('data-lecture')
  console.log(tableId+'요고야');
  const url = `/timetable/${tableId}`;
  fetch(url, { method: 'DELETE' })
  .then(res => res.json())
  .then(res => {
    alert(res.message);
    window.location.reload()
  })
})


$('.form-control').on("propertychange change keyup paste input", function(){
  const inputData = $('.form-control').val();
  const url = `/courses/search?q=${inputData}`;
  fetch(url)
  .then( res => res.json())
  .then( res => {
    console.log("res:"+res);
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
  const end_time = $('#time').attr('data-endTime');
  const dayofweek =$('#time').attr('data-dayofweek');
  const lecture =$('.lecture-title').attr('data-lecture');
  const location =$('#location').attr('data-location');
  const professor =$('#professor').attr('data-professor');
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
        course_end: end_time,
        lecture: lecture,
        location: location,
        professor: professor,
        course_day: dayofweek
      }
    )
  })
  .then(res=> res.json())
  .then(res => {
    console.log('hi');
    var result = res.result;
    console.log(result);
    if(result){
    if (dayofweek.length==1){
      var con = '';
      if(end_time-start_time==2){
        con += 'two-hr'
      }
      if(dayofweek=='월'){
        $('.MON').append(`
        <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01" data-code=${course_code}>
          <a href="#">
              <div class="lecture-info">
                  <h6 class="lecture-title">${lecture}</h6>
                  <h6 class="lecture-location">${location}</h6>
              </div>
              <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
          </a>
        </li>`) 
      }
      if(dayofweek=='화'){
        $('.TUE').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      if(dayofweek=='수'){
        $('.WED').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      if(dayofweek=='목'){
        $('.THU').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      if(dayofweek=='금'){
        $('.FRI').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
    }
    else{
      for (var i = 0; i < 2; i++) {
        var con = '';
      if(end_time-start_time==2){
        con += 'two-hr'
      }
      if(dayofweek[i]=='월'){
        $('.MON').append(`
        <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
          <a href="#">
              <div class="lecture-info">
                  <h6 class="lecture-title">${lecture}</h6>
                  <h6 class="lecture-location">${location}</h6>
              </div>
              <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
          </a>
        </li>`) 
      }
      if(dayofweek[i]=='화'){
        $('.TUE').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      if(dayofweek[i]=='수'){
        $('.WED').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      if(dayofweek[i]=='목'){
        $('.THU').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      if(dayofweek[i]=='금'){
        $('.FRI').append(`
    <li class="lecture-time ${con} hr-${start_time}" data-event="lecture-01">
    <a href="#">
        <div class="lecture-info">
            <h6 class="lecture-title">${lecture}</h6>
            <h6 class="lecture-location">${location}</h6>
        </div>
        <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트"><i class="material-icons ic-lecture-noti">assignment</i><span class="lecture-noti-title">과제 제목 텍스트</span></div>
    </a>
    </li>`) 
      }
      }
    }
  }
    alert(res.message);
    window.location.reload();
    $('#modal-lecture-info').modal('hide');
  })
});