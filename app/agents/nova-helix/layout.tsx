import { NovaHelixDemoProvider } from "@/components/agents/NovaHelixDemoProvider";

/** Scopes the Nova Helix demo popup to this route only. */
export default function NovaHelixLayout({ children }: { children: React.ReactNode }) {
  return <NovaHelixDemoProvider>{children}</NovaHelixDemoProvider>;
}
