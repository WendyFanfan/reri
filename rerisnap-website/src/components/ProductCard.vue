<template>
    <div class="card">
        <img :src="image" :alt="title" />
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <n-button tag="a" :href="link" target="_blank" type="primary">{{ $t("buyNow") }}</n-button>
    </div>
</template>

<script setup>
defineOptions({
    name: 'ProductCard'
})
defineProps(['image', 'title', 'description', 'link'])

</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    background: white;
}

img {
    max-width: 100%;
    width: 150px;
    border-radius: 6px;
}
</style>
