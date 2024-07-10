<template>
  <div class="justify-between items-center self-stretch operation">
    <a-page-header class="font_3 text_5" title="Operation" :show-back="false">
      <template #extra>
        <a-space class="flex-row group_4">
          <button class="image-button">
            <img class="image" src="../../assets/svg/ArrowLeft.svg" />
          </button>
          <button class="ml-24 image-button">
            <img class="image" src="../../assets/svg/ArrowRight.svg" />
          </button>
          <button class="ml-24 image-button">
            <img class="image" src="../../assets/svg/CloudSync.svg" />
          </button>
          <button class="ml-24 image-button">
            <img class="image" src="../../assets/svg/play-circle.svg" />
          </button>
          <button class="ml-24 image-button">
            <img class="image" src="../../assets/svg/Upload.svg" />
          </button>
        </a-space>
      </template>
    </a-page-header>
  </div>
</template>

<style>
  .operation {
    background-color: var(--color-bg-2);
    border: 1px solid var(--color-border);
  }

  .font_3 {
    font-size: 1rem;
    font-family: Lexend;
    line-height: 0.93rem;
    color: #909399;
  }

  .text_5 {
    line-height: 1rem;
  }

  .group_4 {
    margin-right: 1.38rem;
  }

  .image {
    width: 1.56rem;
    height: 1.56rem;
  }

  .flex-row {
    display: flex;
    align-items: center;
  }

  .image-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
  }

  .image-button img {
    display: block;
    width: 24px;
    height: 24px;
  }

  .ml-24 {
    margin-left: 24px;
  }

  .image-button:hover img {
    filter: brightness(0.8);
  }
</style>
