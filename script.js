
let messages = document.querySelector('main ul')
let loginInput = document.querySelector('.entrance input')
let lists = document.querySelectorAll('li');

function hideEntrance(selector){
    let entrance = selector.parentNode;
    entrance.classList.add('hidden')

    let loginName = { name: `${loginInput.value}`}
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',loginName)
}

setInterval(getMessages, 3000)
function getMessages(){
    let request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    request.then(addingMessages);
}

function addingMessages(answer){
    messages.innerHTML = ""
    let messagesArray = answer.data;
    
    for (i = 0; i < messagesArray.length; i++){
        if (messagesArray[i].type == "status"){
            messages.innerHTML += 
            `
                <li class="gray"> 
                    <p> <span class="time"> (${messagesArray[i].time}) </span> <span class="from"> ${messagesArray[i].from} </span> para <span class="from"> ${messagesArray[i].to}</span>: ${messagesArray[i].text} </p>
                </li>
            `
        } else {
            messages.innerHTML += 
            `
                <li> 
                    <p> <span class="time"> (${messagesArray[i].time}) </span> <span class="from"> ${messagesArray[i].from} </span> para <span class="from"> ${messagesArray[i].to}</span>: ${messagesArray[i].text} </p>
                </li>
            `
        }
    }
    scrollToLastMessage()
}

function scrollToLastMessage(){
    let lastLI = lists[lists.length - 1]
    lastLI.scrollIntoView(true)
}
