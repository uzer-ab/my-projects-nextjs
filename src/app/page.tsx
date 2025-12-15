import Image from "next/image";
import { testDbConnection } from "../lib/db";

export default async function Home() {
  await testDbConnection();
  return <div>Hello!</div>;
}
