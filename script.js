
let messages = document.querySelector('main ul');
let loginInput = document.querySelector('.entrance input');
let messageInput = document.querySelector('.messages-deliver');

function hideEntrance(selector){

    let entrance = selector.parentNode;

    const loginName = 
    { 
        name: loginInput.value
    };
    
    let answer = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',loginName);

    answer.then(() => { setInterval(getMessages, 3000), entrance.classList.add('hidden'), setInterval(stillOnline, 5000), setInterval(loadingParticipants, 3000)});
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

function stillOnline(){
    const loginName = 
    { 
        name: loginInput.value
    };
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', loginName);
}

function sendingMessages(){

    let message = 
    {
        from: `${loginInput.value}`,
        to: "Todos",
        text: `${messageInput.value}`,
        type: "message"
    }
    let messagesSent = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    messagesSent.then(() => getMessages(), messageInput.value = "");
    messagesSent.catch(() => window.location.reload());

}
messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".enterKey").click();
    }
})

function chooseContact(){
    let contactScreen = document.querySelector('.contact-screen');
    contactScreen.classList.toggle('hidden')
}

loadingParticipants()
function loadingParticipants(){
    let participants = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    participants.then(showOnlinePeople);
}
function showOnlinePeople(answer){
    console.log(answer.data)
    let onlineList = document.querySelector('.people-online');
    onlineList.innerHTML = "";

    for (i = 0; i < answer.data.length; i++){
        onlineList.innerHTML += `
        <div class="row"> 
            <ion-icon name="person-circle"></ion-icon>
            <h2> ${answer.data[i].name} </h2>
        </div>
    `
    }
    
}