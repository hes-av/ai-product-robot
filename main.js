// Documentation Site Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    const sections = document.querySelectorAll('main section');

    function showSection(id) {
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to target link and section
        const targetLink = document.querySelector(`#sidebar-nav a[href="${id}"]`);
        const targetSection = document.querySelector(id);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0);
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Handle initial load (hash in URL)
    if (window.location.hash) {
        showSection(window.location.hash);
    }

    // Handle link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, id);
                showSection(id);
            }
        });
    });

    // Handle footer link clicks
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, id);
                showSection(id);
            }
        });
    });

    // Simple search placeholder functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert('검색 기능은 현재 준비 중입니다. 좌측 내비게이션을 이용해 주세요.');
                searchInput.value = '';
            }
        });
    }

    // ==========================================
    // AI Chatbot Widget Logic
    // ==========================================
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');

    // API Key (Note: In production, use a backend proxy)
    const GEMINI_API_KEY = 'api키 입력'; 

    if (chatToggle && chatWindow && closeChat) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.add('active');
            chatToggle.style.display = 'none';
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            chatToggle.style.display = 'flex';
        });
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function fetchGeminiResponse(userText) {
        addMessage('분석 중입니다...', 'bot'); 
        const loadingMsg = chatMessages.lastChild;

        try {
            const systemPrompt = "당신은 영상장비 전문 기업 '훈민아이테크'의 수석 기술 상담원입니다. 프로젝터, LED 전광판, 3D 맵핑에 대해 전문가적인 답변을 제공합니다. 특정 브랜드를 언급하지 말고 기술적 원리와 솔루션 중심으로 답변하세요. 간결하게 3문장 이내로 대답하세요. 질문: ";
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt + userText }] }]
                })
            });

            const data = await response.json();
            chatMessages.removeChild(loadingMsg);

            if (data.candidates && data.candidates.length > 0) {
                const botReply = data.candidates[0].content.parts[0].text;
                addMessage(botReply, 'bot');
            } else {
                addMessage("현재 기술 지원 센터와 연결이 어렵습니다. 잠시 후 다시 시도해 주세요.", 'bot');
            }
        } catch (error) {
            if (loadingMsg) chatMessages.removeChild(loadingMsg);
            addMessage("네트워크 오류가 발생했습니다. 나중에 다시 시도해 주세요.", 'bot');
            console.error('Gemini Error:', error);
        }
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        chatInput.value = '';
        fetchGeminiResponse(text);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // Web Speech API for Voice Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.interimResults = false;

        micBtn.addEventListener('click', () => {
            try {
                recognition.start();
                micBtn.classList.add('recording');
            } catch (e) {
                console.error("Speech Recognition Error:", e);
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            micBtn.classList.remove('recording');
            handleSend();
        };

        recognition.onerror = () => {
            micBtn.classList.remove('recording');
            alert("음성 인식 오류가 발생했습니다. 마이크 권한을 확인해 주세요.");
        };

        recognition.onend = () => {
            micBtn.classList.remove('recording');
        };
    } else if (micBtn) {
        micBtn.style.display = 'none';
    }
});
