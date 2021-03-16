
let show = true

const showForm = ()=>{

    //tangkap element note form
    const nf = document.getElementById('note_form')

    //check nilai variable show
    if(show === true){
        nf.style.transform = 'translateX(0)'
        show = false
    }else{
        nf.style.transform = 'translateX(-250px)'
        show = true
    }
}

const getDataFromApi = ()=>{

    //ambil element card_area
    let ca = document.getElementById('card_area')

    //ambil data dari API
    fetch('http://localhost:3000/notes_data', {

        //Metode penngambilan data
        method : "GET",

        //Perizinan / Cors origin 
        mode : 'cors',

        //Headers data yang dikirimkan ke server
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.map((e)=>{
            ca.innerHTML += `
            
            <div class="card_item" id="${e.id}">

                <div class="action">
                    <i class="material-icons" id="delete" onclick="deleteData(${e.id})">delete</i>
                    <i class="material-icons" id="edit" onclick="showEditModal()">edit</i>
                </div>

                <h3 class="card_title"> ${e.title} </h3>
                <p class="card_body"> ${e.body} </p>

            </div>
            
            `
        })
    })
    .catch(err => console.log(err))
}

getDataFromApi()

//FUNCTION DELETE
const deleteData = (id)=>{

    fetch(`http://localhost:3000/notes_data/${id}` , {
        method : "DELETE",
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))

}

//FUNCTION CREATE
const createData = (event)=>{

    event.preventDefault()

    //kita tangkap input dari user
    let title = document.getElementById('title').value
    let body = document.getElementById('body').value

    fetch('http://localhost:3000/notes_data', {
        method : 'POST',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            title : title,
            body : body
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

//FUNCTION EDIT
const editData = (id)=>{



    //tangkap dari edit form
    let title = document.getElementById('edit_title')
    let body = document.getElementById('edit_body')

    fetch(`http://localhost:3000/notes_data/${id}`, {
        method : 'PUT',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            title : title,
            body : body
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

}


const showEditModal  = ()=>{
    let em = document.getElementById('edit_modal')
    em.style.display = 'flex'
}

const hideEditModal  = ()=>{
    let em = document.getElementById('edit_modal')
    em.style.display = 'none'
}