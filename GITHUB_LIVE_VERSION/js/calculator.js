var id_display='calc_display1';
var id_second_display='calc_display2';

var dot_typed=false;
var operator_typed=false;
var operator_char='';
var calc_display='';
var calc_top_display='';
var calc_number='';

function switchSign(){
  if(calc_display.toString().length>=1){
    if(calc_top_display.includes('=')){calc_top_display='';}
    x = new BigNumber(calc_display);
    y=x.multipliedBy(-1);
    
    calc_display=(parseFloat(y.toPrecision(10)));
    if( !(/^-{0,1}\d+$/.test(calc_display)) ){dot_typed=true;}else{dot_typed=false;}

    if(calc_display=='0'){calc_display='0.';dot_typed=true;}
    loadCalculator(id_display,id_second_display);
  }
  
}

function doMath(){
  if(operator_typed){
  var result='';
  number_1=calc_top_display.split(operator_char)[0];
  number_2=calc_display;

  result=doCalculate(number_1,number_2);


  if( !(/^-{0,1}\d+$/.test(result)) ){dot_typed=true;}else{dot_typed=false;}

  if(result=="0."){result='0';}

  calc_top_display+=calc_display;
  calc_top_display+='=';

  calc_display=result+'';
  loadCalculator(id_display,id_second_display);
  operator_typed=false;
  }
}

function doCalculate(number_1,number_2){
  if(operator_char=='+'){
    x = new BigNumber(number_1);
    y=new BigNumber(number_2);
      z=x.plus(y);
      return(parseFloat(z.toPrecision(10)));
  }

  if(operator_char=='-'){
    x = new BigNumber(number_1);
    y=new BigNumber(number_2);
      z=x.minus(y);
      return(parseFloat(z.toPrecision(10)));
  }

  if(operator_char=='÷'){
    x = new BigNumber(number_1);
    y=new BigNumber(number_2);
      z=x.dividedBy(y);
      return(parseFloat(z.toPrecision(10)));
  }

  if(operator_char=='×'){
    x = new BigNumber(number_1);
    y=new BigNumber(number_2);
      z=x.multipliedBy(y);
      return(parseFloat(z.toPrecision(10)));
  }

  if(operator_char=='^'){
    x = new BigNumber(number_1);
    y=new BigNumber(number_2);
      z=x.exponentiatedBy(y);
      return(parseFloat(z.toPrecision(10)));
  }

}

function numberType(numpad_nr){

  if(!(numpad_nr=='0'&&calc_display.toString().length<=0)){
      if(calc_display.toString().length<=14){

        if(calc_display.toString()=="0"){
          calc_display='0.';
       }
        if(calc_top_display.includes('=')){calc_top_display='';}
          calc_display+=''+numpad_nr;

            loadCalculator(id_display,id_second_display);
      }  
  }
  else{calc_display='';addDot();}
}

function operationType(operator){
  if(calc_display.toString().length>=1||calc_top_display.toString().length>=1){
    if(operator_typed==false){
      if(calc_display=="0."){calc_display='0';}
      operator_typed=true;
      calc_display+=''+operator;
      dot_typed=false;
      moveTextDisplayTop();
    }
    else{
      calc_top_display=calc_top_display.slice(0,-1);
      calc_top_display+=''+operator;
      loadCalculator(id_display,id_second_display);
    }
    operator_char=operator;
  }
}

function transformType(operator){
  if(calc_display.toString().length>=1||calc_top_display.toString().length>=1){
    if(operator_typed==false){

    if(calc_display=="0."){calc_display='0';}
    operator_typed=true;
    result=doTransform(operator);
    if(operator!="√"&&operator!="¹/x"){
      if(operator=="x²"){operator='²';}

    calc_display+=''+operator+'=';
    }
    else{
      if(operator=="¹/x"){operator='¹/';}
      operator+=''+calc_display+'=';
      calc_display=operator;
    }
    // dot_typed=false;
    moveTextDisplayTop();
    calc_display=result;
    loadCalculator(id_display,id_second_display);
    }
  }
}

