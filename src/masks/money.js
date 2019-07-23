import Mask from '../mask';

const MoneyMask = new Mask({
  name: 'money',
  mask: '$ 0,?0?0?0?.00',
});

export default MoneyMask;
