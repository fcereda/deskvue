const inputProps = {

	width: {
		type: String,
		required: false
	},

	disabled: {
		type: Boolean,
		default: false
	},

	required: {
		type: Boolean,
		default: false
	},

	rounded: {
		type: Boolean,
		default: false
	},

	noBorder: {
		type: Boolean,
		default: false
	},

	color: {
		type: String,
		required: false
	},

	placeholder: {
		type: String,
		required: false
	},

}

const selectProps = {
	...inputProps,

	multiple: {
		type: Boolean,
		default: false
	},

	search: {
		type: Boolean,
		default: false
	},
}

const fieldProps = {
	...inputProps,

	display: {
		type: String,
		validator: function (value) {
			if (!value) 
				return true
			return (value == 'block') || (value == 'inline-block') 
		}
	},
	
	label: {
		type: String,
		required: false
	},

	floating: {
		type: Boolean,
		default: false
	},


	message: {
		type: String,
		required: false
	},

}


export default {
	inputProps,
	selectProps,
	fieldProps
}