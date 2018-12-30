var hidden = createNumber();
var user = 0;
var picas = 0;
var fijas = 0;
console.log(hidden);

$('input').keyup(function(){
  noDuplicates($(this).val());
})

$('form').on('submit',function(e){
  e.preventDefault();
  picas = 0;
  fijas = 0;
  user = $('input').val();
  validate();
  $('input').val('');
});

function noDuplicates(value){
  var last = value.substr(-1);;
  value = value.substring(0, value.length - 1);
  console.log(value+"-"+last);
  if(value.includes(last)){
    return true;
  }else{
    return false;
  }
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
}
function ramdonDigit(){
  //create a ramdon digit
  var n = Math.floor(Math.random() * 10);
  return n;
}
function validate(){
  if(user.length != 4){
    $('span').addClass('error');
    return false
  }else{
    $('span').removeClass('error');
    score();
    addRow();
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
  $('tbody').append("<tr><td>"+user+"</td><td>"+picas+"</td><td>"+fijas+"</td></tr>")
}
function win(){
  if(fijas == 4){
    $('p').text('!!!YOU WIN¡¡¡');
  }
}
