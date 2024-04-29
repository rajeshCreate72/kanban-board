let addBtn = document.querySelector ('.add-btn');
let rmBtn = document.querySelector('.rm-btn');

let addTaskFlag = false;
let rmTaskFlag = false;

let taskAddCont = document.querySelector('.task-cont');
let taskRemoveCont = document.querySelector('.task-cont-close');

let allPriorityColors = document.querySelectorAll('.clr-pro');
let taskTextArea = document.querySelector('.text-cont');
let taskColor = 'bg-black';

let ticketArray = [];

let mainTicketContainer = document.querySelector('.main-tkt-cont');

taskRemoveCont.addEventListener('click', function() {
    // Set the display of the task conter to none
    addTaskFlag = !addTaskFlag;
    taskAddCont.style.display = 'none';
})

addBtn.addEventListener('click', function() {
    addTaskFlag = !addTaskFlag;
    if (addTaskFlag === true) {
        // Set the display of the task continer to flex
        taskAddCont.style.display = 'flex';
    }else {
        // Set the display of the task conter to none
        taskAddCont.style.display = 'none';
    }
})

rmBtn.addEventListener('click', function() {
    rmTaskFlag = !rmTaskFlag;
    if (rmTaskFlag) {
        rmBtn.classList.add('bg-red-900');
        rmBtn.classList.remove('bg-gray-600');
        rmBtn.querySelector('i').style.color = 'red';
    }
    else {
        rmBtn.classList.add('bg-gray-600');
        rmBtn.classList.remove('bg-red-900');
        rmBtn.querySelector('i').style.color = 'white';
    }
})

allPriorityColors.forEach((clrEle) => {
    clrEle.addEventListener('click', function() {
        // Set the other element's border to none except selected
        allPriorityColors.forEach((ele) => {
            ele.classList.remove('active');
        });
        clrEle.classList.add('active');
        taskColor = clrEle.classList[2];
        console.log(clrEle.classList);
    });
})

taskAddCont.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === 'Enter' && event.shiftKey) {
        console.log('Save the task');
        createTicket(taskColor, taskTextArea.value);
        taskAddCont.style.display = 'none';
        taskTextArea.value = '';
    }
});

function createTicket(taskClr, task) {
    const id = shortid();
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute('class', 'ticket-cont');
    ticketCont.innerHTML = `
        <div class="ticket-clr ${taskClr}"></div>
        <div class="ticket-text ${id}">${task}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>
    `;
    mainTicketContainer.appendChild(ticketCont);
    handleTicketLock();
    handleTicketColor();
    handleTicketRemove(ticketCont, id);
    ticketArray.push({taskClr, task, tktId: id});
    console.log(ticketArray)
}

function handleTicketLock() {

}

function handleTicketColor() {

}

function handleTicketRemove(ticket, id) {
    ticket.addEventListener('click', function() {
        if(!rmTaskFlag) return;
        ticket.remove();
        getTicketInd(id);
    })
}

function getTicketInd(id) {
    let ticketId = ticketArray.findIndex((tktObj) => {
        return tktObj.tktId === id;
    })
    return ticketId[0];
}




