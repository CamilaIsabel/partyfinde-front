<template>
  <div class="max-w-35 sm:max-w-44 relative profile-card">
    <div class="relative">
      <img
        v-if="user.rank"
        :src="user.rank.icon.iconSrc"
        class="absolute -top-12px -left-12px"
        :class="user.rank.icon.iconClass"
      />
      <!-- Profile Image -->
      <img
        :src="user.profilePhoto"
        class="h-[13rem] md:h-[17.75rem] w-full object-cover rounded-2xl shadow"
        :alt="user.name"
      />

      <RankTag class="absolute left-0 bottom-0 ml-2 mb-2" :rank="user.rank" />
      <ToolTip
        v-if="user.identityVerified"
        class="absolute right-0 bottom-0 mr-2 mb-2"
        :relative="false"
      >
        <template #text> <span>Verified profile</span> </template>
        <template #element>
          <Checkmark class="opacity-75" />
        </template>
      </ToolTip>
    </div>
    <div class="text-gray-300">
      <p
        class="mt-3 font-bold text-white leading-normal text-base"
        :title="user.name"
      >
        {{ user.name }}
      </p>
      <p
        class="mt-1 text-xs md:text-sm leading-tight truncate max-w-full"
        :title="location"
      >
        {{ location }}
      </p>
      <div class="flex items-center justify-start mt-1 gap-2">
        <img src="~/assets/icons/clock.svg" class="w-4 h-4 block" />
        <p class="text-xs md:text-sm leading-none" :title="user.schedule">
          {{ user.schedule }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Checkmark from '../atomic/icon/Checkmark.vue'
import ToolTip from '../layout/ToolTip.vue'
import RankTag from './RankTag.vue'
import User from '~/lib/type/User'

@Component({ components: { RankTag, Checkmark, ToolTip } })
export default class ProfileCard extends Vue {
  @Prop({ default: () => {} })
  user!: User

  get location() {
    return `+${this.user.age} | ${this.user.province} | ${this.user.region}`
  }
}
</script>

<style scoped>
.gold-icon {
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
}

.profile-card .diamond-icon {
  transform: rotate(-45deg);
}
</style>
