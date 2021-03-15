import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

class QuantitySelector extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //         quantity: 1
    //     };
    // }

    // quantityChange(change) {
    //     console.log(change);
    //     // this.setState({ quantity: (this.state.quantity + change)})
    // }

    render() {
        return (
            <div className="quantity-selector">
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button><i className="far fa-minus-square"></i></Button>
                    {/* <Button onClick={this.quantityChange(-1)}><i class="far fa-minus-square"></i></Button> */}
                    {/* <TextField id="outlined-basic" value={this.state.quantity} label="Qty" variant="outlined" /> */}
                    <TextField id="outlined-basic" label="Qty" variant="outlined" />
                    {/* <Button onClick={this.quantityChange(1)}><i class="far fa-plus-square"></i></Button> */}
                    <Button><i className="far fa-plus-square"></i></Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default QuantitySelector;