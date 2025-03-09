// 数据模拟 - 在实际项目中，这些数据通常从服务器获取
const photoData = [
    {
        id: 1,
        title: '山间日出',
        category: 'nature',
        description: '清晨的山间日出，金色的阳光洒在山峦上',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-01-15'
    },
    {
        id: 2,
        title: '城市夜景',
        category: 'travel',
        description: '灯火通明的城市夜景，繁华与宁静并存',
        image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-02-20'
    },
    {
        id: 3,
        title: '美味早餐',
        category: 'food',
        description: '营养丰富的健康早餐，开启美好的一天',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-03-10'
    },
    {
        id: 4,
        title: '微笑的女孩',
        category: 'people',
        description: '灿烂微笑的女孩，阳光下的纯真',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-04-05'
    },
    {
        id: 5,
        title: '海滩日落',
        category: 'nature',
        description: '金色的海滩日落，宁静而美丽',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-05-12'
    },
    {
        id: 6,
        title: '古老街道',
        category: 'travel',
        description: '欧洲古老的石板街道，历史的痕迹',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-06-18'
    },
    {
        id: 7,
        title: '精致甜点',
        category: 'food',
        description: '色彩鲜艳的精致甜点，视觉与味觉的享受',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-07-22'
    },
    {
        id: 8,
        title: '老人的智慧',
        category: 'people',
        description: '饱经风霜的老人，充满智慧的眼神',
        image: 'https://images.unsplash.com/photo-1505503693641-1926193e8d57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        date: '2025-08-30'
    }
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 初始化照片库
    initPhotoGallery();

    // 初始化事件监听
    initEventListeners();

    // 初始化导航栏
    initNavigation();

    // 初始化联系表单
    initContactForm();
});

// 初始化照片库
function initPhotoGallery() {
    const photoContainer = document.getElementById('photo-container');

    // 渲染所有照片
    renderPhotos(photoData);

    // 过滤按钮事件
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 过滤照片
            if (filter === 'all') {
                renderPhotos(photoData);
            } else {
                const filteredPhotos = photoData.filter(photo => photo.category === filter);
                renderPhotos(filteredPhotos);
            }
        });
    });

    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', function () {
        searchPhotos(searchInput.value.trim());
    });

    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            searchPhotos(this.value.trim());
        }
    });

    // 加载更多按钮
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.addEventListener('click', function () {
        // 这里可以加载更多照片的逻辑
        // 在实际项目中，可能会从服务器请求更多数据
        alert('在实际项目中，这里会加载更多照片');
    });
}

// 渲染照片列表
function renderPhotos(photos) {
    const photoContainer = document.getElementById('photo-container');
    photoContainer.innerHTML = '';

    if (photos.length === 0) {
        photoContainer.innerHTML = '<p class="no-results">没有找到匹配的照片</p>';
        return;
    }

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item';
        photoElement.setAttribute('data-id', photo.id);

        photoElement.innerHTML = `
            <input type="checkbox" class="checkbox" data-id="${photo.id}">
            <img src="${photo.image}" alt="${photo.title}">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
            </div>
        `;

        // 点击照片打开模态框
        photoElement.querySelector('img').addEventListener('click', function (e) {
            e.stopPropagation();
            openPhotoModal(photo);
        });

        photoContainer.appendChild(photoElement);
    });

    // 更新批量操作按钮状态
    updateBatchOperationButtons();
}

// 搜索照片
function searchPhotos(query) {
    if (!query) {
        renderPhotos(photoData);
        return;
    }

    query = query.toLowerCase();
    const filteredPhotos = photoData.filter(photo =>
        photo.title.toLowerCase().includes(query) ||
        photo.description.toLowerCase().includes(query) ||
        photo.category.toLowerCase().includes(query)
    );

    renderPhotos(filteredPhotos);
}

