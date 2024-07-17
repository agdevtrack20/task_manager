const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
console.log(itemsArray)

document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    const due = document.querySelector("#due")
    console.log(due.value)
    createItem(item,due)
})

// Function to compare dates
const compareDates = (a, b) => {
    const dateA = new Date(a[1]);
    const dateB = new Date(b[1]);
    return dateA - dateB;
  };

function displayItems() {
    itemsArray.sort(compareDates)
    let dueItems = ""
    let todaysItem = ""
    let items = ""
    todayDateString = getTodaysDateAsString()
    console.log(todayDateString)
    for (let i = 0; i < itemsArray.length; i++){
        // console.log(itemsArray[i][1].localeCompare(todayDateString))
        if (itemsArray[i][1].localeCompare(todayDateString)==0)
            todaysItem+= `<div class="item">
                                <div class="input-controller">
                                    <textarea disabled> ${itemsArray[i][1]} &#13;&#10; ${itemsArray[i][0]}</textarea>
                                    <div class="edit-controller">
                                        <i class="fa-solid fa-check deleteBtn"></i>
                                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                                    </div>
                                </div>
                                <div class="update-controller">
                                    <button class="saveBtn">Save</button>
                                    <button class="cancelBtn">Cancel</button>
                                </div>
                             </div>`
        else if (itemsArray[i][1].localeCompare(todayDateString) == -1)
            dueItems+= `<div class="item">
                                <div class="input-controller">
                                    <textarea disabled> ${itemsArray[i][1]} &#13;&#10; ${itemsArray[i][0]}</textarea>
                                    <div class="edit-controller">
                                        <i class="fa-solid fa-check deleteBtn"></i>
                                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                                    </div>
                                </div>
                                <div class="update-controller">
                                    <button class="saveBtn">Save</button>
                                    <button class="cancelBtn">Cancel</button>
                                </div>
                             </div>`
        else
            items+=`<div class="item">
                        <div class="input-controller">
                            <textarea disabled> ${itemsArray[i][1]} &#13;&#10; ${itemsArray[i][0]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-check deleteBtn"></i>
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`
    }
    
    document.querySelector(".todays-task").innerHTML= todaysItem
    document.querySelector(".to-do-list").innerHTML = items
    document.querySelector(".due-task").innerHTML = dueItems
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => {
            deleteItem(i)
        })
    })
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i)=> {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}


// function func() {
//     const inputs = document.querySelectorAll(".input-controller textarea")
//     console.log(inputs[2].value)
//     console.log(typeof (inputs[2].value))
//     const lines = inputs[2].value.split('\n')
//     lines[0]=lines[0].trim()
//     console.log(lines)
//     console.log(x)
// }

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            const textLines = inputs[i].value.split('\n')
            textLines[0] = textLines[0].trim()
            textLines[1]=textLines[1].trim()
            updateItem(textLines[0],textLines[1],i)
        })
    })  
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none"
            inputs[i].disabled =true
        })
    })
}

function updateItem(datetext,TaskText, i) {
    let itemDetail = [TaskText,datetext]
    itemsArray[i] = itemDetail
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

function deleteItem(i) {
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}


function createItem(item, due) {
    let itemDetail = [item.value,due.value]
    itemsArray.push(itemDetail)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

function getTodaysDateAsString() {
    let today = new Date()
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    console.log(formattedToday)
    return formattedToday
}

function displayDate() {
    let date = new Date()
    console.log(date)
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

window.onload = function () {
    getTodaysDateAsString()
    displayDate()
    displayItems()
    // func()
}