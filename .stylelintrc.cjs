module.exports = {
  extends: 'stylelint-config-recommended-vue',
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'order/order': ['custom-properties', 'declarations']
  }
}