// 打开照片模态框
function openPhotoModal(photo) {
    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');

    modalImage.src = photo.image;
    modalImage.alt = photo.title;

    // 记录当前照片ID，用于上一张/下一张功能
    modalImage.setAttribute('data-id', photo.id);

    modal.style.display = 'block';

    // 禁止滚动
    document.body.style.overflow = 'hidden';
}

// 关闭照片模态框
function closePhotoModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'none';

    // 恢复滚动
    document.body.style.overflow = 'auto';
}

// 初始化事件监听
function initEventListeners() {
    // 关闭模态框
    document.querySelector('.close-modal').addEventListener('click', closePhotoModal);

    // 点击模态框外部关闭
    const modal = document.getElementById('photo-modal');
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            closePhotoModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePhotoModal();
        }
    });

    // 上一张/下一张照片
    document.getElementById('prev-photo').addEventListener('click', showPreviousPhoto);
    document.getElementById('next-photo').addEventListener('click', showNextPhoto);

    // 全选/取消全选
    document.getElementById('select-all-btn').addEventListener('click', selectAllPhotos);
    document.getElementById('deselect-all-btn').addEventListener('click', deselectAllPhotos);

    // 下载选中照片
    document.getElementById('download-selected-btn').addEventListener('click', downloadSelectedPhotos);

    // 删除选中照片
    document.getElementById('delete-selected-btn').addEventListener('click', deleteSelectedPhotos);

    // 批量编辑功能
    document.getElementById('rotate-btn').addEventListener('click', rotateSelectedPhotos);
    document.getElementById('resize-btn').addEventListener('click', resizeSelectedPhotos);
    document.getElementById('filter-btn').addEventListener('click', applyFilterToSelectedPhotos);

    // 单个照片下载
    document.getElementById('download-photo').addEventListener('click', downloadCurrentPhoto);
}

// 显示上一张照片
function showPreviousPhoto() {
    const modalImage = document.getElementById('modal-image');
    const currentId = parseInt(modalImage.getAttribute('data-id'));

    // 找到当前照片在数据中的索引
    const currentIndex = photoData.findIndex(photo => photo.id === currentId);

    // 获取上一张照片的索引（如果是第一张，则循环到最后一张）
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photoData.length - 1;

    // 更新模态框中的照片
    modalImage.src = photoData[prevIndex].image;
    modalImage.alt = photoData[prevIndex].title;
    modalImage.setAttribute('data-id', photoData[prevIndex].id);
}

// 显示下一张照片
function showNextPhoto() {
    const modalImage = document.getElementById('modal-image');
    const currentId = parseInt(modalImage.getAttribute('data-id'));

    // 找到当前照片在数据中的索引
    const currentIndex = photoData.findIndex(photo => photo.id === currentId);

    // 获取下一张照片的索引（如果是最后一张，则循环到第一张）
    const nextIndex = currentIndex < photoData.length - 1 ? currentIndex + 1 : 0;

    // 更新模态框中的照片
    modalImage.src = photoData[nextIndex].image;
    modalImage.alt = photoData[nextIndex].title;
    modalImage.setAttribute('data-id', photoData[nextIndex].id);
}

// 全选照片
function selectAllPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });

    updateBatchOperationButtons();
}

// 取消全选
function deselectAllPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    updateBatchOperationButtons();
}

// 更新批量操作按钮状态
function updateBatchOperationButtons() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox');
    const selectedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    const downloadBtn = document.getElementById('download-selected-btn');
    const deleteBtn = document.getElementById('delete-selected-btn');

    if (selectedCount > 0) {
        downloadBtn.disabled = false;
        deleteBtn.disabled = false;
    } else {
        downloadBtn.disabled = true;
        deleteBtn.disabled = true;
    }
}

// 下载选中照片
function downloadSelectedPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox:checked');
    if (checkboxes.length === 0) return;

    const selectedIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-id')));
    const selectedPhotos = photoData.filter(photo => selectedIds.includes(photo.id));

    alert(`在实际项目中，这里会下载${selectedPhotos.length}张选中的照片`);

    // 在实际项目中，这里可能会触发一个批量下载功能
    // 可能涉及创建一个zip文件或一系列的下载任务
}

