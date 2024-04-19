<template>
  <div id="page">
    <header class="layout-header">
      <div class="layout-header__main">
        <img class="layout-header__main-icon" src="/favicon.ico" />
      </div>
    </header>
    <main>
      <slot />
    </main>
    <footer class="layout-footer">
      <div class="layout-footer__main">
        <a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2023024244号</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
@import '~/assets/less/layout.less';

#page {
  & > main {
    height: calc(100vh - var(--height-header));
  }
}

.layout-header {
  height: var(--height-header);
  width: 100%;
  backdrop-filter: blur(8px);

  z-index: 50;
  background-color: var(--bg-header);

  position: sticky;
  top: 0;

  .layout-header__main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .layout-main();

    .layout-header__main-icon {
      height: 32px;
      width: 32px;
    }
  }
}

.layout-footer {
  height: var(--height-footer);
  width: 100%;

  .layout-footer__main {
    height: 100%;
    .layout-main();

    display: flex;
    flex-flow: column;

    a {
      color: var(--color-url);
      cursor: pointer;
      &:hover {
        color: var(--color-url-hover);
      }
    }
  }
}
</style>
