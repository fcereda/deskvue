export default {
	
	fieldProps: {

		display: {
			type: String,
			validator: function (value) {
				if (!value) 
					return true
				return (value == 'block') || (value == 'inline-block') 
			}
		},
		
		width: {
			type: String,
			required: false
		},

		disabled: {
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

		label: {
			type: String,
			required: false
		},

		floating: {
			type: Boolean,
			default: false
		}

	}


}