import { APIManager } from '../models/APIManager.js'
import { Renderer } from '../views/Renderer.js'
const apiManager = new APIManager()
const renderer = new Renderer()

renderer.initialRendering()

apiManager.getAllGroups().then(function(data){
  renderer.renderAdd(data)
}).catch(err=>{})

apiManager.getAllExpensesByGroup().then(function(data){
  renderer.renderExpensesByGroup(data)
}).catch(err=>{})

$('.submit-range').on('click', function(event){
  event.preventDefault()
  const fromDate = $(this).closest('.date-pickers').find('.select-from-date').val()
  const toDate = $(this).closest('.date-pickers').find('.select-to-date').val()
  apiManager.getAllExpensesByGroup(fromDate,toDate).then(function(data){
    renderer.renderExpensesByGroup(data)
  }).catch(err=>{})
})

$('#add').on('submit', '#add-form', function(event){
  event.preventDefault()
  const dataToSend = {
    name:$('#add-name').val(),
    amount:$('#add-amount').val(),
    date:$('#add-date').val(),
    group:$('#add-category').val()
  }
  try {
    apiManager.validator(dataToSend)
    apiManager.addExpence(dataToSend).then(function(data){
      return apiManager.getAllExpensesByGroup()
    }).then(function(data){
      renderer.renderExpensesByGroup(data)
    }).catch(err => {
      console.error(err)
      renderer.renderError(err)
    })
  } catch (err) {
    console.error(err)
    renderer.renderError(err)
  }
})

$('body').on('click', '.error-msg', function(){
  $(this).remove()
})
