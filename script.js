// ===== GLOBAL STATE & INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initApp();
    
    // Sample data for community feed
    const samplePosts = [
        {
            id: 1,
            author: "Sarah Johnson",
            avatar: "fas fa-user-circle",
            time: "2 hours ago",
            type: "question",
            content: "Does anyone have recommendations for a good dog trainer in the Seattle area? My golden retriever needs some basic obedience training.",
            likes: 12,
            comments: 8
        },
        {
            id: 2,
            author: "Mike Chen",
            avatar: "fas fa-user-circle",
            time: "5 hours ago",
            type: "photo",
            content: "Took my cat Luna to the park today! She was hesitant at first but ended up loving the sunshine.",
            likes: 24,
            comments: 15
        },
        {
            id: 3,
            author: "Jamie Rodriguez",
            avatar: "fas fa-user-circle",
            time: "1 day ago",
            type: "story",
            content: "Our rescue dog Max has finally learned to trust us after 3 months. It's amazing to see his transformation from a scared pup to a happy family member.",
            likes: 42,
            comments: 22
        }
    ];
    
    // Initialize feed with sample posts
    initializeFeed(samplePosts);
    
    // Setup animations
    setupAnimations();
});

// ===== APP INITIALIZATION =====
function initApp() {
    // Navigation functionality
    setupNavigation();
    
    // Community feed functionality
    setupCommunityFeatures();
    
    // AI assistant functionality
    setupAIAssistant();
    
    // Profile functionality
    setupProfileFeatures();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Initial page load animation
    animatePageLoad();
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    // Trigger section entrance animation
                    animateSectionEntrance(section);
                }
            });
            
            // Close mobile menu if open
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Home page buttons for navigation
    document.getElementById('joinCommunityBtn')?.addEventListener('click', function() {
        document.querySelector('[data-section="community"]').click();
    });
    
    document.getElementById('tryAssistantBtn')?.addEventListener('click', function() {
        document.querySelector('[data-section="assistant"]').click();
    });
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                animateMobileMenu(navLinks);
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// ===== COMMUNITY FEED =====
function initializeFeed(posts) {
    const feedContainer = document.getElementById('communityFeed');
    
    if (!feedContainer) return;
    
    // Clear loading state if any
    feedContainer.innerHTML = '';
    
    // Add posts to feed
    posts.forEach(post => {
        const postElement = createPostElement(post);
        feedContainer.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-card';
    postElement.dataset.type = post.type;
    
    // Determine type color and icon
    let typeIcon = '';
    switch(post.type) {
        case 'question':
            typeIcon = '<i class="fas fa-question-circle"></i>';
            break;
        case 'photo':
            typeIcon = '<i class="fas fa-camera"></i>';
            break;
        case 'story':
            typeIcon = '<i class="fas fa-book"></i>';
            break;
    }
    
    postElement.innerHTML = `
        <div class="post-header">
            <div class="post-author-info">
                <div class="post-author-avatar">
                    <i class="${post.avatar}"></i>
                </div>
                <div class="post-author-details">
                    <h4>${post.author}</h4>
                    <span>${post.time}</span>
                </div>
            </div>
            <div class="post-type ${post.type}">
                ${typeIcon} ${post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
        </div>
        ${post.type === 'photo' ? `
        <div class="post-image">
            <i class="fas fa-paw"></i>
        </div>
        ` : ''}
        <div class="post-actions-bar">
            <button class="post-action-btn like-btn" data-id="${post.id}">
                <i class="fas fa-heart"></i>
                <span class="like-count">${post.likes}</span> Likes
            </button>
            <button class="post-action-btn">
                <i class="fas fa-comment"></i>
                ${post.comments} Comments
            </button>
            <button class="post-action-btn">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
    `;
    
    return postElement;
}

function setupCommunityFeatures() {
    const submitPostBtn = document.getElementById('submitPost');
    const postContent = document.getElementById('postContent');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postOptionButtons = document.querySelectorAll('.post-option-btn');
    const feedContainer = document.getElementById('communityFeed');
    
    // Submit new post
    if (submitPostBtn) {
        submitPostBtn.addEventListener('click', function() {
            const content = postContent.value.trim();
            
            if (content === '') {
                alert('Please write something before posting!');
                return;
            }
            
            // Determine post type from active option button
            let postType = 'story';
            postOptionButtons.forEach(btn => {
                if (btn.classList.contains('active')) {
                    postType = btn.getAttribute('data-type');
                }
            });
            
            // Create new post
            const newPost = {
                id: Date.now(),
                author: "You",
                avatar: "fas fa-user-circle",
                time: "Just now",
                type: postType,
                content: content,
                likes: 0,
                comments: 0
            };
            
            // Add to feed
            const postElement = createPostElement(newPost);
            if (feedContainer.firstChild) {
                feedContainer.insertBefore(postElement, feedContainer.firstChild);
            } else {
                feedContainer.appendChild(postElement);
            }
            
            // Animate new post
            animateNewPost(postElement);
            
            // Clear input
            postContent.value = '';
            
            // Show success message
            showNotification('Post published to community!', 'success');
        });
    }
    
    // Filter posts
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterType = this.getAttribute('data-filter');
            filterPosts(filterType);
        });
    });
    
    // Post type selection
    postOptionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            postOptionButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Like button functionality (delegated)
    if (feedContainer) {
        feedContainer.addEventListener('click', function(e) {
            if (e.target.closest('.like-btn')) {
                const likeBtn = e.target.closest('.like-btn');
                const likeCount = likeBtn.querySelector('.like-count');
                let count = parseInt(likeCount.textContent);
                
                // Toggle like state
                if (likeBtn.classList.contains('liked')) {
                    likeBtn.classList.remove('liked');
                    count--;
                    likeBtn.innerHTML = '<i class="fas fa-heart"></i> ' + count + ' Likes';
                } else {
                    likeBtn.classList.add('liked');
                    count++;
                    likeBtn.innerHTML = '<i class="fas fa-heart" style="color: #F44336"></i> ' + count + ' Likes';
                    
                    // Add animation to heart icon
                    const heartIcon = likeBtn.querySelector('i');
                    animateLike(heartIcon);
                }
                
                likeCount.textContent = count;
            }
        });
    }
}

