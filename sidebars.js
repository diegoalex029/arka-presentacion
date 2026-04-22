/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Arquitectura',
      items: ['arquitectura/overview', 'arquitectura/hexagonal', 'arquitectura/comunicacion'],
    },
    {
      type: 'category',
      label: 'Historias de Usuario',
      items: [
        'hu/hu1-registro-productos',
        'hu/hu2-actualizacion-stock',
        'hu/hu3-reporte-bajo-stock',
        'hu/hu4-orden-compra',
        'hu/hu5-modificar-orden',
        'hu/hu6-notificaciones',
        'hu/hu7-reporte-ventas',
        'hu/hu8-carritos-abandonados',
      ],
    },
    'reflexion',
  ],
};

module.exports = sidebars;