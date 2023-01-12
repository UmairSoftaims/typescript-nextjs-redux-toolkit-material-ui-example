
import MaterialTable from 'material-table';
import { Todo } from '../../model/Todo';
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../../store/todo_rtk/todoApi';
type Props = {}

/**
 * TODO list
 * @param props Props
 */
export const TodoList = function (props: Props) {
  const {} = props
  // const {
  //   isFetching,
  //   fetchAllTodos,
  //   addTodo,
  //   editTodo,
  //   deleteTodo,
  //   todos,
  // } = useTodo()

  // useEffect(() => {
  //   fetchAllTodos()
  // }, [])
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  
  let offset: number = 3;
  let limit: number = 2;
  const { data: todos, isLoading, isSuccess } = useGetTodosQuery({offset,limit});
  isSuccess && console.log(todos);


  return (
    <MaterialTable
      title="TODO List"
      columns={[
        { title: "id", field: "id", type: "numeric", editable: "never" },
        { title: "name", field: "name" },
        { title: "complete", field: "complete", type: "boolean" },
        { title: "create time", field: "createdAt", type: "datetime", editable: "never" },
        { title: "update time", field: "updatedAt", type: "datetime", editable: "never" },
      ]}
      options={{
        actionsColumnIndex: 99,
        search: true,
      }}
      data={todos && JSON.parse(JSON.stringify(todos))}
      isLoading={isLoading}
      editable={{
        onRowAdd: (newData: Todo) =>
          new Promise((resolve, reject) => {
            console.log(newData)
            addTodo({
              name: newData.name,
              complete: newData.complete ? newData.complete : false,
            })
              .then((payload) => resolve(payload))
              .catch((error) => reject(error))
          }),
        onRowUpdate: (newData: Todo, _) =>
          new Promise((resolve, reject) => {
            console.log(newData,_)
            updateTodo(newData)
              .then((payload: any) => resolve(payload))
              .catch((e: any) => reject(e))
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            console.log(oldData)
            deleteTodo(oldData.id || 0)
              .then(() => resolve(todos))
              .catch((e) => reject(e))
          }),
      }}
      />
      )
}
