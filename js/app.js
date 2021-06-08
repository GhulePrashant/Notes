displayNotes();

let addBtn = document.querySelector('#addBtn');
addBtn.addEventListener("click",function(e){
    let addTxt = document.querySelector('#addTxt');
    let addTitle = document.querySelector('#addTitle');
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title:addTitle.value,
        text: addTxt.value,
    }
    if(addTitle.value !="" && addTxt.value !=""){
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
     addTxt.value="";
     addTitle.value="";
    //  console.log(notesObj);
    }
    else{
        alert("Title / Note can not be empty!");
        // addTxt.value="";
        // addTitle.value="";
    }
     displayNotes();
});

function displayNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="catd-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.querySelector('#notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `Nothing to display! First add a note.`; 
    }
}


function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNotes();
}


let search = document.querySelector('#searchTxt');
search.addEventListener("input", function(){
    let inputValue = search.value.toLowerCase();
    let noteCards = document.querySelectorAll(".noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.querySelectorAll("p")[0].innerText.toLocaleLowerCase();        
        if(cardTxt.includes(inputValue)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    });
});