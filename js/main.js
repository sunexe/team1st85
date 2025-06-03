let matches = [];
let currentIndex = 0;

// 加载赛事数据
async function loadMatchData() {
    try {
        const response = await fetch('/data/matches.json');
        const data = await response.json();
        matches = data.matches;
        // 设置初始索引为最新赛事
        currentIndex = matches.length - 1;
        initSlider();
    } catch (error) {
        console.error('加载赛事数据失败:', error);
    }
}

// 初始化轮播
function initSlider() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    function updateNavButtons() {
        prevBtn.classList.toggle('hidden', currentIndex === 0);
        nextBtn.classList.toggle('hidden', currentIndex === matches.length - 1);
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
            updateNavButtons();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < matches.length - 1) {
            currentIndex++;
            updateSlide();
            updateNavButtons();
        }
    });
    
    // currentIndex 已在loadMatchData中设置为最新赛事
    updateSlide();
    updateNavButtons();

    // 添加触摸滑动事件
    let touchStartX = 0;
    slider.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex = (currentIndex + 1) % matches.length;
            } else {
                currentIndex = (currentIndex - 1 + matches.length) % matches.length;
            }
            updateSlide();
            updateNavButtons();
        }
    });
}

// 添加页面过渡效果
function initPageTransitions() {
    const sections = document.querySelectorAll('.page-transition');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// 图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
}

// 更新轮播图显示
function updateSlide() {
    const match = matches[currentIndex];
    const slider = document.querySelector('.slider');
    
    // 添加淡入效果
    slider.style.opacity = '0';
    setTimeout(() => {
        slider.style.backgroundImage = `url(${match.imageUrl})`;
        slider.style.opacity = '1';
    }, 300);
    
    const matchInfo = document.querySelector('.match-info');
    matchInfo.innerHTML = `
        <h2>${match.name}</h2>
        <p>日期：${match.date}</p>
        <p>地点：${match.location}</p>
        <p>天气：${match.weather}</p>
        <p>出场人数：${match.players}</p>
        <p>${match.description}</p>
        <div class="video-links">
            ${match.videoUrls && match.videoUrls.length > 0 ? 
                match.videoUrls.map((url, index) => 
                    `<a href="${url}" target="_blank" rel="noopener noreferrer">视频${index + 1}</a>`
                ).join('') 
                : ''}
        </div>
    `;
}

// 加载网格图片
function loadMatchesGrid() {
    const grid = document.querySelector('.matches-grid');
    // 复制数组并反转，以保持原数组顺序不变
    [...matches].reverse().forEach((match, index) => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.style.cursor = 'pointer';
        matchCard.innerHTML = `
            <img src="${match.imageUrl}" alt="${match.name}">
            <div class="match-card-info">
                <h3>${match.name}</h3>
                <div class="card-info-row">
                    <p class="match-date">${match.date}</p>
                    <div class="video-links">
                        ${match.videoUrls && match.videoUrls.length > 0 ? 
                            match.videoUrls.map((url, index) => 
                                `<a href="${url}" class="video-link" target="_blank" rel="noopener noreferrer">视频${index + 1}</a>`
                            ).join('') 
                            : ''}
                    </div>
                </div>
            </div>
        `;
        
        // 点击卡片更新hero区域并滚动
        matchCard.addEventListener('click', () => {
            // 由于网格是倒序显示的，需要反向计算索引
            currentIndex = matches.length - 1 - index;
            updateSlide();
            // 平滑滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        grid.appendChild(matchCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadMatchData().then(() => {
        loadMatchesGrid();
    });
    initPageTransitions();
    initLazyLoading();
});
