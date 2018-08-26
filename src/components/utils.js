export default {
	
	getComponentClasses(props, possibleClasses) {
		let classes = []
		possibleClasses.forEach(thisClass => {
			if (props[thisClass] || props[thisClass] === '') {
				classes.push(thisClass)	
			}
		})			
		return classes
	}


}