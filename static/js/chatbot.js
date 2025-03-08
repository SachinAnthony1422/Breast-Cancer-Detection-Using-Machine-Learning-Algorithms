// Initialize SendBird
const APP_ID = 'Y01D64470-F065-481E-89EB-933ED9BD7A1E'; // Replace with your SendBird App ID
const USER_ID = '2024'; // Replace with your user ID
const USER_NICKNAME = 'selene'; // Replace with user nickname
const CHANNEL_URL = 'sendbird_open_channel_22236_ef9a67de54b5bd73bda536400c896800b4cf6a1c'; // Replace with the URL of the channel you want to join

const sb = new SendBird({ appId: APP_ID });

function initSendBird() {
    sb.connect(USER_ID, (user, error) => {
        if (error) {
            console.error('SendBird connection error:', error);
            return;
        }
        console.log('Connected to SendBird:', user);

        // Join channel
        sb.OpenChannel.getChannel(CHANNEL_URL, (channel, error) => {
            if (error) {
                console.error('Channel error:', error);
                return;
            }

            channel.enter((response, error) => {
                if (error) {
                    console.error('Enter channel error:', error);
                    return;
                }
                console.log('Entered channel:', response);
                loadMessages(channel);
            });
        });
    });
}

function loadMessages(channel) {
    channel.createMessageListQuery().load(30, true, (messages, error) => {
        if (error) {
            console.error('Load messages error:', error);
            return;
        }
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // Clear existing messages

        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.sender.nickname}: ${message.message}`;
            messagesContainer.appendChild(messageElement);
        });
    });
}

function sendMessage(channel, messageText) {
    const userMessage = new sb.UserMessageParams();
    userMessage.message = messageText;
    channel.sendUserMessage(userMessage, (message, error) => {
        if (error) {
            console.error('Send message error:', error);
            return;
        }
        console.log('Message sent:', message);
        loadMessages(channel); // Reload messages
    });
}

document.getElementById('send-message').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText) {
        sendMessage(channel, messageText);
        messageInput.value = ''; // Clear input field
    }
});

document.getElementById('chat-close').addEventListener('click', () => {
    const chatWidget = document.getElementById('sendbird-chat');
    chatWidget.style.display = 'none'; // Hide chat widget
});

// Initialize SendBird on page load
window.onload = initSendBird;
