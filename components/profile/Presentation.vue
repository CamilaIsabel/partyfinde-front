<template>
  <div
    class="relative sheet md:w-min mx-auto px-5 py-8 md:px-8 w-screen sm:w-auto"
  >
    <div id="profile-grid" class="px-0 text-left px-5">
      <div id="profile">
        <div class="flex items-center">
          <OptionalLink
            :to="storyLink"
            :class="
              currentUserData.story
                ? 'from-[#F21623] to-[#8546F4]'
                : 'from-gray-500 to-gray-700'
            "
            class="bg-gradient-to-br rounded-full w-17 h-17 mr-4 flex-shrink-0 relative"
          >
            <img
              v-if="profilePhoto"
              class="object-cover w-full h-full rounded-full cursor-pointer border-transparent border-2"
              :src="profilePhoto"
            />
            <ToolTip
              v-if="currentUserData.identityVerified"
              class="absolute right-0 bottom-0"
              :relative="false"
            >
              <template #text> <span>Verified profile</span> </template>
              <template #element>
                <Checkmark class="opacity-75" />
              </template>
            </ToolTip>
          </OptionalLink>
          <div>
            <p
              class="text-lg md:text-2xl font-bold flex flex-row wrap items-center gap-4"
            >
              {{ currentUserData.name }}
              <RankTag
                :rank="rank"
                :rank-can-expire="currentUserData.rankCanExpire"
                :rank-expired="currentUserData.rankExpired"
                :rank-expire-time="currentUserData.rankExpireTime"
              />
            </p>
            <p class="text-gray-300 text-sm mt-1">
              +{{ currentUserData.age }} | {{ currentUserData.province }} |
              {{ currentUserData.region }}
            </p>
          </div>
        </div>
        <div class="mt-3 flex items-center">
          <img class="h-4 w-4" src="~/assets/icons/location.svg" />
          <p class="ml-2 text-green-500 font-bold mr-2">
            {{ userLocationServiceType }}
          </p>
        </div>
        <div class="flex items-center mt-1 mb-5 xl:mb-0">
          <img class="h-4 w-4" src="~/assets/icons/clock.svg" />
          <p class="ml-2 text-sm md:text-sm text-gray-300">
            {{ currentUserData.schedule }}
          </p>
        </div>
      </div>

      <div
        id="line"
        class="mx-auto hidden xl:flex h-full w-[0.08px] bg-gray-600"
      ></div>

      <div
        id="photos"
        class="h-full flex flex-wrap justify-end flex-col items-start"
      >
        <div
          :class="
            userPhotoAmount > 8
              ? 'md:border-black md:border-opacity-15 md:border-2 md:rounded-xl'
              : ''
          "
          class="gap-5 mb-auto md:w-150 flex flex-wrap justify-between place-items-center xl:grid-cols-4 md:max-h-124 md:overflow-auto md:p-1"
        >
          <div
            v-for="(photo, idx) in userPhotoAmount"
            :key="idx"
            :class="userPhotos.at(idx) ? 'cursor-pointer' : 'sm:block hidden'"
            class="overflow-hidden w-32 h-42 rounded-xl text-center relative z-10"
            @click="openPhoto(idx)"
          >
            <img
              v-if="userPhotos.at(idx)"
              class="object-cover w-full h-full rounded-xl mx-auto cursor-pointer border-black border-opacity-30 border-1"
              :src="userPhotos.at(idx)"
            />
            <div
              v-else
              class="bg-black bg-opacity-10 rounded-xl border-black border-opacity-30 border-1 h-full w-full"
            ></div>
          </div>
        </div>
        <div
          v-if="showEditButtons"
          class="w-max xl:flex flex-row items-center justify-end mx-auto xl:mr-0 mt-24 gap-4"
        >
          <ToolTip
            v-if="showBoostMsg"
            class="mt-20 md:pl-60"
            :always-show="true"
          >
            <template #text>
              <div class="w-55 text-center flex text-yellow-400">
                Your profile is hidden, edit to show!
              </div>
            </template>
          </ToolTip>
          <button
            v-if="hasFreeBoostAvailable && showBoostSection"
            title="Free Boost avalible"
            class="mx-auto p-2 items-center justify-center flex hover:bg-white hover:bg-opacity-10 rounded-full block transition-colors"
            @click="openFreeBoostModal"
          >
            <img src="@/assets/icons/free-boost.svg" class="block h-9 w-9" />
          </button>
          <ToolTip
            v-if="showBoostSection && positionOnRanking !== 0"
            class="mt-20 xl:mt-0"
            :always-show="true"
          >
            <template #text>
              <span class="whitespace-nowrap">
                YOUR PROFILE IS IN POSITION <br />
                <span class="underline">{{ positionOnRanking }}</span> OF THE
                <span :class="rankColor">{{ rank.name }}</span>
                SECTION
              </span>
            </template>
            <template #element>
              <IncrementVisibilityModal
                :position="positionOnRanking"
                :remaining-boosts="currentUserData.remainingBoosts"
                :remaining-time-to-use-boost="currentUserData.boostAvailableIn"
              />
            </template>
          </ToolTip>

          <button
            class="mt-4 xl:mt-0 mx-auto flex rounded-full shadow-4xl hover:(shadow-5xl shadow-[#C026D3]) shadow-[#C026D3] border-2 border-light-100 uppercase py-[6px] px-4 text-[14px] font-bold neon-text-container shadow-text"
            @click="emitEditInformation"
          >
            <span>Edit profile</span>
          </button>
        </div>
      </div>

      <div class="h-full flex flex-col pt-5">
        <p class="text-justify text-sm">
          {{ currentUserData.description }}
        </p>

        <div
          v-if="showContactButtons"
          class="flex justify-start items-end mt-auto pt-5 gap-3"
        >
          <BlurredThing v-if="currentUserData.phoneCallAvailable">
            <a
              :href="`tel:${currentUserData.phoneNumber}`"
              class="shadow-sm rounded-lg px-2 h-7 flex items-center justify-center bg-yellow-600 transition-all transition ease-out duration-200"
              @click="addPhoneCallClick"
            >
              <img class="h-3.5 w-3.5 mr-2" src="~/assets/icons/phone.svg" />
              <p class="font-bold">{{ currentUserData.phoneNumber }}</p>
            </a>
          </BlurredThing>
          <BlurredThing v-if="currentUserData.whatsappAvailable">
            <a
              :href="`https://wa.me/${currentUserData.phoneNumber}?text=${Message}`"
              target="_blank"
              class="shadow-sm rounded-lg w-9 h-7 flex items-center justify-center bg-green-400 transition-all transition ease-out duration-200"
              @click="addWhatsAppClick"
            >
              <img class="h-5.5 w-5.5" src="~/assets/icons/whatsapp.svg" />
            </a>
          </BlurredThing>

          <BlurredThing
            v-if="currentUserData.instagram && rankCanUseInstagramFeature"
          >
            <a
              :href="`https://www.instagram.com/${currentUserData.instagram}`"
              target="_blank"
              class="shadow-sm rounded-lg w-9 h-7 flex items-center justify-center insta-gradient transition-all transition ease-out duration-200"
            >
              <img class="h-5.5 w-5.5" src="~/assets/icons/instagram.svg" />
            </a>
          </BlurredThing>
        </div>

        <div
          v-if="showStatistics"
          class="pt-10 xl:pt-0 justify-between text-center flex items-center mt-auto"
        >
          <ToolTip>
            <template #text> Calls </template>
            <template #element>
              <button>
                <img class="h-8 w-8" src="~/assets/icons/red-phone.svg" />
              </button>
              <p class="text-sm font-bold">
                {{ currentUserData.callClicks || 0 }}
              </p>
            </template>
          </ToolTip>
          <ToolTip>
            <template #text> Views </template>
            <template #element>
              <button>
                <img class="h-9 w-9" src="~/assets/icons/eye.svg" />
              </button>
              <p class="text-sm font-bold">{{ currentUserData.views || 0 }}</p>
            </template>
          </ToolTip>
          <ToolTip>
            <template #text> Clicks </template>
            <template #element>
              <button>
                <img class="h-8 w-8" src="~/assets/icons/green-whatsapp.svg" />
              </button>
              <p class="text-sm font-bold">
                {{ currentUserData.whatsappClicks || 0 }}
              </p>
            </template>
          </ToolTip>
        </div>
      </div>
    </div>
    <PhotoSlider
      :show="showPhotoModal"
      :photo-u-r-ls="userPhotos"
      :selected-index="selectedPhotoIndex"
      @update-index="updateIndex"
      @close="showPhotoModal = false"
    />
    <FreeBoost
      v-if="hasFreeBoostAvailable"
      v-model="showFreeBoostModal"
      @boost-consumed="usedFreeBoost"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import GlobalEvents from 'vue-global-events'
