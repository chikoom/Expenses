export class APIManager{
  getAllExpensesByGroup(from = '',to = ''){
    let d1 = (from.length > 1) ? `&d1=${from}` : ''
    let d2 = (to.length > 1) ? `&d2=${to}` : ''
    return $.get(`/expenses/?grouping=true${d1}${d2}`)
  }
  getAllGroups(){
    return $.get('/categories')
  }
  addExpence(data){
    return $.post('/new', data)
  }
  validator(data){
    for (const [key, value] of Object.entries(data)) {
      if(value.length < 1) throw {status: 999}
    }
  }
}
