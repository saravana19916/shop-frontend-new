import { PathName } from "@/routers/types";
type MenuItem = {
  id?: number;
  name: string;
  description: string;
  href: PathName;
  icon?: any;
  active?: boolean;
};

export default MenuItem;