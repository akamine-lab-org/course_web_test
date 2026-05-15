const parts = document.querySelectorAll('.logo-part');
const header = document.querySelector('header');
const ie_logo = document.querySelector('#ie-logo');
const fixed_header = document.querySelector("#fixed-header");

function update() {
    const headerHeight = header.offsetHeight;
    const imgHeight = parts[0].offsetHeight;

    let totalImgHeight = 0;
    parts.forEach(img => totalImgHeight += img.offsetHeight);

    // const global_scale = header.offsetHeight / 1024;
    const minScroll = headerHeight / 2 - totalImgHeight / 2 + 30;
    const maxScroll = minScroll + totalImgHeight / 2;


    const targetScale = 512 / totalImgHeight / 10 * (fixed_header.offsetHeight / 40);

    const logoLeft = ie_logo.getBoundingClientRect().left;
    const logoTop = fixed_header.offsetHeight / 2 - imgHeight * targetScale / 2 - 5;
    const headerLeft = header.getBoundingClientRect().left;

    // const headerWidth = header.offsetWidth;


    let cumulativeX = logoLeft;

    // progress = Math.pow(progress, 1.5);
    parts.forEach((img, i) => {
        let scrollY = window.scrollY;
        // let scrollY = Math.min(Window.scrollY, minScroll);
        //scrollY = Math.max(0, Math.min(scrollY, maxScroll));
        boundedScroll = Math.max(0, scrollY - minScroll);
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
        const progress = Math.max(0, Math.min((boundedScroll - i * imgHeight) / (maxScroll - minScroll), 1));

        // 初期位置: header内中央で縦に並ぶ（背景的に固定）
        const startX = headerLeft + 20;
        const startY = 35 + headerHeight / 2 - totalImgHeight / 2 + i * imgHeight - Math.min(minScroll - 40 + i * imgHeight, scrollY);

        // 最終位置: main左に敷き詰める
        const endX = cumulativeX;// - header.offsetLeft;
        const endY = logoTop; //;
        const endScale = targetScale;

        // progressが0の間は中央で固定
        const currentX = startX + (endX - startX) * progress;
        const currentY = (1 - progress) * startY + (endY) * progress;
        const scale = 1 * (1 - progress) + endScale * progress;

        // console.log(scale)

        img.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        // img.style.zIndex = 99 - i;

        cumulativeX += imgWidth * endScale;
        fixed_header.style.setProperty('--bg-opacity', `${progress}`);


    });
}


window.addEventListener('scroll', () => {
    update();
});

// ✅ ページ読み込み時（再読込対応）
window.addEventListener('DOMContentLoaded', () => {
    update();


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
                observer.unobserve(entry.target); // 一度きりでOKなら
            }
        });
    }, {
        threshold: 0.1  // 要素の10%が見えたら反応
    });

    document.querySelectorAll("h2").forEach(h2 => {
        observer.observe(h2);
    });
    document.querySelectorAll("h1").forEach(h1 => {
        observer.observe(h1);
    });

    console.log("contentloaded");


});

window.addEventListener('resize', () => {
    update();
});

window.onload = function () {
    update();
    console.log("onload");
};

