
var index=99;
var id_temp='';
   
   function closeWindow(id_window){
        document.getElementById(id_window).style.display="none";
    }

     function showWindow(id_window,id_icon){
        document.getElementById(id_icon).blur();
         document.getElementById(id_window).style.display="block";
         bringToFront(id_window);
    }

    function bringToFront(id){

      try {
        if($('#'+id).css("z-index")>index)
        { index= $('#'+id).css("z-index");}
        else{index++;}

    $('#'+id).css("z-index", index);
      }
      catch(err) {
        // console.log(err);
      }

       
    }

    window.addEventListener('DOMContentLoaded', (event) => {


      // loadCalculator(id_display,id_second_display);

        $('body').on('click', function(event){
            event.preventDefault();
            
            if(event.target.offsetParent===null){

            }
            else{
            id_temp=event.target.offsetParent.id+'';

            bringToFront(id_temp);
            }
           

        });

      
       
        (function startTime() {
        

        var winx=window.innerWidth;
        var winy=window.innerHeight;

        document.body.style.backgroundSize=
        ''+winx+'px'+' '+winy+'px';
        
    
      
dragElement(document.getElementById("divW_Calculator_"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
      bringToFront(e.target.offsetParent.id);

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

 
}
  
        var t = setTimeout(startTime, 100);
    })();
    
    function checkTime(i) {
      if (i < 10) {i = "0" + i};
      return i;
    }

    
});