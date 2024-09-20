import { RootStackParamList } from "./navigationTypes"; // Adjust the path as necessary

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
