export default interface User {
  name: string;
  created: Date;
  password?: string;
  id?: string | number;
}