// 删除选中照片
function deleteSelectedPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox:checked');
    if (checkboxes.length === 0) return;

    if (confirm(`确定要删除${checkboxes.length}张选中的照片吗？`)) {
        const selectedIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-id')));

        // 在实际项目中，这里会从服务器删除照片
        // 这里仅做前端模拟
        const remainingPhotos = photoData.filter(photo => !selectedIds.includes(photo.id));
        renderPhotos(remainingPhotos);

        alert('选中的照片已删除');
    }
}

// 旋转选中照片
function rotateSelectedPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox:checked');
    if (checkboxes.length === 0) {
        alert('请先选择要旋转的照片');
        return;
    }

    const angle = prompt('请输入旋转角度（顺时针，单位：度）', '90');
    if (angle === null) return;

    alert(`在实际项目中，这里会将${checkboxes.length}张照片顺时针旋转${angle}度`);

    // 在实际项目中，这里会执行照片旋转操作
    // 可能涉及图像处理库或发送请求到服务器进行处理
}

// 调整选中照片大小
function resizeSelectedPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox:checked');
    if (checkboxes.length === 0) {
        alert('请先选择要调整大小的照片');
        return;
    }

    const width = prompt('请输入新的宽度（像素）', '800');
    if (width === null) return;

    const height = prompt('请输入新的高度（像素），或留空按比例缩放', '');

    alert(`在实际项目中，这里会将${checkboxes.length}张照片调整到 ${width}x${height || '自适应'} 像素`);

    // 在实际项目中，这里会执行照片大小调整操作
    // 可能涉及图像处理库或发送请求到服务器进行处理
}

// 为选中照片应用滤镜
function applyFilterToSelectedPhotos() {
    const checkboxes = document.querySelectorAll('.photo-item .checkbox:checked');
    if (checkboxes.length === 0) {
        alert('请先选择要应用滤镜的照片');
        return;
    }

    const filters = ['黑白', '复古', '暖色调', '冷色调', '锐化', '模糊'];
    const filterOptions = filters.map((filter, index) => `${index + 1}. ${filter}`).join('\n');

    const selectedFilter = prompt(`请选择要应用的滤镜（输入数字）：\n${filterOptions}`, '1');
    if (selectedFilter === null) return;

    const filterName = filters[parseInt(selectedFilter) - 1] || '未知';

    alert(`在实际项目中，这里会为${checkboxes.length}张照片应用 ${filterName} 滤镜`);

    // 在实际项目中，这里会执行应用滤镜的操作
    // 可能涉及图像处理库或发送请求到服务器进行处理
}

// 下载当前显示的照片
function downloadCurrentPhoto() {
    const modalImage = document.getElementById('modal-image');
    const photoId = parseInt(modalImage.getAttribute('data-id'));
    const photo = photoData.find(p => p.id === photoId);

    if (photo) {
        alert(`在实际项目中，这里会下载 "${photo.title}" 照片`);

        // 在实际项目中，这里会触发文件下载
        // const link = document.createElement('a');
        // link.href = photo.image;
        // link.download = photo.title;
        // link.click();
    }
}

// 初始化导航栏
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');

    // 点击导航链接滚动到相应位置
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // 移除所有链接的active类
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // 添加当前链接的active类
            this.classList.add('active');

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去头部高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时更新导航状态
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        // 获取所有区块
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // 减去偏移量
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');

                // 更新导航链接状态
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// 初始化联系表单
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // 在实际项目中，这里会发送表单数据到服务器
        // 这里仅做前端模拟
        alert(`谢谢您的留言，${name}！\n在实际项目中，您的留言会被发送到服务器。`);

        // 重置表单
        contactForm.reset();
    });
}

// 检测页面上的复选框变化，更新批量操作按钮状态
document.addEventListener('change', function (e) {
    if (e.target.classList.contains('checkbox')) {
        updateBatchOperationButtons();
    }
}); 