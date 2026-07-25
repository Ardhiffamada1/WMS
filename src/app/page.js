import { redirect } from "next/navigation";

export default function Home() {
  // Langsung redirect dari landing page ke portal login
  redirect("/login");
}
