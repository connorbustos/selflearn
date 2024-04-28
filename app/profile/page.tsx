import WikiTable from "@/components/WikiTable";
import ProfileLayout from "@/components/ProfileLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

export default async function Profile() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <ProfileLayout user={session?.user?.name ?? ""}>
      <WikiTable owner={session?.user?.name ?? ""} />
    </ProfileLayout>
  );
}
