var hidden = createNumber();
var user = 0;
var picas = 0;
var fijas = 0;
var template = Handlebars.compile($('#table-row').html())
console.log(hidden);

$('input').keyup(function(){
  duplicates($(this).val()) ? hasError(true) : hasError(false);
})
$('form').on('submit',function(e){
  e.preventDefault();
  picas = 0;
  fijas = 0;
  user = $('input').val();
  if(validLength()){
    $('input').val('');
    score();
    addRow();
  }else{
    hasError(true);
  }
});
$('#overlayBody').on('click','button',function(e){
  window.location.reload(true);
});


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
}
function ramdonDigit(){
  //create a ramdon digit
  var n = Math.floor(Math.random() * 10);
  return n;
}
function validate(validate){
  if(!validate){
    return false;
  }
}
function validLength(){
  if(user.length == 4){
    return true
  }else{
    return false;
  }
}
function duplicates(value){
  var last = value.substr(-1);;
  value = value.substring(0, value.length - 1);
  if(value.includes(last)){
    return true;
  }else{
    return false;
  }
}
function hasError(hasError){
  if($('input').val() == ""){
    $('span').removeClass('error');
  }else{
    if(hasError){
      $('span').addClass('error');
      validate(false);
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
  var result = {user:user,picas:picas,fijas:fijas};
  $('tbody').append(template(result));
}
function win(){
  if(fijas == 4){
    var winmsg = Handlebars.compile($('#winmsg').html());
    $('.overlay').fadeIn().show();
    $('#overlayBody').append(winmsg)
  }
}
