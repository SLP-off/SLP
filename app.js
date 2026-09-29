tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                slp: {
                    yellow: '#FFE600',
                    red: '#FF3366',
                    purple: '#7928CA',
                    cyan: '#00DFD8',
                    dark: '#0D0F12',
                    card: '#161920',
                    border: '#2A2F3D'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif']
            }
        }
    }
}

const modalData = {
    'modal-1': {
        title: "Gratification Réelle & Zéro Retard",
        badge: "Stages & PFMP",
        badgeColor: "bg-slp-yellow/10 text-slp-yellow",
        content: `
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                Aujourd'hui, de nombreux lycéens attendent plusieurs mois avant de toucher l'allocation de stage d'État pour leurs Périodes de Formation en Milieu Professionnel (PFMP).
            </p>
            <h4 class="font-bold text-white mb-2 text-sm">Ce que nous exigeons :</h4>
            <ul class="list-disc list-inside text-gray-400 text-xs space-y-2 mb-6">
                <li>Versement automatique dans les 15 jours suivant la fin du stage.</li>
                <li>Revalorisation des montants journaliers à la hauteur du SMIC horaire.</li>
                <li>Prise en charge intégrale des frais de transport et de repas par les établissements ou les entreprises d'accueil.</li>
            </ul>
            <a href="#contact" onclick="closeModal()" class="block w-full text-center bg-slp-yellow text-black font-bold py-3 rounded-xl text-sm hover:bg-yellow-300 transition-colors">
                Signaler un retard de paiement
            </a>
        `
    },
    'modal-2': {
        title: "Gratuité du Matériel et Équipements",
        badge: "Équipement",
        badgeColor: "bg-slp-cyan/10 text-slp-cyan",
        content: `
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                Les tenues professionnelles (EPI, chaussures de sécurité, blouses) et le matériel de spécialité coûtent cher. Aucun élève ne devrait être pénalisé ou exclu pour des raisons financières.
            </p>
            <h4 class="font-bold text-white mb-2 text-sm">Ce que nous exigeons :</h4>
            <ul class="list-disc list-inside text-gray-400 text-xs space-y-2 mb-6">
                <li>Fourniture gratuite dès la rentrée de 100% du matériel obligatoire.</li>
                <li>Renouvellement automatique du matériel usé ou endommagé pendant l'année.</li>
                <li>Accès gratuit aux outils numériques et licences logicielles nécessaires aux études.</li>
            </ul>
            <a href="#contact" onclick="closeModal()" class="block w-full text-center bg-slp-cyan text-black font-bold py-3 rounded-xl text-sm hover:bg-cyan-300 transition-colors">
                Soutenir cette revendication
            </a>
        `
    },
    'modal-3': {
        title: "Respect, Dignité & Lutte contre le Harcèlement",
        badge: "Droits & Libertés",
        badgeColor: "bg-slp-red/10 text-slp-red",
        content: `
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                Les stages et la scolarité doivent se dérouler dans un cadre bienveillant. Les humiliations, les travaux dégradants ou sans rapport avec la formation sont inacceptable.
            </p>
            <h4 class="font-bold text-white mb-2 text-sm">Ce que nous exigeons :</h4>
            <ul class="list-disc list-inside text-gray-400 text-xs space-y-2 mb-6">
                <li>Création d'une cellule d'écoute indépendante des administrations.</li>
                <li>Droit de retrait garanti sans sanction pour l'élève en cas d'abus avéré en entreprise.</li>
                <li>Sanctions systématiques contre le harcèlement et les discriminations.</li>
            </ul>
            <a href="mailto:Contact-SLP@proton.me" class="block w-full text-center bg-slp-red text-white font-bold py-3 rounded-xl text-sm hover:bg-red-600 transition-colors">
                Contact Confidentiel (Mail)
            </a>
        `
    },
    'modal-4': {
        title: "Orientation & Parcoursup Équitable",
        badge: "Orientation",
        badgeColor: "bg-purple-500/10 text-purple-400",
        content: `
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                La sélection sur Parcoursup discrimine trop souvent les élèves issus des voies professionnelles et technologiques.
            </p>
            <h4 class="font-bold text-white mb-2 text-sm">Ce que nous exigeons :</h4>
            <ul class="list-disc list-inside text-gray-400 text-xs space-y-2 mb-6">
                <li>Réservation prioritaire de places en BTS pour la voie pro et en BUT pour la voie techno.</li>
                <li>Fin des algorithmes opaques de sélection.</li>
                <li>Accès réel à une poursuite d'études choisie et accompagnée.</li>
            </ul>
            <a href="https://discord.gg/xzdeWz29NX" target="_blank" class="block w-full text-center bg-slp-purple text-white font-bold py-3 rounded-xl text-sm hover:bg-purple-600 transition-colors">
                Rejoindre le groupe d'entraide Discord
            </a>
        `
    }
};

let modal, modalContent, mobileMenu, toast, toastMessage;

document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('claim-modal');
    modalContent = document.getElementById('modal-content');
    mobileMenu = document.getElementById('mobile-menu');
    toast = document.getElementById('toast');
    toastMessage = document.getElementById('toast-message');

    // Navigation mobile
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Fermer le menu mobile au clic
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Modales de revendications
    document.querySelectorAll('.claim-card').forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-target');
            openModal(target);
        });
    });

    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Filtres des actualités
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-slp-yellow', 'text-black');
                b.classList.add('bg-slp-card', 'text-gray-400');
            });

            btn.classList.add('active', 'bg-slp-yellow', 'text-black');
            btn.classList.remove('bg-slp-card', 'text-gray-400');

            const filter = btn.getAttribute('data-filter');
            filterNews(filter);
        });
    });

    // Formulaire de contact
    const contactForm = document.getElementById('slp-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Message envoyé ! Nous te répondrons rapidement par mail ou Discord.");
            contactForm.reset();
        });
    }
});

function openModal(modalId) {
    const data = modalData[modalId];
    if (!data || !modal || !modalContent) return;

    modalContent.innerHTML = `
        <span class="inline-block ${data.badgeColor} text-xs font-bold px-3 py-1 rounded-full mb-4">
            ${data.badge}
        </span>
        <h3 class="font-display font-extrabold text-2xl text-white mb-4">${data.title}</h3>
        ${data.content}
    `;

    modal.classList.remove('hidden');
}

function closeModal() {
    if (modal) {
        modal.classList.add('hidden');
    }
}

function filterNews(filter) {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Fonction de copie simplifiée et compatible iframe
function copyToClipboard(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copié !`);
        }).catch(() => {
            fallbackCopy(text, label);
        });
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(`${label} copié !`);
    } catch (err) {
        showToast("Lien : " + text);
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}