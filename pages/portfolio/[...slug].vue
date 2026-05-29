<script setup>
const route = useRoute()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam

await navigateTo(slug ? `/work/${slug}` : '/work', { redirectCode: 301 })
</script>
