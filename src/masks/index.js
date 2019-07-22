import phoneMask from './phone';
import CPFMask from './cpf';
import CNPJMask from './cnpj';

const masks = {
  phone: phoneMask,
  cpf: CPFMask,
  cnpj: CNPJMask,
};

export default masks;