function doTransform(operator){
    if(operator.toString()=='%'){
      x = new BigNumber(calc_display);
      y=100;
        z=x.dividedBy(y);
        operator_typed=false;
        dot_typed=true;
        return(parseFloat(z.toPrecision(10)));
    }
    if(operator.toString()=='√'){
      x = new BigNumber(calc_display);
        z=x.squareRoot();
        operator_typed=false;
        dot_typed=true;
        return(parseFloat(z.toPrecision(12)));
    }
    if(operator.toString()=='x²'){
      x = new BigNumber(calc_display);
      y=2;
        z=x.exponentiatedBy(y);
        operator_typed=false;
        dot_typed=true;
        return(parseFloat(z.toPrecision(10)));
    }
    if(operator.toString()=='¹/x'){
      x=new BigNumber(1);
      y = new BigNumber(calc_display);
      z=x.dividedBy(y);
        operator_typed=false;
        dot_typed=true;
        return(parseFloat(z.toPrecision(10)));
    }

}

function deleteTyped(){
  calc_display=calc_display.toString();
  if(!(calc_display.toString().length<1)){
  if(calc_display.slice(calc_display.toString().length-1,calc_display.toString().length)=='.'){dot_typed=false;
  if(calc_display.toString()=='0.'){calc_display=calc_display.slice(0,-1);calc_display=calc_display.slice(0,-1);}
  if(calc_display.toString()=='-0.'){calc_display=calc_display.slice(0,-1);calc_display=calc_display.slice(0,-1);}
  
}
  if(calc_top_display.includes('=')){calc_top_display='';}
  calc_display=calc_display.slice(0,-1);
  loadCalculator(id_display,id_second_display);

  }
  else{
    if(operator_typed){calc_top_display=calc_top_display.slice(0,-1);operator_typed=false;}
    calc_display=calc_top_display;
    calc_top_display='';
    loadCalculator(id_display,id_second_display);
  }
  if(calc_display.toString().length==0){
    if(operator_typed){calc_top_display=calc_top_display.slice(0,-1);operator_typed=false;}
    calc_display=calc_top_display;
    calc_top_display='';
    loadCalculator(id_display,id_second_display);
  }

}

function clearDisplays(){
  dot_typed=false;
  operator_typed=false;
  calc_display='';
  calc_top_display='';
  loadCalculator(id_display,id_second_display);
}

function moveTextDisplayTop(){
  calc_top_display=calc_display;
  calc_display='';
  loadCalculator(id_display,id_second_display);
}

function loadCalculator(id_display,id_second_display){
  document.getElementById(id_display).innerHTML=calc_display;
  document.getElementById(id_second_display).innerHTML=calc_top_display;
}


function addDot(){
  if(calc_display.toString().length>=1&&dot_typed==false){
    if(calc_top_display.includes('=')){calc_top_display='';}
    dot_typed=true;
  calc_display+='.';
  loadCalculator(id_display,id_second_display);
  }
  else{
    if(calc_display.toString().length<1){
      calc_display='0.';
      dot_typed=true;
      loadCalculator(id_display,id_second_display);
    }
  }
}

function calc_sign_CLICK        (id_buton){document.getElementById(id_buton).blur();switchSign();}
function calc_0_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('0');}
function calc_dot_CLICK         (id_buton){document.getElementById(id_buton).blur();addDot();}
function calc_equals_CLICK      (id_buton){document.getElementById(id_buton).blur();doMath();}
function calc_1_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('1');}
function calc_2_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('2');}
function calc_3_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('3');}
function calc_plus_CLICK        (id_buton){document.getElementById(id_buton).blur();operationType('+');}
function calc_4_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('4');}
function calc_5_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('5');}
function calc_6_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('6');}
function calc_minus_CLICK       (id_buton){document.getElementById(id_buton).blur();operationType('-');}
function calc_7_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('7');}
function calc_8_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('8');}
function calc_9_CLICK           (id_buton){document.getElementById(id_buton).blur();numberType('9');}
function calc_X_CLICK           (id_buton){document.getElementById(id_buton).blur();operationType('×');}
function calc_procent_CLICK     (id_buton){document.getElementById(id_buton).blur();transformType('%');}
function calc_sqrt_CLICK        (id_buton){document.getElementById(id_buton).blur();transformType('√');}
function calc_C_CLICK           (id_buton){document.getElementById(id_buton).blur();clearDisplays();} 
function calc_divide_CLICK      (id_buton){document.getElementById(id_buton).blur();operationType('÷');}   
function calc_POW2_CLICK        (id_buton){document.getElementById(id_buton).blur();transformType('x²');}
function calc_1divideX_CLICK    (id_buton){document.getElementById(id_buton).blur();transformType('¹/x');} 
function calc_xPOWn_CLICK       (id_buton){document.getElementById(id_buton).blur();operationType('^');}
function calc_CLR_CLICK         (id_buton){document.getElementById(id_buton).blur();deleteTyped();} 
