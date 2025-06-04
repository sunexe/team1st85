// 团队照片数据
const teamPhotos = [
    {
        src: 'team/h1.jpg',
        caption: '2019.8.3活动全家福'
    },
    {
        src: 'team/h2.jpg',
        caption: '2019.8.3活动全家福'
    },
    {
        src: 'team/h3.jpg',
        caption: '2019.8.3活动合影一'
    },
    {
        src: 'team/h4.jpg',
        caption: '2019.8.3活动合影二'
    },
    {
        src: 'team/h5.jpg',
        caption: '2019.8.3活动合影三'
    },
    {
        src: 'team/h6.jpg',
        caption: '2019.8.3活动合影四'
    },
    {
        src: 'team/h7.jpg',
        caption: '2019.8.3活动合影五'
    },
    {
        src: 'team/h8.jpg',
        caption: '2019.8.3活动合影六'
    },
    {
        src: 'team/h9.jpg',
        caption: '2019.8.3活动合影七'
    },
    {
        src: 'team/h10.jpg',
        caption: '2019.8.3活动合影八'
    },
    {
        src: 'team/h11.jpg',
        caption: '2019.8.3活动合影'
    },
    {
        src: 'team/h12.jpg',
        caption: '2019.8.3活动合影'
    },
    {
        src: 'team/h13.jpg',
        caption: '2019.8.3活动合影八'
    },
    {
        src: 'team/h14.jpg',
        caption: '2019.8.3活动合影八'
    },
    {
        src: 'team/301.png',
        caption: '青葱岁月：运动队合影'
    },
    {
        src: 'team/501.jpg',
        caption: '青葱岁月：郊游合影'
    },
    {
        src: 'team/1班.jpg',
        caption: '青葱岁月：1班集体照'
    },
    {
        src: 'team/2班.jpg',
        caption: '青葱岁月：2班集体照'
    },
    {
        src: 'team/3班.jpg',
        caption: '青葱岁月：3班集体照'
    },
    {
        src: 'team/4班.jpg',
        caption: '青葱岁月：4班集体照'
    },
    {
        src: 'team/5班.jpg',
        caption: '青葱岁月：5班集体照'
    },
    {
        src: 'team/6班.jpg',
        caption: '青葱岁月：6班集体照'
    }
    // 可以继续添加更多照片
];

// 创建Lightbox组件
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="">
            <button class="close-btn">&times;</button>
        </div>
    `;
    
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox || e.target.classList.contains('close-btn')) {
            lightbox.classList.remove('active');
        }
    });
    
    document.body.appendChild(lightbox);
    return lightbox;
}

// 显示大图
function showLightbox(imgSrc) {
    const lightbox = document.querySelector('.lightbox') || createLightbox();
    const img = lightbox.querySelector('img');
    img.src = imgSrc;
    lightbox.classList.add('active');

    const closeBtn = lightbox.querySelector('.close-btn');
    closeBtn.onclick = () => lightbox.classList.remove('active');
    
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    };
}

// 加载相册
function loadGallery() {
    const grid = document.querySelector('.gallery-grid');
    grid.innerHTML = ''; // 清空现有内容

    teamPhotos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption}">
            <div class="photo-caption">${photo.caption}</div>
        `;
        
        item.addEventListener('click', () => showLightbox(photo.src));
        grid.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadGallery);
