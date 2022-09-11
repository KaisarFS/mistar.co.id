<template>
  <v-row justify="center" align="center">
    <vue-cropper
      ref="cropper"
      class="mx-5 mb-3 img-crop"
      v-if="originalImage && previewImage"
      :src="previewImage"
      :cropBoxMovable="false"
      :cropBoxResizable="false"
      :minCropBoxWidth="150"
      :minCropBoxHeight="200"
      :minContainerWidth="150"
      :minContainerHeight="200"
      :viewMode="3"
      :responsive="true"
      :background="false"
      :crop="getCropImage"
      :zoomOnTouch="true"
      dragMode="move"
    >
    </vue-cropper>

    <label v-else id="dropContainer" for="fileFoto" class="image-undefined">
      <v-icon x-large color="grey lighten-1">mdi-plus</v-icon>
    </label>

    <v-file-input
      :loading="uploadFile && previewImage === null"
      :rules="[v => !v || v.size < maxSize || 'Maksimal foto adalah 5 MB']"
      accept="image/*"
      id="fileFoto"
      v-model="originalImage"
      :label="$t('app.photo')"
      prepend-icon="mdi-face"
      show-size
      style="width: 100%; cursor: pointer"
      @change="onFileChange"
    ></v-file-input>

    <div v-if="originalImage">
      <!-- <v-slider
        v-model="zoomValue"
        :max="1"
        :min="0"
        :step="0.1"
        @change="zoomHandler"
        hide-details
      ></v-slider> -->
      <v-btn text icon dense @click="$refs.cropper.rotate(-90)"
        ><v-icon>mdi-rotate-left</v-icon>
      </v-btn>
      <v-btn text icon dense @click="$refs.cropper.rotate(90)">
        <v-icon>mdi-rotate-right</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default {
  components: { VueCropper },
  props: {
    cropedImage: {
      type: Function
    }
  },
  data() {
    return {
      maxSize: 5000000,
      originalImage: null,
      previewImage: null,
      uploadFile: false,
      zoomValue: 0
    };
  },
  methods: {
    async onFileChange() {
      this.previewImage = null;
      if (this.originalImage && this.originalImage.size <= this.maxSize) {
        this.uploadFile = true;
        if (this.originalImage) {
          const convertToBase64 = await toBase64(this.originalImage);

          if (convertToBase64) {
            setTimeout(() => {
              this.previewImage = convertToBase64;
              this.uploadFile = false;
            }, 1000);
          }
        } else {
          this.cropedImage(null);
        }
      } else {
        this.originalImage = null;
        this.uploadFile = false;
      }
    },
    getCropImage() {
      const croped = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.cropedImage(croped);
    }
    // zoomHandler() {
    //   console.log(this.zoomValue);
    //   this.$refs.cropper.relativeZoom(this.zoomValue);
    // }
  }
};
</script>

<style lang="scss" scoped>
.img-crop,
.image-undefined {
  width: 150px;
  height: 200px;
}

.image-undefined {
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-wrap: wrap;
}

.cropper-view-box {
  border: 1px solid lightgrey !important;
  border-radius: 5px !important;
  outline: none !important;
}
.cropper-modal {
  background-color: transparent !important;
}
</style>
