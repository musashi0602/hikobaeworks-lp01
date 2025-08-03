// Hero background slider - 3秒間隔で自動画像切り替え
(function() {
    let currentSlide = 0;
    let slideInterval;
    let slides, indicators;
    let isActive = false;
    let isTransitioning = false;

    function initSlider() {
        slides = document.querySelectorAll('.hero-slide');
        indicators = document.querySelectorAll('.hero-indicator');
        
        console.log('スライダー初期化 - スライド数:', slides.length);
        
        if (slides.length === 0 || indicators.length === 0) {
            console.error('スライドまたはインジケーターが見つかりません');
            return false;
        }
        return true;
    }

    function changeSlide() {
        if (!slides || !indicators || isTransitioning) return;
        
        isTransitioning = true;
        console.log('スライド切り替え実行 - 現在:', currentSlide);
        
        const currentSlideElement = slides[currentSlide];
        const currentIndicator = indicators[currentSlide];
        
        // 次のスライドに移動
        const nextSlide = (currentSlide + 1) % slides.length;
        const nextSlideElement = slides[nextSlide];
        const nextIndicator = indicators[nextSlide];
        
        // 現在のスライドをクロスフェードでフェードアウト
        currentSlideElement.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        currentSlideElement.style.opacity = '0.3';
        currentIndicator.classList.remove('active');
        
        // 次のスライドを準備（少し透明な状態で）
        currentSlide = nextSlide;
        nextSlideElement.style.opacity = '0.3';
        nextSlideElement.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        nextSlideElement.classList.add('active');
        nextIndicator.classList.add('active');
        
        console.log('新しいスライド:', currentSlide);
        
        // 300ms後にクロスフェード開始
        setTimeout(() => {
            currentSlideElement.style.opacity = '0';
            nextSlideElement.style.opacity = '1';
            
            // クロスフェード完了後にクリーンアップ
            setTimeout(() => {
                currentSlideElement.classList.remove('active');
                currentSlideElement.style.opacity = '0';
                isTransitioning = false;
            }, 1200);
        }, 300);
    }

    function startSlideshow() {
        if (isActive) return;
        
        console.log('スライドショー開始 - 4秒間隔');
        slideInterval = setInterval(changeSlide, 4000); // 4秒間隔
        isActive = true;
    }

    function stopSlideshow() {
        if (!isActive) return;
        
        console.log('スライドショー停止');
        clearInterval(slideInterval);
        isActive = false;
    }

    function goToSlide(index) {
        if (!slides || !indicators || index === currentSlide || isTransitioning) return;
        
        isTransitioning = true;
        const currentSlideElement = slides[currentSlide];
        const currentIndicator = indicators[currentSlide];
        const targetSlideElement = slides[index];
        const targetIndicator = indicators[index];
        
        // 現在のスライドをクロスフェードでフェードアウト
        currentSlideElement.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        currentSlideElement.style.opacity = '0.3';
        currentIndicator.classList.remove('active');
        
        // 指定のスライドを準備（少し透明な状態で）
        currentSlide = index;
        targetSlideElement.style.opacity = '0.3';
        targetSlideElement.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        targetSlideElement.classList.add('active');
        targetIndicator.classList.add('active');
        
        console.log('スライド手動切り替え:', currentSlide);
        
        // 300ms後にクロスフェード開始
        setTimeout(() => {
            currentSlideElement.style.opacity = '0';
            targetSlideElement.style.opacity = '1';
            
            // クロスフェード完了後にクリーンアップ
            setTimeout(() => {
                currentSlideElement.classList.remove('active');
                currentSlideElement.style.opacity = '0';
                isTransitioning = false;
            }, 1200);
        }, 300);
    }

    // DOM読み込み完了時に初期化
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM読み込み完了');
        
        if (!initSlider()) {
            return;
        }

        // 最初のスライドを確実に表示
        slides[0].classList.add('active');
        slides[0].style.opacity = '1';
        indicators[0].classList.add('active');
        
        // 他のスライドは透明にしておく
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.opacity = '0';
        }
        
        // インジケータークリックイベント
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                console.log('インジケータークリック:', index);
                stopSlideshow();
                goToSlide(index);
                setTimeout(startSlideshow, 1000);
            });
        });
        
        // ホバー時の停止/再開
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopSlideshow);
            hero.addEventListener('mouseleave', startSlideshow);
        }
        
        // 1秒後にスライドショー開始
        setTimeout(function() {
            console.log('自動スライドショー開始');
            startSlideshow();
        }, 0);
    });
})();