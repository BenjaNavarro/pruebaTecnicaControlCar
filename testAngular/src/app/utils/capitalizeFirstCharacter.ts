/**
 * Regresa una string igual a la anterior con la primera letra en mayúscula
 * @param {String} string 
 * @returns String
 */
export function capitalizeFirstCharacter(string: string): string {
    if(!string) return '';
    else return string.charAt(0).toUpperCase() + string.slice(1);
}