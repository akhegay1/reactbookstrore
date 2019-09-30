import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import React, { PureComponent } from 'react';

export default class Header extends PureComponent<PropType> {
  render() {
    return (
      <AppBar position="static">
        <div>
          <Button>
            Button 1
          </Button>
          <Button>
            <div>Button 2</div>
          </Button>
        </div>
      </AppBar>
    );
  }
}