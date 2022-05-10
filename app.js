let btn=document.querySelectorAll('.enter1 button');
let leftInput=document.querySelector('.leftInput');
let rightInput=document.querySelector('.rightInput');
let leftBtn=document.querySelectorAll('.leftBtn button');
let rightBtn=document.querySelectorAll('.rightBtn button');
let leftValyuta = "RUB";
let rightValyuta = "USD";

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
        rightInput.value=Number(leftInput.value)*data.rates[`${right}`]
    })
}
function fetchLeft(left, right){
    fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right} `)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        leftInput.value=rightInput.value*data.rates[`${right}`]
    })
}
