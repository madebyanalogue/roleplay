<template>
  <component :is="tag" class="sanity-block">
    <template v-for="(child, index) in block.children" :key="index">
      <template v-if="child._type === 'span'">
        <template v-if="getLinkMark(child)">
          <a
            :href="getLinkMark(child).href"
            :target="isExternalUrl(getLinkMark(child).href) ? '_blank' : undefined"
            :rel="isExternalUrl(getLinkMark(child).href) ? 'noopener' : undefined"
          >
            {{ child.text }}
          </a>
        </template>
        <template v-else>
          <component
            :is="getSpanTag(child)"
            v-for="(mark, markIndex) in child.marks"
            :key="markIndex"
          >
            {{ child.text }}
          </component>
          <template v-if="!child.marks || child.marks.length === 0">
            {{ child.text }}
          </template>
        </template>
      </template>
    </template>
  </component>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
})

const tag = computed(() => {
  const style = props.block.style || 'normal'
  const tagMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    blockquote: 'blockquote',
    normal: 'p',
  }
  return tagMap[style] || 'p'
})

const getLinkMark = (child) => {
  if (!child.marks?.length || !props.block.markDefs) return null
  const linkKey = child.marks.find((m) => {
    const def = props.block.markDefs.find((d) => d._key === m)
    return def?._type === 'link' && def?.href
  })
  if (!linkKey) return null
  return props.block.markDefs.find((d) => d._key === linkKey && d._type === 'link')
}

const isExternalUrl = (url) => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

const getSpanTag = (child) => {
  if (!child.marks || child.marks.length === 0) return 'span'
  const mark = child.marks[0]
  const markMap = {
    strong: 'strong',
    em: 'em',
    underline: 'u',
    code: 'code',
  }
  return markMap[mark] || 'span'
}
</script>

