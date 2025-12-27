document.addEventListener("DOMContentLoaded", () => {

  const launcher = document.getElementById("chatbot-launcher");
  const chatWindow = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chatbot-close");

  const userInfo = document.getElementById("chat-user-info");
  const chatMessages = document.getElementById("chat-messages");
  const chatFooter = document.querySelector(".chat-footer");

  const startBtn = document.getElementById("chat-start");
  const nameInput = document.getElementById("chat-name");
  const phoneInput = document.getElementById("chat-phone");

  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");

  let chatLog = [];
  let emailSent = false; // 🔑 prevents duplicate emails


  /* OPEN CHAT */
  launcher.addEventListener("click", () => {
  chatWindow.style.display = "flex";
  emailSent = false;
  chatLog = [];
});


  /* CLOSE CHAT */
  closeBtn.addEventListener("click", () => {

  sendChatToEmail(
    nameInput.value || "N/A",
    phoneInput.value || "N/A",
    chatLog
  );

  chatWindow.style.display = "none";
});


  /* START CHAT */
  startBtn.addEventListener("click", () => {
    if (!nameInput.value || !phoneInput.value) {
      alert("Please enter name and phone number");
      return;
    }

    userInfo.style.display = "none";
    chatMessages.style.display = "block";
    chatFooter.style.display = "flex";

    addBot(`Hi ${nameInput.value}, how can I help you?`);
  });

  /* SEND MESSAGE */
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    addUser(msg);
    input.value = "";

    setTimeout(() => {
      addBot("Thanks for reaching out. Our team will contact you shortly.");
    }, 500);
  }

 function addBot(text) {
  chatLog.push(`Bot: ${text}`);

  const div = document.createElement("div");
  div.className = "bot-msg";
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}



  function addUser(text) {
  chatLog.push(`User: ${text}`);

  const div = document.createElement("div");
  div.className = "user-msg";
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


function sendChatToEmail(name, phone, messages) {
  if (emailSent || messages.length === 0) return; // 🔒 safety

  emailSent = true;

  const subject = encodeURIComponent("New Chat Lead – Vikban Groups");

  const body = encodeURIComponent(
    `New Chat Lead\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n\n` +
    `Conversation:\n\n` +
    messages.join("\n")
  );

  window.location.href =
    `mailto:info@vikban.com,3vikram.u@gmail.com?subject=${subject}&body=${body}`;
}

  

});
