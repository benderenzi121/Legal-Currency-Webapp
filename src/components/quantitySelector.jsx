import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
class QuantitySelector extends Component {
    render() {
        return (
            <div className="quantity-selector">
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button><i class="far fa-minus-square"></i></Button>
                    <TextField id="outlined-basic" label="Qty" variant="outlined" />
                    <Button><i class="far fa-plus-square"></i></Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default QuantitySelector;