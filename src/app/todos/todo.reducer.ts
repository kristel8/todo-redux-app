import { createReducer, on, Action } from '@ngrx/store';
import { borrar, crear, editar, limpiarTodos, toggle, toggleAll } from './todo-actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [new Todo('salvar al mundo ')];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(limpiarTodos, state => state.filter(todo => !todo.completado)),
  on(borrar, (state, { id }) => state.filter( todo => todo.id !== id)),
  on(toggleAll, (state, { completado }) => {
    return state.map((todo) => {
        return {
          ...todo,
          completado: completado,
        };
    });
  }),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      }

      return todo;
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      }

      return todo;
    });
  }),
);

export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
