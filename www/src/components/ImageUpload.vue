<template lang="pug">
  div
    label Select Image
    input(type="file" accept="image/*" @change="uploadImage")
    p Image hosting provided by 
      a(href="https://imgur.com/" target="_blank") Imgur
      | .
</template>

<script>
  export default {
    methods: {
      uploadImage(event) {

        // Get image data from event
        let image = event.target.files[0]

        // Check file size
        if(image.size > (1024 * 1000 * 10)) {
          alert("Image cannot be larger than 10MB")
          return
        }

        // Format image data
        let imageData = new FormData()
        imageData.append('image', image)

        let fetchConfiguration = {
          method: 'POST',
          headers: {
            'X-mashape-Key': 'MeRL1vcC70mshcx4yVw7R4jv88gnp11IPvPjsn4GKcdklk5FiE',
            'Authorization': 'Client-ID c60e83c906306c5'
          },
          body: imageData
        }

        fetch('https://imgur-apiv3.p.mashape.com/3/image', fetchConfiguration)
          .then(response=> response.json())
          .then(json=> this.$emit('upload-image', json.data))
          .catch(error => console.error(error))

      },
      uploadProgress(event) {
        if (event.lengthComputable) {
          this.submission.image.progress = parseInt((event.loaded / event.total) * 100)
        }
      }
    }
  }
</script>
