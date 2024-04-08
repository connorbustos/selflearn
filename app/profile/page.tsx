import { redirect } from "next/navigation";
import WikiTable from "@/components/WikiTable";
import ProfileLayout from "@/components/ProfileLayout";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession();

  return (
    <ProfileLayout user={session?.user?.name ?? ""}>
      <WikiTable owner={session?.user?.name ?? ""} />
    </ProfileLayout>
  );
}
