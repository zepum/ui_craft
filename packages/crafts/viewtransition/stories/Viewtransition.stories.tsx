import type { Story } from '@ladle/react';
import { Viewtransition } from '../src';

export default {
  title: 'Viewtransition',
};

export const Default: Story = () => {
  return <Viewtransition />;
};

export const WithCustomClass: Story = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <Viewtransition className='custom-class' />
    </div>
  );
};

export const ViewTransitionExample: Story = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>View Transition API Demo</h1>
      <p style={{ marginBottom: '20px', textAlign: 'center' }}>
        Click the buttons to see the transition effect between screens.
      </p>
      <Viewtransition />
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Note: This demo uses the View Transition API which might not be supported in all browsers.
      </p>
    </div>
  );
};
