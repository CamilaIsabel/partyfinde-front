export { default as Button } from '../..\\components\\Button.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as AtomicBlurredThing } from '../..\\components\\atomic\\BlurredThing.vue'
export { default as AtomicLoading } from '../..\\components\\atomic\\Loading.vue'
export { default as AtomicOptionalLink } from '../..\\components\\atomic\\OptionalLink.vue'
export { default as AuthGuard } from '../..\\components\\auth\\AuthGuard.vue'
export { default as LayoutBenefits } from '../..\\components\\layout\\Benefits.vue'
export { default as LayoutCountryDropdown } from '../..\\components\\layout\\CountryDropdown.vue'
export { default as LayoutDisclaimer } from '../..\\components\\layout\\Disclaimer.vue'
export { default as LayoutFooter } from '../..\\components\\layout\\Footer.vue'
export { default as LayoutModal } from '../..\\components\\layout\\Modal.vue'
export { default as LayoutNeonText } from '../..\\components\\layout\\NeonText.vue'
export { default as LayoutToolTip } from '../..\\components\\layout\\ToolTip.vue'
export { default as FormsPhoneNumberInput } from '../..\\components\\forms\\PhoneNumberInput.vue'
export { default as FormsSelectCountry } from '../..\\components\\forms\\SelectCountry.vue'
export { default as FormsSelectIdentity } from '../..\\components\\forms\\SelectIdentity.vue'
export { default as FormsSelectProvince } from '../..\\components\\forms\\SelectProvince.vue'
export { default as FormsSelectRegion } from '../..\\components\\forms\\SelectRegion.vue'
export { default as FormsSlider } from '../..\\components\\forms\\Slider.vue'
export { default as FormsTextArea } from '../..\\components\\forms\\TextArea.vue'
export { default as FormsTextBox } from '../..\\components\\forms\\TextBox.vue'
export { default as CheckoutPaymentFailure } from '../..\\components\\checkout\\PaymentFailure.vue'
export { default as CheckoutPaymentSuccess } from '../..\\components\\checkout\\PaymentSuccess.vue'
export { default as Navbar } from '../..\\components\\navbar\\Navbar.vue'
export { default as NavbarNavigation } from '../..\\components\\navbar\\Navigation.vue'
export { default as NavbarTheSidebar } from '../..\\components\\navbar\\TheSidebar.vue'
export { default as NavigationFloatingActionButton } from '../..\\components\\navigation\\FloatingActionButton.vue'
export { default as PolicyPrivacyPolicy } from '../..\\components\\policy\\PrivacyPolicy.vue'
export { default as PremiumBuyIncrement } from '../..\\components\\premium\\BuyIncrement.vue'
export { default as PremiumBuyIncrementButton } from '../..\\components\\premium\\BuyIncrementButton.vue'
export { default as PremiumBuyPremium } from '../..\\components\\premium\\BuyPremium.vue'
export { default as PremiumFreeBoost } from '../..\\components\\premium\\FreeBoost.vue'
export { default as PremiumIncrementVisibilityModal } from '../..\\components\\premium\\IncrementVisibilityModal.vue'
export { default as PremiumPriceTag } from '../..\\components\\premium\\PriceTag.vue'
export { default as PremiumRankCard } from '../..\\components\\premium\\RankCard.vue'
export { default as PremiumRankIcon } from '../..\\components\\premium\\RankIcon.vue'
export { default as PremiumUseIncrement } from '../..\\components\\premium\\UseIncrement.vue'
export { default as SearchFilter } from '../..\\components\\search\\Filter.vue'
export { default as Search } from '../..\\components\\search\\Search.vue'
export { default as ProfileMyAccountDropdown } from '../..\\components\\profile\\MyAccountDropdown.vue'
export { default as ProfilePresentation } from '../..\\components\\profile\\Presentation.vue'
export { default as ProfileCard } from '../..\\components\\profile\\ProfileCard.vue'
export { default as ProfileRankTag } from '../..\\components\\profile\\RankTag.vue'
export { default as StoriesStorie } from '../..\\components\\stories\\storie.vue'
export { default as Stories } from '../..\\components\\stories\\Stories.vue'
export { default as StoriesUploadImage } from '../..\\components\\stories\\UploadImage.vue'
export { default as AtomicIconCheckmark } from '../..\\components\\atomic\\icon\\Checkmark.vue'
export { default as AtomicIconErrorIcon } from '../..\\components\\atomic\\icon\\ErrorIcon.vue'
export { default as AtomicIconLoader } from '../..\\components\\atomic\\icon\\Loader.vue'
export { default as AtomicTimeCountdownButton } from '../..\\components\\atomic\\time\\CountdownButton.vue'
export { default as LayoutDropdown } from '../..\\components\\layout\\dropdown\\Dropdown.vue'
export { default as LayoutDropdownItem } from '../..\\components\\layout\\dropdown\\DropdownItem.vue'
export { default as LayoutToast } from '../..\\components\\layout\\toast\\Toast.vue'
export { default as LayoutToastToaster } from '../..\\components\\layout\\toast\\Toaster.vue'
export { default as ProfileAccountChangePassword } from '../..\\components\\profile\\account\\ChangePassword.vue'
export { default as ProfileAccountSendMail } from '../..\\components\\profile\\account\\SendMail.vue'
export { default as ProfileEditProfile } from '../..\\components\\profile\\edit\\EditProfile.vue'
export { default as ProfileEditPhotos } from '../..\\components\\profile\\edit\\Photos.vue'
export { default as ProfileForm } from '../..\\components\\profile\\edit\\ProfileForm.vue'
export { default as ProfileEditUploadPhoto } from '../..\\components\\profile\\edit\\UploadPhoto.vue'
export { default as ProfilePhotoSlider } from '../..\\components\\profile\\photo\\PhotoSlider.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
