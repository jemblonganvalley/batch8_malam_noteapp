
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

window.onload = ()=>{
    const cc = document.querySelector('.card_container')
    fetch('http://localhost:3000/notes_data', {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        }
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        data.map((e)=>{
            cc.innerHTML += `
                <div class="card">
                    <span class="material-icons delete" id="delete_icon" onclick="deleteNote(${e.id})">delete</span>
                    <span class="material-icons edit" id="edit_icon">edit</span>
                    <h3 class="card_title">${e.title}</h3>
                    <p class="card_body">${e.body}</p>
                </div>
            `
        })
    })
}

window.deleteNote = (id)=>{
    fetch(`http://localhost:3000/notes_data/${id}`, {
        method : 'DELETE',
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        window.location.reload()
    })
}

window.submitNote = (event)=>{
    event.preventDefault()
    let tit = event.target.title.value
    let bod = event.target.noteBody.value

    fetch(`http://localhost:3000/notes_data`, {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        },
        body : JSON.stringify({
            title : tit,
            body : bod
        })
    }).then(res => res.json())
    .then(data => {
        window.location.reload()
    })
    
    
}

