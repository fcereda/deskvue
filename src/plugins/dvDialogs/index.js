import dvModal from '../../components/dv-modal.vue'

function Dialogs (Vue, globalOptions) {
	this.Vue = Vue
	this.globalOptions = globalOptions

	let dvModalClass = Vue.extend(dvModal)
	let dvModalInstance = new dvModalClass({
		propsData: {
			type: 'primary',
			show: false,
			text: 'Placeholder'
		}
	})
	dvModalInstance.$mount()
	document.querySelector('body').appendChild(dvModalInstance.$el)

	this.alert = (text, type='primary') => {
		return new Promise((resolve, reject) => {
			dvModalInstance.text = text
			dvModalInstance.title = 'Alert'
			dvModalInstance.type = type
			dvModalInstance.buttons = 'OK'
			dvModalInstance.show = true
			dvModalInstance.$on('close', () => {
				dvModalInstance.show = false
				dvModalInstance.$nextTick(resolve)
			})
		})	
	}

}

export default {
	install (Vue, opts) {
		if (Vue.prototype.hasOwnProperty('$alert')) {
			console.log('dvDialogs has already been installed')
			return
		}

		console.log('Installing the dvDialogs plugin')

		Vue.dialogs = new Dialogs(Vue, opts) 
		Vue.prototype.$alert = Vue.dialogs.alert
	}
}


