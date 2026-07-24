import { redirect } from "next/navigation";

export default function CartRoute() {
  redirect("/dashboard/customer/cart");
}
