export class Renderer{
  initialRendering(){
    $( ".select-from-date" ).datepicker()
    $( ".select-to-date" ).datepicker()
  }
  renderExpensesByGroup(data){
    $('#groups').empty()
    $('#groups').append($('<h3>Your Expenses By Category</h2>'))
    this.createDonutChart($('#groups'), data)
    const expGroupTemplate = Handlebars.compile($(`#groups-template`).html())
    const expGroupHTML = expGroupTemplate({ data })
    $('#groups').append(expGroupHTML)
    this.turnToAccordion($('#expenses-groups'))
  }
  renderAdd(data){
    console.log(data)
    const addTemplate = Handlebars.compile($(`#add-template`).html())
    const addHTML = addTemplate({ data })
    $('#add').append(addHTML)
    $('input').button()
    $( ".widget input[type=submit], .widget a, .widget button" ).button()
    $( "#add-date" ).datepicker()
    $( "#add-category" ).selectmenu()
  }
  turnToAccordion(element){
    element.accordion({
      active: false,
      collapsible:true,
      header: 'h4',
      heightStyle: 'content'
    })
  }
  createDonutChart(element, data){
    const colors = ["#78b4c6", "#387472", "#5cdd9f", "#4b69ad", "#a3d71e", "#955ccd", "#a8c280", "#eb1138", "#50e316", "#b1475c", "#fbbd13", "#158a2c"]
    const $canvas = $('<canvas id="group-pie-chart"></canvas>')
    const $contanier = $('<div id="group-pie-chart-container"></div>')
    const dataset = data.map(element => element.total)
    const colorset = dataset.map((element, index) => colors[index])
    const labelset = data.map(element => element._id)
    element.append($contanier.append($canvas))
    const myChart = new Chart($canvas, 
    {
      type: 'doughnut',
      data: {
        datasets: [{
            data: dataset,
            backgroundColor: colorset
        },],
        labels: labelset
      },
      options: {
        cutoutPercentage:50,
        legend:{
          position:"bottom"
        }
      }
    })
  }
  renderError(err){
    $('body').append(`<div class="error-msg">Could not complete your request<br>${errors[err.status]}</div>`)
  }
}

const errors = {
  0:'Check you internet connection',
  500:'We had a nasty problem in the sever. Call 0528-228640',
  999:'Check your form input',
  418:'Youre a TEAPOT!'
}


Handlebars.registerHelper('dateFormater', function(opts) {
  const dateObject = new Date(opts.fn(this))
  return `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`
})
Handlebars.registerHelper('capitalize', function(opts) {
  return opts.fn(this).toUpperCase()
})
