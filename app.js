var hidden =  createNumber();
var user = 0;
var picas = 0;
var fijas = 0;
console.log(hidden);

$('input').keyup(function(){
  duplicates($(this).val()) ? hasError(true) : hasError(false);
})
$('form').on('submit',function(e){
  e.preventDefault();
  picas = 0;
  fijas = 0;
  user = $('input').val();
  if(validLength() && !(duplicates(user))){
    $('input').val('');
    score();
    addRow();
  }else{
    hasError(true);
  }
});
$('#overlayBody').on('click','button',function(e){
  $('.overlay').fadeOut();
  restart();
});

function restart(){
  $('tbody').empty();
  hidden = createNumber();
  $('#overlayBody').empty();
  console.log(hidden);
}
function createNumber(){
  //create the hidden number
  var number = [];
  while(number.length < 4){
    var digit = ramdonDigit();
    if(!(number.includes(digit))){
      number.push(digit);
    }
  }
  return number.join('');
  console.log(hidden);
}
function ramdonDigit(){
  //create a ramdon digit
  var n = Math.floor(Math.random() * 10);
  return n;
}
function validLength(){
  if(user.length == 4){
    return true
  }else{
    return false;
  }
}
function duplicates(value){
  for(var i = 0; i <= value.length; i++) {
      for(var j = i+1; j <= value.length; j++) {
          if(value[j] == value[i]) {
              return true;
          }
      }
  }
  return false;
}
function hasError(hasError){
  if($('input').val() == ""){
    $('span').removeClass('error');
  }else{
    if(hasError){
      $('span').addClass('error');
    }else{
      $('span').removeClass('error');
    }
  }
}
function score(){
  for(var i = 0 in hidden){
    if(hidden.includes(user[i])){
      if(hidden[i]==user[i]){
        fijas ++;
      }else{
        picas ++;
      }
    }
    win();
  }
}
function addRow(){
  var template = Handlebars.compile($('#table-row').html());
  var result = {user:user,picas:picas,fijas:fijas};
  $('tbody').append(template(result));
}
function win(){
  if(fijas == 4){
    var winmsg = Handlebars.compile($('#winmsg').html());
    $('.overlay').fadeIn();
    $('#overlayBody').append(winmsg);
  }
}
