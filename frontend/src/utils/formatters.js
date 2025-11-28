/**
 * Utilidades para formateo de inputs en formularios
 */

/**
 * Formatea un número de tarjeta agregando espacios cada 4 dígitos
 * @param {string} value - Valor del input
 * @returns {string} - Valor formateado (ej: "1234 5678 9012 3456")
 */
export const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
};

/**
 * Formatea una fecha de vencimiento en formato MM/AA
 * @param {string} value - Valor del input
 * @returns {string} - Valor formateado (ej: "12/25")
 */
export const formatCardExpiry = (value) => {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
        cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
};

/**
 * Formatea un CVV permitiendo solo números
 * @param {string} value - Valor del input
 * @returns {string} - Valor formateado (solo dígitos)
 */
export const formatCVV = (value) => {
    return value.replace(/\D/g, '').substring(0, 3);
};

/**
 * Formatea un DNI permitiendo solo números
 * @param {string} value - Valor del input
 * @returns {string} - Valor formateado (solo dígitos, max 8)
 */
export const formatDNI = (value) => {
    return value.replace(/\D/g, '').substring(0, 8);
};

/**
 * Formatea un número de teléfono
 * @param {string} value - Valor del input
 * @returns {string} - Valor formateado
 */
export const formatPhone = (value) => {
    return value.replace(/[^0-9+\-\s()]/g, '').substring(0, 15);
};

/**
 * Valida que un DNI tenga 7 u 8 dígitos
 * @param {string} dni - DNI a validar
 * @returns {boolean} - true si es válido
 */
export const isValidDNI = (dni) => {
    return /^[0-9]{7,8}$/.test(dni);
};

/**
 * Valida formato de tarjeta (16 dígitos)
 * @param {string} cardNumber - Número de tarjeta
 * @returns {boolean} - true si es válido
 */
export const isValidCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^[0-9]{16}$/.test(cleaned);
};

/**
 * Valida formato de fecha de vencimiento (MM/AA)
 * @param {string} expiry - Fecha de vencimiento
 * @returns {boolean} - true si es válido
 */
export const isValidExpiry = (expiry) => {
    return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry);
};

/**
 * Valida formato de CVV (3 dígitos)
 * @param {string} cvv - CVV
 * @returns {boolean} - true si es válido
 */
export const isValidCVV = (cvv) => {
    return /^[0-9]{3}$/.test(cvv);
};
