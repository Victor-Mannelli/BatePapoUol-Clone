
let messages = document.querySelector('main ul');
let loginInput = document.querySelector('.entrance input');
let messageInput = document.querySelector('.messages-deliver');
let CsRsbottom = document.querySelector('.CS-RS-bottom');
let loadingEntrance = document.querySelector('.loading-entrance')
let messageInputUnderlineText = document.querySelector('.message-input-underlinetext');


function hideEntrance(selector){
    let entrance = selector.parentNode;
    entrance.classList.add('hidden')

    const loginName = 
    { 
        name: loginInput.value
    };
    
    let answer = axios.post('https://mock-api.driven.com.br/api/v2/uol/participants',loginName);

    answer.then(() => {setInterval(getMessages, 3000), loadingEntrance.classList.add('hidden'), setInterval(stillOnline, 5000), setInterval(loadingParticipants, 10000)});
    answer.catch(() => {entrance.classList.remove('hidden'), alert(`Erro: Esse nome já está em uso ou não é válido!`)});
}
getMessages();
function getMessages(){
    let request = axios.get('https://mock-api.driven.com.br/api/v2/uol/messages');
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
                        <li data-identifier="visibility" class="gray"> 
                            <p> <span class="time"> (${messagesArray[i].time}) </span> <span class="from"> ${messagesArray[i].from} </span> para <span class="from"> ${messagesArray[i].to}</span>: ${messagesArray[i].text} </p>
                        </li>
                    `
            break;
            case "private_message":
                messages.innerHTML += 
                    `
                        <li data-identifier="visibility" class="pink"> 
                            <p> <span class="time"> (${messagesArray[i].time}) </span> <span class="from"> ${messagesArray[i].from} </span> reservadamente para <span class="from"> ${messagesArray[i].to}</span>: ${messagesArray[i].text} </p>
                        </li>
                    `
            break;
            default:
                messages.innerHTML += 
                    `
                        <li data-identifier="visibility"> 
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
    axios.post('https://mock-api.driven.com.br/api/v2/uol/status', loginName);
}

function sendingMessages(){

    if (window.selectedContact === undefined || window.selectedMessageType === undefined){
        window.selectedContact = "Todos"
        window.selectedMessageType = "message" 
    }
    let message = 
        {
        from: `${loginInput.value}`,
        to: `${window.selectedContact}`,
        text: `${messageInput.value}`,
        type: `${window.selectedMessageType}`
    }

    let messagesSent = axios.post('https://mock-api.driven.com.br/api/v2/uol/messages', message);
    messagesSent.then(() => getMessages(), messageInput.value = "");
    messagesSent.catch(() => window.location.reload());

}
messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".enter-key").click();
    }
})
loginInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".login-button").click();
    }
})

function chooseContact(){
    let contactScreen = document.querySelector('.contact-screen');
    contactScreen.classList.toggle('hidden')
}

loadingParticipants()
function loadingParticipants(){
    let participants = axios.get('https://mock-api.driven.com.br/api/v2/uol/participants')
    participants.then(showOnlinePeople);
}
function showOnlinePeople(answer){
    let onlineList = document.querySelector('.people-online');
    onlineList.innerHTML = "";

    for (i = 0; i < answer.data.length; i++){
        onlineList.innerHTML += 
        `
        <div data-identifier="participant" class="online-members row" onclick="contactSelector(this)"> 
            <div class="row">
                <ion-icon name="person-circle"></ion-icon>
                <h2>${answer.data[i].name}</h2>
            </div>
            <div class="v-check hidden"> <ion-icon name="checkmark-sharp"></ion-icon> </div>
        </div>
        `
    }
}

function contactSelector(selector){
    
    let all = document.querySelector('.all')
    let divRow = selector.children[0]
    window.selectedContact = divRow.children[1].innerHTML
    
    let onlineMembers = document.querySelectorAll('.online-members')
    for (i = 0; i < onlineMembers.length; i++){
        if (!onlineMembers[i].children[1].classList.contains('hidden')){
            onlineMembers[i].children[1].classList.add('hidden')
            all.classList.add('hidden')
            messageInputUnderlineText.innerHTML = `Enviando para ${window.selectedContact} (reservadamente)`
        }
        all.classList.add('hidden')
        messageInputUnderlineText.innerHTML = `Enviando para ${window.selectedContact} (reservadamente)`
    }
    let divVCheck = selector.children[1]
    divVCheck.classList.remove('hidden')

}
function messageTypeSelector(selector){
    let type = selector.children[0].children[1].innerHTML
    if (type === "Público"){
        window.selectedMessageType = "message";
        messageInputUnderlineText.innerHTML = ""
    } else if (type === "Reservadamente"){
        window.selectedMessageType = "private_message";
        if (window.selectedContact !== undefined){
            messageInputUnderlineText.innerHTML = `Enviando para ${window.selectedContact} (reservadamente)`
        } else { 
            messageInputUnderlineText.innerHTML = `Enviando para Todos (reservadamente)`
        }
    }
    
    let vCheck1 = CsRsbottom.children[2].children[1]
    let vCheck2 = CsRsbottom.children[1].children[1]

    if (!vCheck1.classList.contains('hidden')){
        vCheck1.classList.add('hidden')
    }
    if (!vCheck2.classList.contains('hidden')){
        vCheck2.classList.add('hidden')
    }

    let divVCheck = selector.children[1]
    divVCheck.classList.remove('hidden')
}