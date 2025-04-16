import PropTypes from 'prop-types';
import React from 'react';
import {
  useCheckoutSteps,
  useCheckoutStepsDispatch
} from '@components/common/context/checkoutSteps';
import { StepContent } from '@components/frontStore/checkout/checkout/payment/paymentStep/StepContent';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function PaymentStep({
  cart,
  setting: { customerAddressSchema }
}) {
  const steps = useCheckoutSteps();
  const step = steps.find((e) => e.id === 'payment') || {};
  const [display, setDisplay] = React.useState(false);
  const { canStepDisplay, addStep } = useCheckoutStepsDispatch();

  React.useEffect(() => {
    addStep({
      id: 'payment',
      title: _('Payment'),
      previewTitle: _('Payment'),
      isCompleted: false,
      sortOrder: 15,
      editable: true
    });
  }, []);

  React.useEffect(() => {
    setDisplay(canStepDisplay(step, steps));
  });

  return (
    <div className="checkout-payment checkout-step">
      {display && (
        <StepContent
          cart={cart}
          step={step}
          customerAddressSchema={customerAddressSchema}
        />
      )}
    </div>
  );
}

PaymentStep.propTypes = {
  cart: PropTypes.shape({
    addBillingAddressApi: PropTypes.string.isRequired,
    addPaymentMethodApi: PropTypes.string.isRequired,
    billingAddress: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
      }),
      fullName: PropTypes.string,
      postcode: PropTypes.string,
      province: PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
      }),
      telephone: PropTypes.string
    })
  }).isRequired,
  setting: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    customerAddressSchema: PropTypes.object.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'checkoutSteps',
  sortOrder: 20
};

export const query = `
  query Query {
    cart {
      billingAddress {
        id: cartAddressId
        fullName
        postcode
        telephone
        country {
          code
          name
        }
        province {
          code
          name
        }
        city
        address1
        address2
      }
      addBillingAddressApi: addAddressApi
      addPaymentMethodApi
    }
    setting {
      customerAddressSchema
    }
  }
`;
