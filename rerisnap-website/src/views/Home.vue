<template>
    <div class="site-wrapper">
        <!-- 顶部导航栏 -->
        <NavBar/>

        <!-- Banner 图（带文字蒙版） -->
        <div class="banner-wrapper">
            <img src="../assets/images/banner.jpg" alt="Banner" class="banner-img" />
            <div class="banner-mask"></div>
            <div class="banner-text">
                <h2>{{ $t('bannerTitle') }}</h2>
                <p>{{ $t('bannerDesc') }}</p>
            </div>
        </div>

        <!-- 主视觉区 -->
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">{{ $t("title") }}</h1>
                <p class="hero-subtitle">{{ $t("subtitle") }}</p>
                <a class="amazon-buy-btn" href="https://www.amazon.de/s?srs=20333238031&rh=p_89%3ARERI" target="_blank"
                    rel="noopener">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon"
                        class="amazon-logo" />
                    {{ $t("buyNow") }}
                </a>
            </div>
            <div class="hero-bg"></div>
        </section>

        <!-- 产品区 -->
        <section class="products-section">
            <h2 class="section-title">{{ $t("products") }}</h2>
            <div class="product-grid">
                <ProductCard v-for="product in products" :key="product.id" v-bind="product" />
            </div>
        </section>

        <!-- 页脚 -->
        <footer class="footer">
            <div class="footer-content">
                <div class="company-info">
                    <strong>RERI GmbH</strong>
                    <div>{{ $t('companyAddress') }}</div>
                </div>
                <div class="contact-info">
                    <span>Email: <a href="mailto:reri_service@outlook.com">reri_service@outlook.com</a></span>
                    <br>
                    <span>{{ $t('tel') }}: <a href="tel:+4915205846382">+49 152-0584-6382</a></span>
                </div>
                <!-- 新增社交媒体图标 -->
                <div class="social-icons">
                    <n-icon size="40">
                        <LogoFacebook />
                    </n-icon>
                    <n-icon size="40">
                        <LogoInstagram />
                    </n-icon>
                        <n-icon size="40">
                            <LogoTiktok />
                        </n-icon>
                        <n-icon size="40">
                            <LogoAmazon />
                        </n-icon>
                </div>
                <div class="copyright">
                    &copy; {{ new Date().getFullYear() }} RERI GmbH. All rights reserved.
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import NavBar from '../components/NavBar.vue'
import { LogoFacebook, LogoInstagram, LogoTiktok, Person, LogoAmazon } from '@vicons/ionicons5'
import ProductCard from "../components/ProductCard.vue";
import good1Img from "../assets/images/good1.jpg";
import good2Img from "../assets/images/good2.webp";
// import good3Img from "../assets/images/good3.jpg";





const products = [
    {
        id: 1,
        image: good1Img,
        title: "Druckknopf Set",
        description: "Für Leder & Stoff – vier Größen inkl. Werkzeug",
        link: "https://www.amazon.de/s?srs=20333238031&rh=p_89%3ARERI",
    },
    {
        id: 1,
        image: good2Img,
        title: "AXE",
        description: "Awl Wooden Handle Round Blade Awl 1 Piece",
        link: "https://www.amazon.de/-/en/Wooden-Handle-Round-Blade-Piece/dp/B07GHDLK3L/ref=sr_1_1?dib=eyJ2IjoiMSJ9.LaWJgMTLaiimBFn7548MNK9aWlSKtqPZ3MkdEfQ61eLCXqlHoVLHsm2yJVpza0Wq4geyGQ9B53oduOlYJXI909p2RLklRgusA-GndjiXe6n8uBp8OKBZDnS0Tsy2eXVnTLAblDmh4Q3idsHbOHYqA8InNwv7TgRhFvuGPWh2h6uAFarYVsaCAffnRFfZOwtBJivuRrnubjdTnYPy9X-xyYIXBkgRXGemAF7HSxinNIKye-dEV2Ap5g3gXoL96H32w6hwE5HDcoICLYCtZvvtw-8xRNOMr2YtLnOXwsLe1Tc.xPntqUCJ4iUQuI57CMO_V9gKANKJlkyR2ZUZIjsGmew&dib_tag=se&qid=1754917726&refinements=p_89%3ARERI&sr=8-1&srs=20333238031",
    },
    {
        id: 1,
        image: good1Img,
        title: "Druckknopf Set",
        description: "Für Leder & Stoff – vier Größen inkl. Werkzeug",
        link: "https://www.amazon.de/s?srs=20333238031&rh=p_89%3ARERI",
    },
    {
        id: 2,
        image: good1Img,
        title: "Druckknopf Set",
        description: "Für Leder & Stoff – vier Größen inkl. Werkzeug",
        link: "https://www.amazon.de/s?srs=20333238031&rh=p_89%3ARERI",
    },
    {
        id: 3,
        image: good1Img,
        title: "Druckknopf Set",
        description: "Für Leder & Stoff – vier Größen inkl. Werkzeug",
        link: "https://www.amazon.de/s?srs=20333238031&rh=p_89%3ARERI",
    },
];
</script>

