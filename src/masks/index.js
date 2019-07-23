import phoneMask from './phone';
import CPFMask from './cpf';
import CNPJMask from './cnpj';
import DateMask from './date';
import MoneyMask from './money';

const masks = {
  phone: phoneMask,
  cpf: CPFMask,
  cnpj: CNPJMask,
  date: DateMask,
  money: MoneyMask,
};

export default masks;
