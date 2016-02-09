import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Input from 'react-bootstrap/lib/Input'

import _ from 'lodash'

import {connect} from 'react-redux'
import {setData} from 'src/actions/editor.js'

// NOTE: Not using ES6 classes because of the needed mixins
let HelLabeledCheckboxGroup = React.createClass({

    propTypes: {
        name: React.PropTypes.string,
    },

    handleChange: function() {
        let checked = _.filter(this.refs, (ref) => (ref.getChecked()))
        let checkedNames = _.map(checked, (checkbox) => (checkbox.props.value) )

        if(this.props.name) {
            let obj = {}
            obj[this.props.name] = checkedNames
            this.props.dispatch(setData(obj))
        }

        if(typeof this.props.onChange === 'function') {
            this.props.onChange(checkedNames)
        }
    },

    shouldComponentUpdate: function(nextProps) {
        if(_.isEqual(nextProps.selectedValues, this.props.selectedValues)) {
            return false;
        }

        return true;
    },

    render: function() {
        let self = this
        let checkboxes = this.props.options.map((item, index) => {
            let selectedValues = this.props.selectedValues || []
            let checked = (selectedValues.indexOf(item.value) > -1)

            return (
                <span key={index} className={(this.props.itemClassName || '')}>
                    <Input
                        type="checkbox"
                        groupClassName="hel-checkbox"
                        label={item.label}
                        value={item.value}
                        name={this.props.name+'.'+item.value}
                        ref={index}
                        checked={checked}
                        defaultChecked={checked}
                        onChange={self.handleChange}
                        />
                </span>
            )
        },this)

        return (
            <fieldset className="checkbox-group">
                <legend className="col-sm-12">{this.props.groupLabel}</legend>
                {checkboxes}
            </fieldset>
        )
    }
});

export default connect((state) => ({
    editor: state.editor
}))(HelLabeledCheckboxGroup);