<style>
.site-wrapper {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    background: #f8fafc;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}



/* Banner 图 */
.banner-wrapper {
    width: 100%;
    height: 46vh; /* 高度始终为视口高度的46% */
    min-height: 120px;
    max-height: 420px;
    overflow: hidden;
    background: #e0e7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: banner-fade-in 1.2s cubic-bezier(.4,0,.2,1);
}

@keyframes banner-fade-in {
    0% {
        opacity: 0;
        transform: scale(1.08);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    display: block;
    transition: transform 0.8s cubic-bezier(.4,0,.2,1);
}

.banner-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(30, 41, 59, 0.38);
    z-index: 1;
    pointer-events: none;
    border-radius: 0 0 18px 18px;
}

.banner-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
    text-align: center;
    z-index: 2;
    width: 90%;
    max-width: 700px;
    pointer-events: none;
    opacity: 0;
    animation: banner-text-fade-in 1.2s 0.3s cubic-bezier(.4,0,.2,1) forwards;
}

@keyframes banner-text-fade-in {
    0% {
        opacity: 0;
        transform: translate(-50%, -40%);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

/* 主视觉区 */
.hero-section {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 340px;
    background: linear-gradient(90deg, #e0e7ff 0%, #f1f5f9 100%);
    position: relative;
    margin-bottom: 2rem;
}

.hero-content {
    z-index: 2;
    text-align: center;
    padding: 3rem 1rem 2rem 1rem;
}

.hero-title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 1rem;
    letter-spacing: 1px;
}

.hero-subtitle {
    font-size: 1.3rem;
    color: #64748b;
    margin-bottom: 2rem;
}

.amazon-buy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #2563eb;
    /* 修改为蓝色主色调 */
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 24px;
    padding: 0.7rem 1.6rem;
    font-size: 1.1rem;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    transition: background 0.2s;
}

.amazon-buy-btn:hover {
    background: #1d4ed8;
    /* 深蓝色悬停 */
}

.amazon-logo {
    height: 28px;
    width: auto;
}

/* 产品区 */
.products-section {
    max-width: 1100px;
    margin: 0 auto 3rem auto;
    padding: 0 1rem;
}

.section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1.5rem;
    text-align: center;
    letter-spacing: 1px;
}

.product-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.product-grid>* {
    flex: 1 1 330px;
    max-width: 360px;
    min-width: 330px;
    box-sizing: border-box;
}

/* 页脚 */
.footer {
    width: 100%;
    background: linear-gradient(90deg, #e0e7ff 0%, #f1f5f9 100%);
    padding: 2.5rem 0 1.2rem 0;
    margin-top: auto;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -2px 16px rgba(30, 41, 59, 0.04);
}

.footer-content {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    color: #334155;
    font-size: 1.05rem;
}

.company-info {
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
    color: #1e293b;
}

.contact-info {
    margin-bottom: 0.5rem;
}

.contact-info a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.contact-info a:hover {
    color: #1d4ed8;
    text-decoration: underline;
}

.social-icons {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 2rem;
}

.social-icon {
    color: #2563eb;
    transition: color 0.2s, transform 0.2s;
    cursor: pointer;
}

.social-icon:hover {
    color: #1d4ed8;
    transform: scale(1.15);
}

.copyright {
    flex-basis: 100%;
    text-align: center;
    color: #94a3b8;
    font-size: 0.98rem;
    margin-top: 1.2rem;
    letter-spacing: 0.5px;
    border-top: 1px solid #e5e7eb;
    padding-top: 0.8rem;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

/* 移动端适配 */
@media (max-width: 600px) {
    .main-nav {
        flex-direction: row;
        /* 保持一行 */
        align-items: center;
        padding: 0.8rem 1rem;
        gap: 0.5rem;
    }

    .nav-left {
        gap: 0.5rem;
    }

    .brand-name {
        font-size: 1.2rem;
    }

    .nav-logo {
        height: 48px;
    }

    .nav-right {
        width: auto;
        justify-content: flex-end;
    }

    .banner-text h2 {
        font-size: 1.1rem;
    }

    .banner-text p {
        font-size: 0.85rem;
    }

    .hero-section {
        min-height: 180px;
        margin-bottom: 1rem;
        padding: 0.5rem 0;
    }

    .hero-content {
        padding: 1.2rem 0.2rem 1rem 0.2rem;
    }

    .hero-title {
        font-size: 1.3rem;
    }

    .hero-subtitle {
        font-size: 0.95rem;
        margin-bottom: 1rem;
    }

    .amazon-buy-btn {
        font-size: 0.95rem;
        padding: 0.5rem 1rem;
    }

    .amazon-logo {
        height: 20px;
    }

    .products-section {
        padding: 0 0.2rem;
        margin-bottom: 1.2rem;
    }

    .section-title {
        font-size: 1.1rem;
        margin-bottom: 0.8rem;
    }

    .product-grid {
        flex-direction: column;
        gap: 1rem;
    }

    .product-grid>* {
        min-width: 0;
        max-width: 100%;
        flex: 1 1 100%;
    }

    .footer-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.7rem;
        font-size: 0.98rem;
        padding: 0 0.5rem;
    }

    .company-info {
        font-size: 1rem;
    }

    .contact-info {
        font-size: 0.98rem;
    }

    .social-icons {
        font-size: 1.5rem;
        gap: 0.7rem;
        margin-top: 0.2rem;
    }

    .copyright {
        font-size: 0.92rem;
        padding-top: 0.5rem;
        margin-top: 0.7rem;
    }
}
</style>
