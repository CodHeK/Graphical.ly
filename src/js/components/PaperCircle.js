import React from 'react';

import { PaperScope, Circle } from '@psychobolt/react-paperjs';

@PaperScope
export default class Scene {
  render() {
    const { paper } = this.props;
    return <Circle fillColor="red" radius={35} center={paper.view.center} />;
  }
}
