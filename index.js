//put items in form

function putInForm(params) {
  document.getElementById('identifier').innerText = params.id
  document.getElementById('name').value = params.name
  document.getElementById('value').value = params.value
}

//roout get all

function showFinance(finances){
  const finance = document.createElement('div')
  finance.classList.add('finance')
  finance.id = `finance-${finances.id}`
  
  const name = document.createElement('h2')
  name.innerText = finances.name
  name.id = "finance-name"

  const value = document.createElement('h4')
  value.innerText = `R$ ${finances.value}`
  value.id = "finance-value"

  finance.append(name,value)
  //get unique
  finance.addEventListener("click",async () => {
    const renderFinance = await fetch(`http://localhost:3000/personFinances/${finances.id}`).then(res => res.json())
    putInForm(renderFinance)
  })
  document.querySelector('#finances').append(finance)
}

async function fetchFinance(){
  const renderFinance = await fetch('http://localhost:3000/personFinances').then(res => res.json())
  renderFinance.forEach(showFinance);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchFinance()
})

//rota post

const saveBtn = document.getElementById("save")

saveBtn.addEventListener("click",async (ev) => {
  if(
    document.getElementById("name").value === "" 
    || 
    document.getElementById("value").value === ""
  ){
    alert("Insira os dados corretamente!")
  }
  else{
    ev.preventDefault()

    const finance = {
      name: document.getElementById("name").value,
      value: document.getElementById("value").value
    }

    const response = await fetch('http://localhost:3000/personFinances',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(finance),
    })

    const saveFinance = await response.json()

    document.getElementById("finance-form").reset()
    showFinance(saveFinance)
  }
})

//delete rout

const deleteBtn = document.getElementById("delete")

deleteBtn.addEventListener("click",async (ev) => {
  
  if(
    document.getElementById("name").value === "" 
    || 
    document.getElementById("value").value === ""
  ){
    alert("Selecione os dados na tabela à direita")
  }
  
  ev.preventDefault()
  let id = document.getElementById('identifier').innerText

  const response = await fetch(`http://localhost:3000/personFinances/${id}`,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })

  attTable()
})

//put rout

const editBtn = document.getElementById("edit")

editBtn.addEventListener("click",async (ev) => {
  ev.preventDefault()

  if(
    document.getElementById("name").value === "" 
    || 
    document.getElementById("value").value === ""
  ){
    alert("Selecione os dados na tabela à direita")
  }
  
  let id = document.getElementById('identifier').innerText

  const editedFinance = {
    name: document.getElementById("name").value,
    value: document.getElementById("value").value
  }

  const response = await fetch(`http://localhost:3000/personFinances/${id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(editedFinance),
  })
  attTable()
})

// attTable function

function attTable() {
  const finance = document.getElementsByClassName("finance")
  const elements = Array.from(finance)

  elements.forEach((el) => el.parentNode.removeChild(el))
  fetchFinance()
}