import { useTodosStore } from '@App/zustand/stores/todosStore'
import { IDataCards, ICardItem } from '@App/zustand/types/todosTypes'

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
