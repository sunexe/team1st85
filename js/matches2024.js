let matches = [];
let currentIndex = 0;

async function loadMatchData() {
    try {
        const response = await fetch('data/matches2024.json');
        const data = await response.json();
        matches = data.matches;
        currentIndex = matches.length - 1;
        initSlider();
    } catch (error) {
        console.error('加载赛事数据失败:', error);
    }
}

function initSlider() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || matches.length === 0) return;

    // 初始化显示
    updateSlide();
    
    // 添加导航按钮点击事件
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + matches.length) % matches.length;
        updateSlide();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % matches.length;
        updateSlide();
    });
}

function updateSlide() {
    const match = matches[currentIndex];
    const slider = document.querySelector('.slider');
    
    slider.style.opacity = '0';
    setTimeout(() => {
        slider.innerHTML = `<img src="${match.imageUrl}" alt="${match.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
        slider.style.opacity = '1';
    }, 300);
    
    const matchInfo = document.querySelector('.match-info');
    matchInfo.innerHTML = Object.entries(match)
        .filter(([key]) => key !== 'imageUrl' && key !== 'videoUrls')
        .map(([key, value]) => `<p>${value}</p>`)
        .join('') +
        (match.videoUrls ? `
            <div class="video-links">
                ${match.videoUrls.map((url, index) => 
                    `<a href="${url}" target="_blank" rel="noopener noreferrer">视频${index + 1}</a>`
                ).join('')}
            </div>` : '');
}

function loadMatchesGrid() {
    const grid = document.querySelector('.matches-grid');
    if (!grid) return;
    
    grid.innerHTML = matches.map((match, index) => `
        <div class="match-card" data-index="${index}">
            <img src="${match.imageUrl}" alt="${match.name}">
            <div class="match-card-info">
                <h3>${match.name}</h3>
                <p class="match-date">${match.date}</p>
            </div>
        </div>
    `).join('');

    // 添加点击事件监听
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.match-card');
        if (card) {
            const index = parseInt(card.dataset.index);
            currentIndex = index;
            updateSlide();
            // 平滑滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

function initPageTransitions() {
    // 页面切换效果的初始化代码
}

function initLazyLoading() {
    // 懒加载图片等资源的初始化代码
}

document.addEventListener('DOMContentLoaded', () => {
    loadMatchData().then(() => {
        loadMatchesGrid();
    });
    initPageTransitions();
    initLazyLoading();
});
