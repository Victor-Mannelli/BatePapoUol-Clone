
let messages = document.querySelector('main ul')

function hideEntrance(selector){
    let entrance = selector.parentNode;
    entrance.classList.add('hidden')
}

let request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
request.then(addingMessages);



function addingMessages(answer){
    messages.innerHTML = ""

    let messagesArray = answer.data;
    for (i = 0; i < messagesArray.length; i++){
        messages.innerHTML += 
            `
                <li> 
                    <p> <span class="time"> ${messagesArray[i].time} </span> <span class="from"> ${messagesArray[i].from} </span> para <span class="from"> ${messagesArray[i].to} </span> : ${messagesArray[i].text} </p>
                </li>
            `
    }
    
    
    console.log(messages.innerHTML)
}
