//footer
const end=document.querySelector('.end');
end.innerHTML=`Copyright &copy; ${new Date().getFullYear()} Aarushi Saxena`;

let string="";

document.getElementById('deleteBtn').addEventListener('click',(event)=>{
    if(string.length>0){
        string=string.slice(0,-1);
        document.getElementById('currentEquation').value=string;
    }

    if(string===""){
        document.getElementById('previousEquation').value=string;
    }
})

let buttons=document.querySelectorAll('.button');

Array.from(buttons).forEach((button)=>{
   button.addEventListener('click',(e)=>{
    if(e.target.id=='deleteBtn') return ;

    const maxLength = 20; 
    if (string.length >= maxLength) {
        alert('Input too long!');
        return;
    }

    if(e.target.innerHTML=='='){

        if (isOperator(string[string.length - 1])) {
            alert("Incomplete expression!");
            return;
        }


        document.getElementById('previousEquation').value=string;

        string =processString(string);

        try{
        string=eval(string).toString();

           // Check for Infinity after the evaluation
    if (string === "Infinity" || string === "-Infinity") {
        throw new Error("Division by zero");
    }
        }catch(error){
            string="Division by zero"
        }

         // If the result has more than 10 decimal places, round it to 10
        if(string.includes('.') && string.split('.')[1].length>10){
          const parts=string.split('.');
          string=parts[0]+'.'+parts[1].substring(0,10);
        }

        document.getElementById('currentEquation').value=string;
    }
    else if(e.target.innerHTML=='C'){
       string='';
       document.getElementById('currentEquation').value=string; 
       document.getElementById('previousEquation').value=string;
    }
    
    else{
    console.log(e.target);
     string=string +e.target.innerHTML;
    }
    document.getElementById('currentEquation').value=string;
   })
})

function processString(inputStr) {
    let resultStr = inputStr;
    
    // Replace all occurrences of '×' with '*'
    resultStr = resultStr.replace(/×/g, '*');
    
    // Replace all occurrences of '÷' with '/'
    resultStr = resultStr.replace(/÷/g, '/');
    
    // Replace '^' with '**' for exponentiation
    resultStr = resultStr.replace(/\^/g, '**');

    return resultStr;
}


function isOperator(char) {
    return ['+', '-', '*', '/', '×', '÷', '^'].includes(char);
}
