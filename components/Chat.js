import { supabase } from '../utils/supabaseClient';
import Avatar from './Avatar';

const messagesElement = document.querySelector('#messages');

function addMessageToPage(message) {
    const element = document.createElement('li');
    element.classList.add('card','m-2');
    element.innerHTML = `
    <div class="card-body">
        <div class="row"
            <div class="col-sm-2 avatar-container">
                <img src="${<Avatar
                    url={buddy?.avatar_url}
                    className="w-20 h-20 rounded-full"
                    showUpload={false}
                />}">
                <p class="avatar-username">${message.username}</p>
            </div>
            <div class="col-sm-10>
                <p>${message.content}</p>
            </div>
        </div>
        <div class="row">
            <p class="col-sm-12 timestamp">${message.created_at}</p>
        </div>
    </div>
    `;
    messagesElement.append(message);

    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
    }, 300)
    
}

const form = document.querySelector('form');
const contentElement = document.querySelector('#content');

async function init() {
   
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const message = {
            username: formData.get('username'),
            content: formData.get('content'),
        };
        contentElement.value = '';
        supabase
            .from('messages')
            .insert([
                message,
            ]).then(() => {
                console.log('Message Sent!');
            });
    });

    const { data: messages, error } = await supabase
    .from('messages')
    .select('*');

messages.forEach(addMessageToPage);

supabase
    .from('messages')
    .on('INSERT', (message) => {
        addMessageToPage(message.new);
    })
    .subscribe();
}

init();