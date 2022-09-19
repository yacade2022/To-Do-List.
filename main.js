const input = document.querySelectorAll('.input')
const submit = document.querySelector('.submit')
const rowResult = document.querySelector('.el-body')

class Identification{
    constructor(name,age,number){
        this.name = name
        this.age = age
        this.number = number
    }
}

submit.addEventListener('click',()=>{
    display()   
    clearValue()    
})

function display(){
    let nameValue = document.getElementById('name').value
    let ageValue = document.getElementById('age').value
    let numberValue = document.getElementById('number').value
    if(nameValue === "" && ageValue === "" && numberValue === "")return
    const alpha = new Identification(nameValue,ageValue,numberValue)    
    addToStore(alpha)
    addToBook(alpha)
}

// add element to UI
function addToBook(alpha){    
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${alpha.name}</td>
    <td>${alpha.age}</td>
    <td>${alpha.number}</td>
    <td><a href="#" class="close">X</a></td>
    
    `
    rowResult.appendChild(row)
}

function clearValue(){
    document.getElementById('name').value = ""
    document.getElementById('age').value = ""
    document.getElementById('number').value = ""
}

//add element to storage
function addToStore(element){    
   const Data = getDataFromStore()
    Data.push(element)
    localStorage.setItem('data',JSON.stringify(Data))
}

//get data from storage
function getDataFromStore(){
    let x = JSON.parse(localStorage.getItem('data'))
    return localStorage.getItem('data')? x:[]
}

//display data from storage
function displayDataStore(){
    let data = getDataFromStore()    
    data.forEach((e) => {
    const row = document.createElement('tr')        
    row.innerHTML = `
    <td>${e.name}</td>
    <td>${e.age}</td>
    <td>${e.number}</td>
    <td><a href="#" class="close" >X</a></td>    
    `
    rowResult.appendChild(row)
        
    })
}
displayDataStore()

//remove element from UI and storage
rowResult.addEventListener('click',(event)=>{
    if(event.target.classList.contains('close')){
       const id = event.target.parentElement.previousElementSibling.innerText
       removeFromStore(id);
        event.target.parentElement.parentElement.remove()
    }
})


function removeFromStore(id){
    let data = getDataFromStore()
    data = data.filter(item => item.number !== id)
    localStorage.setItem('data',JSON.stringify(data))
    
}