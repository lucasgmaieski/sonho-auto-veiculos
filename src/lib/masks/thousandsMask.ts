export function thousandsMask(value: string) {
    const newValue = value.replace(/\D/g, '');
    // Aplica a máscara de preço
    let precoFormatado = newValue.replace(/^(\d{1,3})(\d{3})$/, '$1.$2');
    // Adiciona separador de milhões, se necessário
    return precoFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}