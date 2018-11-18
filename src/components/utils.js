const defaultColors = [
	'primary', 'danger', 'error', 'warning', 'success', 'info', 'secondary', 'dark'
]

function toClassName (str) {
	return str.split(/(?=[A-Z])/).join('-').toLowerCase()
}


function isPropOn(prop) {
	return prop || (prop === '')
}

function computeClasses (classesObj, component) {
	let classes = []
	for (let cls in classesObj) {
		let value = classesObj[cls]
		if (typeof value == 'string') {
			value = isPropOn(component[value])
		}
		if (value) {
			classes.push(cls)
		}
	}
	return classes.join(' ')
}

export default {

	isPropOn,	
	computeClasses,
	defaultColors,

	getComponentClasses (component, props) {
		let classes = []
		props.forEach(propName => {
			if (this.isPropOn(component[propName])) {
				const className = toClassName(propName)
				classes.push(className)	
			}
		})			
		return classes
	},

	correctColor (color) {
		const colors = ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'dark']
		if (!color) return null
		color = color.toLowerCase()
		if (colors.indexOf(color) < 0)
			return ''
		return color
	},

	computeColorVar (thisColor) {
		let color = this.correctColor(thisColor)
		if (color) {
			color = `var(--color-${color});`
		}
		else {
			color = thisColor
		}
		return color
	},

	computeColorStyle (thisColor) {
		if (!thisColor)
			return ''
		let color = this.computeColorVar(thisColor)
		return `--border-color:${color};
				--box-shadow-color:${color};
				--focus-color:${color};`
	},

	isNumeric: function (value) {
		// This function comes from Angular 4.3
		return !isNaN(value - parseFloat(value))
	}

}