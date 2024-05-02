let addBtn = document.querySelector ('.add-btn');
let rmBtn = document.querySelector('.rm-btn');

let addTaskFlag = false;
let rmTaskFlag = false;

let taskAddCont = document.querySelector('.task-cont');
let taskRemoveCont = document.querySelector('.task-cont-close');

let allPriorityColors = document.querySelectorAll('.clr-pro');
let taskTextArea = document.querySelector('.text-cont');
let taskColor = 'bg-black';

let lockClass = 'fa-lock'
let unlockClass = 'fa-lock-open'

let ticketArray = [];

let mainTicketContainer = document.querySelector('.main-tkt-cont');

let toolBoxClrs = document.querySelectorAll('.clr-filter');

if (localStorage.getItem('tickets')) {
    ticketArray = JSON.parse(localStorage.getItem('tickets'));
    ticketArray.forEach(function(ticket) {
        createTicket(ticket.taskClr, ticket.task, ticket.taskId);
    })
}

// Filtering the tickets after seletion of the colours at nav bar
for(let i=0; i<toolBoxClrs.length; i++) {
    toolBoxClrs[i].addEventListener('click', function() {
        let selectedToolBoxclr = toolBoxClrs[i].classList[2]; // Seleting the color from the div in html
        let filterTkts = ticketArray.filter(function(ticket) {
            return selectedToolBoxclr === ticket.taskClr;
        });
        let allTktsRm = document.querySelectorAll('.ticket-cont');
        for(let i=0; i<allTktsRm.length; i++) {
            allTktsRm[i].remove();
        }

        filterTkts.forEach(function(tickets) {
            createTicket(tickets.taskClr, tickets.task, tickets.taskId);
        })
    });

    toolBoxClrs[i].addEventListener('dblclick', function() {
        let allTktsRm = document.querySelectorAll('.ticket-cont');
        for(let i=0; i<allTktsRm.length; i++) {
            allTktsRm[i].remove();
        }

        ticketArray.forEach(function(tickets) {
            createTicket(tickets.taskClr, tickets.task, tickets.taskId);
        })
    })
}

taskRemoveCont.addEventListener('click', function() {
    // Set the display of the task conter to none
    addTaskFlag = !addTaskFlag;
    if (!addTaskFlag) {
        taskAddCont.style.display = 'none';
    }
    taskTextArea.value = '';
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
    if (key === 'Enter') {
        addTaskFlag = !addTaskFlag;
        console.log('Save the task');
        createTicket(taskColor, taskTextArea.value);
        taskAddCont.style.display = 'none';
        taskTextArea.value = '';
    }
});

function createTicket(taskClr, task, taskID) {
    const id = taskID || shortid();
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute('class', 'ticket-cont');
    ticketCont.innerHTML = `
        <div class="ticket-cont p-3 bg-gray-500">
            <div class="ticket-clr ${taskClr}"></div>
            <div class="ticket-text ${id}">${task}</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock text-2xl" aria-hidden="true"></i>
            </div>
        </div>
    `;
    mainTicketContainer.appendChild(ticketCont);
    handleTicketLock(ticketCont, id);
    handleTicketColor();
    handleTicketRemove(ticketCont, id);
    if (!taskID) {
        ticketArray.push({taskClr, task, taskId: id});
        localStorage.setItem('tickets', JSON.stringify(ticketArray))
    }
    console.log(ticketArray);

}

function handleTicketLock(ticket, id) {
    let ticketLockEle = ticket.querySelector('.ticket-lock');
    let ticketLockIcon = ticketLockEle.children[0];
    let ticketTaskArea = ticket.querySelector('.ticket-text');

    ticketLockIcon.addEventListener('click', function() {
        let ticketInd = getTicketInd(id);
        if (ticketLockIcon.classList.contains(lockClass)) {
            ticketLockIcon.classList.add(unlockClass);
            ticketLockIcon.classList.remove(lockClass);
            ticketTaskArea.setAttribute('contenteditable', true);
        } else {
            ticketLockIcon.classList.add(lockClass);
            ticketLockIcon.classList.remove(unlockClass);
            ticketTaskArea.setAttribute('contenteditable', false);
        }
        ticketArray[ticketInd].task = ticketTaskArea.innerHTML;
        localStorage.setItem('tickets', JSON.stringify(ticketArray));
    })
}

function handleTicketColor() {

}

function handleTicketRemove(ticket, id) {
    ticket.addEventListener('click', function() {
        if(!rmTaskFlag) return;
        ticket.remove();
        let ind = getTicketInd(id);
        let dltEle = ticketArray.splice(ind, 1);
        localStorage.setItem('tickets', JSON.stringify(ticketArray));
        console.log(dltEle);
    })
}

function getTicketInd(id) {
    let ticketId = ticketArray.findIndex((tktObj) => {
        return tktObj.taskId === id;
    })
    return ticketId;
}




