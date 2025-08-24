/* ============================== НАЛАШТУВАННЯ ============================== */
        const START_DATE = new Date(2025, 0, 4, 0, 0); // Рік, місяць (0-11), день, година, хвилина
        const MEMORIES = {
            left: [
                { title: "Вечірні обійми", photo: "img/1.jpg", text: "Перші наші посиденьки на твоїй лавочці. Ідеальний день!" },
                { title: "Наші смаколики", photo: "img/2.jpg", text: "Разом навіть шаурма здається святом. Наше спільне хобі." },
                { title: "На квадроциклах", photo: "img/3.jpg", text: "Вітер, швидкість і свобода, яку ми ловили разом. Зловили по повній адреналін." },
                { title: "Наш танець", photo: "img/4.jpg", text: "Ніч, музика і тільки ми двоє." }
            ],
            right: [
                { title: "Дорога додому", photo: "img/5.jpg", text: "Кожна поїздка з тобою — маленьке побачення." },
                { title: "Ти вперше у мене вдома", photo: "img/6.jpg", text: "Атмосфера, яку створили ми." },
                { title: "Наша перша Пасха", photo: "img/7.jpg", text: "Міні фотосесія, а твої очі сяють яскравіше за проміння." },
                { title: "Сильні обійми", photo: "img/8.jpg", text: "Коли не хочеться відпускати ні на мить." }
            ],
            top: [
                { title: "Перший букет для тебе", photo: "img/9.jpg", text: "З цієї миті почалося наше маленьке диво." },
                { title: "Поцілунок на природі", photo: "img/10.jpg", text: "Це той момент, коли про все забуваєш." },
                { title: "Захід сонця, ми і поцілунки", photo: "img/11.jpg", text: "Я на стільки щасливий з тобою, як ніколи." },
                { title: "Вечірні посиденьки", photo: "img/12.jpg", text: "Під зорями, в обіймах, легкий вітерець і сльози щастя." }
            ],
            "bottom-left": [
                { title: "Наші покатушки", photo: "img/13.jpg", text: "Дякую тобі, що довірилась мені" },
                { title: "Разом всюди", photo: "img/14.jpg", text: "Подорожі, фото і моменти, які назавжди в серці." },
                { title: "Очі в очі", photo: "img/15.jpg", text: "Наші гарнючі очі, особливо твої, які я ніколи не забуду." }
            ],
            "bottom-right": [
                { title: "Твоя краса", photo: "img/16.jpg", text: "Моя муза і натхнення у кожному дні." },
                { title: "Затишний вечір", photo: "img/17.jpg", text: "Ніжки пліч-о-пліч, синє світло і спокій удвох." },
                { title: "Весняня фея", photo: "img/18.jpg", text: "Ти — як сама весна, ніжна і квітуча." }
            ],
            "middle": [
                { title: "Наші перші поцілунки", photo: "img/19.jpg", text: "Коли поруч ти — більше нічого не потрібно." },
                { title: "Дві кицюні", photo: "img/20.jpg", text: "Твоя ніжність сяє навіть у тому, як ти тримаєш її." },
                { title: "Поцілунок під час прогулянки", photo: "img/21.jpg", text: "Вечір, дорога і ми — романтика, яку не купиш." }
            ]
        };
        /* ============================== ЛІЧИЛЬНИК СТОСУНКІВ ============================== */
        const el = (id) => document.getElementById(id);
        const yearsEl = el('years'), monthsEl = el('months'), daysEl = el('days'), hoursEl = el('hours'), minutesEl = el('minutes'), secondsEl = el('seconds');
        function diffYMDHMS(from, to) {
            let y = to.getFullYear() - from.getFullYear();
            let m = to.getMonth() - from.getMonth();
            let d = to.getDate() - from.getDate();
            let h = to.getHours() - from.getHours();
            let min = to.getMinutes() - from.getMinutes();
            let s = to.getSeconds() - from.getSeconds();
            if (s < 0) {
                s += 60;
                min--;
            }
            if (min < 0) {
                min += 60;
                h--;
            }
            if (h < 0) {
                h += 24;
                d--;
            }
            if (d < 0) {
                const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
                d += prevMonth;
                m--;
            }
            if (m < 0) {
                m += 12;
                y--;
            }
            return { y, m, d, h, min, s };
        }
        function updateCounter() {
            const now = new Date();
            const { y, m, d, h, min, s } = diffYMDHMS(START_DATE, now);
            yearsEl.textContent = y;
            monthsEl.textContent = m;
            daysEl.textContent = d;
            hoursEl.textContent = h;
            minutesEl.textContent = min;
            secondsEl.textContent = s;
        }
        updateCounter();
        setInterval(updateCounter, 1000);
        /* ============================== ДЕРЕВО: КЛІК ПО ГІЛКАХ, КВІТИ, ПАНЕЛЬ СПОГАДІВ ============================== */
        const overlay = el('overlay');
        const memTitle = el('memTitle');
        const memText = el('memText');
        const memPhoto = el('memPhoto');
        const closeMem = el('closeMem');
        const nextMem = el('nextMem');
        const prevMem = el('prevMem');
        const branches = document.querySelectorAll('[data-branch]');
        let currentBranch = '';
        let currentIndex = 0;
        function showOverlay(show) {
            overlay.classList.toggle('show', show);
            overlay.setAttribute('aria-hidden', String(!show));
        }
        function loadMemory(branchKey, index = 0) {
        const list = MEMORIES[branchKey] || [];
        if (list.length === 0) return;
        const item = list[(index + list.length) % list.length];

        memTitle.textContent = item.title || 'Спогад';
        memText.textContent = item.text || '';

        if (item.photo) {
        memPhoto.innerHTML = `<img src="${item.photo}" alt="Фото спогаду">`;
        } else {
        memPhoto.innerHTML = `<div class="no-photo"></div>`;
        }

        currentIndex = (index + list.length) % list.length;
        currentBranch = branchKey;
        }
        function bloom(branchEl) {
            branchEl.querySelectorAll('.flower').forEach((f, i) => {
                setTimeout(() => f.classList.add('bloom'), 80 * i);
            });
        }
        branches.forEach(g => {
            const key = g.dataset.branch;
            const hotspot = g.querySelector('.branch-hotspot');
            hotspot.addEventListener('click', () => {
                bloom(g);
                loadMemory(key, 0);
                showOverlay(true);
            });
        });
        closeMem.addEventListener('click', () => showOverlay(false));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) showOverlay(false);
        });
        nextMem.addEventListener('click', () => loadMemory(currentBranch, currentIndex + 1));
        prevMem.addEventListener('click', () => loadMemory(currentBranch, currentIndex - 1));
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('show')) return;
            if (e.key === 'Escape') showOverlay(false);
            if (e.key === 'ArrowRight') nextMem.click();
            if (e.key === 'ArrowLeft') prevMem.click();
        });
        /* ============================== ДРІБНІ ПОЛІРУВАННЯ ============================== */
        setTimeout(() => {
            document.querySelectorAll('.flower').forEach((f, i) => setTimeout(() => f.classList.add('bloom'), 15 * i));
        }, 300);

        /* Створення мігаючих сердечок */
        function createFloatingHearts() {
            const heartCount = 15;
            const body = document.body;

            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement("div");
                heart.className = "floating-heart";
                heart.innerHTML = "❤️";
                heart.style.left = Math.random() * 100 + "vw";
                heart.style.animationDelay = Math.random() * 5 + "s";
                body.appendChild(heart);
            }
        }

        // Викликаємо функцію після завантаження сторінки
        window.addEventListener("load", createFloatingHearts);

        // Оновлюємо сердечка кожні 8 секунд
        setInterval(createFloatingHearts, 8000);