<template>
  <div class="px-3 min-h-screen">
    <Loading
      v-if="loading"
      class="mx-auto w-80 h-80 mt-1/8 md:w-120 md:h-120 md:mt-0 max-w-full"
    />
    <nuxt />
    <div
      v-if="!loading"
      class="mt-2 md:mt-8 gap-x-2 place-items-start sm:place-items-auto sm:gap-x-4 gap-y-8 md:gap-12 grid grid-cols-[repeat(auto-fill,140px)] sm:grid-cols-[repeat(auto-fill,176px)] justify-center"
    >
      <Stories :type="selectedType" class="col-span-full" />
      <client-only>
        <Search
          ref="search"
          :filter-has-users="filterHasUsers"
          :loading="loading"
          class="col-span-full"
          @filter="updateFilter"
        />
      </client-only>
    </div>

    <div v-if="!filterHasUsers && !loading" class="w-full text-center mt-24">
      <p class="text-3xl text-opacity-70 text-white">No results</p>
      <Button class="bg-red-500 px-3 py-2 mt-4" @click="clearFilter"
        >Clear search</Button
      >
    </div>

    <div>
      <div
        v-for="group in filteredGroupUsers"
        v-show="group.users.length"
        :key="group.rank.name"
        class="mb-4 w-full first:mt-8 first:md:mt-10 mt-16 md:mt-22"
      >
        <div class="mb-8 md:mb-12">
          <h1
            class="text-center font-bold text-xl md:text-3xl uppercase"
            :class="group.rank.styledColors.base.textColor"
          >
            {{ partiesIsActive ? group.rank.displayName.partyDisplayName : group.rank.displayName.eventDisplayName }}
          </h1>
          <span
            v-if=""
            class="uppercase tracking-widest text-xs text-white text-opacity-70 text-center block"
          >
            {{ partiesIsActive ? group.rank.slogan.partySlogan : group.rank.slogan.eventSlogan }}
          </span>
        </div>

        <div
          class="gap-x-2 place-items-center sm:place-items-auto sm:gap-x-4 gap-y-8 md:gap-12 grid grid-cols-[repeat(auto-fill,140px)] sm:grid-cols-[repeat(auto-fill,176px)] justify-center"
        >
          <nuxt-link
            v-for="user in group.users"
            :key="user.uuid"
            :to="`/list/${selectedType}/${user.uuid}`"
          >
            <ProfileCard :user="user" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Stories from '../../components/stories/Stories.vue'
import Search from '../../components/search/Search.vue'
import Button from '../../components/Button.vue'
import ProfileCard from '~/components/profile/ProfileCard.vue'
import { getById, Rank } from '~/lib/rank/Rank'
import UsersService from '~/lib/service/UsersService'
import User from '~/lib/type/User'
import { userlist } from '~/store'
import Loading from '~/components/atomic/Loading.vue'

interface GroupedUsers {
  rank: Rank
  users: User[]
}

@Component({ components: { ProfileCard, Loading, Stories, Search, Button } })
export default class ListPage extends Vue {
  groupedUsers: GroupedUsers[] = []
  loading: boolean = true

  get allUsers() {
    return this.groupedUsers.flatMap((group) => group.users)
  }

  search: string = ''
  region: string = ''
  ageRange: Number[] = [18, 100]

  updateFilter(
    search: string,
    region: string,
    ageRange: number[]
  ) {
    this.search = search
    this.region = region
    this.ageRange = ageRange
  }

  get filteredGroupUsers(): GroupedUsers[] {
    const groupedUsers = this.groupedUsers
    return groupedUsers.map((group) => ({
      ...group,
      users: this.filterUsers(group.users),
    }))
  }

  get filterHasUsers() {
    debugger;
    return this.filteredGroupUsers.flatMap((group) => group.users).length > 0
  }

  filterUsers(users: User[]) {
    return users.filter(this.filterUser)
  }

  get searchComponent() {
    return this.$refs.search as any
  }

  clearFilter() {
    this.searchComponent.clear()
  }

  filterUser(user: User) {
    if (user.age < this.ageRange[0]) return false
    if (user.age > this.ageRange[1]) return false

    if (this.region && user.region !== this.region) return false
    if (
      this.search &&
      !user.name.toLowerCase().includes(this.search.toLowerCase()) &&
      !user.age.toString().includes(this.search) &&
      !user.region.toLowerCase().includes(this.search.toLowerCase()) &&
      !user.province.toLowerCase().includes(this.search.toLowerCase())
    )
      return false

    return true
  }

  get availableTypes() {
    return ['parties', 'events']
  }

  get selectedType() {
    const routeType = this.$route.params.type
    if (!this.availableTypes.includes(routeType)) {
      this.$router.push('/list/parties')
    }

    return routeType
  }

  getRank(rankName: string) {
    return getById(rankName)
  }

  async fetchData() {
    const groupedUsersResponse = await UsersService.getUserList(
      this.selectedType
    )

    const groupedUsers = groupedUsersResponse.data.map((group: any) => {
      return {
        users: group.users.map((user: any) => ({
          ...user,
          rank: this.getRank(user.rank),
        })),
        rank: this.getRank(group.rank),
      }
    })

    this.groupedUsers = groupedUsers

    userlist.setUserList(this.allUsers)
  }

  get route() {
    return this.$route.path
  }

  get partiesIsActive() {
    return this.route.startsWith('/list/parties')
  }

  get eventsIsActive() {
    return this.route.startsWith('/list/events')
  }

  mounted() {
    this.fetchData().then(() => {
      this.loading = false
    })
  }
}
</script>