import User from '../../lib/type/User'
import ToolTip from '../layout/ToolTip.vue'
import IncrementVisibilityModal from '../premium/IncrementVisibilityModal.vue'
import Modal from '../layout/Modal.vue'
import BlurredThing from '../atomic/BlurredThing.vue'
import FreeBoost from '../premium/FreeBoost.vue'
import Checkmark from '../atomic/icon/Checkmark.vue'
import OptionalLink from '../atomic/OptionalLink.vue'
import RankTag from './RankTag.vue'
import PhotoSlider from './photo/PhotoSlider.vue'
import { getById, Ranks } from '~/lib/rank/Rank'
import UsersService from '~/lib/service/UsersService'
import { users } from '~/store'
import StatService from '~/lib/service/StatService'
import { toHumanType } from '~/utils/type-utils'

export enum ProfilePresentationMode {
  DISCOVERY = 'discovery',
  MY_ACCOUNT = 'my-account',
}
@Component({
  components: {
    ToolTip,
    IncrementVisibilityModal,
    Modal,
    RankTag,
    GlobalEvents,
    BlurredThing,
    FreeBoost,
    PhotoSlider,
    Checkmark,
    OptionalLink,
  },
})
export default class Presentation extends Vue {
  @Prop({ default: () => ProfilePresentationMode.DISCOVERY })
  private mode!: ProfilePresentationMode

