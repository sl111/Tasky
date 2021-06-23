const taskcontainer= document.querySelector(".task__container");

//global store - list of cards details for storing
//(CHANGED)const globalstore=[]; //store taskdata obj
let globalstore=[];
//card1,card2...

const newcard=({id,
    imageurl,
    tasktitle,
    taskdescription,
    tasktype})=> `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deletecard.apply(this,arguments)">
    <i class="fas fa-trash-alt" id=${id} onclick="deletecard.apply(this,arguments)"></i></button>
  </div>

  <img src=${imageurl}
   class="card-img-top"/>
  <div class="card-body">
    <h5 class="card-title">${tasktitle}</h5>
    <p class="card-text">${taskdescription}</p>
    <span class="badge bg-primary">${tasktype}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>`;

const loadinitialtaskcards=()=>{
    //access local storage
    const getinitialdata=localStorage.getItem("tasky");
    if(!getinitialdata) return; //if cant find tasky key it will return null 

    //convert stringified obj to obj
    const {cards}=JSON.parse(getinitialdata);
    //{cards:[{...}]}
    

    //map around the array to generate html card and inject it to DOM    
    cards.map((cardobject)=>{
        const createnewcard=newcard(cardobject);
        taskcontainer.insertAdjacentHTML("beforeend",createnewcard);
        globalstore.push(cardobject);
    //accessing individual cards inside cards array
    });

};

// id is unique
const savechanges=() =>{
    const taskdata={
        // this id will be unique number fr card id
        id:`${Date.now()}`,
        imageurl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };
    //html code injected to dom
    const createnewcard=newcard(taskdata);

    taskcontainer.insertAdjacentHTML("beforeend",createnewcard);
    globalstore.push(taskdata); // we have to update this to local storage
    
    
    //api-application programming interface
    //local storage->interface->programming

    //localStorage.setItem("tasky",{cards:globalstore}); //this gave op of obect:object , so convert it to string
    localStorage.setItem("tasky", JSON.stringify({cards: globalstore}));
    // setItem - interface provided to woork with the local storage
    //key (tasky) -> data {card:[{...}]}
   //to accesslocal storae >> : application :storage : local storage : ur url
   //upon reloading card vanished, but data in local storage is present.
};


// event will fetch html code of the clicked card
const deletecard=(event)=>{
  //id
  event=window.event;
  // browser data
  const targetid=event.target.id; //but this will id of the delete button only , so adding the parent's id to button
  const tagname = event.target.tagName; //BUTTON
  
  //filter -> to delete some things
  const newupdatedarray= globalstore.filter(
    (cardobject)=>cardobject.id !== targetid
  );
  globalstore=newupdatedarray;

  /*newupdatedarray.map((cardobject)=>{
    const createnewcard=newcard(cardobject);
    taskcontainer.insertAdjacentHTML("beforeend",createnewcard);
  }); */ //xxxxx doesnt work in DOM

  //access dom to remove them

  if(tagname==="BUTTON"){
    // 4 - task-container
    return event.target.parentNode.parentNode.parentNode. 
    parentNode.removechild(
      // hey task container remove this child - col-lg-4
      event.target.parentNode.parentNode.parentNode
    );
  };return event.target.parentNode.parentNode.parentNode. 
    parentNode.removechild(
      // hey task container remove this child (icon)
      event.target.parentNode.parentNode.parentNode.parentNode
    );

  };

  



  //search global store array which has all pur card details, remove the object which matches with the id


  //loop over the new globalstore and inject updated cards to dom







//issues:
//modal wasnt closing upon adding new card --> solved in model footer
//cards were deleted after refres-> local storage(5mb), store obj in array format keep in local storage, so wen uses refreshes first check if there data in array , if yes get the data in array , convert to card and show.. else ask user to create

//deatures:
//delete modal feature - when user clicks on delete , we can delete item in global array by searching id in global array
//open task
//edit task
