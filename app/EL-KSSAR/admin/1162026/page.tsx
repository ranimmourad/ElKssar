import AdminDashboard from "@/components/AdminDashboard";

// Hidden admin route — not linked anywhere in the public interface.
export const metadata = {
  title: "Administration — EL KSSAR",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
