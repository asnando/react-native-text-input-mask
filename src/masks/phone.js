import Mask from '../mask';

const phoneMask = new Mask({
  name: 'phone',
  mask: '(00) 00000?-0000',
  validator: value => /^\d{2}\d{8,}$/.test(value),
});

export default phoneMask;
