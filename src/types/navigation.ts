import { NavigatorScreenParams } from "@react-navigation/native";
import { Todo } from "./todo";

export type RootStackParamList = {
  MainScreen: undefined;
  AddTodoScreen: undefined;
  EditTodoScreen: { todo: Todo };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
