<template>
  <div
    class="flex items-start justify-center mt-15 gap-30 benefits-promo flex-wrap"
  >
    <div>
      <img src="@/assets/promo/community.svg" alt="Active community" />
      <p>
        <b>Active community</b>, we carry out surveys to improve the platform.
      </p>
    </div>
    <div>
      <img src="@/assets/promo/boosts.svg" alt="Free Boost" />
      <p>
        Free Boost every 3 days. Enjoy <b>the top positions</b>.
      </p>
    </div>
    <div>
      <img src="@/assets/promo/support.svg" alt="Technical support" />
      <p>
        We have <b>the best technical support</b>, solving your doubts instantly.
      </p>
    </div>
  </div>
</template>

<style scoped>
.benefits-promo > div {
  @apply max-w-[276px] flex flex-col items-center gap-3;
}
</style>
