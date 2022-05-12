let btn=document.querySelectorAll('.enter1 button');
let leftInput=document.querySelector('.leftInput');
let rightInput=document.querySelector('.rightInput');
let leftBtn=document.querySelectorAll('.leftBtn button');
let rightBtn=document.querySelectorAll('.rightBtn button');
let leftValyuta = "RUB";
let rightValyuta = "USD";
let rightVal=document.querySelector('.rightValyuta');
let leftVal=document.querySelector('.leftValyuta')
leftBtn.forEach((item)=>{
    item.addEventListener('click', function(){
        leftBtn.forEach((item)=>{
            item.classList.remove('active');
        });
        leftValyuta = this.innerHTML;
        Api(this.parentElement.classList[0]);
    });
    item.addEventListener('click', ()=>{
        item.classList.add('active')
    });
});

rightBtn.forEach((item)=>{
    item.addEventListener('click', function(){
        rightBtn.forEach((item)=>{
            item.classList.remove('active');
        });
        rightValyuta = this.innerHTML;
        Api(this.parentElement.classList[0]);
    });
    item.addEventListener('click', ()=>{
        item.classList.add('active');
    });
});

function Api(parentBtn){
    if(parentBtn == 'rightBtn'){
        fetchRight(leftValyuta, rightValyuta);
    }
    if(parentBtn == 'leftBtn'){
        fetchLeft(leftValyuta, rightValyuta);
    }
}
function changeInput(){
    leftInput.addEventListener('input', ()=>{
        if(leftInput.value==""){
            console.log(leftInput.value)
            rightInput.value=""
            rightVal.innerHTML=""
            leftVal.innerHTML=""
            console.log(typeof(rightInput.value))
        }
        fetchRight(leftValyuta,rightValyuta)
    })
    rightInput.addEventListener('input', ()=>{
        fetchLeft(rightValyuta, leftValyuta)
    })
}
changeInput()
function fetchRight(left, right){
    fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right} `)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        rightInput.value=leftInput.value.replaceAll(" ","")*data.rates[`${right}`];
        leftVal.innerHTML=`1${left}=${data.rates[`${right}`]}${right}`;
        rightInput.value = commify(rightInput.value)
        fetch(`https://api.exchangerate.host/latest?base=${right}&symbols=${left} `)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            rightVal.innerHTML=`1${right}=${data.rates[`${left}`]}${left}`;
        })
    })
}
function commify(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
        numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
    );
}
function fetchLeft(left, right){
    fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right} `)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        leftInput.value=rightInput.value.replaceAll(" ","")*data.rates[`${right}`];
        rightVal.innerHTML = `1${left}=${data.rates[`${right}`]}${right}`;
        leftInput.value = commify(leftInput.value)
        fetch(`https://api.exchangerate.host/latest?base=${right}&symbols=${left}`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{

            leftVal.innerHTML=`1${right}=${data.rates[`${left}`]}${left}`
        })
    })
}
var numberMask = IMask(leftInput, {
    mask: Number,  // enable number mask
  
    // other options are optional with defaults below
    scale: 6,  // digits after point, 0 for integers
    signed: false,  // disallow negative
    thousandsSeparator: ' ',  // any single char
    padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,  // appends or removes zeros at ends
    radix: '.',  // fractional delimiter
    mapToRadix: [','],  // symbols to process as radix
  });
  var numberMask = IMask(rightInput, {
    mask: Number,  
    scale: 6,  // digits after point, 0 for integers
    signed: false,  // disallow negative
    thousandsSeparator: ' ',  // any single char
    padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,  // appends or removes zeros at ends
    radix: '.',  // fractional delimiter
    mapToRadix: [','],  // symbols to process as radix
  });
