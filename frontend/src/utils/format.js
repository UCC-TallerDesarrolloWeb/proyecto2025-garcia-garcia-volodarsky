//usamos la función formatCurrency para dar formato a los precios
//es un ejemplo, no es la real
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};
