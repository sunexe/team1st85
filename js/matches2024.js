let currentMatches = [];
let currentIndex = 0;

async function loadMatchData() {
    try {
        const response = await fetch('/data/matches2024.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.matches || [];
    } catch (error) {
        console.error('加载比赛数据失败:', error);
        return [];
    }
}

function updateHeroSection(match) {
    const slider = document.querySelector('.slider');
    const matchInfo = document.querySelector('.match-info');
    
    if (!match) return;

    slider.style.backgroundImage = `url(${match.imageUrl})`;
    matchInfo.innerHTML = `
        <h2>${match.name}</h2>
        <p>${match.date}</p>
        <p>${match.location}</p>
        ${match.videoUrls && match.videoUrls.length > 0 ? 
            `<div class="video-links">
                ${match.videoUrls.map(url => 
                    `<a href="${url}" target="_blank">观看视频</a>`
                ).join('')}
            </div>` : ''
        }
    `;
}

function updateMatchesGrid(matches) {
    const grid = document.querySelector('.matches-grid');
    grid.innerHTML = matches.map(match => `
        <div class="match-card">
            <img src="${match.imageUrl}" alt="${match.name}" onerror="this.src='/images/placeholder.jpg'">
            <div class="match-card-info">
                <div class="card-info-row">
                    <p class="match-date">${match.date}</p>
                </div>
                <h3>${match.name}</h3>
                ${match.videoUrls && match.videoUrls.length > 0 ? 
                    `<div class="video-links">
                        ${match.videoUrls.map(url => 
                            `<a href="${url}" class="video-link" target="_blank">观看视频</a>`
                        ).join('')}
                    </div>` : ''
                }
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    currentMatches = await loadMatchData();
    if (currentMatches.length > 0) {
        updateHeroSection(currentMatches[0]);
        updateMatchesGrid(currentMatches);
    }

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentMatches.length;
        updateHeroSection(currentMatches[currentIndex]);
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentMatches.length) % currentMatches.length;
        updateHeroSection(currentMatches[currentIndex]);
    });
});