  @Prop({ default: () => {} })
  currentUserData!: User

  @Prop({ default: () => [] })
  userPhotos!: string[]

  hasFreeBoostAvailable: boolean = false
  showFreeBoostModal: boolean = false
  showPhotoModal: boolean = false
  selectedPhotoIndex: number = 0

  openPhoto(index: number) {
    if (!this.userPhotos.at(index)) return

    this.selectedPhotoIndex = index
    this.showPhotoModal = true
  }

  updateIndex(index: number) {
    this.selectedPhotoIndex = index
  }

  get Message() {
    const msg =
      "Hi! I just saw the party on Partyfinder, I'd like to attend"
    return encodeURI(msg)
  }

  get showStatistics() {
    return this.mode === ProfilePresentationMode.MY_ACCOUNT
  }

  get showEditButtons() {
    return this.mode === ProfilePresentationMode.MY_ACCOUNT
  }

  get showContactButtons() {
    return this.mode === ProfilePresentationMode.DISCOVERY
  }

  get showBoostSection() {
    return (
      this.mode === ProfilePresentationMode.MY_ACCOUNT &&
      this.currentUserData.isActive
    )
  }

  get showBoostMsg() {
    return (
      this.mode === ProfilePresentationMode.MY_ACCOUNT &&
      !this.currentUserData.isActive
    )
  }

  get type() {
    return toHumanType(this.currentUserData.type)
  }

  get userLocationServiceType() {
    const service: string[] = []
    if (this.currentUserData.houseLocation) service.push('House')
    if (this.currentUserData.anotherPlaceLocation) service.push('Another place')
    if (this.currentUserData.clubLocation) service.push('Club')
    return service.join(' | ')
  }

  get profilePhoto() {
    return this.userPhotos.at(0) ?? this.currentUserData?.profilePhoto
  }

  async mounted() {
    if (!this.showBoostSection) return

    const boostInformation = await UsersService.getBoostInformation()
    users.updateCurrentPosition(boostInformation.position)

    this.hasFreeBoostAvailable = users.currentUser.canUseFreeBoost
  }

  get positionOnRanking() {
    return users.currentPosition
  }

  emitEditInformation() {
    this.$emit('open-edit-modal')
  }

  /**
   * Show the amount of photo slots, with a minimum of 8.
   */
  get userPhotoAmount() {
    const userPhotoAmount = this.userPhotos?.length ?? 8
    if (userPhotoAmount < 8) return 8

    return userPhotoAmount
  }

  get storyLink() {
    if (!this.currentUserData.story) return
    return `/list/${this.type}/stories/${this.currentUserData.story}`
  }

  get rank() {
    return this.currentUserData?.rank ?? Ranks.DEFAULT
  }

  get rankColor() {
    return this.rank?.styledColors?.base?.textColor ?? ''
  }

  get rankCanUseInstagramFeature() {
    if (!this.currentUserData.rank) return false

    const rank = getById(this.currentUserData.rank.name)
    return rank.isEqualOrHigherThan(Ranks.GOLD)
  }

  openFreeBoostModal() {
    this.showFreeBoostModal = true
  }

  usedFreeBoost({ position }) {
    this.hasFreeBoostAvailable = false
    users.updateCurrentPosition(position)
  }

  addWhatsAppClick() {
    const id = this.currentUserData.uuid
    if (!id) return

    StatService.addWhatsAppClick(id)
  }

  addPhoneCallClick() {
    const id = this.currentUserData.uuid
    if (!id) return

    StatService.addPhoneClick(id)
  }
}
</script>

<style>
@media (min-width: 1280px) {
  #profile-grid {
    display: grid;
    grid-template-columns: 320px 50px auto;
    grid-template-rows: auto 1fr;
    min-height: 550px;
  }
  #profile {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }
  #photos {
    grid-row: 1 / 3;
  }
  #line {
    grid-row: 1 / 3;
  }
}

.description {
}

.shadow-text {
  text-shadow: 0 0 30px #c026d3;
}
.shadow-text:hover {
  text-shadow: 0 0 10px #c026d3;
}

.insta-gradient {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
}
</style>
