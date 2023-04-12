import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import TRichSelect from 'vue-tailwind/dist/t-rich-select'

const settings = {
  't-rich-select': {
    component: TRichSelect,
    props: {
      fixedClasses: {
        wrapper: 'relative text-white',
        buttonWrapper: 'inline-block relative w-full',
        selectButton:
          'text-sm bg-gray-500 bg-opacity-15 outline-transparent focus:outline-transparent focus:bg-opacity-30 transition-all duration-300 rounded-lg px-2 py-1 w-full leading-loose disabled:opacity-50 disabled:cursor-not-allowed flex flex-row items-center justify-between',
        selectButtonLabel: 'block truncate',
        selectButtonPlaceholder: 'block truncate',
        selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
        selectButtonClearButton:
          'rounded flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6 transition duration-100 ease-in-out',
        selectButtonClearIcon: 'fill-current h-3 w-3',
        dropdown: 'absolute w-full z-10 -mt-1 absolute shadow-sm z-10',
        dropdownFeedback: '',
        loadingMoreResults: '',
        optionsList: 'overflow-auto',
        searchWrapper: 'inline-block w-full',
        searchBox: 'inline-block w-full',
        optgroup: '',
        option: 'cursor-pointer',
        disabledOption: 'opacity-50 cursor-not-allowed',
        highlightedOption: 'cursor-pointer',
        selectedOption: 'cursor-pointer',
        selectedHighlightedOption: 'cursor-pointer',
        optionContent: '',
        optionLabel: 'truncate block',
        selectedIcon: 'fill-current h-4 w-4',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: '',
      },
      classes: {
        wrapper: '',
        buttonWrapper: '',
        selectButton: 'bg-[#5c5c75]',
        selectButtonLabel: '',
        selectButtonPlaceholder: 'text-gray-400',
        selectButtonIcon: 'text-gray-100',
        selectButtonClearButton: 'hover:bg-[#fb7185]',
        selectButtonClearIcon: '',
        dropdown: 'bg-[#5c5c75] ',
        dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
        loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
        optionsList: '',
        searchWrapper: 'mb-2 placeholder-gray-400',
        searchBox:
          'px-3 py-2 bg-white bg-opacity-10 text-sm rounded focus:outline-none uppercase caret-white',
        optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
        option: '',
        disabledOption: '',
        highlightedOption: 'bg-[#fb7185]',
        selectedOption: 'font-semibold hover:bg-[#fb7185] font-semibold',
        selectedHighlightedOption:
          'font-semibold hover:bg-[#fb7185] font-semibold',
        optionContent: 'flex justify-between items-center px-3 py-2',
        optionLabel: '',
        selectedIcon: '',
        enterClass: 'opacity-0',
        enterActiveClass: 'transition ease-out duration-100',
        enterToClass: 'opacity-100',
        leaveClass: 'opacity-100',
        leaveActiveClass: 'transition ease-in duration-75',
        leaveToClass: 'opacity-0',
      },
      variants: {
        danger: {
          selectButton: 'border-red-300 bg-red-50 text-red-900',
          selectButtonPlaceholder: 'text-red-200',
          selectButtonIcon: 'text-red-500',
          selectButtonClearButton: 'hover:bg-red-200 text-red-500',
          dropdown: 'bg-red-50 border-red-300',
        },
        success: {
          selectButton: 'border-green-300 bg-green-50 text-green-900',
          selectButtonIcon: 'text-green-500',
          selectButtonClearButton: 'hover:bg-green-200 text-green-500',
          dropdown: 'bg-green-50 border-green-300',
        },
      },
    },
  },
}

Vue.use(VueTailwind, settings)
