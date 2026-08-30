// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.toggle('hidden', !isHidden);
        menuIconClose.classList.toggle('hidden', isHidden);
      }
      
      mobileMenuButton.setAttribute('aria-expanded', isHidden);
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
});
