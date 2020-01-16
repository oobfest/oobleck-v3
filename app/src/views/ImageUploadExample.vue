<template lang="pug">
  div
    image-upload(@upload-image="getImageUrls")
    p {{id}}
    p {{deletehash}}
</template>

<script>
  import ImageUpload from '@/components/ImageUpload.vue'
  export default {
    components: { ImageUpload },
    data() {
      return {
        id: null,
        deletehash: null
      }
    },
    methods: {
      getImageUrls(payload) {
        console.log(payload)
        this.id = payload.id
        this.deletehash = payload.deletehash
      }
    }
  }
</script>
