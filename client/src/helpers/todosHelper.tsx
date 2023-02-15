import { useTodosStore } from '@App/zustand/stores/todosStore'
import { IDataCards, ICardItem, Status } from '@App/zustand/types/todosTypes'

// todo: need to refactor: remove hook and rewrite methods
export function useTodosHelper() {
  const todos = useTodosStore((state) => state.todos)

  const todosCount = concatToArray(todos).length
  const todosArray = concatToArray(todos)

  return { todosCount, todosArray }
}

function concatToArray(todosObj: IDataCards | null) {
  if (!todosObj) return []
  const array: ICardItem[] = []

  Object.values(todosObj).map((arrCol: ICardItem[]) =>
    arrCol.map((card: ICardItem) => array.push(card)),
  )

  return array
}

export function generateUniqId(todos: IDataCards, status: Status, index?: number) {
  const idCol = (Object.keys(todos).indexOf(status) + 1) * 1000
  const idRow = index ? index : todos[status].length + 1

  return idCol + idRow
}

// function parseToObject(todosArray: IDataCards | null) {
//   if (!todosObj) return []
//   const array: ICardItem[] = []
//
//   Object.values(todosObj).map((arrCol: ICardItem[]) =>
//       arrCol.map((card: ICardItem) => array.push(card)),
//   )
//
//   return array
// }
