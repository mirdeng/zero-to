/* ========== 行健智能官网交互脚本 ========== */
(function () {
    'use strict';

    // ---------- 头部滚动效果 ----------
    const header = document.getElementById('header');
    const backTop = document.getElementById('backTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (scrollY > 500) {
            backTop.classList.add('show');
        } else {
            backTop.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---------- 移动端菜单 ----------
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // 点击移动端链接后关闭菜单
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ---------- 回到顶部 ----------
    backTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- 导航高亮（滚动监听） ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---------- 数字滚动动画 ----------
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    }

    // ---------- 滚动显示动画（Intersection Observer） ----------
    const revealEls = document.querySelectorAll('.product-card, .solution-card, .advantage-item, .news-card, .about-card, .about-feature, .contact-form-wrap');
    revealEls.forEach(function (el) {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(function (el) {
        observer.observe(el);
    });

    // 数字动画单独监听（确保 Hero 区域进入视野时触发）
    const statNums = document.querySelectorAll('.stat-num');
    const statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(function (num) {
        statObserver.observe(num);
    });

    // ---------- 联系表单提交 ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (!name || !phone) {
                alert('请填写您的姓名和联系电话');
                return;
            }

            // 简单手机号校验
            const phoneReg = /^1[3-9]\d{9}$/;
            if (!phoneReg.test(phone)) {
                alert('请输入正确的手机号码');
                return;
            }

            // 模拟提交
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;

            setTimeout(function () {
                alert('感谢您的咨询，我们已收到您的信息，将尽快与您联系！');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // ---------- 平滑滚动处理（修正固定头部偏移） ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 72; // 减去固定头部高度
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ---------- 鼠标跟随光晕（Hero 区域） ----------
    const hero = document.querySelector('.hero');
    if (hero && window.matchMedia('(min-width: 769px)').matches) {
        hero.addEventListener('mousemove', function (e) {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            const glow1 = document.querySelector('.hero-glow-1');
            const glow2 = document.querySelector('.hero-glow-2');
            if (glow1) {
                glow1.style.transform = 'translate(' + (x - 50) * 0.3 + 'px, ' + (y - 50) * 0.3 + 'px)';
            }
            if (glow2) {
                glow2.style.transform = 'translate(' + (50 - x) * 0.2 + 'px, ' + (50 - y) * 0.2 + 'px)';
            }
        });
    }

    console.log('%c芜湖行健智能机器人有限公司', 'color:#1677ff;font-size:20px;font-weight:bold;');
    console.log('%c智能制造 · 行健致远', 'color:#7c3aed;font-size:14px;');

})();