function filterPosts(filterType) {
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        if (filterType === 'all' || post.dataset.type === filterType) {
            post.style.display = 'block';
            // Add animation for filtered items
            anime({
                targets: post,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 400,
                easing: 'easeOutQuad'
            });
        } else {
            post.style.display = 'none';
        }
    });
}

// ===== AI ASSISTANT =====
function setupAIAssistant() {
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickButtons = document.querySelectorAll('.quick-btn');
    
    // Send message function
    function sendMessage() {
        const messageText = chatInput.value.trim();
        
        if (messageText === '') return;
        
        // Add user message
        addMessageToChat('user', messageText);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI thinking delay
        setTimeout(() => {
            // Generate AI response
            const aiResponse = generateAIResponse(messageText);
            addMessageToChat('ai', aiResponse);
        }, 1000 + Math.random() * 1000);
    }
    
    // Send message on button click
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Quick question buttons
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });
}

function addMessageToChat(sender, text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
            <div class="message-time">Just now</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // Animate message entrance
    anime({
        targets: messageDiv,
        opacity: [0, 1],
        translateX: sender === 'user' ? [20, 0] : [-20, 0],
        duration: 400,
        easing: 'easeOutQuad'
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(question) {
    // Simplified AI response logic - in a real app, this would call an API
    const responses = {
        'dog': [
            "For dogs, I recommend regular exercise, a balanced diet, and consistent training. Socialization is also key for their development.",
            "Dogs thrive on routine. Make sure to establish consistent feeding, walking, and play times.",
            "Common dog issues include separation anxiety and leash pulling. Positive reinforcement training works best."
        ],
        'cat': [
            "Cats need vertical spaces to climb and hide. Consider getting a cat tree or shelves.",
            "Cats are obligate carnivores, so a high-protein diet is essential for their health.",
            "Regular play with interactive toys helps prevent boredom and behavior issues in cats."
        ],
        'food': [
            "Look for pet food with high-quality protein as the first ingredient and minimal fillers.",
            "The right food depends on your pet's age, breed, and health conditions. Consult your vet for personalized advice.",
            "Some pets have food sensitivities. If you notice itching or digestive issues, try an elimination diet."
        ],
        'train': [
            "Positive reinforcement is the most effective training method. Reward good behavior immediately.",
            "Keep training sessions short (5-10 minutes) and end on a positive note.",
            "Consistency is key in training. Everyone in the household should use the same commands and rules."
        ],
        'anxious': [
            "For anxiety, try creating a safe space, using calming supplements, or consulting a vet about behavioral solutions.",
            "Some pets benefit from anxiety wraps or calming pheromone diffusers.",
            "Regular exercise and mental stimulation can help reduce anxiety in pets."
        ]
    };
    
    // Check for keywords in question
    question = question.toLowerCase();
    let category = 'general';
    
    if (question.includes('dog')) category = 'dog';
    else if (question.includes('cat')) category = 'cat';
    else if (question.includes('food') || question.includes('diet') || question.includes('eat')) category = 'food';
    else if (question.includes('train') || question.includes('behavior')) category = 'train';
    else if (question.includes('anxious') || question.includes('anxiety') || question.includes('scared')) category = 'anxious';
    
    // Get random response from category
    const categoryResponses = responses[category] || [
        "That's a great question about pet care! I recommend consulting with your veterinarian for personalized advice.",
        "I'm here to help with pet care questions. Could you provide more details about your situation?",
        "Many pet parents have similar questions. I suggest checking our community forum for shared experiences."
    ];
    
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    let response = categoryResponses[randomIndex];
    
    // Add AI signature
    response += "\n\n*This is simulated AI advice. Always consult a veterinarian for medical concerns.*";
    
    return response;
}

// ===== PROFILE FEATURES =====
function setupProfileFeatures() {
    const addPetBtn = document.getElementById('addPetBtn');
    
    if (addPetBtn) {
        addPetBtn.addEventListener('click', function() {
            showNotification('Pet profile feature coming soon!', 'info');
            
            // Animation for the button
            anime({
                targets: this,
                scale: [1, 1.1, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });
        });
    }
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Animate floating pets in hero section
    animateFloatingPets();
    
    // Animate feature cards on scroll
    setupScrollAnimations();
}

function animatePageLoad() {
    // Animate logo
    anime({
        targets: '.logo',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: 'easeOutQuad'
    });
    
    // Animate hero content with staggered delay
    anime({
        targets: '.hero-content > *',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(200),
        easing: 'easeOutQuad'
    });
    
    // Animate floating pets
    const pets = document.querySelectorAll('.pet-icon');
    anime({
        targets: pets,
        translateY: function() {
            return [0, anime.random(-15, 15)];
        },
        duration: 2000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: anime.stagger(200)
    });
}

function animateSectionEntrance(section) {
    // Animate section title
    anime({
        targets: section.querySelector('.section-title'),
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        easing: 'easeOutQuad'
    });
    
    // Animate section content with delay
    anime({
        targets: section.querySelectorAll('.section-subtitle, .community-container, .assistant-container, .profile-container'),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 200,
        easing: 'easeOutQuad'
    });
}

function animateFloatingPets() {
    const pets = document.querySelectorAll('.pet-icon');
    
    pets.forEach((pet, index) => {
        anime({
            targets: pet,
            translateY: {
                value: ['0px', '-20px', '0px'],
                duration: 2000 + index * 300,
                easing: 'easeInOutSine',
                loop: true
            },
            rotate: {
                value: ['0deg', '10deg', '0deg', '-10deg', '0deg'],
                duration: 3000 + index * 400,
                easing: 'easeInOutSine',
                loop: true
            },
            delay: index * 200
        });
    });
}

function animateNewPost(postElement) {
    // Highlight the new post
    anime({
        targets: postElement,
        backgroundColor: ['rgba(255, 245, 220, 0)', 'rgba(255, 245, 220, 1)', 'rgba(255, 255, 255, 1)'],
        duration: 1500,
        easing: 'easeOutQuad'
    });
    
    // Bounce animation
    anime({
        targets: postElement,
        translateY: [-50, 0],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'spring(1, 80, 10, 0)'
    });
}

function animateLike(heartIcon) {
    anime({
        targets: heartIcon,
        scale: [1, 1.5, 1],
        duration: 400,
        easing: 'easeOutQuad'
    });
}

function animateMobileMenu(menu) {
    const menuItems = menu.querySelectorAll('a');
    
    anime({
        targets: menuItems,
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: anime.stagger(100),
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function setupScrollAnimations() {
    // Animate feature cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card, .ai-feature-card, .suggestion-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification
    anime({
        targets: notification,
        translateX: ['100%', '0%'],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuad',
        complete: function() {
            // Remove after delay
            setTimeout(() => {
                anime({
                    targets: notification,
                    translateX: ['0%', '100%'],
                    opacity: [1, 0],
                    duration: 400,
                    easing: 'easeInQuad',
                    complete: function() {
                        notification.remove();
                    }
                });
            }, 3000);
        }
    });
}
