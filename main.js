
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

