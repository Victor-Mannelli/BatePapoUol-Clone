
let messages = document.querySelector('main ul')
let loginInput = document.querySelector('.entrance input')


function hideEntrance(selector){

    let entrance = selector.parentNode;

    const loginName = 
    { 
        name: loginInput.value
    };
    
    let answer = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',loginName);

    answer.then(() => { setInterval(getMessages, 3000), entrance.classList.add('hidden') });
    answer.catch(() => alert(`Erro: Esse nome já está em uso ou não é válido!`));
}
getMessages();
function getMessages(){
    let request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    request.then(addingMessages); 
    request.catch((error) => alert(`erro ${error.response.status}`));
}

function addingMessages(answer){
    messages.innerHTML = ""
    let messagesArray = answer.data;
    
    for (i = 0; i < messagesArray.length; i++){
        switch(messagesArray[i].type){
            case "status":
                messages.innerHTML += 
                    `
                        <li class="gray"> 
                            <p> <span class="time"> (${messagesArray[i].time}) </span> <span class="from"> ${messagesArray[i].from} </span> para <span class="from"> ${messagesArray[i].to}</span>: ${messagesArray[i].text} </p>
                        </li>
                    `
            break;
            case "private_message":
                messages.innerHTML += 
                    `
                        <li class="pink"> 
                            <p> <span class="time"> (${messagesArray[i].time}) </span> <span class="from"> ${messagesArray[i].from} </span> para <span class="from"> ${messagesArray[i].to}</span>: ${messagesArray[i].text} </p>
                        </li>
                    `
            break;
            default:
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
    let lists = document.querySelectorAll('li');
    let lastLI = lists[lists.length - 1]
    lastLI.scrollIntoView(true)
}

if(loginInput !== ""){
    setInterval(stillOnline, 5000);
}
function stillOnline(){
    const loginName = 
    { 
        name: loginInput.value
    };
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', loginName)
}
