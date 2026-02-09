// ===== CONTACT PAGE FUNCTIONS =====
function handleContactSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        submitBtn.style.background = 'var(--success-color)';

        // Reset form
        form.reset();

        // Show success message
        showNotification('Your message has been sent successfully! We\'ll respond within 24 hours.', 'success');

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
}

function openGoogleMaps() {
    const address = "123 EV Boulevard, San Francisco, CA 94105";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

function copyAddress() {
    const address = "123 EV Boulevard, San Francisco, CA 94105";

    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = address;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show success message
    showNotification('Address copied to clipboard!', 'success');
}

function callUs() {
    window.location.href = 'tel:+1-800-CHARGE';
}

function startLiveChat() {
    // Placeholder for live chat functionality
    showNotification('Live chat feature coming soon!', 'info');
}

function openHelpCenter() {
    // Placeholder for help center
    showNotification('Help center coming soon!', 'info');
}

function openSocialMedia() {
    // Placeholder for social media
    showNotification('Follow us on Twitter, Facebook, and Instagram!', 'info');
    // In production, this could open a social media links modal or redirect
}

function openForum() {
    // Placeholder for community forum
    showNotification('Community forum coming soon!', 'info');
    // In production, this would redirect to the forum page
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.nextElementSibling;
    const icon = element.querySelector('i');

    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        element.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Close other FAQ items
        document.querySelectorAll('.faq-answer.active').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.faq-question.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('i').style.transform = 'rotate(0deg)';
        });

        answer.classList.add('active');
        element.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== LEAFLET MAP FUNCTIONALITY =====
let map;

function initMap() {
    // ChargeNet EV Headquarters coordinates (San Francisco)
    const headquarters = [37.7749, -122.4194];

    // Initialize the map
    map = L.map('googleMap').setView(headquarters, 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create custom icon for headquarters
    const headquartersIcon = L.divIcon({
        html: `
            <div style="
                background: #0066cc;
                border: 3px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
                <i class="fas fa-charging-station" style="color: white; font-size: 16px;"></i>
            </div>
        `,
        iconSize: [40, 40],
        className: 'custom-div-icon'
    });

    // Add headquarters marker
    const marker = L.marker(headquarters, { icon: headquartersIcon }).addTo(map);

    // Create popup content
    const popupContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 10px; min-width: 250px;">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">ChargeNet EV Headquarters</h3>
            <div style="margin-bottom: 8px;">
                <i class="fas fa-map-marker-alt" style="color: #0066cc; margin-right: 8px;"></i>
                <span style="color: #666; font-size: 14px;">123 EV Boulevard, San Francisco, CA 94105</span>
            </div>
            <div style="margin-bottom: 8px;">
                <i class="fas fa-phone" style="color: #0066cc; margin-right: 8px;"></i>
                <a href="tel:+1-800-CHARGE" style="color: #0066cc; text-decoration: none; font-size: 14px;">1-800-CHARGE</a>
            </div>
            <div style="margin-bottom: 8px;">
                <i class="fas fa-envelope" style="color: #0066cc; margin-right: 8px;"></i>
                <a href="mailto:info@chargenetev.com" style="color: #0066cc; text-decoration: none; font-size: 14px;">info@chargenetev.com</a>
            </div>
            <div style="margin-bottom: 15px;">
                <i class="fas fa-clock" style="color: #0066cc; margin-right: 8px;"></i>
                <span style="color: #666; font-size: 14px;">Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM</span>
            </div>
            <div style="display: flex; gap: 8px;">
                <button onclick="getDirections()" style="
                    background: #0066cc;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                ">
                    <i class="fas fa-directions"></i>
                    Directions
                </button>
                <button onclick="copyAddress()" style="
                    background: white;
                    color: #0066cc;
                    border: 1px solid #0066cc;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                ">
                    <i class="fas fa-copy"></i>
                    Copy
                </button>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent).openPopup();

    // Add nearby charging stations
    addNearbyStations();
}

function addNearbyStations() {
    // Sample nearby charging stations
    const nearbyStations = [
        {
            name: "Downtown Plaza Station",
            position: [37.7849, -122.4094],
            address: "456 Market Street, San Francisco, CA",
            type: "fast"
        },
        {
            name: "Tech Hub Station",
            position: [37.7649, -122.4294],
            address: "789 Tech Boulevard, San Francisco, CA",
            type: "ultra-fast"
        },
        {
            name: "Airport Express Station",
            position: [37.7549, -122.4394],
            address: "321 Airport Road, San Francisco, CA",
            type: "standard"
        }
    ];

    nearbyStations.forEach(station => {
        const color = station.type === 'ultra-fast' ? '#ff6600' : station.type === 'fast' ? '#00cc66' : '#0066cc';

        const stationIcon = L.divIcon({
            html: `
                <div style="
                    background: ${color};
                    border: 2px solid white;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                ">
                    <i class="fas fa-bolt" style="color: white; font-size: 12px;"></i>
                </div>
            `,
            iconSize: [30, 30],
            className: 'custom-div-icon'
        });

        const stationMarker = L.marker(station.position, { icon: stationIcon }).addTo(map);

        const stationPopup = `
            <div style="font-family: 'Inter', sans-serif; padding: 10px; min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; color: #333; font-size: 14px;">${station.name}</h4>
                <div style="margin-bottom: 8px;">
                    <i class="fas fa-map-marker-alt" style="color: ${color}; margin-right: 8px;"></i>
                    <span style="color: #666; font-size: 12px;">${station.address}</span>
                </div>
                <div style="margin-bottom: 12px;">
                    <i class="fas fa-bolt" style="color: ${color}; margin-right: 8px;"></i>
                    <span style="color: #666; font-size: 12px;">${station.type.charAt(0).toUpperCase() + station.type.slice(1)} Charging</span>
                </div>
                <button onclick="getDirectionsToStation(${station.position[0]}, ${station.position[1]})" style="
                    background: ${color};
                    color: white;
                    border: none;
                    padding: 6px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                ">
                    <i class="fas fa-directions"></i>
                    Directions
                </button>
            </div>
        `;

        stationMarker.bindPopup(stationPopup);
    });
}

function getDirections() {
    const destination = "123 EV Boulevard, San Francisco, CA 94105";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
}

