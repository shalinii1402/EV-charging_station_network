// Enhanced Dashboard Navigation Fix
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function waitForElement(selector, callback, timeout = 5000) {
        const startTime = Date.now();
        
        function check() {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
            } else if (Date.now() - startTime < timeout) {
                setTimeout(check, 100);
            } else {
                console.warn(`Element not found: ${selector}`);
            }
        }
        
        check();
    }
    
    // Initialize enhanced navigation
    function initEnhancedNavigation() {
        console.log('Initializing enhanced dashboard navigation...');
        
        // Setup sidebar navigation
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        console.log(`Found ${sidebarLinks.length} sidebar links`);
        
        sidebarLinks.forEach((link, index) => {
            console.log(`Setting up link ${index}: ${link.textContent.trim()}`);
            
            // Remove existing listeners to avoid duplicates
            link.replaceWith(link.cloneNode(true));
        });
        
        // Re-select after cloning
        const freshLinks = document.querySelectorAll('.sidebar-link');
        
        freshLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Clicked sidebar link: ${this.textContent.trim()}`);
                
                // Handle logout
                if (this.dataset.action === 'logout') {
                    console.log('Triggering logout...');
                    if (typeof logout === 'function') {
                        logout();
                    } else {
                        alert('Logout functionality would be implemented here');
                        window.location.href = 'login.html';
                    }
                    return;
                }
                
                // Get section ID
                const section = this.dataset.section || this.getAttribute('href').substring(1);
                console.log(`Target section: ${section}`);
                
                if (section) {
                    showSectionEnhanced(section);
                }
            });
        });
        
        console.log('Enhanced navigation setup complete');
    }
    
    // Enhanced section display function
    function showSectionEnhanced(section) {
        console.log(`Showing section: ${section}`);
        
        // Hide all sections
        const sections = document.querySelectorAll('.dashboard-section');
        console.log(`Found ${sections.length} sections`);
        
        sections.forEach(s => {
            s.classList.remove('active');
            console.log(`Hidden: ${s.id}`);
        });
        
        // Show target section
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log(`✓ Activated section: ${section}`);
            
            // Update sidebar active state
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                const linkSection = link.dataset.section || link.getAttribute('href').substring(1);
                if (linkSection === section) {
                    link.classList.add('active');
                    console.log(`✓ Activated sidebar link: ${section}`);
                }
            });
            
            // Show success message
            showEnhancedNotification(`Switched to ${section.charAt(0).toUpperCase() + section.slice(1)}`, 'success');
            
        } else {
            console.error(`Section not found: ${section}`);
            showEnhancedNotification(`Section not found: ${section}`, 'error');
            
            // List available sections
            const allSections = document.querySelectorAll('.dashboard-section');
            console.log('Available sections:');
            allSections.forEach(s => console.log(`- ${s.id}`));
        }
    }
    
    // Enhanced notification function
    function showEnhancedNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.enhanced-notification');
        existing.forEach(n => n.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'enhanced-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : type === 'error' ? '#dc3545' : '#007bff'};
                color: white;
                padding: 12px 16px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-family: Inter, sans-serif;
                font-size: 14px;
                max-width: 300px;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEnhancedNavigation);
    } else {
        initEnhancedNavigation();
    }
    
    // Also try after a short delay to ensure everything is loaded
    setTimeout(initEnhancedNavigation, 500);
    
    // Make functions globally available
    window.showSectionEnhanced = showSectionEnhanced;
    window.showEnhancedNotification = showEnhancedNotification;
})();
