<template>
  <footer
    class="pt-12 pb-24 px-4 shadow-light-900 shadow-xl backdrop-filter backdrop-blur text-sm flex flex-col md:flex-row md:justify-between items-start"
  >
    <nav
      class="flex flex-row justify-between items-start md:items-start mb-4 gap-4 flex-col"
    >
      <div class="text-left">
        <span class="text-gray-300 block font-bold">Support</span>
        <span class="block text-gray-300 text-opacity-80">
          partyfinderfaq@gmail.com
        </span>
      </div>
      <nuxt-link to="/privacy-policy" class="font-bold text-blue-400 underline">
        Terms of Use and Privacy Policy
      </nuxt-link>
    </nav>
    <span class="opacity-80 text-left md:text-right block mt-12 md:mt-0">
      &copy; {{ new Date().getFullYear() }} - partyfinder
    </span>
  </footer>
</template>

<style>
footer {
  background: linear-gradient(
    131.84deg,
    rgba(203, 220, 251, 0.26) 0%,
    rgba(209, 223, 250, 0.12) 100%
  );
}
</style>
