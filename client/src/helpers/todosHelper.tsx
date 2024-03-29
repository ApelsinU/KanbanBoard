import { useTodosStore } from '@App/zustand/stores/todosStore'
import {useUserStore} from "@App/zustand/stores/userStore";
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

export function parseToObject(todosArr: ICardItem[]) {
  if (!todosArr) return {}

  const obj: IDataCards  = {
    todo: [],
    progress: [],
    done: [],
  }

  todosArr.map((todo: ICardItem) =>
    // @ts-ignore
    obj[todo.status].push({id: todo.id, title: todo.title})
  )

  return obj
}

export function generateUniqIdForStore(todos: IDataCards, status: Status, index?: number) {
  const idCol = (Object.keys(todos).indexOf(status) + 1) * 1000
  const idRow = index ? index : todos[status].length + 1

  const id = idCol + idRow
  return id.toString()
}

export function generateUniqId(todos: IDataCards, status: Status, userId: string) {
  const currentIds = todos[status].map((todo => {
    return Number(todo.id.split('_')[0])
  }))

  let newId = 0;
  const idCol = (Object.keys(todos).indexOf(status) + 1) * 1000

  for (let i = 1; i < idCol * 1000; i++) {
    if (!currentIds.includes(idCol + i)) {
      newId = idCol + i
      break;
    }
  }

  return `${newId}_${userId}`
}
