<!-- page header -->
<template>
    <nav class="main-nav">
        <div class="nav-left">
            <img src="../assets/images/logo.png" alt="RERI Logo" class="nav-logo" />
            <span class="brand-name">RERI</span>
        </div>
        <div class="nav-right">
            <div>
                <n-button>{{ $t('login') }}</n-button>
                <n-icon size="18">
                    <Person />
                </n-icon>
            </div>
            <n-dropdown trigger="hover" :options="langOpts" @select="switchLang">
                <n-button strong secondary>
                    {{ currentLangLabel }}
                </n-button>
            </n-dropdown>
        </div>
    </nav>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { Person } from '@vicons/ionicons5'

const { locale } = useI18n();

const langOpts = [
    { label: '🇩🇪 Deutsch', key: 'de' },
    { label: '🇬🇧 English', key: 'en' },
];

const switchLang = (lang) => {
    locale.value = lang;
};

const currentLangLabel = computed(() => {
    const found = langOpts.find(opt => opt.key === locale.value);
    return found ? found.label : locale.value;
});
</script>

<style scoped>
/* 顶部导航栏 */
.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    position: sticky;
    top: 0;
    z-index: 10;
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.nav-logo {
    height: 88px;
    width: auto;
    object-fit: contain;
}

.brand-name {
    font-size: 1.7rem;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: 2px;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>