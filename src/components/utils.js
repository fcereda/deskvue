function toClassName (str) {
	return str.split(/(?=[A-Z])/).join('-').toLowerCase()
}

function isPropOn(prop) {
	return prop || (prop === '')
}


export default {

	isPropOn,	

	getComponentClasses (component, props) {
		let classes = []
		props.forEach(propName => {
			if (this.isPropOn(component[propName])) {
				const className = toClassName(propName)
				console.log(className)
				classes.push(className)	
			}
		})			
		return classes
	},

	correctColor (color) {
		const colors = ['primary', 'secondary', 'danger', 'warning', 'secondary', 'info', 'dark']
		if (!color) return null
		color = color.toLowerCase()
		if (colors.indexOf(color) < 0)
			return ''
		return color
	}


}