/**
 * PANDORA'S BOX - NAVIGATION SYSTEM JAVASCRIPT
 * Handles all interactive navigation functionality
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  return () => element.removeEventListener('keydown', handleTabKey);
};

// ============================================
// TOP BANNER FUNCTIONALITY
// ============================================

class TopBanner {
  constructor() {
    this.banner = document.querySelector('.top-banner');
    this.closeBtn = document.querySelector('.top-banner-close');

    if (this.banner && this.closeBtn) {
      this.init();
    }
  }

  init() {
    // Check if banner was previously dismissed
    if (sessionStorage.getItem('bannerDismissed')) {
      this.banner.classList.add('hidden');
    }

    this.closeBtn.addEventListener('click', () => this.dismiss());
  }

  dismiss() {
    this.banner.classList.add('hidden');
    sessionStorage.setItem('bannerDismissed', 'true');
  }
}

// ============================================
// STICKY HEADER FUNCTIONALITY
// ============================================

class StickyHeader {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.scrollThreshold = 100;
    this.lastScroll = 0;

    if (this.header) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > this.scrollThreshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    this.lastScroll = currentScroll;
  }
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

class MobileMenu {
  constructor() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.drawer = document.querySelector('.mobile-nav-drawer');
    this.overlay = document.querySelector('.mobile-nav-overlay');
    this.body = document.body;
    this.isOpen = false;
    this.removeTrapFocus = null;

    if (this.toggle && this.drawer && this.overlay) {
      this.init();
    }
  }

  init() {
    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.overlay.addEventListener('click', () => this.close());

    // Handle submenu toggles
    const submenuToggles = document.querySelectorAll('.mobile-nav-link[data-submenu]');
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => this.toggleSubmenu(e));
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on window resize to desktop size
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth >= 1024 && this.isOpen) {
        this.close();
      }
    }, 250));
  }

  toggleMenu() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.toggle.classList.add('active');
    this.drawer.classList.add('active');
    this.overlay.classList.add('active');
    this.body.style.overflow = 'hidden';

    // Trap focus in drawer
    this.removeTrapFocus = trapFocus(this.drawer);

    // Focus first link
    setTimeout(() => {
      const firstLink = this.drawer.querySelector('.mobile-nav-link');
      if (firstLink) firstLink.focus();
    }, 300);

    // Announce to screen readers
    this.drawer.setAttribute('aria-hidden', 'false');
  }

  close() {
    this.isOpen = false;
    this.toggle.classList.remove('active');
    this.drawer.classList.remove('active');
    this.overlay.classList.remove('active');
    this.body.style.overflow = '';

    // Remove focus trap
    if (this.removeTrapFocus) {
      this.removeTrapFocus();
      this.removeTrapFocus = null;
    }

    // Announce to screen readers
    this.drawer.setAttribute('aria-hidden', 'true');

    // Return focus to toggle button
    this.toggle.focus();
  }

  toggleSubmenu(e) {
    e.preventDefault();
    const link = e.currentTarget;
    const submenuId = link.dataset.submenu;
    const submenu = document.getElementById(submenuId);
    const icon = link.querySelector('.nav-link-icon');

    if (submenu) {
      const isActive = submenu.classList.contains('active');

      // Close all other submenus
      document.querySelectorAll('.mobile-submenu').forEach(menu => {
        if (menu !== submenu) {
          menu.classList.remove('active');
        }
      });

      // Toggle icons
      document.querySelectorAll('.mobile-nav-link .nav-link-icon').forEach(i => {
        if (i !== icon) {
          i.textContent = '▼';
        }
      });

      // Toggle current submenu
      submenu.classList.toggle('active');
      if (icon) {
        icon.textContent = isActive ? '▼' : '▲';
      }

      // Update ARIA
      link.setAttribute('aria-expanded', !isActive);
    }
  }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

class SearchOverlay {
  constructor() {
    this.overlay = document.querySelector('.search-overlay');
    this.openBtn = document.querySelector('#searchOpen');
    this.closeBtn = document.querySelector('.search-close');
    this.searchInput = document.querySelector('.search-input');
    this.searchForm = document.querySelector('.search-form');
    this.body = document.body;
    this.isOpen = false;
    this.removeTrapFocus = null;

    if (this.overlay && this.openBtn) {
      this.init();
    }
  }

  init() {
    this.openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Handle search form submission
    if (this.searchForm) {
      this.searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }

    // Handle search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', debounce((e) => {
        this.handleSearchInput(e.target.value);
      }, 300));
    }
  }

  open() {
    this.isOpen = true;
    this.overlay.classList.add('active');
    this.body.style.overflow = 'hidden';

    // Trap focus in overlay
    this.removeTrapFocus = trapFocus(this.overlay);

    // Focus search input
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.focus();
      }
    }, 300);

    // Announce to screen readers
    this.overlay.setAttribute('aria-hidden', 'false');
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('active');
    this.body.style.overflow = '';

    // Remove focus trap
    if (this.removeTrapFocus) {
      this.removeTrapFocus();
      this.removeTrapFocus = null;
    }

    // Announce to screen readers
    this.overlay.setAttribute('aria-hidden', 'true');

    // Clear search
    if (this.searchInput) {
      this.searchInput.value = '';
    }

    // Return focus to search button
    this.openBtn.focus();
  }

  handleSearch(e) {
    e.preventDefault();
    const query = this.searchInput.value.trim();

    if (query) {
      // Redirect to products page with search query
      window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
  }

  handleSearchInput(value) {
    // This could be enhanced with real-time search suggestions
    // For now, it's a placeholder for future autocomplete functionality
    if (value.length > 2) {
      // console.log('Search query:', value);
      // Implement autocomplete here
    }
  }
}

// ============================================
// MEGA MENU FUNCTIONALITY
// ============================================

class MegaMenu {
  constructor() {
    this.navItems = document.querySelectorAll('.nav-item.has-dropdown');
    this.megaMenus = document.querySelectorAll('.mega-menu');
    this.activeTimeout = null;

    if (this.navItems.length > 0) {
      this.init();
    }
  }

  init() {
    this.navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const megaMenu = item.querySelector('.mega-menu');

      if (link && megaMenu) {
        // Mouse events
        item.addEventListener('mouseenter', () => {
          clearTimeout(this.activeTimeout);
          this.show(megaMenu);
        });

        item.addEventListener('mouseleave', () => {
          this.activeTimeout = setTimeout(() => {
            this.hide(megaMenu);
          }, 200);
        });

        // Keyboard navigation
        link.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle(megaMenu);
          }
          if (e.key === 'Escape') {
            this.hide(megaMenu);
            link.focus();
          }
        });

        // Focus management
        megaMenu.addEventListener('focusout', (e) => {
          if (!megaMenu.contains(e.relatedTarget) && !item.contains(e.relatedTarget)) {
            this.hide(megaMenu);
          }
        });
      }
    });
  }

  show(megaMenu) {
    megaMenu.setAttribute('aria-hidden', 'false');
  }

  hide(megaMenu) {
    megaMenu.setAttribute('aria-hidden', 'true');
  }

  toggle(megaMenu) {
    const isHidden = megaMenu.getAttribute('aria-hidden') === 'true';
    if (isHidden) {
      this.show(megaMenu);
    } else {
      this.hide(megaMenu);
    }
  }
}

// ============================================
// CART COUNT UPDATE
// ============================================

class CartCounter {
  constructor() {
    this.badges = document.querySelectorAll('.cart-badge');
    this.init();
  }

  init() {
    this.updateCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', () => this.updateCount());
  }

  updateCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    this.badges.forEach(badge => {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'block' : 'none';
    });
  }
}

// ============================================
// ACTIVE PAGE HIGHLIGHTING
// ============================================

class ActivePageHighlighter {
  constructor() {
    this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.init();
  }

  init() {
    // Desktop nav
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === this.currentPage) {
        link.classList.add('active');
      }
    });

    // Mobile nav
    const mobileLinks = document.querySelectorAll('.mobile-nav-link:not([data-submenu])');
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === this.currentPage) {
        link.classList.add('active');
      }
    });

    // Bottom nav
    const bottomLinks = document.querySelectorAll('.bottom-nav-item');
    bottomLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === this.currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all navigation components
  new TopBanner();
  new StickyHeader();
  new MobileMenu();
  new SearchOverlay();
  new MegaMenu();
  new CartCounter();
  new ActivePageHighlighter();
  new SmoothScroll();

  // Set initial ARIA states
  const searchOverlay = document.querySelector('.search-overlay');
  if (searchOverlay) {
    searchOverlay.setAttribute('aria-hidden', 'true');
  }

  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  if (mobileDrawer) {
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  const megaMenus = document.querySelectorAll('.mega-menu');
  megaMenus.forEach(menu => {
    menu.setAttribute('aria-hidden', 'true');
  });

  console.log('🎯 Pandora\'s Box Navigation System Loaded');
});

// ============================================
// EXPORT FOR MODULE USAGE (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TopBanner,
    StickyHeader,
    MobileMenu,
    SearchOverlay,
    MegaMenu,
    CartCounter,
    ActivePageHighlighter,
    SmoothScroll
  };
}
