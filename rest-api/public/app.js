new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){
      fetch("/api/task").then(res => res.json())
      .then(res => {
        this.todos = res
      })
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        fetch("/api/task",{
          method: "POST",
          headers : {"Content-Type" : "application/json"},
          body: JSON.stringify({title})
        }).then(resutl => resutl.json())
        .then(result => {
          const allTask = result.task
          console.log(allTask)

          this.todos.push(allTask)
          this.todoTitle = ''
        })
      },
      completeTodo(id){
       fetch("/api/task/"+id,{
         method : "PUT",
         headers : {"Content-Type" : "application/json"},
         body : JSON.stringify({done: true})
       }).then(res => res.json())
       .then((task) => {
         const idx = this.todos.findIndex(inx => inx.id === task.id);
         this.todos[idx].updatedAt = task.updatedAt
       })
      },
      removeTodo(id) {
        fetch("/api/task/"+id,{
          method : "DELETE"
        }).then(res => res.json()).then(res => console.log(res))
        this.todos = this.todos.filter(t => t.id !== id)
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value,withTime) {
        if (withTime){
          return new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour : "2-digit",
            minute : "2-digit",
            second : "2-digit"
          }).format(new Date(value))
        }
        return new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(value))
      }
    }
  })