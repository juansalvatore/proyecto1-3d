var chart = AmCharts.makeChart('chartdiv', {
  hideCredits: true,
  type: 'serial',
  theme: 'light',
  categoryField: 'year',
  rotate: true,
  startDuration: 1,
  categoryAxis: {
    gridPosition: 'start',
    position: 'left',
  },
  titles: [
    {
      color: '#000000',
      text: 'Hombres y mujeres',
      bold: true,
    },
  ],
  columnSpacing: 0,
  columnWidth: 0.6,
  graphs: [
    {
      /**
       * These two graphs are just here for labels
       * They're basically invisible, save for the label itself,
       * but underneath they're just stacked column graphs
       */
      labelText: '[[title]]',
      labelPosition: 'inside',
      fontSize: 14,
      fillAlphas: 0,
      lineAlpha: 0,
      title: '',
      type: 'column',
      valueField: 'income',
      showBalloon: false,
      visibleInLegend: false,
    },
    {
      labelText: '[[title]]',
      labelPosition: 'inside',
      fontSize: 14,
      fillAlphas: 0,
      lineAlpha: 0,

      title: '',
      type: 'column',
      valueField: 'expenses',
      showBalloon: false,
      visibleInLegend: false,
    },
    {
      /**
       * We start a new stack with this graph
       */
      newStack: true,
      balloonText: 'Hombres[[value]]%',
      labelText: '[[value]]',
      labelPosition: 'inside',
      color: '#fff',
      fillAlphas: 0.8,
      lineAlpha: 0.2,
      lineColor: '#0dc4c4',
      title: 'Income',
      type: 'column',
      valueField: 'income',
    },
    {
      balloonText: 'Mujeres:[[value]]%',
      labelText: '[[value]]',
      labelPosition: 'inside',
      color: '#fff',
      fillAlphas: 0.8,
      lineAlpha: 0.2,
      title: 'Expenses',
      type: 'column',
      valueField: 'expenses',
    },
  ],
  valueAxes: [
    {
      stackType: 'regular',
      position: 'top',
      axisAlpha: 0,
    },
  ],
  dataProvider: [
    {
      year: 2008,
      income: 10,
      expenses: 90,
    },
    {
      year: 2009,
      income: 51.3,
      expenses: 48.7,
    },
    {
      year: 2010,
      income: 51.2,
      expenses: 48.8,
    },
    {
      year: 2011,
      income: 51.1,
      expenses: 48.9,
    },
    {
      year: 2012,
      income: 51,
      expenses: 49,
    },
    {
      year: 2013,
      income: 50.9,
      expenses: 49.1,
    },
    {
      year: 2014,
      income: 50.8,
      expenses: 49.2,
    },
    {
      year: 2015,
      income: 50.7,
      expenses: 49.3,
    },
    {
      year: 2016,
      income: 50.7,
      expenses: 49.3,
    },
  ],
})
