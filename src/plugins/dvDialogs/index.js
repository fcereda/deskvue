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

	this.alert = (text, title, type='primary') => {
		if (typeof text == 'object') {
			let options = text
			text = options.text
			title = options.title
			type = options.type || 'primary'
		}
		return new Promise((resolve, reject) => {
			dvModalInstance.text = text
			dvModalInstance.title = title
			dvModalInstance.type = type
			dvModalInstance.buttons = 'OK'
			dvModalInstance.show = true
			dvModalInstance.$once('click', () => dvModalInstance.$emit('close'))
			dvModalInstance.$once('close', () => {
				dvModalInstance.show = false
				dvModalInstance.$nextTick(resolve)
			})
		})	
	}

	this.confirm = (text, title, type, options) => {
		if (typeof text == 'object')
			options = text
		else if (typeof title == 'object')
			options = {...title, text}
		else if (typeof type == 'object')
			options = {...type, text, title}
		else
			options = {...options, text, title, type}

		let buttons = options.buttons
		if (!buttons) {
			if (options.okButtonText) {
				buttons = [options.okButtonText, 'Cancel']
			}
			else {
				buttons = 'ok-cancel'
			}
		} 

		return new Promise((resolve, reject) => {
			dvModalInstance.text = options.text
			dvModalInstance.title = options.title
			dvModalInstance.type = options.type || 'primary'
			dvModalInstance.buttons = buttons
			dvModalInstance.closeOnButtonClick = false
			dvModalInstance.closeOnClick = false
			dvModalInstance.show = true

			const clickHandler = (btn) => {
				console.log('Clicou botão no dialog box')
				console.log(btn)
				dvModalInstance.show = false
				dvModalInstance.$nextTick(btn == 0 ? resolve : reject)
				dvModalInstance.$off()
			}

			dvModalInstance.$once('click', clickHandler)
			dvModalInstance.$once('close', clickHandler)
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
		Vue.prototype.$confirm = Vue.dialogs.confirm
	}
}


