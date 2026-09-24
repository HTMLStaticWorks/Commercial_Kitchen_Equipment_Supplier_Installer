/* ==========================================================================
   KITCHENFORGE - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // THEME SYSTEM
    // ==========================================================================
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const root = document.documentElement;
    
    const savedTheme = localStorage.getItem('kf_theme') || 'light';
    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    }
    
    const updateThemeIcons = (theme) => {
        const iconSvg = theme === 'dark' 
            ? '<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/></svg>'
            : '<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
            
        document.querySelectorAll('.nav-icon-btn.theme-toggle').forEach(btn => {
            btn.innerHTML = iconSvg;
        });
    };
    updateThemeIcons(savedTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('kf_theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    // ==========================================================================
    // RTL SYSTEM
    // ==========================================================================
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    
    const savedDir = localStorage.getItem('kf_dir') || 'ltr';
    if (savedDir === 'rtl') {
        root.setAttribute('dir', 'rtl');
    }
    
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = root.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            root.setAttribute('dir', newDir);
            localStorage.setItem('kf_dir', newDir);
        });
    });

    // ==========================================================================
    // NAVIGATION & MOBILE MENU
    // ==========================================================================
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.mobile-drawer');
    const drawerClose = document.querySelector('.drawer-close');
    const overlay = document.querySelector('.overlay');

    const openDrawer = () => {
        if(drawer) drawer.classList.add('open');
        if(overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        if(drawer) drawer.classList.remove('open');
        if(overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
    };

    if(hamburger) hamburger.addEventListener('click', openDrawer);
    if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if(overlay) overlay.addEventListener('click', closeDrawer);

    // Active Navigation State
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .drawer-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // ==========================================================================
    // SCROLL REVEAL & BACK TO TOP
    // ==========================================================================
    const reveals = document.querySelectorAll('.reveal');
    const backToTop = document.getElementById('back-to-top');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
        
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger on load

    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // GLOBAL QUOTE MODAL
    // ==========================================================================
    const quoteModal = document.getElementById('quote-modal');
    const quoteTriggers = document.querySelectorAll('.quote-trigger');
    const quoteCloses = document.querySelectorAll('.modal-close, .quote-cancel');
    const quoteForm = document.getElementById('quote-form');
    const quoteSuccess = document.getElementById('quote-success');
    const quoteFormBody = document.getElementById('quote-form-body');
    const eqNameInput = document.getElementById('quote-eq-name');
    const eqCatInput = document.getElementById('quote-eq-cat');

    const openQuoteModal = (eqName = '', eqCat = '') => {
        if (!quoteModal) return;
        
        if (eqName && eqNameInput) eqNameInput.value = eqName;
        if (eqCat && eqCatInput) eqCatInput.value = eqCat;
        
        quoteModal.classList.add('show');
        if(overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeQuoteModal = () => {
        if (!quoteModal) return;
        quoteModal.classList.remove('show');
        // Only remove overlay if drawer is not open
        if (!drawer || !drawer.classList.contains('open')) {
            if(overlay) overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        // Reset form state after transition
        setTimeout(() => {
            if (quoteForm) quoteForm.reset();
            if (quoteSuccess) quoteSuccess.classList.remove('active');
            if (quoteFormBody) quoteFormBody.style.display = 'block';
        }, 300);
    };

    quoteTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const eqName = trigger.getAttribute('data-equipment-name') || '';
            const eqCat = trigger.getAttribute('data-equipment-cat') || '';
            openQuoteModal(eqName, eqCat);
            if (drawer && drawer.classList.contains('open')) {
                drawer.classList.remove('open');
            }
        });
    });

    quoteCloses.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeQuoteModal();
        });
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (quoteModal && quoteModal.classList.contains('show')) {
                closeQuoteModal();
            }
        });
    }

    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDrawer();
            closeQuoteModal();
        }
    });

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validate (HTML5 validation does most of it, but we can do extra here)
            if (quoteForm.checkValidity()) {
                if(quoteFormBody) quoteFormBody.style.display = 'none';
                if(quoteSuccess) quoteSuccess.classList.add('active');
            } else {
                quoteForm.reportValidity();
            }
        });
    }

    // ==========================================================================
    // DEMO DATA (FICTIONAL)
    // ==========================================================================
    const equipmentData = [
        { id: 1, name: 'FORGE 6-BURNER RANGE', category: 'cooking', img: 'assets/images/product1.jpg', desc: 'Heavy-duty commercial range with standard oven base.', footprint: '36" W x 34" D', power: 'Gas - 200,000 BTU', capacity: '6 Burners + 1 Oven' },
        { id: 2, name: 'THERMAL PRO CONVECTION OVEN', category: 'cooking', img: 'assets/images/product2.jpg', desc: 'Double deck electric convection oven for high-volume baking.', footprint: '38" W x 40" D', power: 'Electric - 208V, 3 Phase', capacity: '10 Full-Size Pans' },
        { id: 3, name: 'COLDLINE 2-DOOR REFRIGERATOR', category: 'refrigeration', img: 'assets/images/product3.jpg', desc: 'Reach-in commercial refrigerator with stainless steel exterior.', footprint: '54" W x 32" D', power: 'Electric - 115V, 15A', capacity: '49 cu. ft.' },
        { id: 4, name: 'PREPMASTER WORK TABLE', category: 'food prep', img: 'assets/images/product4.jpg', desc: 'Stainless steel work table with undershelf.', footprint: '72" W x 30" D', power: 'N/A', capacity: '800 lbs load rating' },
        { id: 5, name: 'WASHLINE COMMERCIAL DISHWASHER', category: 'dishwashing', img: 'assets/images/product5.jpg', desc: 'High-temp door-type dishwashing machine.', footprint: '28" W x 34" D', power: 'Electric - 208V, 3 Phase', capacity: '60 racks/hour' },
        { id: 6, name: 'BAKECORE DECK OVEN', category: 'bakery', img: 'assets/images/product6.jpg', desc: 'Artisan stone deck oven for bread production.', footprint: '60" W x 50" D', power: 'Gas - 120,000 BTU', capacity: '4 Pan Capacity per Deck' }
    ];

    const projectData = [
        { id: 1, name: 'MODERN BISTRO KITCHEN', type: 'restaurant', img: 'assets/images/projects1.jpg', desc: 'Complete fit-out for a high-volume urban bistro.' },
        { id: 2, name: 'CITY HOTEL PRODUCTION KITCHEN', type: 'hotel', img: 'assets/images/projects2.jpg', desc: 'Large scale banqueting and room service production kitchen.' },
        { id: 3, name: 'ARTISAN BAKERY', type: 'bakery', img: 'assets/images/projects3.jpg', desc: 'Specialized bakery with deck ovens and proving rooms.' },
        { id: 4, name: 'SPECIALTY COFFEE BAR', type: 'cafe', img: 'assets/images/projects4.jpg', desc: 'Compact cafe setup with undercounter refrigeration.' },
        { id: 5, name: 'CATERING PREP FACILITY', type: 'catering', img: 'assets/images/projects5.jpg', desc: 'Large open plan prep kitchen for event catering.' },
        { id: 6, name: 'INSTITUTIONAL FOOD SERVICE', type: 'institutional', img: 'assets/images/projects6.jpg', desc: 'High-capacity cafeteria kitchen for a corporate campus.' }
    ];

    // ==========================================================================
    // PRODUCTS PAGE: FILTERING & CATALOGUE
    // ==========================================================================
    const eqCatalogue = document.getElementById('equipment-catalogue');
    const eqFilters = document.querySelectorAll('.eq-filter');

    const renderEquipment = (filterCat = 'all') => {
        if (!eqCatalogue) return;
        
        eqCatalogue.innerHTML = '';
        
        const filteredData = filterCat === 'all' 
            ? equipmentData 
            : equipmentData.filter(item => item.category === filterCat);
            
        if (filteredData.length === 0) {
            eqCatalogue.innerHTML = '<p class="text-muted text-center" style="grid-column: 1/-1;">No matching equipment found for this category.</p>';
            return;
        }

        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card reveal active';
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="card-img" style="object-fit: contain; height: 250px; background-color: var(--color-surface);">
                <div class="card-body text-center">
                    <div class="card-category">${item.category}</div>
                    <h3 class="card-title h6" style="font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h3>
                    <p class="text-sm text-muted mb-3">${item.desc}</p>
                    <div style="margin-top: auto; padding-top: 1.5rem;">
                        <button class="btn btn-secondary w-100 eq-detail-trigger" data-id="${item.id}">VIEW DETAILS</button>
                    </div>
                </div>
            `;
            eqCatalogue.appendChild(card);
        });

        // Re-bind detail triggers
        document.querySelectorAll('.eq-detail-trigger').forEach(btn => {
            btn.addEventListener('click', () => openEqDetailModal(parseInt(btn.getAttribute('data-id'))));
        });
    };

    if (eqCatalogue) {
        renderEquipment();
        
        eqFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                eqFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderEquipment(btn.getAttribute('data-filter'));
            });
        });
    }

    // Equipment Details Modal
    const eqDetailModal = document.getElementById('eq-detail-modal');
    const eqDetailContent = document.getElementById('eq-detail-content');

    const openEqDetailModal = (id) => {
        const item = equipmentData.find(e => e.id === id);
        if (!item || !eqDetailModal) return;

        eqDetailContent.innerHTML = `
            <div class="editorial-split">
                <div class="editorial-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div>
                    <div class="card-category">${item.category}</div>
                    <h2>${item.name}</h2>
                    <p class="text-muted mb-4">${item.desc}</p>
                    <p class="text-sm text-accent mb-4">Sample equipment information.</p>
                    <ul class="spec-list">
                        <li><span class="spec-label">Footprint</span> <span>${item.footprint}</span></li>
                        <li><span class="spec-label">Capacity</span> <span>${item.capacity}</span></li>
                        <li><span class="spec-label">Power</span> <span>${item.power}</span></li>
                    </ul>
                    <div class="mt-4">
                        <button class="btn btn-primary w-100 quote-trigger" data-equipment-name="${item.name}" data-equipment-cat="${item.category}">REQUEST A QUOTE FOR THIS EQUIPMENT</button>
                    </div>
                </div>
            </div>
        `;

        // Bind the newly created quote trigger inside modal
        const newQuoteBtn = eqDetailContent.querySelector('.quote-trigger');
        newQuoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            eqDetailModal.classList.remove('show');
            openQuoteModal(item.name, item.category);
        });

        eqDetailModal.classList.add('show');
        if(overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    if (eqDetailModal) {
        eqDetailModal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                eqDetailModal.classList.remove('show');
                if(!drawer || !drawer.classList.contains('open')) {
                    if(overlay) overlay.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ==========================================================================
    // PROJECTS PAGE: FILTERING
    // ==========================================================================
    const projectGallery = document.getElementById('project-gallery');
    const projFilters = document.querySelectorAll('.proj-filter');

    const renderProjects = (filterType = 'all') => {
        if (!projectGallery) return;
        
        projectGallery.innerHTML = '';
        
        const filteredData = filterType === 'all' 
            ? projectData 
            : projectData.filter(item => item.type === filterType);

        filteredData.forEach(item => {
            const el = document.createElement('div');
            el.className = 'masonry-item reveal active';
            el.innerHTML = `
                <img src="${item.img}" alt="${item.name}" style="height: 300px; width: 100%; object-fit: cover;">
                <div class="masonry-overlay">
                    <h3 class="h4 mb-2">${item.name}</h3>
                    <p class="text-sm">${item.desc}</p>
                </div>
            `;
            // Add click for modal if needed, keeping simple for now
            projectGallery.appendChild(el);
        });
    };

    if (projectGallery) {
        renderProjects();
        projFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                projFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(btn.getAttribute('data-filter'));
            });
        });
    }

    // ==========================================================================
    // FINANCING CALCULATOR
    // ==========================================================================
    const calcForm = document.getElementById('finance-calc-form');
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const budget = parseFloat(document.getElementById('calc-budget').value) || 0;
            const downpay = parseFloat(document.getElementById('calc-downpay').value) || 0;
            const term = parseInt(document.getElementById('calc-term').value) || 36;
            const rate = parseFloat(document.getElementById('calc-rate').value) || 8; // 8% illustrative

            const principal = budget - downpay;
            if (principal <= 0) {
                document.getElementById('calc-result-monthly').textContent = '$0';
                return;
            }

            const r = (rate / 100) / 12;
            const n = term;
            // M = P[r(1+r)^n/((1+r)^n-1)]
            const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

            document.getElementById('calc-result-monthly').textContent = '$' + monthly.toFixed(2);
            document.getElementById('calc-result-financed').textContent = '$' + principal.toFixed(2);
            document.getElementById('calc-results').style.display = 'block';
        });
    }

    // ==========================================================================
    // SEARCH SYSTEM (SIMPLE FRONTEND DEMO)
    // ==========================================================================
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;

            // Simple demo search across equipment and projects
            const eqHits = equipmentData.filter(i => i.name.toLowerCase().includes(query) || i.category.toLowerCase().includes(query));
            const prHits = projectData.filter(i => i.name.toLowerCase().includes(query) || i.type.toLowerCase().includes(query));
            
            searchResults.innerHTML = '';
            
            if (eqHits.length === 0 && prHits.length === 0) {
                searchResults.innerHTML = '<p class="text-muted mt-3">NO MATCHING EQUIPMENT OR INFORMATION FOUND.</p>';
            } else {
                let html = '<ul class="spec-list mt-3">';
                eqHits.forEach(h => html += `<li><span class="spec-label">Equipment</span> <span>${h.name}</span></li>`);
                prHits.forEach(h => html += `<li><span class="spec-label">Project</span> <span>${h.name}</span></li>`);
                html += '</ul>';
                searchResults.innerHTML = html;
            }
        });
    }

    // ==========================================================================
    // HOME 2 EQUIPMENT SELECTOR
    // ==========================================================================
    const homeSelector = document.getElementById('home2-selector');
    const homeSelectorRes = document.getElementById('home2-selector-result');
    if (homeSelector) {
        homeSelector.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val) {
                homeSelectorRes.innerHTML = `
                    <div class="card p-4 mt-4 text-center border-accent">
                        <h3 class="h4 text-accent">RECOMMENDED CATEGORIES FOR ${val.toUpperCase()}</h3>
                        <p class="text-sm text-muted">Cooking · Refrigeration · Prep · Ventilation</p>
                        <p class="text-xs text-muted mt-2">Illustrative equipment-planning example.</p>
                    </div>
                `;
            } else {
                homeSelectorRes.innerHTML = '';
            }
        });
    }
    // ==========================================================================
    // HOME 1 CATEGORY SELECTOR
    // ==========================================================================
    const homeCatBtns = document.querySelectorAll('#home-cat-selector .filter-btn');
    const hcTitle = document.getElementById('hc-title');
    const hcDesc = document.getElementById('hc-desc');
    const hcApp = document.getElementById('hc-app');
    const hcEq = document.getElementById('hc-eq');
    const hcImg = document.getElementById('hc-img');
    const hcCta = document.getElementById('hc-cta');

    const homeCatData = {
        'COOKING': {
            desc: 'Professional commercial cooking equipment, ranges, convection ovens, and fryers.',
            app: 'Restaurants, Hotels',
            eq: 'Ranges, Ovens, Grills',
            img: 'assets/images/hero-commercial-kitchen.jpg' // Reusing available images due to quota
        },
        'REFRIGERATION': {
            desc: 'High-performance commercial refrigeration, reach-ins, and walk-in coolers.',
            app: 'All Foodservice',
            eq: 'Refrigerators, Freezers',
            img: 'assets/images/kitchen-lineup.jpg'
        },
        'FOOD PREPARATION': {
            desc: 'Durable prep stations and heavy-duty mixers for consistent production.',
            app: 'Prep Kitchens, Bakeries',
            eq: 'Mixers, Slicers, Tables',
            img: 'assets/images/hero-commercial-kitchen.jpg'
        },
        'DISHWASHING': {
            desc: 'High-temp and low-temp warewashing systems for fast turnaround.',
            app: 'High-Volume Kitchens',
            eq: 'Conveyors, Door-Types',
            img: 'assets/images/hero-installation.jpg'
        },
        'BAKERY': {
            desc: 'Artisan deck ovens and proving cabinets for professional bakehouses.',
            app: 'Bakeries, Cafés',
            eq: 'Deck Ovens, Provers',
            img: 'assets/images/hero-commercial-kitchen.jpg'
        },
        'BEVERAGE': {
            desc: 'Coffee stations and high-capacity ice machines for constant demand.',
            app: 'Cafés, Hotels, Bars',
            eq: 'Ice Machines, Brewers',
            img: 'assets/images/kitchen-lineup.jpg'
        },
        'STAINLESS FABRICATION': {
            desc: 'Custom stainless steel tables, sinks, and wall shelves.',
            app: 'Custom Fit-outs',
            eq: 'Sinks, Prep Tables',
            img: 'assets/images/hero-installation.jpg'
        },
        'VENTILATION': {
            desc: 'Commercial kitchen exhaust hoods and makeup air systems.',
            app: 'Cooklines',
            eq: 'Exhaust Hoods',
            img: 'assets/images/hero-installation.jpg'
        }
    };

    if (homeCatBtns.length > 0) {
        homeCatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                homeCatBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const cat = btn.getAttribute('data-cat');
                const data = homeCatData[cat];
                
                if (data) {
                    hcTitle.textContent = cat;
                    hcDesc.textContent = data.desc;
                    hcApp.textContent = data.app;
                    hcEq.textContent = data.eq;
                    hcImg.src = data.img;
                    hcCta.textContent = `EXPLORE ${cat} EQUIPMENT →`;
                }
            });
        });
    }

});