function getDirectionsToStation(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

function toggleMapFullscreen() {
    const mapContainer = document.querySelector('.map-container');
    const mapElement = document.getElementById('googleMap');

    if (mapContainer.classList.contains('fullscreen')) {
        mapContainer.classList.remove('fullscreen');
        mapElement.style.height = '400px';
        mapContainer.style.position = 'relative';
        mapContainer.style.zIndex = '1';
        mapContainer.style.width = '100%';
        mapContainer.style.height = '400px';
        mapContainer.style.top = 'auto';
        mapContainer.style.left = 'auto';

        // Recenter the map
        map.invalidateSize();
        map.setView([37.7749, -122.4194], 15);
    } else {
        mapContainer.classList.add('fullscreen');
        mapElement.style.height = '100vh';
        mapContainer.style.position = 'fixed';
        mapContainer.style.zIndex = '9999';
        mapContainer.style.top = '0';
        mapContainer.style.left = '0';
        mapContainer.style.width = '100vw';
        mapContainer.style.height = '100vh';

        // Trigger map resize
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

function copyAddress() {
    const address = "123 EV Boulevard, San Francisco, CA 94105";

    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = address;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show success message
    showNotification('Address copied to clipboard!', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the contact page
    if (document.getElementById('googleMap')) {
        initMap();
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .custom-div-icon {
        background: transparent !important;
        border: none !important;
    }
`;
document.head.appendChild(style);

// ===== ENHANCED CHARGING HISTORY FUNCTIONALITY =====

// View Toggle Functionality
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const historyCards = document.getElementById('historyCards');
    const historyTable = document.getElementById('historyTable');

    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            const view = this.getAttribute('data-view');

            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Toggle views
            if (view === 'cards') {
                historyCards.style.display = 'flex';
                historyTable.style.display = 'none';
            } else {
                historyCards.style.display = 'none';
                historyTable.style.display = 'block';
            }
        });
    });
}

// Chart Controls
function initializeChartControls() {
    const chartButtons = document.querySelectorAll('.chart-btn');

    chartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            chartButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update chart based on selected period
            const chartType = this.getAttribute('data-chart');
            updateChart(chartType);
        });
    });
}

// Chat Support Functions
function toggleChatSupport() {
    const chatPanel = document.getElementById('chatSupportPanel');
    chatPanel.classList.toggle('active');

    if (chatPanel.classList.contains('active')) {
        // Focus on input when chat opens
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    }
}

function minimizeChat() {
    const chatPanel = document.getElementById('chatSupportPanel');
    chatPanel.classList.toggle('minimized');
}

function closeChat() {
    const chatPanel = document.getElementById('chatSupportPanel');
    chatPanel.classList.remove('active');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message) {
        addMessageToChat(message, 'user');
        input.value = '';

        // Simulate support response
        setTimeout(() => {
            const responses = [
                "I understand your concern. Let me help you with that.",
                "Thank you for reaching out. I'm looking into your charging history now.",
                "I can assist you with billing questions and station issues.",
                "Let me check the details of that charging session for you."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat(randomResponse, 'support');
        }, 1000);
    }
}

function sendQuickMessage(type) {
    const quickMessages = {
        billing: "I have a question about my recent charging bill.",
        station: "I experienced an issue at a charging station.",
        refund: "I'd like to request a refund for a charging session."
    };

    const message = quickMessages[type];
    addMessageToChat(message, 'user');

    // Simulate support response
    setTimeout(() => {
        const responses = {
            billing: "I'll help you with your billing question. Can you tell me which session you're asking about?",
            station: "I'm sorry to hear about the station issue. Which station and when did this happen?",
            refund: "I can help with refund requests. Let me check the session details and guide you through the process."
        };
        addMessageToChat(responses[type], 'support');
    }, 1000);
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'support' ? '<i class="fas fa-headset"></i>' : '<i class="fas fa-user"></i>';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = `
        <p>${message}</p>
        <span class="message-time">${getCurrentTime()}</span>
    `;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function startSessionChat(sessionId) {
    toggleChatSupport();

    // Add session-specific message
    setTimeout(() => {
        addMessageToChat(`I have a question about my charging session from ${getSessionDate(sessionId)}.`, 'user');

        setTimeout(() => {
            addMessageToChat(`I can see the details for that session. What would you like to know about your charging at ${getSessionStation(sessionId)}?`, 'support');
        }, 1000);
    }, 500);
}

function getSessionDate(sessionId) {
    const sessions = {
        'session-1': 'Dec 27, 2024',
        'session-2': 'Dec 26, 2024',
        'session-3': 'Dec 25, 2024'
    };
    return sessions[sessionId] || 'recent date';
}

function getSessionStation(sessionId) {
    const stations = {
        'session-1': 'Downtown Plaza Station',
        'session-2': 'Shopping Mall Hub',
        'session-3': 'Airport Express Station'
    };
    return stations[sessionId] || 'charging station';
}

function viewReceipt(sessionId) {
    // Simulate opening receipt
    alert(`Opening receipt for ${getSessionStation(sessionId)} - ${getSessionDate(sessionId)}`);
}

function filterHistory(period) {
    // Simulate filtering history
    console.log(`Filtering history for period: ${period}`);

    // Add loading state
    const cards = document.querySelectorAll('.session-card');
    cards.forEach(card => {
        card.style.opacity = '0.5';
    });

    // Simulate API call
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
        });
        updateResultsCount(cards.length);
    }, 500);
}

function exportHistory() {
    // Simulate export functionality
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Exported!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 2000);
}

function loadMoreHistory() {
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;

    setTimeout(() => {
        // Simulate adding more sessions
        const historyCards = document.getElementById('historyCards');
        const existingCards = historyCards.querySelectorAll('.session-card');

        if (existingCards.length > 0) {
            for (let i = 0; i < 2; i++) {
                const clonedCard = existingCards[i].cloneNode(true);
                // Update some details to make it look different
                const stationName = clonedCard.querySelector('.session-station h4');
                const dateInfo = clonedCard.querySelector('.session-station p');

                if (stationName && dateInfo) {
                    stationName.textContent = `Additional Station ${i + 1}`;
                    dateInfo.textContent = `Dec ${20 + i}, 2024 • ${10 + i}:00 AM`;
                }

                historyCards.appendChild(clonedCard);
            }
        }

        button.innerHTML = originalText;
        button.disabled = false;

        // Update counter animation
        initializeCounters();
    }, 1500);
}

function updateResultsCount(count) {
    // This would update a results counter if needed
    console.log(`Showing ${count} sessions`);
}

// Initialize enhanced history features
document.addEventListener('DOMContentLoaded', function () {
    initializeViewToggle();
    initializeChartControls();
    initializeChargingChart();

    // Add enter key support for chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Initialize counter animations for enhanced stats
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
    });
});

// Charging Chart Functionality
let chargingChart = null;

function initializeChargingChart() {
    const ctx = document.getElementById('chargingChart');
    if (!ctx) return;

    // Initial data for weekly view
    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Energy (kWh)',
                data: [45, 38, 52, 41, 35, 48, 55],
                borderColor: '#0066cc',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Cost ($)',
                data: [13.50, 11.40, 18.20, 12.30, 10.50, 14.40, 16.50],
                borderColor: '#00cc66',
                backgroundColor: 'rgba(0, 204, 102, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const config = {
        type: 'line',
        data: weeklyData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Inter',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.dataset.label.includes('Cost')) {
                                    label += '$' + context.parsed.y.toFixed(2);
                                } else {
                                    label += context.parsed.y + ' kWh';
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        color: '#666'
                    }
                },
                y: {
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        color: '#666'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6,
                    borderWidth: 2,
                    backgroundColor: '#fff'
                },
                line: {
                    borderWidth: 2
                }
            }
        }
    };

    chargingChart = new Chart(ctx, config);
}

function updateChart(chartType) {
    if (!chargingChart) return;

    let newData, newLabels;

    switch (chartType) {
        case 'weekly':
            newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            newData = [
                {
                    label: 'Energy (kWh)',
                    data: [45, 38, 52, 41, 35, 48, 55],
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cost ($)',
                    data: [13.50, 11.40, 18.20, 12.30, 10.50, 14.40, 16.50],
                    borderColor: '#00cc66',
                    backgroundColor: 'rgba(0, 204, 102, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ];
            break;

        case 'monthly':
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            newData = [
                {
                    label: 'Energy (kWh)',
                    data: [280, 320, 295, 340],
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cost ($)',
                    data: [84.00, 96.00, 88.50, 102.00],
                    borderColor: '#00cc66',
                    backgroundColor: 'rgba(0, 204, 102, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ];
            break;

        case 'yearly':
            newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            newData = [
                {
                    label: 'Energy (kWh)',
                    data: [1200, 1150, 1300, 1250, 1400, 1350, 1500, 1450, 1380, 1420, 1280, 1320],
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cost ($)',
                    data: [360, 345, 390, 375, 420, 405, 450, 435, 414, 426, 384, 396],
                    borderColor: '#00cc66',
                    backgroundColor: 'rgba(0, 204, 102, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ];
            break;
    }

    // Add loading animation
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.style.opacity = '0.5';

    setTimeout(() => {
        chargingChart.data.labels = newLabels;
        chargingChart.data.datasets = newData;
        chargingChart.update('active');

        chartContainer.style.opacity = '1';
    }, 300);
}

// ===== ENHANCED FIND STATIONS FUNCTIONALITY =====
function toggleAdvancedFilters() {
    const filtersPanel = document.getElementById('advancedFilters');
    const toggleBtn = document.querySelector('.filter-toggle');

    if (filtersPanel.classList.contains('active')) {
        filtersPanel.classList.remove('active');
        toggleBtn.innerHTML = '<i class="fas fa-sliders-h"></i><span>Filters</span>';
    } else {
        filtersPanel.classList.add('active');
        toggleBtn.innerHTML = '<i class="fas fa-times"></i><span>Close Filters</span>';
    }
}

function clearFilters() {
    // Clear all checkboxes
    const checkboxes = document.querySelectorAll('.advanced-filters input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset price slider
    const priceSlider = document.querySelector('.price-slider');
    const maxPriceSpan = document.getElementById('maxPrice');
    if (priceSlider && maxPriceSpan) {
        priceSlider.value = 50;
        maxPriceSpan.textContent = '50';
    }

    // Apply cleared filters
    applyFilters();
}

function applyFilters() {
    // Get selected filter values
    const chargerTypes = [];
    const availabilities = [];
    const maxPrice = document.getElementById('maxPrice').textContent;

    // Get charger types
    document.querySelectorAll('.filter-group:first-child input[type="checkbox"]:checked').forEach(checkbox => {
        chargerTypes.push(checkbox.value);
    });

    // Get availabilities
    document.querySelectorAll('.filter-group:nth-child(2) input[type="checkbox"]:checked').forEach(checkbox => {
        availabilities.push(checkbox.value);
    });

    // Apply filters to station list
    filterStations(chargerTypes, availabilities, maxPrice);

    // Close filters panel
    toggleAdvancedFilters();
}

function filterStations(chargerTypes, availabilities, maxPrice) {
    const stationCards = document.querySelectorAll('.station-card-enhanced');
    let visibleCount = 0;

    stationCards.forEach(card => {
        let showCard = true;

        // Check charger type filter
        if (chargerTypes.length > 0) {
            const cardChargerTypes = getCardChargerTypes(card);
            if (!chargerTypes.some(type => cardChargerTypes.includes(type))) {
                showCard = false;
            }
        }

        // Check availability filter
        if (availabilities.length > 0) {
            const cardAvailability = getCardAvailability(card);
            if (!availabilities.includes(cardAvailability)) {
                showCard = false;
            }
        }

        // Check price filter
        const cardPrice = getCardPrice(card);
        if (parseFloat(cardPrice) > parseFloat(maxPrice)) {
            showCard = false;
        }

        // Show or hide card
        if (showCard) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update results count
    updateResultsCount(visibleCount);
}

function getCardChargerTypes(card) {
    const features = card.querySelectorAll('.feature-tag span');
    const types = [];

    features.forEach(feature => {
        const text = feature.textContent.toLowerCase();
        if (text.includes('fast') || text.includes('ultra') || text.includes('standard')) {
            types.push(text.includes('ultra') ? 'ultra' : text.includes('fast') ? 'fast' : 'standard');
        }
    });

    return types;
}

function getCardAvailability(card) {
    if (card.classList.contains('available')) return 'available';
    if (card.classList.contains('busy')) return 'busy';
    if (card.classList.contains('offline')) return 'offline';
    return 'available';
}

function getCardPrice(card) {
    const priceElement = card.querySelector('.price-value');
    if (priceElement) {
        return priceElement.textContent.replace('$', '').replace('/kWh', '');
    }
    return '0';
}

function updateResultsCount(count) {
    const resultsCountElement = document.querySelector('.results-count');
    if (resultsCountElement) {
        resultsCountElement.textContent = `${count} stations found`;
    }
}

function sortStations(sortBy) {
    const stationList = document.querySelector('.station-list-enhanced');
    const stationCards = Array.from(stationList.querySelectorAll('.station-card-enhanced'));

    stationCards.sort((a, b) => {
        switch (sortBy) {
            case 'distance':
                return getDistance(a) - getDistance(b);
            case 'availability':
                return getAvailabilityScore(b) - getAvailabilityScore(a);
            case 'price':
                return getCardPrice(a) - getCardPrice(b);
            case 'rating':
                return getRating(b) - getRating(a);
            default:
                return 0;
        }
    });

    // Re-append sorted cards
    stationCards.forEach(card => stationList.appendChild(card));
}

function getDistance(card) {
    const distanceElement = card.querySelector('.station-distance span');
    if (distanceElement) {
        return parseFloat(distanceElement.textContent.replace(' mi', ''));
    }
    return 999;
}

function getAvailabilityScore(card) {
    if (card.classList.contains('available')) return 3;
    if (card.classList.contains('busy')) return 2;
    if (card.classList.contains('offline')) return 1;
    return 0;
}

function getRating(card) {
    const ratingElement = card.querySelector('.station-rating span');
    if (ratingElement) {
        return parseFloat(ratingElement.textContent);
    }
    return 0;
}

function loadMoreStations() {
    // Simulate loading more stations
    const stationList = document.querySelector('.station-list-enhanced');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Add more station cards (for demo, we'll clone existing ones)
        const existingCards = stationList.querySelectorAll('.station-card-enhanced');
        if (existingCards.length > 0) {
            for (let i = 0; i < 3; i++) {
                const clonedCard = existingCards[i].cloneNode(true);
                // Update some details to make it look different
                const distanceElement = clonedCard.querySelector('.station-distance span');
                if (distanceElement) {
                    const currentDistance = parseFloat(distanceElement.textContent.replace(' mi', ''));
                    distanceElement.textContent = `${(currentDistance + i + 1).toFixed(1)} mi`;
                }
                stationList.appendChild(clonedCard);
            }
        }

        // Reset button
        loadMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Load More Stations';
        loadMoreBtn.disabled = false;

        // Update count
        const currentCount = stationList.querySelectorAll('.station-card-enhanced').length;
        updateResultsCount(currentCount);
    }, 1500);
}

function searchDashboardStations() {
    const searchInput = document.getElementById('dashboardStationSearch');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        // If search is empty, show all stations
        const stationCards = document.querySelectorAll('.station-card-enhanced');
        stationCards.forEach(card => {
            card.style.display = 'block';
        });
        updateResultsCount(stationCards.length);
        return;
    }

    const stationCards = document.querySelectorAll('.station-card-enhanced');
    let visibleCount = 0;

    stationCards.forEach(card => {
        const stationName = card.querySelector('.station-title h4').textContent.toLowerCase();
        const stationLocation = card.querySelector('.station-location').textContent.toLowerCase();

        if (stationName.includes(searchTerm) || stationLocation.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    updateResultsCount(visibleCount);
}

function toggleMapFullscreen() {
    const mapContainer = document.querySelector('.map-container');
    const mapSection = document.querySelector('.map-section');

    if (mapContainer.classList.contains('fullscreen')) {
        mapContainer.classList.remove('fullscreen');
        mapSection.style.position = 'sticky';
        mapSection.style.height = 'calc(100vh - 200px)';
    } else {
        mapContainer.classList.add('fullscreen');
        mapSection.style.position = 'fixed';
        mapSection.style.top = '0';
        mapSection.style.left = '0';
        mapSection.style.width = '100vw';
        mapSection.style.height = '100vh';
        mapSection.style.zIndex = '9999';
    }
}

function toggleMapStyle() {
    // Placeholder for map style toggle functionality
    console.log('Toggle map style');
}

// Price slider functionality
document.addEventListener('DOMContentLoaded', function () {
    const priceSlider = document.querySelector('.price-slider');
    const maxPriceSpan = document.getElementById('maxPrice');

    if (priceSlider && maxPriceSpan) {
        priceSlider.addEventListener('input', function () {
            maxPriceSpan.textContent = this.value;
        });
    }
});

// ===== GLOBAL VARIABLES =====
let isDarkMode = false;
let currentDashboardSection = 'dashboard';
let bookingData = {};
let userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    balance: 45.75,
    totalCharges: 47,
    totalSpent: 284.50,
    co2Saved: 125,
    kWhUsed: 1240
};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// ===== COUNTER ANIMATION ===== */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize counters when page loads
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== STATION TABS FUNCTIONALITY =====
function initializeStationTabs() {
    const tabButtons = document.querySelectorAll('.station-tab-btn');
    const tabContents = document.querySelectorAll('.station-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Convert station info grid to tabs on smaller screens
function setupResponsiveStationInfo() {
    const stationCards = document.querySelectorAll('.station-card');

    stationCards.forEach(card => {
        const infoGrid = card.querySelector('.station-info-grid');
        if (!infoGrid) return;

        // Create tabbed version for mobile
        const tabbedVersion = createTabbedStationInfo(infoGrid);
        if (tabbedVersion) {
            // Insert tabs before the original grid
            infoGrid.parentNode.insertBefore(tabbedVersion, infoGrid);

            // Hide original grid on mobile, show on desktop
            if (window.innerWidth <= 768) {
                infoGrid.style.display = 'none';
                tabbedVersion.style.display = 'block';
            } else {
                infoGrid.style.display = 'grid';
                tabbedVersion.style.display = 'none';
            }
        }
    });
}

function createTabbedStationInfo(infoGrid) {
    const infoItems = infoGrid.querySelectorAll('.info-item');
    if (infoItems.length === 0) return null;

    // Group info items by category
    const categories = {
        'charging': [],
        'pricing': [],
        'hours': [],
        'amenities': []
    };

    infoItems.forEach(item => {
        const icon = item.querySelector('i');
        const value = item.querySelector('.info-value')?.textContent;

        if (icon) {
            if (icon.classList.contains('fa-bolt')) {
                categories.charging.push(item);
            } else if (icon.classList.contains('fa-dollar-sign')) {
                categories.pricing.push(item);
            } else if (icon.classList.contains('fa-clock')) {
                categories.hours.push(item);
            } else {
                categories.amenities.push(item);
            }
        }
    });

    // Create tabbed interface
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'station-tabs';

    let tabHTML = '<div class="station-tab-nav">';
    let contentHTML = '';

    // Create tabs for non-empty categories
    Object.keys(categories).forEach((category, index) => {
        if (categories[category].length > 0) {
            const isActive = index === 0 ? 'active' : '';
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

            tabHTML += `<button class="station-tab-btn ${isActive}" data-tab="station-${category}">${categoryName}</button>`;

            contentHTML += `
                <div id="station-${category}" class="station-tab-content ${isActive}">
                    <div class="station-tab-grid">
                        ${categories[category].map(item => item.outerHTML).join('')}
                    </div>
                </div>
            `;
        }
    });

    tabHTML += '</div>';
    contentHTML += '</div>';

    tabsContainer.innerHTML = tabHTML + contentHTML;

    return tabsContainer;
}

// Handle window resize for responsive tabs
window.addEventListener('resize', function () {
    const stationCards = document.querySelectorAll('.station-card');

    stationCards.forEach(card => {
        const infoGrid = card.querySelector('.station-info-grid');
        const tabs = card.querySelector('.station-tabs');

        if (infoGrid && tabs) {
            if (window.innerWidth <= 768) {
                infoGrid.style.display = 'none';
                tabs.style.display = 'block';
            } else {
                infoGrid.style.display = 'grid';
                tabs.style.display = 'none';
            }
        }
    });
});

// ===== INITIALIZATION =====
function initializeApp() {
    setupEventListeners();
    setupScrollAnimations();
    setupCounters();
    initializeCounters();
    loadUserData();
    initializeDashboard();
    setupFormValidation();
    initializeStationTabs();
    setupResponsiveStationInfo();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Create and manage overlay
            let overlay = document.querySelector('.mobile-menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                document.body.appendChild(overlay);
            }

            if (navMenu.classList.contains('active')) {
                overlay.classList.add('active');
                document.body.classList.add('menu-open');

                // Animate hamburger lines to X
                const spans = hamburger.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                });
            } else {
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');

                // Reset hamburger lines
                const spans = hamburger.querySelectorAll('span');
                spans.forEach((span) => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }

    // Close mobile menu when clicking overlay
    document.addEventListener('click', function (e) {
        const overlay = document.querySelector('.mobile-menu-overlay');
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');

        if (overlay && overlay.classList.contains('active') &&
            (e.target === overlay || !e.target.closest('.nav-menu'))) {
            overlay.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                // Reset hamburger lines
                const spans = hamburger.querySelectorAll('span');
                spans.forEach((span) => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
            document.body.classList.remove('menu-open');
        }
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const overlay = document.querySelector('.mobile-menu-overlay');
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');

            if (overlay) overlay.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                // Reset hamburger lines
                const spans = hamburger.querySelectorAll('span');
                spans.forEach((span) => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
            document.body.classList.remove('menu-open');
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            // Handle back to top
            if (href === '#' || href === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            if (href.length > 1) {
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (err) {
                    console.error('Invalid selector:', href);
                }
            }
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Station search
    // Removed redundant event listeners to prevent double execution (onclick is already in HTML)

    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"][id="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', checkPasswordStrength);
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.step-card, .feature-card, .station-card, .pricing-card, .plan-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATIONS =====
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter');
    const speed = 200;

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                countUp(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== PASSWORD TOGGLES =====
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    } else if (field.id === 'password' && value && value.length < 8) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters';
    } else if (field.id === 'confirmPassword') {
        const password = document.getElementById('password').value;
        if (value !== password) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }

    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ===== PASSWORD STRENGTH =====
function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');

    if (!strengthBar || !strengthText) return;

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    strengthBar.style.width = (strength * 20) + '%';

    if (strength <= 2) {
        strengthBar.style.backgroundColor = 'var(--danger-color)';
        strengthText.textContent = 'Weak password';
    } else if (strength <= 3) {
        strengthBar.style.backgroundColor = 'var(--warning-color)';
        strengthText.textContent = 'Medium password';
    } else {
        strengthBar.style.backgroundColor = 'var(--success-color)';
        strengthText.textContent = 'Strong password';
    }
}

// ===== FORM SUBMISSION =====
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    let isValid = true;

    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
        return;
    }

    // Handle different form types
    if (form.id === 'loginForm') {
        handleLogin(e);
    } else if (form.id === 'registerForm') {
        handleRegister(e);
    } else if (form.id === 'contactForm') {
        handleContactSubmit(e);
    } else {
        // Generic form submission
        showNotification('Form submitted successfully!', 'success');
        form.reset();
    }
}

// ===== LOGIN =====
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Simulate login (in real app, this would be an API call)
    if (email && password) {
        // Store login data
        if (remember) {
            localStorage.setItem('rememberUser', email);
        }

        showNotification('Login successful! Redirecting...', 'success');

        // Redirect to dashboard after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showNotification('Please enter email and password', 'error');
    }
}

// ===== REGISTER =====
function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);

    // Simulate registration (in real app, this would be an API call)
    showNotification('Account created successfully! Redirecting to login...', 'success');

    // Redirect to login after delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const contactData = Object.fromEntries(formData);

    // Simulate sending contact form (in real app, this would be an API call)
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

    // Reset form
    e.target.reset();
}

// ===== DASHBOARD FUNCTIONS =====
function initializeDashboard() {
    if (!document.querySelector('.dashboard-container')) return;

    // Initialize dashboard hamburger for mobile
    initializeDashboardHamburger();

    // Load user data
    loadUserData();

    // Setup sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Handle logout separately
            if (this.dataset.action === 'logout') {
                logout();
                return;
            }

            // Handle section navigation
            const section = this.dataset.section || this.getAttribute('href').substring(1);
            if (section) {
                showDashboardSection(section);
            }
        });
    });

    // Setup header logout button
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            logout();
        });
    }

    // Setup booking tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tab = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showBookingTab(tab);
        });
    });
}

function showDashboardSection(section) {
    console.log('Showing dashboard section:', section);

    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    console.log('Found sections:', sections.length);
    sections.forEach(s => s.classList.remove('active'));

    // Show selected section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Found and activated section:', section);
    } else {
        console.warn('Section not found:', section);
        // List all available sections for debugging
        const allSections = document.querySelectorAll('.dashboard-section');
        console.log('Available sections:');
        allSections.forEach(s => console.log('- ' + s.id));
    }

    // Update sidebar active state
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    console.log('Found sidebar links:', sidebarLinks.length);
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const linkSection = link.dataset.section || link.getAttribute('href').substring(1);
        if (linkSection === section) {
            link.classList.add('active');
            console.log('Activated sidebar link for:', section);
        }
    });

    // Update current section variable
    currentDashboardSection = section;

    // Initialize section-specific functionality
    initializeSectionFeatures(section);

    // Show notification for testing
    showNotification(`Switched to ${section.charAt(0).toUpperCase() + section.slice(1)}`, 'info');
}

function initializeSectionFeatures(section) {
    switch (section) {
        case 'find-stations':
            if (!window.dashboardMap) {
                setTimeout(() => initializeDashboardMap(), 100);
            }
            break;
        case 'history':
            // Re-initialize charging history features
            setTimeout(() => {
                if (typeof initializeViewToggle === 'function') initializeViewToggle();
                if (typeof initializeChartControls === 'function') initializeChartControls();
                if (typeof initializeChargingChart === 'function') initializeChargingChart();
            }, 100);
            break;
        case 'bookings':
            // Initialize booking features
            setTimeout(() => {
                if (typeof showBookingTab === 'function') {
                    showBookingTab('upcoming');
                }
            }, 100);
            break;
    }
}

// Dashboard Hamburger Menu
function initializeDashboardHamburger() {
    const hamburger = document.getElementById('dashboard-hamburger');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (!hamburger || !sidebar || !overlay) return;

    // Toggle sidebar
    function toggleSidebar() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');

        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking a link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // Close sidebar on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
}

function logout() {
    // Clear all authentication data
    localStorage.clear();
    sessionStorage.clear();

    // Show logout message
    showNotification('Logged out successfully', 'success');

    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function showBookingTab(tab) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.booking-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Show selected tab
    const targetTab = document.getElementById(tab + '-bookings');
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Update tab button states
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(tab)) {
            button.classList.add('active');
        }
    });
}

function loadUserData() {
    // Update dashboard with user data
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        el.textContent = userData.name;
    });

    // Update overview cards
    const totalChargesElement = document.querySelector('.overview-card:nth-child(1) .card-number');
    const totalSpentElement = document.querySelector('.overview-card:nth-child(2) .card-number');
    const co2SavedElement = document.querySelector('.overview-card:nth-child(3) .card-number');
    const kWhUsedElement = document.querySelector('.overview-card:nth-child(4) .card-number');

    if (totalChargesElement) totalChargesElement.textContent = userData.totalCharges;
    if (totalSpentElement) totalSpentElement.textContent = '$' + userData.totalSpent.toFixed(2);
    if (co2SavedElement) co2SavedElement.textContent = userData.co2Saved + 'kg';
    if (kWhUsedElement) kWhUsedElement.textContent = userData.kWhUsed.toLocaleString();
}

// ===== STATION DATA =====
const stationData = {
    'downtown-plaza': {
        name: 'Downtown Plaza Station',
        address: '123 Main Street, Downtown',
        distance: '0.5 miles away',
        price: '$0.25/kWh',
        chargerTypes: ['Fast', 'Ultra-Fast DC'],
        available: 4,
        hours: '24/7',
        amenities: ['WiFi', 'Restrooms']
    },
    'shopping-mall': {
        name: 'Shopping Mall Hub',
        address: '456 Commerce Ave, Mall District',
        distance: '1.2 miles away',
        price: '$0.30/kWh',
        chargerTypes: ['Fast', 'Standard'],
        available: 2,
        hours: '6AM - 11PM',
        amenities: ['Cafe', 'Shops']
    },
    'airport': {
        name: 'Airport Express Station',
        address: '789 Airport Road, Terminal 2',
        distance: '2.8 miles away',
        price: '$0.35/kWh',
        chargerTypes: ['Ultra-Fast DC', 'Fast'],
        available: 1,
        hours: '24/7',
        amenities: ['Luggage', 'Lounge']
    },
    'university': {
        name: 'University Campus Station',
        address: '321 Education Blvd, Campus West',
        distance: '3.5 miles away',
        price: '$0.20/kWh',
        chargerTypes: ['Fast', 'Standard'],
        available: 3,
        hours: '24/7',
        amenities: ['Library', 'Cafe']
    },
    'highway': {
        name: 'Highway Service Station',
        address: 'Interstate 95, Mile 42',
        distance: '8.2 miles away',
        price: '$0.40/kWh',
        chargerTypes: ['Ultra-Fast DC', 'Fast'],
        available: 0,
        hours: '24/7',
        amenities: ['Restaurant', 'Store']
    },
    'residential': {
        name: 'Residential Complex Station',
        address: '555 Park Avenue, Green Valley',
        distance: '4.1 miles away',
        price: '$0.22/kWh',
        chargerTypes: ['Standard', 'Fast'],
        available: 5,
        hours: '6AM - 10PM',
        amenities: ['Pool', 'Gym']
    }
};

// ===== STATION FUNCTIONS =====
function resetMap() {
    showNotification('Map view reset to default location', 'info');
    // In a real app, this would interact with the map API (e.g., Leaflet or Google Maps)
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof initMap === 'function') {
        initMap();
    }
}

function toggleStationTypes() {
    showNotification('Station filters updated', 'success');
}
function searchStations() {
    const searchInput = document.getElementById('locationSearch') || document.getElementById('dashboardStationSearch');
    const chargerType = document.getElementById('chargerType');
    const availability = document.getElementById('availability');
    const sortBy = document.getElementById('sortBy');

    if (!searchInput) return;

    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        showNotification('Please enter a location to search', 'warning');
        return;
    }

    // Simulate station search (in real app, this would be an API call)
    showNotification('Searching for stations near ' + searchTerm + '...', 'info');

    // Simulate loading delay
    setTimeout(() => {
        showNotification('Found 8 stations near ' + searchTerm, 'success');
        // In a real app, this would update the station list
    }, 1000);
}

function bookStation(stationId) {
    const station = stationData[stationId];
    if (!station) {
        showNotification('Station not found', 'error');
        return;
    }

    if (station.available === 0) {
        showNotification('This station is currently not available', 'warning');
        return;
    }

    bookingData.stationId = stationId;
    showBookingModal(station);
}

function viewStationDetails(stationId) {
    // In a real app, this would navigate to station details page
    showNotification('Loading station details...', 'info');
}

function getDirections(stationId) {
    // In a real app, this would open maps app
    showNotification('Opening directions in maps...', 'info');
}

// ===== MODAL FUNCTIONS =====
function showBookingModal(station) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('bookingModal');
    if (!modal) {
        modal = createBookingModal(station);
    } else {
        updateBookingModal(modal, station);
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Set minimum date to today - ensuring element exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}

function createBookingModal(station) {
    const modal = document.createElement('div');
    modal.id = 'bookingModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Book Charging Slot</h2>
                <button class="modal-close" onclick="closeModal('bookingModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="station-summary">
                    <div class="station-summary-header">
                        <h3>${station.name}</h3>
                        <span class="station-distance">${station.distance}</span>
                    </div>
                    <div class="station-summary-details">
                        <div class="summary-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${station.address}</span>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-bolt"></i>
                            <span>${station.chargerTypes.join(', ')}</span>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>${station.price}</span>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-clock"></i>
                            <span>${station.hours}</span>
                        </div>
                    </div>
                    <div class="availability-info">
                        <i class="fas fa-check-circle available"></i>
                        <span>${station.available} chargers available</span>
                    </div>
                </div>
                
                <form id="bookingForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="bookingDate">Date *</label>
                            <input type="date" id="bookingDate" required>
                        </div>
                        <div class="form-group">
                            <label for="bookingTime">Start Time *</label>
                            <input type="time" id="bookingTime" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="bookingDuration">Duration *</label>
                        <select id="bookingDuration" required>
                            <option value="">Select duration</option>
                            <option value="0.5">30 minutes</option>
                            <option value="1">1 hour</option>
                            <option value="1.5">1.5 hours</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="chargerType">Charger Type *</label>
                        <select id="chargerType" required>
                            <option value="">Select charger type</option>
                            ${station.chargerTypes.map(type =>
        `<option value="${type.toLowerCase().replace(' ', '-')}">${type}</option>`
    ).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="vehicleInfo">Vehicle *</label>
                        <select id="vehicleInfo" required>
                            <option value="">Select vehicle</option>
                            <option value="tesla-model3">Tesla Model 3</option>
                            <option value="tesla-modely">Tesla Model Y</option>
                            <option value="nissan-leaf">Nissan Leaf</option>
                            <option value="chevy-bolt">Chevrolet Bolt</option>
                            <option value="bmw-i4">BMW i4</option>
                            <option value="audi-etron">Audi e-tron</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="bookingNotes">Additional Notes (Optional)</label>
                        <textarea id="bookingNotes" rows="3" placeholder="Any special requirements or notes..."></textarea>
                    </div>
                    
                    <div class="price-estimate">
                        <div class="estimate-row">
                            <span>Estimated Cost:</span>
                            <span id="estimatedCost" class="cost-value">$0.00</span>
                        </div>
                        <small class="estimate-note">Based on ${station.price} and selected duration</small>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="closeModal('bookingModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    setupBookingFormListeners(modal, station);

    return modal;
}

function updateBookingModal(modal, station) {
    // Update station information
    const modalContent = modal.querySelector('.modal-content');
    modalContent.querySelector('.station-summary h3').textContent = station.name;
    modalContent.querySelector('.station-distance').textContent = station.distance;
    modalContent.querySelector('.summary-item:nth-child(1) span').textContent = station.address;
    modalContent.querySelector('.summary-item:nth-child(2) span').textContent = station.chargerTypes.join(', ');
    modalContent.querySelector('.summary-item:nth-child(3) span').textContent = station.price;
    modalContent.querySelector('.summary-item:nth-child(4) span').textContent = station.hours;
    modalContent.querySelector('.availability-info span').textContent = `${station.available} chargers available`;

    // Update charger type options
    const chargerTypeSelect = modal.getElementById('chargerType');
    chargerTypeSelect.innerHTML = `
        <option value="">Select charger type</option>
        ${station.chargerTypes.map(type =>
        `<option value="${type.toLowerCase().replace(' ', '-')}">${type}</option>`
    ).join('')}
    `;

    // Setup listeners
    setupBookingFormListeners(modal, station);
}

function handleBookingSubmit(station) {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);

    // Get form values
    const bookingData = {
        stationId: station.name.toLowerCase().replace(/\s+/g, '-'),
        stationName: station.name,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        duration: document.getElementById('bookingDuration').value,
        chargerType: document.getElementById('chargerType').value,
        vehicle: document.getElementById('vehicleInfo').value,
        notes: document.getElementById('bookingNotes').value,
        estimatedCost: document.getElementById('estimatedCost').textContent,
        bookingTime: new Date().toISOString()
    };

    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }

    // Simulate booking process
    showNotification('Processing booking...', 'info');

    setTimeout(() => {
        // Save booking to localStorage (in real app, this would be sent to server)
        saveBooking(bookingData);

        // Show success message
        showNotification('Booking confirmed successfully!', 'success');

        // Close modal
        closeModal('bookingModal');

        // Show booking confirmation
        showBookingConfirmation(bookingData);

        // Update station availability
        updateStationAvailability(bookingData.stationId);
    }, 1500);
}

function validateBookingForm(data) {
    const errors = [];

    if (!data.date) errors.push('Please select a date');
    if (!data.time) errors.push('Please select a time');
    if (!data.duration) errors.push('Please select a duration');
    if (!data.chargerType) errors.push('Please select a charger type');
    if (!data.vehicle) errors.push('Please select a vehicle');

    // Check if booking time is in the past
    const bookingDateTime = new Date(data.date + 'T' + data.time);
    const now = new Date();
    if (bookingDateTime < now) {
        errors.push('Booking time cannot be in the past');
    }

    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return false;
    }

    return true;
}

function saveBooking(bookingData) {
    // Get existing bookings or create new array
    let bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');

    // Add new booking
    bookings.push(bookingData);

    // Save to localStorage
    localStorage.setItem('userBookings', JSON.stringify(bookings));

    // Update user stats
    userData.totalCharges++;
    userData.totalSpent += parseFloat(bookingData.estimatedCost.replace('$', ''));
    localStorage.setItem('userData', JSON.stringify(userData));
}

function showBookingConfirmation(bookingData) {
    const confirmationModal = document.createElement('div');
    confirmationModal.id = 'bookingConfirmationModal';
    confirmationModal.className = 'modal';
    confirmationModal.innerHTML = `
        <div class="modal-content confirmation-modal">
            <div class="modal-header">
                <h2>Booking Confirmed!</h2>
                <button class="modal-close" onclick="closeModal('bookingConfirmationModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Your charging slot has been reserved</h3>
                
                <div class="booking-details">
                    <div class="detail-row">
                        <span class="label">Station:</span>
                        <span class="value">${bookingData.stationName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Date:</span>
                        <span class="value">${formatDate(bookingData.date)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Time:</span>
                        <span class="value">${formatTime(bookingData.time)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Duration:</span>
                        <span class="value">${bookingData.duration} hour${bookingData.duration > 1 ? 's' : ''}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Charger Type:</span>
                        <span class="value">${formatChargerType(bookingData.chargerType)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Vehicle:</span>
                        <span class="value">${formatVehicle(bookingData.vehicle)}</span>
                    </div>
                    <div class="detail-row total">
                        <span class="label">Estimated Cost:</span>
                        <span class="value">${bookingData.estimatedCost}</span>
                    </div>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn btn-outline" onclick="closeModal('bookingConfirmationModal')">Close</button>
                    <button class="btn btn-primary" onclick="viewMyBookings()">View My Bookings</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(confirmationModal);
    confirmationModal.style.display = 'block';
}

function updateStationAvailability(stationId) {
    // Update station availability in the UI
    const station = stationData[stationId];
    if (station && station.available > 0) {
        station.available--;

        // Update the badge in the station card
        const stationCards = document.querySelectorAll('.station-card');
        stationCards.forEach(card => {
            const button = card.querySelector(`button[onclick*="${stationId}"]`);
            if (button) {
                const badge = card.querySelector('.station-badge');
                if (badge) {
                    badge.textContent = station.available > 0 ? `${station.available} Available` : 'No Availability';
                    badge.className = station.available > 0 ? 'station-badge available' : 'station-badge busy';
                }
            }
        });
    }
}

// Utility functions for formatting
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

function formatChargerType(type) {
    return type.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatVehicle(vehicle) {
    const vehicleNames = {
        'tesla-model3': 'Tesla Model 3',
        'tesla-modely': 'Tesla Model Y',
        'nissan-leaf': 'Nissan Leaf',
        'chevy-bolt': 'Chevrolet Bolt',
        'bmw-i4': 'BMW i4',
        'audi-etron': 'Audi e-tron',
        'other': 'Other'
    };
    return vehicleNames[vehicle] || vehicle;
}

function viewMyBookings() {
    closeModal('bookingConfirmationModal');
    // In a real app, this would navigate to the bookings page
    showNotification('Redirecting to your bookings...', 'info');
    setTimeout(() => {
        window.location.href = 'dashboard.html#bookings';
    }, 1000);
}

function setupBookingFormListeners(modal, station) {
    const form = modal.querySelector('#bookingForm');
    const durationSelect = modal.getElementById('bookingDuration');
    const costEstimate = modal.getElementById('estimatedCost');

    // Update cost estimate when duration changes
    function updateCostEstimate() {
        const duration = parseFloat(durationSelect.value) || 0;
        const pricePerKwh = parseFloat(station.price.replace('$', '').replace('/kWh', ''));
        const estimatedKwh = duration * 7.5; // Estimate 7.5kWh per hour
        const estimatedCost = estimatedKwh * pricePerKwh;
        costEstimate.textContent = '$' + estimatedCost.toFixed(2);
    }

    durationSelect.addEventListener('change', updateCostEstimate);

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleBookingSubmit(station);
    });
}

function showAddFundsModal() {
    let modal = document.getElementById('addFundsModal');
    if (!modal) {
        modal = createAddFundsModal();
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function createAddFundsModal() {
    const modal = document.createElement('div');
    modal.id = 'addFundsModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Funds to Wallet</h2>
                <button class="modal-close" onclick="closeModal('addFundsModal')">&times;</button>
            </div>
            <div class="modal-body">
                <form id="addFundsForm">
                    <div class="form-group">
                        <label for="fundAmount">Amount</label>
                        <select id="fundAmount" required>
                            <option value="10">$10</option>
                            <option value="25">$25</option>
                            <option value="50">$50</option>
                            <option value="100">$100</option>
                            <option value="custom">Custom Amount</option>
                        </select>
                    </div>
                    <div class="form-group" id="customAmountGroup" style="display: none;">
                        <label for="customAmount">Custom Amount</label>
                        <input type="number" id="customAmount" min="5" max="500">
                    </div>
                    <div class="form-group">
                        <label for="paymentMethod">Payment Method</label>
                        <select id="paymentMethod" required>
                            <option value="visa">Visa ending in 4242</option>
                            <option value="mastercard">Mastercard ending in 8888</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">Add Funds</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listener for custom amount
    const fundAmount = document.getElementById('fundAmount');
    const customAmountGroup = document.getElementById('customAmountGroup');

    fundAmount.addEventListener('change', function () {
        customAmountGroup.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    return modal;
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== WALLET FUNCTIONS =====
function selectPricing(type) {
    showNotification(`Selected ${type} charging plan`, 'info');
}

function selectPlan(plan) {
    showNotification(`Selected ${plan} subscription plan`, 'info');
}

function selectFleetPlan(plan) {
    showNotification(`Selected ${plan} fleet plan`, 'info');
}

// ===== SERVICE FUNCTIONS =====
function requestService(serviceType) {
    showNotification(`Requesting ${serviceType} service...`, 'info');
}

function showConsultationModal() {
    showNotification('Opening consultation form...', 'info');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    // Add type-specific styles
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--danger-color)',
        warning: 'var(--warning-color)',
        info: 'var(--info-color)'
    };

    notification.style.borderLeft = `4px solid ${colors[type]}`;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// ===== PROFILE FUNCTIONS =====
function enableEditProfile() {
    const inputs = document.querySelectorAll('.personal-info-card .info-input');
    const button = document.querySelector('.personal-info-card .btn-primary');

    if (inputs[0].readOnly) {
        // Enable editing
        inputs.forEach(input => {
            input.removeAttribute('readonly');
            input.style.background = 'white';
            input.style.color = 'var(--text-color)';
            input.style.cursor = 'text';
        });

        button.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');

        // Add cancel button
        const cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-outline';
        cancelButton.innerHTML = '<i class="fas fa-times"></i> Cancel';
        cancelButton.onclick = disableEditProfile;
        button.parentNode.appendChild(cancelButton);

    } else {
        // Save changes (in real app, this would save to backend)
        disableEditProfile();
    }
}

function disableEditProfile() {
    const inputs = document.querySelectorAll('.personal-info-card .info-input');
    const button = document.querySelector('.personal-info-card .btn-success');

    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.style.background = 'var(--light-color)';
        input.style.color = 'var(--text-light)';
        input.style.cursor = 'not-allowed';
    });

    button.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    button.classList.remove('btn-success');
    button.classList.add('btn-primary');

    // Remove cancel button if it exists
    const cancelButton = button.parentNode.querySelector('.btn-outline');
    if (cancelButton) {
        cancelButton.remove();
    }
}

// ===== UTILITY FUNCTIONS =====
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('rememberUser');
        showNotification('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const icon = button.querySelector('i');

    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showForgotPassword() {
    showNotification('Password reset link sent to your email', 'success');
}

function socialLogin(provider) {
    showNotification(`Connecting with ${provider}...`, 'info');
}

function startLiveChat() {
    showNotification('Starting live chat...', 'info');
}

function openHelpCenter() {
    showNotification('Opening help center...', 'info');
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');

    answer.classList.toggle('active');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
}

// ===== LOAD SAVED PREFERENCES =====
function loadSavedPreferences() {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Load remembered user
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.value = rememberedUser;
    }
}

// Initialize saved preferences
loadSavedPreferences();

// ===== CSS ANIMATIONS =====
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        color: var(--text-light);
        margin-left: auto;
    }

    .notification-close:hover {
        color: var(--text-color);
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        background-color: white;
        margin: 3% auto;
        padding: 0;
        border-radius: var(--border-radius-lg);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideInUp 0.3s ease;
    }

    .confirmation-modal {
        max-width: 500px;
    }

    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .modal-header {
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    }

    .modal-header h2 {
        margin: 0;
        font-size: var(--font-size-2xl);
    }

    .modal-close {
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        cursor: pointer;
        color: white;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .modal-close:hover {
        opacity: 1;
    }

    .modal-body {
        padding: var(--spacing-lg);
    }

    /* Station Summary Styles */
    .station-summary {
        background: var(--light-color);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
        border: 1px solid var(--border-color);
    }

    .station-summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-md);
    }

    .station-summary-header h3 {
        margin: 0;
        color: var(--primary-color);
        font-size: var(--font-size-xl);
    }

    .station-distance {
        color: var(--text-light);
        font-size: var(--font-size-sm);
        background: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        border: 1px solid var(--border-color);
    }

    .station-summary-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
    }

    .summary-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-size: var(--font-size-sm);
        color: var(--text-light);
    }

    .summary-item i {
        color: var(--primary-color);
        width: 16px;
    }

    .availability-info {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
        background: white;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
    }

    .availability-info i.available {
        color: var(--success-color);
    }

    /* Form Styles */
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
    }

    .form-group {
        margin-bottom: var(--spacing-md);
    }

    .form-group label {
        display: block;
        margin-bottom: var(--spacing-sm);
        font-weight: 500;
        color: var(--text-color);
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: var(--font-size-base);
        transition: var(--transition);
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }

    .form-group textarea {
        resize: vertical;
        min-height: 80px;
    }

    /* Price Estimate Styles */
    .price-estimate {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        margin: var(--spacing-lg) 0;
        border: 1px solid var(--border-color);
    }

    .estimate-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);
    }

    .estimate-row span:first-child {
        font-weight: 500;
        color: var(--text-color);
    }

    .cost-value {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--primary-color);
    }

    .estimate-note {
        color: var(--text-light);
        font-size: var(--font-size-sm);
        display: block;
        text-align: center;
        margin-top: var(--spacing-sm);
    }

    /* Form Actions */
    .form-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
        margin-top: var(--spacing-lg);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--border-color);
    }

    /* Confirmation Modal Styles */
    .confirmation-icon {
        text-align: center;
        margin-bottom: var(--spacing-lg);
    }

    .confirmation-icon i {
        font-size: 4rem;
        color: var(--success-color);
        animation: scaleIn 0.5s ease;
    }

    @keyframes scaleIn {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .confirmation-modal h3 {
        text-align: center;
        margin-bottom: var(--spacing-lg);
        color: var(--text-color);
    }

    .booking-details {
        background: var(--light-color);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
    }

    .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm) 0;
        border-bottom: 1px solid var(--border-color);
    }

    .detail-row:last-child {
        border-bottom: none;
    }

    .detail-row.total {
        border-top: 2px solid var(--border-color);
        margin-top: var(--spacing-sm);
        padding-top: var(--spacing-md);
        font-weight: 600;
    }

    .detail-row .label {
        color: var(--text-light);
        font-weight: 500;
    }

    .detail-row .value {
        color: var(--text-color);
        font-weight: 500;
    }

    .detail-row.total .value {
        color: var(--primary-color);
        font-size: var(--font-size-lg);
    }

    .confirmation-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .modal-content {
            margin: 5% auto;
            width: 95%;
            max-height: 95vh;
        }

        .form-row {
            grid-template-columns: 1fr;
        }

        .station-summary-details {
            grid-template-columns: 1fr;
        }

        .form-actions {
            flex-direction: column;
        }

        .confirmation-actions {
            flex-direction: column;
        }
    }

    .error {
        border-color: var(--danger-color) !important;
    }

    [data-theme='dark'] {
        background-color: var(--dark-color);
        color: var(--text-color);
    }

    [data-theme='dark'] .modal-content {
        background-color: var(--card-bg);
        color: var(--text-color);
    }

    [data-theme='dark'] .station-summary {
        background: var(--section-bg-alt);
        border-color: var(--border-color);
    }

    [data-theme='dark'] .form-group input,
    [data-theme='dark'] .form-group select,
    [data-theme='dark'] .form-group textarea {
        background: var(--section-bg-alt);
        border-color: var(--border-color);
        color: var(--text-color);
    }

    [data-theme='dark'] .booking-details {
        background: var(--section-bg-alt);
        border-color: var(--border-color);
    }

    [data-theme='dark'] .detail-row {
        border-color: var(--border-color);
    }
