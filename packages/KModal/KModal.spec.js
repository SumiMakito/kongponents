import { mount } from '@vue/test-utils'
import KModal from '@/KModal/KModal'

describe('KModal', () => {
  it('renders proper content when using slots', () => {
    const headerText = 'This is some header text'
    const bodyText = 'This is some body text'
    const footerText = 'This is some footer text'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        title: headerText
      },
      slots: {
        'header-content': `<div>${headerText}</div>`,
        'body-content': `<div>${bodyText}</div>`,
        'footer-content': `<div>${footerText}</div>`
      }
    })

    expect(wrapper.find('.k-modal-header').html()).toEqual(expect.stringContaining(headerText))
    expect(wrapper.find('.k-modal-body').html()).toEqual(expect.stringContaining(bodyText))
    expect(wrapper.find('.k-modal-footer').html()).toEqual(expect.stringContaining(footerText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('hides the title when using hideTitle prop', () => {
    const titleText = "You can't see me"
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        title: titleText,
        hideTitle: true
      }
    })

    expect(wrapper.find('.k-modal-header').exists()).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders proper content when using action-buttons slot', () => {
    const actionButtonsText = 'This is some action buttons text'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        title: 'Test Me'
      },
      slots: {
        'action-buttons': `<div>${actionButtonsText}</div>`
      }
    })

    expect(wrapper.find('.k-modal-action-buttons').html()).toEqual(expect.stringContaining(actionButtonsText))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders proper content when using props', () => {
    const title = 'Sweet prop title'
    const content = 'Sweet prop content'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        title,
        content
      }
    })

    expect(wrapper.find('.k-modal-header').html()).toEqual(expect.stringContaining(title))
    expect(wrapper.find('.k-modal-body').html()).toEqual(expect.stringContaining(content))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders custom button text & appearance', () => {
    const confirmText = 'click to continue'
    const cancelText = 'click to cancel'
    const wrapper = mount(KModal, {
      propsData: {
        isVisible: true,
        actionButtonAppearance: 'outline',
        actionButtonText: confirmText,
        cancelButtonAppearance: 'danger',
        cancelButtonText: cancelText,
        title: 'Test Me'
      }
    })

    const buttons = wrapper.findAll('button')

    expect(buttons.at(0).text()).toBe(cancelText)
    expect(buttons.at(0).classes()).toContain('danger')
    expect(buttons.at(1).text()).toBe(confirmText)
    expect(buttons.at(1).classes()).toContain('outline')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('proceeds when clicking action button', () => {
    const wrapper = mount(KModal, {
      propsData: {
        title: 'Test Me',
        isVisible: true
      },
      attachToDocument: true
    })

    wrapper.find('.k-modal-footer .k-modal-action-buttons button').trigger('click')

    expect(wrapper.emitted().proceed).toHaveLength(1)
  })

  it('emits close when backdrop is clicked', () => {
    const wrapper = mount(KModal, {
      propsData: {
        title: 'Test Me',
        isVisible: true
      }
    })

    const backdrop = wrapper.find('.k-modal-backdrop')

    backdrop.trigger('click')
    expect(wrapper.emitted().canceled).toHaveLength(1)
  })

  it('emits close when hitting escape', () => {
    const wrapper = mount(KModal, {
      propsData: {
        title: 'Test Me',
        isVisible: true
      },
      attachToDocument: true
    })

    wrapper.find('.k-modal').trigger('keydown.esc')
    expect(wrapper.emitted().canceled).toHaveLength(1)
  })

  it('tears down event listeners', () => {
    const AEL = jest.fn()
    const REL = jest.fn()

    window.document.addEventListener = AEL
    window.document.removeEventListener = REL

    const wrapper = mount(KModal, {
      propsData: {
        title: 'Test Me'
      },
      attachToDocument: true
    })

    wrapper.destroy()
    expect(AEL).toHaveBeenCalledTimes(1)
    expect(REL).toHaveBeenCalledTimes(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(KModal, {
      propsData: {
        title: 'Test Me'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
