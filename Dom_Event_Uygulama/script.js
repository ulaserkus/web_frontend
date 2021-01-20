//UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

getItemsFromLS();


//call event listener
eventListeners();

function eventListeners() {

    //submit event
    form.addEventListener('submit', addNewItem);
    //delete an item
    taskList.addEventListener('click', deleteItem);
    //delete all items

    btnDeleteAll.addEventListener('click', deleteAll);


}


function LoadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        
        CreateItem(item);

    });
}

function getItemsFromLS() {
    if (localStorage.getItem('items' === null)) {
        items = [];

    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    //items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}
function  deleteItemFromLs(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
         
        if(item === text){
            items.splice(index,1);
        }
        localStorage.setItem('items',JSON.stringify(items));
        
    });
}
function CreateItem(text) {

    //create li  
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));


    //create a 
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>'

    // add a to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li);

}

//add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }

    //create İtem
    CreateItem(input.value);

    //save to LS
    setItemToLS(input.value);

    //clear input
    input.value = '';

    e.preventDefault();

}
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure ?')) {

            e.target.parentElement.parentElement.remove();
            
            deleteItemFromLs(e.target.parentElement.parentElement.textContent);
        }

    }
}
function deleteAll(e) {

    if (confirm('are you sure')) {
        //taskList.innerHTML ='';

        taskList.childNodes.forEach(function (item) {
            if (item.nodeType === 1) {
                item.remove();

                
            }

        });

    }


    e.preventDefault();



}