`;
document.head.appendChild(animationStyle);

/* ===== THEME TOGGLE ===== */
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to update theme toggle buttons
    function updateThemeToggleButtons(theme) {
        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        if (themeToggleBtn) themeToggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        if (mobileThemeToggleBtn) mobileThemeToggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }

    // Function to set theme
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeToggleButtons(theme);
    }

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeToggleButtons('dark');
    } else if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        updateThemeToggleButtons('light');
    } else if (prefersDarkScheme.matches) {
        // Optional: Auto-enable dark mode if system prefers it
        // document.body.setAttribute('data-theme', 'dark');
        // updateThemeToggleButtons('dark');
    }

    // Function to handle theme toggle
    function handleThemeToggle() {
        let theme = 'light';
        if (document.body.getAttribute('data-theme') !== 'dark') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Add event listeners to both theme toggle buttons
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }

    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
    }

    // Dashboard theme toggle buttons (desktop and mobile)
    const desktopDashboardThemeToggleBtn = document.getElementById('desktop-dashboard-theme-toggle');
    const mobileDashboardThemeToggleBtn = document.getElementById('mobile-dashboard-theme-toggle');

    // Function to update dashboard theme toggle buttons
    function updateDashboardThemeToggles(theme) {
        const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        const text = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

        // Update desktop dashboard button
        if (desktopDashboardThemeToggleBtn) {
            desktopDashboardThemeToggleBtn.innerHTML = `<i class="fas ${icon}"></i> <span>${text}</span>`;
        }

        // Update mobile dashboard button
        if (mobileDashboardThemeToggleBtn) {
            mobileDashboardThemeToggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        }
    }

    // Update dashboard buttons on page load
    const dashboardCurrentTheme = document.body.getAttribute('data-theme') || 'light';
    updateDashboardThemeToggles(dashboardCurrentTheme);

    // Add click event listeners for dashboard buttons
    if (desktopDashboardThemeToggleBtn) {
        desktopDashboardThemeToggleBtn.addEventListener('click', function () {
            handleThemeToggle();
            const newTheme = document.body.getAttribute('data-theme');
            updateDashboardThemeToggles(newTheme);
        });
    }

    if (mobileDashboardThemeToggleBtn) {
        mobileDashboardThemeToggleBtn.addEventListener('click', function () {
            handleThemeToggle();
            const newTheme = document.body.getAttribute('data-theme');
            updateDashboardThemeToggles(newTheme);
        });
    }

    // Override setTheme to also update dashboard buttons
    const originalSetTheme = setTheme;
    setTheme = function (theme) {
        originalSetTheme(theme);
        updateDashboardThemeToggles(theme);
    };
});


/* ===== BACK TO TOP BUTTON FUNCTIONALITY ===== */
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
