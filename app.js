let btn=document.querySelectorAll('.enter1 button');
let leftInput=document.querySelector('.leftInput');
let rightInput=document.querySelector('.rightInput');
btn.forEach((item)=>{
    item.addEventListener('click',()=>{
        btn.forEach((item)=>{
            item.classList.remove('active');
        })
    })
    item.addEventListener('click',()=>{
        item.classList.add('active');
    })
})
let leftValyuta = "RUB";
let rightValyuta = "USD";
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
        rightInput.value=leftInput.value*data.rates[`${right}`]
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
